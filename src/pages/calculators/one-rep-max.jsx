import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Dumbbell, ArrowLeft, Info, Target, Zap, Trophy, Scale, TrendingUp, Heart, Apple } from "lucide-react";
import BlurIn from "../../components/blurText";
import ShareResults from "../../components/ui/ShareResults";

function OneRepMaxCalculator() {
  const [searchParams] = useSearchParams();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState("metric");
  const [formula, setFormula] = useState("epley");
  const [exercise, setExercise] = useState("bench_press");
  const [oneRM, setOneRM] = useState(null);
  const [percentages, setPercentages] = useState(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedWeight = searchParams.get('weight');
    const sharedReps = searchParams.get('reps');
    const sharedUnit = searchParams.get('unit');
    const sharedFormula = searchParams.get('formula');
    const sharedExercise = searchParams.get('exercise');
    const sharedOneRM = searchParams.get('oneRM');
    
    if (sharedWeight && sharedReps && sharedOneRM) {
      setWeight(sharedWeight);
      setReps(sharedReps);
      if (sharedUnit) setUnit(sharedUnit);
      if (sharedFormula) setFormula(sharedFormula);
      if (sharedExercise) setExercise(sharedExercise);
      setIsSharedResult(true);
      
      // Set calculated values directly
      const oneRMValue = parseFloat(sharedOneRM);
      setOneRM(oneRMValue);
      
      // Calculate percentages
      const percentagesData = {};
      [50, 60, 70, 75, 80, 85, 90, 95, 100].forEach(percent => {
        percentagesData[percent] = Math.round(oneRMValue * (percent / 100));
      });
      setPercentages(percentagesData);
    }
  }, [searchParams]);

  const exercises = [
    { value: "bench_press", label: "Bench Press" },
    { value: "squat", label: "Back Squat" },
    { value: "deadlift", label: "Deadlift" },
    { value: "overhead_press", label: "Overhead Press" },
    { value: "barbell_row", label: "Barbell Row" },
    { value: "incline_press", label: "Incline Bench Press" },
    { value: "front_squat", label: "Front Squat" },
    { value: "other", label: "Other Exercise" }
  ];

  const formulas = [
    { 
      value: "epley", 
      label: "Epley Formula", 
      description: "Most popular and widely used",
      accuracy: "Best for 1-10 reps"
    },
    { 
      value: "brzycki", 
      label: "Brzycki Formula", 
      description: "Conservative and reliable",
      accuracy: "Best for 2-10 reps"
    },
    { 
      value: "lander", 
      label: "Lander Formula", 
      description: "Good for higher rep ranges",
      accuracy: "Best for 5-15 reps"
    },
    { 
      value: "lombardi", 
      label: "Lombardi Formula", 
      description: "Slightly more aggressive",
      accuracy: "Best for 1-10 reps"
    }
  ];

  const calculateOneRM = () => {
    const weightValue = parseFloat(weight);
    const repsValue = parseInt(reps);
    
    if (!weightValue || !repsValue || repsValue < 1 || repsValue > 20) return;

    let oneRMValue;

    switch (formula) {
      case "epley":
        oneRMValue = weightValue * (1 + repsValue / 30);
        break;
      case "brzycki":
        oneRMValue = weightValue * (36 / (37 - repsValue));
        break;
      case "lander":
        oneRMValue = (100 * weightValue) / (101.3 - 2.67123 * repsValue);
        break;
      case "lombardi":
        oneRMValue = weightValue * Math.pow(repsValue, 0.10);
        break;
      default:
        oneRMValue = weightValue * (1 + repsValue / 30);
    }

    setOneRM(oneRMValue);

    // Calculate percentage-based training loads
    const trainingPercentages = {
      90: { percentage: 90, reps: "1-2", purpose: "Max Strength Test", color: "text-red-600" },
      85: { percentage: 85, reps: "2-4", purpose: "Max Strength", color: "text-red-500" },
      80: { percentage: 80, reps: "3-6", purpose: "Strength/Power", color: "text-orange-600" },
      75: { percentage: 75, reps: "4-8", purpose: "Strength", color: "text-orange-500" },
      70: { percentage: 70, reps: "6-10", purpose: "Strength/Hypertrophy", color: "text-yellow-600" },
      65: { percentage: 65, reps: "8-12", purpose: "Hypertrophy", color: "text-green-600" },
      60: { percentage: 60, reps: "10-15", purpose: "Hypertrophy/Endurance", color: "text-green-500" },
      55: { percentage: 55, reps: "12-20", purpose: "Muscular Endurance", color: "text-blue-600" }
    };

    const calculatedPercentages = {};
    Object.keys(trainingPercentages).forEach(percent => {
      const weight = (oneRMValue * (percent / 100));
      calculatedPercentages[percent] = {
        ...trainingPercentages[percent],
        weight: Math.round(weight * 10) / 10
      };
    });

    setPercentages(calculatedPercentages);
  };

  useEffect(() => {
    if (weight && reps) {
      calculateOneRM();
    }
  }, [weight, reps, formula]);

  const getExerciseAdvice = () => {
    const advice = {
      bench_press: {
        tips: ["Keep feet flat on floor", "Maintain tight shoulder blades", "Lower bar to chest with control"],
        safety: "Always use a spotter for maximum attempts"
      },
      squat: {
        tips: ["Keep chest up and core tight", "Descend until thighs parallel", "Drive through heels"],
        safety: "Use safety bars set just below your lowest squat position"
      },
      deadlift: {
        tips: ["Keep bar close to body", "Engage lats and core", "Hip hinge movement pattern"],
        safety: "Learn proper form before attempting heavy weights"
      },
      overhead_press: {
        tips: ["Engage core for stability", "Press in straight line", "Keep elbows under wrists"],
        safety: "Start with lighter weights to perfect form"
      },
      other: {
        tips: ["Focus on proper form", "Use controlled movements", "Progressive overload"],
        safety: "Always prioritise form over weight"
      }
    };

    return advice[exercise] || advice.other;
  };

  const exerciseAdvice = getExerciseAdvice();

  return (
    <>
      <Helmet>
        <title>Free 1RM Calculator New Zealand | One Rep Max Calculator NZ | 6Pack</title>
        <meta
          name="description"
          content="Free 1RM calculator for New Zealanders. Calculate your one-rep max using proven formulas. Get training percentages and strength programming recommendations for Kiwis."
        />
        <meta
          name="keywords"
          content="1RM calculator NZ, one rep max New Zealand, strength training calculator, powerlifting NZ, training percentages calculator, max lift calculator"
        />
        <meta property="og:title" content="Free 1RM Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your one-rep max with our free New Zealand 1RM calculator. Get training percentages and strength programming tips." />
        <meta property="og:url" content="https://6pack.co.nz/calculators/one-rep-max" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free 1RM Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your one-rep max with our free NZ calculator." />
        <link rel="canonical" href="https://6pack.co.nz/calculators/one-rep-max" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/calculators"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Calculators
            </Link>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="text-orange-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="1RM Calculator"
              />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your one-rep max and get training percentages for optimal strength programming. 
                Plan your workouts with science-based intensity zones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your 1RM</h2>
              
              {/* Exercise Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise
                </label>
                <select
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {exercises.map(ex => (
                    <option key={ex.value} value={ex.value}>{ex.label}</option>
                  ))}
                </select>
              </div>

              {/* Unit Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Unit
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === "metric"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Kilograms (kg)
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Pounds (lbs)
                  </button>
                </div>
              </div>

              {/* Weight Input */}
              <div className="mb-6">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Lifted {unit === "metric" ? "(kg)" : "(lbs)"}
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "100" : "220"}
                  step="0.5"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Reps Input */}
              <div className="mb-6">
                <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-2">
                  Repetitions Completed
                </label>
                <input
                  type="number"
                  id="reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="5"
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Best accuracy with 1-10 reps. Maximum 20 reps.
                </p>
              </div>

              {/* Formula Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Formula
                </label>
                <div className="space-y-2">
                  {formulas.map(form => (
                    <label key={form.value} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="formula"
                        value={form.value}
                        checked={formula === form.value}
                        onChange={(e) => setFormula(e.target.value)}
                        className="mr-3 mt-1 text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{form.label}</div>
                        <div className="text-sm text-gray-600">{form.description}</div>
                        <div className="text-xs text-gray-500">{form.accuracy}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Exercise Tips */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-2 flex items-center">
                  <Zap className="mr-2" size={16} />
                  {exercises.find(ex => ex.value === exercise)?.label} Tips
                </h3>
                <ul className="text-sm text-orange-800 space-y-1 mb-3">
                  {exerciseAdvice.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-orange-900">
                  ⚠️ Safety: {exerciseAdvice.safety}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* 1RM Result */}
              {oneRM && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center mb-6">
                    {isSharedResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          📤 These results were shared with you! Calculate your own results above.
                        </p>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Estimated 1RM</h2>
                    <div className="text-6xl font-bold text-orange-600 mb-2">
                      {Math.round(oneRM * 10) / 10}
                    </div>
                    <p className="text-gray-600">{unit === "metric" ? "kilograms" : "pounds"}</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Trophy className="mr-2 text-orange-600" size={20} />
                      <h3 className="font-semibold text-orange-900">Based on your performance:</h3>
                    </div>
                    <p className="text-sm text-orange-800">
                      {weight}{unit === "metric" ? "kg" : "lbs"} × {reps} reps using {formulas.find(f => f.value === formula)?.label}
                    </p>
                  </div>
                  
                  {/* Share Results */}
                  <div className="mt-6 text-center">
                    <ShareResults 
                      title="1RM Calculator Results"
                      results={`${exercises.find(e => e.value === exercise)?.label} 1RM: ${Math.round(oneRM * 10) / 10}${unit === "metric" ? "kg" : "lbs"}\nBased on: ${weight}${unit === "metric" ? "kg" : "lbs"} × ${reps} reps`}
                      hashtags={["OneRepMax", "StrengthTraining", "6PackNZ"]}
                      resultData={{
                        weight: weight,
                        reps: reps,
                        unit: unit,
                        formula: formula,
                        exercise: exercise,
                        oneRM: oneRM
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Training Percentages */}
              {percentages && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="mr-2 text-primary-600" size={24} />
                    Training Percentages
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(percentages).map(([percent, data]) => (
                      <div key={percent} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold text-lg ${data.color}`}>
                              {percent}%
                            </span>
                            <span className={`font-bold text-lg ${data.color}`}>
                              {data.weight}{unit === "metric" ? "kg" : "lbs"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {data.reps} reps • {data.purpose}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Programming Tip:</strong> Use these percentages to structure your training. 
                      Higher percentages (80%+) for strength, middle range (65-80%) for hypertrophy, 
                      lower percentages (50-65%) for endurance and technique work.
                    </p>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Info className="mr-3 mt-1 text-yellow-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Notes</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• These are estimates - actual 1RM may vary by ±5-10%</li>
                      <li>• Most accurate when using 3-8 rep ranges</li>
                      <li>• Always warm up properly before attempting heavy lifts</li>
                      <li>• Consider having a spotter for safety</li>
                      <li>• Test your actual 1RM only when well-rested and prepared</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Related Calculators */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Other Fitness Calculators</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link 
                    to="/calculators/bmi" 
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Scale className="text-blue-500 mb-2" size={20} />
                    <h4 className="font-semibold text-gray-900 text-sm">BMI Calculator</h4>
                    <p className="text-xs text-gray-600">Check your weight status</p>
                  </Link>
                  <Link 
                    to="/calculators/bmr" 
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Heart className="text-red-500 mb-2" size={20} />
                    <h4 className="font-semibold text-gray-900 text-sm">BMR Calculator</h4>
                    <p className="text-xs text-gray-600">Calculate daily calorie needs</p>
                  </Link>
                  <Link 
                    to="/calculators/body-fat" 
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Target className="text-purple-500 mb-2" size={20} />
                    <h4 className="font-semibold text-gray-900 text-sm">Body Fat Calculator</h4>
                    <p className="text-xs text-gray-600">Estimate body composition</p>
                  </Link>
                  <Link 
                    to="/calculators/macro" 
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Apple className="text-green-500 mb-2" size={20} />
                    <h4 className="font-semibold text-gray-900 text-sm">Macro Calculator</h4>
                    <p className="text-xs text-gray-600">Plan your nutrition</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneRepMaxCalculator; 