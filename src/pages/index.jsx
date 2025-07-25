import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, Truck, Award, Users, Gift } from "lucide-react";
import BlurIn from "../components/blurText";
import ImageWithFallback from "../components/ui/ImageWithFallback";

function Index() {
  return (
    <>
      <Helmet>
        <title>6Pack.co.nz - New Zealand's Premium Craft Beer Hub</title>
        <meta
          name="description"
          content="Discover New Zealand's finest craft beers. Monthly subscriptions, individual purchases, and brewery experiences delivered nationwide."
        />
        <meta
          name="keywords"
          content="craft beer New Zealand, beer subscription, NZ breweries, beer delivery, craft beer box"
        />
        <meta property="og:title" content="6Pack.co.nz - New Zealand's Premium Craft Beer Hub" />
        <meta
          property="og:description"
          content="Discover New Zealand's finest craft beers. Monthly subscriptions, individual purchases, and brewery experiences delivered nationwide."
        />
        <meta property="og:image" content="/6pack.webp" />
        <meta property="og:url" content="https://6pack.co.nz" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "6Pack.co.nz",
            description: "New Zealand's Premium Craft Beer Hub",
            url: "https://6pack.co.nz",
            logo: "/6pack.webp"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <BlurIn
                className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                word="New Zealand's Premier Craft Beer Experience"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover exceptional craft beers from across New Zealand. From monthly 
                curated selections to individual bottles, we bring the best breweries 
                straight to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/subscription"
                  className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center group"
                >
                  Start Subscription
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/shop"
                  className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors text-center"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl h-96 flex items-center justify-center p-8 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop&crop=center"
                alt="Premium Craft Beer Collection"
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose 6Pack.co.nz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about connecting beer lovers with New Zealand's 
              most exceptional craft breweries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
              <p className="text-gray-600">Free delivery on orders over $99. Fresh beers delivered to your door.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Award-Winning Selection</h3>
              <p className="text-gray-600">Carefully curated beers from New Zealand's top breweries.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Curation</h3>
              <p className="text-gray-600">Our beer experts handpick every bottle for quality and uniqueness.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Gifts</h3>
              <p className="text-gray-600">Corporate gifts and special occasion packages available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discover Your Next Favorite Beer?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of beer enthusiasts exploring New Zealand's craft beer scene.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subscription"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Start Monthly Subscription
            </Link>
            <Link
              to="/brewery"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Explore Breweries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
