# 🏗️ Architecture & State Management

## State Management (Zustand)

We use **Zustand** for global state management due to its simplicity and small bundle size.

### Stores

1.  **`useAuth`**: Manages authentication state.
    -   **State**: `user`, `token`, `isAuthenticated`
    -   **Persistence**: Uses `persist` middleware to save to `localStorage`.
    -   **Mocking**: Login/Register functions simulate API calls and return fake JWTs.

2.  **`usePosts`**: Manages blog posts.
    -   **State**: `posts[]`, `loading`, `error`
    -   **Actions**: `fetchPosts`, `addPost`, `updatePost`, `deletePost`
    -   **Optimistic Updates**: The UI updates immediately (local state modification) while simulating an API delay.

3.  **`useTheme`**: Manages UI theme preferences.
    -   **State**: `mode` (light/dark), `preset` (color scheme)
    -   **Persistence**: Saved to `localStorage` so user preferences persist across reloads.

## Authentication Flow

1.  **Login**: User enters credentials -> `useAuth.login()` is called -> Mock token saved -> Redirect to `/dashboard`.
2.  **Protection**: `PrivateRoute` component checks `isAuthenticated`. If false, redirects to `/login`.
3.  **Hydration**: `useEffect` in `Navbar` and `PrivateRoute` ensures client-side hydration matches server rendering to prevent hydration mismatches.

## Folder Structure

-   **`app/`**: Contains the App Router pages.
    -   `page.tsx` is a server component.
    -   `layout.tsx` wraps the app with providers.
-   **`components/`**: Reusable UI components.
    -   Presentational components (dumb) like `PostCard`.
    -   Container components (smart) like `ThemeSwitcher`.
-   **`hooks/`**: Custom hooks and Zustand stores.

## Adding New Features

1.  **Define State**: If global data is needed, create a new store in `hooks/`.
2.  **Create Component**: Build the UI in `components/`.
3.  **Create Page**: Add a new folder in `app/` with a `page.tsx`.
4.  **Protect Route**: Wrap the page content in `<PrivateRoute>` if it requires auth.
