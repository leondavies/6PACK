import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Check, Star, Zap, Users, Target } from "lucide-react";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const [, setSelectedPlan] = useState("transform");

  const plans = [
    {
      id: "foundation",
      name: "Foundation Plan",
      price: 39,
      description: "Perfect for fitness beginners",
      duration: "12 weeks",
      features: [
        "12-week beginner program",
        "Basic workout plans",
        "Nutrition guidelines", 
        "Progress tracking tools",
        "Email support",
        "Cancel anytime"
      ]
    },
    {
      id: "transform",
      name: "Transform Plan",
      price: 59,
      description: "Most popular for serious results",
      duration: "16 weeks",
      popular: true,
      features: [
        "16-week transformation program",
        "Advanced workout plans",
        "Custom meal plans",
        "Video exercise library",
        "Weekly check-ins",
        "Priority support",
        "Supplement recommendations",
        "Cancel anytime"
      ]
    },
    {
      id: "elite",
      name: "Elite Coaching",
      price: 89,
      description: "For serious athletes and advanced trainers",
      duration: "24 weeks",
      features: [
        "24-week elite program",
        "1-on-1 coaching sessions",
        "Personalized training plans",
        "Custom nutrition protocols",
        "Weekly body composition tracking",
        "Unlimited coach messaging",
        "Supplement stack included",
        "Cancel anytime"
      ]
    }
  ];

  const handleSubscribe = async (planId) => {
    setSelectedPlan(planId);
    
    try {
      // Mock Stripe integration for demo
      if (window.mockStripeCheckout) {
        toast.loading("Redirecting to checkout...", { duration: 2000 });
        setTimeout(() => {
          toast.success("Payment successful! Welcome to 6Pack!");
        }, 2000);
        return;
      }

      // Real Stripe integration (uncomment when backend is ready)
      // await createSubscriptionCheckout(planId);
    } catch (error) {
      toast.error("Failed to create checkout session. Please try again.");
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Fitness Coaching Programs - 6Pack</title>
        <meta
          name="description"
          content="Transform your body with our expert fitness coaching programs. Personalized training plans, nutrition guidance, and 24/7 support. Starting from $39/month."
        />
        <meta
          name="keywords"
          content="fitness coaching, personal training, workout plans, nutrition coaching, fitness transformation"
        />
      </Helmet>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Fitness Coaching Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your body with expert-guided fitness programs designed by New Zealand's 
              top trainers. Get personalized coaching, custom plans, and continuous support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? "ring-2 ring-primary-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="mr-1" size={16} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">{plan.duration} program</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Start Program
                </button>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
                <p className="text-gray-600">
                  Custom workout and nutrition plans tailored to your goals, 
                  fitness level, and preferences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Coaching</h3>
                <p className="text-gray-600">
                  Direct access to certified trainers and nutritionists 
                  for guidance and support throughout your journey.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Science-backed training methods and progress tracking 
                  to ensure you achieve your fitness transformation goals.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">When does my program start?</h3>
                <p className="text-gray-600">
                  Your personalized program begins within 24 hours of enrollment. 
                  You'll receive your custom plan and coaching team assignment immediately.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">
                  Absolutely! You can pause or cancel your coaching program at any time 
                  through your account dashboard with no cancellation fees.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do I need gym equipment?</h3>
                <p className="text-gray-600">
                  Programs can be tailored for home workouts, gym access, or minimal equipment. 
                  We'll customize your plan based on your available resources.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What if I'm a complete beginner?</h3>
                <p className="text-gray-600">
                  Perfect! Our Foundation Plan is specifically designed for beginners. 
                  We'll start you with proper form and gradually build your fitness level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;