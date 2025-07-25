import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Clock, User, Eye, Calendar, Share2, Bookmark } from 'lucide-react';
import { marked } from 'marked';
import { articles, fitnessCategories } from '../../data/products';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "6Pack",
      "logo": {
        "@type": "ImageObject",
        "url": "https://6pack.co.nz/logo.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://6pack.co.nz/articles/${article.slug}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.tags.join(', ')} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://6pack.co.nz/articles/${article.slug}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        
        {/* Article specific meta tags */}
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.publishDate} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://6pack.co.nz/articles/${article.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="relative bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link 
              to="/articles" 
              className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="mb-6">
              <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              {article.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(article.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-72 md:h-[28rem] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg prose-gray max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:leading-tight
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
                prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-gray-700 prose-li:mb-1
                prose-ul:mb-6 prose-ol:mb-6
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800 prose-em:italic
                prose-a:text-primary-600 prose-a:hover:text-primary-700 prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-table:border-collapse prose-table:w-full
                prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-300 prose-td:p-3
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono">
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: marked(article.content) }}
                />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Share & Save */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Share this article</h3>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      Share
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300 transition-colors">
                      Save
                    </button>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#introduction" className="block text-gray-600 hover:text-primary-600 transition-colors">
                      1. Introduction
                    </a>
                    <a href="#key-points" className="block text-gray-600 hover:text-primary-600 transition-colors">
                      2. Key Points
                    </a>
                    <a href="#conclusion" className="block text-gray-600 hover:text-primary-600 transition-colors">
                      3. Conclusion
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(relatedArticle => (
                  <Link
                    key={relatedArticle.id}
                    to={`/articles/${relatedArticle.slug}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {relatedArticle.readTime} • {relatedArticle.views.toLocaleString()} views
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}