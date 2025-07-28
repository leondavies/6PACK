export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng, radius = 10000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Missing required parameters: lat and lng' 
    });
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Google Places API key not found');
    return res.status(500).json({ 
      error: 'Google Places API key not configured',
      status: 'API_KEY_MISSING'
    });
  }

  try {
    // Search for gyms and fitness centers
    const searchParams = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: radius.toString(),
      type: 'gym',
      key: GOOGLE_PLACES_API_KEY
    });

    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${searchParams}`;
    
    const response = await fetch(placesUrl);
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Places API request denied:', data.error_message);
      return res.status(403).json({
        error: 'Google Places API access denied',
        status: data.status,
        message: data.error_message
      });
    }

    if (data.status === 'ZERO_RESULTS') {
      return res.status(200).json({
        status: 'ZERO_RESULTS',
        results: []
      });
    }

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return res.status(500).json({
        error: `Google Places API error: ${data.status}`,
        status: data.status,
        message: data.error_message
      });
    }

    // Transform the Google Places data to match our expected format
    const transformedResults = data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address || 'Address not available',
      coordinates: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      rating: place.rating || 0,
      totalRatings: place.user_ratings_total || 0,
      priceLevel: place.price_level || null,
      openNow: place.opening_hours?.open_now || null,
      types: place.types || [],
      photos: place.photos ? place.photos.slice(0, 3).map(photo => ({
        reference: photo.photo_reference,
        width: photo.width,
        height: photo.height
      })) : [],
      businessStatus: place.business_status || 'OPERATIONAL'
    })).filter(gym => 
      // Filter out permanently closed gyms
      gym.businessStatus !== 'CLOSED_PERMANENTLY'
    );

    return res.status(200).json({
      status: 'OK',
      results: transformedResults
    });

  } catch (error) {
    console.error('Error in nearby gyms API:', error);
    return res.status(500).json({
      error: 'Failed to fetch nearby gyms',
      message: error.message
    });
  }
}