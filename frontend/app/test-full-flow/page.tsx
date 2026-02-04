'use client';

import { useState } from 'react';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { mockAuth } from '@/lib/mockAuth';
import { useRouter } from 'next/navigation';

export default function TestFullFlowPage() {
  const [step, setStep] = useState<'register' | 'login' | 'success'>('register');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<string>('');
  
  const { login, user, logout } = useMockAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Registering user:', formData.username);
      await mockAuth.register(formData.username, formData.password, formData.email, formData.fullName);
      console.log('Registration successful');
      setRegisteredUser(formData.username);
      setStep('login');
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Logging in user:', formData.username);
      await login(formData.username, formData.password);
      console.log('Login successful');
      setStep('success');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateRandomUser = () => {
    const randomId = Math.floor(Math.random() * 10000);
    setFormData({
      username: `user${randomId}`,
      password: 'password123',
      email: `user${randomId}@example.com`,
      fullName: `Test User ${randomId}`
    });
  };

  if (user && step === 'success') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            🎉 Complete Flow Success!
          </h1>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-300">User Successfully:</h2>
            <div className="space-y-2 text-sm">
              <p>✅ <strong>Registered:</strong> {registeredUser}</p>
              <p>✅ <strong>Logged In:</strong> {user.username}</p>
              <p>✅ <strong>Authenticated:</strong> {user.roles.join(', ')}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">User Details:</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                logout();
                setStep('register');
                setFormData({ username: '', password: '', email: '', fullName: '' });
                setRegisteredUser('');
                setError('');
              }}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium"
            >
              Test Another User
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {step === 'register' ? '1. Register New User' : '2. Login with Registered User'}
          </h1>

          {step === 'register' && (
            <div className="mb-4 p-3 bg-blue-900 rounded border border-blue-700">
              <p className="text-blue-200 text-sm">
                Step 1: Register a new user account
              </p>
            </div>
          )}

          {step === 'login' && (
            <div className="mb-4 p-3 bg-green-900 rounded border border-green-700">
              <p className="text-green-200 text-sm">
                ✅ Registration successful! Now login with: <strong>{registeredUser}</strong>
              </p>
            </div>
          )}

          <form onSubmit={step === 'register' ? handleRegister : handleLogin} className="space-y-4">
            {step === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    required
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
                readOnly={step === 'login'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
                readOnly={step === 'login'}
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
              {loading ? 
                (step === 'register' ? 'Registering...' : 'Logging in...') : 
                (step === 'register' ? 'Register' : 'Login')
              }
            </button>
          </form>

          {step === 'register' && (
            <div className="mt-4">
              <button
                onClick={generateRandomUser}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium text-sm"
              >
                Generate Random User Data
              </button>
            </div>
          )}

          {step === 'login' && (
            <div className="mt-4">
              <button
                onClick={() => setStep('register')}
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium text-sm"
              >
                ← Back to Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}