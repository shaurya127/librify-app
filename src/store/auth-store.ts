import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentPhone: string;
  error: string | null;
}

export interface AuthActions {
  setUser: (user: User) => void;
  setCurrentPhone: (phone: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User) => void;
  logout: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  currentPhone: '',
  error: null,
};

export const useAuthStore = create<AuthStore>()((
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user) => set({ user, error: null }),
      setCurrentPhone: (phone) => set({ currentPhone: phone }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      login: (user) => set({ user, isAuthenticated: true, error: null }),
      logout: () => set(initialState),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
));