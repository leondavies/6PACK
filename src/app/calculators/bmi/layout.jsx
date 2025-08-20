export const metadata = {
  title: "Free BMI Calculator | Body Mass Index Calculator New Zealand | 6Pack NZ",
  description: "Calculate your BMI (Body Mass Index) with our free, accurate calculator. Understand your weight status and health risks with personalized recommendations for New Zealanders.",
  keywords: "BMI calculator, body mass index calculator, weight status, health calculator, BMI chart, ideal weight New Zealand",
  openGraph: {
    title: "Free BMI Calculator | Body Mass Index Calculator New Zealand",
    description: "Calculate your BMI (Body Mass Index) with our free, accurate calculator. Understand your weight status and health risks with personalized recommendations.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "BMI Calculator",
      },
    ],
    url: "https://www.6pack.co.nz/calculators/bmi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMI Calculator | Body Mass Index Calculator New Zealand",
    description: "Calculate your BMI (Body Mass Index) with our free, accurate calculator. Understand your weight status and health risks.",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/calculators/bmi",
  },
}

export default function BMILayout({ children }) {
  return children;
}