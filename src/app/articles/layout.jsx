export const metadata = {
  title: "Expert Fitness Articles & Guides | Science-Backed Training Content | 6Pack NZ",
  description: "📚 Discover 29+ expert-written fitness articles covering muscle building, weight loss, nutrition, and training strategies. Science-backed content from New Zealand's top fitness professionals. Free access to premium workout guides and health tips.",
  keywords: [
    'fitness articles New Zealand',
    'workout guides NZ',
    'muscle building articles',
    'weight loss guides',
    'nutrition articles NZ',
    'exercise science',
    'fitness tips New Zealand',
    'strength training guides',
    'bodybuilding articles',
    'health and fitness blog NZ',
    'expert fitness advice',
    'New Zealand fitness content',
    'workout plans articles',
    'fitness motivation',
    'exercise techniques',
    'training strategies',
    'Kiwi fitness blog',
    'NZ health articles',
    'fitness research New Zealand',
    'expert workout advice'
  ],
  openGraph: {
    title: "Expert Fitness Articles & Guides | Science-Backed Content | 6Pack NZ",
    description: "📚 Discover 29+ expert-written fitness articles covering muscle building, weight loss, nutrition, and training. Science-backed content from New Zealand's fitness professionals.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "6Pack NZ Fitness Articles - Expert Training Guides and Workout Content for New Zealand",
      },
    ],
    url: "https://www.6pack.co.nz/articles",
    type: "website",
    siteName: "6Pack NZ",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@6pack_nz",
    creator: "@6pack_nz",
    title: "Expert Fitness Articles & Guides | 6Pack NZ",
    description: "📚 Discover 29+ expert-written fitness articles. Science-backed content from New Zealand's fitness professionals.",
    images: ["https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/articles/",
  },
}

export default function ArticlesLayout({ children }) {
  return children;
}