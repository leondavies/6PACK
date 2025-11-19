import Link from "next/link";
import { Calculator, Heart, Scale, Dumbbell, Apple, Target, TrendingUp, Activity, ArrowRight } from "lucide-react";
import BlurIn from "../../components/blurText";

export const metadata = {
  title: "Free Fitness Calculators | BMI, BMR, Body Fat & Macro Calculators | 6Pack NZ",
  description: "Use our free, science-backed fitness calculators. Calculate BMI, BMR, body fat percentage, macros, and more. Trusted by thousands of New Zealanders.",
  keywords: "fitness calculators, BMI calculator, BMR calculator, body fat calculator, macro calculator, 1RM calculator, ideal weight calculator",
  openGraph: {
    title: "Free Fitness Calculators | BMI, BMR, Body Fat & Macro Calculators",
    description: "Use our free, science-backed fitness calculators. Calculate BMI, BMR, body fat percentage, macros, and more.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&fm=webp&q=85",
        width: 1200,
        height: 630,
        alt: "Fitness Calculators",
      },
    ],
    url: "https://www.6pack.co.nz/calculators",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Fitness Calculators | BMI, BMR, Body Fat & Macro Calculators",
    description: "Use our free, science-backed fitness calculators. Calculate BMI, BMR, body fat percentage, macros, and more.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&fm=webp&q=85"],
  },
  alternates: {
    canonical: "https://www.6pack.co.nz/calculators",
  },
}

const calculators = [
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to understand if you're in a healthy weight range",
    icon: Scale,
    color: "bg-blue-500",
    benefits: "Track weight status and health risks"
  },
  {
    id: "bmr", 
    title: "BMR Calculator",
    description: "Determine your Basal Metabolic Rate - calories your body burns at rest",
    icon: Heart,
    color: "bg-red-500",
    benefits: "Plan your daily calorie needs"
  },
  {
    id: "body-fat",
    title: "Body Fat Calculator", 
    description: "Estimate your body fat percentage using body measurements",
    icon: Target,
    color: "bg-purple-500",
    benefits: "Monitor body composition changes"
  },
  {
    id: "one-rep-max",
    title: "1RM Calculator",
    description: "Calculate your one-rep max for any exercise to plan your training",
    icon: Dumbbell,
    color: "bg-orange-500", 
    benefits: "Optimise strength training programmes"
  },
  {
    id: "macro",
    title: "Macro Calculator",
    description: "Calculate your daily macronutrient needs for your fitness goals",
    icon: Apple,
    color: "bg-green-500",
    benefits: "Perfect your nutrition strategy"
  },
  {
    id: "ideal-weight",
    title: "Ideal Weight Calculator",
    description: "Find your ideal weight range based on scientific formulas",
    icon: TrendingUp,
    color: "bg-indigo-500",
    benefits: "Set realistic weight goals"
  }
];

export default function CalculatorsPage() {
  return (
    <>
      {/* Structured Data - ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "6Pack NZ Fitness Calculators",
            "description": "Free fitness calculators for health and wellness goals",
            "numberOfItems": 6,
            "itemListElement": calculators.map((calc, index) => ({
              "@type": "SoftwareApplication",
              "position": index + 1,
              "name": calc.title,
              "description": calc.description,
              "url": `https://www.6pack.co.nz/calculators/${calc.id}`,
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "NZD"
              }
            }))
          })
        }}
      />

      {/* Structured Data - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are the fitness calculators free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! All 6Pack NZ fitness calculators are completely free to use with no sign-up required. We offer BMI, BMR, body fat, macro, 1RM, and ideal weight calculators at no cost."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate are the fitness calculators?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our calculators use scientifically validated formulas and peer-reviewed research. While they provide accurate estimates, individual results may vary. For precise measurements, consult with a healthcare or fitness professional."
                }
              },
              {
                "@type": "Question",
                "name": "Which calculator should I use first?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start with the BMI calculator to understand your weight status, then use the BMR calculator to determine your calorie needs. For nutrition planning, the macro calculator is essential. Body fat calculator helps track composition changes."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to create an account to use the calculators?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No account is needed! All calculators are accessible instantly without any registration. Simply enter your information and get immediate results. You can also share your results via URL."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use these calculators on my mobile phone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! All 6Pack NZ calculators are fully mobile-responsive and work on smartphones, tablets, and desktop computers. They're optimized for ease of use on any device."
                }
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&fm=webp&q=85"
            alt="Fitness Calculators"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <BlurIn
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              word="Fitness Calculators"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the guesswork out of your fitness journey with our science-based calculators
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Calculator className="mr-2" size={16} />
                Free to use
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Activity className="mr-2" size={16} />
                Science-backed formulas
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Personalised results
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/calculators/${calc.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${calc.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {calc.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {calc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600 font-medium">
                    {calc.benefits}
                  </span>
                  <ArrowRight className="text-primary-600 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Calculators?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our calculators use scientifically proven formulas to give you accurate, personalised results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free & Easy</h3>
              <p className="text-gray-600">
                All calculators are completely free to use with no hidden costs or sign-ups required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Science-Based</h3>
              <p className="text-gray-600">
                Based on peer-reviewed research and validated formulas used by fitness professionals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalised</h3>
              <p className="text-gray-600">
                Get results tailored to your specific body composition, goals, and activity level.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose a calculator above to begin optimising your fitness journey today.
          </p>
          <Link
            href="/articles"
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Read Our Fitness Articles
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}