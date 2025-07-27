import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Search, Filter, Star, Clock, Phone, Globe, Navigation, Sliders } from 'lucide-react';
import { searchGymsNearby, getMockGymsNearby, geocodeAddress, calculateDistance } from '../services/googlePlaces';

export default function GymFinder() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [radius, setRadius] = useState(10); // Default 10km radius
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // distance, rating, name
  const [priceFilter, setPriceFilter] = useState('all'); // all, low, medium, high
  const [ratingFilter, setRatingFilter] = useState(0); // minimum rating

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        findNearbyGyms(location.lat, location.lng);
        setLoading(false);
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
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Find gyms near coordinates using Google Places API
  const findNearbyGyms = async (lat, lng) => {
    try {
      setLoading(true);
      setLocationError('');
      
      // Convert radius from km to meters for Google Places API
      const radiusInMeters = radius * 1000;
      
      let nearbyGyms;
      try {
        // Try to use Google Places API first
        nearbyGyms = await searchGymsNearby(lat, lng, radiusInMeters);
      } catch (apiError) {
        console.warn('Google Places API unavailable, using mock data:', apiError);
        // Fallback to mock data if Google Places API is not configured
        nearbyGyms = await getMockGymsNearby(lat, lng, radius);
      }
      
      // Add distance to each gym
      const gymsWithDistance = nearbyGyms.map(gym => ({
        ...gym,
        distance: calculateDistance(lat, lng, gym.coordinates.lat, gym.coordinates.lng)
      }));
      
      setGyms(gymsWithDistance);
    } catch (error) {
      console.error('Error finding nearby gyms:', error);
      setLocationError('Unable to find gyms in this area. Please try another location.');
    } finally {
      setLoading(false);
    }
  };

  // Handle address search using geocoding
  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return;
    
    setLoading(true);
    setLocationError('');
    
    try {
      const location = await geocodeAddress(searchAddress);
      setUserLocation(location);
      await findNearbyGyms(location.lat, location.lng);
    } catch (error) {
      console.error('Error geocoding address:', error);
      setLocationError(error.message || 'Location not found. Please try another search term.');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting to gyms
  const getFilteredAndSortedGyms = () => {
    let filtered = [...gyms];
    
    // Apply distance filter
    filtered = filtered.filter(gym => gym.distance <= radius);
    
    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(gym => gym.rating >= ratingFilter);
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(gym => {
        if (priceFilter === 'low') return gym.priceLevel <= 1;
        if (priceFilter === 'medium') return gym.priceLevel === 2;
        if (priceFilter === 'high') return gym.priceLevel >= 3;
        return true;
      });
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
          return a.distance - b.distance;
      }
    });
    
    return filtered;
  };

  // Trigger new search when radius changes
  useEffect(() => {
    if (userLocation) {
      findNearbyGyms(userLocation.lat, userLocation.lng);
    }
  }, [radius]);

  const getPriceDisplay = (priceLevel) => {
    const prices = {
      0: 'Free',
      1: 'Inexpensive',
      2: 'Moderate', 
      3: 'Expensive',
      4: 'Very Expensive'
    };
    return prices[priceLevel] || 'Contact for pricing';
  };

  const getOpenStatus = (isOpen) => {
    if (isOpen === undefined) return 'Hours not available';
    return isOpen ? 'Open now' : 'Closed now';
  };

  return (
    <>
      <Helmet>
        <title>Gym Finder | Find Gyms Near You in New Zealand | 6Pack NZ</title>
        <meta 
          name="description" 
          content="Find gyms near you in New Zealand. Search by location, filter by amenities, and discover the best fitness centers in Auckland, Wellington, Christchurch and more."
        />
        <meta 
          name="keywords" 
          content="gym finder NZ, gyms near me New Zealand, fitness centers Auckland, Wellington gyms, Christchurch fitness, gym locations NZ"
        />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Gym Finder | Find Gyms Near You in New Zealand" />
        <meta property="og:description" content="Find gyms near you in New Zealand. Search by location and discover the best fitness centers." />
        <meta property="og:image" content="https://6pack.co.nz/og-image.jpg" />
        <meta property="og:url" content="https://6pack.co.nz/gym-finder" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gym Finder | Find Gyms Near You in New Zealand" />
        <meta name="twitter:description" content="Find gyms near you in New Zealand. Search by location and discover the best fitness centers." />
        <meta name="twitter:image" content="https://6pack.co.nz/og-image.jpg" />
        
        <link rel="canonical" href="https://6pack.co.nz/gym-finder" />
      </Helmet>

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
              {/* Location Buttons */}
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
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Distance Range */}
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

                {/* Price Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Level
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Inexpensive</option>
                    <option value="medium">Moderate</option>
                    <option value="high">Expensive</option>
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
          {userLocation && gyms.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {getFilteredAndSortedGyms().length} gyms found within {radius}km
              </h2>
              <p className="text-gray-600">
                Showing results near your location
              </p>
            </div>
          )}

          {/* Gym Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredAndSortedGyms().map(gym => (
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
                        <span className="text-sm text-gray-600 ml-1">{gym.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{gym.address}</p>
                  
                  {gym.distance && (
                    <div className="flex items-center text-sm text-primary-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {gym.distance}km away
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{getOpenStatus(gym.isOpen)}</span>
                    </div>
                    
                    {gym.priceLevel !== undefined && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Price:</span>
                        <span>{getPriceDisplay(gym.priceLevel)}</span>
                      </div>
                    )}
                  </div>

                  {gym.types && gym.types.length > 0 && (
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
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${gym.placeId || gym.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </a>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(gym.name + ' ' + gym.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      <Search className="w-4 h-4 mr-1" />
                      More Info
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {userLocation && gyms.length > 0 && getFilteredAndSortedGyms().length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No gyms found</h3>
              <p className="text-gray-600 mb-4">
                Try increasing your search radius or adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setRadius(25);
                  setRatingFilter(0);
                  setPriceFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear Filters & Expand Search
              </button>
            </div>
          )}

          {/* No gyms found in area */}
          {userLocation && gyms.length === 0 && !loading && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No gyms found in this area</h3>
              <p className="text-gray-600 mb-4">
                Try searching in a different location or increasing your search radius.
              </p>
              <button
                onClick={() => setRadius(25)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Expand Search to 25km
              </button>
            </div>
          )}

          {/* Initial State */}
          {!userLocation && !loading && (
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