import express from 'express';
import { WebClient } from '@slack/web-api';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.get('/channels', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const client = new WebClient(token);
    const result = await client.conversations.list({
      types: 'public_channel,private_channel'
    });

    const channels = result.channels?.map(channel => ({
      id: channel.id,
      name: channel.name,
      isPrivate: channel.is_private
    })) || [];

    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
});

export default router;