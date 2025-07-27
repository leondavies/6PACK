export default function handler(req, res) {
  const { page } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  // Check if it's a crawler
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|bot|crawler|spider/i.test(userAgent);
  
  if (!isCrawler && page !== 'bmi') {
    // Redirect normal users to the main app
    res.writeHead(302, { Location: '/calculators/bmi' });
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

  // Default fallback
  res.writeHead(302, { Location: '/' });
  res.end();
}