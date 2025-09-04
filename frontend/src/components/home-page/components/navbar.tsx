import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-charcoal">
              InternMatch
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-charcoal hover:text-peach transition-colors duration-100"
            >
              Dashboard
            </Link>
            <Link
              href="/internships"
              className="text-charcoal hover:text-peach transition-colors duration-100"
            >
              Browse Internships
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-peach transition-colors duration-100"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="text-charcoal hover:text-peach transition-colors duration-100"
            >
              Contact Us
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-charcoal hover:text-peach transition-colors duration-100 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-charcoal" />
              ) : (
                <Menu className="h-6 w-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-charcoal hover:text-peach transition-colors duration-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/internships"
              className="block px-3 py-2 text-charcoal hover:text-peach transition-colors duration-100"
              onClick={() => setIsOpen(false)}
            >
              Browse Internships
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-charcoal hover:text-peach transition-colors duration-100"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="block px-3 py-2 text-charcoal hover:text-peach transition-colors duration-100"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center bg-white border border-peach text-charcoal px-6 py-2 rounded-lg hover:bg-peach hover:text-black transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="block w-full text-center bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
