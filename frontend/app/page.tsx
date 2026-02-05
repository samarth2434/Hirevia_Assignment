'use client';

import { useMockAuth } from '@/contexts/MockAuthContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user, loading } = useMockAuth();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with JWT tokens and role-based access control'
    },
    {
      icon: '📋',
      title: 'Smart Assessments',
      description: 'Dynamic forms with real-time validation and comprehensive analytics'
    },
    {
      icon: '🎥',
      title: 'Video Interviews',
      description: 'WebRTC-powered live interviews with professional controls'
    },
    {
      icon: '📊',
      title: 'Admin Dashboard',
      description: 'Powerful analytics and user management capabilities'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Hirevia Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl mb-6 shadow-2xl">
                <span className="text-3xl font-bold text-white">H</span>
              </div>
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
                Hirevia
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Tagline */}
            <p className="text-2xl text-blue-100 mb-4 font-light">
              Complete Interview Platform
            </p>
            <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline your hiring process with secure authentication, dynamic assessments, 
              and real-time video interviews - all in one powerful platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {!user ? (
                <>
                  <button
                    onClick={() => navigateTo('/simple-login')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={() => navigateTo('/register')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => navigateTo('/mock-login')}
                    className="px-8 py-4 bg-purple-500/20 backdrop-blur-sm text-purple-100 font-semibold rounded-xl border border-purple-400/30 hover:bg-purple-500/30 transition-all duration-300"
                  >
                    Demo Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateTo('/dashboard')}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('/assessment')}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Take Assessment
                  </button>
                  <button
                    onClick={() => navigateTo('/video-interview')}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Video Interview
                  </button>
                </>
              )}
            </div>

            {/* Feature Showcase */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
                <div className="flex justify-center space-x-2 mb-6">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeature ? 'bg-blue-400 scale-125' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {features[currentFeature].title}
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hirevia?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies and best practices to deliver a seamless hiring experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with JWT tokens, role-based access, and mock authentication for development
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Assessments</h3>
              <p className="text-gray-600 leading-relaxed">
                Dynamic questionnaires with real-time validation, multiple question types, and comprehensive analytics
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Video Interviews</h3>
              <p className="text-gray-600 leading-relaxed">
                WebRTC-powered live interviews with professional controls, timers, and seamless user experience
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Powerful analytics, user management, assessment statistics, and comprehensive system monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Demo Credentials</h2>
            <p className="text-gray-300 text-lg">
              Try the platform with these test accounts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">U</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Regular User</h3>
                  <p className="text-blue-200">Standard Access</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Username:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-blue-300">testuser</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Password:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-blue-300">password123</code>
                </div>
                <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                  <p className="text-blue-200 text-xs">
                    ✓ Dashboard Access ✓ Take Assessments ✓ View Results
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Admin User</h3>
                  <p className="text-green-200">Full Access</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Username:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-green-300">admin</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Password:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-green-300">admin123</code>
                </div>
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                  <p className="text-green-200 text-xs">
                    ✓ All User Features ✓ Admin Panel ✓ Analytics ✓ User Management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <span className="text-2xl font-bold text-white">Hirevia</span>
          </div>
          <p className="text-gray-400 mb-4">
            Built with Next.js, Spring Boot, and WebRTC
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>🚀 Modern Stack</span>
            <span>🔒 Secure</span>
            <span>📱 Responsive</span>
            <span>⚡ Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
}