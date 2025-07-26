import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Heart, ArrowLeft, Info, Target, Flame, Scale, TrendingUp, Dumbbell, Apple } from "lucide-react";
import BlurIn from "../../components/blurText";
import ShareResults from "../../components/ui/ShareResults";

function BMRCalculator() {
  const [searchParams] = useSearchParams();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [weightGoal, setWeightGoal] = useState("maintain");
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedAge = searchParams.get('age');
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedGender = searchParams.get('gender');
    const sharedUnit = searchParams.get('unit');
    const sharedActivity = searchParams.get('activityLevel');
    const sharedBmr = searchParams.get('bmr');
    
    if (sharedAge && sharedHeight && sharedWeight && sharedBmr) {
      setAge(sharedAge);
      setHeight(sharedHeight);
      setWeight(sharedWeight);
      if (sharedGender) setGender(sharedGender);
      if (sharedUnit) setUnit(sharedUnit);
      if (sharedActivity) setActivityLevel(sharedActivity);
      setIsSharedResult(true);
      
      // If we have BMR and TDEE values, set them directly
      const sharedTdee = searchParams.get('tdee');
      if (sharedTdee) {
        setBMR(parseInt(sharedBmr));
        setTDEE(parseInt(sharedTdee));
      } else {
        // Otherwise calculate them normally
        setTimeout(() => calculateBMR(), 100);
      }
    }
  }, [searchParams]);

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", multiplier: 1.2, description: "Little or no exercise" },
    { value: "light", label: "Lightly Active", multiplier: 1.375, description: "Light exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", multiplier: 1.55, description: "Moderate exercise 3-5 days/week" },
    { value: "very", label: "Very Active", multiplier: 1.725, description: "Hard exercise 6-7 days/week" },
    { value: "extra", label: "Extra Active", multiplier: 1.9, description: "Very hard exercise, physical job" }
  ];

  const calculateBMR = () => {
    if (!age || !height || !weight) return;

    let heightInCm, weightInKg;

    if (unit === "metric") {
      heightInCm = parseFloat(height);
      weightInKg = parseFloat(weight);
    } else {
      // Convert feet/inches to cm and pounds to kg
      const feet = Math.floor(parseFloat(height));
      const inches = (parseFloat(height) - feet) * 12;
      heightInCm = (feet * 12 + inches) * 2.54;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    // Mifflin-St Jeor Equation (more accurate)
    let bmrValue;
    if (gender === "male") {
      bmrValue = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) + 5;
    } else {
      bmrValue = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) - 161;
    }

    setBMR(Math.round(bmrValue));

    // Calculate TDEE (Total Daily Energy Expenditure)
    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    const tdeeValue = bmrValue * selectedActivity.multiplier;
    setTDEE(Math.round(tdeeValue));
  };

  useEffect(() => {
    if (age && height && weight) {
      calculateBMR();
    }
  }, [age, height, weight, gender, unit, activityLevel]);

  const getCalorieRecommendations = () => {
    if (!tdee) return null;

    const recommendations = {
      maintain: { calories: tdee, description: "Maintain current weight" },
      mild_loss: { calories: tdee - 250, description: "Mild weight loss (0.25kg/0.5lbs per week)" },
      moderate_loss: { calories: tdee - 500, description: "Moderate weight loss (0.5kg/1lb per week)" },
      aggressive_loss: { calories: tdee - 750, description: "Aggressive weight loss (0.75kg/1.5lbs per week)" },
      mild_gain: { calories: tdee + 250, description: "Mild weight gain (0.25kg/0.5lbs per week)" },
      moderate_gain: { calories: tdee + 500, description: "Moderate weight gain (0.5kg/1lb per week)" }
    };

    return recommendations;
  };

  const recommendations = getCalorieRecommendations();

  return (
    <>
      <Helmet>
        <title>Free BMR Calculator New Zealand | Basal Metabolic Rate Calculator NZ | 6Pack</title>
        <meta
          name="description"
          content="Free BMR calculator for New Zealanders. Calculate your Basal Metabolic Rate and daily calorie needs instantly. Get personalised nutrition recommendations for Kiwis. Metric & Imperial units."
        />
        <meta
          name="keywords"
          content="BMR calculator NZ, basal metabolic rate New Zealand, calorie calculator NZ, TDEE calculator New Zealand, daily calorie needs NZ, metabolism calculator"
        />
        <meta property="og:title" content="Free BMR Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your BMR and daily calorie needs with our free New Zealand BMR calculator. Get personalised nutrition recommendations." />
        <meta property="og:url" content="https://6pack.co.nz/calculators/bmr" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free BMR Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your BMR and daily calorie needs with our free NZ calculator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://6pack.co.nz/calculators/bmr" />
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
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="BMR Calculator"
              />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your Basal Metabolic Rate and daily calorie needs based on your activity level. 
                Get personalised recommendations for your fitness goals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h2>
              
              {/* Unit Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Measurement System
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
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
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
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      gender === "male"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      gender === "female"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Input */}
              <div className="mb-6">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  min="15"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Height Input */}
              <div className="mb-6">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height {unit === "metric" ? "(cm)" : "(feet.inches)"}
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "170" : "5.8"}
                  step={unit === "metric" ? "1" : "0.1"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Weight Input */}
              <div className="mb-6">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Activity Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <div className="space-y-2">
                  {activityLevels.map(level => (
                    <label key={level.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="activity"
                        value={level.value}
                        checked={activityLevel === level.value}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="mr-3 text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* BMR Result */}
              {bmr && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center mb-6">
                    {isSharedResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          📤 These results were shared with you! Calculate your own results above.
                        </p>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your BMR</h2>
                    <div className="text-5xl font-bold text-red-600 mb-2">
                      {bmr}
                    </div>
                    <p className="text-gray-600">calories per day at rest</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Flame className="mr-2 text-red-600" size={20} />
                      <h3 className="font-semibold text-red-900">Total Daily Energy Expenditure (TDEE)</h3>
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-1">{tdee}</div>
                    <p className="text-sm text-red-700">calories per day including activity</p>
                  </div>
                  
                  {/* Share Results */}
                  <div className="mt-6 text-center">
                    <ShareResults 
                      title="BMR Calculator Results"
                      results={`BMR: ${bmr} calories/day\nTDEE: ${tdee} calories/day\nActivity Level: ${activityLevels.find(l => l.value === activityLevel)?.label}`}
                      hashtags={["BMRCalculator", "Metabolism", "6PackNZ"]}
                      resultData={{
                        age: age,
                        height: height,
                        weight: weight,
                        gender: gender,
                        unit: unit,
                        activityLevel: activityLevel,
                        bmr: bmr,
                        tdee: tdee
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Calorie Recommendations */}
              {recommendations && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="mr-2 text-primary-600" size={24} />
                    Calorie Recommendations
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(recommendations).map(([key, rec]) => {
                      const isSelected = weightGoal === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setWeightGoal(key)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            isSelected 
                              ? "border-primary-500 bg-primary-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className={`font-semibold ${isSelected ? "text-primary-900" : "text-gray-900"}`}>
                                {rec.description}
                              </div>
                              <div className={`text-sm ${isSelected ? "text-primary-700" : "text-gray-600"}`}>
                                {rec.calories} calories per day
                              </div>
                            </div>
                            <div className={`text-2xl font-bold ${isSelected ? "text-primary-600" : "text-gray-500"}`}>
                              {rec.calories}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Info className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">About BMR & TDEE</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>BMR</strong> is the minimum calories your body needs to function at rest</li>
                      <li>• <strong>TDEE</strong> includes your BMR plus calories burned through activity</li>
                      <li>• Uses the Mifflin-St Jeor equation for accuracy</li>
                      <li>• 1 pound of fat ≈ 3,500 calories</li>
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
                  <Link 
                    to="/calculators/ideal-weight" 
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <TrendingUp className="text-blue-500 mb-2" size={20} />
                    <h4 className="font-semibold text-gray-900 text-sm">Ideal Weight</h4>
                    <p className="text-xs text-gray-600">Find your target weight</p>
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

export default BMRCalculator; 