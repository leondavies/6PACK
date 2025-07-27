import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">6Pack</div>
              <span className="text-lg text-gray-400 font-semibold">.co.nz</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              New Zealand&apos;s premier fitness and training platform. Expert-backed content, 
              personalised coaching, and science-based strategies for your transformation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/6pack.co.nz" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors group">
                <Facebook size={20} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://instagram.com/6pack_nz" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors group">
                <Instagram size={20} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://twitter.com/6pack_nz" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors group">
                <Twitter size={20} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="mailto:info@6pack.co.nz" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors group">
                <Mail size={20} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Fitness Hub</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Articles
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Workouts
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Calculators
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Coaching Programs
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Tools & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/calculators/bmi" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  BMI Calculator
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators/macro" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Macro Calculator
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <a href="mailto:info@6pack.co.nz" className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center">
                  Contact Us
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={scrollToTop}
                  className="text-gray-300 hover:text-white transition-colors text-lg group inline-flex items-center cursor-pointer"
                >
                  Back to Top
                  <ArrowUp className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-lg font-medium">
            © 2025 6Pack.co.nz. All rights reserved. Transform your fitness journey. 🚀
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-lg transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-lg transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-lg transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;