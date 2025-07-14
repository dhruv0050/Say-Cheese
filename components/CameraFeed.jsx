'use client';
import { useEffect, useRef } from 'react';

export default function CameraFeed({ videoRef, filter }) {
  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
      case 'grayscale': return 'grayscale(100%)';
      case 'sepia': return 'sepia(100%)';
      case 'invert': return 'invert(100%)';
      case 'brightness': return 'brightness(1.5)';
      case 'contrast': return 'contrast(200%)';
      default: return 'none';
    }
  };

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ filter: getCssFilter(filter) }}
      className="rounded-lg w-full max-w-md mx-auto border-2 border-white"
    />
  );
}

