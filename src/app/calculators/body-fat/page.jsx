'use client';

import Link from "next/link";
import { Target, Users, Activity } from "lucide-react";
import BodyFatCalculator from "../../../components/calculators/BodyFatCalculator";
import CalculatorHero from "../../../components/calculators/CalculatorHero";
import { calculatorLandingPages } from "../../../data/calculatorLandingPages";

const bodyFatVariants = calculatorLandingPages['body-fat'] || [];

export default function BodyFatCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorHero
        eyebrow="Free calculator"
        title="Body Fat Calculator"
        subtitle="Calculate your body fat percentage using the proven U.S. Navy method."
        badges={[
          { icon: Target, label: "Navy method" },
          { icon: Users, label: "Gender-specific formulas" },
          { icon: Activity, label: "Body composition tracking" },
        ]}
      />

      <BodyFatCalculator />

      {/* Specialized calculators (programmatic landing pages) */}
      {bodyFatVariants.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specialized calculators</h2>
          <ul className="space-y-2">
            {bodyFatVariants.map((variant) => (
              <li key={variant.slug}>
                <Link
                  href={`/calculators/body-fat/${variant.slug}/`}
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {variant.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
