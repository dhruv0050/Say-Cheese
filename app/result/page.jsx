'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PhotoStrip from '@/components/PhotoStrip';

export default function ResultPage() {
  const [photos, setPhotos] = useState([]);
  const searchParams = useSearchParams(); 
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('photoBoothStrip');
    if (stored) {
      setPhotos(JSON.parse(stored));
    } else {
      router.push('/');
    }
  }, []);

  const handleReshoot = () => {
    sessionStorage.removeItem('photoBoothStrip');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {photos.length === 3 && (
        <PhotoStrip photos={photos} onReshoot={handleReshoot} />
      )}
    </main>
  );
}
