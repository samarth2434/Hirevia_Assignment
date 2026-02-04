'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  loading: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [keycloakReady, setKeycloakReady] = useState(false);
  const loading = status === 'loading' || !keycloakReady;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import of keycloak to avoid SSR issues
      import('@/lib/keycloak').then(({ default: keycloak }) => {
        keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).then((authenticated) => {
          setKeycloakReady(true);
        });
      });
    } else {
      setKeycloakReady(true);
    }
  }, []);

  const login = () => {
    signIn('keycloak');
  };

  const logout = () => {
    signOut();
    if (typeof window !== 'undefined') {
      import('@/lib/keycloak').then(({ default: keycloak }) => {
        keycloak.logout();
      });
    }
  };

  const hasRole = (role: string): boolean => {
    if (session?.user && typeof window !== 'undefined') {
      // We'll need to check roles differently since keycloak is dynamically imported
      // For now, return false during SSR
      return false;
    }
    return false;
  };

  const value: AuthContextType = {
    isAuthenticated: !!session,
    user: session?.user,
    login,
    logout,
    loading,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};