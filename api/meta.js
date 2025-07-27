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

export default function handler(req, res) {
  const { page, slug } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  // Check if it's a crawler
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|bot|crawler|spider/i.test(userAgent);
  
  if (!isCrawler) {
    // Redirect normal users to the main app
    if (page === 'article' && slug) {
      res.writeHead(302, { Location: `/articles/${slug}` });
    } else {
      res.writeHead(302, { Location: '/calculators/bmi' });
    }
    res.end();
    return;
  }

  if (page === 'bmi') {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- BMI Calculator Meta Tags -->
    <title>Free BMI Calculator New Zealand | Body Mass Index Calculator NZ | 6Pack</title>
    <meta name="description" content="Free BMI calculator for New Zealanders. Calculate your Body Mass Index instantly, get personalised health recommendations, and understand your weight status. Metric & Imperial units supported." />
    <meta name="keywords" content="BMI calculator NZ, body mass index New Zealand, weight calculator, health assessment NZ, fitness calculator, BMI chart New Zealand, healthy weight NZ" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Free BMI Calculator New Zealand | 6Pack" />
    <meta property="og:description" content="Calculate your BMI instantly with our free New Zealand BMI calculator. Get health recommendations and weight status analysis." />
    <meta property="og:image" content="https://www.6pack.co.nz/bmi-calculator-social.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="6Pack NZ BMI Calculator - Calculate your Body Mass Index instantly" />
    <meta property="og:url" content="https://www.6pack.co.nz/calculators/bmi" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="6Pack NZ" />
    <meta property="og:locale" content="en_NZ" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@6pack_nz" />
    <meta name="twitter:title" content="Free BMI Calculator New Zealand | 6Pack" />
    <meta name="twitter:description" content="Calculate your BMI instantly with our free New Zealand BMI calculator." />
    <meta name="twitter:image" content="https://www.6pack.co.nz/bmi-calculator-social.jpg" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.6pack.co.nz/calculators/bmi" />
    
    <!-- Redirect non-crawlers to main app -->
    <script>
      if (!/bot|crawler|spider|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) {
        window.location.href = '/calculators/bmi';
      }
    </script>
  </head>
  <body>
    <h1>Free BMI Calculator New Zealand</h1>
    <p>Calculate your BMI instantly with our free New Zealand BMI calculator. Get health recommendations and weight status analysis.</p>
    <p><a href="/calculators/bmi">Continue to BMI Calculator →</a></p>
    
    <!-- For crawlers, show some actual content -->
    <div>
      <h2>BMI Calculator Features:</h2>
      <ul>
        <li>Free BMI calculation for New Zealanders</li>
        <li>Metric and Imperial units supported</li>
        <li>Instant health recommendations</li>
        <li>Mobile-friendly calculator</li>
        <li>Privacy-focused - no data stored</li>
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