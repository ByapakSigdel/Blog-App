'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, ThemePreset } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Palette, Check } from 'lucide-react';

export default function ThemeSwitcher() {
  const { mode, preset, toggleMode, setPreset } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const presets: { id: ThemePreset; label: string; color: string }[] = [
    { id: 'default', label: 'Blue', color: '#2563eb' },
    { id: 'matcha', label: 'Matcha', color: '#16a34a' },
    { id: 'rose', label: 'Rose', color: '#e11d48' },
    { id: 'sunset', label: 'Sunset', color: '#ea580c' },
    { id: 'bw', label: 'B&W', color: '#18181b' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Theme Settings"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-border p-4 z-50"
          >
            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Mode</span>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-xs font-medium"
                >
                  {mode === 'light' ? <Sun size={14} /> : <Moon size={14} />}
                  {mode === 'light' ? 'Light' : 'Dark'}
                </button>
              </div>

              <div className="h-px bg-border" />

              {/* Presets */}
              <div>
                <span className="text-sm font-medium text-foreground block mb-3">Color Scheme</span>
                <div className="grid grid-cols-5 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                        preset === p.id ? 'ring-2 ring-offset-2 ring-primary ring-offset-background' : ''
                      }`}
                      style={{ backgroundColor: p.color }}
                      title={p.label}
                    >
                      {preset === p.id && <Check size={12} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
