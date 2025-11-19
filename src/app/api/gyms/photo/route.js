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
  const reference = searchParams.get('reference');
  const maxwidth = searchParams.get('maxwidth') || '400';

  if (!reference) {
    return NextResponse.json(
      { error: 'Photo reference is required' },
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
    const photoParams = new URLSearchParams({
      photo_reference: reference,
      maxwidth: maxwidth.toString(),
      key: GOOGLE_PLACES_API_KEY
    });

    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?${photoParams}`;
    
    // Redirect to the Google Photos URL
    // This way the browser loads the image directly from Google
    return NextResponse.redirect(photoUrl, 302);

  } catch (error) {
    console.error('Error in photo proxy API:', error);
    return NextResponse.json({
      error: 'Failed to fetch photo',
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