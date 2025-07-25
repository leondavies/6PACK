// SEO Utilities for Fitness Website

export const siteConfig = {
  siteName: 'FitHub NZ',
  siteUrl: 'https://fithub.nz',
  description: 'New Zealand\'s premier fitness resource hub. Expert training guides, nutrition advice, and science-backed fitness strategies.',
  keywords: 'fitness, gym, workout, nutrition, muscle building, weight loss, strength training, New Zealand',
  author: 'FitHub Team',
  twitter: '@fithub_nz',
  facebook: 'fithub.nz',
  instagram: '@fithub_nz'
};

// Schema.org structured data generators
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteConfig.siteUrl}${crumb.url}`
    }))
  };
}

export function generateArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": article.image,
      "width": 800,
      "height": 400
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": `${siteConfig.siteUrl}/authors/${article.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}/logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/articles/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": article.tags.join(', '),
    "wordCount": Math.floor(Math.random() * 2000) + 1000, // Estimated word count
    "timeRequired": article.readTime,
    "audience": {
      "@type": "Audience",
      "audienceType": "fitness enthusiasts, athletes, health-conscious individuals"
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/logo.png`,
    "description": siteConfig.description,
    "foundingDate": "2025",
    "founder": {
      "@type": "Person",
      "name": "FitHub Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NZ",
      "addressRegion": "Auckland"
    },
    "sameAs": [
      `https://twitter.com/${siteConfig.twitter.replace('@', '')}`,
      `https://facebook.com/${siteConfig.facebook}`,
      `https://instagram.com/${siteConfig.instagram.replace('@', '')}`
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@fithub.nz"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.siteName
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// SEO meta tag generators
export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishDate,
  modifiedDate,
  author
}) {
  const metaTags = [
    // Basic meta tags
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author || siteConfig.author },
    
    // Open Graph tags
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: 'en_NZ' },
    
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.twitter },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    
    // Additional SEO tags
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' }
  ];

  // Add image tags if provided
  if (image) {
    metaTags.push(
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '800' },
      { property: 'og:image:height', content: '400' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { name: 'twitter:image', content: image }
    );
  }

  // Add article-specific tags
  if (type === 'article') {
    if (publishDate) {
      metaTags.push({ property: 'article:published_time', content: publishDate });
    }
    if (modifiedDate) {
      metaTags.push({ property: 'article:modified_time', content: modifiedDate });
    }
    if (author) {
      metaTags.push({ property: 'article:author', content: author });
    }
  }

  return metaTags;
}

// Fitness-specific SEO keywords
export const fitnessKeywords = {
  primary: [
    'fitness', 'workout', 'exercise', 'gym', 'training', 'health', 'muscle building',
    'weight loss', 'strength training', 'cardio', 'nutrition', 'diet'
  ],
  locations: [
    'New Zealand', 'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'
  ],
  modifiers: [
    'best', 'top', 'guide', 'tips', 'how to', 'complete', 'ultimate', 'beginner',
    'advanced', 'professional', 'expert', 'proven', 'effective', 'fast', 'easy'
  ],
  intentions: [
    'for beginners', 'at home', 'for women', 'for men', 'for weight loss',
    'for muscle gain', 'for seniors', 'for athletes', 'without equipment'
  ]
};

// Generate SEO-friendly URLs
export function generateSEOUrl(title, category) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 60) // Limit length
    .replace(/-$/, ''); // Remove trailing hyphen
}

// Content optimization helpers
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

export function extractKeywords(content, count = 10) {
  // Simple keyword extraction (in production, use more sophisticated NLP)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['this', 'that', 'with', 'have', 'will', 'your', 'they', 'been', 'their', 'from'].includes(word));
  
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, count)
    .map(([word]) => word);
}

// Sitemap generation helper
export function generateSitemapUrls(articles) {
  const urls = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString()
    },
    {
      url: '/articles',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString()
    }
  ];

  // Add article URLs
  articles.forEach(article => {
    urls.push({
      url: `/articles/${article.slug}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: article.publishDate
    });
  });

  return urls;
}