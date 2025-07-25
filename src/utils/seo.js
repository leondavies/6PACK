// SEO Utilities for Fitness Website

export const siteConfig = {
  siteName: '6Pack',
  siteUrl: 'https://6pack.co.nz',
  description: 'New Zealand\'s premier fitness resource hub. Expert training guides, nutrition advice, and science-backed fitness strategies.',
  keywords: 'fitness, gym, workout, nutrition, muscle building, weight loss, strength training, New Zealand',
  author: '6Pack Team',
  twitter: '@6pack_nz',
  facebook: '6pack.co.nz',
  instagram: '@6pack_nz'
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
      "name": "6Pack Team"
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

// New Zealand specific fitness keywords for SEO dominance
export const nzFitnessKeywords = {
  primary: [
    'fitness New Zealand', 'gym New Zealand', 'workout NZ', 'personal trainer NZ',
    'fitness trainer New Zealand', 'gym membership NZ', 'fitness classes NZ',
    'strength training New Zealand', 'weight loss NZ', 'muscle building New Zealand'
  ],
  locations: [
    'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings',
    'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua', 'New Plymouth', 'Whangarei',
    'Invercargill', 'Whanganui', 'Gisborne'
  ],
  longTail: [
    'best gym in Auckland', 'personal trainer Wellington', 'fitness classes Christchurch',
    'CrossFit box Hamilton', 'yoga classes Tauranga', 'bootcamp training Auckland',
    'strength training Wellington', 'HIIT classes Christchurch', 'pilates studio Auckland',
    'boxing gym Wellington', 'outdoor fitness New Zealand', 'home gym equipment NZ'
  ],
  seasonal: [
    'summer body transformation NZ', 'winter fitness motivation New Zealand',
    'beach body workout Auckland', 'ski fitness training NZ', 'summer shred program',
    'post-holiday fitness reset', 'New Year fitness goals NZ'
  ],
  trending: [
    'functional fitness NZ', 'metabolic conditioning New Zealand', 'mobility training Auckland',
    'mindfulness fitness NZ', 'biohacking New Zealand', 'recovery training NZ',
    'outdoor adventure fitness', 'sustainable fitness lifestyle'
  ]
};

// Enhanced local business schema for New Zealand
export function generateLocalBusinessSchema(location = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#localbusiness`,
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/logo.png`,
    "description": siteConfig.description,
    "telephone": location.phone || "+64-9-XXX-XXXX",
    "email": "info@6pack.co.nz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address || "123 Fitness Street",
      "addressLocality": location.city || "Auckland",
      "addressRegion": location.region || "Auckland",
      "postalCode": location.postcode || "1010",
      "addressCountry": "NZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.lat || -36.8485,
      "longitude": location.lng || 174.7633
    },
    "openingHours": [
      "Mo-Fr 05:00-22:00",
      "Sa 06:00-20:00", 
      "Su 07:00-19:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, EFTPOS, PayWave",
    "currenciesAccepted": "NZD",
    "hasMap": `${siteConfig.siteUrl}/contact`,
    "isAccessibleForFree": false,
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Parking", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Changing Rooms", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Shower Facilities", "value": true}
    ],
    "sameAs": [
      `https://twitter.com/${siteConfig.twitter.replace('@', '')}`,
      `https://facebook.com/${siteConfig.facebook}`,
      `https://instagram.com/${siteConfig.instagram.replace('@', '')}`
    ]
  };
}

// Calculator-specific schema for enhanced visibility
export function generateCalculatorSchema(calculator) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculator.name,
    "description": calculator.description,
    "url": `${siteConfig.siteUrl}/calculators/${calculator.slug}`,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NZD"
    },
    "featureList": calculator.features || [
      "Free fitness calculations",
      "Instant results",
      "Mobile friendly",
      "No registration required"
    ],
    "screenshot": `${siteConfig.siteUrl}/images/${calculator.slug}-screenshot.jpg`
  };
}

// Enhanced calculator FAQ schema for fitness tools
export function generateCalculatorFAQSchema(faqs, calculatorName) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "about": {
      "@type": "WebApplication",
      "name": calculatorName
    },
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "author": {
          "@type": "Organization",
          "name": siteConfig.siteName
        }
      }
    }))
  };
}

// Generate SEO-friendly URLs
export function generateSEOUrl(title, category = '') {
  const baseUrl = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 60) // Limit length
    .replace(/-$/, ''); // Remove trailing hyphen
  
  // Optionally prepend category for better URL structure
  return category ? `${category.toLowerCase()}/${baseUrl}` : baseUrl;
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