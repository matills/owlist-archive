import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Implement with Supabase
      console.log('Login:', email, password);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ user: { id: '1', email }, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  signup: async (email, password, username) => {
    set({ isLoading: true });
    try {
      // TODO: Implement with Supabase
      console.log('Signup:', email, password, username);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ user: { id: '1', email, username }, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    try {
      // TODO: Implement with Supabase
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  resetPassword: async (email) => {
    set({ isLoading: true });
    try {
      // TODO: Implement with Supabase
      console.log('Reset password:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
