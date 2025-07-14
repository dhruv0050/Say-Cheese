'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PhotoStrip from '@/components/PhotoStrip';

export default function ResultPage() {
  const [photos, setPhotos] = useState([]);
  const searchParams = useSearchParams(); // ✅ allowed here
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
      <h1 className="text-3xl font-bold mb-4">📸 Here's Your Strip!</h1>
      {photos.length === 3 && (
        <PhotoStrip photos={photos} onReshoot={handleReshoot} />
      )}
    </main>
  );
}
