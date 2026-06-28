import Link from "next/link";
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Scale, MapPin } from "lucide-react";
import BlurIn from "../components/blurText";
import ImageWithFallback from "../components/ui/ImageWithFallback";
import { articles, fitnessCategories } from "../data/products";
import SEO from "../components/SEO";
import { generateFAQSchema, generateHowToSchema } from "../utils/seo-enhanced";

// Enhanced metadata for Next.js App Router + our SEO system
export const metadata = {
  title: "Free Fitness Calculators & Expert Workout Plans | 6Pack NZ",
  description: "Free BMI, BMR, macro, body fat & 1RM calculators for New Zealanders, plus science-backed workout and nutrition guides and a NZ gym finder. Start today.",
  openGraph: {
    title: "Free Fitness Calculators & Expert Workout Plans | 6Pack NZ",
    description: "Free BMI, BMR & macro calculators, science-backed workout and nutrition guides, and a New Zealand gym finder. Practical fitness for Kiwis.",
    images: [{
      url: "https://www.6pack.co.nz/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "6Pack NZ - New Zealand Fitness Platform",
    }],
    url: "https://www.6pack.co.nz",
    type: "website",
    siteName: "6Pack NZ",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@6pack_nz",
    creator: "@6pack_nz",
  },
  alternates: {
    canonical: "https://www.6pack.co.nz",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

function HomePage() {
  const featuredArticles = articles.filter(article => article.featured).slice(0, 3);

  // Enhanced FAQ structured data for home page
  const homePageFAQs = generateFAQSchema([
    {
      question: "What fitness calculators are available on 6Pack NZ?",
      answer: "We offer comprehensive free fitness calculators including BMI Calculator, BMR/TDEE Calculator, Macro Calculator, Body Fat Calculator, One Rep Max Calculator, and Ideal Weight Calculator. All are scientifically validated and calibrated for New Zealand populations."
    },
    {
      question: "Are the fitness calculators really free to use?",
      answer: "Yes, absolutely! All our fitness calculators are completely free to use with no registration required. We believe everyone deserves access to quality health and fitness tools."
    },
    {
      question: "How accurate are the fitness calculators?",
      answer: "Our calculators use scientifically proven formulas and are regularly updated based on the latest research. While they provide excellent estimates, always consult with healthcare professionals for personalized advice."
    },
    {
      question: "Can I use these calculators if I'm a beginner to fitness?",
      answer: "Absolutely! Our calculators are designed for all fitness levels, from complete beginners to advanced athletes. Each calculator includes helpful explanations and guidance for interpreting your results."
    },
    {
      question: "Are the workout plans suitable for New Zealand gyms?",
      answer: "Yes, our workout plans are specifically designed considering equipment commonly available in New Zealand gyms and home setups. We also provide modifications for different equipment availability."
    }
  ]);

  // How-to structured data for using fitness calculators
  const calculatorGuide = generateHowToSchema({
    name: "How to Use 6Pack NZ Fitness Calculators",
    description: "Step-by-step guide to using our free fitness calculators for optimal health and fitness results",
    image: "https://www.6pack.co.nz/og-image.jpg",
    totalTime: "PT5M",
    difficulty: "Beginner",
    steps: [
      {
        name: "Choose Your Calculator",
        text: "Select the appropriate calculator based on your fitness goal - BMI for weight status, BMR for calorie needs, or Macro for nutrition planning."
      },
      {
        name: "Enter Your Information",
        text: "Input accurate measurements including height, weight, age, and activity level for the most precise results."
      },
      {
        name: "Review Your Results",
        text: "Understand what your numbers mean using our detailed explanations and recommendations."
      },
      {
        name: "Take Action",
        text: "Use your results to create a personalized fitness and nutrition plan or consult with health professionals."
      }
    ]
  });
  
  return (
    <>
      {/* Structured Data for SEO */}
      <SEO
        structuredData={{
          additional: [
            homePageFAQs,
            calculatorGuide,
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "6Pack NZ Fitness Platform",
              "description": "Comprehensive fitness platform with free calculators, workout plans, and expert guidance",
              "url": "https://www.6pack.co.nz",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "NZD"
              },
              // AggregateRating removed - will be added when real user reviews are implemented
              "author": {
                "@type": "Organization",
                "name": "6Pack NZ"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "6Pack NZ Fitness Calculators",
              "description": "Free fitness calculators for health and wellness",
              "numberOfItems": 6,
              "itemListElement": [
                {
                  "@type": "SoftwareApplication",
                  "position": 1,
                  "name": "BMI Calculator",
                  "url": "https://www.6pack.co.nz/calculators/bmi",
                  "applicationCategory": "HealthApplication"
                },
                {
                  "@type": "SoftwareApplication", 
                  "position": 2,
                  "name": "BMR Calculator",
                  "url": "https://www.6pack.co.nz/calculators/bmr",
                  "applicationCategory": "HealthApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "position": 3,
                  "name": "Macro Calculator",
                  "url": "https://www.6pack.co.nz/calculators/macro", 
                  "applicationCategory": "HealthApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "position": 4,
                  "name": "Body Fat Calculator",
                  "url": "https://www.6pack.co.nz/calculators/body-fat",
                  "applicationCategory": "HealthApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "position": 5,
                  "name": "One Rep Max Calculator", 
                  "url": "https://www.6pack.co.nz/calculators/one-rep-max",
                  "applicationCategory": "HealthApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "position": 6,
                  "name": "Ideal Weight Calculator",
                  "url": "https://www.6pack.co.nz/calculators/ideal-weight",
                  "applicationCategory": "HealthApplication"
                }
              ]
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85"
            alt="6Pack NZ - New Zealand's Premier Fitness Platform with Free BMI, BMR & Macro Calculators, Expert Workout Plans and Science-Backed Nutrition Guides"
            className="w-full h-full object-cover opacity-30"
            priority
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
                href="/articles"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Explore Articles
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/workouts"
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
                href={`/articles/${article.slug}`}
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
              href="/articles"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              View All Articles
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              New Zealand's Premier Fitness Resource Hub
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>
                Welcome to 6Pack NZ, where science meets fitness in New Zealand's most comprehensive health and wellness platform. 
                Whether you're a beginner starting your fitness journey in Auckland, Wellington, or anywhere across the country, 
                or an experienced athlete looking to optimize your performance, we provide the tools, knowledge, and guidance you need to succeed.
              </p>
              <p>
                Our platform features free, scientifically-validated fitness calculators including BMI, BMR, macro, and body fat percentage tools 
                specifically calibrated for New Zealand populations. These aren't just numbers – they're your personalized roadmap to better health, 
                helping thousands of Kiwis understand their bodies and make informed decisions about their fitness goals.
              </p>
              <p>
                Beyond calculators, we offer expert-written articles covering everything from muscle building and weight loss to sports nutrition 
                and injury prevention. Our content is created by certified fitness professionals, registered dietitians, and exercise physiologists 
                who understand the unique needs of New Zealanders, from managing fitness during our varied climate to finding healthy local food options.
              </p>
              <p>
                Join thousands of New Zealanders who trust 6Pack NZ for evidence-based fitness guidance. Start with our free calculators, 
                explore our comprehensive workout plans, and discover nutrition strategies that fit your lifestyle. Your transformation begins here.
              </p>
            </div>
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
              href="/calculators/bmi"
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
              href="/calculators/bmr"
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
              href="/calculators/body-fat"
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
              href="/calculators/one-rep-max"
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
              href="/calculators/macro"
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
              href="/calculators/ideal-weight"
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
              href="/calculators"
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
                href="/gym-finder"
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
                      href={`/articles?category=${category.slug}`}
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
              href="/articles"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start Reading Articles
              <BookOpen className="ml-2" size={20} />
            </Link>
            <Link
              href="/workouts"
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

export default HomePage;