'use client';

import Link from "next/link";
import { Dumbbell, Target, Activity } from "lucide-react";
import OneRepMaxCalculator from "../../../components/calculators/OneRepMaxCalculator";
import CalculatorHero from "../../../components/calculators/CalculatorHero";
import { calculatorLandingPages } from "../../../data/calculatorLandingPages";

const oneRepMaxVariants = calculatorLandingPages['one-rep-max'] || [];

export default function OneRepMaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculatorHero
        eyebrow="Free calculator"
        title="1RM Calculator"
        subtitle="Calculate your one-rep max and plan your strength training zones."
        badges={[
          { icon: Dumbbell, label: "Multiple formulas" },
          { icon: Target, label: "Training zones included" },
          { icon: Activity, label: "Exercise-specific tips" },
        ]}
      />

      <OneRepMaxCalculator />

      {/* Specialized calculators (programmatic landing pages) */}
      {oneRepMaxVariants.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specialized calculators</h2>
          <ul className="space-y-2">
            {oneRepMaxVariants.map((variant) => (
              <li key={variant.slug}>
                <Link
                  href={`/calculators/one-rep-max/${variant.slug}/`}
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
