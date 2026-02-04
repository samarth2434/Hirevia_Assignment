'use client';

import { useState } from 'react';

export default function DebugLoginPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/auth/test');
      const data = await response.json();
      setResult(`Backend Test: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Backend Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          password: 'password123'
        }),
      });

      const data = await response.json();
      setResult(`Login Test: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Login Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  const testMe = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/auth/me', {
        headers: {
          'Authorization': `Basic ${btoa('testuser:password123')}`,
        },
      });

      const data = await response.json();
      setResult(`Me Test: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Me Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Debug Login System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testBackend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test Backend
          </button>
          
          <button
            onClick={testLogin}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test Login
          </button>
          
          <button
            onClick={testMe}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test /me
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Results:</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {result || 'Click a button to test'}
            </pre>
          )}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Test URLs:</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>Backend Test: http://localhost:8081/api/auth/test</li>
            <li>Login: POST http://localhost:8081/api/auth/login</li>
            <li>Current User: GET http://localhost:8081/api/auth/me</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}