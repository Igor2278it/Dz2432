const API_BASE = '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: any;
  token?: string;
  errors?: any[];
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(email: string, password: string, name?: string) {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async completeOnboarding(data: {
    mainGoal: string;
    plantTypes: string[];
    experienceLevel: string;
    careFrequency: string;
    wantsReminders: boolean;
    customGoal?: string;
  }) {
    return this.request<any>('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  async checkHealth() {
    return this.request<any>('/health');
  }
}

export const api = new ApiClient(API_BASE);