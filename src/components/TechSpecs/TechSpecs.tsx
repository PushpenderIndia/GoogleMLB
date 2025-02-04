import React from 'react';

const TechSpecs = () => {
  return (
    <section id="techSpecs" className="py-16 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white animate__animated animate__fadeIn">Technical Specifications</h2>
          <p className="mt-4 text-gray-400 animate__animated animate__fadeIn animate__delay-1s">System requirements and supported formats</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 rounded-xl p-8 animate__animated animate__fadeInLeft">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Video Requirements
            </h3>
            <ul className="space-y-4 text-gray-400">
              {[
                'Supported formats: MP4, MOV, AVI, WEBM',
                'Maximum file size: 500MB',
                'Resolution: 720p or higher recommended',
                'Frame rate: 30fps or higher'
              ].map((requirement, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-900 rounded-xl p-8 animate__animated animate__fadeInRight">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              System Capabilities
            </h3>
            <ul className="space-y-4 text-gray-400">
              {[
                'Processing time: 2-5 seconds',
                'Accuracy: ±2% margin of error',
                'Real-time analysis capability',
                'Cloud-based processing'
              ].map((capability, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;