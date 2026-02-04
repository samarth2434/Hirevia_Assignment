'use client';

import { useState } from 'react';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useRouter } from 'next/navigation';

export default function TestLoginSimplePage() {
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user, logout } = useMockAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Starting login process...');
      await login(username, password);
      console.log('Login successful, redirecting...');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">✅ Login Successful!</h1>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">User Info:</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Go to Dashboard
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded font-medium"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <button
            onClick={() => { setUsername('testuser'); setPassword('password123'); }}
            className="w-full py-1 px-3 bg-green-700 hover:bg-green-600 text-white rounded text-sm"
          >
            Use Test User
          </button>
          <button
            onClick={() => { setUsername('admin'); setPassword('admin123'); }}
            className="w-full py-1 px-3 bg-purple-700 hover:bg-purple-600 text-white rounded text-sm"
          >
            Use Admin User
          </button>
        </div>
      </div>
    </div>
  );
}