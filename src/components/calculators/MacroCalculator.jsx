'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Info } from "lucide-react";
import ShareResults from "../ui/ShareResults";
import MedicalDisclaimer from "../MedicalDisclaimer";

// Interactive macro calculator widget, extracted from /calculators/macro/page.jsx
// for reuse by landing pages. Owns its own Suspense boundary (uses useSearchParams).
// `prefill` optionally overrides initial inputs ({ age, height, weight, gender,
// activityLevel, goal, unit }) — landing pages use it to preselect a goal.
function MacroCalculatorInner({ prefill = {} }) {
  const searchParams = useSearchParams();
  const [age, setAge] = useState(prefill.age ?? "");
  const [height, setHeight] = useState(prefill.height ?? "");
  const [weight, setWeight] = useState(prefill.weight ?? "");
  const [gender, setGender] = useState(prefill.gender ?? "male");
  const [activityLevel, setActivityLevel] = useState(prefill.activityLevel ?? "moderateIntermediate");
  const [goal, setGoal] = useState(prefill.goal ?? "maintain");
  const [unit, setUnit] = useState(prefill.unit ?? "metric");
  const [calories, setCalories] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [fat, setFat] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters
  useEffect(() => {
    const sharedAge = searchParams.get('age');
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedGender = searchParams.get('gender');
    const sharedActivity = searchParams.get('activity');
    const sharedGoal = searchParams.get('goal');
    const sharedUnit = searchParams.get('unit');
    const sharedCalories = searchParams.get('calories');

    if (sharedAge && sharedHeight && sharedWeight && sharedGender && sharedCalories) {
      setAge(sharedAge);
      setHeight(sharedHeight);
      setWeight(sharedWeight);
      setGender(sharedGender);
      setActivityLevel(sharedActivity || 'moderateIntermediate');
      setGoal(sharedGoal || 'maintain');
      setUnit(sharedUnit || 'metric');
      setIsSharedResult(true);

      if (sharedCalories) {
        const cal = parseInt(sharedCalories);
        setCalories(cal);
        calculateMacrosFromCalories(cal, sharedGoal || 'maintain');
      }
    }
  }, [searchParams]);

  const activityLevels = {
    sedentary: { label: "Sedentary (desk job, no exercise)", multiplier: 1.2 },
    lightBeginner: { label: "Light activity - Beginner (walking, light yoga 1-2 days/week)", multiplier: 1.3 },
    lightIntermediate: { label: "Light activity - Intermediate (consistent light exercise 2-3 days/week)", multiplier: 1.4 },
    moderateBeginner: { label: "Moderate activity - Beginner (gym 2-3 days/week, learning form)", multiplier: 1.5 },
    moderateIntermediate: { label: "Moderate activity - Intermediate (structured training 3-4 days/week)", multiplier: 1.6 },
    moderateAdvanced: { label: "Moderate activity - Advanced (consistent training 4-5 days/week)", multiplier: 1.65 },
    activeBeginner: { label: "Very active - Beginner (daily exercise, building stamina)", multiplier: 1.7 },
    activeIntermediate: { label: "Very active - Intermediate (intense training 5-6 days/week)", multiplier: 1.75 },
    activeAdvanced: { label: "Very active - Advanced (high-intensity training 6-7 days/week)", multiplier: 1.8 },
    extreme: { label: "Extremely active (athlete/physical job + daily intense training)", multiplier: 1.9 }
  };

  const goals = {
    lose: { label: "Weight Loss", modifier: 0.8 },
    maintain: { label: "Maintain Weight", modifier: 1.0 },
    gain: { label: "Weight Gain", modifier: 1.2 }
  };

  const validateInputs = () => {
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!age || ageNum < 18 || ageNum > 100) {
      alert("Please enter a valid age between 18 and 100");
      return false;
    }

    if (!height || heightNum <= 0) {
      alert("Please enter a valid height");
      return false;
    }

    if (!weight || weightNum <= 0) {
      alert("Please enter a valid weight");
      return false;
    }

    return true;
  };

  const calculateMacros = () => {
    if (!validateInputs()) return;

    const ageNum = parseInt(age);
    let heightCm = parseFloat(height);
    let weightKg = parseFloat(weight);

    // Convert imperial to metric if needed
    if (unit === "imperial") {
      heightCm = heightCm * 2.54;
      weightKg = weightKg * 0.453592;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr;
    if (gender === "male") {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityLevels[activityLevel].multiplier;

    // Adjust for goal
    const targetCalories = Math.round(tdee * goals[goal].modifier);

    setCalories(targetCalories);
    calculateMacrosFromCalories(targetCalories, goal);
  };

  const calculateMacrosFromCalories = (targetCalories, goalType) => {
    let proteinRatio, carbRatio, fatRatio;

    // Macro ratios based on goal
    switch (goalType) {
      case "lose":
        proteinRatio = 0.35; // Higher protein for muscle preservation
        fatRatio = 0.25;
        carbRatio = 0.40;
        break;
      case "gain":
        proteinRatio = 0.25; // Balanced for muscle building
        fatRatio = 0.25;
        carbRatio = 0.50;
        break;
      default: // maintain
        proteinRatio = 0.30;
        fatRatio = 0.25;
        carbRatio = 0.45;
    }

    // Calculate grams (4 cal/g protein, 4 cal/g carbs, 9 cal/g fat)
    const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    const carbGrams = Math.round((targetCalories * carbRatio) / 4);
    const fatGrams = Math.round((targetCalories * fatRatio) / 9);

    setProtein(proteinGrams);
    setCarbs(carbGrams);
    setFat(fatGrams);

    generateRecommendations(targetCalories, proteinGrams, carbGrams, fatGrams, goalType);
  };

  const generateRecommendations = (cal, prot, carb, f, goalType) => {
    const recs = [
      `Track your macros using a food diary or app`,
      `Spread protein intake across 3-4 meals (${Math.round(prot/3)}-${Math.round(prot/4)}g per meal)`,
      `Time carbs around workouts for optimal performance`,
      `Include healthy fats from nuts, avocado, and olive oil`
    ];

    if (goalType === "lose") {
      recs.push("Prioritize protein to preserve muscle during weight loss");
      recs.push("Consider intermittent fasting if it fits your lifestyle");
      recs.push("Fill up on high-volume, low-calorie vegetables");
    } else if (goalType === "gain") {
      recs.push("Eat in a surplus but avoid excessive dirty bulking");
      recs.push("Focus on nutrient-dense carbs like oats and rice");
      recs.push("Consider post-workout protein shakes for convenience");
    } else {
      recs.push("Focus on whole foods for 80% of your intake");
      recs.push("Allow flexibility for social eating and treats");
    }

    recs.push("Adjust macros based on training intensity and recovery");
    recs.push("Stay hydrated - aim for 35ml per kg bodyweight daily");

    setRecommendations(recs);
  };

  const getShareUrl = () => {
    if (!calories) return '';

    const params = new URLSearchParams({
      age,
      height,
      weight,
      gender,
      activity: activityLevel,
      goal,
      unit,
      calories: calories.toString()
    });

    return `${window.location.origin}/calculators/macro?${params.toString()}`;
  };

  const resetCalculator = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("male");
    setActivityLevel("moderateIntermediate");
    setGoal("maintain");
    setUnit("metric");
    setCalories(null);
    setProtein(null);
    setCarbs(null);
    setFat(null);
    setRecommendations([]);
    setIsSharedResult(false);

    window.history.replaceState({}, '', '/calculators/macro');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Macros</h2>

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
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  unit === "imperial"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {Object.entries(goals).map(([key, g]) => (
                <option key={key} value={key}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="25"
                min="18"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={unit === "metric" ? "175" : "69"}
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={unit === "metric" ? "70" : "154"}
                step="0.1"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {Object.entries(activityLevels).map(([key, level]) => (
                <option key={key} value={key}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateMacros}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Calculate Macros
          </button>

          {calories && (
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
          {calories && protein && carbs && fat && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Daily Targets</h3>

                <div className="space-y-4">
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary-900">Daily Calories</h4>
                        <p className="text-sm text-primary-700">For {goals[goal].label.toLowerCase()}</p>
                      </div>
                      <div className="text-2xl font-bold text-primary-600">{calories}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-blue-600">{protein}g</div>
                      <div className="text-sm text-blue-700">Protein</div>
                      <div className="text-xs text-blue-600">{Math.round((protein * 4 / calories) * 100)}%</div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-orange-600">{carbs}g</div>
                      <div className="text-sm text-orange-700">Carbs</div>
                      <div className="text-xs text-orange-600">{Math.round((carbs * 4 / calories) * 100)}%</div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-purple-600">{fat}g</div>
                      <div className="text-sm text-purple-700">Fat</div>
                      <div className="text-xs text-purple-600">{Math.round((fat * 9 / calories) * 100)}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Tips</h3>
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share Results */}
              <ShareResults
                title="Macro Calculator Results"
                description={`Daily targets: ${calories} calories, ${protein}g protein, ${carbs}g carbs, ${fat}g fat`}
                url={getShareUrl()}
              />
            </>
          )}

          {/* Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Macros</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Macronutrients</strong> are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Macro Functions:</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Protein (4 cal/g):</strong> Muscle building, repair, and satiety</li>
                  <li><strong>Carbohydrates (4 cal/g):</strong> Primary energy source for workouts</li>
                  <li><strong>Fats (9 cal/g):</strong> Hormone production and nutrient absorption</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Goal-Specific Ratios:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>Weight Loss:</strong> Higher protein (35%), moderate carbs (40%), moderate fat (25%)</li>
                  <li><strong>Maintenance:</strong> Balanced approach (30/45/25)</li>
                  <li><strong>Weight Gain:</strong> Higher carbs for energy (25/50/25)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8">
          <MedicalDisclaimer calculatorType="Macro calculator" />
        </div>
      </div>
    </div>
  );
}

export default function MacroCalculator({ prefill }) {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12">Loading calculator…</div>}>
      <MacroCalculatorInner prefill={prefill} />
    </Suspense>
  );
}
