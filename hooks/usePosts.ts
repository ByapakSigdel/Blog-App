import { create } from 'zustand';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  image: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (title: string, body: string) => Promise<void>;
  updatePost: (id: number, title: string, body: string) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  getPost: (id: number) => Post | undefined;
}

const MOCK_POSTS = [
  { id: 1, title: "The Future of Web Development", body: "Web development is evolving rapidly. From server-side rendering to static site generation, the landscape is changing. In this article, we explore the latest trends and what they mean for developers.", image: "https://picsum.photos/seed/webdev/800/400" },
  { id: 2, title: "Mastering React Hooks", body: "Hooks have revolutionized how we write React components. Learn how to use useState, useEffect, and custom hooks to build cleaner, more efficient applications.", image: "https://picsum.photos/seed/react/800/400" },
  { id: 3, title: "Tailwind CSS: A Utility-First Framework", body: "Stop fighting with CSS classes. Tailwind CSS allows you to build modern designs directly in your markup. Discover why it's becoming the go-to choice for many developers.", image: "https://picsum.photos/seed/tailwind/800/400" },
  { id: 4, title: "Understanding TypeScript Generics", body: "Generics provide a way to create reusable components that work with a variety of types rather than a single one. This guide breaks down the complex topic into easy-to-understand concepts.", image: "https://picsum.photos/seed/ts/800/400" },
  { id: 5, title: "Next.js 14: What's New?", body: "Next.js 14 introduces Server Actions, partial prerendering, and more. We dive deep into the new features and how they can improve your application's performance.", image: "https://picsum.photos/seed/nextjs/800/400" },
  { id: 6, title: "The Art of Clean Code", body: "Writing code is easy. Writing clean, maintainable code is an art. Learn the principles of clean code and how to apply them in your daily work.", image: "https://picsum.photos/seed/code/800/400" },
];

export const usePosts = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  fetchPosts: async () => {
    if (get().posts.length > 0) return;
    set({ loading: true, error: null });
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use our realistic mock data instead of jsonplaceholder
      const data = MOCK_POSTS.map(post => ({
        ...post,
        userId: 1
      }));
      
      set({ posts: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
  addPost: async (title, body) => {
    set({ loading: true });
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newPost = {
            id: Date.now(),
            title,
            body,
            userId: 1,
            image: `https://picsum.photos/seed/${Date.now()}/800/400` // Generate random image based on timestamp
        };
        set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
    } catch (error) {
        set({ error: 'Failed to add post', loading: false });
    }
  },
  updatePost: async (id, title, body) => {
      set({ loading: true });
      try {
          await new Promise(resolve => setTimeout(resolve, 500));
          set((state) => ({
              posts: state.posts.map((p) => p.id === Number(id) ? { ...p, title, body } : p),
              loading: false
          }));
      } catch (error) {
          set({ error: 'Failed to update post', loading: false });
      }
  },
  deletePost: async (id) => {
      set({ loading: true });
      try {
          await new Promise(resolve => setTimeout(resolve, 500));
          set((state) => ({
              posts: state.posts.filter((p) => p.id !== Number(id)),
              loading: false
          }));
      } catch (error) {
          set({ error: 'Failed to delete post', loading: false });
      }
  },
  getPost: (id) => {
      return get().posts.find((p) => p.id === Number(id));
  }
}));
