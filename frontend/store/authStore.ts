import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        const response = await api.auth.login(email, password);
        const data = await response.json();
        
        if (response.ok && data.success) {
          set({
            user: data.data.user,
            token: data.data.token,
            isAuthenticated: true
          });
        } else {
          throw new Error(data.message || 'Login failed');
        }
      },
      
      register: async (userData) => {
        const response = await api.auth.register(userData);
        const data = await response.json();
        
        if (response.ok && data.success) {
          set({
            user: data.data.user,
            token: data.data.token,
            isAuthenticated: true
          });
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      checkAuth: async () => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await api.auth.getMe(token);
          const data = await response.json();
          
          if (response.ok && data.success) {
            set({ user: data.data, isAuthenticated: true });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch (error) {
          get().logout();
          return false;
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);