'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import '../app/globals.css';

export default function PhotoStrip({ photos, onReshoot }) {
  const stripRef = useRef(null);

  const downloadStrip = async () => {
    if (!stripRef.current) return;

    const canvas = await html2canvas(stripRef.current, { 
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true
    });
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `photo-strip-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-thin text-white mb-2 tracking-wider">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            YOUR MEMORIES
          </span>
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Photo Strip Container */}
        <div className="relative group mb-8">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transform transition-all duration-700 group-hover:scale-105"></div>
          
          {/* Strip Content */}
          <div className="relative z-10 p-8 sm:p-10">
            <div
              ref={stripRef}
              className="bg-white shadow-2xl transform transition-all duration-300 hover:shadow-3xl"
              style={{
                width: '280px',
                padding: '20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}
            >
              {/* Header Section */}
              <div className="text-center mb-4 border-b-2 border-dashed border-gray-300 pb-3">
                <h2 className="text-lg font-bold text-gray-800 tracking-wide">PHOTO BOOTH</h2>
                <p className="text-xs text-gray-500 mt-1">INSTANT MEMORIES</p>
              </div>

              {/* Photos Section */}
              <div className="space-y-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative">
                    {/* Photo Frame */}
                    <div className="bg-white p-2 shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105">
                      <img 
                        src={src} 
                        alt={`Photo ${i + 1}`} 
                        className="w-full h-28 object-cover rounded-sm border border-gray-100"
                        style={{
                          aspectRatio: '4/3',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    
                  </div>
                ))}
              </div>

              {/* Footer Section */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span className="font-semibold">SayCheese</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500 italic">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gray-300 rounded-tl-lg opacity-50"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gray-300 rounded-tr-lg opacity-50"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gray-300 rounded-bl-lg opacity-50"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gray-300 rounded-br-lg opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={onReshoot}
            className="group relative flex-1 px-6 py-4 rounded-full font-light text-white/90 
                       bg-white/5 backdrop-blur-md border border-white/10 
                       hover:bg-white/10 hover:border-white/20 transition-all duration-500
                       shadow-lg hover:shadow-xl transform hover:scale-105
                       overflow-hidden"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button Text */}
            <span className="relative z-10 tracking-wide text-sm sm:text-base">
              Reshoot
            </span>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
          </button>

          <button
            onClick={downloadStrip}
            className="group relative flex-1 px-6 py-4 rounded-full font-light text-white/90 
                       bg-white/5 backdrop-blur-md border border-white/10 
                       hover:bg-white/10 hover:border-white/20 transition-all duration-500
                       shadow-lg hover:shadow-xl transform hover:scale-105
                       overflow-hidden"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button Text */}
            <span className="relative z-10 tracking-wide text-sm sm:text-base">
              Download
            </span>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
          </button>
        </div>
      </div>
    </div>
  );
}