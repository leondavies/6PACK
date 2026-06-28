import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | 6Pack NZ',
  description: 'Terms and conditions for using the 6Pack NZ fitness platform, calculators, and services.',
  alternates: {
    canonical: 'https://www.6pack.co.nz/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-center mb-6">
            <FileText className="text-primary-600 mr-4" size={48} />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using 6Pack NZ (www.6pack.co.nz), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Service Description</h2>
            <p>6Pack NZ provides:</p>
            <ul className="list-disc pl-6">
              <li>Free fitness calculators (BMI, BMR, Macro, Body Fat, 1RM, Ideal Weight)</li>
              <li>Educational fitness articles and guides</li>
              <li>Workout plans and training information</li>
              <li>Gym finder tool for New Zealand</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6">
              <li>Provide accurate information when using our calculators</li>
              <li>Use our services for lawful purposes only</li>
              <li>Not attempt to harm, disable, or overburden our servers</li>
              <li>Not scrape, copy, or redistribute our content without permission</li>
              <li>Consult healthcare professionals before starting any fitness program</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Medical Disclaimer</h2>
            <p className="text-red-600 font-semibold">
              Our calculators and content are for informational purposes only and do not constitute medical advice. Always consult with qualified healthcare professionals before starting any fitness or nutrition program.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on 6Pack NZ, including text, graphics, logos, and software, is owned by 6Pack NZ and protected by New Zealand and international copyright laws.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              6Pack NZ and its creators are not liable for any injuries, damages, or losses resulting from your use of our services, calculators, or following our advice. Use at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Governing Law</h2>
            <p>These terms are governed by New Zealand law. Any disputes will be resolved in New Zealand courts.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
