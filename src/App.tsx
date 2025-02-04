import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import UploadSection from './components/UploadSection/UploadSection';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Features from './components/Features/Features';
import TechSpecs from './components/TechSpecs/TechSpecs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
         Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 relative">
        <Hero />
        <UploadSection />
        <AnalysisDisplay />
        <HowItWorks />
        <Features />
        <TechSpecs />
      </main>

      <Footer />
    </div>
  );
}

export default App;