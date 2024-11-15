import { create } from 'zustand';
import axios from 'axios';

interface SlackState {
  token: string | null;
  channels: any[];
  error: string | null;
  setToken: (token: string) => void;
  fetchChannels: () => Promise<void>;
}

export const useSlackStore = create<SlackState>((set) => ({
  token: localStorage.getItem('slackToken'),
  channels: [],
  error: null,

  setToken: (token: string) => {
    localStorage.setItem('slackToken', token);
    set({ token });
  },

  fetchChannels: async () => {
    const token = localStorage.getItem('slackToken');
    if (!token) return;

    try {
      const response = await axios.get('https://slack.com/api/conversations.list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.data.ok) {
        throw new Error(response.data.error || 'Failed to fetch channels');
      }
      
      set({ channels: response.data.channels || [] });
    } catch (error) {
      set({ error: 'Failed to fetch channels' });
    }
  }
}));