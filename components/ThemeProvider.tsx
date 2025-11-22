'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, preset } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-preset', preset);
    
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode, preset, mounted]);

  // Prevent hydration mismatch by rendering children only after mount, 
  // or accept that the initial theme might be wrong on server (fouc).
  // For a better UX, we render children immediately but the theme might flicker.
  // To avoid flicker, we can use a script, but for this MVP, useEffect is fine.
  // We'll render a script to set initial class to avoid white flash in dark mode if possible,
  // but let's stick to simple React effect for now.
  
  return <>{children}</>;
}
