'use client';

import { useState } from 'react';
import { useMockAuth } from '@/contexts/MockAuthContext';
import api from '@/lib/api';

export default function TestAssessmentPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useMockAuth();

  const testAssessmentSubmit = async () => {
    if (!user) {
      setResult('❌ Please login first');
      return;
    }

    setLoading(true);
    try {
      const testData = {
        fullName: user.firstName + ' ' + user.lastName,
        email: user.email,
        experience: 'junior',
        codingExperience: 'I have 2 years of experience with JavaScript and React.',
        projectDescription: 'Built a todo app with React and Node.js backend.',
        skills: ['JavaScript', 'React', 'Node.js'],
        termsAccepted: true,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      console.log('Submitting assessment:', testData);
      const response = await api.post('/submit-assessment', testData);
      console.log('Assessment response:', response.data);
      
      setResult(`✅ Assessment Submitted Successfully!\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error('Assessment submission error:', error);
      setResult(`❌ Assessment Submission Failed:\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetMyAssessments = async () => {
    if (!user) {
      setResult('❌ Please login first');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/my-assessments');
      setResult(`✅ My Assessments Retrieved:\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error('Get assessments error:', error);
      setResult(`❌ Get Assessments Failed:\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testAdminEndpoints = async () => {
    if (!user) {
      setResult('❌ Please login first');
      return;
    }

    setLoading(true);
    try {
      const [adminResponse, assessmentsResponse, statsResponse] = await Promise.all([
        api.get('/admin'),
        api.get('/assessments'),
        api.get('/assessment-stats')
      ]);

      const results = {
        admin: adminResponse.data,
        assessments: assessmentsResponse.data,
        stats: statsResponse.data
      };

      setResult(`✅ Admin Endpoints Working:\n${JSON.stringify(results, null, 2)}`);
    } catch (error: any) {
      console.error('Admin endpoints error:', error);
      setResult(`❌ Admin Endpoints Failed:\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Assessment API Test</h1>
          <div className="bg-red-900 border border-red-600 p-4 rounded-lg">
            <p className="text-red-200">Please login first to test assessment APIs.</p>
            <div className="mt-4 space-x-4">
              <a href="/test-login-simple" className="text-blue-400 hover:text-blue-300">Login Page</a>
              <a href="/test-full-flow" className="text-blue-400 hover:text-blue-300">Full Flow Test</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Assessment API Test</h1>
        
        <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Current User:</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={testAssessmentSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-medium"
          >
            {loading ? 'Testing...' : 'Test Submit Assessment'}
          </button>
          
          <button
            onClick={testGetMyAssessments}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-medium"
          >
            {loading ? 'Testing...' : 'Test Get My Assessments'}
          </button>
          
          {user.roles.includes('ADMIN') && (
            <button
              onClick={testAdminEndpoints}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-medium"
            >
              {loading ? 'Testing...' : 'Test Admin Endpoints'}
            </button>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          {loading ? (
            <div className="text-gray-400">Running test...</div>
          ) : (
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto border border-gray-600 whitespace-pre-wrap">
              {result || 'Click a button to test assessment APIs'}
            </pre>
          )}
        </div>

        <div className="mt-6 space-x-4">
          <a href="/assessment" className="text-blue-400 hover:text-blue-300">Go to Assessment Form</a>
          <a href="/dashboard" className="text-blue-400 hover:text-blue-300">Go to Dashboard</a>
          <a href="/admin" className="text-blue-400 hover:text-blue-300">Go to Admin Panel</a>
        </div>
      </div>
    </div>
  );
}