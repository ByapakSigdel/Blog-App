import { create } from 'zustand';

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  image: string;
  category: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  
  fetchPosts: () => Promise<void>;
  addPost: (title: string, body: string, category: string, tags: string[]) => Promise<void>;
  updatePost: (id: number, title: string, body: string, category: string, tags: string[]) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  getPost: (id: number) => Post | undefined;
  likePost: (id: number) => void;
  addComment: (postId: number, text: string) => void;
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
  
  getFilteredPosts: () => Post[];
  getPaginatedPosts: () => { data: Post[], totalPages: number };
}

const MOCK_POSTS = [
  { 
    id: 1, 
    title: "How Authentication Works in This App", 
    body: "<h2>Authentication Flow</h2><p>This application uses a JWT-based authentication system managed by the <code>useAuth</code> hook. When you log in, a mock token is generated and stored in <code>localStorage</code>.</p><h3>Key Components:</h3><ul><li><strong>useAuth Hook:</strong> Manages the user state (<code>user</code>, <code>isAuthenticated</code>) and provides <code>login</code> and <code>logout</code> methods.</li><li><strong>Persistence:</strong> The hook checks <code>localStorage</code> on initialization to restore the session.</li><li><strong>Security:</strong> While this is a demo, a real app would validate the token with a backend API.</li></ul><p>Check <code>hooks/useAuth.ts</code> to see the implementation details.</p>", 
    image: "https://picsum.photos/seed/auth/800/400", 
    category: "Development", 
    tags: ["Auth", "Security", "React Hooks"],
    userId: 1,
    likes: 12,
    comments: []
  },
  { 
    id: 2, 
    title: "State Management with Zustand", 
    body: "<h2>Why Zustand?</h2><p>We chose Zustand for state management because it's lightweight, boilerplate-free, and easy to use with React hooks.</p><h3>Implementation Details</h3><p>The <code>usePosts</code> store handles all blog-related data:</p><ul><li><strong>Posts Array:</strong> Stores the list of blog posts.</li><li><strong>Filtering & Search:</strong> Manages <code>searchQuery</code> and <code>selectedCategory</code> state.</li><li><strong>Pagination:</strong> Tracks <code>currentPage</code> and calculates paginated results.</li><li><strong>Actions:</strong> Provides <code>addPost</code>, <code>updatePost</code>, and <code>deletePost</code> methods that simulate API calls.</li></ul><p>This centralized store makes it easy to share state between the Dashboard, Search, and Pagination components.</p>", 
    image: "https://picsum.photos/seed/zustand/800/400", 
    category: "Technology", 
    tags: ["State Management", "Zustand", "Architecture"],
    userId: 1,
    likes: 8,
    comments: []
  },
  { 
    id: 3, 
    title: "Implementing Protected Routes", 
    body: "<h2>Securing the Application</h2><p>Certain routes like the Dashboard, Create Post, and Edit Post pages are protected and require the user to be logged in.</p><h3>The PrivateRoute Component</h3><p>We implemented a <code>PrivateRoute</code> wrapper component that checks the authentication status:</p><pre><code>if (!isAuthenticated) {\n  return null; // or redirect\n}</code></pre><p>If the user is not authenticated, they are automatically redirected to the Login page using Next.js <code>useRouter</code>. This ensures that sensitive areas of the application remain secure.</p>", 
    image: "https://picsum.photos/seed/security/800/400", 
    category: "Best Practices", 
    tags: ["Routing", "Security", "Next.js"],
    userId: 1,
    likes: 5,
    comments: []
  },
  { 
    id: 4, 
    title: "Form Validation with React Hook Form & Yup", 
    body: "<h2>Robust Form Handling</h2><p>Creating and editing posts requires reliable form validation. We combined <strong>React Hook Form</strong> for performance with <strong>Yup</strong> for schema validation.</p><h3>Features:</h3><ul><li><strong>Schema Definition:</strong> We define a Yup schema that enforces rules like minimum character counts for titles and content.</li><li><strong>Error Handling:</strong> Validation errors are displayed instantly below the input fields.</li><li><strong>Integration:</strong> The <code>Controller</code> component is used to integrate the custom Rich Text Editor with the form library.</li></ul><p>This approach ensures data integrity before it even reaches the 'backend'.</p>", 
    image: "https://picsum.photos/seed/forms/800/400", 
    category: "Development", 
    tags: ["Forms", "Validation", "UX"],
    userId: 1,
    likes: 3,
    comments: []
  },
  { 
    id: 5, 
    title: "Rich Text Editing with React Quill", 
    body: "<h2>Enhanced Content Creation</h2><p>To allow for formatted blog posts, we integrated <strong>React Quill</strong>.</p><h3>Implementation:</h3><p>The <code>RichTextEditor</code> component wraps the Quill editor and customizes the toolbar to provide essential formatting options like:</p><ul><li>Headers and Lists</li><li>Bold, Italic, Underline</li><li>Links and Blockquotes</li></ul><p>We also use <strong>DOMPurify</strong> to sanitize the HTML output before rendering it, preventing XSS attacks when displaying the blog posts.</p>", 
    image: "https://picsum.photos/seed/editor/800/400", 
    category: "Design", 
    tags: ["Rich Text", "UI", "Libraries"],
    userId: 1,
    likes: 15,
    comments: []
  },
  { 
    id: 6, 
    title: "Search, Filter, and Pagination", 
    body: "<h2>Managing Large Datasets</h2><p>A good blog needs to be navigable. We implemented client-side filtering and pagination directly in the <code>usePosts</code> store.</p><h3>How it Works:</h3><ol><li><strong>Filtering:</strong> The <code>getFilteredPosts</code> selector filters the posts array based on the search query and selected category.</li><li><strong>Pagination:</strong> The <code>getPaginatedPosts</code> selector takes the filtered results and slices them based on the <code>currentPage</code> and <code>postsPerPage</code>.</li></ol><p>This logic ensures that the UI remains responsive even as the user filters and changes pages.</p>", 
    image: "https://picsum.photos/seed/search/800/400", 
    category: "Technology", 
    tags: ["Algorithms", "UX", "Performance"],
    userId: 1,
    likes: 7,
    comments: []
  },
  { 
    id: 7, 
    title: "Theming: Dark & Light Mode", 
    body: "<h2>Modern UI with Theme Support</h2><p>The application supports both Dark and Light modes using Tailwind CSS and a custom <code>ThemeProvider</code>.</p><h3>Implementation:</h3><ul><li><strong>Context:</strong> A <code>ThemeContext</code> stores the current theme preference.</li><li><strong>Persistence:</strong> The preference is saved to <code>localStorage</code> so it persists across reloads.</li><li><strong>Tailwind:</strong> We use Tailwind's <code>dark:</code> modifier and CSS variables for colors (e.g., <code>bg-background</code>, <code>text-foreground</code>) to ensure seamless switching.</li></ul><p>Try toggling the theme in the navbar to see it in action!</p>", 
    image: "https://picsum.photos/seed/theme/800/400", 
    category: "Design", 
    tags: ["Theming", "Tailwind", "CSS"],
    userId: 1,
    likes: 20,
    comments: []
  }
];

export const usePosts = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'All',
  currentPage: 1,
  postsPerPage: 6,

  fetchPosts: async () => {
    if (get().posts.length > 0) return;
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = MOCK_POSTS.map(post => ({
        ...post,
        userId: 1
      }));
      set({ posts: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  addPost: async (title, body, category, tags) => {
    set({ loading: true });
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newPost: Post = {
            id: Date.now(),
            title,
            body,
            userId: 1,
            image: `https://picsum.photos/seed/${Date.now()}/800/400`,
            category,
            tags,
            likes: 0,
            comments: []
        };
        set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
    } catch (error) {
        set({ error: 'Failed to add post', loading: false });
    }
  },

  likePost: (id) => {
    set((state) => ({
      posts: state.posts.map((p) => 
        p.id === Number(id) ? { ...p, likes: p.likes + 1 } : p
      )
    }));
  },

  addComment: (postId, text) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: 'You', // In a real app, this would be the logged-in user
      date: new Date().toISOString()
    };
    
    set((state) => ({
      posts: state.posts.map((p) => 
        p.id === Number(postId) ? { ...p, comments: [...p.comments, newComment] } : p
      )
    }));
  },

  updatePost: async (id, title, body, category, tags) => {
      set({ loading: true });
      try {
          await new Promise(resolve => setTimeout(resolve, 500));
          set((state) => ({
              posts: state.posts.map((p) => p.id === Number(id) ? { ...p, title, body, category, tags } : p),
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
  },

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSelectedCategory: (category) => set({ selectedCategory: category, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  getFilteredPosts: () => {
    const { posts, searchQuery, selectedCategory } = get();
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.body.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },

  getPaginatedPosts: () => {
    const filtered = get().getFilteredPosts();
    const { currentPage, postsPerPage } = get();
    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return {
      data: filtered.slice(start, end),
      totalPages
    };
  }
}));
