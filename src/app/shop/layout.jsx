export const metadata = {
  title: "6Pack Store - Premium Fitness Supplements & Equipment | Coming Soon | 6Pack NZ",
  description: "The 6Pack NZ Store is coming soon! Premium fitness supplements, workout equipment, and health products for New Zealanders. Stay tuned for our grand opening with exclusive deals on top-quality fitness gear.",
  keywords: [
    'fitness supplements New Zealand',
    'workout equipment NZ',
    'fitness gear shop',
    'supplements store NZ',
    'fitness products New Zealand',
    'gym equipment NZ',
    'health supplements',
    'protein powder NZ',
    'fitness accessories',
    '6pack store New Zealand'
  ],
  robots: {
    index: false,
    follow: true,
    noarchive: true,
  },
  openGraph: {
    title: "6Pack Store - Premium Fitness Supplements & Equipment | Coming Soon",
    description: "The 6Pack NZ Store is coming soon! Premium fitness supplements, workout equipment, and health products for New Zealanders.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "6Pack NZ Store - Coming Soon - Premium Fitness Supplements and Equipment",
      },
    ],
    url: "https://www.6pack.co.nz/shop",
    type: "website",
    siteName: "6Pack NZ",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@6pack_nz",
    creator: "@6pack_nz",
    title: "6Pack Store - Coming Soon | 6Pack NZ",
    description: "Premium fitness supplements, workout equipment, and health products for New Zealanders. Coming soon!",
    images: ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/shop",
  },
};

export default function ShopLayout({ children }) {
  return children;
}
