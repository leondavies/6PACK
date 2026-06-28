import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | 6Pack NZ',
  description: 'Get in touch with 6Pack NZ. We are here to help with your fitness questions, feedback, and support requests.',
  alternates: {
    canonical: 'https://www.6pack.co.nz/contact/',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            We'd love to hear from you! Get in touch with any questions, feedback, or suggestions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="flex items-start bg-primary-50 p-6 rounded-lg">
                <Mail className="text-primary-600 mr-4 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
                  <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline text-lg">
                    info@6pack.co.nz
                  </a>
                  <p className="text-gray-600 mt-2">For general questions and feedback</p>
                </div>
              </div>

              <div className="flex items-start bg-blue-50 p-6 rounded-lg">
                <MessageCircle className="text-blue-600 mr-4 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
                  <a href="mailto:info@6pack.co.nz" className="text-blue-600 hover:underline text-lg">
                    info@6pack.co.nz
                  </a>
                  <p className="text-gray-600 mt-2">Technical issues and calculator problems</p>
                </div>
              </div>

              <div className="flex items-start bg-purple-50 p-6 rounded-lg">
                <Mail className="text-purple-600 mr-4 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Legal</h3>
                  <a href="mailto:info@6pack.co.nz" className="text-purple-600 hover:underline text-lg">
                    info@6pack.co.nz
                  </a>
                  <p className="text-gray-600 mt-2">Privacy concerns and data requests</p>
                </div>
              </div>

              <div className="flex items-start bg-gray-50 p-6 rounded-lg">
                <MapPin className="text-gray-600 mr-4 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700 text-lg">New Zealand</p>
                  <p className="text-gray-600 mt-2">Proudly serving Kiwis nationwide</p>
                </div>
              </div>

              <div className="flex items-start bg-orange-50 p-6 rounded-lg">
                <Clock className="text-orange-600 mr-4 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-700">Typically within 24-48 hours</p>
                  <p className="text-gray-600 mt-2">Monday - Friday (NZ business hours)</p>
                </div>
              </div>
            </div>

            {/* FAQ / Common Topics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculator Issues</h3>
                  <p className="text-gray-600">If a calculator isn't working, try clearing your browser cache or using a different browser. Contact info@6pack.co.nz if problems persist.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Suggestions</h3>
                  <p className="text-gray-600">We're always looking to improve! Email info@6pack.co.nz with article topics, calculator ideas, or feature requests.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership Inquiries</h3>
                  <p className="text-gray-600">Interested in partnering with 6Pack NZ? Email info@6pack.co.nz with your proposal.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Media & Press</h3>
                  <p className="text-gray-600">For media inquiries, interviews, or press releases, contact info@6pack.co.nz.</p>
                </div>
              </div>

              <div className="bg-primary-600 text-white p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-3">Need Immediate Help?</h3>
                <p className="mb-4">Check out our articles and FAQ sections for quick answers to common fitness questions.</p>
                <Link href="/articles" className="inline-block bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Browse Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
