import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TrendingUp, ArrowLeft, Info, Target, Scale, Users, Heart, Dumbbell, Apple } from "lucide-react";
import BlurIn from "../../components/blurText";
import ShareResults from "../../components/ui/ShareResults";

function IdealWeightCalculator() {
  const [searchParams] = useSearchParams();
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [bodyFrame, setBodyFrame] = useState("medium");
  const [idealWeights, setIdealWeights] = useState(null);
  const [averageWeight, setAverageWeight] = useState(null);
  const [isSharedResult, setIsSharedResult] = useState(false);

  // Load shared results from URL parameters on component mount
  useEffect(() => {
    const sharedHeight = searchParams.get('height');
    const sharedGender = searchParams.get('gender');
    const sharedUnit = searchParams.get('unit');
    const sharedBodyFrame = searchParams.get('bodyFrame');
    const sharedAverageWeight = searchParams.get('averageWeight');
    
    if (sharedHeight && sharedAverageWeight) {
      setHeight(sharedHeight);
      if (sharedGender) setGender(sharedGender);
      if (sharedUnit) setUnit(sharedUnit);
      if (sharedBodyFrame) setBodyFrame(sharedBodyFrame);
      setIsSharedResult(true);
      
      // Set calculated values directly
      setAverageWeight(parseFloat(sharedAverageWeight));
      
      // Reconstruct ideal weights (approximate range around average)
      const avgWeight = parseFloat(sharedAverageWeight);
      setIdealWeights({
        low: Math.round(avgWeight * 0.9),
        medium: Math.round(avgWeight),
        high: Math.round(avgWeight * 1.1)
      });
    }
  }, [searchParams]);

  const calculateIdealWeights = () => {
    if (!height) return;

    let heightInCm, heightInInches;

    if (unit === "metric") {
      heightInCm = parseFloat(height);
      heightInInches = heightInCm / 2.54;
    } else {
      heightInInches = parseFloat(height);
      heightInCm = heightInInches * 2.54;
    }

    // Robinson Formula (1983)
    let robinson;
    if (gender === "male") {
      robinson = 52 + 1.9 * (heightInInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInInches - 60);
    }

    // Miller Formula (1983)
    let miller;
    if (gender === "male") {
      miller = 56.2 + 1.41 * (heightInInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInInches - 60);
    }

    // Devine Formula (1974)
    let devine;
    if (gender === "male") {
      devine = 50 + 2.3 * (heightInInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInInches - 60);
    }

    // Hamwi Formula (1964)
    let hamwi;
    if (gender === "male") {
      hamwi = 48 + 2.7 * (heightInInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInInches - 60);
    }

    // Healthy BMI Range (18.5 - 24.9)
    const heightInMeters = heightInCm / 100;
    const minHealthyWeight = 18.5 * heightInMeters * heightInMeters;
    const maxHealthyWeight = 24.9 * heightInMeters * heightInMeters;

    const weights = {
      robinson: Math.max(30, robinson),
      miller: Math.max(30, miller),
      devine: Math.max(30, devine),
      hamwi: Math.max(30, hamwi),
      bmiMin: minHealthyWeight,
      bmiMax: maxHealthyWeight
    };

    // Convert to pounds if imperial
    if (unit === "imperial") {
      Object.keys(weights).forEach(key => {
        weights[key] = weights[key] * 2.20462;
      });
    }

    setIdealWeights(weights);

    // Calculate average of formula-based weights
    const formulaWeights = [weights.robinson, weights.miller, weights.devine, weights.hamwi];
    const average = formulaWeights.reduce((sum, weight) => sum + weight, 0) / formulaWeights.length;
    setAverageWeight(average);
  };

  useEffect(() => {
    if (height) {
      calculateIdealWeights();
    }
  }, [height, gender, unit]);

  const getFrameAdjustment = () => {
    const adjustments = {
      small: -0.1,
      medium: 0,
      large: 0.1
    };
    return adjustments[bodyFrame];
  };

  const getAdjustedWeight = (weight) => {
    const adjustment = getFrameAdjustment();
    return weight * (1 + adjustment);
  };

  const getFrameDescription = () => {
    const descriptions = {
      small: {
        description: "Narrow shoulders, small wrist, low muscle mass tendency",
        characteristics: ["Wrist circumference < 16cm (6.25\") for women, < 17cm (6.75\") for men", "Small bone structure", "Naturally lean build"]
      },
      medium: {
        description: "Average build, proportional features",
        characteristics: ["Wrist circumference 16-17cm (6.25-6.75\") for women, 17-19cm (6.75-7.5\") for men", "Average bone structure", "Most common body frame"]
      },
      large: {
        description: "Broad shoulders, large wrist, higher muscle mass potential",
        characteristics: ["Wrist circumference > 17cm (6.75\") for women, > 19cm (7.5\") for men", "Large bone structure", "Naturally athletic build"]
      }
    };
    return descriptions[bodyFrame];
  };

  const frameDescription = getFrameDescription();

  return (
    <>
      <Helmet>
        <title>Free Ideal Weight Calculator New Zealand | Target Weight NZ | 6Pack</title>
        <meta
          name="description"
          content="Free ideal weight calculator for New Zealanders. Calculate your ideal weight using multiple proven formulas. Get realistic weight targets for Kiwis based on height, gender, and body frame."
        />
        <meta
          name="keywords"
          content="ideal weight calculator NZ, target weight New Zealand, healthy weight range calculator, body frame calculator NZ, weight goal calculator"
        />
        <meta property="og:title" content="Free Ideal Weight Calculator New Zealand | 6Pack" />
        <meta property="og:description" content="Calculate your ideal weight with our free New Zealand ideal weight calculator. Get realistic weight targets." />
        <meta property="og:url" content="https://www.6pack.co.nz/calculators/ideal-weight" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Ideal Weight Calculator New Zealand | 6Pack" />
        <meta name="twitter:description" content="Calculate your ideal weight with our free NZ calculator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://www.6pack.co.nz/calculators/ideal-weight" />
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
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-indigo-600" size={32} />
              </div>
              <BlurIn
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                word="Ideal Weight Calculator"
              />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find your ideal weight range using multiple scientific formulas. Set realistic goals 
                based on your height, gender, and body frame.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Ideal Weight</h2>
              
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
                    Imperial (in/lbs)
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

              {/* Height Input */}
              <div className="mb-6">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height {unit === "metric" ? "(cm)" : "(inches)"}
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "170" : "67"}
                  step="0.1"
                  min={unit === "metric" ? "100" : "39"}
                  max={unit === "metric" ? "250" : "98"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Body Frame Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Frame Size
                </label>
                <div className="space-y-3">
                  {["small", "medium", "large"].map(frame => (
                    <label key={frame} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="frame"
                        value={frame}
                        checked={bodyFrame === frame}
                        onChange={(e) => setBodyFrame(e.target.value)}
                        className="mr-3 mt-1 text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900 capitalize">{frame} Frame</div>
                        <div className="text-sm text-gray-500">
                          {frame === "small" && "Narrow build, small wrist"}
                          {frame === "medium" && "Average build, proportional"}
                          {frame === "large" && "Broad build, large wrist"}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Frame Information */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="font-medium text-indigo-900 mb-2 flex items-center">
                  <Users className="mr-2" size={16} />
                  {frameDescription.description}
                </h3>
                <ul className="text-sm text-indigo-800 space-y-1">
                  {frameDescription.characteristics.map((char, index) => (
                    <li key={index}>• {char}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Average Ideal Weight */}
              {averageWeight && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center">
                    {isSharedResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          📤 These results were shared with you! Calculate your own results above.
                        </p>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Ideal Weight</h2>
                    <div className="text-6xl font-bold text-indigo-600 mb-2">
                      {Math.round(getAdjustedWeight(averageWeight) * 10) / 10}
                    </div>
                    <p className="text-gray-600 mb-4">{unit === "metric" ? "kilograms" : "pounds"}</p>
                    
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-indigo-800">
                        Adjusted for {bodyFrame} body frame
                        {bodyFrame !== "medium" && ` (${bodyFrame === "small" ? "-10%" : "+10%"})`}
                      </p>
                    </div>
                    
                    {/* Share Results */}
                    <div className="mt-6">
                      <ShareResults 
                        title="Ideal Weight Calculator Results"
                        results={`Ideal Weight: ${Math.round(getAdjustedWeight(averageWeight) * 10) / 10}${unit === "metric" ? "kg" : "lbs"}\nHeight: ${height}${unit === "metric" ? "cm" : "in"}\nBody Frame: ${bodyFrame}`}
                        hashtags={["IdealWeight", "HealthGoals", "6PackNZ"]}
                        resultData={{
                          height: height,
                          gender: gender,
                          unit: unit,
                          bodyFrame: bodyFrame,
                          averageWeight: averageWeight
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Formula Breakdown */}
              {idealWeights && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="mr-2 text-primary-600" size={24} />
                    Weight Ranges by Formula
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Formula-based weights */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Robinson (1983)</h4>
                        <div className="text-2xl font-bold text-indigo-600">
                          {Math.round(getAdjustedWeight(idealWeights.robinson) * 10) / 10}
                        </div>
                        <p className="text-xs text-gray-500">Most commonly used</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Miller (1983)</h4>
                        <div className="text-2xl font-bold text-indigo-600">
                          {Math.round(getAdjustedWeight(idealWeights.miller) * 10) / 10}
                        </div>
                        <p className="text-xs text-gray-500">Conservative estimate</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Devine (1974)</h4>
                        <div className="text-2xl font-bold text-indigo-600">
                          {Math.round(getAdjustedWeight(idealWeights.devine) * 10) / 10}
                        </div>
                        <p className="text-xs text-gray-500">Medical standard</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Hamwi (1964)</h4>
                        <div className="text-2xl font-bold text-indigo-600">
                          {Math.round(getAdjustedWeight(idealWeights.hamwi) * 10) / 10}
                        </div>
                        <p className="text-xs text-gray-500">Clinical use</p>
                      </div>
                    </div>

                    {/* BMI-based range */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center">
                        <Scale className="mr-2" size={16} />
                        Healthy BMI Range (18.5 - 24.9)
                      </h4>
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {Math.round(idealWeights.bmiMin * 10) / 10}
                          </div>
                          <p className="text-xs text-green-700">Minimum</p>
                        </div>
                        <div className="text-gray-400">—</div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {Math.round(idealWeights.bmiMax * 10) / 10}
                          </div>
                          <p className="text-xs text-green-700">Maximum</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding Your Results</h3>
                
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">About the Formulas:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Robinson:</strong> Most widely accepted modern formula</li>
                      <li>• <strong>Miller:</strong> Tends to give slightly lower weights</li>
                      <li>• <strong>Devine:</strong> Originally developed for medication dosing</li>
                      <li>• <strong>Hamwi:</strong> Quick estimation method for clinical use</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Important Considerations:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• These formulas estimate weight for average body composition</li>
                      <li>• Athletes with high muscle mass may weigh more and still be healthy</li>
                      <li>• Body frame size significantly affects ideal weight</li>
                      <li>• Focus on overall health, not just the number on the scale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Info className="mr-3 mt-1 text-yellow-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Note</h3>
                    <p className="text-sm text-yellow-800">
                      These calculations provide general guidelines. Your ideal weight depends on many factors 
                      including muscle mass, bone density, overall health, and personal fitness goals. 
                      Consult with a healthcare professional for personalised advice.
                    </p>
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

export default IdealWeightCalculator; 