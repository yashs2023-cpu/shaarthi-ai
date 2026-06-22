import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (authService.isAuthenticated()) {
        const cachedUser = authService.getCurrentUser();
        if (cachedUser) {
          setUser(cachedUser);
          setIsAuthenticated(true);
        }

        // Skip backend call for demo tokens
        const token = authService.getToken();
        if (token?.startsWith('demo_token_')) {
          setLoading(false);
          return;
        }

        // Verify with backend for real tokens
        const result = await authService.getProfile();
        if (result.success) {
          setUser(result.user);
          setIsAuthenticated(true);
        } else {
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    return result;
  };

  const register = async (name, email, phone, password, language) => {
    return await authService.register(name, email, phone, password, language);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
