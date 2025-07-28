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

  const { address, placeId } = req.query;

  if (!address && !placeId) {
    return res.status(400).json({ 
      error: 'Either address or placeId parameter is required' 
    });
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    return res.status(500).json({ 
      error: 'Google Places API key not configured' 
    });
  }

  try {
    let geocodeUrl;
    
    if (placeId) {
      // Use Place Details API for more accurate results
      const searchParams = new URLSearchParams({
        place_id: placeId,
        fields: 'geometry,formatted_address,name',
        key: GOOGLE_PLACES_API_KEY
      });
      geocodeUrl = `https://maps.googleapis.com/maps/api/place/details/json?${searchParams}`;
    } else {
      // Use Geocoding API for address lookup
      const searchParams = new URLSearchParams({
        address: address,
        components: 'country:NZ', // Restrict to New Zealand
        key: GOOGLE_PLACES_API_KEY
      });
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`;
    }
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Geocoding API request denied:', data.error_message);
      return res.status(403).json({
        error: 'Google API access denied',
        status: data.status
      });
    }

    if (data.status === 'ZERO_RESULTS') {
      return res.status(404).json({
        error: 'No results found for the provided address',
        status: 'ZERO_RESULTS'
      });
    }

    if (data.status !== 'OK') {
      console.error('Google API error:', data.status);
      return res.status(500).json({
        error: `Google API error: ${data.status}`,
        status: data.status
      });
    }

    let result;
    
    if (placeId) {
      // Place Details API response format
      const place = data.result;
      result = {
        coordinates: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        formattedAddress: place.formatted_address || place.name,
        placeId: placeId
      };
    } else {
      // Geocoding API response format
      const location = data.results[0];
      result = {
        coordinates: {
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng
        },
        formattedAddress: location.formatted_address,
        placeId: location.place_id
      };
    }

    return res.status(200).json({
      status: 'OK',
      result: result
    });

  } catch (error) {
    console.error('Error in geocode API:', error);
    return res.status(500).json({
      error: 'Failed to geocode address',
      message: error.message
    });
  }
}