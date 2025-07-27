// Vercel serverless function to proxy Google Geocoding API
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

  const { address } = req.query;

  // Validate required parameters
  if (!address || address.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Missing required parameter: address' 
    });
  }

  // Basic validation
  if (address.length > 200) {
    return res.status(400).json({ 
      error: 'Address too long' 
    });
  }

  const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;
  
  if (!API_KEY) {
    // Fallback to hardcoded NZ locations if no API key
    const locations = {
      'auckland': { lat: -36.8485, lng: 174.7633 },
      'wellington': { lat: -41.2865, lng: 174.7762 },
      'christchurch': { lat: -43.5351, lng: 172.6362 },
      'hamilton': { lat: -37.7871, lng: 175.2799 },
      'tauranga': { lat: -37.6878, lng: 176.1665 },
      'dunedin': { lat: -45.8788, lng: 170.5028 },
      'palmerston north': { lat: -40.3523, lng: 175.6082 },
      'napier': { lat: -39.4928, lng: 176.9120 },
      'nelson': { lat: -41.2706, lng: 173.2840 },
      'rotorua': { lat: -38.1368, lng: 176.2497 }
    };
    
    const searchKey = address.toLowerCase().trim();
    const matchedLocation = Object.keys(locations).find(key => 
      searchKey.includes(key) || key.includes(searchKey)
    );
    
    if (matchedLocation) {
      return res.status(200).json(locations[matchedLocation]);
    } else {
      return res.status(404).json({ 
        error: 'Location not found. Try searching for a major NZ city like Auckland, Wellington, or Christchurch.' 
      });
    }
  }

  try {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const params = new URLSearchParams({
      address: address.trim(),
      key: API_KEY,
      // Bias results to New Zealand
      components: 'country:NZ'
    });

    const response = await fetch(`${baseUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK' || data.results.length === 0) {
      return res.status(404).json({ 
        error: 'Location not found. Please try a different search term.' 
      });
    }

    const location = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;
    
    res.status(200).json({
      lat: location.lat,
      lng: location.lng,
      formatted_address: formattedAddress
    });

  } catch (error) {
    console.error('Error geocoding address:', error);
    res.status(500).json({ 
      error: 'Failed to geocode address',
      message: error.message 
    });
  }
}