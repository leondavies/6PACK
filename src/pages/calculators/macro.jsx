import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Apple, ArrowLeft, Info, Target, Utensils, Activity } from "lucide-react";
import BlurIn from "../../components/blurText";

function MacroCalculator() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [macros, setMacros] = useState(null);
  const [calories, setCalories] = useState(null);

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
    
    // Calculate remaining calories for carbs after protein and fat
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

  useEffect(() => {
    if (age && height && weight) {
      calculateMacros();
    }
  }, [age, height, weight, gender, unit, activityLevel, goal]);

  const getMacroPercentages = () => {
    if (!macros || !calories) return null;

    return {
      protein: Math.round((macros.proteinCalories / calories) * 100),
      carbs: Math.round((macros.carbCalories / calories) * 100),
      fat: Math.round((macros.fatCalories / calories) * 100)
    };
  };

  const percentages = getMacroPercentages();

  const getFoodExamples = () => {
    return {
      protein: {
        foods: ["Chicken breast (100g = 31g protein)", "Greek yogurt (200g = 20g protein)", "Eggs (2 large = 12g protein)", "Whey protein (1 scoop = 25g protein)"],
        color: "bg-red-50 border-red-200 text-red-800"
      },
      carbs: {
        foods: ["Brown rice (100g cooked = 23g carbs)", "Oats (50g dry = 32g carbs)", "Banana (1 medium = 27g carbs)", "Sweet potato (150g = 32g carbs)"],
        color: "bg-blue-50 border-blue-200 text-blue-800"
      },
      fat: {
        foods: ["Almonds (30g = 16g fat)", "Olive oil (1 tbsp = 14g fat)", "Avocado (100g = 15g fat)", "Salmon (100g = 13g fat)"],
        color: "bg-yellow-50 border-yellow-200 text-yellow-800"
      }
    };
  };

  const foodExamples = getFoodExamples();
  const selectedGoal = goals.find(g => g.value === goal);

  return (
    <>
      <Helmet>
        <title>Macro Calculator - Macronutrient Calculator | 6Pack Fitness</title>
        <meta
          name="description"
          content="Calculate your daily macronutrient needs (protein, carbs, fat) based on your goals. Get personalised nutrition recommendations."
        />
        <meta
          name="keywords"
          content="macro calculator, macronutrient calculator, protein calculator, nutrition calculator, diet planning"
        />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Macros</h2>
              
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

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    min="15"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height {unit === "metric" ? "(cm)" : "(in)"}
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === "metric" ? "170" : "68"}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
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

              {/* Goal Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fitness Goal
                </label>
                <div className="space-y-2">
                  {goals.map(goalOption => (
                    <label key={goalOption.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="goal"
                        value={goalOption.value}
                        checked={goal === goalOption.value}
                        onChange={(e) => setGoal(e.target.value)}
                        className="mr-3 text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{goalOption.label}</div>
                        <div className="text-sm text-gray-500">{goalOption.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Calorie & Macro Results */}
              {calories && macros && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center mb-6">
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
              )}

              {/* Macronutrient Breakdown */}
              {macros && percentages && (
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
                        <span className="text-red-600 font-bold text-lg">{percentages.protein}%</span>
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
                        <span className="text-blue-600 font-bold text-lg">{percentages.carbs}%</span>
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
                        <span className="text-yellow-600 font-bold text-lg">{percentages.fat}%</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {macros.fat}g
                      </div>
                      <p className="text-sm text-yellow-700">{macros.fatCalories} calories</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Food Examples */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Utensils className="mr-2 text-primary-600" size={24} />
                  Food Examples
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(foodExamples).map(([macro, data]) => (
                    <div key={macro} className={`border rounded-lg p-4 ${data.color}`}>
                      <h4 className="font-semibold mb-2 capitalize">{macro} Sources:</h4>
                      <ul className="text-sm space-y-1">
                        {data.foods.map((food, index) => (
                          <li key={index}>• {food}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Info className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Macro Tips</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Protein: Aim to spread throughout the day (20-40g per meal)</li>
                      <li>• Carbs: Time around workouts for best performance</li>
                      <li>• Fats: Include healthy sources like nuts, oils, and fish</li>
                      <li>• Stay hydrated: 35ml per kg of body weight daily</li>
                      <li>• Track for 1-2 weeks, then adjust based on progress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MacroCalculator; 