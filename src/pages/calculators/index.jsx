
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calculator, Heart, Scale, Dumbbell, Apple, Target, TrendingUp, Activity } from "lucide-react";
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
        <title>Fitness Calculators - 6Pack | BMI, BMR, Body Fat & More</title>
        <meta
          name="description"
          content="Free fitness calculators including BMI, BMR, body fat percentage, 1RM, macro calculator and more. Plan your fitness journey with accurate calculations."
        />
        <meta
          name="keywords"
          content="fitness calculators, BMI calculator, BMR calculator, body fat calculator, 1RM calculator, macro calculator, ideal weight calculator"
        />
        <meta property="og:title" content="Fitness Calculators - 6Pack" />
        <meta
          property="og:description"
          content="Free fitness calculators to help plan your transformation journey. Calculate BMI, BMR, body fat percentage and more."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calculator className="text-primary-600" size={40} />
            </div>
            <BlurIn
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
              word="Fitness Calculators"
            />
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Take the guesswork out of your fitness journey with our collection of science-based calculators. 
              Track your progress, set realistic goals, and optimise your training and nutrition.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Activity className="mr-2" size={16} />
                <span>Science-backed formulas</span>
              </div>
              <div className="flex items-center">
                <Target className="mr-2" size={16} />
                <span>Personalised results</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="mr-2" size={16} />
                <span>Track your progress</span>
              </div>
            </div>
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Calculating?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Choose any calculator above to begin tracking your fitness metrics and planning your transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculators/bmi"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start with BMI Calculator
            </Link>
            <Link
              to="/articles"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Read Fitness Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Calculators; 