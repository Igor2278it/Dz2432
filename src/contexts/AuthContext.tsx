import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
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
    // Get initial user
    authApi.getCurrentUser().then((supabaseUser) => {
      if (supabaseUser) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name,
          isVerified: supabaseUser.email_confirmed_at !== null,
          onboardingCompleted: supabaseUser.user_metadata?.onboarding_completed || false,
          level: supabaseUser.user_metadata?.level || 1,
          xp: supabaseUser.user_metadata?.xp || 0,
          streak: supabaseUser.user_metadata?.streak || 0,
        });
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authApi.onAuthStateChange((supabaseUser) => {
      if (supabaseUser) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name,
          isVerified: supabaseUser.email_confirmed_at !== null,
          onboardingCompleted: supabaseUser.user_metadata?.onboarding_completed || false,
          level: supabaseUser.user_metadata?.level || 1,
          xp: supabaseUser.user_metadata?.xp || 0,
          streak: supabaseUser.user_metadata?.streak || 0,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      await authApi.signUp(email, password, name);
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await authApi.signIn(email, password);
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed');
    }
  };

  const signInWithGoogle = async () => {
    try {
      await authApi.signInWithGoogle();
    } catch (error: any) {
      throw new Error(error.message || 'Google sign in failed');
    }
  };

  const signInWithApple = async () => {
    try {
      await authApi.signInWithApple();
    } catch (error: any) {
      throw new Error(error.message || 'Apple sign in failed');
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
    } catch (error: any) {
      throw new Error(error.message || 'Sign out failed');
    }
  };

  const completeOnboarding = async (data: any) => {
    // This would update user metadata in Supabase
    // For now, just update local state
    if (user) {
      setUser({
        ...user,
        onboardingCompleted: true,
        xp: 100, // Welcome bonus
      });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signOut,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};