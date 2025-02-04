import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-16 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white animate__animated animate__fadeIn">Key Features</h2>
          <p className="mt-4 text-gray-400 animate__animated animate__fadeIn animate__delay-1s">
            Advanced analytics tools for baseball performance analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              title: "Real-time Analysis",
              description: "Get instant results with professional-grade accuracy for your batting metrics",
              color: "blue"
            },
            {
              icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
              title: "Multiple Input Methods",
              description: "Upload local videos or provide URLs for remote analysis",
              color: "green"
            },
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              title: "Secure Processing",
              description: "Your videos are processed securely and privately on our servers",
              color: "purple"
            },
            {
              icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
              title: "Data Storage",
              description: "Track your progress with historical data storage and analysis",
              color: "red"
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Fast Processing",
              description: "Get results within seconds of video upload completion",
              color: "yellow"
            },
            {
              icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              title: "Automatic Updates",
              description: "Our AI models are continuously improved for better accuracy",
              color: "blue"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`bg-neutral-800 rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-${index}s`}
            >
              <div className={`text-${feature.color}-500 mb-4`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;