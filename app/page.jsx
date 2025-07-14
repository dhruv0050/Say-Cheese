'use client';
import { useRef, useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import PhotoStrip from '@/components/PhotoStrip';
import { useRouter } from 'next/navigation';
import CountdownOverlay from '@/components/CountdownOverlay';
import '../app/globals.css';

export default function Home() {
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [isCapturing, setIsCapturing] = useState(false);

  const startCountdown = () => {
    return new Promise((resolve) => {
      let count = 3;
      setCountdown(count);
      const interval = setInterval(() => {
        count--;
        if (count === 0) {
          clearInterval(interval);
          setCountdown(0);
          resolve();
        } else {
          setCountdown(count);
        }
      }, 1000);
    });
  };

  const capturePhotos = async () => {
    setIsCapturing(true);
    const captured = [];

    for (let i = 0; i < 3; i++) {
      await startCountdown(); // wait 3..2..1
      const photo = captureFromVideo(videoRef.current, selectedFilter);
      captured.push(photo);
      setPhotos([...captured]);
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('photoBoothStrip', JSON.stringify(captured));
    }
    setIsCapturing(false);
    router.push('/result');
  };

  const captureFromVideo = (video, filter) => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.filter = getCanvasFilter(filter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  };

  const getCanvasFilter = (filter) => {
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

  const clearPhotos = () => {
    setPhotos([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('photoBoothStrip');
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#171717] via-[#262626] to-black flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from- to-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-4 tracking-wider photo-booth-title">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  SAY CHEESE!
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base font-light mt-6 tracking-wide photo-booth-subtitle">
              Strike a pose • Make memories • Live the moment
            </p>
          </div>

          {/* Camera Section - Modernized Glass Card */}
          <div className="relative mb-12 sm:mb-16 flex justify-center items-center">
            <div className="relative group">
              {/* Glass Card Container */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl camera-container">
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Camera Feed */}
                <div className="relative z-10">
                  <CameraFeed
                    videoRef={videoRef}
                    filter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    onCapture={capturePhotos}
                    isCapturing={isCapturing} 
                  />
                </div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg"></div>
                <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg"></div>
                <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg"></div>
              </div>
            </div>
            
            {/* Enhanced Countdown Overlay */}
            <CountdownOverlay count={countdown} />
          </div>

          {/* Action Buttons - Minimalist Design */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {photos.length > 0 && (
              <button
                onClick={clearPhotos}
                className="group relative px-8 py-4 rounded-full font-light text-white/90 
                           bg-white/5 backdrop-blur-md border border-white/10 
                           hover:bg-white/10 hover:border-white/20 transition-all duration-500
                           shadow-lg hover:shadow-xl transform hover:scale-105
                           overflow-hidden clear-button"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Text */}
                <span className="relative z-10 tracking-wide text-sm sm:text-base">
                  Clear Photos
                </span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
              </button>
            )}
          </div>

          {/* Status Indicator */}
          {isCapturing && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-black/70 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 border border-white/20">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-light tracking-wide">CAPTURING</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}