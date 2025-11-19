import Link from 'next/link';
import { ArrowLeft, Heart, Target, Users, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us | 6Pack NZ',
  description: 'Learn about 6Pack NZ - New Zealand\'s premier fitness and training platform dedicated to helping Kiwis achieve their fitness goals.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About 6Pack NZ</h1>
          <p className="text-xl text-gray-600 mb-12">
            New Zealand's Premier Fitness & Training Platform
          </p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-lg">
              6Pack NZ is dedicated to making evidence-based fitness guidance accessible to all New Zealanders. We believe everyone deserves access to quality fitness tools and expert advice, regardless of their budget or location.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-lg">
                <Heart className="text-primary-600 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p>To become the most trusted fitness resource for New Zealanders, empowering every Kiwi to achieve their health and fitness goals through science-backed tools and education.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <Target className="text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Evidence-based and scientifically accurate</li>
                  <li>Accessible to all New Zealanders</li>
                  <li>Honest and transparent</li>
                  <li>Focused on sustainable results</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Free Calculators</h3>
                <p>6 science-backed fitness calculators including BMI, BMR, Macro, Body Fat, 1RM, and Ideal Weight calculators - all completely free.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Expert Content</h3>
                <p>29+ comprehensive articles covering muscle building, weight loss, nutrition, and training strategies written by fitness professionals.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Workout Plans</h3>
                <p>Detailed workout guides for all fitness levels - from beginners to advanced athletes, for home and gym training.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Why Choose 6Pack NZ?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg mr-4">
                  <Award className="text-primary-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Science-Backed</h3>
                  <p>All our calculators use validated formulas and our content is based on peer-reviewed research. No fads or gimmicks.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg mr-4">
                  <Users className="text-primary-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">NZ-Focused</h3>
                  <p>Content tailored specifically for New Zealanders with local examples, references, and cultural context.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg mr-4">
                  <Heart className="text-primary-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
                  <p>All tools and resources are 100% free. No hidden costs, no sign-up required, no premium paywalls.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Commitment</h2>
            <p className="text-lg">
              We're committed to maintaining the highest standards of accuracy, transparency, and user privacy. Your trust is our priority, and we continually update our content to reflect the latest fitness science and research.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-8">
              <p className="text-lg font-semibold text-gray-900">
                Join thousands of Kiwis already transforming their fitness journey with 6Pack NZ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
