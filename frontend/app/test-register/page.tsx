'use client';

import { useState } from 'react';

export default function TestRegisterPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'newuser',
          password: 'password123',
          email: 'newuser@example.com',
          fullName: 'New User'
        }),
      });

      const data = await response.json();
      setResult(`Register Test: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Register Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  const testExistingUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser', // This should fail
          password: 'password123',
          email: 'test@example.com',
          fullName: 'Test User'
        }),
      });

      const data = await response.json();
      setResult(`Existing User Test: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Existing User Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Test Registration System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={testRegister}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test New User Registration
          </button>
          
          <button
            onClick={testExistingUser}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test Existing User (Should Fail)
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Results:</h2>
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : (
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto border border-gray-600">
              {result || 'Click a button to test registration'}
            </pre>
          )}
        </div>

        <div className="mt-8 bg-blue-900 p-6 rounded-lg border border-blue-700">
          <h3 className="text-lg font-semibold text-blue-200 mb-4">Test Registration Form:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.location.href = '/register'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Go to Registration Page
            </button>
            <button
              onClick={() => window.location.href = '/simple-login'}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Go to Login Page
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-blue-400 hover:text-blue-300"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}