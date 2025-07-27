import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's a crawler/bot
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|googlebot|whatsapp|telegram/i.test(userAgent);
  
  if (!isCrawler) {
    return NextResponse.next();
  }

  // Handle BMI calculator page for crawlers
  if (url.pathname === '/calculators/bmi') {
    const response = NextResponse.next();
    
    // You would need to implement server-side rendering here
    // This is a complex setup for Vercel + Vite
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/calculators/:path*',
    '/articles/:path*',
    '/workouts/:path*'
  ]
};