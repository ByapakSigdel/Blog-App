import { create } from 'zustand';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
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

export const usePosts = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  fetchPosts: async () => {
    if (get().posts.length > 0) return; // Don't refetch if we have data (simple cache)
    set({ loading: true, error: null });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await res.json();
      set({ posts: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
  addPost: async (title, body) => {
    set({ loading: true });
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const newPost = {
            id: Date.now(),
            title,
            body,
            userId: 1
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
