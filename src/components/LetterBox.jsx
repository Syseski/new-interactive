import React, { useState, useEffect } from 'react';

// Specific border and font colors matching the screenshot
const LETTER_COLORS = {
  a: { border: '#38bdf8', text: '#0284c7' },
  b: { border: '#f472b6', text: '#db2777' },
  c: { border: '#2dd4bf', text: '#0d9488' },
  d: { border: '#facc15', text: '#ca8a04' },
  e: { border: '#c084fc', text: '#9333ea' },
  f: { border: '#fb923c', text: '#ea580c' },
  g: { border: '#f87171', text: '#dc2626' },
  h: { border: '#fb7185', text: '#e11d48' },
  i: { border: '#38bdf8', text: '#0284c7' },
  j: { border: '#818cf8', text: '#4f46e5' },
  k: { border: '#38bdf8', text: '#0284c7' },
  l: { border: '#60a5fa', text: '#2563eb' },
  m: { border: '#a855f7', text: '#7e22ce' },
  n: { border: '#2dd4bf', text: '#0f766e' },
  o: { border: '#3b82f6', text: '#1d4ed8' },
  p: { border: '#38bdf8', text: '#0284c7' },
  q: { border: '#a78bfa', text: '#7c3aed' },
  r: { border: '#f59e0b', text: '#b45309' },
  s: { border: '#94a3b8', text: '#475569' },
  t: { border: '#ef4444', text: '#b91c1c' },
  u: { border: '#ec4899', text: '#be185d' },
  v: { border: '#10b981', text: '#059669' },
  w: { border: '#38bdf8', text: '#0284c7' },
  x: { border: '#93c5fd', text: '#2563eb' },
  y: { border: '#e11d48', text: '#9f1239' },
  z: { border: '#0284c7', text: '#0369a1' },
};

// SVG stroke paths for each lowercase letter in 260x260 coordinate space
const STROKE_PATHS = {
  a: 'M 140 120 C 70 120 70 180 140 180 C 180 180 180 150 180 130 M 180 110 L 180 190',
  b: 'M 90 40 L 90 190 M 90 140 C 130 110 180 120 180 155 C 180 190 130 195 90 190',
  c: 'M 170 125 C 150 105 90 110 90 150 C 90 190 150 195 170 175',
  d: 'M 170 150 C 170 115 100 115 100 150 C 100 185 170 185 170 150 M 170 40 L 170 190',
  e: 'M 90 150 L 170 150 C 170 110 90 110 90 150 C 90 190 160 190 170 175',
  f: 'M 160 55 C 140 40 120 40 120 70 L 120 190 M 95 115 L 145 115',
  g: 'M 160 145 C 160 115 90 115 90 145 C 90 175 160 175 160 145 M 160 115 L 160 215 C 160 245 100 245 90 225',
  h: 'M 90 40 L 90 190 M 90 140 C 120 110 170 110 170 150 L 170 190',
  i: 'M 130 115 L 130 190 M 130 75 L 130 80',
  j: 'M 145 115 L 145 215 C 145 245 95 245 85 225 M 145 75 L 145 80',
  k: 'M 90 40 L 90 190 M 165 115 L 95 155 L 170 190',
  l: 'M 130 40 L 130 190',
  m: 'M 70 115 L 70 190 M 70 140 C 95 115 125 115 125 150 L 125 190 M 125 140 C 150 115 180 115 180 150 L 180 190',
  n: 'M 85 115 L 85 190 M 85 140 C 115 115 165 115 165 150 L 165 190',
  o: 'M 130 115 C 80 115 80 190 130 190 C 180 190 180 115 130 115 Z',
  p: 'M 90 115 L 90 240 M 90 115 C 135 110 170 120 170 150 C 170 185 130 190 90 190',
  q: 'M 160 145 C 160 115 95 115 95 145 C 95 175 160 175 160 145 M 160 115 L 160 240 L 175 230',
  r: 'M 95 115 L 95 190 M 95 145 C 115 115 155 115 165 130',
  s: 'M 160 130 C 150 110 100 110 100 135 C 100 160 160 150 160 175 C 160 200 100 200 90 175',
  t: 'M 130 60 L 130 175 C 130 190 145 190 155 185 M 105 115 L 155 115',
  u: 'M 90 115 L 90 165 C 90 195 160 195 160 165 L 160 115 M 160 140 L 160 190',
  v: 'M 85 115 L 130 190 L 175 115',
  w: 'M 75 115 L 100 190 L 125 130 L 150 190 L 175 115',
  x: 'M 90 115 L 170 190 M 170 115 L 90 190',
  y: 'M 90 115 L 130 165 L 170 115 M 170 115 L 105 235',
  z: 'M 90 115 L 170 115 L 90 190 L 170 190',
};

export default function LetterBox({
  letter,
  isRevealed,
  onLetterClick,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const color = LETTER_COLORS[letter] || { border: '#38bdf8', text: '#0284c7' };
  const strokePath = STROKE_PATHS[letter.toLowerCase()] || STROKE_PATHS.a;

  const handleClick = () => {
    // If not yet revealed, trigger the handwriting animation right inside this box!
    if (!isRevealed && !isAnimating) {
      setIsAnimating(true);
      setIsBouncing(true);

      // Animation duration is 1.3 seconds
      setTimeout(() => {
        setIsAnimating(false);
        setIsBouncing(false);
        onLetterClick(letter);
      }, 1350);
    } else {
      // If already revealed, bounce and speak
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 400);
      onLetterClick(letter);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`
        relative aspect-square w-full rounded-xl sm:rounded-2xl flex items-center justify-center
        bg-white cursor-pointer select-none transition-all duration-200
        hover:scale-105 active:scale-95 shadow-sm sm:shadow-md hover:shadow-lg overflow-hidden
        ${isBouncing ? 'animate-pop' : ''}
        ${!isRevealed && !isAnimating ? 'hover:bg-amber-50/50 hover:ring-2 hover:ring-amber-300 ring-offset-1' : ''}
        ${isAnimating ? 'ring-4 ring-amber-400 ring-offset-1 scale-105' : ''}
      `}
      style={{
        borderWidth: 'clamp(2.5px, 0.5vw, 4px)',
        borderStyle: 'solid',
        borderColor: isAnimating ? '#f59e0b' : color.border,
        boxShadow: isRevealed
          ? `0 3px 8px -2px rgba(0, 0, 0, 0.08), inset 0 -2px 0 0 rgba(0, 0, 0, 0.05)`
          : `0 2px 6px -1px rgba(0, 0, 0, 0.05)`,
      }}
      aria-label={`Huruf ${letter}`}
    >
      {/* 1. If currently animating the handwriting stroke INSIDE THIS BOX */}
      {isAnimating ? (
        <div className="relative w-full h-full flex items-center justify-center p-1">
          {/* Faint background letter guide */}
          <span
            className="absolute font-bold opacity-20 select-none text-slate-400"
            style={{
              fontSize: 'clamp(1.2rem, 3.8vw, 2.75rem)',
              fontFamily: "'Fredoka', 'Nunito', cursive, sans-serif",
            }}
          >
            {letter}
          </span>

          {/* Animated SVG stroke drawing the letter right in the box */}
          <svg viewBox="0 0 260 260" className="w-full h-full">
            <path
              d={strokePath}
              fill="none"
              stroke={color.text}
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="900"
              strokeDashoffset="900"
              style={{
                animation: 'inBoxDrawStroke 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            />
          </svg>

          {/* Animated pencil icon moving while drawing */}
          <span className="absolute -top-1 -right-1 text-sm sm:text-base animate-bounce pointer-events-none">
            ✏️
          </span>
        </div>
      ) : (
        /* 2. Normal State: Bold if revealed, faint (samar-samar) if unrevealed */
        <span
          className={`font-bold leading-none select-none transition-all duration-300 ${
            isRevealed ? 'scale-100 opacity-100' : 'scale-95 opacity-50 text-slate-400'
          }`}
          style={{
            color: isRevealed ? color.text : '#94a3b8',
            fontSize: 'clamp(1.2rem, 3.8vw, 2.75rem)',
            fontFamily: "'Fredoka', 'Nunito', cursive, sans-serif",
            filter: isRevealed ? 'none' : 'grayscale(60%)',
          }}
        >
          {letter}
        </span>
      )}

      {/* Sparkle badge when revealed */}
      {(isBouncing || isAnimating) && (
        <span className="absolute -top-1 -right-1 text-sm sm:text-base pointer-events-none animate-ping">
          ✨
        </span>
      )}

      {/* Inline keyframes for the in-box stroke animation */}
      <style>{`
        @keyframes inBoxDrawStroke {
          0% {
            stroke-dashoffset: 900;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </button>
  );
}
