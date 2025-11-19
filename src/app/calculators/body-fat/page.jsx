'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Target, ArrowLeft, Info, TrendingUp, Activity, Users } from "lucide-react";
import BlurIn from "../../../components/blurText";
import ShareResults from "../../../components/ui/ShareResults";
import MedicalDisclaimer from "../../../components/MedicalDisclaimer";

function BodyFatCalculatorContent() {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [gender, setGender] = useState("male");
  const [fitnessLevel, setFitnessLevel] = useState("intermediate");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bodyFat, setBodyFat] = useState(null);
  const [category, setCategory] = useState("");
  const [leanMass, setLeanMass] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  const fitnessLevels = {
    beginner: { 
      label: "Beginner (New to fitness)", 
      description: "Just starting fitness journey or returning after long break" 
    },
    intermediate: { 
      label: "Intermediate (Regular exerciser)", 
      description: "Consistent training 3-6 months with basic fitness knowledge" 
    },
    advanced: { 
      label: "Advanced (Experienced athlete)", 
      description: "1+ years consistent training with strong fitness foundation" 
    }
  };

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedHeight = searchParams.get('height');
    const sharedNeck = searchParams.get('neck');
    const sharedWaist = searchParams.get('waist');
    const sharedHip = searchParams.get('hip');
    const sharedGender = searchParams.get('gender');
    const sharedFitnessLevel = searchParams.get('fitnessLevel');
    const sharedUnit = searchParams.get('unit');
    const sharedBodyFat = searchParams.get('bodyFat');
    const sharedCategory = searchParams.get('category');
    
    if (sharedHeight && sharedNeck && sharedWaist && sharedGender && sharedBodyFat) {
      setHeight(sharedHeight);
      setNeck(sharedNeck);
      setWaist(sharedWaist);
      if (sharedHip) setHip(sharedHip);
      setGender(sharedGender);
      setFitnessLevel(sharedFitnessLevel || 'intermediate');
      setUnit(sharedUnit || 'metric');
      setIsSharedResult(true);
      
      if (sharedBodyFat && sharedCategory) {
        setBodyFat(parseFloat(sharedBodyFat));
        setCategory(decodeURIComponent(sharedCategory));
        generateRecommendations(parseFloat(sharedBodyFat), sharedGender, sharedFitnessLevel || 'intermediate');
      }
    }
  }, [searchParams]);

  const validateInputs = () => {
    const heightNum = parseFloat(height);
    const neckNum = parseFloat(neck);
    const waistNum = parseFloat(waist);
    const hipNum = gender === "female" ? parseFloat(hip) : 0;

    if (!height || heightNum <= 0) {
      alert("Please enter a valid height");
      return false;
    }

    if (!neck || neckNum <= 0) {
      alert("Please enter a valid neck circumference");
      return false;
    }

    if (!waist || waistNum <= 0) {
      alert("Please enter a valid waist circumference");
      return false;
    }

    if (gender === "female" && (!hip || hipNum <= 0)) {
      alert("Please enter a valid hip circumference");
      return false;
    }

    return true;
  };

  const calculateBodyFat = () => {
    if (!validateInputs()) return;

    let heightCm = parseFloat(height);
    let neckCm = parseFloat(neck);
    let waistCm = parseFloat(waist);
    let hipCm = gender === "female" ? parseFloat(hip) : 0;

    // Convert imperial to metric if needed
    if (unit === "imperial") {
      heightCm = heightCm * 2.54; // inches to cm
      neckCm = neckCm * 2.54;
      waistCm = waistCm * 2.54;
      if (gender === "female") hipCm = hipCm * 2.54;
    }

    let bodyFatPercentage;

    // Navy Method calculation
    if (gender === "male") {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    const bodyFatRounded = Math.round(bodyFatPercentage * 10) / 10;
    setBodyFat(bodyFatRounded);

    const categoryResult = getBodyFatCategory(bodyFatRounded, gender);
    setCategory(categoryResult);

    generateRecommendations(bodyFatRounded, gender, fitnessLevel);
  };

  const getBodyFatCategory = (bodyFatPercentage, genderType) => {
    if (genderType === "male") {
      if (bodyFatPercentage < 6) return "Essential Fat (Potentially Dangerous)";
      if (bodyFatPercentage < 14) return "Athletic";
      if (bodyFatPercentage < 18) return "Fitness";
      if (bodyFatPercentage < 25) return "Average";
      return "Above Average";
    } else {
      if (bodyFatPercentage < 16) return "Athletic";
      if (bodyFatPercentage < 21) return "Fitness";
      if (bodyFatPercentage < 25) return "Average";
      if (bodyFatPercentage < 32) return "Above Average";
      return "Obese";
    }
  };

  const generateRecommendations = (bodyFatPercentage, genderType, fitnessLevelType) => {
    const recs = [];

    // Fitness level specific intro advice
    if (fitnessLevelType === "beginner") {
      recs.push("🌟 As a beginner, focus on building healthy habits first");
    } else if (fitnessLevelType === "intermediate") {
      recs.push("💪 Continue building on your fitness foundation");
    } else {
      recs.push("🏆 Optimize your advanced training for body composition");
    }

    if (genderType === "male") {
      if (bodyFatPercentage < 6) {
        recs.push("Extremely low body fat - may affect hormone production");
        recs.push("Consider increasing healthy fats in diet");
        recs.push("Monitor energy levels and recovery");
        if (fitnessLevelType === "beginner") {
          recs.push("Consult with a nutrition professional immediately");
        }
      } else if (bodyFatPercentage < 14) {
        recs.push("Excellent athletic body fat range");
        if (fitnessLevelType === "beginner") {
          recs.push("Focus on learning proper form before intensity");
          recs.push("Start with bodyweight exercises and light weights");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Continue structured strength training program");
          recs.push("Consider periodized training for muscle preservation");
        } else {
          recs.push("Optimize training periodization and recovery");
          recs.push("Consider advanced techniques like deload weeks");
        }
      } else if (bodyFatPercentage < 18) {
        recs.push("Good fitness level body fat percentage");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with 3x/week full-body workouts");
          recs.push("Add 20-30 minutes cardio 2-3x/week");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Increase cardio to 4-5x/week for fat loss");
          recs.push("Maintain strength training 3-4x/week");
        } else {
          recs.push("Implement advanced cardio techniques (HIIT, fasted cardio)");
          recs.push("Use precise macro tracking for body recomposition");
        }
      } else if (bodyFatPercentage < 25) {
        recs.push("Average body fat range for men");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with walking 30 minutes daily");
          recs.push("Learn basic compound movements with guidance");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Increase exercise to 4-5x/week consistently");
          recs.push("Combine cardio and strength training");
        } else {
          recs.push("Implement comprehensive periodized program");
          recs.push("Consider cutting phases with precise calorie tracking");
        }
      } else {
        recs.push("Consider reducing body fat for health benefits");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with 15-20 minute walks daily");
          recs.push("Focus on small, sustainable dietary changes");
          recs.push("Consider working with a trainer initially");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Create 300-500 calorie daily deficit");
          recs.push("Include both cardio and resistance training");
        } else {
          recs.push("Use advanced periodization and diet cycling");
          recs.push("Consider supervised extreme cutting protocols");
        }
      }
    } else {
      if (bodyFatPercentage < 16) {
        recs.push("Athletic body fat range for women");
        recs.push("Monitor menstrual health at very low body fat");
        recs.push("Ensure adequate nutrition for hormonal balance");
        if (fitnessLevelType === "beginner") {
          recs.push("Work with healthcare provider to ensure safety");
        }
      } else if (bodyFatPercentage < 21) {
        recs.push("Excellent fitness level body fat percentage");
        if (fitnessLevelType === "beginner") {
          recs.push("Learn proper form with bodyweight exercises");
          recs.push("Focus on consistency over intensity");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Continue balanced strength and cardio routine");
          recs.push("Consider sport-specific training");
        } else {
          recs.push("Optimize periodization around menstrual cycle");
          recs.push("Use advanced recovery and nutrition protocols");
        }
      } else if (bodyFatPercentage < 25) {
        recs.push("Good average body fat range for women");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with 2-3 full-body workouts per week");
          recs.push("Add walking or light cardio on off days");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Increase resistance training to build lean mass");
          recs.push("Maintain consistent cardio routine");
        } else {
          recs.push("Implement advanced body recomposition protocols");
          recs.push("Consider strength-focused periodization");
        }
      } else if (bodyFatPercentage < 32) {
        recs.push("Above average - consider lifestyle modifications");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with 20-30 minute walks daily");
          recs.push("Focus on whole foods and portion awareness");
        } else if (fitnessLevelType === "intermediate") {
          recs.push("Increase activity to 5-6x/week gradually");
          recs.push("Combine strength training with cardio");
        } else {
          recs.push("Use periodized fat loss with preservation phases");
          recs.push("Track macros and training load precisely");
        }
      } else {
        recs.push("Consider consulting healthcare provider");
        if (fitnessLevelType === "beginner") {
          recs.push("Start with gentle, low-impact activities");
          recs.push("Focus on building sustainable habits");
          recs.push("Consider working with qualified professionals");
        } else {
          recs.push("Implement structured progressive program");
          recs.push("Use data-driven approach to track progress");
        }
      }
    }

    // Fitness level specific measurement advice
    if (fitnessLevelType === "beginner") {
      recs.push("Re-measure every 6-8 weeks as changes take time");
      recs.push("Focus on how you feel and energy levels, not just numbers");
    } else if (fitnessLevelType === "intermediate") {
      recs.push("Re-measure every 4-6 weeks to track progress");
      recs.push("Compare with progress photos and measurements");
    } else {
      recs.push("Re-measure every 2-4 weeks during focused phases");
      recs.push("Use body fat % alongside performance metrics");
    }

    recs.push("Body fat percentage is more important than weight alone");
    setRecommendations(recs);
  };

  const getShareUrl = () => {
    if (!bodyFat) return '';
    
    const params = new URLSearchParams({
      height,
      neck,
      waist,
      gender,
      fitnessLevel,
      unit,
      bodyFat: bodyFat.toString(),
      category: encodeURIComponent(category)
    });
    
    if (gender === "female" && hip) {
      params.set('hip', hip);
    }
    
    return `${window.location.origin}/calculators/body-fat?${params.toString()}`;
  };

  const resetCalculator = () => {
    setHeight("");
    setNeck("");
    setWaist("");
    setHip("");
    setGender("male");
    setFitnessLevel("intermediate");
    setUnit("metric");
    setBodyFat(null);
    setCategory("");
    setLeanMass(null);
    setRecommendations([]);
    setIsSharedResult(false);
    
    // Clear URL parameters
    window.history.replaceState({}, '', '/calculators/body-fat');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&h=900&fit=crop&fm=webp&q=85"
            alt="Body Fat Calculator"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/calculators"
            className="inline-flex items-center text-purple-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Calculators
          </Link>
          
          <BlurIn
            className="text-5xl md:text-6xl font-bold mb-6"
            word="Body Fat Calculator"
          />
          <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
            Calculate your body fat percentage using the proven Navy method
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Target className="mr-2" size={16} />
              Navy method
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Users className="mr-2" size={16} />
              Gender-specific formulas
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Activity className="mr-2" size={16} />
              Body composition tracking
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Body Fat</h2>
            
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
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-purple-600 text-white"
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
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    gender === "female"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Fitness Level Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Level
              </label>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(fitnessLevels).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {fitnessLevels[fitnessLevel]?.description}
              </p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                step="0.1"
              />
            </div>

            {/* Neck Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neck Circumference ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 37" : "e.g., 14.5"}
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Measure just below the Adam's apple</p>
            </div>

            {/* Waist Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waist Circumference ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 84" : "e.g., 33"}
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {gender === "male" ? "Measure at navel level" : "Measure at narrowest point"}
              </p>
            </div>

            {/* Hip Input (Female only) */}
            {gender === "female" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hip Circumference ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={unit === "metric" ? "e.g., 95" : "e.g., 37"}
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">Measure at widest point</p>
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={calculateBodyFat}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Calculate Body Fat
            </button>

            {bodyFat && (
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
            {bodyFat && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-purple-900">Body Fat Percentage</h4>
                          <p className="text-sm text-purple-700">{category}</p>
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{bodyFat}%</div>
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
                        <Info className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share Results */}
                <ShareResults
                  title="Body Fat Calculator Results"
                  description={`Body Fat: ${bodyFat}% (${category})`}
                  url={getShareUrl()}
                />
              </>
            )}

            {/* Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Body Fat</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  This calculator uses the <strong>U.S. Navy method</strong>, which estimates body fat percentage based on circumference measurements.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Measurement Tips:</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Neck:</strong> Just below the Adam's apple</li>
                    <li><strong>Waist (Men):</strong> At navel level</li>
                    <li><strong>Waist (Women):</strong> At narrowest point</li>
                    <li><strong>Hips (Women):</strong> At widest point</li>
                    <li><strong>Tips:</strong> Measure in the morning, use a flexible tape measure</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Body Fat Ranges:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium">Men:</h5>
                      <ul className="space-y-1">
                        <li>Athletic: 6-13%</li>
                        <li>Fitness: 14-17%</li>
                        <li>Average: 18-24%</li>
                        <li>Above Average: 25%+</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium">Women:</h5>
                      <ul className="space-y-1">
                        <li>Athletic: 16-20%</li>
                        <li>Fitness: 21-24%</li>
                        <li>Average: 25-31%</li>
                        <li>Above Average: 32%+</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8">
            <MedicalDisclaimer calculatorType="Body Fat calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BodyFatCalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BodyFatCalculatorContent />
    </Suspense>
  );
}