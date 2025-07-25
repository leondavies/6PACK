# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with hot reload
- **Build**: `npm run build` - Creates production build in `dist/` folder
- **Linting**: `npm run lint` - Runs ESLint on all JavaScript files
- **Preview**: `npm run preview` - Serves production build locally

## Project Architecture

This is a React fitness/nutrition website built with Vite, featuring:

### Core Technologies
- **React 18** with functional components and hooks
- **React Router DOM** for client-side routing
- **Vite** as build tool and dev server
- **Tailwind CSS** for styling with custom fitness theme
- **Framer Motion** for animations

### Application Structure

**Routing**: All routes defined in `src/App.jsx` with automatic scroll-to-top behavior. Main sections:
- `/` - Home page
- `/shop` - E-commerce section 
- `/calculators/*` - Fitness calculators (BMI, BMR, body fat, etc.)
- `/workouts/*` - Workout routines by muscle group
- `/articles/*` - Fitness/nutrition articles
- `/subscription` - Subscription service

**Layout System**: Uses `src/components/layout.jsx` wrapper with:
- Google Tag Manager integration in Helmet
- Fixed header with `pt-20` main content offset
- Responsive Footer component

**State Management**: 
- Custom `useCart` hook for e-commerce functionality with localStorage persistence
- No global state manager - uses React hooks and context patterns

**Data Layer**:
- `src/data/products.js` contains large dataset of articles and products
- Articles have slug-based routing with markdown content
- Cart functionality supports quantity management and shipping calculations

### Styling Architecture

**Tailwind Configuration**:
- Custom fitness color palette: `primary` (green), `secondary` (neutral), `accent` (orange)
- Custom font family: `font-fitness` using Inter
- Typography plugin enabled for article content

**Component Patterns**:
- Layout components in `src/components/layout/`
- UI components in `src/components/ui/`
- Page components organized by feature in `src/pages/`

### Key Business Logic

**E-commerce Features**:
- Shopping cart with localStorage persistence
- Free shipping threshold at $99
- Quantity management and totals calculation

**Calculator Tools**: Multiple fitness calculators with form validation using react-hook-form and Zod schemas

**Content System**: Articles with markdown content, SEO optimization, and dynamic slug routing

## Development Notes

- Uses ESLint with React-specific rules and React 18.3 settings
- Vite config includes PostCSS with Tailwind and Autoprefixer
- History API fallback enabled for SPA routing
- Sonner toast notifications integrated
- Google Analytics tracking via GTM