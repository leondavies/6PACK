// Vercel serverless function to proxy Google Places API for nearby gyms
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 10000 } = req.query;

  // Validate required parameters
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Missing required parameters: lat, lng' 
    });
  }

  // Validate coordinates
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const searchRadius = parseInt(radius);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius)) {
    return res.status(400).json({ 
      error: 'Invalid coordinates or radius' 
    });
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({ 
      error: 'Coordinates out of range' 
    });
  }

  if (searchRadius < 100 || searchRadius > 50000) {
    return res.status(400).json({ 
      error: 'Radius must be between 100 and 50000 meters' 
    });
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!API_KEY) {
    console.error('Google Places API key not found in environment variables');
    return res.status(500).json({ 
      error: 'Google Places API key not configured',
      debug: 'Make sure GOOGLE_PLACES_API_KEY is set in Vercel environment variables'
    });
  }

  try {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = new URLSearchParams({
      location: `${latitude},${longitude}`,
      radius: searchRadius.toString(),
      type: 'gym',
      key: API_KEY
    });

    const response = await fetch(`${baseUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK') {
      if (data.status === 'ZERO_RESULTS') {
        return res.status(200).json({ 
          results: [],
          status: 'ZERO_RESULTS'
        });
      }
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // Transform and sanitize the response
    const transformedResults = data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address || '',
      coordinates: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      rating: place.rating || 0,
      priceLevel: place.price_level || 2,
      image: place.photos && place.photos[0] 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&fm=webp&q=85',
      isOpen: place.opening_hours?.open_now,
      types: place.types || [],
      placeId: place.place_id,
      userRatingsTotal: place.user_ratings_total || 0
    }));

    res.status(200).json({
      results: transformedResults,
      status: 'OK'
    });

  } catch (error) {
    console.error('Error fetching gyms from Google Places:', error);
    res.status(500).json({ 
      error: 'Failed to fetch gym data',
      message: error.message,
      debug: `Request failed for lat: ${latitude}, lng: ${longitude}, radius: ${searchRadius}`
    });
  }
}