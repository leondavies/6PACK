import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Filter, Search, Star, ShoppingCart, Heart } from "lucide-react";
import { products } from "../../data/products";
import { toast } from "sonner";
import useCart from "../../hooks/useCart";
import ImageWithFallback from "../../components/ui/ImageWithFallback";

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const { addToCart } = useCart();

  // Get unique supplement categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast.info("Removed from favorites");
    } else {
      newFavorites.add(productId);
      toast.success("Added to favorites");
    }
    setFavorites(newFavorites);
  };

  return (
    <>
      <Helmet>
        <title>Fitness Supplements & Equipment - 6Pack</title>
        <meta
          name="description"
          content="Shop premium fitness supplements and equipment. Protein powders, pre-workouts, gym equipment from trusted New Zealand brands."
        />
        <meta
          name="keywords"
          content="fitness supplements, protein powder, pre-workout, gym equipment, New Zealand fitness"
        />
        <meta property="og:title" content="Fitness Supplements & Equipment - 6Pack" />
        <meta property="og:description" content="Shop premium fitness supplements and equipment. Protein powders, pre-workouts, gym equipment from trusted New Zealand brands." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://www.6pack.co.nz/shop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fitness Supplements & Equipment - 6Pack" />
        <meta name="twitter:description" content="Shop premium fitness supplements and equipment from trusted New Zealand brands." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://www.6pack.co.nz/shop" />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Fitness Supplements & Equipment</h1>
            <p className="text-lg text-gray-600">
              Premium supplements and equipment to fuel your fitness journey
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search supplements or equipment..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Product Image */}
                <div className="relative bg-white p-4 h-48 flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {product.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Heart
                      size={16}
                      className={favorites.has(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">{product.category}</span>
                    {product.servings && (
                      <span className="text-sm text-gray-600">{product.servings} servings</span>
                    )}
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    {product.flavor && (
                      <span className="text-xs text-gray-500 ml-auto">{product.flavor}</span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                        product.inStock
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No products found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;