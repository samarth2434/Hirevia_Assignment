'use client';

import { useMockAuth } from '@/contexts/MockAuthContext';

export default function Home() {
  const { user, loading } = useMockAuth();

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Authentication & Assessment System
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Complete system with Mock Authentication (No Docker Required!)
        </p>
        <p className="text-sm text-green-600 mb-8">
          🚀 Ready to run without Keycloak or Docker setup
        </p>
        
        <div className="space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => navigateTo('/simple-login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigateTo('/register')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Register
              </button>
              <button
                onClick={() => navigateTo('/mock-login')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Mock Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigateTo('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigateTo('/assessment')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Take Assessment
              </button>
              <button
                onClick={() => navigateTo('/admin')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
              >
                Admin Panel
              </button>
            </>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🔐 Mock Authentication</h3>
            <p className="text-gray-600">
              Simple authentication system without Docker/Keycloak complexity
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">📝 Assessment Form</h3>
            <p className="text-gray-600">
              Complete questionnaire with validation and submission tracking
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🎥 Video Interview</h3>
            <p className="text-gray-600">
              WebRTC-based video interface with timer and camera controls
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">👨‍💼 Admin Dashboard</h3>
            <p className="text-gray-600">
              Role-based admin panel with assessment statistics and management
            </p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">🎯 Test Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <p className="font-medium text-gray-900">Regular User</p>
              <p className="text-gray-600">Username: <code>testuser</code></p>
              <p className="text-gray-600">Password: <code>password123</code></p>
              <p className="text-blue-600">Access: Dashboard, Assessment</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-gray-600">Username: <code>admin</code></p>
              <p className="text-gray-600">Password: <code>admin123</code></p>
              <p className="text-green-600">Access: All areas + Admin Panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}