import fs from 'fs';
import path from 'path';

// Function to load articles data
function getArticles() {
  try {
    const articlesPath = path.join(process.cwd(), 'public', 'articles.json');
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    return JSON.parse(articlesData);
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Calculator metadata
const calculators = {
  bmi: {
    title: "Free BMI Calculator New Zealand | Body Mass Index Calculator NZ | 6Pack",
    description: "Free BMI calculator for New Zealanders. Calculate your Body Mass Index instantly, get personalised health recommendations, and understand your weight status. Metric & Imperial units supported.",
    keywords: "BMI calculator NZ, body mass index New Zealand, weight calculator, health assessment NZ, fitness calculator, BMI chart New Zealand, healthy weight NZ",
    ogTitle: "Free BMI Calculator New Zealand | 6Pack",
    ogDescription: "Calculate your BMI instantly with our free New Zealand BMI calculator. Get health recommendations and weight status analysis.",
    image: "https://www.6pack.co.nz/bmi-calculator-social.jpg"
  },
  bmr: {
    title: "Free BMR Calculator New Zealand | Basal Metabolic Rate Calculator NZ | 6Pack",
    description: "Calculate your Basal Metabolic Rate (BMR) with our free New Zealand calculator. Discover how many calories you burn at rest and optimize your nutrition plan.",
    keywords: "BMR calculator NZ, basal metabolic rate New Zealand, calorie calculator, metabolism calculator NZ, daily calorie needs",
    ogTitle: "Free BMR Calculator New Zealand | 6Pack",
    ogDescription: "Calculate your Basal Metabolic Rate and daily calorie needs with our free New Zealand BMR calculator.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  'body-fat': {
    title: "Free Body Fat Calculator New Zealand | Body Fat Percentage Calculator NZ | 6Pack",
    description: "Calculate your body fat percentage with our free New Zealand calculator. Get accurate body composition analysis and health recommendations.",
    keywords: "body fat calculator NZ, body fat percentage New Zealand, body composition calculator, health calculator NZ",
    ogTitle: "Free Body Fat Calculator New Zealand | 6Pack",
    ogDescription: "Calculate your body fat percentage accurately with our free New Zealand body fat calculator.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  'ideal-weight': {
    title: "Free Ideal Weight Calculator New Zealand | Target Weight Calculator NZ | 6Pack",
    description: "Calculate your ideal weight with our free New Zealand calculator. Discover your healthy weight range based on multiple proven formulas.",
    keywords: "ideal weight calculator NZ, target weight New Zealand, healthy weight calculator, weight goals calculator NZ",
    ogTitle: "Free Ideal Weight Calculator New Zealand | 6Pack",
    ogDescription: "Find your ideal weight range with our free New Zealand ideal weight calculator.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  'one-rep-max': {
    title: "Free 1RM Calculator New Zealand | One Rep Max Calculator NZ | 6Pack",
    description: "Calculate your one rep max (1RM) with our free New Zealand calculator. Estimate your maximum strength for better training programming.",
    keywords: "1RM calculator NZ, one rep max New Zealand, strength calculator, weightlifting calculator NZ, max strength",
    ogTitle: "Free 1RM Calculator New Zealand | 6Pack",
    ogDescription: "Calculate your one rep max accurately with our free New Zealand 1RM calculator.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  macro: {
    title: "Free Macro Calculator New Zealand | Macronutrient Calculator NZ | 6Pack",
    description: "Calculate your daily macronutrient needs with our free New Zealand macro calculator. Get personalized protein, carb, and fat targets.",
    keywords: "macro calculator NZ, macronutrient calculator New Zealand, protein calculator, nutrition calculator NZ",
    ogTitle: "Free Macro Calculator New Zealand | 6Pack",
    ogDescription: "Calculate your daily macro needs with our free New Zealand macronutrient calculator.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  }
};

// Workout metadata
const workouts = {
  chest: {
    title: "Complete Chest Workout Guide | Build Chest Muscle at Home | 6Pack NZ",
    description: "Transform your chest with our complete workout guide. Beginner to advanced exercises for building powerful chest muscles at home or gym.",
    keywords: "chest workout NZ, chest exercises, push ups, build chest muscle, home chest workout New Zealand, gym chest workout, chest training",
    ogTitle: "Complete Chest Workout Guide | Build Chest Muscle at Home",
    ogDescription: "Transform your chest with our complete workout guide. Beginner to advanced exercises for building powerful chest muscles at home.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  legs: {
    title: "Ultimate Leg Workout Guide | Build Strong Legs at Home | 6Pack NZ",
    description: "Transform your legs with our complete workout guide. Build strength and muscle with proven exercises for all fitness levels.",
    keywords: "leg workout NZ, leg exercises, squats, lunges, leg training New Zealand, build leg muscle, home leg workout",
    ogTitle: "Ultimate Leg Workout Guide | Build Strong Legs at Home",
    ogDescription: "Transform your legs with our complete workout guide. Build strength and muscle with proven exercises for all fitness levels.",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=1200&h=630&fit=crop&fm=webp&q=85"
  },
  core: {
    title: "Ultimate Core Workout Guide | Build Six Pack Abs at Home | 6Pack NZ",
    description: "Transform your core with our complete ab workout guide. Build strength and definition with proven exercises for all fitness levels.",
    keywords: "core workout NZ, abs exercises, six pack workout, core training New Zealand, plank exercises, ab workout",
    ogTitle: "Ultimate Core Workout Guide | Build Six Pack Abs at Home",
    ogDescription: "Transform your core with our complete ab workout guide. Build strength and definition with proven exercises for all fitness levels.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"
  }
};

export default function handler(req, res) {
  const { page, slug, type } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  // Check if it's a crawler
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|bot|crawler|spider/i.test(userAgent);
  
  if (!isCrawler) {
    // Redirect normal users to the main app
    if (page === 'article' && slug) {
      res.writeHead(302, { Location: `/articles/${slug}` });
    } else if (page === 'calculator' && type) {
      res.writeHead(302, { Location: `/calculators/${type}` });
    } else if (page === 'workout' && type) {
      res.writeHead(302, { Location: `/workouts/${type}` });
    } else if (page === 'gym-finder') {
      res.writeHead(302, { Location: '/gym-finder' });
    } else {
      res.writeHead(302, { Location: '/' });
    }
    res.end();
    return;
  }

  if (page === 'calculator' && type && calculators[type]) {
    const calc = calculators[type];
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Calculator Meta Tags -->
    <title>${calc.title}</title>
    <meta name="description" content="${calc.description}" />
    <meta name="keywords" content="${calc.keywords}" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${calc.ogTitle}" />
    <meta property="og:description" content="${calc.ogDescription}" />
    <meta property="og:image" content="${calc.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${calc.ogTitle} - 6Pack NZ" />
    <meta property="og:url" content="https://www.6pack.co.nz/calculators/${type}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="6Pack NZ" />
    <meta property="og:locale" content="en_NZ" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@6pack_nz" />
    <meta name="twitter:title" content="${calc.ogTitle}" />
    <meta name="twitter:description" content="${calc.ogDescription}" />
    <meta name="twitter:image" content="${calc.image}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.6pack.co.nz/calculators/${type}" />
    
    <!-- Redirect non-crawlers to main app -->
    <script>
      if (!/bot|crawler|spider|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) {
        window.location.href = '/calculators/${type}';
      }
    </script>
  </head>
  <body>
    <h1>${calc.ogTitle}</h1>
    <p>${calc.ogDescription}</p>
    <p><a href="/calculators/${type}">Continue to ${calc.ogTitle} →</a></p>
    
    <!-- For crawlers, show some actual content -->
    <div>
      <h2>Calculator Features:</h2>
      <ul>
        <li>Free ${type.toUpperCase()} calculation for New Zealanders</li>
        <li>Instant results and recommendations</li>
        <li>Mobile-friendly calculator</li>
        <li>Privacy-focused - no data stored</li>
        <li>Science-based formulas</li>
      </ul>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    return;
  }

  if (page === 'workout' && type && workouts[type]) {
    const workout = workouts[type];
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Workout Meta Tags -->
    <title>${workout.title}</title>
    <meta name="description" content="${workout.description}" />
    <meta name="keywords" content="${workout.keywords}" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${workout.ogTitle}" />
    <meta property="og:description" content="${workout.ogDescription}" />
    <meta property="og:image" content="${workout.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${workout.ogTitle} - 6Pack NZ" />
    <meta property="og:url" content="https://www.6pack.co.nz/workouts/${type}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="6Pack NZ" />
    <meta property="og:locale" content="en_NZ" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@6pack_nz" />
    <meta name="twitter:title" content="${workout.ogTitle}" />
    <meta name="twitter:description" content="${workout.ogDescription}" />
    <meta name="twitter:image" content="${workout.image}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.6pack.co.nz/workouts/${type}" />
    
    <!-- Redirect non-crawlers to main app -->
    <script>
      if (!/bot|crawler|spider|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) {
        window.location.href = '/workouts/${type}';
      }
    </script>
  </head>
  <body>
    <h1>${workout.ogTitle}</h1>
    <p>${workout.ogDescription}</p>
    <p><a href="/workouts/${type}">Continue to ${workout.ogTitle} →</a></p>
    
    <!-- For crawlers, show some actual content -->
    <div>
      <h2>Workout Guide Features:</h2>
      <ul>
        <li>Complete ${type} workout routines</li>
        <li>Beginner to advanced exercises</li>
        <li>Home and gym variations</li>
        <li>Proper form instructions</li>
        <li>Progressive training plans</li>
      </ul>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    return;
  }

  if (page === 'gym-finder') {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Gym Finder Meta Tags -->
    <title>Find Gyms Near You New Zealand | Gym Finder NZ | 6Pack</title>
    <meta name="description" content="Find the best gyms near you in New Zealand. Compare gyms by location, rating, and amenities. Free gym finder with reviews and contact details." />
    <meta name="keywords" content="gym finder NZ, find gyms New Zealand, gyms near me NZ, fitness centers New Zealand, gym locations NZ" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Find Gyms Near You New Zealand | 6Pack" />
    <meta property="og:description" content="Find the best gyms near you in New Zealand. Compare gyms by location, rating, and amenities." />
    <meta property="og:image" content="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop&fm=webp&q=85" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Find Gyms Near You New Zealand - 6Pack NZ" />
    <meta property="og:url" content="https://www.6pack.co.nz/gym-finder" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="6Pack NZ" />
    <meta property="og:locale" content="en_NZ" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@6pack_nz" />
    <meta name="twitter:title" content="Find Gyms Near You New Zealand | 6Pack" />
    <meta name="twitter:description" content="Find the best gyms near you in New Zealand. Compare by location and amenities." />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop&fm=webp&q=85" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.6pack.co.nz/gym-finder" />
    
    <!-- Redirect non-crawlers to main app -->
    <script>
      if (!/bot|crawler|spider|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) {
        window.location.href = '/gym-finder';
      }
    </script>
  </head>
  <body>
    <h1>Find Gyms Near You New Zealand</h1>
    <p>Find the best gyms near you in New Zealand. Compare gyms by location, rating, and amenities.</p>
    <p><a href="/gym-finder">Continue to Gym Finder →</a></p>
    
    <!-- For crawlers, show some actual content -->
    <div>
      <h2>Gym Finder Features:</h2>
      <ul>
        <li>Search gyms by location in New Zealand</li>
        <li>Compare ratings and reviews</li>
        <li>View contact details and hours</li>
        <li>Filter by amenities and services</li>
        <li>Get directions to nearby gyms</li>
      </ul>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    return;
  }

  if (page === 'article' && slug) {
    // Load articles data and find the article by slug
    const articles = getArticles();
    const article = articles.find(a => a.slug === slug);
    
    if (!article) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Article Not Found</h1>');
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Article Meta Tags -->
    <title>${article.metaTitle}</title>
    <meta name="description" content="${article.metaDescription}" />
    <meta name="keywords" content="${article.tags ? article.tags.join(', ') : article.category + ', fitness, health, New Zealand'}" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.excerpt}" />
    <meta property="og:image" content="${article.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${article.title} - 6Pack NZ" />
    <meta property="og:url" content="https://www.6pack.co.nz/articles/${article.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="6Pack NZ" />
    <meta property="og:locale" content="en_NZ" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@6pack_nz" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.excerpt}" />
    <meta name="twitter:image" content="${article.image}" />
    
    <!-- Article specific meta tags -->
    <meta property="article:author" content="${article.author}" />
    <meta property="article:published_time" content="${article.publishDate}" />
    <meta property="article:section" content="${article.category}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.6pack.co.nz/articles/${article.slug}" />
    
    <!-- Redirect non-crawlers to main app -->
    <script>
      if (!/bot|crawler|spider|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) {
        window.location.href = '/articles/${article.slug}';
      }
    </script>
  </head>
  <body>
    <h1>${article.title}</h1>
    <p><strong>By ${article.author}</strong> | <em>${article.category}</em></p>
    <p>${article.excerpt}</p>
    <p><a href="/articles/${article.slug}">Continue reading full article →</a></p>
    
    <!-- For crawlers, show some actual content -->
    <div>
      <h2>Article Summary:</h2>
      <p>${article.metaDescription}</p>
      <p><strong>Category:</strong> ${article.category}</p>
      <p><strong>Published:</strong> ${new Date(article.publishDate).toLocaleDateString('en-NZ')}</p>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    return;
  }

  // Default fallback
  res.writeHead(302, { Location: '/' });
  res.end();
}