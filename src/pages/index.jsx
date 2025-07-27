import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Scale, MapPin } from "lucide-react";
import BlurIn from "../components/blurText";
import ImageWithFallback from "../components/ui/ImageWithFallback";
import { articles, fitnessCategories } from "../data/products";

function Index() {
  const featuredArticles = articles.filter(article => article.featured).slice(0, 3);
  
  return (
    <>
      <Helmet>
        <title>6Pack NZ | Free Fitness Calculators, Expert Workout Plans & Nutrition Guides | New Zealand's #1 Fitness Hub</title>
        <meta
          name="description"
          content="🏆 New Zealand's leading fitness platform! Get FREE BMI, BMR & macro calculators ✓ 100+ expert workout plans ✓ Science-backed nutrition guides ✓ Personal training tips from NZ's top fitness experts. Transform your body today!"
        />
        <meta
          name="keywords"
          content="free fitness calculators NZ, BMI calculator New Zealand, BMR calculator, macro calculator, workout plans NZ, muscle building guides, weight loss programs New Zealand, strength training Auckland, fitness nutrition New Zealand, personal trainer advice NZ, gym workouts, 6pack abs exercises, fitness transformation NZ, health calculator tools, exercise programs New Zealand"
        />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:site_name" content="6Pack NZ" />
        <meta property="og:locale" content="en_NZ" />
        <meta property="og:title" content="6Pack NZ | Free Fitness Calculators, Expert Workout Plans & Nutrition Guides" />
        <meta
          property="og:description"
          content="🏆 New Zealand's #1 fitness platform! FREE calculators (BMI, BMR, Macro) ✓ 100+ workout plans ✓ Expert nutrition guides ✓ Transform your body with science-backed fitness strategies from NZ's top trainers."
        />
        <meta property="og:image" content="https://www.6pack.co.nz/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="6Pack NZ - New Zealand's Premier Fitness Platform with Free Calculators, Expert Workout Plans & Nutrition Guides" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:secure_url" content="https://www.6pack.co.nz/og-image.jpg" />
        <meta property="og:url" content="https://www.6pack.co.nz" />
        <meta property="og:type" content="website" />
        
        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@6pack_nz" />
        <meta name="twitter:creator" content="@6pack_nz" />
        <meta name="twitter:title" content="6Pack NZ | Free Fitness Calculators & Expert Workout Plans" />
        <meta name="twitter:description" content="🏆 NZ's #1 fitness platform! FREE calculators ✓ 100+ workout plans ✓ Expert guides ✓ Transform your body with science-backed strategies." />
        <meta name="twitter:image" content="https://www.6pack.co.nz/og-image.jpg" />
        <meta name="twitter:image:alt" content="6Pack NZ - Free fitness calculators, workout plans & nutrition guides for New Zealanders" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <meta name="author" content="6Pack NZ Fitness Experts" />
        <meta name="copyright" content="6Pack NZ" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />
        <meta name="geo.region" content="NZ" />
        <meta name="geo.country" content="New Zealand" />
        <meta name="geo.placename" content="New Zealand" />
        
        {/* Google-specific meta tags for better indexing */}
        <meta name="google" content="notranslate" />
        <meta name="google-site-verification" content="your-verification-code-here" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Additional image meta tags */}
        <link rel="image_src" href="https://www.6pack.co.nz/og-image.jpg" />
        <meta name="thumbnail" content="https://www.6pack.co.nz/og-image.jpg" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-title" content="6Pack NZ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="https://www.6pack.co.nz/og-image.jpg" />
        
        {/* Structured data for rich snippets */}
        <meta name="application-name" content="6Pack NZ" />
        <meta name="msapplication-tooltip" content="New Zealand's premier fitness platform" />
        <meta name="theme-color" content="#10b981" />
        
        <link rel="canonical" href="https://www.6pack.co.nz" />
        
        {/* Enhanced Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.6pack.co.nz/#organization",
            name: "6Pack NZ",
            alternateName: ["6Pack", "6Pack New Zealand", "6Pack Fitness NZ"],
            description: "New Zealand's leading fitness platform offering free calculators, expert workout plans, and science-backed nutrition guides for fitness transformation.",
            url: "https://www.6pack.co.nz",
            logo: {
              "@type": "ImageObject",
              "url": "https://www.6pack.co.nz/og-image.jpg",
              "width": 1200,
              "height": 630,
              "contentUrl": "https://www.6pack.co.nz/og-image.jpg",
              "thumbnailUrl": "https://www.6pack.co.nz/favicon.svg"
            },
            image: [
              {
                "@type": "ImageObject",
                "url": "https://www.6pack.co.nz/og-image.jpg",
                "width": 1200,
                "height": 630,
                "caption": "6Pack NZ - New Zealand's Premier Fitness Platform",
                "description": "Official branded image showcasing 6Pack NZ's comprehensive fitness platform with free calculators, expert workout plans, and science-backed nutrition guides designed specifically for New Zealanders",
                "contentUrl": "https://www.6pack.co.nz/og-image.jpg"
              }
            ],
            address: {
              "@type": "PostalAddress",
              "addressCountry": "NZ",
              "addressRegion": "Auckland"
            },
            foundingDate: "2024",
            slogan: "Transform Your Body with Science-Backed Fitness",
            knowsAbout: [
              "BMI Calculator",
              "BMR Calculator", 
              "Macro Calculator",
              "Body Fat Calculator",
              "1RM Calculator",
              "Ideal Weight Calculator",
              "Fitness Training",
              "Nutrition Planning",
              "Workout Programs",
              "Weight Loss Strategies",
              "Muscle Building",
              "Strength Training",
              "Personal Training",
              "Exercise Science",
              "Sports Nutrition"
            ],
            offers: [
              {
                "@type": "Offer",
                "name": "Free Fitness Calculators",
                "description": "BMI, BMR, Macro, Body Fat, and more calculators",
                "price": "0",
                "priceCurrency": "NZD"
              },
              {
                "@type": "Offer", 
                "name": "Expert Workout Plans",
                "description": "Science-backed training programs for all fitness levels"
              },
              {
                "@type": "Offer",
                "name": "Nutrition Guides", 
                "description": "Evidence-based nutrition strategies and meal planning"
              }
            ],
            areaServed: [
              {
                "@type": "Country",
                "name": "New Zealand"
              },
              {
                "@type": "City",
                "name": "Auckland"
              },
              {
                "@type": "City", 
                "name": "Wellington"
              },
              {
                "@type": "City",
                "name": "Christchurch"
              }
            ],
            serviceType: [
              "Fitness Coaching",
              "Nutrition Guidance", 
              "Workout Planning",
              "Health Assessment Tools",
              "Fitness Education"
            ],
            sameAs: [
              "https://twitter.com/6pack_nz",
              "https://facebook.com/6pack.co.nz", 
              "https://instagram.com/6pack_nz"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["English"],
              "areaServed": "NZ"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            },
            brand: {
              "@type": "Brand",
              "name": "6Pack NZ",
              "logo": "https://www.6pack.co.nz/og-image.jpg"
            }
          })}
        </script>
        
        {/* Enhanced Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.6pack.co.nz/#website",
            name: "6Pack NZ",
            alternateName: "6Pack New Zealand Fitness Hub",
            url: "https://www.6pack.co.nz",
            description: "New Zealand's premier fitness platform with free calculators, expert workout plans, and nutrition guides",
            inLanguage: "en-NZ",
            publisher: {
              "@id": "https://www.6pack.co.nz/#organization"
            },
            about: [
              {
                "@type": "Thing",
                "name": "Fitness Calculators",
                "description": "Free BMI, BMR, macro, body fat, and ideal weight calculators"
              },
              {
                "@type": "Thing", 
                "name": "Workout Plans",
                "description": "Expert-designed training programs for muscle building and weight loss"
              },
              {
                "@type": "Thing",
                "name": "Nutrition Guides",
                "description": "Science-backed nutrition strategies and meal planning advice"
              }
            ],
            mainEntity: [
              {
                "@type": "SoftwareApplication",
                "name": "BMI Calculator",
                "url": "https://www.6pack.co.nz/calculators/bmi",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "Web Browser"
              },
              {
                "@type": "SoftwareApplication", 
                "name": "BMR Calculator",
                "url": "https://www.6pack.co.nz/calculators/bmr",
                "applicationCategory": "HealthApplication", 
                "operatingSystem": "Web Browser"
              },
              {
                "@type": "SoftwareApplication",
                "name": "Macro Calculator", 
                "url": "https://www.6pack.co.nz/calculators/macro",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "Web Browser"
              }
            ],
            potentialAction: [
              {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.6pack.co.nz/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              {
                "@type": "ReadAction",
                "target": "https://www.6pack.co.nz/articles"
              },
              {
                "@type": "UseAction",
                "target": "https://www.6pack.co.nz/calculators"
              }
            ]
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.6pack.co.nz"
              }
            ]
          })}
        </script>

        {/* Knowledge Graph Entity Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "HealthAndBeautyBusiness"],
            "@id": "https://www.6pack.co.nz/#entity",
            "name": "6Pack NZ",
            "alternateName": ["6Pack", "6Pack New Zealand", "6Pack Fitness"],
            "description": "New Zealand's leading fitness platform offering free calculators, expert workout plans, and science-backed nutrition guides.",
            "url": "https://www.6pack.co.nz",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.6pack.co.nz/og-image.jpg",
              "width": 1200,
              "height": 630
            },
            "image": "https://www.6pack.co.nz/og-image.jpg",
            "founder": {
              "@type": "Person",
              "name": "6Pack NZ Team"
            },
            "foundingDate": "2024",
            "foundingLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NZ",
                "addressRegion": "Auckland"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "New Zealand"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -40.9006,
                "longitude": 174.8860
              },
              "geoRadius": "2000000"
            },
            "knowsAbout": [
              "Fitness",
              "Nutrition",
              "Weight Loss",
              "Muscle Building",
              "Strength Training",
              "Health Calculators",
              "BMI",
              "BMR",
              "Macro Nutrients",
              "Body Fat Percentage",
              "Personal Training",
              "Exercise Science"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fitness Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Free Fitness Calculators",
                    "description": "BMI, BMR, Body Fat, Macro, and Ideal Weight calculators"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Workout Plans",
                    "description": "Expert-designed training programs for all fitness levels"
                  }
                }
              ]
            },
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": "https://www.6pack.co.nz/articles?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            ],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.6pack.co.nz"
            },
            "sameAs": [
              "https://twitter.com/6pack_nz",
              "https://facebook.com/6pack.co.nz",
              "https://instagram.com/6pack_nz"
            ]
          })}
        </script>

        {/* FAQ Schema for common questions */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What fitness calculators does 6Pack NZ offer?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "6Pack NZ offers free BMI Calculator, BMR Calculator, Macro Calculator, Body Fat Calculator, 1RM Calculator, and Ideal Weight Calculator - all scientifically accurate and designed for New Zealanders."
                }
              },
              {
                "@type": "Question",
                "name": "Are the workout plans suitable for beginners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! 6Pack NZ provides workout plans for all fitness levels, from complete beginners to advanced athletes. Each plan includes detailed instructions and progression guidelines."
                }
              },
              {
                "@type": "Question", 
                "name": "Is 6Pack NZ content backed by science?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. All content is created by certified fitness professionals and based on peer-reviewed research. We prioritize evidence-based fitness and nutrition strategies."
                }
              }
            ]
          })}
        </script>

        {/* Image Gallery Schema for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "6Pack NZ Fitness Platform Gallery",
            "description": "Visual showcase of New Zealand's premier fitness platform featuring calculators, workout guides, and expert content",
            "url": "https://www.6pack.co.nz",
            "associatedMedia": [
              {
                "@type": "ImageObject",
                "contentUrl": "https://www.6pack.co.nz/og_image.png",
                "width": 1200,
                "height": 630,
                "caption": "6Pack NZ - Official Fitness Platform Brand Image",
                "description": "Official branded image for New Zealand's premier fitness platform featuring free calculators, expert workout plans, and science-backed nutrition guides",
                "keywords": "6Pack NZ, fitness platform New Zealand, free fitness calculators, BMI calculator NZ, BMR calculator, macro calculator, workout plans NZ, nutrition guides",
                "author": {
                  "@type": "Organization",
                  "name": "6Pack NZ"
                },
                "copyrightHolder": {
                  "@type": "Organization",
                  "name": "6Pack NZ"
                },
                "license": "https://www.6pack.co.nz/terms"
              }
            ]
          })}
        </script>

        {/* Video Schema for potential video content */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "6Pack NZ Fitness Platform Overview",
            "description": "Discover New Zealand's premier fitness platform with free calculators, expert workout plans, and science-backed nutrition guides",
            "thumbnailUrl": "https://www.6pack.co.nz/og_image.png",
            "uploadDate": "2024-01-01",
            "duration": "PT2M30S",
            "contentUrl": "https://www.6pack.co.nz",
            "embedUrl": "https://www.6pack.co.nz",
            "publisher": {
              "@type": "Organization",
              "name": "6Pack NZ",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.6pack.co.nz/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85"
            alt="6Pack NZ - New Zealand's Premier Fitness Platform with Free BMI, BMR & Macro Calculators, Expert Workout Plans and Science-Backed Nutrition Guides"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
            fetchpriority="high"
            itemProp="image"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <BlurIn
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              word="Transform Your Body with Science-Backed Fitness"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover expert fitness guides, proven workout strategies, and nutrition advice 
              from New Zealand&apos;s top trainers. Build your dream physique with evidence-based 
              training methods.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <BookOpen className="mr-2" size={16} />
                Expert-written content
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Science-backed research
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <TrendingUp className="mr-2" size={16} />
                Proven results
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/articles"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Explore Articles
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/workouts"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
              >
                Browse Workouts
                <Users className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Fitness Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert-backed guides and strategies to accelerate your fitness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map(article => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/articles"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              View All Articles
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Fitness Calculators Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden py-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&fm=webp&q=85"
            alt="6Pack NZ Fitness Calculators - Free BMI, BMR, Macro, Body Fat & 1RM Calculators for New Zealand Fitness Enthusiasts"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
            itemProp="image"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Fitness Calculators
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Take the guesswork out of your fitness journey with our science-based calculators
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Personalised results
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <TrendingUp className="mr-2" size={16} />
                Science-backed formulas
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* BMI Calculator */}
            <Link
              to="/calculators/bmi"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                BMI Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Calculate your Body Mass Index and understand your weight status
              </p>
            </Link>

            {/* BMR Calculator */}
            <Link
              to="/calculators/bmr"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-red-600 font-bold text-lg">🔥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                BMR Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Determine your daily calorie needs and metabolic rate
              </p>
            </Link>

            {/* Body Fat Calculator */}
            <Link
              to="/calculators/body-fat"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Body Fat Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Estimate your body fat percentage using proven methods
              </p>
            </Link>

            {/* 1RM Calculator */}
            <Link
              to="/calculators/one-rep-max"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-orange-600 font-bold text-lg">💪</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                1RM Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Calculate your one-rep max for strength training
              </p>
            </Link>

            {/* Macro Calculator */}
            <Link
              to="/calculators/macro"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-green-600 font-bold text-lg">🍎</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Macro Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Plan your daily macronutrient needs for optimal results
              </p>
            </Link>

            {/* Ideal Weight Calculator */}
            <Link
              to="/calculators/ideal-weight"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Ideal Weight Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Find your ideal weight range based on scientific formulas
              </p>
            </Link>
          </div>
          
          <div className="text-center">
            <Link
              to="/calculators"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              View All Calculators
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gym Finder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Find Gyms Near You
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Discover the best fitness centers across New Zealand. Search by location, filter by amenities, and find the perfect gym that matches your fitness goals.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Use your location or search by address</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Filter by distance, amenities, and gym type</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Find gyms from major NZ chains and local centers</span>
                </div>
              </div>

              <Link
                to="/gym-finder"
                className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
              >
                Find Gyms Near Me
                <MapPin className="ml-2" size={20} />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&fm=webp&q=85"
                  alt="Modern gym interior with equipment"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">50+</div>
                    <div className="text-sm text-gray-600">Gyms Listed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">7</div>
                    <div className="text-sm text-gray-600">Major Cities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">24/7</div>
                    <div className="text-sm text-gray-600">Many Open</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Fitness Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides covering every aspect of fitness and training
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fitnessCategories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.articleCount} articles
                    </span>
                    <Link
                      to={`/articles?category=${category.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      Explore
                      <ArrowRight className="ml-1" size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose 6Pack?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              New Zealand&apos;s most trusted fitness resource with expert-backed content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Content</h3>
              <p className="text-gray-600">Science-backed articles from certified trainers and nutritionists.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal-Focused</h3>
              <p className="text-gray-600">Tailored strategies for muscle building, fat loss, and performance.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Methods tested by thousands of successful transformations.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join thousands of fitness enthusiasts on their journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of fitness enthusiasts achieving their goals with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/articles"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start Reading Articles
              <BookOpen className="ml-2" size={20} />
            </Link>
            <Link
              to="/workouts"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
            >
              Browse Workouts
              <Users className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
