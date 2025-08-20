'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dumbbell, ArrowLeft, Info, Target, TrendingUp, Activity } from "lucide-react";
import BlurIn from "../../../components/blurText";
import ShareResults from "../../../components/ui/ShareResults";

function OneRepMaxCalculatorContent() {
  const searchParams = useSearchParams();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState("metric");
  const [exercise, setExercise] = useState("bench-press");
  const [experience, setExperience] = useState("intermediate");
  const [oneRepMax, setOneRepMax] = useState(null);
  const [trainingZones, setTrainingZones] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters
  useEffect(() => {
    const sharedWeight = searchParams.get('weight');
    const sharedReps = searchParams.get('reps');
    const sharedUnit = searchParams.get('unit');
    const sharedExercise = searchParams.get('exercise');
    const sharedExperience = searchParams.get('experience');
    const shared1RM = searchParams.get('oneRepMax');
    
    if (sharedWeight && sharedReps && shared1RM) {
      setWeight(sharedWeight);
      setReps(sharedReps);
      setUnit(sharedUnit || 'metric');
      setExercise(sharedExercise || 'bench-press');
      setExperience(sharedExperience || 'intermediate');
      setIsSharedResult(true);
      
      const orm = parseFloat(shared1RM);
      setOneRepMax(orm);
      calculateTrainingZones(orm);
      generateRecommendations(orm, sharedExercise || 'bench-press', sharedExperience || 'intermediate');
    }
  }, [searchParams]);

  const exercises = {
    "bench-press": "Bench Press",
    "squat": "Squat",
    "deadlift": "Deadlift",
    "overhead-press": "Overhead Press",
    "barbell-row": "Barbell Row",
    "other": "Other Exercise"
  };

  const experienceLevels = {
    beginner: { 
      label: "Beginner (0-6 months lifting)", 
      description: "Learning basic movements and form" 
    },
    intermediate: { 
      label: "Intermediate (6 months - 2 years)", 
      description: "Consistent training with proper form" 
    },
    advanced: { 
      label: "Advanced (2+ years)", 
      description: "Experienced lifter with strong technique" 
    }
  };

  const validateInputs = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (!weight || weightNum <= 0) {
      alert("Please enter a valid weight");
      return false;
    }

    if (!reps || repsNum < 1 || repsNum > 12) {
      alert("Please enter reps between 1 and 12");
      return false;
    }

    return true;
  };

  const calculateOneRepMax = () => {
    if (!validateInputs()) return;

    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    // If already 1 rep, that's the 1RM
    if (repsNum === 1) {
      setOneRepMax(weightNum);
      calculateTrainingZones(weightNum);
      generateRecommendations(weightNum, exercise, experience);
      return;
    }

    // Use Brzycki formula (most accurate for 2-10 reps)
    const brzycki = weightNum * (36 / (37 - repsNum));
    
    // Use Epley formula as backup
    const epley = weightNum * (1 + (repsNum / 30));
    
    // Average the two for better accuracy
    const avgOneRM = (brzycki + epley) / 2;
    const roundedORM = Math.round(avgOneRM * 10) / 10;

    setOneRepMax(roundedORM);
    calculateTrainingZones(roundedORM);
    generateRecommendations(roundedORM, exercise, experience);
  };

  const calculateTrainingZones = (orm) => {
    const zones = {
      strength: {
        percentage: "85-100%",
        weight: `${Math.round(orm * 0.85)}-${Math.round(orm)}`,
        reps: "1-5",
        purpose: "Maximum Strength"
      },
      power: {
        percentage: "80-90%",
        weight: `${Math.round(orm * 0.80)}-${Math.round(orm * 0.90)}`,
        reps: "1-5",
        purpose: "Power Development"
      },
      hypertrophy: {
        percentage: "65-85%",
        weight: `${Math.round(orm * 0.65)}-${Math.round(orm * 0.85)}`,
        reps: "6-12",
        purpose: "Muscle Growth"
      },
      endurance: {
        percentage: "50-65%",
        weight: `${Math.round(orm * 0.50)}-${Math.round(orm * 0.65)}`,
        reps: "12-20+",
        purpose: "Muscular Endurance"
      }
    };

    setTrainingZones(zones);
  };

  const generateRecommendations = (orm, exerciseType, experienceLevel) => {
    const recs = [];

    // Experience-specific general advice
    if (experienceLevel === "beginner") {
      recs.push("⚠️ As a beginner, focus on form over heavy weight");
      recs.push("Consider testing 3-5 rep max instead of true 1RM for safety");
      recs.push("Work with a qualified trainer when possible");
      recs.push("Progress gradually - increase weight by 1.25-2.5kg per week");
    } else if (experienceLevel === "intermediate") {
      recs.push("Always warm up thoroughly before attempting heavy lifts");
      recs.push("Use a spotter for safety when testing actual 1RM");
      recs.push("Progress gradually - increase weight by 2.5-5kg per week");
      recs.push("Test 1RM every 4-6 weeks to track progress");
    } else { // advanced
      recs.push("Always warm up thoroughly before attempting heavy lifts");
      recs.push("Consider using commands from a spotter for timing");
      recs.push("Progress gradually - increase weight by 2.5-7.5kg per week");
      recs.push("Test 1RM every 3-4 weeks for peak phases");
    }

    // Exercise-specific advice
    if (exerciseType === "bench-press") {
      recs.push("Keep shoulder blades retracted and core tight");
      recs.push("Control the descent and pause briefly at chest");
      if (experienceLevel === "beginner") {
        recs.push("Practice bench press with lighter weights first");
      }
    } else if (exerciseType === "squat") {
      recs.push("Maintain neutral spine throughout the movement");
      recs.push("Descend until hip crease is below knee cap");
      if (experienceLevel === "beginner") {
        recs.push("Master bodyweight squats before adding weight");
      }
    } else if (exerciseType === "deadlift") {
      recs.push("Keep the bar close to your body throughout");
      recs.push("Drive through heels and engage glutes at top");
      if (experienceLevel === "beginner") {
        recs.push("Start with Romanian deadlifts to learn hip hinge");
      }
    }

    // Experience-specific programming advice
    if (experienceLevel === "beginner") {
      recs.push("Focus on 8-12 rep range for muscle development");
      recs.push("Use 1RM estimate for program planning, not actual testing");
    } else {
      recs.push("Use training zones for periodized programming");
      recs.push("Consider deload weeks every 4-6 weeks");
    }

    setRecommendations(recs);
  };

  const getShareUrl = () => {
    if (!oneRepMax) return '';
    
    const params = new URLSearchParams({
      weight,
      reps,
      unit,
      exercise,
      experience,
      oneRepMax: oneRepMax.toString()
    });
    
    return `${window.location.origin}/calculators/one-rep-max?${params.toString()}`;
  };

  const resetCalculator = () => {
    setWeight("");
    setReps("");
    setUnit("metric");
    setExercise("bench-press");
    setExperience("intermediate");
    setOneRepMax(null);
    setTrainingZones(null);
    setRecommendations([]);
    setIsSharedResult(false);
    
    window.history.replaceState({}, '', '/calculators/one-rep-max');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&h=900&fit=crop&fm=webp&q=85"
            alt="1RM Calculator"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/calculators"
            className="inline-flex items-center text-orange-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Calculators
          </Link>
          
          <BlurIn
            className="text-5xl md:text-6xl font-bold mb-6"
            word="1RM Calculator"
          />
          <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
            Calculate your one-rep max and plan your strength training zones
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Dumbbell className="mr-2" size={16} />
              Multiple formulas
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Target className="mr-2" size={16} />
              Training zones included
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Activity className="mr-2" size={16} />
              Exercise-specific tips
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your 1RM</h2>
            
            {/* Unit Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Unit
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "metric"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Kg
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Lbs
                </button>
              </div>
            </div>

            {/* Exercise Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise
              </label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {Object.entries(exercises).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Training Experience */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {Object.entries(experienceLevels).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {experienceLevels[experience]?.description}
              </p>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Lifted ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={unit === "metric" ? "e.g., 100" : "e.g., 225"}
                step="0.5"
              />
            </div>

            {/* Reps Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repetitions Completed
              </label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 5"
                min="1"
                max="12"
              />
              <p className="text-xs text-gray-500 mt-1">Enter reps between 1-12 for best accuracy</p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateOneRepMax}
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Calculate 1RM
            </button>

            {oneRepMax && (
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
            {oneRepMax && trainingZones && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your 1RM Result</h3>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                    <h4 className="text-lg font-semibold text-orange-900 mb-2">
                      {exercises[exercise]} 1RM
                    </h4>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {oneRepMax} {unit === "metric" ? "kg" : "lbs"}
                    </div>
                    <p className="text-sm text-orange-700">
                      Based on {weight} {unit === "metric" ? "kg" : "lbs"} × {reps} reps
                    </p>
                  </div>
                </div>

                {/* Training Zones */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Training Zones</h3>
                  <div className="space-y-3">
                    {Object.entries(trainingZones).map(([zone, data]) => (
                      <div key={zone} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900 capitalize">{data.purpose}</h4>
                          <span className="text-sm text-gray-600">{data.percentage}</span>
                        </div>
                        <div className="text-lg font-bold text-orange-600">
                          {data.weight} {unit === "metric" ? "kg" : "lbs"}
                        </div>
                        <div className="text-sm text-gray-600">{data.reps} reps</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Safety & Training Tips</h3>
                  <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share Results */}
                <ShareResults
                  title="1RM Calculator Results"
                  description={`${exercises[exercise]} 1RM: ${oneRepMax} ${unit === "metric" ? "kg" : "lbs"}`}
                  url={getShareUrl()}
                />
              </>
            )}

            {/* Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding 1RM</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>One Rep Max (1RM)</strong> is the maximum weight you can lift for a single repetition with proper form.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Calculation Methods:</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Brzycki Formula:</strong> Weight × (36 ÷ (37 - reps))</li>
                    <li><strong>Epley Formula:</strong> Weight × (1 + reps ÷ 30)</li>
                    <li><strong>Best Accuracy:</strong> 2-6 reps range</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
                  <ul className="text-sm space-y-1">
                    <li>Never attempt 1RM without proper warm-up</li>
                    <li>Always use a spotter for safety</li>
                    <li>Test infrequently (every 4-6 weeks)</li>
                    <li>Stop if form breaks down</li>
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

export default function OneRepMaxCalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OneRepMaxCalculatorContent />
    </Suspense>
  );
}