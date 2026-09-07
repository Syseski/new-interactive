import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Palette,
  Undo2,
  Upload,
  Paintbrush,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Custom Brush Image component supporting user's custom image (public/images/brush.png or uploaded image)
function CustomBrushIcon({ activeColor = '#38BDF8', className = "w-7 h-7 sm:w-8 sm:h-8", allowUpload = false }) {
  const [imgSrc, setImgSrc] = useState(() => {
    return localStorage.getItem('custom_brush_image') || getAssetUrl('/images/brush.png');
  });
  const [imgFailed, setImgFailed] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImgSrc(result);
        setImgFailed(false);
        try {
          localStorage.setItem('custom_brush_image', result);
        } catch (err) {
          console.warn('Could not save to localStorage:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative inline-flex items-center justify-center cursor-pointer group"
      onClick={() => allowUpload && fileInputRef.current?.click()}
      title={allowUpload ? "Tekan untuk tukar gambar berus anda sendiri" : "Berus Mewarna"}
    >
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {!imgFailed && imgSrc ? (
        <img
          src={imgSrc}
          alt="Berus Mewarna"
          className={`${className} object-contain filter drop-shadow-md select-none transition-transform group-hover:scale-110`}
          onError={() => {
            if (imgSrc.includes('/images/brush.png') || imgSrc === '/images/brush.png') {
              setImgSrc(getAssetUrl('/images/brush.jpg'));
            } else if (imgSrc === '/images/brush.jpg') {
              setImgSrc(getAssetUrl('/images/brush.svg'));
            } else if (imgSrc === '/images/brush.svg') {
              setImgSrc(getAssetUrl('/images/brush.webp'));
            } else {
              setImgFailed(true);
            }
          }}
        />
      ) : (
        <svg viewBox="0 0 48 48" className={`${className} filter drop-shadow-sm transition-transform group-hover:scale-110`} fill="none">
          {/* Wooden Brush Handle */}
          <path d="M36 6 C39 9 39 12 34 17 L21 30 L16 25 L29 12 C34 7 33 3 36 6 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Ferrule / Metal Collar */}
          <polygon points="22,28 26,32 20,36 16,32" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          {/* Bristles / Tip with dynamic active color */}
          <path d="M18 34 C14 38 9 41 6 42 C7 39 10 34 14 30 Z" fill={activeColor} stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="8" cy="40" r="1.5" fill={activeColor} />
          <circle cx="10" cy="37" r="0.8" fill="#FFFFFF" opacity="0.8" />
        </svg>
      )}
    </div>
  );
}

// Geometric Shape Renderer with 3D Candy Gloss & Gradients
function ShapeGraphic({ type, isColored, color = '#38BDF8', className = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" }) {
  const safeColor = typeof color === 'string' && color ? color : '#38BDF8';
  const cleanHex = safeColor.replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `grad-${type || 'shape'}-${cleanHex || 'default'}`;

  switch (type) {
    case 'triangle':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          {/* Base Triangle */}
          <polygon
            points="20,5 36,33 4,33"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* 3D Gloss Highlight */}
          {isColored && (
            <polygon points="20,9 31,30 20,24" fill="#FFFFFF" opacity="0.35" />
          )}
        </svg>
      );

    case 'pentagon':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <polygon
            points="20,4 36,16 30,35 10,35 4,16"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {isColored && (
            <path d="M20 7 L32 17 L25 32 Z" fill="#FFFFFF" opacity="0.35" />
          )}
        </svg>
      );

    case 'hexagon':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <polygon
            points="20,4 34,12 34,28 20,36 6,28 6,12"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {isColored && (
            <ellipse cx="20" cy="14" rx="8" ry="4" fill="#FFFFFF" opacity="0.4" />
          )}
        </svg>
      );

    case 'octagon':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <polygon
            points="12,4 28,4 36,12 36,28 28,36 12,36 4,28 4,12"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {isColored && (
            <ellipse cx="20" cy="13" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.4" />
          )}
        </svg>
      );

    case 'square':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect
            x="5"
            y="5"
            width="30"
            height="30"
            rx="5"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
          />
          {isColored && (
            <rect x="7" y="7" width="26" height="11" rx="3" fill="#FFFFFF" opacity="0.35" />
          )}
        </svg>
      );

    case 'decagon':
      return (
        <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-xs transition-transform hover:scale-115`} fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="40%" stopColor={safeColor} />
              <stop offset="100%" stopColor={safeColor} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <polygon
            points="20,4 29,7 35,14 36,23 32,31 23,36 17,36 8,31 4,23 5,14 11,7"
            fill={isColored ? `url(#${gradientId})` : '#FFFFFF'}
            stroke={isColored ? '#0F172A' : '#64748B'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {isColored && (
            <ellipse cx="20" cy="14" rx="7" ry="4" fill="#FFFFFF" opacity="0.4" />
          )}
        </svg>
      );

    default:
      return null;
  }
}

// 6 Soalan Mengikut Lembaran Kerja (1 Soalan Setiap Halaman)
const QUESTIONS = [
  {
    id: 1,
    number: 1,
    targetCount: 13,
    totalShapes: 20, // 2 rows of 10
    shapeType: 'triangle',
    shapeName: 'Segi Tiga',
    themeColor: '#38BDF8', // Sky blue
  },
  {
    id: 2,
    number: 2,
    targetCount: 18,
    totalShapes: 20,
    shapeType: 'pentagon',
    shapeName: 'Pentagon',
    themeColor: '#F59E0B', // Amber
  },
  {
    id: 3,
    number: 3,
    targetCount: 20,
    totalShapes: 20,
    shapeType: 'hexagon',
    shapeName: 'Heksagon',
    themeColor: '#EC4899', // Pink
  },
  {
    id: 4,
    number: 4,
    targetCount: 11,
    totalShapes: 20,
    shapeType: 'octagon',
    shapeName: 'Oktagon',
    themeColor: '#10B981', // Emerald green
  },
  {
    id: 5,
    number: 5,
    targetCount: 16,
    totalShapes: 20,
    shapeType: 'square',
    shapeName: 'Segi Empat',
    themeColor: '#8B5CF6', // Purple
  },
  {
    id: 6,
    number: 6,
    targetCount: 19,
    totalShapes: 20,
    shapeType: 'decagon',
    shapeName: 'Bentuk Bucu',
    themeColor: '#F97316', // Orange
  },
];

// Pilihan Warna Berus
const COLOR_PALETTE = [
  { name: 'Biru Cerah', hex: '#38BDF8' },
  { name: 'Kuning Jingga', hex: '#F59E0B' },
  { name: 'Merah Jambu', hex: '#EC4899' },
  { name: 'Hijau Segar', hex: '#10B981' },
  { name: 'Ungu Comel', hex: '#8B5CF6' },
  { name: 'Oren Terang', hex: '#F97316' },
];

export default function NumeracyCountColorGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const q = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];

  // State: colored indices per question { [questionId]: Set of shape indices }
  const [coloredShapes, setColoredShapes] = useState({});
  const [selectedBrushColor, setSelectedBrushColor] = useState(COLOR_PALETTE[0].hex);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const currentColoredSet = coloredShapes[q.id] || new Set();
  const currentCount = currentColoredSet.size;
  const isTargetReached = currentCount === q.targetCount;
  const isOverLimit = currentCount > q.targetCount;
  const progressPercent = Math.min(100, Math.round((currentCount / q.targetCount) * 100));

  // Toggle color on a single shape
  const handleToggleShape = (shapeIndex) => {
    playPopSound();

    const currentSetOfQuestion = new Set(coloredShapes[q.id] || []);
    if (currentSetOfQuestion.has(shapeIndex)) {
      currentSetOfQuestion.delete(shapeIndex);
    } else {
      currentSetOfQuestion.add(shapeIndex);
    }

    const nextColoredState = {
      ...coloredShapes,
      [q.id]: currentSetOfQuestion,
    };
    setColoredShapes(nextColoredState);

    // Check if current question reaches target
    if (currentSetOfQuestion.size === q.targetCount) {
      playMatchSuccessSound();
    }

    // Check if ALL 6 questions reach exact target count
    const allCompleted = QUESTIONS.every((item) => {
      const setItem = nextColoredState[item.id];
      return setItem && setItem.size === item.targetCount;
    });

    if (allCompleted) {
      setTimeout(() => {
        playVictorySound();
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
        });
        setShowCompletionModal(true);
      }, 500);
    }
  };

  // Reset current question coloring
  const handleResetCurrent = () => {
    playWhooshSound();
    setColoredShapes((prev) => ({
      ...prev,
      [q.id]: new Set(),
    }));
  };

  // Reset all questions
  const handleResetAll = () => {
    playWhooshSound();
    setColoredShapes({});
    setCurrentQuestionIndex(0);
    setShowCompletionModal(false);
  };

  // Count total completed questions out of 6
  const totalCompletedCount = QUESTIONS.filter((item) => {
    const setItem = coloredShapes[item.id];
    return setItem && setItem.size === item.targetCount;
  }).length;

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto bg-slate-50 select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-4">
      {/* Grid Worksheet Notebook Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #93c5fd 1px, transparent 1px), linear-gradient(to bottom, #93c5fd 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between px-1 pt-1 pb-2">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-full shadow-[0_4px_0_0_#fcd34d] border-2 border-amber-300 font-['Fredoka'] font-black text-xs sm:text-sm transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Menu</span>
        </button>

        {/* 6-Question Pagination Step Indicators */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 px-2 sm:px-3 py-1.5 rounded-full shadow-[0_4px_0_0_#e2e8f0] border-2 border-sky-200">
          {QUESTIONS.map((item, idx) => {
            const isQDone = coloredShapes[item.id]?.size === item.targetCount;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={item.id}
                onClick={() => {
                  playPopSound();
                  setCurrentQuestionIndex(idx);
                }}
                title={`Soalan ${idx + 1}`}
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 rounded-full font-['Fredoka'] font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center border-2
                  ${
                    isCurrent
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 border-blue-700 text-white shadow-md scale-110'
                      : isQDone
                      ? 'bg-emerald-400 border-emerald-600 text-white scale-100'
                      : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-sky-50'
                  }
                `}
              >
                {isQDone ? '✓' : idx + 1}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCurrent}
            title="Padam Warna Soalan Ini"
            className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-full shadow-[0_4px_0_0_#cbd5e1] border-2 border-slate-300 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan"
            className="p-2 bg-slate-900 text-amber-300 rounded-full shadow-[0_4px_0_0_#b45309] border-2 border-amber-400 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <Settings className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* INSTRUCTION HEADER BANNER & PALETTE */}
      <div className="relative z-10 w-full max-w-2xl bg-gradient-to-r from-sky-500/10 via-white to-blue-500/10 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-[0_6px_0_0_#e2e8f0] border-3 border-sky-300 mb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-md flex-shrink-0 animate-bounce p-1 border-2 border-white/80"
            style={{ animationDuration: '2.5s' }}
            title="Gambar Berus"
          >
            <CustomBrushIcon activeColor={selectedBrushColor} className="w-8 h-8 sm:w-10 sm:h-10" allowUpload={true} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white font-['Fredoka'] font-black text-xs">
                Soalan {q.number} / 6
              </span>
              <span className="text-xs text-slate-500 font-bold">
                {totalCompletedCount}/6 Selesai ⭐
              </span>
            </div>
            <span className="font-['Fredoka'] font-black text-base sm:text-lg md:text-xl text-slate-800 leading-tight mt-0.5">
              Warnakan <span className="text-sky-600 underline decoration-sky-300 decoration-3">{q.targetCount}</span> {q.shapeName}
            </span>
          </div>
        </div>

        {/* Palette Selector */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-slate-100 to-amber-50 p-1.5 rounded-full border-2 border-amber-300 shadow-xs">
          <div className="pl-1 pr-0.5" title="Berus Warna Aktif">
            <CustomBrushIcon activeColor={selectedBrushColor} className="w-5 h-5 sm:w-6 sm:h-6" allowUpload={true} />
          </div>
          {COLOR_PALETTE.map((c) => (
            <button
              key={c.hex}
              onClick={() => {
                playPopSound();
                setSelectedBrushColor(c.hex);
              }}
              title={c.name}
              className={`
                w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all cursor-pointer shadow-xs
                ${
                  selectedBrushColor === c.hex
                    ? 'ring-3 ring-slate-800 scale-120 ring-offset-2 z-10'
                    : 'hover:scale-110 opacity-85 hover:opacity-100'
                }
              `}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* SINGLE QUESTION MAIN INTERACTIVE CARD */}
      <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col justify-center my-1">
        <div
          className={`
            relative w-full bg-white rounded-3xl p-4 sm:p-6 shadow-[0_8px_0_0_#e2e8f0] border-4 transition-all duration-300 flex flex-col items-center gap-4
            ${
              isTargetReached
                ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/50 to-white shadow-[0_8px_0_0_#a7f3d0] ring-3 ring-emerald-300'
                : isOverLimit
                ? 'border-rose-400 bg-gradient-to-b from-rose-50/50 to-white shadow-[0_8px_0_0_#fecdd3] ring-3 ring-rose-300 animate-shake'
                : 'border-sky-300 hover:border-sky-400'
            }
          `}
        >
          {/* Target Number Display & Status Counter */}
          <div className="flex items-center justify-between w-full px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center text-white shadow-md border-3 border-amber-200">
                <span className="font-['Fredoka'] font-black text-3xl sm:text-4xl leading-none">
                  {q.targetCount}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wide opacity-90">
                  Sasaran
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-['Fredoka'] font-black text-sm sm:text-base text-slate-700">
                  {q.shapeName}
                </span>
                <span
                  className={`
                    px-2.5 py-1 rounded-full font-['Fredoka'] font-black text-xs sm:text-sm shadow-xs inline-flex items-center gap-1.5 w-fit mt-1
                    ${
                      isTargetReached
                        ? 'bg-emerald-500 text-white animate-pop'
                        : isOverLimit
                        ? 'bg-rose-500 text-white animate-wiggle'
                        : 'bg-sky-100 text-sky-800'
                    }
                  `}
                >
                  <span>{currentCount} / {q.targetCount} Diwarnakan</span>
                  {isTargetReached && <CheckCircle2 className="w-4 h-4 text-white" />}
                </span>
              </div>
            </div>

            {/* Progress Bar & Status Text */}
            <div className="flex flex-col items-end gap-1.5 w-32 sm:w-44">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                {isTargetReached ? 'Tepat & Selesai! ⭐' : isOverLimit ? 'Terlebih warna!' : `${q.targetCount - currentCount} lagi diperlukan`}
              </span>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
                <div
                  className={`h-full transition-all duration-300 ${
                    isTargetReached ? 'bg-emerald-500' : isOverLimit ? 'bg-rose-500' : 'bg-sky-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Shapes Grid (2 Rows of 10 Shapes with Extra Large Sizing) */}
          <div className="w-full bg-slate-50/90 rounded-2xl p-3 sm:p-5 border-2 border-slate-200 flex flex-col gap-3 sm:gap-4 justify-center items-center shadow-inner">
            {/* Row 1 (Shapes 0 to 9) */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 justify-items-center w-full max-w-xl">
              {Array.from({ length: 10 }).map((_, colIdx) => {
                const shapeIdx = colIdx;
                const isShapeColored = currentColoredSet.has(shapeIdx);

                return (
                  <button
                    key={shapeIdx}
                    type="button"
                    onClick={() => handleToggleShape(shapeIdx)}
                    className={`
                      p-1 sm:p-2 rounded-xl transition-all duration-150 active:scale-85 cursor-pointer flex items-center justify-center bg-white border-2 shadow-xs
                      ${
                        isShapeColored
                          ? 'border-slate-800 scale-105 shadow-sm'
                          : 'border-slate-200 hover:border-sky-400 hover:scale-110 opacity-80 hover:opacity-100'
                      }
                    `}
                  >
                    <ShapeGraphic
                      type={q.shapeType}
                      isColored={isShapeColored}
                      color={selectedBrushColor || q.themeColor}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                    />
                  </button>
                );
              })}
            </div>

            {/* Row 2 (Shapes 10 to 19) */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3 justify-items-center w-full max-w-xl">
              {Array.from({ length: 10 }).map((_, colIdx) => {
                const shapeIdx = colIdx + 10;
                const isShapeColored = currentColoredSet.has(shapeIdx);

                return (
                  <button
                    key={shapeIdx}
                    type="button"
                    onClick={() => handleToggleShape(shapeIdx)}
                    className={`
                      p-1 sm:p-2 rounded-xl transition-all duration-150 active:scale-85 cursor-pointer flex items-center justify-center bg-white border-2 shadow-xs
                      ${
                        isShapeColored
                          ? 'border-slate-800 scale-105 shadow-sm'
                          : 'border-slate-200 hover:border-sky-400 hover:scale-110 opacity-80 hover:opacity-100'
                      }
                    `}
                  >
                    <ShapeGraphic
                      type={q.shapeType}
                      isColored={isShapeColored}
                      color={selectedBrushColor || q.themeColor}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PAGINATION NAVIGATION CONTROLS */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between gap-3 pt-2 pb-1">
        <button
          onClick={() => {
            if (currentQuestionIndex > 0) {
              playPopSound();
              setCurrentQuestionIndex((prev) => prev - 1);
            }
          }}
          disabled={currentQuestionIndex === 0}
          className={`
            flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-['Fredoka'] font-black text-xs sm:text-sm shadow-[0_4px_0_0_#cbd5e1] border-2 border-slate-300 transition-all cursor-pointer
            ${
              currentQuestionIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-slate-100 text-slate-700 hover:scale-105 active:translate-y-1 active:shadow-none'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
          <span>Sebelumnya</span>
        </button>

        <span className="font-['Fredoka'] font-extrabold text-xs sm:text-sm text-slate-500">
          Soalan {currentQuestionIndex + 1} daripada 6
        </span>

        {currentQuestionIndex < QUESTIONS.length - 1 ? (
          <button
            onClick={() => {
              playPopSound();
              setCurrentQuestionIndex((prev) => prev + 1);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-['Fredoka'] font-black text-xs sm:text-sm shadow-[0_4px_0_0_#0284c7] border-2 border-blue-400 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button
            onClick={() => {
              playVictorySound();
              confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
              setShowCompletionModal(true);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl font-['Fredoka'] font-black text-xs sm:text-sm shadow-[0_4px_0_0_#15803d] border-2 border-emerald-400 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer animate-pop"
          >
            <span>Semak Selesai</span>
            <Trophy className="w-4 h-4 text-amber-300" />
          </button>
        )}
      </div>

      {/* COMPLETION VICTORY MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-sky-400 text-center flex flex-col items-center animate-pop">
            <ThreeGoldenStarsCluster />

            <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-sky-700 mt-3">
              Tahniah! Sangat Hebat! 🎉
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-bold mt-1">
              Anda berjaya menyelesaikan kesemua 6 soalan mewarna dengan tepat!
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <button
                onClick={handleResetAll}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-['Fredoka'] font-bold text-sm sm:text-base transition-transform active:scale-95 cursor-pointer shadow-sm"
              >
                Mula Semula
              </button>

              <button
                onClick={onBackToMenu}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-['Fredoka'] font-black text-sm sm:text-base shadow-[0_4px_0_0_#15803d] transition-transform hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                Ke Menu Utama 🏆
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


