import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import useCart from "../../hooks/useCart";

const Header = () => {
  const location = useLocation();
  const { getCartItemCount } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-amber-600">6Pack</div>
            <span className="text-sm text-gray-500">.co.nz</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/") ? "text-amber-600" : "text-gray-700 hover:text-amber-600"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`${
                isActive("/shop") ? "text-amber-600" : "text-gray-700 hover:text-amber-600"
              } transition-colors`}
            >
              Shop
            </Link>
            <Link
              to="/subscription"
              className={`${
                isActive("/subscription") ? "text-amber-600" : "text-gray-700 hover:text-amber-600"
              } transition-colors`}
            >
              Subscription
            </Link>
            <Link
              to="/brewery"
              className={`${
                isActive("/brewery") ? "text-amber-600" : "text-gray-700 hover:text-amber-600"
              } transition-colors`}
            >
              Breweries
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </button>
            <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <User size={20} />
            </button>
            <button className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;