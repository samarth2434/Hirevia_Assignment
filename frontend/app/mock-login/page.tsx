'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/contexts/MockAuthContext';

export default function MockLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useMockAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error details:', err);
      if (err.message && err.message.includes('fetch')) {
        setError(`Network error: ${err.message}. Make sure backend is running on http://localhost:8081`);
      } else {
        setError(err.message || 'Invalid username or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const mockUsers = [
    {
      username: 'testuser',
      password: 'password123',
      roles: ['USER'],
      description: 'Regular user - can access dashboard and assessment'
    },
    {
      username: 'admin',
      password: 'admin123',
      roles: ['USER', 'ADMIN'],
      description: 'Admin user - can access all areas including admin panel'
    }
  ];

  const quickLogin = (user: typeof mockUsers[0]) => {
    setUsername(user.username);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Mock Authentication
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Use test credentials below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          {/* Quick Login Buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Quick Login</h3>
            <div className="space-y-3">
              {mockUsers.map((user) => (
                <div key={user.username} className="border border-gray-600 rounded-lg p-3 bg-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{user.username}</p>
                      <p className="text-sm text-gray-300">{user.description}</p>
                      <p className="text-xs text-blue-400">Roles: {user.roles.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => quickLogin(user)}
                      className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-100 bg-blue-700 hover:bg-blue-600"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-600 pt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              🚀 Mock authentication system
            </p>
            <div className="mt-2">
              <button
                onClick={() => window.location.href = '/register'}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Don't have an account? Register here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}