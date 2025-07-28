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

  const { input } = req.query;

  if (!input || input.trim().length < 2) {
    return res.status(400).json({ 
      error: 'Input must be at least 2 characters long' 
    });
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    return res.status(500).json({ 
      error: 'Google Places API key not configured' 
    });
  }

  try {
    const searchParams = new URLSearchParams({
      input: input.trim(),
      types: 'address',
      components: 'country:nz', // Restrict to New Zealand
      key: GOOGLE_PLACES_API_KEY
    });

    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${searchParams}`;
    
    const response = await fetch(autocompleteUrl);
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Places Autocomplete API request denied:', data.error_message);
      return res.status(403).json({
        error: 'Google Places API access denied',
        status: data.status
      });
    }

    if (data.status === 'ZERO_RESULTS') {
      return res.status(200).json({
        status: 'ZERO_RESULTS',
        predictions: []
      });
    }

    if (data.status !== 'OK') {
      console.error('Google Places Autocomplete API error:', data.status);
      return res.status(500).json({
        error: `Google Places API error: ${data.status}`,
        status: data.status
      });
    }

    // Transform predictions to match our expected format
    const transformedPredictions = data.predictions.map(prediction => ({
      placeId: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting?.main_text || prediction.description,
      secondaryText: prediction.structured_formatting?.secondary_text || '',
      types: prediction.types
    }));

    return res.status(200).json({
      status: 'OK',
      predictions: transformedPredictions
    });

  } catch (error) {
    console.error('Error in autocomplete API:', error);
    return res.status(500).json({
      error: 'Failed to fetch autocomplete suggestions',
      message: error.message
    });
  }
}