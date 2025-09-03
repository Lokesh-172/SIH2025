import { useState, useContext, useEffect,  } from "react";
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
            <span className="text-2xl font-bold text-charcoal">
              InternMatch
            </span>
          </div>
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
            <Link
              href="/login"
              className="bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium"
            >
              Login
            </Link>
            {/* <button
                className="bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium"
                onClick={() => handleLogin()}
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button> */}

            <div className="flex gap-6">
              <div className="flex item-center gap-4">
                {/* {
                  token && userData
                    ? <div className='flex item-center gap-2 cursor-pointer group relative'>
                      <img src={userData.image} alt="" className='w-8 rounded-full' />
                      <img src={assets.dropdown_icon} alt="" className='w-2.5' />
                      <div className='absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                          <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                          <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                          <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                      </div>
                    </div>
                    : <button
                      onClick={() => navigate('/login')}
                      className='bg-peach px-8 py-3 text-black rounded-full hover:opacity-90 font-light hidden md:block'
                    >
                      Login
                    </button>
                } */}
              </div>
              <button
                onClick={() => setShowMenu(true)}
                className="w-6 md:hidden cursor-pointer"
                aria-label="Open menu"
                aria-expanded={showMenu}
                aria-controls="mobile-menu"
              >
                <img
                  src="/menu_icon.svg"
                  alt="Menu"
                  className="w-full h-full"
                />
              </button>

              <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
                className={`${
                  showMenu ? "fixed w-full" : "h-0 w-0"
                } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
              >
                <div className="flex items-center justify-between px-5 py-6">
                  {/* <img className='w-36' src={assets.logo} />
                  <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} /> */}
                </div>
                <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                  <Link href="/" onClick={() => setShowMenu(false)}>
                    <p className="px-4 py-2 rounded inline-block">Home</p>
                  </Link>
                  <Link href="/doctors" onClick={() => setShowMenu(false)}>
                    <p className="px-4 py-2 rounded inline-block">
                      All Doctors
                    </p>
                  </Link>
                  <Link href="/about" onClick={() => setShowMenu(false)}>
                    <p className="px-4 py-2 rounded inline-block">About Us</p>
                  </Link>
                  <Link href="/contact" onClick={() => setShowMenu(false)}>
                    <p className="px-4 py-2 rounded inline-block">Contact Us</p>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6 text-charcoal" />
              ) : (
                <Menu className="h-6 w-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 text-charcoal hover:text-melon"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-charcoal hover:text-melon"
            >
              How it Works
            </a>
            <a
              href="#benefits"
              className="block px-3 py-2 text-charcoal hover:text-melon"
            >
              Benefits
            </a>
            <button className="w-full text-center bg-peach font-medium text-black px-6 py-2 rounded-lg hover:bg-opacity-90">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
