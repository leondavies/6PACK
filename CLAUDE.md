# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Business Overview

6Pack.co.nz is a premium craft beer discovery and delivery platform for New Zealand. The business model includes:

**Revenue Streams:**
- Monthly subscription boxes ($49-89 NZD/month)
- Individual craft beer sales with nationwide delivery
- Brewery partnership and affiliate commissions
- Corporate gifting packages
- Beer education experiences (virtual/in-person)

**Target Market:** New Zealand craft beer enthusiasts, corporate clients, gift buyers

## Architecture Overview

This is a React + Vite multi-page e-commerce application with the following structure:

### Pages & Routes
- **Home** (`/`) - Marketing homepage with hero section and features
- **Shop** (`/shop`) - Product catalog with filtering, search, and cart functionality
- **Subscription** (`/subscription`) - Monthly beer subscription plans with Stripe integration
- **Brewery** (`/brewery`) - Brewery discovery and information pages

### Key Components
- **Layout System** (`src/components/layout/`): Header with navigation and cart, Footer with links
- **Header** (`src/components/layout/Header.jsx`): Navigation with cart counter
- **Footer** (`src/components/layout/Footer.jsx`): Site links and social media
- **BlurIn** (`src/components/blurText.jsx`): Animated text component using Framer Motion

### Data Management
- **Products** (`src/data/products.js`): Mock product catalog and brewery data
- **Cart Hook** (`src/hooks/useCart.js`): Shopping cart state management with localStorage
- **Stripe Integration** (`src/utils/stripe.js`): Payment processing utilities

### Technology Stack
- **React 18** with React Router for multi-page navigation
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling with utility classes
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hook Form + Zod** for form validation
- **Sonner** for toast notifications
- **Stripe** for payment processing
- **React Helmet** for SEO and meta tag management

### E-commerce Features
- Product catalog with search, filtering, and sorting
- Shopping cart with localStorage persistence  
- Subscription plan selection with payment integration
- Brewery discovery and product recommendations
- Responsive design optimized for mobile commerce

### Payment Integration
- Stripe checkout sessions for subscriptions and one-time purchases
- Mock payment flow for development/demo purposes
- Cart persistence across browser sessions
- NZD currency support

### SEO & Analytics
- Comprehensive SEO optimization for e-commerce
- Google Tag Manager integration (GTM-P7M9CTMZ)
- Product-specific meta tags and structured data
- Social media sharing optimization

### Development Notes
- Use `useCart` hook for all cart operations
- Product data is currently mock data in `src/data/products.js`
- Stripe integration includes mock mode for development
- All prices are in NZD
- Free shipping threshold is $99