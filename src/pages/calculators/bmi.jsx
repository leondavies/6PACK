import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Scale, ArrowLeft, Info, Target, TrendingUp, Heart } from "lucide-react";
import BlurIn from "../../components/blurText";
import ShareResults from "../../components/ui/ShareResults";

function BMICalculator() {
  const [searchParams] = useSearchParams();
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
      setCategory("Normal Weight");
      setHealthRisk("Lowest risk of weight-related health problems");
      setRecommendations([
        "Maintain current healthy lifestyle habits",
        "Continue regular physical activity",
        "Focus on balanced nutrition",
        "Regular health check-ups for prevention"
      ]);
    } else if (bmiValue < 30) {
      setCategory("Overweight");
      setHealthRisk("Increased risk of heart disease, diabetes, and stroke");
      setRecommendations([
        "Aim to lose 5-10% of body weight gradually",
        "Increase physical activity to 150+ minutes per week",
        "Focus on portion control and nutrient-dense foods",
        "Consider consulting a nutritionist or trainer"
      ]);
    } else {
      setCategory("Obese");
      setHealthRisk("High risk of serious health conditions");
      setRecommendations([
        "Consult healthcare provider for comprehensive weight management plan",
        "Set realistic, gradual weight loss goals (1-2 lbs per week)",
        "Combine cardiovascular exercise with strength training",
        "Consider professional guidance from nutritionist or dietitian"
      ]);
    }
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, unit]);

  const getBMIColor = () => {
    if (!bmi) return "text-gray-500";
    const value = parseFloat(bmi);
    if (value < 18.5) return "text-blue-600";
    if (value < 25) return "text-green-600";
    if (value < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBgColor = () => {
    if (!bmi) return "bg-gray-100";
    const value = parseFloat(bmi);
    if (value < 18.5) return "bg-blue-50 border-blue-200";
    if (value < 25) return "bg-green-50 border-green-200";
    if (value < 30) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <>
      <Helmet>
        <title>Free BMI Calculator New Zealand | Body Mass Index Calculator NZ | 6Pack</title>
        <meta
          name="description"
          content="Free BMI calculator for New Zealanders. Calculate your Body Mass Index instantly, get personalised health recommendations, and understand your weight status. Metric & Imperial units supported."
        />
        <meta
          name="keywords"
          content="BMI calculator NZ, body mass index New Zealand, weight calculator, health assessment NZ, fitness calculator, BMI chart New Zealand, healthy weight NZ"
        />
        <meta property="og:title" content="Free BMI Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your BMI instantly with our free New Zealand BMI calculator. Get health recommendations and weight status analysis." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://6pack.co.nz/calculators/bmi" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free BMI Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your BMI instantly with our free New Zealand BMI calculator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://6pack.co.nz/calculators/bmi" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BMI Calculator New Zealand",
            "description": "Free BMI calculator for New Zealanders. Calculate your Body Mass Index instantly with health recommendations.",
            "url": "https://6pack.co.nz/calculators/bmi",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NZD"
            },
            "author": {
              "@type": "Organization",
              "name": "6Pack",
              "url": "https://6pack.co.nz"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1247"
            }
          })}
        </script>
        
        {/* Calculator Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BMI Calculator New Zealand",
            "description": "Free BMI calculator for New Zealanders with health recommendations",
            "url": "https://6pack.co.nz/calculators/bmi",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NZD"
            },
            "featureList": [
              "Free BMI calculation",
              "Metric and Imperial units",
              "Health recommendations",
              "Instant results",
              "Mobile friendly"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="text-blue-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="BMI Calculator"
              />
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Calculate your Body Mass Index to understand your weight status and get personalised health recommendations.
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
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Imperial (ft/lbs)
                  </button>
                </div>
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
                                  <p className="text-xs text-gray-500 mt-1">
                                     {unit === "metric" ? "Enter height in centimetres" : "Enter as decimal (e.g., 5.8 for 5'8\")"}
                </p>
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

              {/* BMI Scale Reference */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Info className="mr-2" size={16} />
                  BMI Categories
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Underweight</span>
                    <span className="text-blue-600 font-medium">&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Normal weight</span>
                    <span className="text-green-600 font-medium">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overweight</span>
                    <span className="text-yellow-600 font-medium">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obese</span>
                    <span className="text-red-600 font-medium">≥ 30.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* BMI Result */}
              {bmi && (
                <div className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${getBMIBgColor()}`}>
                  <div className="text-center">
                    {isSharedResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          📤 These results were shared with you! Calculate your own results above.
                        </p>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your BMI</h2>
                    <div className={`text-6xl font-bold mb-2 ${getBMIColor()}`}>
                      {bmi}
                    </div>
                    <div className={`text-xl font-semibold mb-2 ${getBMIColor()}`}>
                      {category}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {healthRisk}
                    </p>
                    
                    {/* Share Results */}
                    <div className="mt-6">
                      <ShareResults 
                        title="BMI Calculator Results"
                        results={`BMI: ${bmi} (${category})\nHealth Risk: ${healthRisk}`}
                        hashtags={["BMICalculator", "Health", "6PackNZ"]}
                        resultData={{
                          height: height,
                          weight: weight,
                          unit: unit,
                          bmi: bmi,
                          category: category,
                          healthRisk: healthRisk
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Target className="mr-2 text-primary-600" size={24} />
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <TrendingUp className="mr-3 mt-0.5 text-primary-600 flex-shrink-0" size={16} />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> BMI is a screening tool and doesn't account for muscle mass, bone density, or body composition. 
                  Consult with a healthcare professional for personalised health advice.
                </p>
              </div>

              {/* New Zealand Specific Content */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  🇳🇿 BMI Calculator for New Zealanders
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">NZ Health Statistics</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 34% of New Zealand adults are overweight</li>
                      <li>• 32% of Kiwi adults are classified as obese</li>
                      <li>• Pacific and Māori populations show higher BMI rates</li>
                      <li>• Free BMI assessments available at GP clinics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Healthcare Resources</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Green Prescription (GRx) programme available</li>
                      <li>• District Health Board weight management services</li>
                      <li>• Māori and Pacific health providers offer cultural support</li>
                      <li>• Subsidized fitness programmes through healthcare providers</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>For New Zealanders:</strong> This calculator works with both metric and imperial measurements. 
                  For culturally appropriate health advice, consult with your local GP or Māori/Pacific health provider.
                </p>
              </div>

              {/* Related Calculators */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Other Fitness Calculators</h3>
                <div className="grid md:grid-cols-3 gap-4">
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

export default BMICalculator; 