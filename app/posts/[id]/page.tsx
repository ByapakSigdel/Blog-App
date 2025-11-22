'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit2, Trash2, Share2, MessageCircle, Heart } from 'lucide-react';
import Loader from '@/components/Loader';
import DOMPurify from 'dompurify';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getPost, fetchPosts, deletePost, likePost, addComment, loading, posts } = usePosts();
  const [post, setPost] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

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
  }, [id, posts, fetchPosts, getPost]); // Added posts dependency to refresh when likes/comments change

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      await deletePost(Number(id));
      router.push('/dashboard');
    }
  };

  const handleLike = () => {
    likePost(Number(id));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(Number(id), commentText);
    setCommentText('');
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

  const sanitizedContent = typeof window !== 'undefined' 
    ? DOMPurify.sanitize(post.body) 
    : post.body;

  return (
    <div className="min-h-screen bg-background pb-20 pt-8">
      <article className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-6 border-t border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative">
                <Image 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId || 'author'}`}
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-foreground">John Doe</span>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <button className="hover:text-foreground transition-colors" title="Share">
                <Share2 size={20} />
              </button>
              <div className="h-4 w-px bg-border mx-1"></div>
              <Link 
                href={`/posts/${post.id}/edit`} 
                className="hover:text-primary transition-colors"
                title="Edit"
              >
                <Edit2 size={20} />
              </Link>
              <button 
                onClick={handleDelete} 
                disabled={isDeleting} 
                className="hover:text-destructive transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] mb-10 rounded-md overflow-hidden bg-muted">
          <Image
            src={post.image || `https://picsum.photos/seed/${post.id}/1200/600`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div 
          className="prose prose-lg prose-stone dark:prose-invert max-w-none font-serif leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        
        <div className="mt-12 pt-8 border-t border-border">
           <div className="flex items-center justify-between text-muted-foreground mb-8">
             <div className="flex gap-6">
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                   <Heart size={20} className={post.likes > 0 ? "fill-primary text-primary" : "group-hover:text-primary"} />
                   <span>{post.likes || 0} Likes</span>
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                   <MessageCircle size={20} />
                   <span>{post.comments?.length || 0} Comments</span>
                </button>
             </div>
           </div>

           {showComments && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="space-y-8"
             >
               <form onSubmit={handleCommentSubmit} className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 relative">
                    <Image 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser`}
                      alt="You"
                      fill
                      className="object-cover"
                    />
                 </div>
                 <div className="flex-1">
                   <textarea
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                     placeholder="Write a comment..."
                     className="w-full p-4 bg-muted/50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[100px] font-sans"
                   />
                   <div className="flex justify-end mt-2">
                     <button 
                       type="submit"
                       disabled={!commentText.trim()}
                       className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                     >
                       Post Comment
                     </button>
                   </div>
                 </div>
               </form>

               <div className="space-y-6">
                 {post.comments?.map((comment: any) => (
                   <div key={comment.id} className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 relative">
                        <Image 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                          alt={comment.author}
                          fill
                          className="object-cover"
                        />
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-medium text-foreground">{comment.author}</span>
                         <span className="text-xs text-muted-foreground">
                           {new Date(comment.date).toLocaleDateString()}
                         </span>
                       </div>
                       <p className="text-foreground/80 leading-relaxed">{comment.text}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           )}
        </div>
      </article>
    </div>
  );
}
