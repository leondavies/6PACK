import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, Search, Calculator, Dumbbell, MapPin, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | 6Pack NZ</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our fitness calculators, workout guides, and gym finder." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found | 6Pack NZ" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Explore our fitness calculators, workout guides, and gym finder." />
        <meta property="og:image" content="https://6pack.co.nz/og-image.jpg" />
        <meta property="og:url" content="https://6pack.co.nz/404" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found | 6Pack NZ" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Explore our fitness calculators, workout guides, and gym finder." />
        <meta name="twitter:image" content="https://6pack.co.nz/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-[200px] sm:text-[300px] font-bold text-gray-200 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Dumbbell className="w-24 h-24 sm:w-32 sm:h-32 text-primary-600 animate-pulse" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mt-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Looks like this page took a rest day! The page you're looking for doesn't exist, 
              but don't worry - we've got plenty of other ways to help you reach your fitness goals.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Popular Links */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Popular Sections
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Calculators */}
              <Link
                to="/calculators"
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Calculators</h4>
                <p className="text-sm text-gray-600">BMI, BMR, body fat, and more fitness calculators</p>
              </Link>

              {/* Workouts */}
              <Link
                to="/workouts"
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Workouts</h4>
                <p className="text-sm text-gray-600">Chest, legs, core, and full-body workout routines</p>
              </Link>

              {/* Gym Finder */}
              <Link
                to="/gym-finder"
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary-300"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Gym Finder</h4>
                <p className="text-sm text-gray-600">Find gyms and fitness centers near you</p>
              </Link>

              {/* Articles */}
              <Link
                to="/articles"
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary-300"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Articles</h4>
                <p className="text-sm text-gray-600">Expert fitness and nutrition guides</p>
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Looking for something specific? Try searching our site:
            </p>
            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search fitness topics..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      window.location.href = `/articles?search=${encodeURIComponent(e.target.value.trim())}`;
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}