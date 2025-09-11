"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  className?: string;
}

const navigationItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Browse Internships", href: "/internships" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact-us" },
];

function useOutsideClose<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);
  return ref;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Hook for closing menu on outside click
  const menuRef = useOutsideClose<HTMLDivElement>(isOpen, () => setIsOpen(false));

  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm border-b border-gray-200",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            {/* <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center shadow-sm">
              <span className="text-sm font-bold leading-none">IN</span>
            </div> */}
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              DISHA
            </span>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            <Link 
              href="/" 
              className={cn(
                "font-medium transition-colors",
                isActive("/") 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Home
            </Link>
            <Link 
              href="/internships" 
              className={cn(
                "font-medium transition-colors",
                isActive("/internships") 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Browse Internships
            </Link>
            <Link 
              href="/companies" 
              className={cn(
                "font-medium transition-colors",
                isActive("/companies") 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Companies
            </Link>
            <Link 
              href="/about" 
              className={cn(
                "font-medium transition-colors",
                isActive("/about") 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "font-medium transition-colors",
                isActive("/contact") 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right: Auth + Mobile Trigger */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="sm:hidden">
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls="mobile-primary-menu"
                onClick={() => setIsOpen((p) => !p)}
                className={cn(
                  "inline-flex items-center justify-center rounded-md p-2",
                  "text-gray-700 hover:bg-gray-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                )}
              >
                {isOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-primary-menu"
          className={cn(
            "sm:hidden transition-[max-height,opacity] duration-200 ease-out origin-top",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            "overflow-hidden"
          )}
        >
          <div className="mt-2 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="flex flex-col p-1">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="my-1 h-px bg-gray-200" role="separator" />
              <Link
                href="/login"
                className="w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="w-full px-3 py-2 rounded-md text-sm font-semibold text-white transition-colors bg-black hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
