import React, { useState, useEffect } from 'react';

const AnalysisDisplay = ({ analysisData, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      setShowVideo(true);
    }
  }, [videoUrl]);

  return (
    <section id="analysisDisplay" className="py-16 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-neutral-800 rounded-lg shadow-xl p-6 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Analysis Results</h2>

            <div className="mb-8 aspect-video bg-neutral-700 rounded-lg overflow-hidden">
              <video 
                id="analysisVideo" 
                className={showVideo ? '' : 'hidden'} 
                controls
                src={videoUrl}
              >
                Your browser does not support the video tag.
              </video>
              <div className={`h-full flex items-center justify-center text-gray-400 ${showVideo ? 'hidden' : ''}`}>
                Video preview will appear here
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900 p-6 rounded-lg animate__animated animate__fadeInUp">
                <h3 className="text-blue-500 text-lg font-semibold mb-2">Exit Velocity</h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">{analysisData.exitVelocity}</span>
                  <span className="text-gray-400 mb-1">mph</span>
                </div>
                <div className="mt-2 h-2 bg-neutral-700 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full transition-all duration-1000" style={{ width: analysisData.exitVelocity !== '--' ? '85%' : '0%' }} />
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg animate__animated animate__fadeInUp animate__delay-1s">
                <h3 className="text-green-500 text-lg font-semibold mb-2">Hit Distance</h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">{analysisData.hitDistance}</span>
                  <span className="text-gray-400 mb-1">ft</span>
                </div>
                <div className="mt-2 h-2 bg-neutral-700 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full transition-all duration-1000" style={{ width: analysisData.hitDistance !== '--' ? '75%' : '0%' }} />
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-lg animate__animated animate__fadeInUp animate__delay-2s">
                <h3 className="text-purple-500 text-lg font-semibold mb-2">Launch Angle</h3>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">{analysisData.launchAngle}</span>
                  <span className="text-gray-400 mb-1">degrees</span>
                </div>
                <div className="mt-2 h-2 bg-neutral-700 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full transition-all duration-1000" style={{ width: analysisData.launchAngle !== '--' ? '65%' : '0%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDisplay;