import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Bell } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | 6Pack NZ',
  description: 'Learn how 6Pack NZ collects, uses, and protects your personal information. We are committed to protecting your privacy and complying with New Zealand privacy laws.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.6pack.co.nz/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-center mb-6">
            <Shield className="text-primary-600 mr-4" size={48} />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              6Pack NZ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.6pack.co.nz" className="text-primary-600 hover:underline">www.6pack.co.nz</a> and use our fitness tools and services.
            </p>
            <p className="text-gray-700 mb-4">
              We comply with the New Zealand Privacy Act 2020 and take our responsibilities seriously regarding your personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 mb-4">When you use our calculators and tools, you may provide:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Personal measurements (height, weight, age, gender)</li>
              <li>Fitness goals and activity levels</li>
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Contact information (if you reach out to us)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 mb-4">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our site (Google Analytics, Vercel Analytics)</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and calculator results</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide and improve our fitness calculators and tools</li>
              <li>Personalize your experience on our website</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns and improve our services</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-700 mb-4">
              Your calculator results and preferences are stored locally in your browser using localStorage technology. This means:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Data stays on your device and is not transmitted to our servers</li>
              <li>Clearing your browser data will delete saved results</li>
              <li>We cannot access or recover your locally stored data</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For data we do collect (analytics, emails), we implement industry-standard security measures including encryption, secure servers, and regular security audits.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
              <li><strong>Google Tag Manager:</strong> Managing marketing and analytics tags</li>
              <li><strong>Vercel Analytics:</strong> Performance monitoring</li>
              <li><strong>Google Places API:</strong> Gym location data</li>
              <li><strong>Unsplash:</strong> High-quality images for articles</li>
            </ul>
            <p className="text-gray-700 mb-4">
              These services have their own privacy policies. We encourage you to review them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">Under New Zealand privacy law, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Object:</strong> Object to processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Unsubscribe from our communications at any time</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, contact us at <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries outside New Zealand, including the United States where our hosting provider (Vercel) and analytics services are located. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a></p>
              <p className="text-gray-700 mb-2"><strong>General Inquiries:</strong> <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a></p>
              <p className="text-gray-700"><strong>Location:</strong> New Zealand</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Complaints</h2>
            <p className="text-gray-700 mb-4">
              If you have a complaint about our handling of your personal information, please contact us first at <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a>. If you are not satisfied with our response, you may lodge a complaint with the New Zealand Privacy Commissioner at <a href="https://www.privacy.org.nz" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">www.privacy.org.nz</a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              By using 6Pack NZ, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
