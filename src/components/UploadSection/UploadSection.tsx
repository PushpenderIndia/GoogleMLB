import React, { useState } from 'react';

const UploadSection = ({ onAnalysisComplete }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadMessage('Uploading video...');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadMessage('Upload complete! Analyzing...');
        
        // Simulate API call
        setTimeout(() => {
          const analysisData = {
            exitVelocity: 95.5,
            hitDistance: 405,
            launchAngle: 28.3
          };
          onAnalysisComplete(analysisData, URL.createObjectURL(file));
          setIsUploading(false);
        }, 2000);
      }
    }, 500);
  };

  const handleUrlAnalysis = async () => {
    const url = (document.getElementById('videoUrl') as HTMLInputElement).value.trim();
    if (url) {
      setIsUploading(true);
      setUploadMessage('Analyzing video from URL...');
      setUploadProgress(100);
      
      // Simulate API call
      setTimeout(() => {
        const analysisData = {
          exitVelocity: 95.5,
          hitDistance: 405,
          launchAngle: 28.3
        };
        onAnalysisComplete(analysisData, url);
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <section id="uploadSection" className="py-16 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-neutral-900 rounded-lg shadow-xl p-6 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Upload Your Baseball Video</h2>
            
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center" 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('video/')) {
                    handleFileUpload(file);
                  }
                }}
              >
                <input 
                  type="file" 
                  id="fileInput" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">Drag and drop a video file here, or click to select</p>
                </label>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">OR</p>
              </div>

              <div className="flex flex-col space-y-4">
                <input 
                  type="url" 
                  id="videoUrl" 
                  placeholder="Paste video URL here" 
                  className="px-4 py-2 bg-neutral-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                />
                
                <button 
                  onClick={handleUrlAnalysis}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze Video
                </button>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">{uploadMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;