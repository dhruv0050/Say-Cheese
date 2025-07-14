'use client';
export default function CountdownOverlay({ count }) {
  if (count === 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
      <span className="text-7xl font-bold text-white animate-pulse">{count}</span>
    </div>
  );
}
