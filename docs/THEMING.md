# 🎨 Theming System Guide

This project implements a robust, variable-based theming system that supports both **Light/Dark modes** and **Color Presets**.

## How it Works

The system relies on CSS variables (Custom Properties) defined in `app/globals.css`. These variables are scoped to the `:root` or specific data attributes on the `<html>` element.

### 1. Theme Provider

The `ThemeProvider` component (`components/ThemeProvider.tsx`) reads the theme state from the Zustand store (`hooks/useTheme.ts`) and applies two attributes to the `<html>` tag:

-   `data-mode`: `'light' | 'dark'`
-   `data-preset`: `'default' | 'matcha' | 'rose' | 'sunset' | 'bw'`

### 2. CSS Variables

We use semantic variable names to abstract the actual color values. This allows components to use generic names like `bg-primary` without knowing if it's blue, green, or red.

**Core Variables:**
-   `--background`: Page background color.
-   `--foreground`: Primary text color.
-   `--primary`: Main brand color (buttons, active states).
-   --primary-foreground`: Text color on top of primary.
-   `--muted`: Secondary background (cards, inputs).
-   `--border`: Border color.

### 3. Adding a New Preset

To add a new color scheme (e.g., "Purple"):

1.  **Update the Type Definition**:
    Open `hooks/useTheme.ts` and add `'purple'` to the `ThemePreset` type.

    ```typescript
    export type ThemePreset = 'default' | 'matcha' | 'rose' | 'sunset' | 'bw' | 'purple';
    ```

2.  **Add CSS Variables**:
    Open `app/globals.css` and add the selector:

    ```css
    /* Purple Preset */
    [data-preset="purple"] {
      --primary: #9333ea; /* purple-600 */
      --ring: #9333ea;
    }
    [data-mode="dark"][data-preset="purple"] {
      --primary: #a855f7; /* purple-500 */
      --ring: #a855f7;
    }
    ```

3.  **Update the Switcher UI**:
    Open `components/ThemeSwitcher.tsx` and add the preset to the list:

    ```typescript
    { id: 'purple', label: 'Purple', color: '#9333ea' },
    ```

## Tailwind Configuration

We use the new `@theme` directive in CSS (Tailwind v4 approach) or standard configuration to map these variables to utility classes.

```css
@theme {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... */
}
```

This allows you to use classes like `bg-primary`, `text-foreground`, `border-border` in your components.
