import React from 'react';

const HowItWorks = () => {
  return (
    <section id="howItWorks" className="py-16 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white animate__animated animate__fadeIn">How It Works</h2>
          <p className="mt-4 text-gray-400 animate__animated animate__fadeIn animate__delay-1s">
            Our advanced AI system analyzes your baseball videos in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-neutral-900 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInLeft">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-4">Upload Video</h3>
            <p className="text-gray-400 text-center">
              Upload your baseball swing video or provide a URL. We accept most video formats and support clips up to 60 seconds.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInLeft animate__delay-1s">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600 mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-4">AI Processing</h3>
            <p className="text-gray-400 text-center">
              Our computer vision AI analyzes the video frame by frame to track the ball's trajectory and impact characteristics.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInLeft animate__delay-2s">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-4">Get Results</h3>
            <p className="text-gray-400 text-center">
              Receive instant results showing exit velocity, hit distance, and launch angle with professional-grade accuracy.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-neutral-900 rounded-lg p-8 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-bold text-white text-center mb-6">Technology Behind the Analysis</h3>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-1 text-center">
              <div className="text-blue-500 text-lg font-semibold mb-2">Computer Vision</div>
              <p className="text-gray-400">Advanced object tracking and motion analysis algorithms</p>
            </div>
            <div className="w-px h-16 bg-gray-700 hidden md:block"></div>
            <div className="flex-1 text-center">
              <div className="text-blue-500 text-lg font-semibold mb-2">Machine Learning</div>
              <p className="text-gray-400">Trained on thousands of professional baseball swings</p>
            </div>
            <div className="w-px h-16 bg-gray-700 hidden md:block"></div>
            <div className="flex-1 text-center">
              <div className="text-blue-500 text-lg font-semibold mb-2">Real-time Processing</div>
              <p className="text-gray-400">Results delivered in seconds with high accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;