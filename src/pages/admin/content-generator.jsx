import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Download, Plus, RefreshCw, FileText, Target, TrendingUp } from 'lucide-react';
import { 
  generateBulkArticles, 
  generateArticleIdeas, 
  fitnessTopics,
  generateThousandsOfArticles 
} from '../../utils/contentGenerator';

export default function ContentGenerator() {
  const [selectedCategories, setSelectedCategories] = useState(['muscleBuilding']);
  const [articlesPerCategory, setArticlesPerCategory] = useState(50);
  const [generatedArticles, setGeneratedArticles] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStats, setGenerationStats] = useState(null);

  const categories = [
    { key: 'muscleBuilding', name: 'Muscle Building', color: 'bg-blue-100 text-blue-800' },
    { key: 'weightLoss', name: 'Weight Loss', color: 'bg-red-100 text-red-800' },
    { key: 'nutrition', name: 'Nutrition', color: 'bg-green-100 text-green-800' },
    { key: 'strengthTraining', name: 'Strength Training', color: 'bg-purple-100 text-purple-800' },
    { key: 'cardio', name: 'Cardio', color: 'bg-orange-100 text-orange-800' },
    { key: 'recovery', name: 'Recovery', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const handleCategoryToggle = (categoryKey) => {
    setSelectedCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(c => c !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const articles = generateBulkArticles(selectedCategories, articlesPerCategory);
    setGeneratedArticles(articles);
    
    // Calculate stats
    const stats = {
      totalArticles: articles.length,
      categories: selectedCategories.length,
      estimatedTraffic: articles.length * 150, // Rough estimate
      timeToComplete: Math.ceil(articles.length / 10) // Days to publish
    };
    setGenerationStats(stats);
    
    setIsGenerating(false);
  };

  const generateMassiveScale = async () => {
    setIsGenerating(true);
    
    // Simulate longer generation time for massive scale
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const articles = generateThousandsOfArticles();
    setGeneratedArticles(articles);
    
    const stats = {
      totalArticles: articles.length,
      categories: 6,
      estimatedTraffic: articles.length * 150,
      timeToComplete: Math.ceil(articles.length / 20)
    };
    setGenerationStats(stats);
    
    setIsGenerating(false);
  };

  const exportArticles = () => {
    const dataStr = JSON.stringify(generatedArticles, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `fitness-articles-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <>
      <Helmet>
        <title>Content Generator | 6Pack.co.nz Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Content Generator
            </h1>
            <p className="text-gray-600">
              Generate thousands of SEO-optimized fitness articles for maximum search visibility
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Select Content Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(category => (
                    <button
                      key={category.key}
                      onClick={() => handleCategoryToggle(category.key)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedCategories.includes(category.key)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`inline-block px-2 py-1 rounded text-sm font-medium mb-2 ${category.color}`}>
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {fitnessTopics[category.key]?.length || 0} topics
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generation Settings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Generation Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Articles per Category
                    </label>
                    <input
                      type="number"
                      value={articlesPerCategory}
                      onChange={(e) => setArticlesPerCategory(parseInt(e.target.value))}
                      min="1"
                      max="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Total articles: {selectedCategories.length * articlesPerCategory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Generate Content
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={generateContent}
                    disabled={isGenerating || selectedCategories.length === 0}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5 mr-2" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Custom Content'}
                  </button>
                  
                  <button
                    onClick={generateMassiveScale}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Target className="w-5 h-5 mr-2" />
                    )}
                    Generate 1000+ Articles (All Categories)
                  </button>
                </div>
              </div>
            </div>

            {/* Stats & Results Panel */}
            <div className="space-y-6">
              {/* Generation Stats */}
              {generationStats && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Generation Results
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Articles</span>
                      <span className="font-semibold text-primary-600">
                        {generationStats.totalArticles.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Categories</span>
                      <span className="font-semibold">{generationStats.categories}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Est. Monthly Traffic</span>
                      <span className="font-semibold text-green-600">
                        {generationStats.estimatedTraffic.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Publishing Timeline</span>
                      <span className="font-semibold">{generationStats.timeToComplete} days</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Benefits */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  SEO Benefits
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Massive keyword coverage</li>
                  <li>• Long-tail SEO opportunities</li>
                  <li>• Enhanced topical authority</li>
                  <li>• Increased organic traffic</li>
                  <li>• Better search rankings</li>
                  <li>• Content pillar strategy</li>
                </ul>
              </div>

              {/* Export Section */}
              {generatedArticles.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Export Content
                  </h3>
                  <button
                    onClick={exportArticles}
                    className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Ready to import into your CMS or database
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Generated Articles Preview */}
          {generatedArticles.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Articles Preview
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Read Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {generatedArticles.slice(0, 10).map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {article.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {article.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.readTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {generatedArticles.length > 10 && (
                  <div className="text-center py-4 text-gray-500">
                    ... and {generatedArticles.length - 10} more articles
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}