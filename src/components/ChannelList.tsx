import React, { useEffect } from 'react';
import { useSlackStore } from '../store/slackStore';

export default function ChannelList() {
  const { channels, selectedChannel, setSelectedChannel, fetchChannels, isConfigured } = useSlackStore();

  useEffect(() => {
    if (isConfigured) {
      fetchChannels();
    }
  }, [isConfigured, fetchChannels]);

  if (!isConfigured) {
    return (
      <div className="text-gray-500 text-sm p-4">
        Please configure Slack settings first
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {channels.map((channel) => (
        <div 
          key={channel.id} 
          className={`p-2 rounded cursor-pointer transition-colors ${
            selectedChannel?.id === channel.id 
              ? 'bg-blue-100 text-blue-800' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setSelectedChannel(channel)}
        >
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">#</span>
            <span className="truncate">{channel.name}</span>
          </div>
        </div>
      ))}
      {channels.length === 0 && (
        <div className="text-gray-500 text-center py-4">
          No channels available
        </div>
      )}
    </div>
  );
}