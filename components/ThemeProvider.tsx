'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode, mounted]);

  return <>{children}</>;
}
