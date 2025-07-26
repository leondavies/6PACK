
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calculator, Heart, Scale, Dumbbell, Apple, Target, TrendingUp, Activity, ArrowRight } from "lucide-react";
import BlurIn from "../../components/blurText";

const calculators = [
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to understand if you're in a healthy weight range",
    icon: Scale,
    color: "bg-blue-500",
    benefits: "Track weight status and health risks"
  },
  {
    id: "bmr", 
    title: "BMR Calculator",
    description: "Determine your Basal Metabolic Rate - calories your body burns at rest",
    icon: Heart,
    color: "bg-red-500",
    benefits: "Plan your daily calorie needs"
  },
  {
    id: "body-fat",
    title: "Body Fat Calculator", 
    description: "Estimate your body fat percentage using body measurements",
    icon: Target,
    color: "bg-purple-500",
    benefits: "Monitor body composition changes"
  },
  {
    id: "one-rep-max",
    title: "1RM Calculator",
    description: "Calculate your one-rep max for any exercise to plan your training",
    icon: Dumbbell,
    color: "bg-orange-500", 
    benefits: "Optimise strength training programmes"
  },
  {
    id: "macro",
    title: "Macro Calculator",
    description: "Calculate your daily macronutrient needs for your fitness goals",
    icon: Apple,
    color: "bg-green-500",
    benefits: "Perfect your nutrition strategy"
  },
  {
    id: "ideal-weight",
    title: "Ideal Weight Calculator",
    description: "Find your ideal weight range based on height and body frame",
    icon: TrendingUp,
    color: "bg-indigo-500",
    benefits: "Set realistic weight goals"
  }
];

function Calculators() {
  return (
    <>
      <Helmet>
        <title>Free Fitness Calculators New Zealand | BMI, BMR, Body Fat Calculator NZ | 6Pack</title>
        <meta
          name="description"
          content="Free fitness calculators for New Zealanders. Calculate BMI, BMR, body fat percentage, 1RM, macros and ideal weight. Science-based tools for Kiwis planning their fitness journey."
        />
        <meta
          name="keywords"
          content="fitness calculators NZ, BMI calculator New Zealand, BMR calculator NZ, body fat calculator New Zealand, 1RM calculator NZ, macro calculator New Zealand, health calculators NZ"
        />
        <meta property="og:title" content="Free Fitness Calculators New Zealand | 6Pack" />
        <meta
          property="og:description"
          content="Free fitness calculators for New Zealand. Calculate BMI, BMR, body fat percentage and more with our science-based tools."
        />
        <meta property="og:url" content="https://6pack.co.nz/calculators" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Fitness Calculators New Zealand | 6Pack" />
        <meta name="twitter:description" content="Free fitness calculators for NZ. Calculate BMI, BMR, body fat and more." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop&fm=webp&q=85" />
        <link rel="canonical" href="https://6pack.co.nz/calculators" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&fm=webp&q=85"
            alt="Fitness calculations and tracking"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <BlurIn
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              word="Fitness Calculators"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the guesswork out of your fitness journey with our collection of science-based calculators. 
              Track your progress, set realistic goals, and optimise your training and nutrition.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Activity className="mr-2" size={16} />
                Science-backed formulas
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Personalised results
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <TrendingUp className="mr-2" size={16} />
                Track your progress
              </div>
            </div>

            <Link
              to="/calculators/bmi"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <Calculator className="mr-2" size={20} />
              Start Calculating Now
            </Link>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each calculator is designed to help you make informed decisions about your fitness and health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map(calculator => {
              const IconComponent = calculator.icon;
              return (
                <Link
                  key={calculator.id}
                  to={`/calculators/${calculator.id}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className={`${calculator.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-height-relaxed">
                      {calculator.description}
                    </p>
                    <div className="bg-gray-50 -mx-8 -mb-8 px-8 py-4 mt-6">
                      <p className="text-sm font-medium text-gray-700">
                        ✨ {calculator.benefits}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Use Our Calculators?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make data-driven decisions for your fitness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Realistic Goals</h3>
              <p className="text-gray-600">Use accurate calculations to set achievable fitness and weight goals based on your current stats.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your transformation with consistent measurements and see how your body composition changes over time.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimise Training</h3>
              <p className="text-gray-600">Use precise calculations to plan your workouts, nutrition, and recovery for maximum results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Calculating?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose any calculator above to begin tracking your fitness metrics and planning your transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculators/bmi"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start with BMI Calculator
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/workouts"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
            >
              Try Our Workouts
              <Target className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculators; 