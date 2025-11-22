'use client';

import { Search, Filter } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';

const CATEGORIES = ['All', 'Technology', 'Development', 'Design', 'Best Practices'];

export default function SearchFilter() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = usePosts();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
      
      <div className="relative min-w-[200px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}