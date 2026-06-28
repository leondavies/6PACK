/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for gym finder
  trailingSlash: true,
  images: {
    // Optimizer enabled (we deploy on Vercel, not a static CDN export).
    // Allowlist the remote hosts used for article/workout imagery so
    // components can migrate from <img> to next/image.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Note: API routes access environment variables via process.env directly
  // No need to expose them in the env config which could leak to client-side code
}

export default nextConfig