import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '6Pack NZ';
    const subtitle = searchParams.get('subtitle') || 'Free Fitness Calculators';
    const category = searchParams.get('category') || 'Calculator';

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '60px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '1000px',
              margin: '40px',
            }}
          >
            <div
              style={{
                background: '#22c55e',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '24px',
              }}
            >
              {category}
            </div>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '800',
                color: '#1f2937',
                margin: '0 0 16px 0',
                lineHeight: '1.1',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '36px',
                color: '#6b7280',
                margin: '0 0 32px 0',
                fontWeight: '500',
              }}
            >
              {subtitle}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '32px',
                color: '#22c55e',
                fontWeight: '700',
              }}
            >
              <span style={{ marginRight: '12px' }}>🇳🇿</span>
              6Pack.co.nz
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}