# AI Development Rules for Clínica Médica App

This document outlines the rules and conventions for the AI assistant to follow when developing and modifying this application. The goal is to ensure consistency, maintainability, and adherence to the chosen tech stack.

## Tech Stack Overview

This project is built with a modern, type-safe, and efficient technology stack. Key technologies include:

*   **Framework**: React with Vite for a fast development experience.
*   **Language**: TypeScript for type safety and improved developer experience.
*   **Backend as a Service (BaaS)**: Supabase for database, authentication, and storage.
*   **UI Components**: shadcn/ui, a collection of beautifully designed, accessible components built on Radix UI and Tailwind CSS.
*   **Styling**: Tailwind CSS for all styling needs, following a utility-first approach.
*   **Routing**: React Router (`react-router-dom`) for client-side navigation.
*   **Data Fetching & Server State**: TanStack Query for managing asynchronous operations, caching, and data synchronization with Supabase.
*   **Forms**: React Hook Form for building performant and flexible forms, paired with Zod for schema validation.
*   **Icons**: Lucide React for a comprehensive and consistent set of icons.

## Library Usage and Coding Conventions

### 1. UI and Components

*   **Primary Component Library**: **ALWAYS** use components from the `shadcn/ui` library (`@/components/ui`). Do not introduce other component libraries (e.g., Material-UI, Ant Design, Bootstrap).
*   **Custom Components**: When a `shadcn/ui` component is not sufficient, create new, reusable components in the `src/components/` directory. Style them exclusively with Tailwind CSS.
*   **Layout**: All layouts must be responsive. Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to ensure the application works well on all screen sizes.

### 2. Styling

*   **Styling Method**: Use **Tailwind CSS** for all styling. Avoid writing custom CSS in `.css` files.
*   **Utility-First**: Adhere to the utility-first paradigm. Create components to encapsulate repeated class patterns instead of creating custom CSS classes.
*   **Colors & Theme**: Use the theme colors defined in `tailwind.config.ts` and `src/index.css` (e.g., `bg-primary`, `text-foreground`). The theme is dynamically updated by `useTheme.tsx` based on `layout_settings` from the database.

### 3. State Management

*   **Server State**: Use **TanStack Query** (`useQuery`, `useMutation`) for all data fetching, caching, and server-side state management related to Supabase. Custom hooks abstracting these queries (e.g., `useDoctors`, `useStaticPages`) are the preferred way to access data.
*   **Client State**: For local component state, use React's built-in hooks (`useState`, `useReducer`). Avoid introducing global state managers like Redux or Zustand unless explicitly requested and justified by application complexity.

### 4. Forms

*   **Form Library**: Use **React Hook Form** (`react-hook-form`) for all forms.
*   **Validation**: Use **Zod** to define validation schemas for forms. The `@hookform/resolvers` package is available to connect Zod with React Hook Form.

### 5. Backend and Data

*   **Backend Interaction**: All interactions with the backend (database, auth, storage) **MUST** go through the Supabase client instance exported from `src/integrations/supabase/client.ts`.
*   **Data Access**: Use the custom hooks provided in `src/hooks/` (e.g., `useAppointments`, `useBlogPosts`) to interact with Supabase data. If a hook for a specific table doesn't exist, create one following the existing pattern.

### 6. Routing

*   **Router**: Use **React Router** for all navigation.
*   **Route Definitions**: All application routes are defined in `src/App.tsx`. Keep this file as the single source of truth for routing.
*   **Protected Routes**: Use the `AdminRoute` component (`src/components/AdminRoute.tsx`) to protect routes that require admin privileges.

### 7. Notifications

*   **Primary Toasts**: Use the `sonner` library for simple, non-blocking notifications (e.g., success/error messages after a form submission). It is globally available via the `<Sonner />` component in `App.tsx`.
*   **Secondary Toasts**: Use the `shadcn/ui` `Toaster` (`useToast` hook) for more complex notifications that might require user interaction or more descriptive content.

### 8. Code Structure

*   **Pages**: Place page-level components in `src/pages/`. Admin-specific pages go in `src/pages/admin/`.
*   **Components**: Place reusable components in `src/components/`. Admin-specific components go in `src/components/admin/`.
*   **Hooks**: Place custom React hooks in `src/hooks/`.
*   **File Naming**: Use PascalCase for component files (e.g., `MyComponent.tsx`).