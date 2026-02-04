'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockAuth, MockUser } from '@/lib/mockAuth';

interface MockAuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = async () => {
      try {
        if (typeof window !== 'undefined' && mockAuth.isAuthenticated()) {
          // Get stored user info instead of making API call
          const userStr = localStorage.getItem('mock_user');
          if (userStr) {
            const storedUser = JSON.parse(userStr);
            const currentUser = {
              username: storedUser.username,
              roles: storedUser.roles,
              email: storedUser.username + "@example.com",
              firstName: storedUser.username.charAt(0).toUpperCase() + storedUser.username.slice(1),
              lastName: "User"
            };
            setUser(currentUser);
          } else {
            mockAuth.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        mockAuth.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for:', username);
      
      const authResponse = await mockAuth.login(username, password);
      console.log('Login response:', authResponse);
      
      // Create user object from login response instead of making separate API call
      const currentUser = {
        username: authResponse.username,
        roles: authResponse.roles,
        email: authResponse.username + "@example.com", // Default email format
        firstName: authResponse.username.charAt(0).toUpperCase() + authResponse.username.slice(1),
        lastName: "User"
      };
      
      console.log('Setting user:', currentUser);
      setUser(currentUser);
    } catch (error: any) {
      console.error('Login error:', error);
      // Re-throw the error with more context
      if (error.message && error.message.includes('fetch')) {
        throw new Error(`Network connection failed. Please check if backend is running on http://localhost:8081`);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    mockAuth.logout();
    setUser(null);
  };

  const hasRole = (role: string): boolean => {
    return mockAuth.hasRole(role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}