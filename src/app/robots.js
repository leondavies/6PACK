export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/brewery',      // Non-existent page
        '/subscription', // Non-existent page
        '/shop',         // Non-existent page (removed)
        '/search',       // Search not implemented
      ],
    },
    sitemap: 'https://www.6pack.co.nz/sitemap.xml',
    host: 'https://www.6pack.co.nz',
  };
}