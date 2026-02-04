'use client';

import { useState } from 'react';

export default function DebugApiPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [loginResult, setLoginResult] = useState<string>('');
  const [registerResult, setRegisterResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      // Test using Next.js proxy
      const response = await fetch('/api/auth/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ API Connection Success (via API routes): ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ API Connection Failed (via API routes): ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Network Error (via API routes): ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      // Test using Next.js proxy
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'debuguser' + Date.now(),
          password: 'password123',
          email: 'debug@example.com',
          fullName: 'Debug User'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegisterResult(`✅ Register Success (via API routes): ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorData = await response.text();
        setRegisterResult(`❌ Register Failed (via API routes): ${response.status} ${response.statusText} - ${errorData}`);
      }
    } catch (error) {
      setRegisterResult(`❌ Register Network Error (via API routes): ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const testLogin = async () => {
    setLoading(true);
    try {
      // Test using Next.js proxy
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          password: 'password123'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoginResult(`✅ Login Success (via API routes): ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorData = await response.text();
        setLoginResult(`❌ Login Failed (via API routes): ${response.status} ${response.statusText} - ${errorData}`);
      }
    } catch (error) {
      setLoginResult(`❌ Login Network Error (via API routes): ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Test API Connection</h2>
            <button
              onClick={testApiConnection}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-md mr-4"
            >
              {loading ? 'Testing...' : 'Test API Connection'}
            </button>
            {testResult && (
              <pre className="mt-4 p-4 bg-gray-900 rounded border text-sm overflow-auto">
                {testResult}
              </pre>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Test Login</h2>
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-md mr-4"
            >
              {loading ? 'Testing...' : 'Test Login (testuser/password123)'}
            </button>
            {loginResult && (
              <pre className="mt-4 p-4 bg-gray-900 rounded border text-sm overflow-auto">
                {loginResult}
              </pre>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Test Registration</h2>
            <button
              onClick={testRegister}
              disabled={loading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-md mr-4"
            >
              {loading ? 'Testing...' : 'Test Register (random user)'}
            </button>
            {registerResult && (
              <pre className="mt-4 p-4 bg-gray-900 rounded border text-sm overflow-auto">
                {registerResult}
              </pre>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Frontend URL:</strong> http://localhost:3002</p>
              <p><strong>Backend URL:</strong> /api (via Next.js API routes → http://localhost:8081/api)</p>
              <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'Server Side'}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-x-4">
              <a href="/mock-login" className="text-blue-400 hover:text-blue-300">Mock Login</a>
              <a href="/simple-login" className="text-blue-400 hover:text-blue-300">Simple Login</a>
              <a href="/dashboard" className="text-blue-400 hover:text-blue-300">Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}