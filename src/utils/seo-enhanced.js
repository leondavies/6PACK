// Enhanced SEO utilities for 6Pack NZ - comprehensive meta tags, structured data, and social optimization

export const siteConfig = {
  siteName: '6Pack NZ',
  siteUrl: 'https://www.6pack.co.nz',
  description: 'New Zealand\'s premier fitness and training platform. Expert-backed content, personalised coaching, and science-based strategies for your transformation.',
  author: '6Pack NZ Team',
  social: {
    twitter: '@6pack_nz',
    facebook: 'https://facebook.com/6pack.co.nz',
    instagram: 'https://instagram.com/6pack_nz'
  },
  contact: {
    email: 'info@6pack.co.nz',
    phone: '+64 21 234 5678'
  },
  logo: 'https://www.6pack.co.nz/og-image.jpg',
  defaultImage: 'https://www.6pack.co.nz/og-image.jpg'
};

// NZ-specific fitness keywords for better local SEO
export const nzFitnessKeywords = [
  'New Zealand fitness',
  'NZ gym',
  'Kiwi workout',
  'Auckland fitness',
  'Wellington gym',
  'Christchurch training',
  'New Zealand health',
  'NZ nutrition',
  'fitness New Zealand',
  'workout plans NZ',
  'personal trainer New Zealand',
  'NZ supplements',
  'Kiwi health',
  'New Zealand wellbeing'
];

// Generate comprehensive meta tags for any page
export function generateMetaTags({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  canonical
}) {
  const fullTitle = title.includes('6Pack') ? title : `${title} | 6Pack NZ`;
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`;
  const ogImage = image || siteConfig.defaultImage;
  const allKeywords = [...nzFitnessKeywords, ...keywords].join(', ');

  const metaTags = [
    // Basic Meta Tags
    { name: 'description', content: description },
    { name: 'keywords', content: allKeywords },
    { name: 'author', content: author || siteConfig.author },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    
    // Open Graph Tags
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${title} - 6Pack NZ` },
    { property: 'og:url', content: fullUrl },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: 'en_NZ' },
    
    // Twitter Card Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.social.twitter },
    { name: 'twitter:creator', content: siteConfig.social.twitter },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: `${title} - 6Pack NZ` },
    
    // Additional SEO Tags
    { name: 'theme-color', content: '#16a34a' },
    { name: 'msapplication-TileColor', content: '#16a34a' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: '6Pack NZ' },
    
    // Geographic targeting for NZ
    { name: 'geo.region', content: 'NZ' },
    { name: 'geo.country', content: 'New Zealand' },
    { name: 'geo.placename', content: 'New Zealand' },
    { name: 'ICBM', content: '-40.9006, 174.8860' }, // Center of NZ
    
    // Language targeting
    { name: 'language', content: 'en' },
    { httpEquiv: 'Content-Language', content: 'en-nz' }
  ];

  // Add article-specific meta tags
  if (type === 'article') {
    if (publishedTime) metaTags.push({ property: 'article:published_time', content: publishedTime });
    if (modifiedTime) metaTags.push({ property: 'article:modified_time', content: modifiedTime });
    if (author) metaTags.push({ property: 'article:author', content: author });
    if (section) metaTags.push({ property: 'article:section', content: section });
    tags.forEach(tag => metaTags.push({ property: 'article:tag', content: tag }));
  }

  return {
    title: fullTitle,
    metaTags,
    canonical: canonical || fullUrl,
    alternates: {
      canonical: canonical || fullUrl
    }
  };
}

// Generate JSON-LD structured data
export function generateStructuredData({
  type,
  data,
  breadcrumbs,
  organization = true
}) {
  const structuredDataArray = [];

  // Always include organization data
  if (organization) {
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '6Pack NZ',
      url: siteConfig.siteUrl,
      logo: siteConfig.logo,
      description: siteConfig.description,
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.contact.email,
        contactType: 'customer service',
        availableLanguage: 'English'
      },
      sameAs: [
        siteConfig.social.facebook,
        siteConfig.social.instagram,
        siteConfig.social.twitter
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NZ',
        addressRegion: 'New Zealand'
      }
    });
  }

  // Add website structured data
  structuredDataArray.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '6Pack NZ',
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: '6Pack NZ'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 1) {
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${siteConfig.siteUrl}${crumb.url}`
      }))
    });
  }

  // Add specific page structured data
  if (type && data) {
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    });
  }

  return structuredDataArray;
}

// Article-specific structured data
export function generateArticleSchema({
  title,
  description,
  content,
  publishedTime,
  modifiedTime,
  author,
  image,
  url,
  readingTime,
  wordCount,
  category,
  tags = []
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || siteConfig.defaultImage,
    url: url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author || siteConfig.author,
      url: siteConfig.siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: '6Pack NZ',
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`
    },
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: category,
    keywords: tags.join(', '),
    about: {
      '@type': 'Thing',
      name: 'Fitness and Health'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Fitness Enthusiasts',
      geographicArea: {
        '@type': 'Country',
        name: 'New Zealand'
      }
    }
  };
}

// Workout-specific structured data
export function generateWorkoutSchema({
  name,
  description,
  difficulty,
  duration,
  equipment,
  muscleGroups,
  exercises,
  image,
  url
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExercisePlan',
    name: name,
    description: description,
    image: image || siteConfig.defaultImage,
    url: url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`,
    exerciseType: 'Strength Training',
    intensity: difficulty,
    duration: `PT${duration}M`,
    equipment: equipment,
    muscleGroups: muscleGroups,
    workload: exercises?.length ? `${exercises.length} exercises` : undefined,
    author: {
      '@type': 'Organization',
      name: '6Pack NZ'
    },
    publisher: {
      '@type': 'Organization',
      name: '6Pack NZ',
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo
      }
    }
  };
}

// Calculator/Tool-specific structured data
export function generateToolSchema({
  name,
  description,
  applicationCategory,
  operatingSystem,
  url,
  image,
  offers
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: applicationCategory || 'HealthApplication',
    operatingSystem: 'Web Browser',
    url: url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`,
    image: image || siteConfig.defaultImage,
    author: {
      '@type': 'Organization',
      name: '6Pack NZ'
    },
    publisher: {
      '@type': 'Organization',
      name: '6Pack NZ'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NZD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

// FAQ structured data
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// How-to structured data for exercises or nutrition guides
export function generateHowToSchema({
  name,
  description,
  image,
  estimatedCost,
  supply,
  tool,
  steps,
  totalTime,
  difficulty
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    image: image || siteConfig.defaultImage,
    estimatedCost: estimatedCost,
    supply: supply,
    tool: tool,
    totalTime: totalTime,
    difficulty: difficulty,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    }))
  };
}

// Performance optimization: preconnect to external domains
export const preconnectDomains = [
  'https://images.unsplash.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com'
];

// Social sharing URLs
export function generateSocialShareUrls(url, title, description) {
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=6pack_nz`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    copy: fullUrl
  };
}

// Image optimization for social sharing
export function optimizeImageForSocial(imageUrl, width = 1200, height = 630) {
  if (!imageUrl) return siteConfig.defaultImage;
  
  // If it's an Unsplash URL, optimize it
  if (imageUrl.includes('unsplash.com')) {
    return `${imageUrl.split('?')[0]}?w=${width}&h=${height}&fit=crop&fm=webp&q=85`;
  }
  
  return imageUrl;
}

// Generate reading time estimate
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// NZ-specific local business schema for gym finder
export function generateLocalBusinessSchema(gym) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Gym',
    name: gym.name,
    description: `${gym.name} - Fitness center in ${gym.address}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: gym.address,
      addressLocality: gym.city || 'New Zealand',
      addressCountry: 'NZ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: gym.coordinates?.lat,
      longitude: gym.coordinates?.lng
    },
    telephone: gym.phone,
    url: gym.website,
    image: gym.image,
    aggregateRating: gym.rating ? {
      '@type': 'AggregateRating',
      ratingValue: gym.rating,
      ratingCount: gym.totalRatings || 1,
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    amenityFeature: gym.amenities?.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity
    }))
  };
}