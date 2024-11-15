import React, { useState } from 'react';
import { useSlackStore } from '../store/slackStore';

export const ConfigureSlack: React.FC = () => {
  const { config, setConfig, isLoading } = useSlackStore();
  const [formData, setFormData] = useState({
    botToken: config.botToken,
    signingSecret: config.signingSecret
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setConfig(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="botToken" className="block text-sm font-medium text-gray-700">
          Bot User OAuth Token
        </label>
        <input
          type="password"
          id="botToken"
          name="botToken"
          value={formData.botToken}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="xoxb-your-token"
          required
        />
      </div>
      <div>
        <label htmlFor="signingSecret" className="block text-sm font-medium text-gray-700">
          Signing Secret
        </label>
        <input
          type="password"
          id="signingSecret"
          name="signingSecret"
          value={formData.signingSecret}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your signing secret"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-lg text-white ${
          isLoading 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
};