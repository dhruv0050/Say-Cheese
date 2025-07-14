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
    const captured = [];

    for (let i = 0; i < 3; i++) {
      await startCountdown(); // wait 3..2..1
      const photo = captureFromVideo(videoRef.current, selectedFilter);
      captured.push(photo);
      setPhotos([...captured]);
    }

    sessionStorage.setItem('photoBoothStrip', JSON.stringify(captured));
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
      case 'grayscale': return 'grayscale(100%)';
      case 'sepia': return 'sepia(100%)';
      case 'invert': return 'invert(100%)';
      case 'brightness': return 'brightness(1.5)';
      case 'contrast': return 'contrast(200%)';
      default: return 'none';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">📸 Gen-Z Photo Booth</h1>

      <div className="relative">
        <CameraFeed videoRef={videoRef} filter={selectedFilter} />
        <CountdownOverlay count={countdown} />
      </div>
      <FilterSelector selected={selectedFilter} onChange={setSelectedFilter} />

      <button
        onClick={capturePhotos}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Take 3 Photos
      </button>

      <div className="flex gap-4 mt-6">
        {photos.map((src, i) => (
          <img key={i} src={src} alt={`snap-${i}`} className="w-24 h-auto border border-white" />
        ))}
      </div>
    </main>
  );
}
