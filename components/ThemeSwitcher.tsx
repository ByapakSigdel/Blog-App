'use client';

import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
