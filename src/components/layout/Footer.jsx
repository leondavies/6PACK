import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary-400">6Pack</div>
              <span className="text-sm text-gray-400">.co.nz</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              New Zealand's premier fitness and training platform. Expert-backed content, 
              personalized coaching, and science-based strategies for your transformation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/6pack.co.nz" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/6pack_nz" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/6pack_nz" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:hello@6pack.co.nz" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fitness Hub</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Workouts
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link to="/supplements" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Supplements
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Coaching Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Coaching Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Program Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 6Pack.co.nz. All rights reserved. Transform your fitness journey.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;