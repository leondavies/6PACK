import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Search, Filter, Clock, User, Eye, BookOpen, TrendingUp, Award } from 'lucide-react';
import { articles, fitnessCategories } from '../../data/products';
import BlurIn from '../../components/blurText';

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'popular':
          return b.views - a.views;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <Helmet>
        <title>Fitness Articles & Guides | Expert Training & Nutrition Content</title>
        <meta name="description" content="Discover expert fitness articles, workout guides, and nutrition tips. Science-based content for muscle building, weight loss, and athletic performance." />
        <meta name="keywords" content="fitness articles, workout guides, nutrition tips, muscle building, weight loss, strength training" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Background Image */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=800&fit=crop"
              alt="Fitness Knowledge Hub"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <BlurIn
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                word="Fitness Knowledge Hub"
              />
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Science-backed articles, expert guides, and proven strategies to transform your fitness journey
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <BookOpen className="mr-2" size={16} />
                  Expert-written content
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Award className="mr-2" size={16} />
                  Science-backed research
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <TrendingUp className="mr-2" size={16} />
                  Proven results
                </div>
              </div>

              <div className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                <Search className="mr-2" size={20} />
                Explore Articles Below
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Categories</option>
                  {fitnessCategories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/articles/${article.slug}`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/articles/${article.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <time className="text-sm text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </time>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}