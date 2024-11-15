import { WebClient } from '@slack/web-api';

class SlackAPI {
  private client: WebClient | null = null;
  private static instance: SlackAPI | null = null;

  private constructor() {
    // Initialize without token, will be set later
    this.client = null;
  }

  static getInstance(): SlackAPI {
    if (!SlackAPI.instance) {
      SlackAPI.instance = new SlackAPI();
    }
    return SlackAPI.instance;
  }

  initializeClient(token: string): void {
    if (!token) {
      throw new Error('Slack token is required');
    }
    this.client = new WebClient(token, {
      retryConfig: {
        retries: 2,
        minTimeout: 1000
      }
    });
  }

  async getChannels() {
    if (!this.client) {
      throw new Error('Slack client not initialized');
    }
    try {
      const result = await this.client.conversations.list({
        types: 'public_channel,private_channel'
      });
      return result.channels || [];
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  }

  async getMessages(channelId: string) {
    if (!this.client) {
      throw new Error('Slack client not initialized');
    }
    try {
      const result = await this.client.conversations.history({
        channel: channelId,
        limit: 50
      });
      return result.messages || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

export default SlackAPI.getInstance();