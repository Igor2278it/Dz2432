export interface User {
  id: string;
  email: string;
  name?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  onboardingCompleted: boolean;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate?: Date;
}

export interface OnboardingData {
  id: string;
  userId: string;
  mainGoal: 'health' | 'learning' | 'fun' | 'community' | 'other';
  plantTypes: string[];
  experienceLevel: 'novice' | 'intermediate' | 'expert';
  careFrequency: 'daily' | 'weekly' | 'monthly';
  wantsReminders: boolean;
  customGoal?: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OnboardingRequest {
  mainGoal: string;
  plantTypes: string[];
  experienceLevel: string;
  careFrequency: string;
  wantsReminders: boolean;
  customGoal?: string;
}