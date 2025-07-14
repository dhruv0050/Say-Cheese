'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function PhotoStrip({ photos, onReshoot }) {
  const stripRef = useRef(null);

  const downloadStrip = async () => {
    if (!stripRef.current) return;

    const canvas = await html2canvas(stripRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'photo-strip.png';
    link.click();
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div
        ref={stripRef}
        className="bg-white p-4 rounded-lg flex flex-col gap-2 shadow-xl"
      >
        {photos.map((src, i) => (
          <img key={i} src={src} alt={`strip-${i}`} className="w-48 rounded-md" />
        ))}
        <p className="text-xs text-center mt-2 text-black italic">
          SayCheese • {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onReshoot}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Reshoot
        </button>
        <button
          onClick={downloadStrip}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Download Strip
        </button>
      </div>
    </div>
  );
}
