'use client';
import { useEffect, useRef } from 'react';
import '../app/globals.css';

export default function CameraFeed({ videoRef, filter, onFilterChange, onCapture, isCapturing }) {
  const containerRef = useRef(null);

  const filters = [
    { id: 'normal', name: 'Normal' },
    { id: 'vintage', name: 'Vintage' },
    { id: 'noir', name: 'Noir' },
    { id: 'warm', name: 'Warm' },
    { id: 'dramatic', name: 'Dramatic' },
    { id: 'vivid', name: 'Vivid' },
    { id: 'retro', name: 'Retro'},
    { id: 'dreamy', name: 'Dreamy' },
  ];

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getCssFilter = (filter) => {
    switch (filter) {
      case 'vintage':
        return 'sepia(0.5) contrast(1.2) brightness(1.1) saturate(0.8)';
      case 'noir':
        return 'grayscale(100%) contrast(1.3) brightness(1.1)';
      case 'warm':
        return 'sepia(0.3) saturate(1.2) brightness(1.05) contrast(1.1)';
      case 'dramatic':
        return 'contrast(1.4) brightness(0.95) saturate(1.3)';
      case 'vivid':
        return 'saturate(1.5) contrast(1.2) brightness(1.05)';
      case 'retro':
        return 'sepia(0.4) contrast(1.3) brightness(1.1) saturate(0.9) hue-rotate(10deg)';
      case 'dreamy':
        return 'blur(1px) brightness(1.15) saturate(1.2) contrast(0.9)';
      default:
        return 'none';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-xs sm:max-w-2xl mx-auto group"
      style={{ aspectRatio: '4/5' }}
    >
      {/* Main Camera Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-neutral-800 to-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-3xl">
        
        {/* Outer Glass Frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
        
        {/* Camera Display Area */}
        <div className="relative w-full h-full p-4 sm:p-6">
          <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-inner border border-white/5">
            
            {/* Video Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ filter: getCssFilter(filter) }}
              className="w-full h-full object-cover select-none pointer-events-none transition-all duration-500"
            />
            
            {/* Video Overlay Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Subtle screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
              
              {/* Screen border glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-inner"></div>
              
              {/* Corner UI elements */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/40 rounded-tl-lg"></div>
              <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/40 rounded-tr-lg"></div>
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-white/40 rounded-bl-lg"></div>
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-white/40 rounded-br-lg"></div>
              
              {/* Subtle lens flare */}
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white/10 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/20 rounded-full blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Filter Selection Bar */}
        <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 px-4 sm:px-6 z-20">
          <div className="relative">
            {/* Glass Background */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-white/10">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
                {filters.map((filterOption) => (
                  <button
                    key={filterOption.id}
                    onClick={() => onFilterChange(filterOption.id)}
                    className={`
                      group/filter flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium
                      transition-all duration-500 transform hover:scale-110 whitespace-nowrap
                      focus:outline-none min-w-[60px]
                      ${filter === filterOption.id 
                        ? 'bg-white/20 text-white shadow-lg border border-white/30 scale-105' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                      }
                    `}
                  >
                    <span className="text-xs tracking-wide">{filterOption.name}</span>
                    
                    {/* Active indicator */}
                    {filter === filterOption.id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capture Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <div className="relative">
            {/* Button Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 blur-md animate-pulse"></div>
            
            {/* Main Button */}
            <button
              className={`
                relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/30 
                shadow-2xl flex items-center justify-center transition-all duration-300
                transform hover:scale-110 active:scale-95 focus:outline-none
                ${isCapturing 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
                  : 'bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20'
                }
              `}
              onClick={onCapture}
              disabled={isCapturing}
            >
              {/* Inner Button */}
              <div className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300
                ${isCapturing 
                  ? 'bg-white animate-pulse' 
                  : 'bg-white/90 group-hover:bg-white'
                }
              `}></div>
              
              {/* Shutter Animation Ring */}
              {isCapturing && (
                <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
              )}
            </button>
          </div>
        </div>

        {/* Recording Indicator */}
        {isCapturing && (
          <div className="absolute top-6 right-6 z-40">
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-md rounded-full px-3 py-1 border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium tracking-wide">REC</span>
            </div>
          </div>
        )}

        {/* Device-like details */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
            <span className="text-white/40 text-xs font-mono">LIVE</span>
          </div>
        </div>
      </div>

    </div>
  );
}