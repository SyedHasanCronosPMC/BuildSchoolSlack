import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSlackStore } from '../store/slackStore';

export default function Settings() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const setSlackToken = useSlackStore(state => state.setToken);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      setSlackToken(token.trim());
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Slack Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Bot User OAuth Token
          </label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="xoxb-your-token"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}