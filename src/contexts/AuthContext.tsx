import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockApi, User } from '@/lib/mockApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await mockApi.getCurrentUser();
          if (response.success) {
            setUser(response.user!);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await mockApi.login(email, password);
      if (response.success) {
        localStorage.setItem('auth_token', response.token!);
        setUser(response.user!);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await mockApi.register(email, password, name);
      if (response.success) {
        localStorage.setItem('auth_token', response.token!);
        setUser(response.user!);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const completeOnboarding = async (data: any) => {
    try {
      const response = await mockApi.completeOnboarding(data);
      if (response.success) {
        setUser(response.user!);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await mockApi.getCurrentUser();
      if (response.success) {
        setUser(response.user!);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    completeOnboarding,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};