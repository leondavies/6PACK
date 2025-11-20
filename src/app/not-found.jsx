import Link from 'next/link';
import { ArrowLeft, Home, Search, Calculator, Dumbbell } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | 6Pack NZ',
  description: 'The page you are looking for could not be found. Explore our fitness calculators, workout plans, and expert guidance instead.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  const popularPages = [
    {
      href: '/calculators/bmi',
      icon: Calculator,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index'
    },
    {
      href: '/calculators/macro',
      icon: Calculator,
      title: 'Macro Calculator',
      description: 'Plan your daily macronutrients'
    },
    {
      href: '/workouts',
      icon: Dumbbell,
      title: 'Workout Plans',
      description: 'Expert training programs'
    },
    {
      href: '/articles',
      icon: Search,
      title: 'Fitness Articles',
      description: 'Science-backed guides'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-primary-600 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for. But don't worry - 
              we have plenty of great content to help you on your fitness journey!
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <Link
              href="/"
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <Home className="mr-2" size={16} />
              Go to Homepage
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularPages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left group"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary-600 group-hover:text-primary-700" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-900">
                          {page.title}
                        </h4>
                        <p className="text-sm text-gray-500 group-hover:text-primary-700">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Still can't find what you're looking for?{' '}
              <a
                href="mailto:info@6pack.co.nz"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                Contact our support team
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}