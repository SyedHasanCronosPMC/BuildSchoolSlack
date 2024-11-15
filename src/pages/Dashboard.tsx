import { useEffect } from 'react';
import { useSlackStore } from '../store/slackStore';

export default function Dashboard() {
  const { token, channels, error, fetchChannels } = useSlackStore();

  useEffect(() => {
    if (token) {
      fetchChannels();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Please configure your Slack token first</h2>
        <a href="/settings" className="text-blue-500 hover:underline">Go to Settings</a>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Channels</h2>
      <div className="grid gap-4">
        {channels.map((channel) => (
          <div key={channel.id} className="p-4 bg-white rounded-lg shadow">
            <div className="font-medium">#{channel.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}