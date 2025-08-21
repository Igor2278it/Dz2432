// Mock API for demo purposes
export interface User {
  id: string;
  email: string;
  name?: string;
  isVerified: boolean;
  onboardingCompleted: boolean;
  level: number;
  xp: number;
  streak: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: User;
  token?: string;
}

// Mock user storage
let mockUser: User | null = null;
let mockToken: string | null = null;

export const mockApi = {
  async register(email: string, password: string, name?: string): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    mockUser = {
      id: 'mock-user-id',
      email,
      name,
      isVerified: true,
      onboardingCompleted: false,
      level: 1,
      xp: 0,
      streak: 0,
    };
    
    mockToken = 'mock-jwt-token';
    
    return {
      success: true,
      message: 'Registration successful',
      user: mockUser,
      token: mockToken,
    };
  },

  async login(email: string, password: string): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!mockUser || mockUser.email !== email) {
      throw new Error('Invalid email or password');
    }
    
    mockToken = 'mock-jwt-token';
    
    return {
      success: true,
      message: 'Login successful',
      user: mockUser,
      token: mockToken,
    };
  },

  async getCurrentUser(): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!mockToken || !mockUser) {
      throw new Error('Not authenticated');
    }
    
    return {
      success: true,
      user: mockUser,
    };
  },

  async completeOnboarding(data: any): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!mockUser) {
      throw new Error('Not authenticated');
    }
    
    mockUser = {
      ...mockUser,
      onboardingCompleted: true,
      xp: 100, // Welcome bonus
    };
    
    return {
      success: true,
      message: 'Onboarding completed successfully',
      user: mockUser,
    };
  },
};