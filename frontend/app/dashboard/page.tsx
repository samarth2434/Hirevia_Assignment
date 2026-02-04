'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user, hasRole } = useMockAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Information */}
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">User Information</h2>
              <div className="space-y-2">
                <p className="text-gray-200"><strong className="text-white">Name:</strong> {user?.firstName} {user?.lastName || 'N/A'}</p>
                <p className="text-gray-200"><strong className="text-white">Email:</strong> {user?.email || 'N/A'}</p>
                <p className="text-gray-200"><strong className="text-white">Username:</strong> {user?.username || 'N/A'}</p>
                <p className="text-white"><strong>Roles:</strong></p>
                <ul className="ml-4">
                  <li className="text-gray-200">• User: {hasRole('USER') ? '✅' : '❌'}</li>
                  <li className="text-gray-200">• Admin: {hasRole('ADMIN') ? '✅' : '❌'}</li>
                </ul>
              </div>
            </div>

            {/* API Data */}
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">API Data</h2>
              {loading ? (
                <p className="text-gray-300">Loading...</p>
              ) : userData ? (
                <pre className="text-sm bg-gray-700 text-gray-200 p-3 rounded overflow-auto border border-gray-600">
                  {JSON.stringify(userData, null, 2)}
                </pre>
              ) : (
                <p className="text-red-400">Failed to load user data</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigateTo('/assessment')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Take Assessment
                </button>
                {hasRole('ADMIN') && (
                  <button
                    onClick={() => navigateTo('/admin')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => window.open('http://localhost:3001', '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Video Interview
                </button>
              </div>
            </div>
          </div>

          {hasRole('ADMIN') && (
            <div className="mt-6 bg-yellow-900 border border-yellow-600 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-200">Admin Access</h3>
              <p className="text-yellow-300">
                You have admin privileges. You can access the admin panel and view assessment submissions.
              </p>
            </div>
          )}

          {/* Assessment Info */}
          <div className="mt-8 bg-blue-900 border border-blue-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-200 mb-2">Assessment System</h3>
            <p className="text-blue-300 mb-4">
              Complete our technical assessment to showcase your skills and experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-blue-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Multiple Choice Questions
              </div>
              <div className="flex items-center text-blue-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Experience Questions
              </div>
              <div className="flex items-center text-blue-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Skills Assessment
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}