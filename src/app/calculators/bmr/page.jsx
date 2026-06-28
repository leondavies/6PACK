'use client';

import Link from "next/link";
import { Heart, Target, Activity } from "lucide-react";
import BmrCalculator from "../../../components/calculators/BmrCalculator";
import CalculatorHero from "../../../components/calculators/CalculatorHero";
import { calculatorLandingPages } from "../../../data/calculatorLandingPages";

const bmrVariants = calculatorLandingPages.bmr || [];

export default function BMRCalculator() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorHero
        eyebrow="Free calculator"
        title="BMR Calculator"
        subtitle="Calculate your Basal Metabolic Rate and daily calorie needs with scientific precision."
        badges={[
          { icon: Heart, label: "Mifflin-St Jeor equation" },
          { icon: Target, label: "Personalised recommendations" },
          { icon: Activity, label: "Activity level included" },
        ]}
      />

      <BmrCalculator />

      {/* Specialized calculators (programmatic landing pages) */}
      {bmrVariants.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specialized calculators</h2>
          <ul className="space-y-2">
            {bmrVariants.map((variant) => (
              <li key={variant.slug}>
                <Link
                  href={`/calculators/bmr/${variant.slug}/`}
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
