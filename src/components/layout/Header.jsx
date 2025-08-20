'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Calculator, BookOpen, Dumbbell, MapPin } from "lucide-react";
import useCart from "../../hooks/useCart";

const Header = () => {
  const pathname = usePathname();
  const { getCartItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-gray-700 group-hover:to-gray-900 transition-all duration-300">
                6Pack
              </div>
              <span className="text-lg text-gray-500 font-semibold group-hover:text-gray-700 transition-colors">.co.nz</span>
            </Link>
          </div>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive("/") 
                  ? "bg-gray-900 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/articles"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                isActive("/articles") 
                  ? "bg-gray-900 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <BookOpen size={16} />
              <span>Articles</span>
            </Link>
            <Link
              href="/calculators"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                isActive("/calculators") 
                  ? "bg-gray-900 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Calculator size={16} />
              <span>Calculators</span>
            </Link>
            <Link
              href="/workouts"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                isActive("/workouts") 
                  ? "bg-gray-900 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Dumbbell size={16} />
              <span>Workouts</span>
            </Link>
            <Link
              href="/gym-finder"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                isActive("/gym-finder") 
                  ? "bg-gray-900 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <MapPin size={16} />
              <span>Gym Finder</span>
            </Link>
          </nav>

          {/* Right side - Mobile Menu Button */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={toggleMobileMenu}
              className={`lg:hidden p-3 rounded-full transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-20 left-0 right-0 bg-gradient-to-b from-white via-white to-gray-50 backdrop-blur-md shadow-xl border-b border-gray-200 transition-all duration-300 z-30 ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="px-6 py-8 space-y-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive("/") 
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              }`}
            >
              <span className="text-lg font-semibold">Home</span>
            </Link>
            
            <Link
              href="/articles"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive("/articles") 
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive("/articles") ? "bg-white/20" : "bg-blue-100 group-hover:bg-blue-200"}`}>
                <BookOpen size={20} className={isActive("/articles") ? "text-white" : "text-blue-600"} />
              </div>
              <span className="text-lg font-semibold">Articles</span>
            </Link>
            
            <Link
              href="/calculators"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive("/calculators") 
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive("/calculators") ? "bg-white/20" : "bg-green-100 group-hover:bg-green-200"}`}>
                <Calculator size={20} className={isActive("/calculators") ? "text-white" : "text-green-600"} />
              </div>
              <span className="text-lg font-semibold">Calculators</span>
            </Link>
            
            <Link
              href="/workouts"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive("/workouts") 
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive("/workouts") ? "bg-white/20" : "bg-orange-100 group-hover:bg-orange-200"}`}>
                <Dumbbell size={20} className={isActive("/workouts") ? "text-white" : "text-orange-600"} />
              </div>
              <span className="text-lg font-semibold">Workouts</span>
            </Link>
            
            <Link
              href="/gym-finder"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive("/gym-finder") 
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive("/gym-finder") ? "bg-white/20" : "bg-purple-100 group-hover:bg-purple-200"}`}>
                <MapPin size={20} className={isActive("/gym-finder") ? "text-white" : "text-purple-600"} />
              </div>
              <span className="text-lg font-semibold">Gym Finder</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;