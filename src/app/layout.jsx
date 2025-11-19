import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CookieConsent from '../components/CookieConsent'
import '../index.css'

export const metadata = {
  metadataBase: new URL('https://www.6pack.co.nz'),
  title: {
    default: '6Pack NZ - New Zealand\'s Premier Fitness & Nutrition Platform | Free Calculators & Expert Guides',
    template: '%s | 6Pack NZ'
  },
  description: 'Transform your body with New Zealand\'s #1 fitness platform. FREE BMI, BMR & macro calculators ✓ 100+ expert workout plans ✓ Science-backed nutrition guides ✓ Join 50,000+ Kiwis achieving their fitness goals.',
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
    title: '6Pack NZ - New Zealand\'s Premier Fitness & Nutrition Platform',
    description: '🏆 Transform your body with NZ\'s #1 fitness platform! FREE calculators (BMI, BMR, Macro) ✓ 100+ workout plans ✓ Expert nutrition guides ✓ Join 50,000+ Kiwis achieving their fitness goals.',
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
    title: '6Pack NZ - New Zealand\'s Premier Fitness Platform',
    description: '🏆 Transform your body with NZ\'s #1 fitness platform! FREE calculators ✓ 100+ workout plans ✓ Expert nutrition guides',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'QrPmrJ7fQj4j8Qj4j8Qj4j8Qj4j8Qj4j8Qj4j',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
    other: {
      me: ['mailto:info@6pack.co.nz', 'https://www.6pack.co.nz'],
    },
  },
  alternates: {
    canonical: 'https://www.6pack.co.nz',
    languages: {
      'en-NZ': 'https://www.6pack.co.nz',
      'en': 'https://www.6pack.co.nz',
    },
  },
  other: {
    'revisit-after': '7 days',
    'distribution': 'global',
    'rating': 'general',
    'coverage': 'worldwide',
    'target': 'fitness enthusiasts, health conscious individuals, personal trainers, gym members',
    'audience': 'New Zealand fitness community',
    'subject': 'Fitness, Nutrition, Health, Exercise, Wellness',
    'abstract': 'Comprehensive fitness platform offering free calculators, expert workout plans, and science-backed nutrition guidance for New Zealanders.',
    'topic': 'Health and Fitness',
    'summary': 'New Zealand\'s premier fitness resource providing free tools and expert guidance for achieving your fitness goals.',
    'Classification': 'Health & Fitness',
    'owner': '6Pack NZ',
    'reply-to': 'info@6pack.co.nz',
    'category': 'Fitness and Health',
    'coverage': 'New Zealand',
    'distribution': 'Global',
    'rating': 'General',
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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />

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
              description: 'New Zealand\'s premier fitness and training platform offering expert-backed content, personalised coaching, and science-based strategies for transformation.',
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
              description: 'New Zealand\'s #1 fitness platform with FREE calculators, expert workout plans, and science-backed nutrition guides.',
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