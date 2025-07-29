# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with hot reload
- **Build**: `npm run build` - Generates SEO static pages and creates production build
- **Linting**: `npm run lint` - Runs ESLint on all JavaScript files
- **Preview**: `npm run preview` - Serves production build locally
- **SEO Generation**: `node scripts/generateStaticPages.js` - Generates static HTML for social media crawlers

## CRITICAL: SEO Static Page Generation

**ALWAYS run after adding new articles or calculators:**
```bash
node scripts/generateStaticPages.js
```

This script:
- Generates static HTML files with proper meta tags for social media crawlers
- Creates Open Graph images, descriptions, and structured data
- Updates vercel.json with routing for all pages
- Ensures Facebook/Twitter/LinkedIn show correct images and descriptions

**The build command automatically runs this script**, but run manually when:
- Adding new articles to `src/data/products.js`
- Creating new calculator pages
- Updating article meta information

**Why this matters**: Social media crawlers (Facebook, Twitter) don't execute JavaScript, so they can't see React Helmet meta tags. Static HTML files ensure proper social sharing.

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

## CRITICAL: Article TLDR Requirements

**Every article MUST include a TLDR section immediately after the title and before the first content paragraph.**

### TLDR Format Requirements

```markdown
## TLDR

• **Key point 1**: Brief explanation with specific actionable advice
• **Key point 2**: Include numbers/specifics where possible (e.g., "2-3 times per week")
• **Key point 3**: Focus on practical implementation, not theory
• **Key point 4**: Use bold for the main concept, regular text for details
• **Key point 5**: 3-5 bullet points maximum for scannability
```

### TLDR Writing Guidelines

**Content Requirements:**
- 3-5 bullet points maximum
- Each point starts with **bold key concept**
- Include specific numbers, timeframes, or measurements
- Focus on actionable takeaways readers can implement immediately
- Use simple, direct language (avoid jargon)

**Formatting Rules:**
- Always use `##` heading level for "TLDR"
- Use bullet points (`•`) not dashes or numbers
- Bold the key concept, regular text for explanation
- Place immediately after article title, before first paragraph
- Add blank line before and after TLDR section

**Examples of Good vs Bad TLDR Points:**

❌ **Bad:** "Exercise is important for health"
✅ **Good:** "**Aim for 150 minutes moderate exercise weekly**: Equivalent to 30 minutes, 5 days per week for optimal health benefits"

❌ **Bad:** "Nutrition timing matters"
✅ **Good:** "**Eat 20-40g protein within 2 hours post-workout**: Maximizes muscle protein synthesis and recovery"

### Why TLDR Sections Are Critical

1. **User Experience**: 80% of users scan before reading - TLDR captures them
2. **Mobile Optimization**: Quick access to key info on smaller screens  
3. **Social Sharing**: People share content with clear, digestible takeaways
4. **SEO Benefits**: Featured snippets often pull from well-formatted summary content
5. **Retention**: Readers remember 3-5 key points better than long paragraphs

### Article Structure Template

```markdown
# Article Title

Brief intro paragraph setting context and hook.

## TLDR

• **Key takeaway 1**: Specific actionable advice
• **Key takeaway 2**: Include numbers and timeframes
• **Key takeaway 3**: Focus on practical implementation

## Main Content Section 1
[Detailed content...]
```

**Remember**: TLDR is not optional - it's a critical user experience feature that improves engagement, sharing, and retention.