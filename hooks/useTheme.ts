import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type ThemePreset = 'default' | 'matcha' | 'bw' | 'rose' | 'sunset';

interface ThemeState {
  mode: ThemeMode;
  preset: ThemePreset;
  setMode: (mode: ThemeMode) => void;
  setPreset: (preset: ThemePreset) => void;
  toggleMode: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      preset: 'default',
      setMode: (mode) => set({ mode }),
      setPreset: (preset) => set({ preset }),
      toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
