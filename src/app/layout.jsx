import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CookieConsent from '../components/CookieConsent'
import '../index.css'

export const metadata = {
  metadataBase: new URL('https://www.6pack.co.nz'),
  title: {
    default: '6Pack NZ - New Zealand Fitness & Nutrition Platform | Free Calculators & Expert Guides',
    template: '%s | 6Pack NZ'
  },
  description: 'Free fitness tools for New Zealanders: BMI, BMR, macro, body fat, 1RM and ideal weight calculators, plus science-backed workout and nutrition guides and a NZ gym finder.',
  keywords: [
    'fitness New Zealand',
    'BMI calculator NZ',
    'BMR calculator',
    'macro calculator',
    'workout plans NZ',
    'nutrition guides',
    'fitness calculators',
    'gym finder New Zealand',
    'weight loss NZ',
    'muscle building',
    'strength training',
    'fitness coaching',
    'health calculator',
    'body composition',
    'fitness transformation',
    'personal training NZ',
    'fitness equipment',
    'exercise programs',
    'diet plans NZ',
    'fitness motivation'
  ],
  authors: [{ name: '6Pack NZ Team', url: 'https://www.6pack.co.nz' }],
  creator: '6Pack NZ',
  publisher: '6Pack NZ',
  category: 'Health & Fitness',
  classification: 'Health and Fitness Resource',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://www.6pack.co.nz',
    siteName: '6Pack NZ',
    title: '6Pack NZ - New Zealand Fitness & Nutrition Platform',
    description: 'Free BMI, BMR & macro calculators, science-backed workout and nutrition guides, and a New Zealand gym finder. Practical fitness for Kiwis.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '6Pack NZ - New Zealand\'s Premier Fitness Platform with Free Calculators and Expert Guides',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@6pack_nz',
    creator: '@6pack_nz',
    title: '6Pack NZ - New Zealand Fitness Platform',
    description: 'Free BMI, BMR & macro calculators, science-backed workout and nutrition guides, and a NZ gym finder.',
    images: ['/og-image.jpg'],
  },
  // To verify the site in Google Search Console, add your verification token below.
  // Get it from https://search.google.com/search-console (HTML tag method).
  // verification: { google: 'your-google-site-verification-token' },
  alternates: {
    canonical: 'https://www.6pack.co.nz',
    languages: {
      'en-NZ': 'https://www.6pack.co.nz',
      'en': 'https://www.6pack.co.nz',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Google Tag Manager - Loaded via CookieConsent component after user consent */}

        {/* Global Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '6Pack NZ',
              legalName: '6Pack New Zealand',
              url: 'https://www.6pack.co.nz',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.6pack.co.nz/og-image.jpg',
                width: 1200,
                height: 630
              },
              description: 'New Zealand fitness and nutrition platform offering free calculators, science-backed workout and nutrition guides, and a gym finder.',
              foundingDate: '2024',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'NZ',
                addressRegion: 'New Zealand'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@6pack.co.nz',
                contactType: 'Customer Service',
                areaServed: 'NZ'
              },
              sameAs: [
                'https://twitter.com/6pack_nz',
                'https://facebook.com/6pack.co.nz',
                'https://instagram.com/6pack_nz'
              ],
              areaServed: {
                '@type': 'Country',
                name: 'New Zealand'
              }
            })
          }}
        />

        {/* Global Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '6Pack NZ',
              alternateName: '6Pack New Zealand',
              url: 'https://www.6pack.co.nz',
              description: 'New Zealand fitness platform with free calculators, workout plans, and science-backed nutrition guides.',
              publisher: {
                '@type': 'Organization',
                name: '6Pack NZ',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.6pack.co.nz/og-image.jpg'
                }
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.6pack.co.nz/articles?search={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              },
              inLanguage: 'en-NZ'
            })
          }}
        />

        {/* Optimize rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="color-scheme" content="light" />
        
        {/* Apple specific optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="6Pack NZ" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Microsoft specific */}
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance hints */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-fitness antialiased">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1 pt-20" role="main">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}