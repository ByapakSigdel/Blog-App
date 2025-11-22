import Link from 'next/link';
import { Post } from '@/hooks/usePosts';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  index?: number;
}

export default function PostCard({ post, onDelete, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar size={14} />
          <span>{new Date().toLocaleDateString()}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
          <span>Article</span>
        </div>
        
        <h2 className="text-xl font-bold mb-3 text-foreground capitalize leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {post.body}
        </p>
      </div>
      
      <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-between items-center">
        <Link
          href={`/posts/${post.id}/edit`}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10"
        >
          <Edit2 size={16} />
          Edit
        </Link>
        
        <button
          onClick={() => onDelete(post.id)}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg hover:bg-destructive/10"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </motion.div>
  );
}
