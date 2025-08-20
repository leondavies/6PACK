'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, Search, Filter, Star, Clock, Phone, Globe, Navigation, Sliders } from 'lucide-react';
import { gyms, getUniqueCities, getUniqueChains, calculateDistance } from '../../data/gyms';
import { geocodeAddress, searchGymsNearby } from '../../services/googlePlaces';
import { GymFinderSEO } from '../../components/SEO';

export default function GymFinderPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [filteredGyms, setFilteredGyms] = useState(gyms);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [radius, setRadius] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedChain, setSelectedChain] = useState('All Chains');

  const cities = ['All Cities', ...getUniqueCities()];
  const chains = ['All Chains', ...getUniqueChains()];

  // Get user's current location
  const getCurrentLocation = async () => {
    setLoading(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        await applyLocationBasedFiltering(location);
      },
      (error) => {
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        setLocationError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Handle address search using geocoding
  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return;
    
    setLoading(true);
    setLocationError('');
    
    try {
      const location = await geocodeAddress(searchAddress);
      setUserLocation(location);
      await applyLocationBasedFiltering(location);
    } catch (error) {
      console.error('Error geocoding address:', error);
      setLocationError(error.message || 'Location not found. Please try another search term.');
    } finally {
      setLoading(false);
    }
  };

  // Apply location-based filtering - use Google Places API for real photos
  const applyLocationBasedFiltering = async (location) => {
    try {
      setLoading(true);
      // Use Google Places API to get nearby gyms with real photos
      const nearbyGyms = await searchGymsNearby(location.lat, location.lng, radius * 1000);
      
      if (nearbyGyms && nearbyGyms.length > 0) {
        // Use real Google Places gyms with actual photos
        setFilteredGyms(nearbyGyms);
      } else {
        // Fallback to static data if no Google Places results
        const gymsWithDistance = gyms.map(gym => ({
          ...gym,
          distance: calculateDistance(
            location.lat, 
            location.lng, 
            gym.coordinates.lat, 
            gym.coordinates.lng
          )
        }));
        setFilteredGyms(gymsWithDistance);
      }
    } catch (error) {
      console.error('Error fetching nearby gyms:', error);
      // Fallback to static data with distance calculation
      const gymsWithDistance = gyms.map(gym => ({
        ...gym,
        distance: calculateDistance(
          location.lat, 
          location.lng, 
          gym.coordinates.lat, 
          gym.coordinates.lng
        )
      }));
      setFilteredGyms(gymsWithDistance);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  useEffect(() => {
    let filtered = [...gyms];

    // Filter by city
    if (selectedCity !== 'All Cities') {
      filtered = filtered.filter(gym => gym.city === selectedCity);
    }

    // Filter by chain
    if (selectedChain !== 'All Chains') {
      filtered = filtered.filter(gym => gym.chain === selectedChain);
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(gym => {
        const rating = gym.rating || 0;
        return rating >= ratingFilter;
      });
    }

    // Apply distance filter if user location is available
    if (userLocation) {
      filtered = filtered.map(gym => ({
        ...gym,
        distance: calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          gym.coordinates.lat, 
          gym.coordinates.lng
        )
      })).filter(gym => gym.distance <= radius);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance':
        default:
          if (userLocation) {
            return a.distance - b.distance;
          }
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredGyms(filtered);
  }, [selectedCity, selectedChain, ratingFilter, radius, sortBy, userLocation]);

  const getPriceSymbol = (priceRange) => {
    // Handle both string format ('$', '$$') and numeric format (1, 2, 3, 4) from Google Places
    if (typeof priceRange === 'number') {
      const symbols = {
        1: '$',
        2: '$$', 
        3: '$$$',
        4: '$$$$'
      };
      return symbols[priceRange] || 'N/A';
    }
    
    const symbols = {
      '$': '$',
      '$$': '$$',
      '$$$': '$$$',
      '$$$$': '$$$$'
    };
    return symbols[priceRange] || priceRange || 'N/A';
  };

  const formatHours = (hours) => {
    if (!hours || typeof hours !== 'object') {
      return 'Hours not available';
    }
    
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayMappings = {
      0: ['sun', 'sunday'],
      1: ['mon', 'monday'], 
      2: ['tue', 'tuesday'],
      3: ['wed', 'wednesday'],
      4: ['thu', 'thursday'],
      5: ['fri', 'friday'],
      6: ['sat', 'saturday']
    };
    
    const possibleKeys = dayMappings[today];
    
    for (const key of possibleKeys) {
      if (hours[key]) {
        return hours[key];
      }
    }
    
    // Fallback: try to find any available hours
    const firstAvailableHours = Object.values(hours)[0];
    return firstAvailableHours || 'Hours vary';
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Gym Finder', url: '/gym-finder' }
  ];

  return (
    <>
      <GymFinderSEO breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Gyms Near You
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the best fitness centers in New Zealand. Use your location or search by address to find gyms that match your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Location Button */}
            <div className="flex gap-3">
              <button
                onClick={getCurrentLocation}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {loading ? 'Getting Location...' : 'Use My Location'}
              </button>
            </div>

            {/* Address Search */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <input
                  type="text"
                  placeholder="Enter city or address (e.g., Auckland, Wellington)"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddressSearch}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Error Message */}
          {locationError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{locationError}</p>
            </div>
          )}
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Chain Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gym Chain</label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {chains.map(chain => (
                    <option key={chain} value={chain}>{chain}</option>
                  ))}
                </select>
              </div>

              {/* Distance Range (only show if location available) */}
              {userLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Radius: {radius}km
                  </label>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">1km - 25km</div>
                </div>
              )}

              {/* Minimum Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="0">Any Rating</option>
                  <option value="3.0">3.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userLocation && filteredGyms.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredGyms.length} gyms found {userLocation ? `within ${radius}km` : ''}
            </h2>
            <p className="text-gray-600">
              {userLocation ? 'Showing results near your location' : 'Showing all available gyms'}
            </p>
          </div>
        )}

        {/* Gym Sponsorship Promotion Section */}
        <div className="bg-gradient-to-r from-primary-50 to-green-50 border border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Want Your Gym Featured First?
              </h3>
              <p className="text-gray-700 mb-4">
                Get your fitness center sponsored placement at the top of search results and reach more potential members across New Zealand.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:info@6pack.co.nz?subject=Gym Sponsorship Inquiry - 6Pack NZ&body=Hi,%0A%0AI'm interested in sponsored placement for my gym on 6pack.co.nz.%0A%0AGym Name:%0ALocation:%0AWebsite:%0A%0APlease send me more information about sponsorship opportunities.%0A%0AThanks!"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Sponsored Placement
                </a>
                <a
                  href="tel:+64212345678"
                  className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gym Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGyms.map(gym => (
            <div key={gym.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={gym.image}
                alt={gym.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {gym.name}
                  </h3>
                  {gym.rating > 0 && (
                    <div className="flex items-center ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{gym.rating}</span>
                    </div>
                  )}
                </div>

                {gym.chain && <p className="text-sm text-gray-600 mb-2">{gym.chain}</p>}
                <p className="text-sm text-gray-600 mb-2">{gym.address}</p>
                
                {gym.distance && (
                  <div className="flex items-center text-sm text-primary-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {gym.distance.toFixed(1)}km away
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Today: {formatHours(gym.hours)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Price:</span>
                    <span>{getPriceSymbol(gym.priceRange || gym.priceLevel)}</span>
                  </div>
                </div>

                {gym.amenities && gym.amenities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {gym.amenities.slice(0, 3).map(amenity => (
                        <span key={amenity} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {amenity}
                        </span>
                      ))}
                      {gym.amenities.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{gym.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* For Google Places gyms, show types instead */}
                {gym.types && gym.types.length > 0 && !gym.amenities && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Type:</h4>
                    <div className="flex flex-wrap gap-1">
                      {gym.types.slice(0, 3).map(type => (
                        <span key={type} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                          {type.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {gym.types.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{gym.types.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  {gym.phone && (
                    <a
                      href={`tel:${gym.phone}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  )}
                  {gym.website ? (
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(gym.name + ' ' + gym.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      <Search className="w-4 h-4 mr-1" />
                      More Info
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGyms.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No gyms found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search for a different location.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All Cities');
                setSelectedChain('All Chains');
                setRatingFilter(0);
                setRadius(25);
              }}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Initial State */}
        {!userLocation && !loading && filteredGyms.length === gyms.length && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find gyms near you</h3>
            <p className="text-gray-600 mb-4">
              Use your location or search by address to discover nearby fitness centers.
            </p>
          </div>
        )}
      </div>
      </div>
    </>
  );
}