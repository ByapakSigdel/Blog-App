'use client';
import { usePosts } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/app/protected/PrivateRoute';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Type, Save, Tag, Folder, X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RichTextEditor from '@/components/RichTextEditor';
import { useEffect } from 'react';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  body: yup.string().required('Content is required').min(20, 'Content must be at least 20 characters'),
  category: yup.string().required('Category is required'),
  tags: yup.string().required('Tags are required'),
});

const CATEGORIES = ['Technology', 'Development', 'Design', 'Best Practices'];

export default function CreatePostPage() {
  const { addPost } = usePosts();
  const router = useRouter();

  const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      category: 'Technology',
      tags: ''
    }
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const onSubmit = async (data: any) => {
    const tagsArray = data.tags.split(',').map((tag: string) => tag.trim());
    await addPost(data.title, data.body, data.category, tagsArray);
    router.push('/dashboard');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <PrivateRoute>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl border border-border flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <button 
              onClick={handleClose}
              className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>
            <div className="font-medium text-sm text-muted-foreground">New Post</div>
            <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 max-w-3xl mx-auto w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <input
                  {...register('title')}
                  placeholder="Title"
                  className="w-full bg-transparent text-4xl md:text-5xl font-bold font-serif placeholder:text-muted-foreground/40 border-none focus:ring-0 p-0 leading-tight"
                  autoFocus
                />
                {errors.title && <p className="text-sm text-destructive mt-2">{errors.title.message as string}</p>}
              </div>

              <div className="flex flex-wrap gap-6 items-center border-b border-border pb-6">
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <select 
                        {...register('category')}
                        className="bg-transparent border-none text-sm font-medium text-foreground focus:ring-0 p-0 cursor-pointer hover:text-primary transition-colors"
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                 </div>
                 
                 <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm text-muted-foreground">Tags:</span>
                    <input 
                        {...register('tags')}
                        placeholder="technology, writing..."
                        className="bg-transparent border-none text-sm text-foreground focus:ring-0 p-0 placeholder:text-muted-foreground/40 flex-1 min-w-[100px]"
                    />
                 </div>
              </div>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message as string}</p>}
              {errors.tags && <p className="text-sm text-destructive">{errors.tags.message as string}</p>}

              <div className="min-h-[400px]">
                <Controller
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor 
                      value={field.value} 
                      onChange={field.onChange}
                      error={errors.body?.message as string}
                    />
                  )}
                />
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}
