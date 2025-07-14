// 'use client';
// import { useEffect, useRef } from 'react';

// export default function CameraFeed({ videoRef, filter }) {
//   useEffect(() => {
//     async function enableCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error('Error accessing camera:', err);
//       }
//     }

//     enableCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const getCssFilter = (filter) => {
//     switch (filter) {
//       case 'grayscale': return 'grayscale(100%)';
//       case 'sepia': return 'sepia(100%)';
//       case 'invert': return 'invert(100%)';
//       case 'brightness': return 'brightness(1.5)';
//       case 'contrast': return 'contrast(200%)';
//       default: return 'none';
//     }
//   };

//   return (
//     <video
//       ref={videoRef}
//       autoPlay
//       playsInline
//       muted
//       style={{ filter: getCssFilter(filter) }}
//       className="rounded-lg w-full max-w-md mx-auto border-2 border-white"
//     />
//   );
// }


'use client';
import { useEffect, useRef } from 'react';

export default function CameraFeed({ videoRef, filter }) {
  const containerRef = useRef(null);

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

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Camera Frame */}
      <div className="relative aspect-[4/3] bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ filter: getCssFilter(filter) }}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/20"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/20"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/20"></div>
        </div>

        {/* Recording indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">LIVE</span>
        </div>

        {/* Filter name indicator */}
        {filter && filter !== 'normal' && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium capitalize">
              {filter}
            </span>
          </div>
        )}
      </div>

      {/* Camera Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
        <div className="flex items-center justify-center">
          {/* Focus ring animation */}
          <div className="relative">
            <div className="w-16 h-16 border-2 border-white/50 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/30 rounded-full"></div>
              </div>
            </div>
            
            {/* Animated focus ring */}
            <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Lens flare effect (subtle) */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full blur-sm"></div>
    </div>
  );
}