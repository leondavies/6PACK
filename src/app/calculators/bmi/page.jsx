'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Scale, Info, Target, TrendingUp, Heart } from "lucide-react";
import ShareResults from "../../../components/ui/ShareResults";
import CalculatorHero from "../../../components/calculators/CalculatorHero";
import { CalculatorSEO } from "../../../components/SEO";
import MedicalDisclaimer from "../../../components/MedicalDisclaimer";

function BMICalculatorContent() {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [healthRisk, setHealthRisk] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedUnit = searchParams.get('unit');
    const sharedBmi = searchParams.get('bmi');
    const sharedCategory = searchParams.get('category');
    const sharedHealthRisk = searchParams.get('healthRisk');
    
    if (sharedHeight && sharedWeight && sharedUnit && sharedBmi) {
      setHeight(sharedHeight);
      setWeight(sharedWeight);
      setUnit(sharedUnit);
      setIsSharedResult(true);
      
      // If we have complete calculated data, set it directly
      if (sharedCategory && sharedHealthRisk) {
        setBMI(parseFloat(sharedBmi));
        setCategory(decodeURIComponent(sharedCategory));
        setHealthRisk(decodeURIComponent(sharedHealthRisk));
        
        // Set recommendations based on category
        const bmiValue = parseFloat(sharedBmi);
        if (bmiValue < 18.5) {
          setRecommendations([
            "Consult with a healthcare provider about healthy weight gain",
            "Focus on nutrient-dense, calorie-rich foods",
            "Consider strength training to build muscle mass",
            "Monitor for any underlying health conditions"
          ]);
        } else if (bmiValue < 25) {
          setRecommendations([
            "Maintain current healthy lifestyle habits",
            "Continue regular physical activity",
            "Focus on balanced nutrition",
            "Regular health check-ups for prevention"
          ]);
        } else if (bmiValue < 30) {
          setRecommendations([
            "Aim to lose 5-10% of body weight gradually",
            "Increase physical activity to 150+ minutes per week",
            "Focus on portion control and nutrient-dense foods",
            "Consider consulting a nutritionist or trainer"
          ]);
        } else {
          setRecommendations([
            "Consult healthcare provider for comprehensive weight management plan",
            "Set realistic, gradual weight loss goals (1-2 lbs per week)",
            "Combine cardiovascular exercise with strength training",
            "Consider professional guidance from nutritionist or dietitian"
          ]);
        }
      } else {
        // Otherwise calculate them normally
        setTimeout(() => calculateBMI(), 100);
      }
    }
  }, [searchParams]);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters, weightInKg;

    if (unit === "metric") {
      heightInMeters = parseFloat(height) / 100; // convert cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Convert feet/inches to meters and pounds to kg
      const feet = Math.floor(parseFloat(height));
      const inches = (parseFloat(height) - feet) * 12;
      heightInMeters = (feet * 12 + inches) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(1));

    // Determine category and health risk
    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setHealthRisk("May indicate malnutrition or other health issues");
      setRecommendations([
        "Consult with a healthcare provider about healthy weight gain",
        "Focus on nutrient-dense, calorie-rich foods",
        "Consider strength training to build muscle mass",
        "Monitor for any underlying health conditions"
      ]);
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
      setHealthRisk("Low risk of weight-related health problems");
      setRecommendations([
        "Maintain current healthy lifestyle habits",
        "Continue regular physical activity",
        "Focus on balanced nutrition",
        "Regular health check-ups for prevention"
      ]);
    } else if (bmiValue < 30) {
      setCategory("Overweight");
      setHealthRisk("Increased risk of heart disease and diabetes");
      setRecommendations([
        "Aim to lose 5-10% of body weight gradually",
        "Increase physical activity to 150+ minutes per week",
        "Focus on portion control and nutrient-dense foods",
        "Consider consulting a nutritionist or trainer"
      ]);
    } else {
      setCategory("Obese");
      setHealthRisk("High risk of serious health complications");
      setRecommendations([
        "Consult healthcare provider for comprehensive weight management plan",
        "Set realistic, gradual weight loss goals (1-2 lbs per week)",
        "Combine cardiovascular exercise with strength training",
        "Consider professional guidance from nutritionist or dietitian"
      ]);
    }
  };

  const clearForm = () => {
    setHeight("");
    setWeight("");
    setBMI(null);
    setCategory("");
    setHealthRisk("");
    setRecommendations([]);
    setIsSharedResult(false);
  };

  const getCategoryColor = () => {
    if (category === "Underweight") return "text-blue-600 bg-blue-100";
    if (category === "Normal weight") return "text-green-600 bg-green-100";
    if (category === "Overweight") return "text-yellow-600 bg-yellow-100";
    if (category === "Obese") return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators' },
    { name: 'BMI Calculator', url: '/calculators/bmi' }
  ];

  const calculatorData = {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) instantly with our free, accurate BMI calculator. Get personalized health insights and recommendations based on your results. Perfect for tracking your health journey in New Zealand.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85',
    url: '/calculators/bmi'
  };

  return (
    <>
      <CalculatorSEO calculator={calculatorData} breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-gray-50">
      <CalculatorHero
        eyebrow="Free calculator"
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index to understand if you're in a healthy weight range."
        badges={[
          { icon: Scale, label: "Body Mass Index" },
          { icon: Heart, label: "Healthy range guide" },
          { icon: Target, label: "Personalised tips" },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Calculate Your BMI</h2>
            
            {/* Unit Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="metric"
                    checked={unit === "metric"}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mr-2"
                  />
                  Metric (kg, cm)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="imperial"
                    checked={unit === "imperial"}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mr-2"
                  />
                  Imperial (lbs, ft)
                </label>
              </div>
            </div>

            {/* Height Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === "metric" ? "(cm)" : "(feet.inches)"}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "170" : "5.8"}
                step={unit === "metric" ? "1" : "0.1"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Calculate Button */}
            <div className="flex space-x-4">
              <button
                onClick={calculateBMI}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                Calculate BMI
              </button>
              <button
                onClick={clearForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results */}
          {bmi && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Your Results</h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">{bmi}</div>
                <div className={`inline-block px-3 py-1 rounded-full font-medium ${getCategoryColor()}`}>
                  {category}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Info className="text-primary-500 mr-2" size={16} />
                  <span className="font-medium">Health Risk Assessment</span>
                </div>
                <p className="text-gray-600">{healthRisk}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Target className="text-green-500 mr-2" size={16} />
                  <span className="font-medium">Recommendations</span>
                </div>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600 text-sm flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <ShareResults 
                calculator="BMI"
                result={bmi}
                data={{
                  height,
                  weight,
                  unit,
                  bmi,
                  category: encodeURIComponent(category),
                  healthRisk: encodeURIComponent(healthRisk)
                }}
              />
            </div>
          )}
        </div>

        {/* BMI Chart */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-6">BMI Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold">Under 18.5</div>
              <div className="text-sm text-gray-600">Underweight</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-bold">18.5 - 24.9</div>
              <div className="text-sm text-gray-600">Normal weight</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-yellow-600 font-bold">25.0 - 29.9</div>
              <div className="text-sm text-gray-600">Overweight</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-red-600 font-bold">30.0+</div>
              <div className="text-sm text-gray-600">Obese</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-primary-50 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="text-primary-600 mr-3 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-primary-900 mb-2">Important Note</h4>
              <p className="text-primary-800 text-sm">
                BMI is a screening tool and doesn't directly measure body fat. It may not be accurate for athletes
                with high muscle mass, pregnant women, or elderly individuals. Consult a healthcare provider for
                personalized health assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8">
          <MedicalDisclaimer calculatorType="BMI calculator" />
        </div>
      </div>
      </div>
    </>
  );
}

export default function BMICalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BMICalculatorContent />
    </Suspense>
  );
}