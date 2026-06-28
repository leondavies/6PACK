'use client';

import Link from "next/link";
import { Apple, Target, Activity } from "lucide-react";
import MacroCalculator from "../../../components/calculators/MacroCalculator";
import CalculatorHero from "../../../components/calculators/CalculatorHero";
import { calculatorLandingPages } from "../../../data/calculatorLandingPages";

const macroVariants = calculatorLandingPages.macro || [];

export default function MacroCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorHero
        eyebrow="Free calculator"
        title="Macro Calculator"
        subtitle="Calculate your daily macronutrient needs for optimal nutrition and results."
        badges={[
          { icon: Apple, label: "Goal-specific ratios" },
          { icon: Target, label: "Personalised targets" },
          { icon: Activity, label: "Activity level adjusted" },
        ]}
      />

      <MacroCalculator />

      {/* Specialized calculators (programmatic landing pages) */}
      {macroVariants.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specialized calculators</h2>
          <ul className="space-y-2">
            {macroVariants.map((variant) => (
              <li key={variant.slug}>
                <Link
                  href={`/calculators/macro/${variant.slug}/`}
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
