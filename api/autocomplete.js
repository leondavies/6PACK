// Vercel serverless function to proxy Google Places Autocomplete API
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

  const { input } = req.query;

  // Validate required parameters
  if (!input || input.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Missing required parameter: input' 
    });
  }

  // Basic validation
  if (input.length < 2) {
    return res.status(400).json({ 
      error: 'Input must be at least 2 characters' 
    });
  }

  if (input.length > 100) {
    return res.status(400).json({ 
      error: 'Input too long' 
    });
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'Google Places API key not configured' 
    });
  }

  try {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    const params = new URLSearchParams({
      input: input.trim(),
      key: API_KEY,
      // Bias results to New Zealand
      components: 'country:nz',
      // Include all address types: addresses, businesses, and places
      types: 'geocode'
    });

    console.log(`Autocomplete request: ${input.substring(0, 20)}...`);
    
    const response = await fetch(`${baseUrl}?${params}`);
    
    console.log(`Autocomplete response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Autocomplete HTTP Error: ${response.status} - ${errorText}`);
      throw new Error(`Google Places Autocomplete API HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Autocomplete API status: ${data.status}`);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error(`Google Places Autocomplete API error: ${data.status} - ${data.error_message || 'No error message'}`);
      
      // Handle rate limiting gracefully
      if (data.status === 'OVER_QUERY_LIMIT') {
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          details: 'Too many requests. Please try again in a moment.'
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to get autocomplete suggestions',
        details: data.error_message || data.status
      });
    }

    // Transform and sanitize the response
    const suggestions = data.predictions ? data.predictions.map(prediction => ({
      id: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting?.main_text || prediction.description,
      secondaryText: prediction.structured_formatting?.secondary_text || '',
      types: prediction.types || []
    })) : [];

    res.status(200).json({
      suggestions,
      status: data.status
    });

  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch autocomplete suggestions',
      message: error.message 
    });
  }
}