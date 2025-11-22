# Developer Guide

This document outlines the technical implementation details of the blog application, specifically focusing on the data layer, image handling strategies, and routing logic. It serves as a reference for maintenance and debugging.

## Implementation Details

### 1. Data Layer & Mocking (`hooks/usePosts.ts`)
The application currently operates without a backend database. Instead, it uses a robust local mocking strategy to simulate a production environment.

*   **Mock Data Structure**: We utilize a `MOCK_POSTS` constant array. This replaces the previous `jsonplaceholder` fetch logic to provide realistic content (titles, bodies) rather than generic "lorem ipsum" text.
*   **Deterministic Images**: To ensure consistent visuals without file uploads, we use a seeding strategy.
    *   **Pattern**: `https://picsum.photos/seed/{id}/800/400`
    *   **Logic**: By passing the post `id` or a timestamp as the seed, the same post always renders the same image, persisting across reloads.
*   **State Management**: The `usePosts` hook (Zustand) manages the application state. It handles the initial fetch (populating from `MOCK_POSTS`) and subsequent CRUD operations in memory.

### 2. Image Optimization & Configuration
The application leverages Next.js's built-in Image Optimization API.

*   **Component**: We use `<Image />` from `next/image` for automatic resizing and lazy loading.
*   **Security Configuration**: To allow external images from `picsum.photos`, the domain is whitelisted in `next.config.ts`:
    ```typescript
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'picsum.photos' },
      ],
    }
    ```

### 3. Routing & Post Views (`app/posts/[id]`)
The application uses Next.js App Router's dynamic routes for individual post views.

*   **Dynamic Route**: `app/posts/[id]/page.tsx` handles all individual post requests.
*   **State Hydration Strategy**:
    *   When navigating from the dashboard, the data is already present in the Zustand store.
    *   **Direct Access/Refresh Handling**: If a user lands directly on a post URL (or refreshes), the store is initially empty. The `useEffect` hook detects this empty state and triggers `fetchPosts()` immediately to re-hydrate the store before attempting to find the specific post.

## Troubleshooting

### Common Issues

#### Images Not Loading
*   **Cause**: Usually due to missing configuration in `next.config.ts` or the development server not picking up config changes.
*   **Solution**:
    1.  Verify `picsum.photos` is in `remotePatterns` in `next.config.ts`.
    2.  **Restart the server**. Next.js requires a server restart (`Ctrl+C` -> `npm run dev`) to apply config changes.

#### "Post Not Found" on Refresh
*   **Cause**: The Zustand store resets on page reload. If the hydration logic fails, the component tries to find the post in an empty array.
*   **Solution**: Check the `useEffect` in `app/posts/[id]/page.tsx`. Ensure it calls `fetchPosts()` if `posts.length` is 0.

#### Animation Jitters
*   **Cause**: Framer Motion layout thrashing or mismatched initial states.
*   **Solution**: Ensure `layout.tsx` keys are stable and that `initial` vs `animate` properties in `PostCard.tsx` are valid CSS transform properties.
