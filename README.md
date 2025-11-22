# Modern Blog Platform

A feature-rich, responsive blog application built with Next.js 14, TypeScript, and Tailwind CSS. This project demonstrates a modern frontend architecture with client-side state management, dynamic theming, and smooth animations.

##  Documentation

- **[Developer Guide](docs/DEVELOPMENT_GUIDE.md)**: Implementation details, data mocking, and debugging strategies.
- **[Architecture Overview](docs/ARCHITECTURE.md)**: High-level system design and component hierarchy.
- **[Theming System](docs/THEMING.md)**: Guide to the CSS variable-based theming engine.

##  Key Features

- **Modern Tech Stack**: Built on Next.js 14 (App Router) and TypeScript.
- **Dynamic Theming**: Robust light/dark mode with 5 distinct color presets (Zinc, Rose, Blue, Green, Orange).
- **State Management**: Centralized store using Zustand for Authentication and Post management.
- **Interactive UI**: Smooth page transitions and micro-interactions powered by Framer Motion.
- **Rich Text Editing**: WYSIWYG editor for creating formatted blog posts.
- **Advanced Filtering**: Search and category filtering with client-side pagination.
- **Form Validation**: Robust form handling with Yup schemas and error feedback.
- **Realistic Mock Data**: Deterministic image generation and realistic content seeding without a backend dependency.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.

##  Project Structure

\\\`n app/                    # Next.js App Router pages
    dashboard/          # Main blog feed (Protected)
    login/              # Authentication pages
    posts/              # Dynamic post routes
       [id]/           # Individual post view
       create/         # Post creation form
       [id]/edit/      # Post editing form
    protected/          # Route protection components
 components/             # Reusable UI components
    Navbar.tsx          # Navigation and Theme controls
    PostCard.tsx        # Article preview card
    ...
 hooks/                  # Custom React Hooks & State
    useAuth.ts          # Authentication logic
    usePosts.ts         # Data layer (CRUD + Mocking)
    useTheme.ts         # Theme switching logic
 docs/                   # Project documentation
 public/                 # Static assets
\\\`n
##  Technical Architecture

### Data Flow
The application uses a **client-side architecture** simulated to behave like a full-stack app.
1.  **State**: All application state (User session, Posts data) is managed via **Zustand** stores in the \hooks/\ directory.
2.  **Persistence**: Data is mocked in memory (with realistic seed data) to allow immediate development without database setup.
3.  **Routing**: Next.js App Router handles navigation. Protected routes are wrapped in a \PrivateRoute\ component that checks authentication state before rendering.

### Styling System
*   **Tailwind CSS**: Utility-first styling.
*   **CSS Variables**: Theming is implemented using CSS variables in \globals.css\, allowing instant runtime theme switching without page reloads.
*   **Framer Motion**: Handles entry/exit animations and layout transitions.

##  Getting Started

1.  **Install Dependencies**:
    \\\ash
    npm install
    \\\`n
2.  **Run Development Server**:
    \\\ash
    npm run dev
    \\\`n
3.  **Open Application**:
    Visit [http://localhost:3000](http://localhost:3000). The app will redirect to the dashboard (or login if unauthenticated).

##  Contributing

Please refer to the \docs/\ folder for coding standards and architectural guidelines before submitting pull requests.
