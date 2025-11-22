'use client';
import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/app/protected/PrivateRoute';
import { motion } from 'framer-motion';
import { PenTool, Type, FileText, Save } from 'lucide-react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { addPost, loading } = usePosts();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost(title, body);
    router.push('/dashboard');
  };

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
              <PenTool size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
              <p className="text-muted-foreground text-sm">Share your thoughts with the world</p>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter an engaging title"
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
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[200px] resize-y text-foreground placeholder:text-muted-foreground"
                  placeholder="Write your masterpiece here..."
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
                {loading ? 'Publishing...' : 'Publish Post'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </PrivateRoute>
  );
}
