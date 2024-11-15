import { useEffect, useState } from 'react';
import { slackApi } from '../services/api';
import type { SlackMessage } from '../types/slack';
import { useSlackStore } from '../store/slackStore';

interface MessageListProps {
  channelId: string;
}

export default function MessageList({ channelId }: MessageListProps) {
  const [messages, setMessages] = useState<SlackMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConfigured } = useSlackStore();

  useEffect(() => {
    if (!isConfigured || !channelId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const messageList = await slackApi.getMessages(channelId);
        setMessages(messageList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId, isConfigured]);

  if (loading) {
    return <div className="text-gray-600">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <div
          key={message.id}
          className="p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{message.user}</span>
            <span className="text-sm text-gray-500">
              {new Date(parseInt(message.timestamp) * 1000).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700">{message.text}</p>
        </div>
      ))}
    </div>
  );
}