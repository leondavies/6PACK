import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Target, ArrowLeft, Info, Eye, Calculator, Users, Scale, TrendingUp, Dumbbell, Heart, Apple } from "lucide-react";
import BlurIn from "../../components/blurText";
import ShareResults from "../../components/ui/ShareResults";

function BodyFatCalculator() {
  const [searchParams] = useSearchParams();
  const [method, setMethod] = useState("navy");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedMethod = searchParams.get('method');
    const sharedGender = searchParams.get('gender');
    const sharedUnit = searchParams.get('unit');
    const sharedAge = searchParams.get('age');
    const sharedHeight = searchParams.get('height');
    const sharedWeight = searchParams.get('weight');
    const sharedWaist = searchParams.get('waist');
    const sharedNeck = searchParams.get('neck');
    const sharedHip = searchParams.get('hip');
    const sharedBodyFat = searchParams.get('bodyFat');
    const sharedCategory = searchParams.get('category');
    
    if (sharedBodyFat && sharedWaist && sharedNeck) {
      if (sharedMethod) setMethod(sharedMethod);
      if (sharedGender) setGender(sharedGender);
      if (sharedUnit) setUnit(sharedUnit);
      if (sharedAge) setAge(sharedAge);
      if (sharedHeight) setHeight(sharedHeight);
      if (sharedWeight) setWeight(sharedWeight);
      setWaist(sharedWaist);
      setNeck(sharedNeck);
      if (sharedHip) setHip(sharedHip);
      setIsSharedResult(true);
      
      // Set calculated values directly
      if (sharedCategory) {
        setBodyFat(parseFloat(sharedBodyFat));
        setCategory(decodeURIComponent(sharedCategory));
        
        // Set description based on category  
        const bodyFatValue = parseFloat(sharedBodyFat);
        if (sharedGender === "male") {
          if (bodyFatValue < 6) setDescription("Essential fat levels - may be too low");
          else if (bodyFatValue < 14) setDescription("Athletic body fat range");
          else if (bodyFatValue < 18) setDescription("Fitness body fat range");
          else if (bodyFatValue < 25) setDescription("Average body fat range");
          else setDescription("Above average body fat range");
        } else {
          if (bodyFatValue < 16) setDescription("Essential fat levels - may be too low");
          else if (bodyFatValue < 21) setDescription("Athletic body fat range");
          else if (bodyFatValue < 25) setDescription("Fitness body fat range");
          else if (bodyFatValue < 32) setDescription("Average body fat range");
          else setDescription("Above average body fat range");
        }
      } else {
        // Otherwise calculate normally
        setTimeout(() => calculateBodyFat(), 100);
      }
    }
  }, [searchParams]);

  const calculateNavyMethod = () => {
    if (!height || !waist || !neck || (gender === "female" && !hip)) return null;

    let heightInCm, waistInCm, neckInCm, hipInCm = 0;

    if (unit === "metric") {
      heightInCm = parseFloat(height);
      waistInCm = parseFloat(waist);
      neckInCm = parseFloat(neck);
      if (gender === "female") hipInCm = parseFloat(hip);
    } else {
      heightInCm = parseFloat(height) * 2.54;
      waistInCm = parseFloat(waist) * 2.54;
      neckInCm = parseFloat(neck) * 2.54;
      if (gender === "female") hipInCm = parseFloat(hip) * 2.54;
    }

    let bodyFatPercentage;
    if (gender === "male") {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistInCm - neckInCm) + 0.15456 * Math.log10(heightInCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistInCm + hipInCm - neckInCm) + 0.22100 * Math.log10(heightInCm)) - 450;
    }

    return Math.max(0, bodyFatPercentage);
  };

  const calculateBMIMethod = () => {
    if (!height || !weight || !age) return null;

    let heightInM, weightInKg;

    if (unit === "metric") {
      heightInM = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      heightInM = parseFloat(height) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const bmi = weightInKg / (heightInM * heightInM);
    
    // Deurenberg formula
    let bodyFatPercentage;
    if (gender === "male") {
      bodyFatPercentage = 1.20 * bmi + 0.23 * parseFloat(age) - 16.2;
    } else {
      bodyFatPercentage = 1.20 * bmi + 0.23 * parseFloat(age) - 5.4;
    }

    return Math.max(0, bodyFatPercentage);
  };

  const getBodyFatCategory = (bf, gender) => {
    const categories = {
      male: [
        { min: 0, max: 6, category: "Essential Fat", description: "Very low - Essential for basic physiological functions", color: "text-blue-600" },
        { min: 6, max: 14, category: "Athletes", description: "Athletic level - Typical for athletes", color: "text-green-600" },
        { min: 14, max: 18, category: "Fitness", description: "Fitness level - Good health and appearance", color: "text-green-500" },
        { min: 18, max: 25, category: "Average", description: "Average range for men", color: "text-yellow-600" },
        { min: 25, max: 100, category: "Obese", description: "Above healthy range", color: "text-red-600" }
      ],
      female: [
        { min: 0, max: 12, category: "Essential Fat", description: "Very low - Essential for basic physiological functions", color: "text-blue-600" },
        { min: 12, max: 21, category: "Athletes", description: "Athletic level - Typical for female athletes", color: "text-green-600" },
        { min: 21, max: 25, category: "Fitness", description: "Fitness level - Good health and appearance", color: "text-green-500" },
        { min: 25, max: 32, category: "Average", description: "Average range for women", color: "text-yellow-600" },
        { min: 32, max: 100, category: "Obese", description: "Above healthy range", color: "text-red-600" }
      ]
    };

    const genderCategories = categories[gender];
    const result = genderCategories.find(cat => bf >= cat.min && bf < cat.max);
    return result || genderCategories[genderCategories.length - 1];
  };

  useEffect(() => {
    let result = null;
    
    if (method === "navy") {
      result = calculateNavyMethod();
    } else if (method === "bmi") {
      result = calculateBMIMethod();
    }

    if (result !== null) {
      setBodyFat(result.toFixed(1));
      const categoryInfo = getBodyFatCategory(result, gender);
      setCategory(categoryInfo.category);
      setDescription(categoryInfo.description);
    } else {
      setBodyFat(null);
      setCategory("");
      setDescription("");
    }
  }, [method, gender, unit, age, height, weight, waist, neck, hip]);

  const getBodyFatColor = () => {
    if (!bodyFat) return "text-gray-500";
    const categoryInfo = getBodyFatCategory(parseFloat(bodyFat), gender);
    return categoryInfo.color;
  };

  return (
    <>
      <Helmet>
        <title>Free Body Fat Calculator New Zealand | Body Fat Percentage NZ | 6Pack</title>
        <meta
          name="description"
          content="Free body fat calculator for New Zealanders. Calculate your body fat percentage using US Navy method or BMI formula. Get insights into your body composition and health status."
        />
        <meta
          name="keywords"
          content="body fat calculator NZ, body fat percentage New Zealand, US Navy method calculator, body composition NZ, fitness calculator New Zealand"
        />
        <meta property="og:title" content="Free Body Fat Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your body fat percentage with our free New Zealand body fat calculator. Get body composition insights." />
        <meta property="og:url" content="https://6pack.co.nz/calculators/body-fat" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Body Fat Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your body fat percentage with our free NZ calculator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://6pack.co.nz/calculators/body-fat" />
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
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-purple-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="Body Fat Calculator"
              />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your body fat percentage using proven methods. Monitor your body composition 
                and track changes in your fitness journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Body Fat</h2>
              
              {/* Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="navy"
                      checked={method === "navy"}
                      onChange={(e) => setMethod(e.target.value)}
                      className="mr-3 text-primary-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">US Navy Method</div>
                      <div className="text-sm text-gray-500">Most accurate - uses body measurements</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="bmi"
                      checked={method === "bmi"}
                      onChange={(e) => setMethod(e.target.value)}
                      className="mr-3 text-primary-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">BMI-Based Method</div>
                      <div className="text-sm text-gray-500">Quick estimate using height, weight, and age</div>
                    </div>
                  </label>
                </div>
              </div>

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

              {/* Basic Measurements */}
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height {unit === "metric" ? "(cm)" : "(inches)"}
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === "metric" ? "170" : "68"}
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {(method === "bmi") && (
                  <>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
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
                        min="15"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Navy Method Measurements */}
              {method === "navy" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <Eye className="mr-2 mt-1 text-blue-600 flex-shrink-0" size={16} />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Measurement Tips:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Measure in the morning before eating</li>
                          <li>• Keep tape measure level and snug but not tight</li>
                          <li>• Take measurements at widest points</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="neck" className="block text-sm font-medium text-gray-700 mb-2">
                      Neck Circumference {unit === "metric" ? "(cm)" : "(inches)"}
                    </label>
                    <input
                      type="number"
                      id="neck"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value)}
                      placeholder={unit === "metric" ? "38" : "15"}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Measure at the largest point</p>
                  </div>

                  <div>
                    <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-2">
                      Waist Circumference {unit === "metric" ? "(cm)" : "(inches)"}
                    </label>
                    <input
                      type="number"
                      id="waist"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      placeholder={unit === "metric" ? "85" : "33"}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {gender === "male" ? "Measure at navel level" : "Measure at narrowest point"}
                    </p>
                  </div>

                  {gender === "female" && (
                    <div>
                      <label htmlFor="hip" className="block text-sm font-medium text-gray-700 mb-2">
                        Hip Circumference {unit === "metric" ? "(cm)" : "(inches)"}
                      </label>
                      <input
                        type="number"
                        id="hip"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder={unit === "metric" ? "95" : "37"}
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Measure at widest point</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Body Fat Result */}
              {bodyFat && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center">
                    {isSharedResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          📤 These results were shared with you! Calculate your own results above.
                        </p>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Body Fat</h2>
                    <div className={`text-6xl font-bold mb-2 ${getBodyFatColor()}`}>
                      {bodyFat}%
                    </div>
                    <div className={`text-xl font-semibold mb-2 ${getBodyFatColor()}`}>
                      {category}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {description}
                    </p>
                    
                    {/* Share Results */}
                    <div className="mt-6">
                      <ShareResults 
                        title="Body Fat Calculator Results"
                        results={`Body Fat: ${bodyFat}% (${category})\n${description}`}
                        hashtags={["BodyFatCalculator", "Fitness", "6PackNZ"]}
                        resultData={{
                          method: method,
                          gender: gender,
                          unit: unit,
                          age: age,
                          height: height,
                          weight: weight,
                          waist: waist,
                          neck: neck,
                          hip: hip,
                          bodyFat: bodyFat,
                          category: category
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Body Fat Categories Reference */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2 text-primary-600" size={24} />
                  Body Fat Categories ({gender === "male" ? "Men" : "Women"})
                </h3>
                
                <div className="space-y-3">
                  {getBodyFatCategory(0, gender) && 
                    [{min: 0, max: gender === "male" ? 6 : 12, category: "Essential Fat", color: "text-blue-600"},
                     {min: gender === "male" ? 6 : 12, max: gender === "male" ? 14 : 21, category: "Athletes", color: "text-green-600"},
                     {min: gender === "male" ? 14 : 21, max: gender === "male" ? 18 : 25, category: "Fitness", color: "text-green-500"},
                     {min: gender === "male" ? 18 : 25, max: gender === "male" ? 25 : 32, category: "Average", color: "text-yellow-600"},
                     {min: gender === "male" ? 25 : 32, max: 100, category: "Obese", color: "text-red-600"}
                    ].map((cat, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <span className="font-medium">{cat.category}</span>
                        <span className={`font-semibold ${cat.color}`}>
                          {cat.max === 100 ? `${cat.min}%+` : `${cat.min}-${cat.max}%`}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Method Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Info className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {method === "navy" ? "US Navy Method" : "BMI-Based Method"}
                    </h3>
                    <div className="text-sm text-blue-800 space-y-1">
                      {method === "navy" ? (
                        <>
                          <p>• Most accurate method using body circumference measurements</p>
                          <p>• Developed by the US Navy for body composition assessment</p>
                          <p>• Accounts for body shape differences between individuals</p>
                          <p>• Accuracy: ±3-4% when measurements are taken correctly</p>
                        </>
                      ) : (
                        <>
                          <p>• Quick estimation using height, weight, and age</p>
                          <p>• Uses the Deurenberg formula for body fat prediction</p>
                          <p>• Less accurate than circumference-based methods</p>
                          <p>• Best used as a general screening tool</p>
                        </>
                      )}
                    </div>
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

export default BodyFatCalculator; 