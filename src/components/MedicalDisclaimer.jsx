import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer = ({ calculatorType = 'calculator' }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            ⚕️ Medical Disclaimer
          </h3>
          <div className="text-red-700 space-y-2">
            <p>
              <strong>This {calculatorType} provides estimates for informational purposes only and does not constitute medical advice.</strong>
            </p>
            <p>
              Results are based on validated formulas but may not be accurate for everyone. Individual factors such as age, body composition, medical conditions, medications, and genetics can significantly affect actual values.
            </p>
            <p className="font-semibold">
              Always consult with qualified healthcare professionals before:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Starting any new fitness or exercise program</li>
              <li>Making significant changes to your diet or nutrition</li>
              <li>Using these results to make health decisions</li>
              <li>If you have any pre-existing medical conditions</li>
            </ul>
            <p className="text-sm pt-2">
              For personalized advice, consult with your doctor, registered dietitian, or certified personal trainer.
              See our full{' '}
              <Link href="/disclaimer" className="underline font-semibold hover:text-red-900">
                Disclaimer
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline font-semibold hover:text-red-900">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
