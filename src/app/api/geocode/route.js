import { NextResponse } from 'next/server';

export async function GET(request) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const placeId = searchParams.get('placeId');

  if (!address && !placeId) {
    return NextResponse.json(
      { error: 'Either address or placeId parameter is required' },
      { status: 400, headers }
    );
  }

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500, headers }
    );
  }

  try {
    let geocodeUrl;
    
    if (placeId) {
      // Use Place Details API for more accurate results
      const geocodeParams = new URLSearchParams({
        place_id: placeId,
        fields: 'geometry,formatted_address,name',
        key: GOOGLE_PLACES_API_KEY
      });
      geocodeUrl = `https://maps.googleapis.com/maps/api/place/details/json?${geocodeParams}`;
    } else {
      // Use Geocoding API for address lookup
      const geocodeParams = new URLSearchParams({
        address: address,
        components: 'country:NZ', // Restrict to New Zealand
        key: GOOGLE_PLACES_API_KEY
      });
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?${geocodeParams}`;
    }
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Geocoding API request denied:', data.error_message);
      return NextResponse.json({
        error: 'Google API access denied',
        status: data.status
      }, { status: 403, headers });
    }

    if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json({
        error: 'No results found for the provided address',
        status: 'ZERO_RESULTS'
      }, { status: 404, headers });
    }

    if (data.status !== 'OK') {
      console.error('Google API error:', data.status);
      return NextResponse.json({
        error: `Google API error: ${data.status}`,
        status: data.status
      }, { status: 500, headers });
    }

    let result;
    
    if (placeId) {
      // Place Details API response format
      const place = data.result;
      result = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        formatted_address: place.formatted_address || place.name,
        place_id: placeId
      };
    } else {
      // Geocoding API response format
      const location = data.results[0];
      result = {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
        formatted_address: location.formatted_address,
        place_id: location.place_id
      };
    }

    return NextResponse.json(result, { headers });

  } catch (error) {
    console.error('Error in geocode API:', error);
    return NextResponse.json({
      error: 'Failed to geocode address',
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