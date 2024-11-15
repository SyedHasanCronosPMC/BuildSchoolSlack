import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSlackStore } from '../store/slackStore';

export default function ChannelView() {
  const { channelId } = useParams();
  const { client, isConfigured } = useSlackStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!client || !channelId || !isConfigured) {
        setLoading(false);
        return;
      }
      
      try {
        const result = await client.conversations.history({
          channel: channelId,
          limit: 50
        });
        setMessages(result.messages || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId, client, isConfigured]);

  if (!isConfigured) {
    return <div className="p-6">Please configure Slack settings first</div>;
  }

  if (loading) {
    return <div className="p-6">Loading messages...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {messages.map((message) => (
        <div key={message.ts} className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(Number(message.ts) * 1000).toLocaleString()}
          </div>
          <div>{message.text}</div>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="text-gray-500 text-center">No messages in this channel</div>
      )}
    </div>
  );
}