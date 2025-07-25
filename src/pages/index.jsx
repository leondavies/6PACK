import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Scale } from "lucide-react";
import BlurIn from "../components/blurText";
import ImageWithFallback from "../components/ui/ImageWithFallback";
import { articles, fitnessCategories } from "../data/products";

function Index() {
  const featuredArticles = articles.filter(article => article.featured).slice(0, 3);
  
  return (
    <>
      <Helmet>
        <title>6Pack NZ | New Zealand&apos;s Premier Fitness & Training Hub | Free Calculators & Guides</title>
        <meta
          name="description"
                      content="Transform your body with 6Pack NZ - New Zealand&apos;s top fitness resource. Free BMI, BMR & macro calculators, expert workout plans, nutrition guides, and science-backed fitness strategies for Kiwis."
        />
        <meta
          name="keywords"
          content="fitness New Zealand, gym NZ, workout plans NZ, muscle building New Zealand, weight loss NZ, strength training, nutrition guides, fitness calculators NZ, 6pack abs, fitness articles New Zealand, personal trainer NZ"
        />
        <meta property="og:title" content="6Pack NZ - New Zealand's Premier Fitness Training Hub" />
        <meta
          property="og:description"
          content="Transform your body with expert fitness guides, calculators, and nutrition advice from New Zealand's top fitness experts."
        />
        <meta property="og:image" content="https://6pack.co.nz/6pack.webp" />
        <meta property="og:url" content="https://6pack.co.nz" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="6Pack NZ - New Zealand's Premier Fitness Training Hub" />
        <meta name="twitter:description" content="Transform your body with expert fitness guides and calculators from NZ's top fitness experts." />
        <meta name="twitter:image" content="https://6pack.co.nz/6pack.webp" />
        <link rel="canonical" href="https://6pack.co.nz" />
        
        {/* Enhanced Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://6pack.co.nz/#organization",
            name: "6Pack",
            alternateName: "6Pack NZ",
            description: "New Zealand's Premier Fitness Training Hub with free calculators and expert guides",
            url: "https://6pack.co.nz",
            logo: {
              "@type": "ImageObject",
              "url": "https://6pack.co.nz/logo.png",
              "width": 200,
              "height": 60
            },
            address: {
              "@type": "PostalAddress",
              "addressCountry": "NZ",
              "addressRegion": "Auckland"
            },
            foundingDate: "2024",
            knowsAbout: [
              "Fitness Training",
              "Nutrition Advice", 
              "Workout Plans",
              "BMI Calculation",
              "Weight Loss",
              "Muscle Building",
              "Strength Training"
            ],
            areaServed: {
              "@type": "Country",
              "name": "New Zealand"
            },
            sameAs: [
              "https://twitter.com/6pack_nz",
              "https://facebook.com/6pack.co.nz",
              "https://instagram.com/6pack_nz"
            ]
          })}
        </script>
        
        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://6pack.co.nz/#website",
            name: "6Pack",
            url: "https://6pack.co.nz",
            description: "New Zealand's Premier Fitness Training Hub",
            publisher: {
              "@id": "https://6pack.co.nz/#organization"
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://6pack.co.nz/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=800&fit=crop"
            alt="Transform Your Body with Science-Backed Fitness"
            className="w-full h-full object-cover opacity-30"
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=800&fit=crop"
            alt="Fitness calculations and tracking"
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
