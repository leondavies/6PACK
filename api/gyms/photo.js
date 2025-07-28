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

  const { reference, maxwidth = 400 } = req.query;

  if (!reference) {
    return res.status(400).json({ 
      error: 'Photo reference is required' 
    });
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    return res.status(500).json({ 
      error: 'Google Places API key not configured' 
    });
  }

  try {
    const photoParams = new URLSearchParams({
      photo_reference: reference,
      maxwidth: maxwidth.toString(),
      key: GOOGLE_PLACES_API_KEY
    });

    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?${photoParams}`;
    
    // Redirect to the Google Photos URL
    // This way the browser loads the image directly from Google
    return res.redirect(302, photoUrl);

  } catch (error) {
    console.error('Error in photo proxy API:', error);
    return res.status(500).json({
      error: 'Failed to fetch photo',
      message: error.message
    });
  }
}