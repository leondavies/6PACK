export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://www.6pack.co.nz/sitemap.xml',
    host: 'https://www.6pack.co.nz',
  };
}