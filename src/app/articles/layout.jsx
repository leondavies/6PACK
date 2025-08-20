export const metadata = {
  title: "Fitness Articles & Guides | Expert Training & Nutrition Content",
  description: "Discover expert fitness articles, workout guides, and nutrition tips. Science-based content for muscle building, weight loss, and athletic performance.",
  keywords: "fitness articles, workout guides, nutrition tips, muscle building, weight loss, strength training",
  openGraph: {
    title: "Fitness Articles & Guides | Expert Training & Nutrition Content",
    description: "Discover expert fitness articles, workout guides, and nutrition tips. Science-based content for muscle building, weight loss, and athletic performance.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "Fitness Articles and Guides",
      },
    ],
    url: "https://www.6pack.co.nz/articles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Articles & Guides | Expert Training & Nutrition Content",
    description: "Discover expert fitness articles, workout guides, and nutrition tips.",
    images: ["https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/articles",
  },
}

export default function ArticlesLayout({ children }) {
  return children;
}