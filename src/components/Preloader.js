// File: src/components/Preloader.js
import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-sky-100 flex items-center justify-center z-50 transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center">
        {/* Simple, professional loading animation */}
        <div className="mb-6">
          <div className="relative h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-amber-500 rounded-full animate-progress-bar"></div>
          </div>
        </div>
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-gray-800">SES</span>
            <span className="h-8 w-1 bg-amber-500 mx-3"></span>
            <span className="text-lg text-gray-600">JKUAT</span>
          </div>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600">Loading resources<span className="animate-pulse">...</span></p>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 w-full h-1">
        <div className="h-full bg-amber-500 w-1/3"></div>
      </div>
    </div>
  );
};

export default Preloader;