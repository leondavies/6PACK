import { NextResponse } from 'next/server';

export async function GET(request) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10000';

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing required parameters: lat and lng' },
      { status: 400, headers }
    );
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Google Places API key not found');
    return NextResponse.json(
      { 
        error: 'Google Places API key not configured',
        status: 'API_KEY_MISSING'
      },
      { status: 500, headers }
    );
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
      return NextResponse.json({
        error: 'Google Places API access denied',
        status: data.status,
        message: data.error_message
      }, { status: 403, headers });
    }

    if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json({
        status: 'ZERO_RESULTS',
        results: []
      }, { status: 200, headers });
    }

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json({
        error: `Google Places API error: ${data.status}`,
        status: data.status,
        message: data.error_message
      }, { status: 500, headers });
    }

    // Transform the Google Places data to match our expected format
    const transformedResults = data.results.map(place => {
      // Get the first photo reference for the main image
      const firstPhoto = place.photos && place.photos.length > 0 ? place.photos[0] : null;
      const imageUrl = firstPhoto 
        ? `/api/gyms/photo?reference=${firstPhoto.photo_reference}&maxwidth=400`
        : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&fm=webp&q=85';

      // Create basic hours structure from opening_hours if available
      let hours = null;
      if (place.opening_hours && place.opening_hours.weekday_text) {
        hours = {};
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        place.opening_hours.weekday_text.forEach((dayText, index) => {
          // weekday_text starts with Monday, but our days array starts with Sunday
          const dayIndex = (index + 1) % 7;
          const dayKey = days[dayIndex];
          // Extract just the hours part after the day name
          hours[dayKey] = dayText.split(': ')[1] || dayText;
        });
      }

      return {
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
        hours: hours,
        phone: place.international_phone_number || place.formatted_phone_number || null,
        website: place.website || null,
        types: place.types || [],
        image: imageUrl, // Add the image URL that the frontend expects
        photos: place.photos ? place.photos.slice(0, 3).map(photo => ({
          reference: photo.photo_reference,
          width: photo.width,
          height: photo.height
        })) : [],
        businessStatus: place.business_status || 'OPERATIONAL'
      };
    }).filter(gym => 
      // Filter out permanently closed gyms
      gym.businessStatus !== 'CLOSED_PERMANENTLY'
    );

    return NextResponse.json({
      status: 'OK',
      results: transformedResults
    }, { headers });

  } catch (error) {
    console.error('Error in nearby gyms API:', error);
    return NextResponse.json({
      error: 'Failed to fetch nearby gyms',
      message: error.message
    }, { status: 500, headers });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}