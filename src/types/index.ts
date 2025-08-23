export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export type Theme = 'light' | 'dark' | 'system';

export interface AppConfig {
  apiBaseUrl: string;
  apiKey?: string;
  environment: 'development' | 'staging' | 'production';
}
