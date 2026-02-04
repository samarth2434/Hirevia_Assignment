'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [assessmentStats, setAssessmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminResponse, assessmentsResponse, statsResponse] = await Promise.all([
          api.get('/admin'),
          api.get('/assessments'),
          api.get('/assessment-stats')
        ]);
        
        setAdminData(adminResponse.data);
        setAssessments(assessmentsResponse.data.assessments || []);
        setAssessmentStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="ADMIN">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Admin Panel</h1>
          
          <div className="bg-red-900 border border-red-700 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-red-200">⚠️ Admin Only Area</h2>
            <p className="text-red-300">
              This page is only accessible to users with ADMIN role.
            </p>
          </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assessments'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Assessments ({assessments.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Statistics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Admin Data</h2>
              {adminData ? (
                <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-auto border border-gray-600">
                  {JSON.stringify(adminData, null, 2)}
                </pre>
              ) : (
                <p className="text-red-400">Failed to load admin data</p>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-900 rounded border border-blue-700">
                  <span className="font-medium text-blue-200">Total Assessments</span>
                  <span className="text-2xl font-bold text-blue-400">{assessments.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-900 rounded border border-green-700">
                  <span className="font-medium text-green-200">Active Users</span>
                  <span className="text-2xl font-bold text-green-400">
                    {new Set(assessments.map((a: any) => a.userId)).size}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-900 rounded border border-purple-700">
                  <span className="font-medium text-purple-200">Avg Skills per User</span>
                  <span className="text-2xl font-bold text-purple-400">
                    {assessments.length > 0 
                      ? Math.round(assessments.reduce((acc: number, a: any) => acc + (a.skills?.length || 0), 0) / assessments.length)
                      : 0
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-white">Assessment Submissions</h2>
            </div>
            {assessments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-600">
                    {assessments.map((assessment: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {assessment.fullName}
                            </div>
                            <div className="text-sm text-gray-400">
                              {assessment.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-200 border border-blue-700">
                            {assessment.experience}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">
                            {assessment.skills?.length || 0} skills
                          </div>
                          <div className="text-xs text-gray-400">
                            {assessment.skills?.slice(0, 3).join(', ')}
                            {assessment.skills?.length > 3 && '...'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(assessment.submittedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-400 hover:text-blue-300 mr-3">
                            View Details
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-400">No assessment submissions yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && assessmentStats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience Levels */}
              <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-white">Experience Levels</h3>
                <div className="space-y-3">
                  {Object.entries(assessmentStats.experienceLevels || {}).map(([level, count]) => (
                    <div key={level} className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize text-gray-300">{level}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-600 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-400 h-2 rounded-full" 
                            style={{ 
                              width: `${((count as number) / assessments.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">{count as number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Skills */}
              <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-white">Most Popular Skills</h3>
                <div className="space-y-3">
                  {Object.entries(assessmentStats.topSkills || {})
                    .sort(([,a], [,b]) => (b as number) - (a as number))
                    .slice(0, 8)
                    .map(([skill, count]) => (
                    <div key={skill} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{skill}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-600 rounded-full h-2 mr-3">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ 
                              width: `${((count as number) / assessments.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">{count as number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-white">Summary Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-900 rounded-lg border border-blue-700">
                  <div className="text-2xl font-bold text-blue-400">
                    {assessmentStats.totalSubmissions}
                  </div>
                  <div className="text-sm text-blue-200">Total Submissions</div>
                </div>
                <div className="text-center p-4 bg-green-900 rounded-lg border border-green-700">
                  <div className="text-2xl font-bold text-green-400">
                    {Object.keys(assessmentStats.experienceLevels || {}).length}
                  </div>
                  <div className="text-sm text-green-200">Experience Levels</div>
                </div>
                <div className="text-center p-4 bg-purple-900 rounded-lg border border-purple-700">
                  <div className="text-2xl font-bold text-purple-400">
                    {Object.keys(assessmentStats.topSkills || {}).length}
                  </div>
                  <div className="text-sm text-purple-200">Unique Skills</div>
                </div>
                <div className="text-center p-4 bg-yellow-900 rounded-lg border border-yellow-700">
                  <div className="text-2xl font-bold text-yellow-400">
                    {new Set(assessments.map((a: any) => a.userId)).size}
                  </div>
                  <div className="text-sm text-yellow-200">Unique Users</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}