/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Note: API routes access environment variables via process.env directly
  // No need to expose them in the env config which could leak to client-side code
}

export default nextConfig