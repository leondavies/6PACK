import fs from 'fs';
import path from 'path';
import { articles } from '../src/data/products.js';

// Create directories if they don't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate HTML template
function generateHTML(pageData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>${pageData.title} | 6Pack NZ</title>
  <meta name="description" content="${pageData.description}" />
  <meta name="author" content="${pageData.author || '6Pack Team'}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <!-- Open Graph Protocol -->
  <meta property="og:title" content="${pageData.title}" />
  <meta property="og:description" content="${pageData.description}" />
  <meta property="og:image" content="${pageData.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://www.6pack.co.nz${pageData.url}" />
  <meta property="og:type" content="${pageData.type || 'article'}" />
  <meta property="og:site_name" content="6Pack NZ" />
  <meta property="og:locale" content="en_NZ" />
  ${pageData.publishDate ? `<meta property="article:published_time" content="${pageData.publishDate}" />` : ''}
  ${pageData.author ? `<meta property="article:author" content="${pageData.author}" />` : ''}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@6pack_nz" />
  <meta name="twitter:title" content="${pageData.title}" />
  <meta name="twitter:description" content="${pageData.description}" />
  <meta name="twitter:image" content="${pageData.image}" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.6pack.co.nz${pageData.url}" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    ${JSON.stringify(pageData.structuredData || {
      "@context": "https://schema.org",
      "@type": pageData.type === 'article' ? "Article" : "WebPage",
      "headline": pageData.title,
      "description": pageData.description,
      "url": `https://www.6pack.co.nz${pageData.url}`,
      "datePublished": pageData.publishDate,
      "author": {
        "@type": "Person",
        "name": pageData.author || "6Pack Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "6Pack NZ",
        "url": "https://www.6pack.co.nz"
      }
    })}
  </script>
  
  <!-- Redirect to SPA -->
  <script>
    // Immediate redirect for browsers
    window.location.replace('/#${pageData.url}');
  </script>
  <meta http-equiv="refresh" content="0; url=/#${pageData.url}">
</head>
<body>
  <h1>${pageData.title}</h1>
  <p>Redirecting...</p>
  <p>If you're not redirected, <a href="/#${pageData.url}">click here</a>.</p>
</body>
</html>`;
}

// Generate pages
function generateStaticPages() {
  const outputDir = './public';
  ensureDir(outputDir);

  // Generate calculator pages
  const calculators = [
    {
      title: 'Free BMI Calculator New Zealand | Body Mass Index NZ',
      description: 'Calculate your BMI instantly with our free New Zealand BMI calculator. Get personalized health recommendations and understand your weight status with metric and imperial units.',
      image: 'https://www.6pack.co.nz/bmi-calculator-social.jpg',
      url: '/calculators/bmi',
      type: 'website'
    },
    {
      title: 'BMR Calculator NZ | Basal Metabolic Rate Calculator',
      description: 'Calculate your Basal Metabolic Rate (BMR) with our free New Zealand calculator. Determine how many calories you burn at rest and optimize your nutrition plan.',
      image: 'https://www.6pack.co.nz/og-image.jpg',
      url: '/calculators/bmr',
      type: 'website'
    },
    {
      title: 'Body Fat Calculator | Body Fat Percentage Calculator NZ',
      description: 'Calculate your body fat percentage with our accurate New Zealand body fat calculator. Track your fitness progress and body composition goals.',
      image: 'https://www.6pack.co.nz/og-image.jpg',
      url: '/calculators/body-fat',
      type: 'website'
    },
    {
      title: 'Macro Calculator NZ | Macronutrient Calculator New Zealand',
      description: 'Calculate your ideal macronutrient ratios with our free New Zealand macro calculator. Get personalized protein, carb, and fat targets for your fitness goals.',
      image: 'https://www.6pack.co.nz/og-image.jpg',
      url: '/calculators/macro',
      type: 'website'
    }
  ];

  // Generate static HTML for calculators
  calculators.forEach(calc => {
    ensureDir(`${outputDir}/calculators`);
    const fileName = calc.url.split('/').pop();
    fs.writeFileSync(`${outputDir}/calculators/${fileName}.html`, generateHTML(calc));
    console.log(`Generated: /calculators/${fileName}.html`);
  });

  // Generate static HTML for articles  
  articles.forEach(article => {
    ensureDir(`${outputDir}/articles`);
    
    const pageData = {
      title: article.title,
      description: article.excerpt,
      image: article.image.replace(/w=\d+&h=\d+/, 'w=1200&h=630'), // Ensure proper social media dimensions
      url: `/articles/${article.slug}`,
      type: 'article',
      author: article.author,
      publishDate: article.publishDate
    };
    
    fs.writeFileSync(`${outputDir}/articles/${article.slug}.html`, generateHTML(pageData));
    console.log(`Generated: /articles/${article.slug}.html`);
  });

  // Generate other important pages
  const otherPages = [
    {
      title: 'Gym Finder | Find Gyms Near You in New Zealand',
      description: 'Find gyms near you in New Zealand with our interactive gym finder. Search by location, filter by amenities, and discover the best fitness centers across NZ.',
      image: 'https://www.6pack.co.nz/og-image.jpg',
      url: '/gym-finder',
      type: 'website'
    },
    {
      title: 'Fitness Calculators | Free Health & Fitness Tools NZ',
      description: 'Free fitness calculators for New Zealanders. Calculate BMI, BMR, body fat percentage, macros and more. Accurate health tools for your fitness journey.',
      image: 'https://www.6pack.co.nz/og-image.jpg',
      url: '/calculators',
      type: 'website'
    }
  ];

  otherPages.forEach(page => {
    const pathParts = page.url.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      ensureDir(`${outputDir}/${pathParts[0]}`);
      fs.writeFileSync(`${outputDir}${page.url}.html`, generateHTML(page));
    } else {
      fs.writeFileSync(`${outputDir}${page.url}.html`, generateHTML(page));
    }
    console.log(`Generated: ${page.url}.html`);
  });
}

// Update vercel.json with all routes
function updateVercelConfig() {
  const rewrites = [];
  
  // Calculator routes
  rewrites.push(
    { source: "/calculators/bmi", destination: "/calculators/bmi.html" },
    { source: "/calculators/bmr", destination: "/calculators/bmr.html" },
    { source: "/calculators/body-fat", destination: "/calculators/body-fat.html" },
    { source: "/calculators/macro", destination: "/calculators/macro.html" }
  );
  
  // Article routes
  articles.forEach(article => {
    rewrites.push({
      source: `/articles/${article.slug}`,
      destination: `/articles/${article.slug}.html`
    });
  });
  
  // Other routes
  rewrites.push(
    { source: "/gym-finder", destination: "/gym-finder.html" },
    { source: "/calculators", destination: "/calculators.html" }
  );
  
  // Fallback
  rewrites.push({ source: "/(.*)", destination: "/index.html" });
  
  const config = {
    rewrites: rewrites
  };
  
  fs.writeFileSync('./vercel.json', JSON.stringify(config, null, 2));
  console.log('Updated vercel.json with all routes');
}

// Run generation
console.log('Generating static pages for SEO...');
generateStaticPages();
updateVercelConfig();
console.log('✅ Static page generation complete!');