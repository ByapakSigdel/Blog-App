'use client';
import { useState, useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { useRouter, useParams } from 'next/navigation';
import PrivateRoute from '@/app/protected/PrivateRoute';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import { Edit3, Type, FileText, Save } from 'lucide-react';

export default function EditPostPage() {
  const { id } = useParams();
  const { getPost, updatePost, loading, fetchPosts } = usePosts();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      await fetchPosts();
      const post = getPost(Number(id));
      if (post) {
        setTitle(post.title);
        setBody(post.body);
      } else {
        router.push('/dashboard');
      }
      setIsLoadingPost(false);
    };
    loadPost();
  }, [id, getPost, fetchPosts, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(Number(id), title, body);
    router.push('/dashboard');
  };

  if (isLoadingPost) return <Loader />;

  return (
    <PrivateRoute>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
              <p className="text-muted-foreground text-sm">Make changes to your content</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Type size={18} />
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground">
                  <FileText size={18} />
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[200px] resize-y text-foreground"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Save size={18} />
                {loading ? 'Updating...' : 'Update Post'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </PrivateRoute>
  );
}
