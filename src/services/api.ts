import { WebClient } from '@slack/web-api';
import type { SlackChannel, SlackMessage } from '../types/slack';

class SlackAPI {
  private client: WebClient | null = null;

  setAuthToken(token: string) {
    if (!token) return;
    
    this.client = new WebClient(token);
  }

  async getChannels(): Promise<SlackChannel[]> {
    if (!this.client) {
      throw new Error('Slack client not initialized');
    }

    try {
      const result = await this.client.conversations.list({
        types: 'public_channel,private_channel',
        exclude_archived: true
      });

      if (!result.channels) {
        return [];
      }

      return result.channels.map(channel => ({
        id: channel.id || '',
        name: channel.name || '',
        isPrivate: channel.is_private || false
      }));
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  }

  async getMessages(channelId: string): Promise<SlackMessage[]> {
    if (!this.client) {
      throw new Error('Slack client not initialized');
    }

    try {
      const result = await this.client.conversations.history({
        channel: channelId,
        limit: 50
      });

      if (!result.messages) {
        return [];
      }

      return result.messages.map(msg => ({
        id: msg.ts || '',
        text: msg.text || '',
        user: msg.user || '',
        timestamp: msg.ts || '',
        channel: channelId
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

export const slackApi = new SlackAPI();