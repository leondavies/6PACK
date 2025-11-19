export const metadata = {
  title: "Find Gyms Near You | New Zealand Gym Finder with Maps & Reviews | 6Pack NZ",
  description: "Find the best gyms and fitness centers across New Zealand. Search by location, view maps, compare amenities, read reviews, and discover your perfect gym. Powered by Google Places with real-time gym data for Auckland, Wellington, Christchurch, and all NZ cities.",
  keywords: [
    'gym finder New Zealand',
    'find gyms near me NZ',
    'New Zealand fitness centers',
    'gym locations NZ',
    'Auckland gyms',
    'Wellington gyms',
    'Christchurch gyms',
    'gym search New Zealand',
    'fitness center finder',
    'gyms with maps NZ',
    'gym reviews New Zealand',
    'best gyms NZ',
    'gym amenities',
    'fitness facility locator',
    'gym directory New Zealand',
    'Kiwi gym finder',
    'NZ gym map',
    'gym comparison NZ',
    'fitness center locations',
    'nearby gyms New Zealand'
  ],
  openGraph: {
    title: "Find Gyms Near You | New Zealand Gym Finder | 6Pack NZ",
    description: "Find the best gyms and fitness centers across New Zealand. Search by location, view maps, compare amenities, and discover your perfect gym. Real-time data powered by Google Places.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "6Pack NZ Gym Finder - Find the Best Gyms and Fitness Centers in New Zealand",
      },
    ],
    url: "https://www.6pack.co.nz/gym-finder",
    type: "website",
    siteName: "6Pack NZ",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@6pack_nz",
    creator: "@6pack_nz",
    title: "Find Gyms Near You | NZ Gym Finder | 6Pack NZ",
    description: "Find the best gyms across New Zealand. Search by location, view maps, compare amenities, and discover your perfect gym.",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/gym-finder",
  },
};

export default function GymFinderLayout({ children }) {
  return children;
}
