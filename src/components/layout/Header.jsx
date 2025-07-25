import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import useCart from "../../hooks/useCart";

const Header = () => {
  const location = useLocation();
  const { getCartItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">6Pack</div>
            <span className="text-sm text-gray-500">.co.nz</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/articles"
              className={`${
                isActive("/articles") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Articles
            </Link>
            <Link
              to="/calculators"
              className={`${
                location.pathname.startsWith("/calculators") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Calculators
            </Link>
            <Link
              to="/workouts"
              className={`${
                isActive("/workouts") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Workouts
            </Link>
            <Link
              to="/nutrition"
              className={`${
                isActive("/nutrition") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Nutrition
            </Link>
            <Link
              to="/supplements"
              className={`${
                isActive("/supplements") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
              } transition-colors`}
            >
              Shop
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </button>
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <User size={20} />
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b shadow-lg">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`${
                  isActive("/") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Home
              </Link>
              <Link
                to="/articles"
                onClick={closeMobileMenu}
                className={`${
                  isActive("/articles") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Articles
              </Link>
              <Link
                to="/calculators"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname.startsWith("/calculators") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Calculators
              </Link>
              <Link
                to="/workouts"
                onClick={closeMobileMenu}
                className={`${
                  isActive("/workouts") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Workouts
              </Link>
              <Link
                to="/nutrition"
                onClick={closeMobileMenu}
                className={`${
                  isActive("/nutrition") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Nutrition
              </Link>
              <Link
                to="/supplements"
                onClick={closeMobileMenu}
                className={`${
                  isActive("/supplements") 
                    ? "bg-primary-50 text-primary-600 border-primary-500" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors border-l-4 border-transparent`}
              >
                Shop
              </Link>
              
              {/* Mobile Actions */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-gray-700 font-medium">Cart</span>
                  <div className="flex items-center">
                    <ShoppingCart size={20} className="text-gray-700 mr-2" />
                    <span className="bg-primary-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center px-3 py-2">
                  <User size={20} className="text-gray-700 mr-2" />
                  <span className="text-gray-700 font-medium">Account</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;