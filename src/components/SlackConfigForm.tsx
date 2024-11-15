import { useState } from 'react';
import { useSlackStore } from '../store/slackStore';
import type { SlackConfig } from '../types/slack';

export default function SlackConfigForm() {
  const { config, setConfig } = useSlackStore();
  const [formData, setFormData] = useState<SlackConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bot Token</label>
        <input
          type="password"
          name="botToken"
          value={formData.botToken}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="xoxb-your-token"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Signing Secret</label>
        <input
          type="password"
          name="signingSecret"
          value={formData.signingSecret}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your signing secret"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </form>
  );
}