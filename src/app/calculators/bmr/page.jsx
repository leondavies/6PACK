'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, ArrowLeft, Info, Target, TrendingUp, Activity } from "lucide-react";
import BlurIn from "../../../components/blurText";
import ShareResults from "../../../components/ui/ShareResults";

function BMRCalculatorContent() {
  const searchParams = useSearchParams();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderateIntermediate");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedAge = searchParams.get('age');
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedGender = searchParams.get('gender');
    const sharedActivity = searchParams.get('activity');
    const sharedUnit = searchParams.get('unit');
    const sharedBMR = searchParams.get('bmr');
    const sharedTDEE = searchParams.get('tdee');
    
    if (sharedAge && sharedHeight && sharedWeight && sharedGender && sharedBMR) {
      setAge(sharedAge);
      setHeight(sharedHeight);
      setWeight(sharedWeight);
      setGender(sharedGender);
      setActivityLevel(sharedActivity || 'moderateIntermediate');
      setUnit(sharedUnit || 'metric');
      setIsSharedResult(true);
      
      if (sharedBMR && sharedTDEE) {
        setBMR(parseInt(sharedBMR));
        setTDEE(parseInt(sharedTDEE));
        generateRecommendations(parseInt(sharedTDEE), sharedGender);
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

  const calculateBMR = () => {
    if (!validateInputs()) return;

    const ageNum = parseInt(age);
    let heightCm = parseFloat(height);
    let weightKg = parseFloat(weight);

    // Convert imperial to metric if needed
    if (unit === "imperial") {
      heightCm = heightCm * 2.54; // inches to cm
      weightKg = weightKg * 0.453592; // pounds to kg
    }

    // Mifflin-St Jeor Equation (most accurate)
    let bmrCalc;
    if (gender === "male") {
      bmrCalc = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
    } else {
      bmrCalc = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
    }

    const bmrRounded = Math.round(bmrCalc);
    const tdeeCalc = Math.round(bmrCalc * activityLevels[activityLevel].multiplier);

    setBMR(bmrRounded);
    setTDEE(tdeeCalc);
    generateRecommendations(tdeeCalc, gender);
  };

  const generateRecommendations = (tdeeValue, genderValue) => {
    const recs = [
      `Your BMR represents calories burned at complete rest`,
      `Your TDEE (${tdeeValue} calories) includes your activity level`,
      `For weight loss: aim for ${Math.round(tdeeValue * 0.8)}-${Math.round(tdeeValue * 0.9)} calories daily`,
      `For weight gain: aim for ${Math.round(tdeeValue * 1.1)}-${Math.round(tdeeValue * 1.2)} calories daily`,
      `For maintenance: stick close to your TDEE of ${tdeeValue} calories`
    ];

    if (genderValue === "female") {
      recs.push("Women's calorie needs may fluctuate with menstrual cycle");
    }

    recs.push("Recalculate every 10-15 pounds of weight change");
    setRecommendations(recs);
  };

  const getShareUrl = () => {
    if (!bmr || !tdee) return '';
    
    const params = new URLSearchParams({
      age,
      height,
      weight,
      gender,
      activity: activityLevel,
      unit,
      bmr: bmr.toString(),
      tdee: tdee.toString()
    });
    
    return `${window.location.origin}/calculators/bmr?${params.toString()}`;
  };

  const resetCalculator = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("male");
    setActivityLevel("moderateIntermediate");
    setUnit("metric");
    setBMR(null);
    setTDEE(null);
    setRecommendations([]);
    setIsSharedResult(false);
    
    // Clear URL parameters
    window.history.replaceState({}, '', '/calculators/bmr');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&h=900&fit=crop&fm=webp&q=85"
            alt="BMR Calculator"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/calculators"
            className="inline-flex items-center text-red-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Calculators
          </Link>
          
          <BlurIn
            className="text-5xl md:text-6xl font-bold mb-6"
            word="BMR Calculator"
          />
          <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
            Calculate your Basal Metabolic Rate and daily calorie needs with scientific precision
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Heart className="mr-2" size={16} />
              Mifflin-St Jeor equation
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Target className="mr-2" size={16} />
              Personalised recommendations
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Activity className="mr-2" size={16} />
              Activity level included
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your BMR</h2>
            
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
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Imperial
                </button>
              </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your age"
                min="18"
                max="100"
              />
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
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    gender === "female"
                      ? "bg-red-600 text-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                step="0.1"
              />
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                step="0.1"
              />
            </div>

            {/* Activity Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              onClick={calculateBMR}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Calculate BMR & TDEE
            </button>

            {bmr && (
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
            {bmr && tdee && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-red-900">BMR (Basal Metabolic Rate)</h4>
                          <p className="text-sm text-red-700">Calories burned at rest</p>
                        </div>
                        <div className="text-2xl font-bold text-red-600">{bmr}</div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-green-900">TDEE (Total Daily Energy Expenditure)</h4>
                          <p className="text-sm text-green-700">Including activity level</p>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{tdee}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personalised Recommendations</h3>
                  <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share Results */}
                <ShareResults
                  title="BMR Calculator Results"
                  description={`BMR: ${bmr} calories, TDEE: ${tdee} calories`}
                  url={getShareUrl()}
                />
              </>
            )}

            {/* Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding BMR</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>BMR (Basal Metabolic Rate)</strong> is the number of calories your body burns at complete rest to maintain basic physiological functions.
                </p>
                <p>
                  <strong>TDEE (Total Daily Energy Expenditure)</strong> includes your BMR plus calories burned through activity and exercise.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Activity Level Guide:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Sedentary:</strong> Desk job, minimal movement
                    </div>
                    <div>
                      <strong>Light Activity:</strong>
                      <ul className="ml-4 mt-1 space-y-0.5">
                        <li>• Beginner: Walking, light yoga 1-2x/week</li>
                        <li>• Intermediate: Consistent light exercise 2-3x/week</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Moderate Activity:</strong>
                      <ul className="ml-4 mt-1 space-y-0.5">
                        <li>• Beginner: Gym 2-3x/week, learning proper form</li>
                        <li>• Intermediate: Structured training 3-4x/week</li>
                        <li>• Advanced: Consistent training 4-5x/week</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Very Active:</strong>
                      <ul className="ml-4 mt-1 space-y-0.5">
                        <li>• Beginner: Daily exercise, building stamina</li>
                        <li>• Intermediate: Intense training 5-6x/week</li>
                        <li>• Advanced: High-intensity training 6-7x/week</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Extremely Active:</strong> Professional athlete or physical job + daily intense training
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BMRCalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BMRCalculatorContent />
    </Suspense>
  );
}