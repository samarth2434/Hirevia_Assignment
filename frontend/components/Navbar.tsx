'use client';

import { useMockAuth } from '@/contexts/MockAuthContext';

export default function Navbar() {
  const { user, logout, hasRole } = useMockAuth();

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button 
          onClick={() => navigateTo('/')} 
          className="text-xl font-bold hover:text-blue-200 cursor-pointer"
        >
          Auth & Assessment System
        </button>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button 
                onClick={() => navigateTo('/dashboard')} 
                className="hover:text-blue-200 cursor-pointer"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigateTo('/assessment')} 
                className="hover:text-blue-200 cursor-pointer"
              >
                Assessment
              </button>
              <button 
                onClick={() => navigateTo('/video-interview')} 
                className="hover:text-blue-200 cursor-pointer"
              >
                Video Interview
              </button>
              {hasRole('ADMIN') && (
                <button 
                  onClick={() => navigateTo('/admin')} 
                  className="hover:text-blue-200 cursor-pointer"
                >
                  Admin
                </button>
              )}
              <span className="text-blue-200">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <button
                onClick={logout}
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('/simple-login')}
                className="hover:text-blue-200 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigateTo('/register')}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}