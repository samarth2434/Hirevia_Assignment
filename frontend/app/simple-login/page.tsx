'use client';

import { useState } from 'react';

export default function SimpleLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Direct API call without complex auth context
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Login successful! Welcome ${data.username}`);
        
        // Store in localStorage
        localStorage.setItem('mock_token', data.access_token);
        localStorage.setItem('mock_user', JSON.stringify({
          username: data.username,
          roles: data.roles,
        }));

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        const error = await response.json();
        setMessage(`❌ Login failed: ${error.error || 'Invalid credentials'}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Simple Login Test
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 placeholder-gray-400"
              placeholder="testuser or admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 placeholder-gray-400"
              placeholder="password123 or admin123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-md bg-gray-700 border border-gray-600">
            <p className="text-sm text-gray-200">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>Test Credentials:</p>
          <p>User: testuser / password123</p>
          <p>Admin: admin / admin123</p>
          
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p>Don't have an account?{' '}
              <button
                onClick={() => window.location.href = '/register'}
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}