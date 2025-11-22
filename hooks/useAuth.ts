import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (email: string) => {
        // Mock login logic
        const mockUser = { id: 1, name: 'User', email };
        const mockToken = 'mock-jwt-token-' + Date.now();
        set({ user: mockUser, token: mockToken, isAuthenticated: true });
      },
      register: (email: string, name: string) => {
        // Mock register logic
        const mockUser = { id: 1, name, email };
        const mockToken = 'mock-jwt-token-' + Date.now();
        set({ user: mockUser, token: mockToken, isAuthenticated: true });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
