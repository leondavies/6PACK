import { NextResponse } from 'next/server';

export async function GET(request) {
  // Set CORS headers - restrict to own domain for security
  const allowedOrigins = [
    'https://www.6pack.co.nz',
    'https://6pack.co.nz',
    'http://localhost:3000',
  ];

  const origin = request.headers.get('origin');
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input || input.trim().length < 2) {
    return NextResponse.json(
      { error: 'Input must be at least 2 characters long' },
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
    const autocompleteParams = new URLSearchParams({
      input: input.trim(),
      types: 'address',
      components: 'country:nz', // Restrict to New Zealand
      key: GOOGLE_PLACES_API_KEY
    });

    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${autocompleteParams}`;
    
    const response = await fetch(autocompleteUrl);
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Places Autocomplete API request denied:', data.error_message);
      return NextResponse.json({
        error: 'Google Places API access denied',
        status: data.status
      }, { status: 403, headers });
    }

    if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json({
        suggestions: []
      }, { status: 200, headers });
    }

    if (data.status !== 'OK') {
      console.error('Google Places Autocomplete API error:', data.status);
      return NextResponse.json({
        error: `Google Places API error: ${data.status}`,
        status: data.status
      }, { status: 500, headers });
    }

    // Transform predictions to match our expected format
    const suggestions = data.predictions.map(prediction => ({
      placeId: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting?.main_text || prediction.description,
      secondaryText: prediction.structured_formatting?.secondary_text || '',
      types: prediction.types
    }));

    return NextResponse.json({
      suggestions: suggestions
    }, { headers });

  } catch (error) {
    console.error('Error in autocomplete API:', error);
    return NextResponse.json({
      error: 'Failed to fetch autocomplete suggestions',
      message: error.message
    }, { status: 500, headers });
  }
}

export async function OPTIONS(request) {
  const allowedOrigins = [
    'https://www.6pack.co.nz',
    'https://6pack.co.nz',
    'http://localhost:3000',
  ];

  const origin = request.headers.get('origin');
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}