export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Only handle social media crawlers
  const isSocialCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram/i.test(userAgent);
  
  if (!isSocialCrawler) {
    // Not a social crawler, serve the normal SPA
    return res.redirect(302, '/');
  }

  const { url } = req;
  let title, description, image, canonicalUrl;

  // BMI Calculator
  if (url.includes('/calculators/bmi')) {
    title = 'Free BMI Calculator New Zealand | Body Mass Index NZ | 6Pack';
    description = 'Free BMI calculator for New Zealanders. Calculate your Body Mass Index to understand your weight status and get personalised health recommendations.';
    image = 'https://www.6pack.co.nz/bmi-calculator-social.jpg';
    canonicalUrl = 'https://www.6pack.co.nz/calculators/bmi';
  }
  // Gym Finder
  else if (url.includes('/gym-finder')) {
    title = 'Gym Finder | Find Gyms Near You in New Zealand | 6Pack';
    description = 'Find gyms near you in New Zealand. Search by location and discover the best fitness centers with our interactive gym finder tool.';
    image = 'https://www.6pack.co.nz/og-image.jpg';
    canonicalUrl = 'https://www.6pack.co.nz/gym-finder';
  }
  // Default (homepage)
  else {
    title = '6Pack NZ | New Zealand Fitness & Nutrition Hub';
    description = 'New Zealand\'s premier fitness resource hub with expert training guides, nutrition advice, calculators and workout plans for achieving your fitness goals.';
    image = 'https://www.6pack.co.nz/og-image.jpg';
    canonicalUrl = 'https://www.6pack.co.nz/';
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="6Pack NZ">
  <meta property="og:locale" content="en_NZ">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@6pack_nz">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  
  <link rel="canonical" href="${canonicalUrl}">
</head>
<body>
  <h1>6Pack NZ</h1>
  <p>Loading...</p>
  <script>window.location.href = '${canonicalUrl}';</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}