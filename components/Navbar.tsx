'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, PlusCircle, LayoutDashboard, BookOpen } from 'lucide-react';
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            BlogApp
          </span>
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-4">
          <Link href="/dashboard">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              pathname === '/dashboard' 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}>
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </div>
          </Link>
          
          <Link href="/posts/create">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              <PlusCircle size={18} />
              <span className="hidden sm:inline font-medium">New Post</span>
            </motion.div>
          </Link>
          
          <div className="h-6 w-px bg-border mx-2"></div>

          <ThemeSwitcher />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive px-3 py-2 rounded-full hover:bg-destructive/10 transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
