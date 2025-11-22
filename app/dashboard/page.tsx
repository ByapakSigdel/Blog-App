'use client';
import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import PrivateRoute from '@/app/protected/PrivateRoute';
import Loader from '@/components/Loader';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';

export default function DashboardPage() {
  const { loading, error, fetchPosts, deletePost, getPaginatedPosts } = usePosts();
  const { data: paginatedPosts } = getPaginatedPosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-4">Latest Posts</h1>
          <p className="text-muted-foreground font-sans">Thoughts, stories and ideas.</p>
        </div>

        <div className="mb-8">
          <SearchFilter />
        </div>

        {loading && paginatedPosts.length === 0 && <Loader />}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20">
            {error}
          </div>
        )}
        
        {!loading && !error && paginatedPosts.length === 0 && (
          <div className="text-center py-20 border-y border-dashed border-border">
            <p className="text-muted-foreground text-lg font-serif">No posts found matching your criteria.</p>
          </div>
        )}
        
        <div className="space-y-0">
          {paginatedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} index={index} />
          ))}
        </div>

        <Pagination />
      </div>
    </PrivateRoute>
  );
}
