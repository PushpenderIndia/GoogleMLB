import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold">Baseball Analytics</a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#uploadSection" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Upload Video</a>
              <a href="#analysisDisplay" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Analysis</a>
              <a href="#howItWorks" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
              <a href="#features" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#techSpecs" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Tech Specs</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-neutral-700 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className="block" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-900">
          <a href="#uploadSection" onClick={closeMobileMenu} className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Upload Video</a>
          <a href="#analysisDisplay" onClick={closeMobileMenu} className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Analysis</a>
          <a href="#howItWorks" onClick={closeMobileMenu} className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">How It Works</a>
          <a href="#features" onClick={closeMobileMenu} className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="#techSpecs" onClick={closeMobileMenu} className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Tech Specs</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;