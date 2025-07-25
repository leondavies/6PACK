import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Check, Star, Gift, Truck } from "lucide-react";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const [, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "starter",
      name: "Starter Pack",
      price: 49,
      description: "Perfect for casual beer enthusiasts",
      beers: 4,
      features: [
        "4 carefully selected craft beers",
        "Tasting notes & brewery info",
        "Free nationwide shipping",
        "Cancel anytime"
      ]
    },
    {
      id: "premium",
      name: "Premium Selection",
      price: 69,
      description: "Most popular choice for beer lovers",
      beers: 6,
      popular: true,
      features: [
        "6 premium craft beers",
        "Mix of styles & limited releases",
        "Detailed tasting guide",
        "Brewery spotlight stories",
        "Free nationwide shipping",
        "Member-only discounts",
        "Cancel anytime"
      ]
    },
    {
      id: "connoisseur",
      name: "Connoisseur Collection",
      price: 89,
      description: "For the serious craft beer aficionado",
      beers: 8,
      features: [
        "8 rare & exclusive craft beers",
        "Limited edition releases",
        "Barrel-aged & specialty brews",
        "Monthly virtual tasting session",
        "Exclusive brewery merchandise",
        "Priority access to new releases",
        "Free nationwide shipping",
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
        <title>Beer Subscription Plans - 6Pack.co.nz</title>
        <meta
          name="description"
          content="Choose from our craft beer subscription plans. Get premium New Zealand craft beers delivered monthly. Starting from $49/month."
        />
      </Helmet>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Monthly Beer Subscriptions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover New Zealand's finest craft beers delivered to your door every month. 
              Expertly curated selections from the country's best breweries.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? "ring-2 ring-amber-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
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
                  <p className="text-sm text-gray-500">{plan.beers} beers per month</p>
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
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  Each month features beers from different regions and styles, 
                  carefully selected by our beer experts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">
                  All subscription boxes include free nationwide shipping. 
                  Delivered fresh to your door every month.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Access</h3>
                <p className="text-gray-600">
                  Get first access to limited releases and brewery collaborations 
                  not available in stores.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">When will I receive my first box?</h3>
                <p className="text-gray-600">
                  Your first box ships within 2-3 business days of subscription. 
                  Subsequent boxes ship on the same day each month.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">
                  Absolutely! You can pause, skip, or cancel your subscription at any time 
                  through your account dashboard.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you ship nationwide?</h3>
                <p className="text-gray-600">
                  Yes! We deliver to all major cities and towns across New Zealand. 
                  Remote areas may have extended delivery times.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I gift a subscription?</h3>
                <p className="text-gray-600">
                  Yes! Gift subscriptions are available for 3, 6, or 12 months. 
                  Perfect for the beer lover in your life.
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