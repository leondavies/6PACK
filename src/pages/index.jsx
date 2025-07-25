import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Star } from "lucide-react";
import BlurIn from "../components/blurText";
import ImageWithFallback from "../components/ui/ImageWithFallback";
import { articles, fitnessCategories } from "../data/products";

function Index() {
  const featuredArticles = articles.filter(article => article.featured).slice(0, 3);
  
  return (
    <>
      <Helmet>
        <title>6Pack - New Zealand's Premier Fitness Training Hub</title>
        <meta
          name="description"
          content="Transform your body with expert fitness guides, workout plans, and nutrition advice. Science-backed strategies for muscle building, weight loss, and peak performance."
        />
        <meta
          name="keywords"
          content="fitness New Zealand, workout plans, muscle building, weight loss, strength training, nutrition guides, 6pack abs, fitness articles"
        />
        <meta property="og:title" content="6Pack - New Zealand's Premier Fitness Training Hub" />
        <meta
          property="og:description"
          content="Transform your body with expert fitness guides, workout plans, and nutrition advice from New Zealand's top fitness experts."
        />
        <meta property="og:image" content="https://6pack.co.nz/fitness-hero.jpg" />
        <meta property="og:url" content="https://6pack.co.nz" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "6Pack",
            description: "New Zealand's Premier Fitness Training Hub",
            url: "https://6pack.co.nz",
            logo: "https://6pack.co.nz/logo.png",
            sameAs: [
              "https://twitter.com/6pack_nz",
              "https://facebook.com/6pack.co.nz",
              "https://instagram.com/6pack_nz"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <BlurIn
                className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                word="Transform Your Body with Science-Backed Fitness"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover expert fitness guides, proven workout strategies, and nutrition advice 
                from New Zealand's top trainers. Build your dream physique with evidence-based 
                training methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/articles"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center group"
                >
                  Explore Articles
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/supplements"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors text-center"
                >
                  Shop Supplements
                </Link>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-2xl h-96 flex items-center justify-center p-8 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&crop=center"
                alt="Fitness Training and Muscle Building"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
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
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              View All Articles
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
              New Zealand's most trusted fitness resource with expert-backed content
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
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Start Reading Articles
            </Link>
            <Link
              to="/workouts"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Browse Workouts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
