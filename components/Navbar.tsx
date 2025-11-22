'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Search, Bell } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!mounted) return null;
  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center max-w-5xl">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold font-serif tracking-tight text-foreground">
              BlogApp
            </span>
          </Link>
          
          {/* Desktop Search Placeholder */}
          <div className="hidden md:flex items-center gap-2 text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-md w-64">
            <Search size={16} />
            <span className="text-sm font-sans">Search...</span>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/posts/create"
            className="hidden sm:block text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Write
          </Link>

          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={20} />
          </button>

          <ThemeSwitcher />

          <div className="h-4 w-px bg-border"></div>

          <button
            onClick={handleLogout}
            className="text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
          
          <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden border border-border">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </div>
    </nav>
  );
}
