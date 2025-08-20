// Google Places API service for finding gyms
// Uses proxy endpoints to avoid CORS issues

// Helper function to get photo URL from Google Places photo reference
export function getPhotoUrl(photoReference, maxWidth = 400) {
  if (!photoReference) {
    // Fallback to a default gym image
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&fm=webp&q=85';
  }
  
  // Use our proxy endpoint to avoid CORS issues
  return `/api/gyms/photo?reference=${photoReference}&maxwidth=${maxWidth}`;
}

// Search for gyms near a location using Google Places API via proxy
export async function searchGymsNearby(lat, lng, radius = 10000) {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString()
  });

  try {
    const response = await fetch(`/api/gyms/nearby?${params}`);
    
    // Check if we're in development and getting HTML/text instead of JSON
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      console.log('Development: API proxy not available, using mock data');
      return getMockGymsNearby(lat, lng);
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'ZERO_RESULTS') {
      return [];
    }
    
    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // Data is already transformed by the proxy, just add distance calculations
    return data.results.map(gym => ({
      ...gym,
      distance: calculateDistance(lat, lng, gym.coordinates.lat, gym.coordinates.lng)
    }));
  } catch (error) {
    console.error('Error fetching gyms from Google Places:', error);
    console.error('API Error Details:', error.message);
    
    // Only fallback to mock data in development
    if (import.meta.env.DEV) {
      console.log('Development mode: Using mock data due to API error');
      return getMockGymsNearby(lat, lng);
    }
    
    // In production, throw the error so we can debug
    throw new Error(`Failed to fetch gyms: ${error.message}`);
  }
}



// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

// Mock function for development when API key is not available
export function getMockGymsNearby(lat, lng) {
  // Return mock data that looks like Google Places API response
  return Promise.resolve([
    {
      id: 'mock_1',
      name: 'CityFitness Mock Gym',
      address: 'Near your location',
      coordinates: { lat: lat + 0.01, lng: lng + 0.01 },
      rating: 4.2,
      priceLevel: 2,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&fm=webp&q=85',
      hours: {
        mon: '6:00 AM - 10:00 PM',
        tue: '6:00 AM - 10:00 PM', 
        wed: '6:00 AM - 10:00 PM',
        thu: '6:00 AM - 10:00 PM',
        fri: '6:00 AM - 10:00 PM',
        sat: '7:00 AM - 8:00 PM',
        sun: '7:00 AM - 8:00 PM'
      },
      phone: '+64 9 123 4567',
      website: 'https://cityfitness.co.nz',
      isOpen: true,
      types: ['gym', 'health'],
      distance: calculateDistance(lat, lng, lat + 0.01, lng + 0.01)
    },
    {
      id: 'mock_2', 
      name: 'Anytime Fitness Mock',
      address: 'Another location nearby',
      coordinates: { lat: lat - 0.01, lng: lng - 0.01 },
      rating: 4.5,
      priceLevel: 3,
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&fm=webp&q=85',
      hours: {
        mon: '24 hours',
        tue: '24 hours',
        wed: '24 hours', 
        thu: '24 hours',
        fri: '24 hours',
        sat: '24 hours',
        sun: '24 hours'
      },
      phone: '+64 9 987 6543',
      website: 'https://anytimefitness.co.nz',
      isOpen: true,
      types: ['gym', 'health'],
      distance: calculateDistance(lat, lng, lat - 0.01, lng - 0.01)
    }
  ]);
}

// Geocoding function to convert address to coordinates via proxy
export async function geocodeAddress(address) {
  const params = new URLSearchParams({
    address: address.trim()
  });

  try {
    const response = await fetch(`/api/geocode?${params}`);
    
    // Check if we're in development and getting HTML/text instead of JSON
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      console.log('Development: Geocoding API proxy not available, using fallback');
      throw new Error('API not available in development');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Geocoding error: ${response.status}`);
    }

    const data = await response.json();
    return {
      lat: data.lat,
      lng: data.lng,
      formatted_address: data.formatted_address
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    
    // Fallback to mock locations for common NZ cities
    const locations = {
      'auckland': { lat: -36.8485, lng: 174.7633 },
      'wellington': { lat: -41.2865, lng: 174.7762 },
      'christchurch': { lat: -43.5351, lng: 172.6362 },
      'hamilton': { lat: -37.7871, lng: 175.2799 },
      'tauranga': { lat: -37.6878, lng: 176.1665 },
      'dunedin': { lat: -45.8788, lng: 170.5028 }
    };
    
    const searchKey = address.toLowerCase();
    const matchedLocation = Object.keys(locations).find(key => 
      searchKey.includes(key) || key.includes(searchKey)
    );
    
    if (matchedLocation) {
      return locations[matchedLocation];
    } else {
      throw new Error('Location not found. Try searching for Auckland, Wellington, Christchurch, Hamilton, Tauranga, or Dunedin.');
    }
  }
}

// Get autocomplete suggestions for addresses
export async function getAutocompleteSuggestions(input) {
  if (!input || input.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    input: input.trim()
  });

  try {
    const response = await fetch(`/api/autocomplete?${params}`);
    
    // Check if we're in development and getting HTML/text instead of JSON
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      console.log('Development: Autocomplete API proxy not available');
      return [];
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Autocomplete error: ${response.status}`);
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    // Return empty array on error - autocomplete is not critical
    return [];
  }
}