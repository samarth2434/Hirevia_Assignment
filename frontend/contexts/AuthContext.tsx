'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import keycloak from '@/lib/keycloak';

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
    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }).then((authenticated) => {
      setKeycloakReady(true);
    });
  }, []);

  const login = () => {
    signIn('keycloak');
  };

  const logout = () => {
    signOut();
    keycloak.logout();
  };

  const hasRole = (role: string): boolean => {
    if (session?.user) {
      // Check roles from token
      return keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role);
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