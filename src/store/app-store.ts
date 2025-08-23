// Simple state management for demo purposes
// For production apps, consider using Zustand, Redux Toolkit, or similar

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark' | 'system';
}

// Simple hook-based store
export function useAppStore() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    theme,

    // Actions
    setUser,
    setAuthenticated,
    setLoading,
    setTheme,
    logout,
  };
}
