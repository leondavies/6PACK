# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the 6Pack NZ fitness platform codebase.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server with hot reload
- **Build**: `npm run build` - Creates optimized production build with static export
- **Start**: `npm start` - Serves production build locally  
- **Linting**: `npm run lint` - Runs ESLint on all TypeScript/JavaScript files
- **Export**: `npm run export` - Exports static site (automatically included in build)

## Project Architecture

6Pack NZ is a **Next.js 14 App Router** fitness platform with static export, featuring comprehensive SEO optimization and fitness content management.

### Core Technologies
- **Next.js 14** with App Router and static export (`output: 'export'`)
- **React 18** with functional components, hooks, Server Components, and Client Components (`'use client'`)
- **Tailwind CSS** with custom fitness design system and typography plugin
- **Framer Motion** for smooth animations and page transitions
- **TypeScript/JavaScript** with ES modules (`"type": "module"`)
- **Vercel Analytics** for performance monitoring
- **Google Tag Manager** (GTM-P7M9CTMZ) for tracking and analytics
- **marked** library for markdown parsing and rendering
- **react-hook-form** with **Zod** for form validation
- **Sonner** for toast notifications

### Application Structure

**App Router Architecture** (`src/app/`):
- `/` - Homepage with hero, calculators, articles showcase
- `/articles/` - Articles listing with filtering and search
- `/articles/[slug]/` - Dynamic article pages with SEO optimization
- `/calculators/` - Fitness calculator hub
  - `/calculators/bmi/` - BMI calculator with results sharing
  - `/calculators/bmr/` - BMR/TDEE calculator 
  - `/calculators/macro/` - Macro calculator with goal-based recommendations
  - `/calculators/body-fat/` - Body fat percentage calculator
  - `/calculators/one-rep-max/` - 1RM strength calculator
  - `/calculators/ideal-weight/` - Ideal weight calculator
- `/workouts/` - Workout plans listing
- `/workouts/[slug]/` - Dynamic workout pages
- `/gym-finder/` - Interactive gym finder with Google Places API
- `/shop/` - E-commerce section
- `/api/` - Server-side API routes for external services

**Layout System**:
- Global layout (`src/app/layout.jsx`) with comprehensive metadata
- Nested layouts for specific sections (calculators, articles)
- Fixed header with responsive navigation
- Footer with sitemap and social links
- Performance optimizations: preconnect, DNS prefetch for external resources
- Accessibility features: skip-to-content link, semantic HTML

**Static Generation**:
- Dynamic routes use `generateStaticParams()` for static page generation at build time
- Article pages (`/articles/[slug]`) pre-render all articles from `src/data/products.js`
- Calculator pages are statically generated with client-side interactivity
- Sitemap automatically generated from articles and routes (`src/app/sitemap.js`)

### SEO Architecture (Advanced Implementation)

**Next.js Metadata API**: All pages use Next.js 14's built-in metadata system for optimal SEO
- Global metadata in `src/app/layout.jsx`
- Page-specific metadata exports for dynamic content
- Automatic sitemap generation (`src/app/sitemap.js`)
- Robots.txt generation (`src/app/robots.js`)

**Enhanced SEO Utils** (`src/utils/seo-enhanced.js`):
- Comprehensive meta tag generation with NZ-specific targeting
- Structured data (JSON-LD) for rich snippets
- Social media optimization (Open Graph, Twitter Cards)
- Local SEO optimization for New Zealand market

**SEO Components** (`src/components/SEO.jsx`):
- Reusable SEO components for different content types
- ArticleSEO with reading time and author markup
- CalculatorSEO with SoftwareApplication schema
- WorkoutSEO with ExercisePlan schema
- GymFinderSEO with WebApplication schema

**Site Configuration**:
- Site URL: `https://www.6pack.co.nz`
- Optimized for New Zealand market with local keywords
- Social media integration (Twitter, Facebook, Instagram)
- Google Places API integration for gym finder

### Data Architecture

**Content Management** (`src/data/products.js`):
- **Articles Array**: Comprehensive fitness articles with markdown content
  - Full article content stored inline with frontmatter-style metadata
  - SEO-optimized with meta titles, descriptions, and keywords
  - Featured article system for homepage promotion
  - Category-based organization (Muscle Building, Weight Loss, etc.)
  - Author attribution and publish date tracking
  - Read time calculations and view counters

**Article Structure**:
```javascript
{
  id: 15,
  title: "Article Title",
  slug: "url-friendly-slug", 
  category: "Weight Loss",
  author: "Dr. Sarah Chen",
  publishDate: "2025-08-20",
  readTime: "11 min",
  image: "https://images.unsplash.com/...",
  excerpt: "Article summary for listings",
  content: `# Full Markdown Content...`,
  tags: ["keyword1", "keyword2"],
  featured: true,
  views: 1247,
  metaTitle: "SEO-optimized title",
  metaDescription: "SEO description"
}
```

**Dynamic Content**:
- Fitness categories with article counts
- Workout plans with difficulty levels and equipment requirements
- Gym data with Google Places integration
- Supplement/product catalog

### Component Architecture

**Layout Components** (`src/components/layout/`):
- `Header.jsx` - Navigation with mobile responsiveness
- `Footer.jsx` - Site footer with links and social media

**UI Components** (`src/components/ui/`):
- `ImageWithFallback.jsx` - Optimized image loading with error handling
- `ShareResults.jsx` - Social sharing for calculator results
- `TableOfContents.jsx` - Article navigation
- `ProgressIndicator.jsx` - Reading progress tracking
- `ArticleShare.jsx` - Article social sharing

**Specialized Components**:
- `SEO.jsx` - Structured data generation for different page types
- `blurText.jsx` - Animated text effects with Framer Motion
- `ClientArticle.jsx` - Client-side article rendering with hydration

### API Routes (Server-Side)

**Google Places Integration** (`src/app/api/`):
- `/api/gyms/nearby` - Find gyms near coordinates
- `/api/gyms/photo` - Fetch gym photos from Google Places
- `/api/geocode` - Convert addresses to coordinates  
- `/api/autocomplete` - Address autocomplete suggestions

**CORS Configuration**: All API routes include proper CORS headers for cross-origin requests

### Styling System

**Tailwind Configuration** (`tailwind.config.js`):
- **Custom Color Palette**:
  - `primary` - Green theme (fitness/health)
  - `secondary` - Neutral grays
  - `accent` - Orange highlights
- **Typography Plugin**: Enhanced article typography with prose classes
- **Custom Font**: Inter (`font-fitness`) for clean, modern aesthetic

**Design Patterns**:
- Mobile-first responsive design
- Card-based layouts for content
- Gradient backgrounds for hero sections
- Consistent spacing with Tailwind scale
- Accessibility-focused interactive elements

### Business Logic

**E-commerce Features**:
- Shopping cart with localStorage persistence (`src/hooks/useCart.js`)
- Product catalog for supplements and equipment
- Free shipping threshold: $99 NZD (calculated in `getShippingCost()`)
- Standard shipping cost: $9.99 NZD

**Calculator Tools**:
- Form validation using react-hook-form and Zod schemas
- Real-time calculations with instant feedback
- Result sharing via URL parameters (e.g., `/calculators/bmi/?height=180&weight=75&unit=metric&bmi=23.1`)
- Client-side components using `'use client'` directive for interactivity
- Suspense boundaries for URL parameter handling with `useSearchParams()`
- Progress tracking and personalized recommendations based on results

**Content Features**:
- Article reading time estimation (calculated from word count: `Math.ceil(content.split(' ').length / 200)`)
- View count tracking for each article
- Social sharing optimization with Open Graph and Twitter Cards
- Table of contents generation from markdown headings
- Related article suggestions based on category
- Markdown rendering with `marked` library
- Client-side hydration for interactive elements (`ClientArticle.jsx`)

### Build & Deployment Configuration

**Next.js Config** (`next.config.js`):
```javascript
{
  output: 'export',           // Static site generation
  trailingSlash: true,        // URL trailing slash handling
  images: { unoptimized: true }, // Static export compatibility
  env: {                      // Environment variables
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
  }
}
```

**Static Export**: Configured for deployment on CDN/static hosting with pre-rendered HTML

**Performance Optimizations**:
- Image optimization with fallbacks
- Code splitting via Next.js
- CSS-in-JS with Tailwind purging
- Preconnect for external resources

## CRITICAL: SEO & Meta Tags Implementation

**Next.js Metadata API Usage** (NO React Helmet):
All pages use Next.js 14's built-in metadata system. Example:

```javascript
export const metadata = {
  title: 'Page Title | 6Pack NZ',
  description: 'SEO-optimized description with NZ keywords',
  openGraph: {
    title: 'Social Media Title',
    description: 'Social media description', 
    images: [{
      url: 'https://www.6pack.co.nz/og-image.jpg',
      width: 1200,
      height: 630,
    }],
    url: 'https://www.6pack.co.nz/page-url',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://www.6pack.co.nz/page-url',
  }
}
```

**SEO Requirements for ALL Pages**:
- Site URL: `https://www.6pack.co.nz` (with www)
- Open Graph images: 1200x630 pixels
- NZ-specific keywords and localization
- Structured data for rich snippets
- Mobile-optimized meta tags

**SEO Components Usage**:
```jsx
import { ArticleSEO, CalculatorSEO } from '../components/SEO';

// In article pages
<ArticleSEO article={article} content={content} breadcrumbs={breadcrumbs} />

// In calculator pages
<CalculatorSEO calculator={calculatorData} breadcrumbs={breadcrumbs} />
```

**Dynamic Page Metadata Pattern**:
For dynamic routes, export both `generateStaticParams` and `generateMetadata`:
```jsx
// Generate static paths at build time
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }) {
  const article = articles.find(a => a.slug === params.slug);
  return {
    title: `${article.title} | 6Pack NZ`,
    description: article.excerpt,
    openGraph: { /* ... */ },
  };
}
```

## CRITICAL: Article Content Requirements

**TLDR Section Positioning**: TLDR must appear **at the end** before conclusion, NOT at the beginning. This matches all existing articles.

**Required Article Structure**:
```markdown
# Article Title

Introduction and hook paragraph.

## Main Content Sections
[Detailed content...]

## TLDR
• **Key point 1**: Actionable advice with specifics
• **Key point 2**: Include numbers and timeframes  
• **Key point 3**: Practical implementation focus

## Conclusion
Final thoughts and call-to-action.
```

**Content Guidelines**:
- Include NZ-specific examples and context
- Use scientific backing with study references
- Provide actionable takeaways
- Optimize for social media sharing
- Include proper meta tags and descriptions

## CRITICAL: User Requirements for New Articles

**When the user requests a new article, they want:**

### **Social Media Optimization Focus**
- **Primary goal**: Create content perfect for Facebook sharing that grabs attention
- **Controversial angles**: Use attention-grabbing hooks like "7 Lies", "Shocking Truth", "What They Don't Tell You"
- **Shareable format**: Content that provokes discussion and encourages sharing
- **Engagement triggers**: Include statements people will want to comment on or debate

### **Content Quality Standards**
- **Ultra-high quality**: Never settle for generic content - always "ultrathink" the approach
- **Unique angles**: Check existing articles to ensure no overlap in topics or approaches
- **Science-backed**: Include real research, studies, and statistics to support claims
- **Actionable advice**: Every section should provide practical takeaways readers can implement

### **New Zealand Focus**
- **Local relevance**: Include NZ-specific challenges, examples, and cultural context
- **Kiwi lifestyle**: Address unique aspects of living in New Zealand (weather, food culture, gym costs, etc.)
- **Local terminology**: Use appropriate NZ terms and references where relevant

### **Format Requirements**
- **Attention-grabbing titles**: Use formats like "X Lies About...", "Shocking Truth About...", "Why X% of People..."
- **Compelling intros**: Start with warnings, shocking statistics, or controversial statements
- **Scannable content**: Use bold text, bullet points, and clear headings for easy reading
- **Perfect length**: Long enough to be comprehensive but short enough to maintain engagement

### **Content Creation Process**
1. **First**: Check existing articles in `src/data/products.js` to avoid topic overlap
2. **Research**: Find a unique, controversial, or myth-busting angle
3. **Structure**: Follow the established article format with TLDR at the end
4. **Optimize**: Include comprehensive SEO metadata and social sharing optimization
5. **Test**: Consider how it will perform when shared on Facebook/social media

### **Examples of Successful Approaches**
- **Myth-busting**: "7 Fat Loss Lies Keeping You Overweight"
- **Controversial comparisons**: "New World vs Woolworths vs Pak'nSave: Best NZ Supermarket Gym Food"
- **Shocking revelations**: "Why 90% of Kiwis Are Doing Push-Ups Wrong"
- **Surprising findings**: "5-Minute Metabolism Hack That Burns 300 Extra Calories Daily"

**Remember**: The user values content that will generate engagement, shares, and discussion on social media while providing genuine value to New Zealand fitness enthusiasts.

## Development Best Practices

**File Organization**:
- Components in `src/components/` with logical grouping
- Pages follow App Router conventions in `src/app/`
- Utilities in `src/utils/` for reusable functions
- Data management in `src/data/` for content

**Code Standards**:
- ES modules throughout (`"type": "module"`)
- React functional components with hooks
- Use `'use client'` directive for components requiring client-side interactivity (useState, useEffect, useSearchParams, etc.)
- Server Components by default (no directive needed)
- TypeScript/JavaScript with proper imports
- Tailwind for all styling (no CSS modules)
- Lucide React for icons

**Content Management**:
- All articles stored in `src/data/products.js`
- Use existing article structure for consistency
- Update featured articles on homepage
- Maintain SEO metadata for all content

**API Integration**:
- Google Places API for gym finder functionality
- API routes in `src/app/api/` directory (server-side only)
- All API routes return JSON with proper CORS headers
- Proper error handling and CORS configuration
- Environment variable management via `next.config.js` env property
- Rate limiting considerations

**Client vs Server Components**:
- **Client Components** (need `'use client'`):
  - Components using hooks: `useState`, `useEffect`, `useSearchParams`, `useRouter`
  - Event handlers: `onClick`, `onChange`, `onSubmit`
  - Browser APIs: `localStorage`, `window`, `document`
  - Third-party libraries requiring browser environment
- **Server Components** (default, no directive):
  - Static content rendering
  - Data fetching at build time
  - SEO metadata generation
  - Layout components without interactivity

## Environment Variables

Required environment variables:
```bash
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

## Common Tasks

**Adding New Articles**:
1. Add article object to `src/data/products.js` articles array
2. Follow existing structure with all required fields
3. Include comprehensive SEO metadata
4. Position TLDR at end before conclusion
5. Test social sharing with Facebook debugger

**Adding New Calculators**:
1. Create new directory in `src/app/calculators/[name]/`
2. Add `page.jsx` with calculator logic and `layout.jsx` with metadata
3. Wrap components using `useSearchParams()` in a Suspense boundary:
   ```jsx
   import { Suspense } from 'react';

   export default function Page() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <CalculatorContent /> {/* Component using useSearchParams */}
       </Suspense>
     );
   }
   ```
4. Include CalculatorSEO component
5. Add form validation with react-hook-form and Zod
6. Implement result sharing functionality via URL parameters

**SEO Testing**:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Twitter Card Validator: https://cards-dev.twitter.com/validator

## Current Project Status

- **Tech Stack**: Next.js 14 App Router with static export
- **SEO**: Fully optimized with comprehensive metadata and structured data
- **Content**: 29 high-quality fitness articles with consistent formatting
- **Features**: 6 fitness calculators (BMI, BMR, Macro, Body Fat, 1RM, Ideal Weight), gym finder, workout plans
- **Performance**: Optimized for speed and Core Web Vitals
- **Deployment**: Static export ready for CDN deployment

**Recent Updates**:
- Migrated from Vite to Next.js 14 App Router
- Implemented comprehensive SEO optimization
- Added structured data for rich snippets
- Optimized for New Zealand market
- Fixed hydration issues with date formatting
- Removed redundant static page generation (Next.js handles this natively)