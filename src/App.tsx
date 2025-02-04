import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import UploadSection from './components/UploadSection/UploadSection';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Features from './components/Features/Features';
import TechSpecs from './components/TechSpecs/TechSpecs';
import Footer from './components/Footer/Footer';

function App() {
  const [analysisData, setAnalysisData] = useState({
    exitVelocity: '--',
    hitDistance: '--',
    launchAngle: '--'
  });
  const [videoUrl, setVideoUrl] = useState('');

  const handleAnalysisComplete = (data, url) => {
    setAnalysisData(data);
    setVideoUrl(url || 'https://sporty-clips.mlb.com/eVozQWVfWGw0TUFRPT1fVWdWUVZWSlNYd01BWFZFRVZBQUFBd0JYQUFBQ0IxRUFWQVlGQWxVRlZGWUhCZ1VF.mp4');
  };

  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
         Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 relative">
        <Hero />
        <UploadSection onAnalysisComplete={handleAnalysisComplete} />
        <AnalysisDisplay analysisData={analysisData} videoUrl={videoUrl} />
        <HowItWorks />
        <Features />
        <TechSpecs />
      </main>

      <Footer />
    </div>
  );
}

export default App;