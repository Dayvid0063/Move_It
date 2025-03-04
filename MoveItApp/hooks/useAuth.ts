import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  login: async (credentials) => {
    try {
      // API call would go here
      const response = await fetch('YOUR_API_URL/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      await AsyncStorage.setItem('@auth_token', data.token);
      set({ user: data.user, token: data.token });
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem('@auth_token');
    set({ user: null, token: null });
  },
  register: async (userData) => {
    try {
      // API call would go here
      const response = await fetch('YOUR_API_URL/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      await AsyncStorage.setItem('@auth_token', data.token);
      set({ user: data.user, token: data.token });
    } catch (error) {
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (!token) {
        set({ isLoading: false });
        return;
      }

      // Verify token with backend
      const response = await fetch('YOUR_API_URL/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      set({ user: data.user, token, isLoading: false });
    } catch (error) {
      await AsyncStorage.removeItem('@auth_token');
      set({ user: null, token: null, isLoading: false });
    }
  },
}));

export const useAuth = () => {
  const { login, logout, register, checkAuth, user, isLoading } = useAuthStore();

  return {
    login,
    logout,
    register,
    checkAuth,
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
