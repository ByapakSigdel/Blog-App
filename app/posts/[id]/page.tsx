'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Edit2, Trash2 } from 'lucide-react';
import Loader from '@/components/Loader';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getPost, fetchPosts, deletePost, loading, posts } = usePosts();
  const [post, setPost] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (posts.length === 0) {
        await fetchPosts();
      }
      const foundPost = getPost(Number(id));
      if (foundPost) {
        setPost(foundPost);
      }
    };
    loadPost();
  }, [id, posts.length, fetchPosts, getPost]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      await deletePost(Number(id));
      router.push('/dashboard');
    }
  };

  if (loading && !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!post && !loading && posts.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/dashboard" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-[40vh] w-full md:h-[50vh]">
        <Image
          src={post.image || `https://picsum.photos/seed/${post.id}/1200/600`}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight shadow-sm">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70">Author</span>
                  <span className="font-medium">John Doe</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Calendar size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70">Published</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Clock size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-70">Read Time</span>
                  <span className="font-medium">5 min read</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.body}
            </p>
            
            {/* Simulated extra content for better reading experience */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3>Why this matters</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul>
              <li>Key insight number one about {post.title}</li>
              <li>Another important point to consider</li>
              <li>Final thoughts on the subject</li>
            </ul>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <div className="flex gap-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
              >
                <Edit2 size={18} />
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium disabled:opacity-50"
              >
                <Trash2 size={18} />
                {isDeleting ? 'Deleting...' : 'Delete Post'}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
