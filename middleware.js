import { NextResponse } from 'next/server'

// Simple crawler detection
const isCrawler = (userAgent) => {
  return /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram/i.test(userAgent || '')
}

// Simple page meta data
const getPageMeta = (pathname) => {
  // BMI Calculator
  if (pathname === '/calculators/bmi') {
    return {
      title: 'Free BMI Calculator | Body Mass Index Tool | 6Pack NZ',
      description: 'Calculate your BMI instantly with our free Body Mass Index calculator. Get accurate results and health insights for New Zealand fitness goals.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85'
    }
  }
  
  // Default fallback
  return {
    title: '6Pack NZ | New Zealand Fitness & Nutrition Hub',
    description: 'New Zealand\'s premier fitness resource hub with expert training guides, nutrition advice, and health calculators.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop&fm=webp&q=85'
  }
}

export function middleware(request) {
  const userAgent = request.headers.get('user-agent')
  
  // Only handle crawlers
  if (!isCrawler(userAgent)) {
    return NextResponse.next()
  }
  
  const { pathname } = request.nextUrl
  const meta = getPageMeta(pathname)
  
  // Return simple HTML for crawlers
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://www.6pack.co.nz${pathname}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="6Pack NZ">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image}">
  
  <link rel="canonical" href="https://www.6pack.co.nz${pathname}">
</head>
<body>
  <h1>6Pack NZ</h1>
  <p>Loading...</p>
  <script>window.location.href = 'https://www.6pack.co.nz${pathname}';</script>
</body>
</html>`

  return new Response(html, {
    headers: {
      'content-type': 'text/html',
    },
  })
}

export const config = {
  matcher: [
    '/calculators/bmi',
    '/calculators/bmr',
    '/calculators/body-fat',
    '/calculators/calories',
    '/calculators/protein',
    '/articles/:path*',
    '/workouts/:path*'
  ]
}