import React from 'react';

export default function MascotBanner({ message }) {
  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-2">
      <div className="flex items-center gap-3 bg-amber-100/95 border-2 border-amber-300 rounded-full px-4 py-2 shadow-lg backdrop-blur-xs">
        {/* Mascot Avatar (Cute boy waving hand) */}
        <div className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-200 border-2 border-amber-400 overflow-hidden shadow-inner flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background sunbeam */}
            <circle cx="50" cy="50" r="45" fill="#fef08a" />
            
            {/* Head & Neck */}
            <rect x="42" y="65" width="16" height="15" fill="#fed7aa" />
            <circle cx="50" cy="48" r="28" fill="#fed7aa" />
            
            {/* Hair (Brown) */}
            <path d="M 22 45 C 22 25 40 18 50 18 C 60 18 78 25 78 45 C 78 30 70 25 50 25 C 30 25 22 35 22 45 Z" fill="#78350f" />
            <path d="M 30 26 Q 45 32 55 24 Q 65 32 72 26 Q 55 18 30 26 Z" fill="#92400e" />
            
            {/* Eyes & Smile */}
            <circle cx="40" cy="48" r="3.5" fill="#1e293b" />
            <circle cx="60" cy="48" r="3.5" fill="#1e293b" />
            <circle cx="41.5" cy="46.5" r="1.2" fill="#ffffff" />
            <circle cx="61.5" cy="46.5" r="1.2" fill="#ffffff" />
            <path d="M 43 56 Q 50 64 57 56" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Cheeks */}
            <circle cx="34" cy="53" r="4" fill="#fda4af" opacity="0.8" />
            <circle cx="66" cy="53" r="4" fill="#fda4af" opacity="0.8" />

            {/* Waving Hand */}
            <g transform="translate(14, 60) rotate(-20)">
              <circle cx="8" cy="8" r="7" fill="#fed7aa" />
              <rect x="5" y="10" width="6" height="12" fill="#fed7aa" />
            </g>
          </svg>
        </div>

        {/* Instruction Message */}
        <div className="flex-1 min-w-0">
          <p className="text-amber-950 font-bold text-sm md:text-base leading-tight tracking-wide drop-shadow-xs">
            {message || 'Tekan kotak kosong untuk paparkan huruf.'}
          </p>
        </div>
      </div>
    </div>
  );
}
