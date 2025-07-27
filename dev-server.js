// Simple development server to run API functions locally
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS for all routes
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load environment variables from .env file
try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log('No .env file found, using environment variables');
}

// Dynamic import for API handlers
const nearbyHandlerModule = await import('./api/gyms/nearby.js');
const geocodeHandlerModule = await import('./api/geocode.js');

const nearbyHandler = nearbyHandlerModule.default;
const geocodeHandler = geocodeHandlerModule.default;

// Mock Vercel environment for local development
const createVercelHandler = (handler) => async (req, res) => {
  // Create Vercel-compatible response object
  const vercelRes = {
    setHeader: (name, value) => res.set(name, value),
    status: (code) => {
      res.status(code);
      return vercelRes;
    },
    json: (data) => res.json(data),
    end: () => res.end()
  };
  
  try {
    await handler(req, vercelRes);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

// API routes
app.get('/api/gyms/nearby', createVercelHandler(nearbyHandler));
app.get('/api/geocode', createVercelHandler(geocodeHandler));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Development API server running' });
});

// Proxy all other requests to Vite dev server
app.use('/', createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true,
  onError: (err, req, res) => {
    console.log('Proxy error:', err.message);
    res.status(500).send('Proxy error - make sure Vite dev server is running on port 5173');
  }
}));

app.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log('📍 API endpoints available:');
  console.log('  - GET /api/gyms/nearby?lat=X&lng=Y&radius=Z');
  console.log('  - GET /api/geocode?address=LOCATION');
  console.log('  - GET /api/health');
  console.log('🔄 All other requests proxied to Vite dev server');
  console.log('⚠️  Make sure to start Vite dev server: npm run dev');
});