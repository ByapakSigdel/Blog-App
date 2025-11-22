import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/hooks/usePosts';
import { motion } from 'framer-motion';
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import DOMPurify from 'dompurify';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  index?: number;
}

export default function PostCard({ post, onDelete, index = 0 }: PostCardProps) {
  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html.replace(/<[^>]*>?/gm, '');
    const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return clean || html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group py-8 border-b border-border last:border-0"
    >
      <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8">
        {/* Content Column */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Author Meta */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-secondary overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`} alt="Author" />
            </div>
            <span className="text-xs font-sans font-medium text-foreground">Author Name</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-sans text-muted-foreground">{new Date().toLocaleDateString()}</span>
          </div>

          <Link href={`/posts/${post.id}`} className="group-hover:opacity-80 transition-opacity">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-2 leading-tight">
              {post.title}
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed line-clamp-2 mb-4">
              {stripHtml(post.body)}
            </p>
          </Link>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {post.category}
              </span>
              <span className="text-xs font-sans text-muted-foreground">4 min read</span>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/posts/${post.id}/edit`}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </Link>
              <button
                onClick={() => onDelete(post.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <Link href={`/posts/${post.id}`} className="w-full md:w-48 h-48 md:h-32 relative shrink-0 rounded-md overflow-hidden bg-secondary">
          <Image 
            src={post.image || `https://picsum.photos/seed/${post.id}/800/400`} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
    </motion.div>
  );
}
