'use client';
import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import PrivateRoute from '@/app/protected/PrivateRoute';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

export default function DashboardPage() {
  const { posts, loading, error, fetchPosts, deletePost } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PrivateRoute>
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <LayoutGrid size={24} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>

        {loading && posts.length === 0 && <Loader />}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20">
            {error}
          </div>
        )}
        
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">No posts found. Create your first post!</p>
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} index={index} />
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
}
