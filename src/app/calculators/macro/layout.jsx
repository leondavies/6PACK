export const metadata = {
  title: "Free Macro Calculator | Macronutrient Calculator New Zealand | 6Pack NZ",
  description: "Calculate your daily macronutrient needs with our free macro calculator. Get personalized protein, carbs, and fat targets for your fitness goals in New Zealand.",
  keywords: "macro calculator, macronutrient calculator, protein calculator, carbs calculator, diet calculator, nutrition calculator New Zealand",
  openGraph: {
    title: "Free Macro Calculator | Macronutrient Calculator New Zealand",
    description: "Calculate your daily macronutrient needs with our free macro calculator. Get personalized protein, carbs, and fat targets for your fitness goals.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "Macro Calculator",
      },
    ],
    url: "https://www.6pack.co.nz/calculators/macro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Macro Calculator | Macronutrient Calculator New Zealand",
    description: "Calculate your daily macronutrient needs with our free macro calculator. Get personalized protein, carbs, and fat targets.",
    images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/calculators/macro",
  },
}

export default function MacroLayout({ children }) {
  return children;
}