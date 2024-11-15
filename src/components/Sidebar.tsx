import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Slack App</h1>
      </div>
      <nav>
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="/"
              className={`block px-4 py-2 rounded ${
                location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block px-4 py-2 rounded ${
                location.pathname === '/settings' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}