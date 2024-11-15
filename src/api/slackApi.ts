import axios from 'axios';
import type { SlackChannel, SlackMessage } from '../types/slack';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const slackApi = {
  async getChannels(token: string): Promise<SlackChannel[]> {
    const response = await axios.get<SlackChannel[]>(`${API_URL}/api/channels`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  },

  async getChannelMessages(token: string, channelId: string): Promise<SlackMessage[]> {
    const response = await axios.get<SlackMessage[]>(
      `${API_URL}/api/channels/${channelId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
};