import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (userData: UserProfile, token: string) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('krishi_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('krishi_token');
  });

  const login = (userData: UserProfile, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('krishi_user', JSON.stringify(userData));
    localStorage.setItem('krishi_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('krishi_user');
    localStorage.removeItem('krishi_token');
  };

  const updateUser = (updatedData: Partial<UserProfile>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem('krishi_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
