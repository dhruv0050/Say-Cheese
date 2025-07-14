'use client';
import { useRef, useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import FilterSelector from '@/components/FilterSelector';
import PhotoStrip from '@/components/PhotoStrip';
import { useRouter } from 'next/navigation';
import CountdownOverlay from '@/components/CountdownOverlay';

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
    
    sessionStorage.setItem('photoBoothStrip', JSON.stringify(captured));
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
      case 'cool':
        return 'hue-rotate(180deg) saturate(1.1) brightness(1.05)';
      case 'dramatic':
        return 'contrast(1.4) brightness(0.95) saturate(1.3)';
      case 'soft':
        return 'blur(0.5px) brightness(1.1) saturate(1.1)';
      case 'vivid':
        return 'saturate(1.5) contrast(1.2) brightness(1.05)';
      case 'retro':
        return 'sepia(0.4) contrast(1.3) brightness(1.1) saturate(0.9) hue-rotate(10deg)';
      case 'dreamy':
        return 'blur(1px) brightness(1.15) saturate(1.2) contrast(0.9)';
      case 'cyberpunk':
        return 'hue-rotate(270deg) saturate(1.5) contrast(1.3) brightness(1.1)';
      case 'golden':
        return 'sepia(0.2) saturate(1.3) brightness(1.1) contrast(1.1) hue-rotate(15deg)';
      case 'arctic':
        return 'hue-rotate(180deg) saturate(0.7) brightness(1.2) contrast(1.1)';
      default:
        return 'none';
    }
  };

  const clearPhotos = () => {
    setPhotos([]);
    sessionStorage.removeItem('photoBoothStrip');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-800 mb-2 tracking-wide">
          Photo Booth
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-light">
          Capture your moments in style
        </p>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Camera Section */}
        <div className="relative mb-8 sm:mb-12">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
            <CameraFeed videoRef={videoRef} filter={selectedFilter} />
            <CountdownOverlay count={countdown} />
          </div>
        </div>

        {/* Filter Selection */}
        <div className="mb-8 sm:mb-12">
          <FilterSelector selected={selectedFilter} onChange={setSelectedFilter} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={capturePhotos}
            disabled={isCapturing}
            className={`
              px-8 py-4 rounded-full font-medium text-white text-lg
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-xl
              ${isCapturing 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }
            `}
          >
            {isCapturing ? 'Capturing...' : 'Start Photo Session'}
          </button>

          {photos.length > 0 && (
            <button
              onClick={clearPhotos}
              className="px-6 py-3 rounded-full font-medium text-slate-600 bg-white 
                         border border-slate-200 hover:bg-slate-50 transition-all duration-300
                         shadow-md hover:shadow-lg"
            >
              Clear Photos
            </button>
          )}
        </div>

        {/* Photo Preview Section */}
        {photos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200/50">
            <h3 className="text-xl sm:text-2xl font-light text-slate-800 mb-6 text-center">
              Your Photos ({photos.length}/3)
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {photos.map((src, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={src} 
                    alt={`Photo ${i + 1}`}
                    className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-lg shadow-md 
                               border-2 border-white group-hover:shadow-lg transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 
                                  rounded-lg transition-all duration-300"></div>
                </div>
              ))}
              
              {/* Placeholder for remaining photos */}
              {[...Array(3 - photos.length)].map((_, i) => (
                <div key={`placeholder-${i}`} 
                     className="w-24 h-32 sm:w-32 sm:h-40 bg-slate-100 rounded-lg 
                                border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <span className="text-slate-400 text-sm font-light">
                    {photos.length + i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm font-light">
          Ready when you are ✨
        </p>
      </div>
    </main>
  );
}