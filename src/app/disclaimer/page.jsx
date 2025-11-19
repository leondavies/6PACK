import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | 6Pack NZ',
  description: 'Important health and fitness disclaimers for using 6Pack NZ calculators and following our advice.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="text-orange-600 mr-4" size={48} />
            <h1 className="text-4xl font-bold text-gray-900">Disclaimer</h1>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <p className="text-red-800 font-semibold text-lg">
              ⚠️ IMPORTANT: Please read this disclaimer carefully before using our services.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Medical Disclaimer</h2>
            <p className="font-semibold text-lg">
              The information provided on 6Pack NZ is for educational and informational purposes only and is not intended as medical advice.
            </p>
            <p>
              Always consult with your physician or other qualified healthcare provider before starting any new fitness program, diet, or exercise routine. This is especially important if you:
            </p>
            <ul className="list-disc pl-6">
              <li>Have any pre-existing medical conditions</li>
              <li>Are taking any medications</li>
              <li>Are pregnant or breastfeeding</li>
              <li>Have a history of heart disease, high blood pressure, or other cardiovascular conditions</li>
              <li>Have joint, muscle, or bone problems</li>
              <li>Are over 40 years old and have been inactive</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculator Accuracy</h2>
            <p>
              Our fitness calculators (BMI, BMR, Macro, Body Fat, 1RM, Ideal Weight) use scientifically-validated formulas but provide <strong>estimates only</strong>. Results may vary based on individual factors and should not be considered medical diagnoses.
            </p>
            <p>
              For accurate body composition measurements and personalized advice, consult with qualified healthcare professionals, registered dietitians, or certified personal trainers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Exercise and Injury Risk</h2>
            <p className="font-semibold">
              Physical exercise involves inherent risks of injury. By using our workout plans and following our exercise advice, you assume all risks associated with such activities.
            </p>
            <p>
              To minimize injury risk:
            </p>
            <ul className="list-disc pl-6">
              <li>Start slowly and progress gradually</li>
              <li>Use proper form and technique</li>
              <li>Listen to your body and stop if you experience pain</li>
              <li>Warm up before and cool down after exercise</li>
              <li>Stay properly hydrated</li>
              <li>Use appropriate equipment and ensure safe exercise environment</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nutrition Information</h2>
            <p>
              Nutrition advice provided on 6Pack NZ is general in nature and may not be suitable for everyone. Individual nutrition needs vary based on age, gender, activity level, medical conditions, and other factors.
            </p>
            <p>
              For personalized nutrition advice, consult with a registered dietitian or nutritionist.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No Liability</h2>
            <p className="font-semibold">
              6Pack NZ, its owners, employees, and contributors are not liable for any injuries, damages, or losses resulting from your use of our website, calculators, advice, or following our workout plans.
            </p>
            <p>
              You use our services entirely at your own risk and agree to hold 6Pack NZ harmless from any claims arising from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Advice</h2>
            <p>
              While our content is created by fitness professionals and backed by scientific research, it should not replace professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              We strongly recommend working with certified professionals such as:
            </p>
            <ul className="list-disc pl-6">
              <li>Medical doctors for health screening and medical advice</li>
              <li>Registered dietitians for personalized nutrition plans</li>
              <li>Certified personal trainers for form correction and program design</li>
              <li>Physiotherapists for injury rehabilitation</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Results Not Guaranteed</h2>
            <p>
              While we provide evidence-based fitness and nutrition advice, results vary significantly between individuals. We make no guarantees regarding:
            </p>
            <ul className="list-disc pl-6">
              <li>Weight loss or gain</li>
              <li>Muscle building</li>
              <li>Strength improvements</li>
              <li>Body composition changes</li>
              <li>Time to achieve results</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
            <p>
              If you have questions about this disclaimer, contact us at <a href="mailto:info@6pack.co.nz" className="text-primary-600 hover:underline">info@6pack.co.nz</a>
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-8">
              <p className="text-yellow-800 font-semibold">
                By using 6Pack NZ, you acknowledge that you have read, understood, and agree to this disclaimer. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
