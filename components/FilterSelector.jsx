'use client';

export default function FilterSelector({ selected, onChange }) {
  const filters = ['normal', 'grayscale', 'sepia', 'invert', 'brightness', 'contrast'];

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`py-1 px-3 rounded-full text-sm ${
            selected === filter ? 'bg-pink-500 text-white' : 'bg-white text-black'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
