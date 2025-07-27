// Debug endpoint to check environment variables and API connectivity
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    hasApiKey: !!API_KEY,
    apiKeyLength: API_KEY ? API_KEY.length : 0,
    apiKeyPreview: API_KEY ? `${API_KEY.substring(0, 8)}...` : 'Not set',
    environment: process.env.NODE_ENV || 'unknown',
    vercelEnv: process.env.VERCEL_ENV || 'unknown'
  };

  // Test a simple Google Places API call
  if (API_KEY) {
    try {
      const testUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-43.5309,172.6304&radius=1000&type=gym&key=${API_KEY}`;
      const response = await fetch(testUrl);
      const data = await response.json();
      
      debugInfo.apiTest = {
        status: response.status,
        responseStatus: data.status,
        resultsCount: data.results ? data.results.length : 0,
        errorMessage: data.error_message || null
      };
    } catch (error) {
      debugInfo.apiTest = {
        error: error.message
      };
    }
  }

  res.status(200).json(debugInfo);
}