import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { MapPin, ExternalLink, Calendar, Users, Star } from "lucide-react";
import { breweries, products } from "../../data/products";
import ImageWithFallback from "../../components/ui/ImageWithFallback";

const BreweryPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("");

  // Get unique regions
  const regions = [...new Set(breweries.map(brewery => brewery.location))];

  // Filter breweries by region
  const filteredBreweries = breweries.filter(brewery => 
    !selectedRegion || brewery.location === selectedRegion
  );

  // Get products for a brewery
  const getBreweryProducts = (breweryName) => {
    return products.filter(product => product.brewery === breweryName);
  };

  return (
    <>
      <Helmet>
        <title>New Zealand Breweries - 6Pack.co.nz</title>
        <meta
          name="description"
          content="Discover New Zealand's finest craft breweries. Learn about their history, signature beers, and unique brewing styles."
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              New Zealand Breweries
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the stories behind New Zealand's most innovative craft breweries. 
              From traditional methods to experimental techniques, discover what makes each brewery unique.
            </p>
          </div>

          {/* Region Filter */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filter by Region:</label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Breweries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredBreweries.map((brewery) => {
              const breweryProducts = getBreweryProducts(brewery.name);
              
              return (
                <div key={brewery.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Brewery Image */}
                  <div className="relative">
                    <ImageWithFallback
                      src={brewery.image}
                      alt={brewery.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-2xl font-bold mb-1">{brewery.name}</h2>
                      <div className="flex items-center text-sm">
                        <MapPin size={16} className="mr-1" />
                        {brewery.location}
                      </div>
                    </div>
                  </div>

                  {/* Brewery Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-1" />
                        <span className="text-sm">Founded {brewery.founded}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-1" />
                        <span className="text-sm">{breweryProducts.length} beers available</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {brewery.description}
                    </p>

                    {/* Featured Beers */}
                    {breweryProducts.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Available Beers</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {breweryProducts.slice(0, 4).map((product) => (
                            <div key={product.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-12 h-12 bg-white rounded mr-3 flex items-center justify-center p-1 overflow-hidden">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-600">{product.style}</p>
                                <div className="flex items-center mt-1">
                                  <Star className="text-yellow-400 fill-yellow-400" size={12} />
                                  <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                  <span className="text-xs font-semibold text-gray-900 ml-auto">
                                    ${product.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {breweryProducts.length > 4 && (
                          <p className="text-sm text-gray-500 mt-2">
                            +{breweryProducts.length - 4} more beers available
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <a
                        href={brewery.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Visit Website
                      </a>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View All Beers
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredBreweries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No breweries found in this region</p>
              <button
                onClick={() => setSelectedRegion("")}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Show all breweries
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want to Feature Your Brewery?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join our network of premium craft breweries and reach beer enthusiasts across New Zealand.
            </p>
            <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreweryPage;