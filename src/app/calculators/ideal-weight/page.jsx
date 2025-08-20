'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TrendingUp, ArrowLeft, Info, Target, Users, Activity } from "lucide-react";
import BlurIn from "../../../components/blurText";
import ShareResults from "../../../components/ui/ShareResults";

function IdealWeightCalculatorContent() {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters
  useEffect(() => {
    const sharedHeight = searchParams.get('height');
    const sharedAge = searchParams.get('age');
    const sharedGender = searchParams.get('gender');
    const sharedUnit = searchParams.get('unit');
    const sharedAverage = searchParams.get('average');
    
    if (sharedHeight && sharedAge && sharedGender && sharedAverage) {
      setHeight(sharedHeight);
      setAge(sharedAge);
      setGender(sharedGender);
      setUnit(sharedUnit || 'metric');
      setIsSharedResult(true);
      
      // Recalculate to show results
      calculateIdealWeight();
    }
  }, [searchParams]);

  const validateInputs = () => {
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!height || heightNum <= 0) {
      alert("Please enter a valid height");
      return false;
    }

    if (!age || ageNum < 18 || ageNum > 100) {
      alert("Please enter a valid age between 18 and 100");
      return false;
    }

    return true;
  };

  const calculateIdealWeight = () => {
    if (!validateInputs()) return;

    let heightCm = parseFloat(height);
    const ageNum = parseInt(age);

    // Convert imperial to metric if needed
    if (unit === "imperial") {
      heightCm = heightCm * 2.54; // inches to cm
    }

    const heightM = heightCm / 100; // Convert to meters

    // Calculate using different formulas
    const formulas = {};

    // Robinson Formula (1983)
    if (gender === "male") {
      formulas.robinson = 52 + (1.9 * ((heightCm - 152.4) / 2.54));
    } else {
      formulas.robinson = 49 + (1.7 * ((heightCm - 152.4) / 2.54));
    }

    // Miller Formula (1983)
    if (gender === "male") {
      formulas.miller = 56.2 + (1.41 * ((heightCm - 152.4) / 2.54));
    } else {
      formulas.miller = 53.1 + (1.36 * ((heightCm - 152.4) / 2.54));
    }

    // Devine Formula (1974)
    if (gender === "male") {
      formulas.devine = 50 + (2.3 * ((heightCm - 152.4) / 2.54));
    } else {
      formulas.devine = 45.5 + (2.3 * ((heightCm - 152.4) / 2.54));
    }

    // Hamwi Formula (1964)
    if (gender === "male") {
      formulas.hamwi = 48 + (2.7 * ((heightCm - 152.4) / 2.54));
    } else {
      formulas.hamwi = 45.5 + (2.2 * ((heightCm - 152.4) / 2.54));
    }

    // BMI-based healthy weight range (BMI 18.5-24.9)
    const minHealthyWeight = 18.5 * (heightM * heightM);
    const maxHealthyWeight = 24.9 * (heightM * heightM);

    // Calculate average and range
    const formulaWeights = Object.values(formulas);
    const average = formulaWeights.reduce((sum, weight) => sum + weight, 0) / formulaWeights.length;
    const minFormula = Math.min(...formulaWeights);
    const maxFormula = Math.max(...formulaWeights);

    // Convert to display unit if needed
    const conversionFactor = unit === "imperial" ? 2.20462 : 1;
    const displayUnit = unit === "imperial" ? "lbs" : "kg";

    const calculatedResults = {
      average: Math.round(average * conversionFactor * 10) / 10,
      range: {
        min: Math.round(minFormula * conversionFactor * 10) / 10,
        max: Math.round(maxFormula * conversionFactor * 10) / 10
      },
      healthyRange: {
        min: Math.round(minHealthyWeight * conversionFactor * 10) / 10,
        max: Math.round(maxHealthyWeight * conversionFactor * 10) / 10
      },
      formulas: {
        robinson: Math.round(formulas.robinson * conversionFactor * 10) / 10,
        miller: Math.round(formulas.miller * conversionFactor * 10) / 10,
        devine: Math.round(formulas.devine * conversionFactor * 10) / 10,
        hamwi: Math.round(formulas.hamwi * conversionFactor * 10) / 10
      },
      unit: displayUnit
    };

    setResults(calculatedResults);
    generateRecommendations(calculatedResults, ageNum, gender);
  };

  const generateRecommendations = (res, ageNum, genderType) => {
    const recs = [
      `Ideal weight varies based on body composition and muscle mass`,
      `These calculations provide a general guideline, not absolute targets`,
      `Focus on body composition rather than just scale weight`,
      `Consult healthcare providers for personalized advice`
    ];

    if (ageNum > 65) {
      recs.push("Older adults may benefit from slightly higher weight for bone health");
    }

    if (genderType === "female") {
      recs.push("Women's ideal weight may vary with menstrual cycle and hormones");
    }

    recs.push("Athletic individuals may weigh more due to muscle mass");
    recs.push("Consider body fat percentage alongside weight goals");
    recs.push("Aim for gradual weight changes (0.5-1kg per week)");

    setRecommendations(recs);
  };

  const getShareUrl = () => {
    if (!results) return '';
    
    const params = new URLSearchParams({
      height,
      age,
      gender,
      unit,
      average: results.average.toString()
    });
    
    return `${window.location.origin}/calculators/ideal-weight?${params.toString()}`;
  };

  const resetCalculator = () => {
    setHeight("");
    setAge("");
    setGender("male");
    setUnit("metric");
    setResults(null);
    setRecommendations([]);
    setIsSharedResult(false);
    
    window.history.replaceState({}, '', '/calculators/ideal-weight');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=900&fit=crop&fm=webp&q=85"
            alt="Ideal Weight Calculator"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/calculators"
            className="inline-flex items-center text-indigo-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Calculators
          </Link>
          
          <BlurIn
            className="text-5xl md:text-6xl font-bold mb-6"
            word="Ideal Weight Calculator"
          />
          <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
            Find your ideal weight range using multiple scientific formulas
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <TrendingUp className="mr-2" size={16} />
              Multiple formulas
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Target className="mr-2" size={16} />
              Scientific approach
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Users className="mr-2" size={16} />
              Gender-specific
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Ideal Weight</h2>
            
            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement System
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "metric"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender("male")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    gender === "male"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    gender === "female"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                step="0.1"
              />
            </div>

            {/* Age Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 30"
                min="18"
                max="100"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateIdealWeight}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Calculate Ideal Weight
            </button>

            {results && (
              <button
                onClick={resetCalculator}
                className="w-full mt-3 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Reset Calculator
              </button>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Ideal Weight Range</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="text-center">
                        <h4 className="font-semibold text-indigo-900 mb-2">Average Ideal Weight</h4>
                        <div className="text-3xl font-bold text-indigo-600">{results.average} {results.unit}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-green-900 text-sm mb-2">Formula Range</h4>
                        <div className="text-lg font-bold text-green-600">
                          {results.range.min} - {results.range.max}
                        </div>
                        <div className="text-xs text-green-700">{results.unit}</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-blue-900 text-sm mb-2">Healthy BMI Range</h4>
                        <div className="text-lg font-bold text-blue-600">
                          {results.healthyRange.min} - {results.healthyRange.max}
                        </div>
                        <div className="text-xs text-blue-700">{results.unit}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formula Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Formula Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Robinson Formula</span>
                      <span className="font-semibold">{results.formulas.robinson} {results.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Miller Formula</span>
                      <span className="font-semibold">{results.formulas.miller} {results.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Devine Formula</span>
                      <span className="font-semibold">{results.formulas.devine} {results.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Hamwi Formula</span>
                      <span className="font-semibold">{results.formulas.hamwi} {results.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Important Considerations</h3>
                  <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="text-indigo-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share Results */}
                <ShareResults
                  title="Ideal Weight Calculator Results"
                  description={`Ideal weight: ${results.average} ${results.unit} (Range: ${results.range.min}-${results.range.max} ${results.unit})`}
                  url={getShareUrl()}
                />
              </>
            )}

            {/* Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Ideal Weight</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Ideal weight calculations provide estimates based on height and gender, but individual factors vary significantly.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Formulas Used:</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Robinson (1983):</strong> Most commonly used</li>
                    <li><strong>Miller (1983):</strong> Similar to Robinson</li>
                    <li><strong>Devine (1974):</strong> Originally for drug dosing</li>
                    <li><strong>Hamwi (1964):</strong> Quick estimation method</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Important Factors:</h4>
                  <ul className="text-sm space-y-1">
                    <li>Body composition (muscle vs fat)</li>
                    <li>Bone density and frame size</li>
                    <li>Athletic training level</li>
                    <li>Age and metabolic health</li>
                    <li>Individual genetics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IdealWeightCalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IdealWeightCalculatorContent />
    </Suspense>
  );
}