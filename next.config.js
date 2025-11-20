/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for gym finder
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Note: API routes access environment variables via process.env directly
  // No need to expose them in the env config which could leak to client-side code
}

export default nextConfig