'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';

export default function ShopPage() {
  const [cart, setCart] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              6Pack Store
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Premium supplements and fitness gear to support your transformation
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white rounded-lg shadow-sm p-12">
          <ShoppingCart className="mx-auto text-primary-600 mb-6" size={64} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Store Coming Soon
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're working hard to bring you the best fitness supplements and equipment. 
            Stay tuned for our grand opening!
          </p>
          <Link
            href="/articles"
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Browse Fitness Articles Instead
          </Link>
        </div>
      </div>
    </div>
  );
}