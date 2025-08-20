export const metadata = {
  title: "Free BMR Calculator | Basal Metabolic Rate Calculator New Zealand | 6Pack NZ",
  description: "Calculate your BMR (Basal Metabolic Rate) with our free, science-based calculator. Discover your daily calorie needs and optimize your nutrition for New Zealanders.",
  keywords: "BMR calculator, basal metabolic rate calculator, calorie calculator, metabolism calculator, daily calories, TDEE calculator New Zealand",
  openGraph: {
    title: "Free BMR Calculator | Basal Metabolic Rate Calculator New Zealand",
    description: "Calculate your BMR (Basal Metabolic Rate) with our free, science-based calculator. Discover your daily calorie needs and optimize your nutrition.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "BMR Calculator",
      },
    ],
    url: "https://www.6pack.co.nz/calculators/bmr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMR Calculator | Basal Metabolic Rate Calculator New Zealand",
    description: "Calculate your BMR (Basal Metabolic Rate) with our free, science-based calculator. Discover your daily calorie needs.",
    images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/calculators/bmr",
  },
}

export default function BMRLayout({ children }) {
  return children;
}