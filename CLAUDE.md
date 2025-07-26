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

## CRITICAL: Meta Tags Requirements

**NEVER create or edit a page without comprehensive meta tags for SEO and social sharing.**

### Required Meta Tags for ALL Pages

```jsx
<Helmet>
  {/* Basic SEO */}
  <title>Descriptive Page Title | 6Pack NZ</title>
  <meta name="description" content="Compelling 150-160 character description with NZ keywords" />
  <meta name="keywords" content="relevant, keywords, new zealand, fitness" />
  
  {/* Open Graph for Facebook/LinkedIn */}
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description" />
  <meta property="og:image" content="https://images.unsplash.com/photo-id?w=1200&h=630&fit=crop&fm=webp&q=85" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://6pack.co.nz/page-url" />
  <meta property="og:type" content="website" />
  
  {/* Twitter Cards */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />
  <meta name="twitter:description" content="Page description" />
  <meta name="twitter:image" content="https://images.unsplash.com/photo-id?w=1200&h=630&fit=crop&fm=webp&q=85" />
  
  {/* Canonical URL */}
  <link rel="canonical" href="https://6pack.co.nz/page-url" />
</Helmet>
```

### Image Requirements for Social Sharing

- **Dimensions:** Always use 1200x630 pixels for Open Graph images
- **Format:** Use Unsplash URLs with `w=1200&h=630&fit=crop&fm=webp&q=85`
- **Content:** Choose fitness-relevant images that represent the page content
- **Always include:** `og:image:width` and `og:image:height` meta tags

### NZ-Specific SEO Guidelines

- Include "New Zealand", "NZ", or "Kiwi" in titles and descriptions where relevant
- Target local regions: "Auckland", "Wellington", "Canterbury", "Christchurch"
- Use local context: "gym NZ", "fitness New Zealand", "workout plans NZ"

### Article Pages Special Requirements

```jsx
// For dynamic article images, ensure proper social media dimensions
<meta property="og:image" content={article.image.replace(/w=\d+&h=\d+/, 'w=1200&h=630')} />

// Include article-specific meta tags
<meta property="article:author" content={article.author} />
<meta property="article:published_time" content={article.publishDate} />
<meta property="article:section" content={article.category} />
```

### Page Type Specific Images

- **Calculator pages:** Fitness tracking/measurement themed images
- **Workout pages:** Exercise/gym equipment images  
- **Articles:** Reading/learning themed fitness images
- **Shop pages:** Supplements/equipment images
- **General pages:** High-quality gym/fitness lifestyle images

### JSON-LD Structured Data

Always include structured data for better search engine understanding:

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage", // or "Article" for articles
    "name": "Page Name",
    "description": "Page description",
    "url": "https://6pack.co.nz/page-url"
  })}
</script>
```

### Testing Meta Tags

Before deploying, always test:
1. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
2. Twitter Card Validator: https://cards-dev.twitter.com/validator
3. LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Common Mistakes to Avoid

❌ **DON'T:**
- Skip meta descriptions
- Use generic titles like "Page - 6Pack"
- Forget to include NZ-specific keywords
- Use images smaller than 1200x630
- Copy identical meta tags across pages

✅ **DO:**
- Write unique, descriptive titles for each page
- Include compelling meta descriptions
- Use proper social media image dimensions
- Test social sharing before deploying
- Include structured data where relevant