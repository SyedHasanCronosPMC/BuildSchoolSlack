import express from 'express';
import cors from 'cors';
import { WebClient } from '@slack/web-api';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get channels
app.get('/api/channels', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const client = new WebClient(token);
    const result = await client.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true
    });

    const channels = result.channels?.map(channel => ({
      id: channel.id,
      name: channel.name,
      isPrivate: channel.is_private || false
    })) || [];

    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ 
      error: 'Failed to fetch channels',
      details: error.message 
    });
  }
});

// Get channel messages
app.get('/api/channels/:channelId/messages', async (req, res) => {
  try {
    const { channelId } = req.params;
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const client = new WebClient(token);
    const result = await client.conversations.history({
      channel: channelId,
      limit: 50
    });

    res.json(result.messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      error: 'Failed to fetch messages',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});