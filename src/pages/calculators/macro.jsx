import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Apple, ArrowLeft, Info, Target, Utensils, Activity, Scale, TrendingUp, Dumbbell, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import BlurIn from "../../components/blurText";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import ShareResults from "../../components/ui/ShareResults";

function MacroCalculator() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [macros, setMacros] = useState(null);
  const [calories, setCalories] = useState(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedAge = searchParams.get('age');
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedGender = searchParams.get('gender');
    const sharedUnit = searchParams.get('unit');
    const sharedActivity = searchParams.get('activityLevel');
    const sharedGoal = searchParams.get('goal');
    const sharedCalories = searchParams.get('calories');
    const sharedProtein = searchParams.get('protein');
    const sharedCarbs = searchParams.get('carbs');
    const sharedFat = searchParams.get('fat');
    
    if (sharedAge && sharedHeight && sharedWeight && sharedCalories) {
      setAge(sharedAge);
      setHeight(sharedHeight);
      setWeight(sharedWeight);
      if (sharedGender) setGender(sharedGender);
      if (sharedUnit) setUnit(sharedUnit);
      if (sharedActivity) setActivityLevel(sharedActivity);
      if (sharedGoal) setGoal(sharedGoal);
      
      // If we have all the calculated values, set them directly
      if (sharedProtein && sharedCarbs && sharedFat) {
        setCalories(parseInt(sharedCalories));
        setMacros({
          protein: parseInt(sharedProtein),
          carbs: parseInt(sharedCarbs),
          fat: parseInt(sharedFat),
          proteinCalories: parseInt(sharedProtein) * 4,
          carbCalories: parseInt(sharedCarbs) * 4,
          fatCalories: parseInt(sharedFat) * 9
        });
        setCurrentStep(4);
        setIsSharedResult(true);
      } else {
        // Otherwise calculate them
        setCurrentStep(4);
        setTimeout(() => calculateMacros(), 100);
        setIsSharedResult(true);
      }
    }
  }, [searchParams]);

  const steps = [
    { label: "Basic Info", description: "Age, gender, measurements" },
    { label: "Activity Level", description: "Exercise frequency" },
    { label: "Goals", description: "Fitness objectives" },
    { label: "Results", description: "Your macro targets" }
  ];

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", multiplier: 1.2, description: "Desk job, little to no exercise" },
    { value: "light", label: "Lightly Active", multiplier: 1.375, description: "Light exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", multiplier: 1.55, description: "Moderate exercise 3-5 days/week" },
    { value: "very", label: "Very Active", multiplier: 1.725, description: "Heavy exercise 6-7 days/week" },
    { value: "extra", label: "Extremely Active", multiplier: 1.9, description: "Very heavy exercise, physical job" }
  ];

  const goals = [
    { 
      value: "aggressive_cut", 
      label: "Aggressive Cut", 
      calorieAdjust: -750,
      protein: 2.2, carbs: 1.0, fat: 0.8,
      description: "Rapid fat loss (1.5 lbs/week)"
    },
    { 
      value: "moderate_cut", 
      label: "Moderate Cut", 
      calorieAdjust: -500,
      protein: 2.0, carbs: 1.5, fat: 1.0,
      description: "Steady fat loss (1 lb/week)"
    },
    { 
      value: "mild_cut", 
      label: "Mild Cut", 
      calorieAdjust: -250,
      protein: 1.8, carbs: 2.0, fat: 1.2,
      description: "Slow fat loss (0.5 lbs/week)"
    },
    { 
      value: "maintain", 
      label: "Maintain Weight", 
      calorieAdjust: 0,
      protein: 1.6, carbs: 2.5, fat: 1.0,
      description: "Body recomposition"
    },
    { 
      value: "mild_bulk", 
      label: "Lean Bulk", 
      calorieAdjust: 250,
      protein: 1.6, carbs: 3.0, fat: 1.2,
      description: "Slow muscle gain (0.5 lbs/week)"
    },
    { 
      value: "moderate_bulk", 
      label: "Moderate Bulk", 
      calorieAdjust: 500,
      protein: 1.8, carbs: 4.0, fat: 1.5,
      description: "Muscle gain (1 lb/week)"
    }
  ];

  const calculateMacros = () => {
    if (!age || !height || !weight) return;

    let heightInCm, weightInKg;

    if (unit === "metric") {
      heightInCm = parseFloat(height);
      weightInKg = parseFloat(weight);
    } else {
      heightInCm = parseFloat(height) * 2.54;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) - 161;
    }

    // Calculate TDEE
    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    const tdee = bmr * selectedActivity.multiplier;

    // Apply goal adjustment
    const selectedGoal = goals.find(g => g.value === goal);
    const targetCalories = tdee + selectedGoal.calorieAdjust;

    setCalories(Math.round(targetCalories));

    // Calculate macros based on goal
    const proteinGrams = weightInKg * selectedGoal.protein;
    const fatGrams = weightInKg * selectedGoal.fat;
    
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const remainingCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.max(0, remainingCalories / 4);

    setMacros({
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fat: Math.round(fatGrams),
      proteinCalories: Math.round(proteinCalories),
      carbCalories: Math.round(carbGrams * 4),
      fatCalories: Math.round(fatCalories)
    });
  };

  // Step validation and navigation
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return age && height && weight;
      case 2:
        return activityLevel;
      case 3:
        return goal;
      case 4:
        return macros && calories;
      default:
        return false;
    }
  };

  const canProceed = (step) => {
    return isStepValid(step);
  };

  const nextStep = () => {
    if (currentStep < 4 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 3) {
        calculateMacros();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getMacroPercentages = () => {
    if (!macros || !calories) return null;

    return {
      protein: Math.round((macros.proteinCalories / calories) * 100),
      carbs: Math.round((macros.carbCalories / calories) * 100),
      fat: Math.round((macros.fatCalories / calories) * 100)
    };
  };

  const percentages = getMacroPercentages();
  const selectedGoal = goals.find(g => g.value === goal);

  return (
    <>
      <Helmet>
        <title>Free Macro Calculator New Zealand | Macronutrient Calculator NZ | 6Pack</title>
        <meta
          name="description"
          content="Free macro calculator for New Zealanders. Calculate your daily macronutrient needs (protein, carbs, fat) based on your fitness goals. Personalised nutrition planning for Kiwis."
        />
        <meta
          name="keywords"
          content="macro calculator NZ, macronutrient calculator New Zealand, protein calculator NZ, nutrition calculator New Zealand, diet planning NZ, IIFYM calculator"
        />
        <meta property="og:title" content="Free Macro Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your daily macronutrient needs with our free New Zealand macro calculator. Get personalised nutrition recommendations." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://6pack.co.nz/calculators/macro" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Macro Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your daily macronutrient needs with our free NZ calculator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://6pack.co.nz/calculators/macro" />
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Apple className="text-green-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="Macro Calculator"
              />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your daily macronutrient needs based on your goals. Get precise protein, 
                carbohydrate, and fat targets for optimal results.
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              steps={steps} 
              currentStep={currentStep}
              className="max-w-4xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1]?.label}</h2>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </div>
              </div>
              
              {/* Step Content */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Unit Toggle */}
                  <div>
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
                  <div>
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

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                        Height {unit === "metric" ? "(cm)" : "(inches)"}
                      </label>
                      <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder={unit === "metric" ? "175" : "70"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                        Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                      </label>
                      <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={unit === "metric" ? "70" : "154"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-4">
                    <p className="text-gray-600">How active are you on a typical week?</p>
                  </div>
                  <div className="space-y-3">
                    {activityLevels.map(level => (
                      <label key={level.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="activity"
                          value={level.value}
                          checked={activityLevel === level.value}
                          onChange={(e) => setActivityLevel(e.target.value)}
                          className="mr-4 text-primary-600 scale-125"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-lg">{level.label}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="mb-4">
                    <p className="text-gray-600">What's your primary fitness goal?</p>
                  </div>
                  <div className="space-y-3">
                    {goals.map(goalOption => (
                      <label key={goalOption.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="goal"
                          value={goalOption.value}
                          checked={goal === goalOption.value}
                          onChange={(e) => setGoal(e.target.value)}
                          className="mr-4 text-primary-600 scale-125"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-lg">{goalOption.label}</div>
                          <div className="text-sm text-gray-500">{goalOption.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed(currentStep)}
                    className={`inline-flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      canProceed(currentStep)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <ShareResults 
                      title="Macro Calculator Results"
                      results={`Daily Calories: ${calories}\nProtein: ${macros?.protein}g\nCarbs: ${macros?.carbs}g\nFat: ${macros?.fat}g`}
                      hashtags={["MacroCalculator", "NutritionPlan", "6PackNZ"]}
                      resultData={{
                        age: age,
                        height: height,
                        weight: weight,
                        gender: gender,
                        unit: unit,
                        activityLevel: activityLevel,
                        goal: goal,
                        calories: calories,
                        protein: macros?.protein,
                        carbs: macros?.carbs,
                        fat: macros?.fat
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Step 4: Results Display */}
              {currentStep === 4 && calories && macros && (
                <>
                  {/* Calorie & Macro Results */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-6">
                      {isSharedResult && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <p className="text-blue-800 text-sm">
                            📤 These results were shared with you! Calculate your own results above.
                          </p>
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Daily Targets</h2>
                      <div className="text-5xl font-bold text-green-600 mb-2">
                        {calories}
                      </div>
                      <p className="text-gray-600 mb-4">total calories per day</p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">Goal: {selectedGoal?.label}</h3>
                        <p className="text-sm text-green-800">{selectedGoal?.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Macronutrient Breakdown */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="mr-2 text-primary-600" size={24} />
                      Macronutrient Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Protein */}
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                            <span className="font-semibold text-red-900">Protein</span>
                          </div>
                          <span className="text-red-600 font-bold text-lg">{percentages?.protein}%</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {macros.protein}g
                        </div>
                        <p className="text-sm text-red-700">{macros.proteinCalories} calories</p>
                      </div>

                      {/* Carbohydrates */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                            <span className="font-semibold text-blue-900">Carbohydrates</span>
                          </div>
                          <span className="text-blue-600 font-bold text-lg">{percentages?.carbs}%</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {macros.carbs}g
                        </div>
                        <p className="text-sm text-blue-700">{macros.carbCalories} calories</p>
                      </div>

                      {/* Fat */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                            <span className="font-semibold text-yellow-900">Fat</span>
                          </div>
                          <span className="text-yellow-600 font-bold text-lg">{percentages?.fat}%</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600 mb-1">
                          {macros.fat}g
                        </div>
                        <p className="text-sm text-yellow-700">{macros.fatCalories} calories</p>
                      </div>
                    </div>
                  </div>

                  {/* Food Examples */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Utensils className="mr-2 text-primary-600" size={24} />
                      Food Examples
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Protein Sources ({macros.protein}g daily)</h4>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>• Chicken breast (100g = 31g protein)</li>
                          <li>• Greek yogurt (200g = 20g protein)</li>
                          <li>• Eggs (2 large = 12g protein)</li>
                          <li>• Whey protein (1 scoop = 25g protein)</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Carbohydrate Sources ({macros.carbs}g daily)</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Brown rice (100g cooked = 23g carbs)</li>
                          <li>• Oats (50g dry = 32g carbs)</li>
                          <li>• Banana (1 medium = 27g carbs)</li>
                          <li>• Sweet potato (150g = 32g carbs)</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Fat Sources ({macros.fat}g daily)</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Almonds (30g = 16g fat)</li>
                          <li>• Olive oil (1 tbsp = 14g fat)</li>
                          <li>• Avocado (100g = 15g fat)</li>
                          <li>• Salmon (100g = 13g fat)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Progress Summary for other steps */}
              {currentStep < 4 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Summary</h3>
                  <div className="space-y-3">
                    {currentStep > 1 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-green-800">Basic Information</span>
                        <div className="text-green-600 text-sm">
                          {gender} • {age} years • {height}{unit === "metric" ? "cm" : "in"} • {weight}{unit === "metric" ? "kg" : "lbs"}
                        </div>
                      </div>
                    )}
                    {currentStep > 2 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-green-800">Activity Level</span>
                        <div className="text-green-600 text-sm">
                          {activityLevels.find(l => l.value === activityLevel)?.label}
                        </div>
                      </div>
                    )}
                    {currentStep > 3 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-green-800">Goal</span>
                        <div className="text-green-600 text-sm">
                          {goals.find(g => g.value === goal)?.label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/calculators/bmi"
                className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Scale className="text-blue-600 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-900">BMI Calculator</h3>
                  <p className="text-sm text-gray-600">Check your body mass index</p>
                </div>
              </Link>

              <Link
                to="/calculators/bmr"
                className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <Heart className="text-red-600 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-900">BMR Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate metabolic rate</p>
                </div>
              </Link>

              <Link
                to="/calculators/body-fat"
                className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <Target className="text-purple-600 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-900">Body Fat Calculator</h3>
                  <p className="text-sm text-gray-600">Estimate body composition</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MacroCalculator;