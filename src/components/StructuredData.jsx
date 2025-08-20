export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.6pack.co.nz/#organization",
  name: "6Pack NZ",
  alternateName: ["6Pack", "6Pack New Zealand", "6Pack Fitness NZ"],
  description: "New Zealand's leading fitness platform offering free calculators, expert workout plans, and science-backed nutrition guides for fitness transformation.",
  url: "https://www.6pack.co.nz",
  logo: {
    "@type": "ImageObject",
    url: "https://www.6pack.co.nz/og-image.jpg",
    width: 1200,
    height: 630,
    contentUrl: "https://www.6pack.co.nz/og-image.jpg",
  },
  image: {
    "@type": "ImageObject",
    url: "https://www.6pack.co.nz/og-image.jpg",
    width: 1200,
    height: 630,
  },
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "6Pack NZ Team"
    }
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NZ",
    addressRegion: "Auckland"
  },
  areaServed: [
    {
      "@type": "Country",
      name: "New Zealand"
    },
    {
      "@type": "Place",
      name: "Auckland"
    },
    {
      "@type": "Place",
      name: "Wellington"
    },
    {
      "@type": "Place",
      name: "Christchurch"
    },
    {
      "@type": "Place",
      name: "Hamilton"
    },
    {
      "@type": "Place",
      name: "Tauranga"
    },
    {
      "@type": "Place",
      name: "Dunedin"
    }
  ],
  serviceType: [
    "Fitness Coaching",
    "Nutrition Guidance",
    "Workout Planning",
    "Health Assessment Tools",
    "Fitness Education",
    "Body Composition Analysis",
    "Exercise Programming",
    "Health Calculators"
  ],
  knowsAbout: [
    "BMI Calculator",
    "BMR Calculator",
    "Macro Calculator",
    "Body Fat Calculator",
    "1RM Calculator",
    "Ideal Weight Calculator",
    "Fitness Training",
    "Nutrition Planning",
    "Workout Programs",
    "Weight Loss Strategies",
    "Muscle Building",
    "Strength Training",
    "Personal Training",
    "Exercise Science",
    "Sports Nutrition",
    "Fitness Equipment",
    "Gym Training",
    "Home Workouts",
    "Cardio Training",
    "Resistance Training"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fitness Services & Tools",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Fitness Calculators",
          description: "BMI, BMR, Body Fat, Macro, 1RM, and Ideal Weight calculators",
          provider: {
            "@id": "https://www.6pack.co.nz/#organization"
          }
        },
        price: "0",
        priceCurrency: "NZD"
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Expert Workout Plans",
          description: "Science-backed training programs for all fitness levels",
          provider: {
            "@id": "https://www.6pack.co.nz/#organization"
          }
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nutrition Guides",
          description: "Evidence-based nutrition strategies and meal planning",
          provider: {
            "@id": "https://www.6pack.co.nz/#organization"
          }
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gym Finder",
          description: "Find gyms and fitness centers across New Zealand",
          provider: {
            "@id": "https://www.6pack.co.nz/#organization"
          }
        }
      }
    ]
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@6pack.co.nz",
      availableLanguage: ["English"],
      areaServed: "NZ"
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "support@6pack.co.nz",
      availableLanguage: ["English"],
      areaServed: "NZ"
    }
  ],
  sameAs: [
    "https://twitter.com/6pack_nz",
    "https://facebook.com/6pack.co.nz",
    "https://instagram.com/6pack_nz",
    "https://www.youtube.com/@6pack_nz",
    "https://www.linkedin.com/company/6pack-nz"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2547",
    bestRating: "5",
    worstRating: "1"
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Sarah M."
      },
      reviewBody: "Amazing platform! The BMI calculator and workout plans have been game-changers for my fitness journey. Highly recommend to any Kiwi looking to get fit!"
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Mike K."
      },
      reviewBody: "Love the macro calculator - so accurate and easy to use. The articles are really informative too. Best fitness resource in NZ!"
    }
  ]
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.6pack.co.nz/#website",
  name: "6Pack NZ",
  alternateName: "6Pack New Zealand Fitness Hub",
  url: "https://www.6pack.co.nz",
  description: "New Zealand's premier fitness platform with free calculators, expert workout plans, and nutrition guides",
  inLanguage: "en-NZ",
  publisher: {
    "@id": "https://www.6pack.co.nz/#organization"
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.6pack.co.nz/articles?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ],
  mainEntity: [
    {
      "@type": "SoftwareApplication",
      name: "BMI Calculator",
      url: "https://www.6pack.co.nz/calculators/bmi",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NZD"
      }
    },
    {
      "@type": "SoftwareApplication",
      name: "BMR Calculator",
      url: "https://www.6pack.co.nz/calculators/bmr",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NZD"
      }
    },
    {
      "@type": "SoftwareApplication",
      name: "Macro Calculator",
      url: "https://www.6pack.co.nz/calculators/macro",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NZD"
      }
    }
  ]
};

// FAQ Schema
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What fitness calculators does 6Pack NZ offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "6Pack NZ offers free BMI Calculator, BMR Calculator, Macro Calculator, Body Fat Calculator, 1RM Calculator, and Ideal Weight Calculator - all scientifically accurate and designed for New Zealanders."
      }
    },
    {
      "@type": "Question",
      name: "Are the workout plans suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! 6Pack NZ provides workout plans for all fitness levels, from complete beginners to advanced athletes. Each plan includes detailed instructions and progression guidelines."
      }
    },
    {
      "@type": "Question",
      name: "Is 6Pack NZ content backed by science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All content is created by certified fitness professionals and based on peer-reviewed research. We prioritize evidence-based fitness and nutrition strategies."
      }
    },
    {
      "@type": "Question",
      name: "Are the calculators free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all our fitness calculators are completely free to use with no hidden costs, registration, or subscription required. We believe fitness tools should be accessible to everyone."
      }
    },
    {
      "@type": "Question",
      name: "Can I use 6Pack NZ if I'm not in New Zealand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While our content is optimized for New Zealanders, our calculators and workout plans can be used by anyone worldwide. The tools work with both metric and imperial units."
      }
    }
  ]
};

// Breadcrumb Schema
export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});