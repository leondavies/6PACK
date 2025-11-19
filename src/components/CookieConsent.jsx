'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');

    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100); // Trigger animation
      }, 1000);
    } else if (consent === 'accepted') {
      // Load GTM if previously accepted
      loadGTM();
    }
  }, []);

  const loadGTM = () => {
    // Only load GTM if it hasn't been loaded yet
    if (window.dataLayer) return;

    // Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GTM-P7M9CTMZ');

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-P7M9CTMZ';
    document.head.appendChild(script);
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGTM();
    closeBanner();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300); // Wait for animation to complete
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleReject}
      />

      {/* Cookie Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Cookie className="text-primary-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cookie Preferences</h3>
              </div>
              <button
                onClick={handleReject}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close cookie banner"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                We use cookies to improve your experience and analyze site traffic.
                By clicking "Accept", you consent to our use of analytics cookies.
                You can change your preferences at any time.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">🍪 What we use cookies for:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li><strong>Analytics:</strong> Google Tag Manager to understand how you use our site</li>
                  <li><strong>Essential:</strong> Remember your calculator results and preferences</li>
                  <li><strong>No tracking:</strong> We don't sell your data or use it for advertising</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                Learn more in our{' '}
                <Link href="/privacy" className="text-primary-600 hover:underline font-semibold">
                  Privacy Policy
                </Link>
                {' '}and{' '}
                <Link href="/terms" className="text-primary-600 hover:underline font-semibold">
                  Terms of Service
                </Link>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                >
                  Accept All Cookies
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Reject Analytics
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Essential cookies will still be used for site functionality
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
