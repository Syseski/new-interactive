import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Eraser,
  Trash2,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Undo2,
  ShieldAlert,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import {
  PHONICS_WORDS,
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  speakLetterAndWord,
  speakOops,
} from '../../utils/soundEffects';
import { PhonicsIllustration, GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const CRAYON_COLORS = [
  { name: 'Biru', value: '#0284c7' },
  { name: 'Merah', value: '#ef4444' },
  { name: 'Hijau', value: '#10b981' },
  { name: 'Kuning', value: '#eab308' },
  { name: 'Ungu', value: '#a855f7' },
  { name: 'Oren', value: '#f97316' },
  { name: 'Merah Jambu', value: '#ec4899' },
  { name: 'Hitam', value: '#1e293b' },
];

const BRUSH_SIZES = [
  { name: 'Nipis', size: 10, label: '•' },
  { name: 'Sederhana', size: 18, label: '●' },
  { name: 'Tebal', size: 28, label: '⬤' },
];

export default function LetterDrawingGame({ orientation, initialLetter, onBackToMenu, onOpenSettings }) {
  const [currentIdx, setCurrentIdx] = useState(() => {
    if (initialLetter) {
      const idx = ALPHABET.indexOf(initialLetter.toLowerCase());
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (initialLetter) {
      const idx = ALPHABET.indexOf(initialLetter.toLowerCase());
      if (idx >= 0) setCurrentIdx(idx);
    }
  }, [initialLetter]);
  const [activeColor, setActiveColor] = useState(CRAYON_COLORS[0].value);
  const [brushSize, setBrushSize] = useState(18);
  const [isEraser, setIsEraser] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const toleranceMode = 'ketat'; // Tetapkan ketelitian garisan kepada Ketat sahaja

  // Drawing assessment state
  const [hasDrawn, setHasDrawn] = useState(false);
  const [hasError, setHasError] = useState(false); // True if any stroke went outside!
  const [errorCount, setErrorCount] = useState(0);
  const [showPraise, setShowPraise] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const canvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // History stack for Undo
  const strokeHistoryRef = useRef([]);
  const currentStrokeRef = useRef([]);

  const currentLetter = ALPHABET[currentIdx];
  const phonics = PHONICS_WORDS[currentLetter] || { word: currentLetter.toUpperCase(), emoji: '⭐' };
  const displayChar = isUpperCase ? currentLetter.toUpperCase() : currentLetter;
  const isLandscape = orientation === 'landscape';

  // Setup offscreen collision mask
  const updateMask = useCallback((width, height, dpr) => {
    if (!width || !height) return;

    let maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) {
      maskCanvas = document.createElement('canvas');
      maskCanvasRef.current = maskCanvas;
    }

    maskCanvas.width = width * dpr;
    maskCanvas.height = height * dpr;

    const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
    mCtx.scale(dpr, dpr);
    mCtx.clearRect(0, 0, width, height);

    // Font size tailored to canvas height
    const fontSize = Math.min(width * 0.72, height * 0.76);
    mCtx.font = `bold ${fontSize}px 'Fredoka', 'Nunito', sans-serif`;
    mCtx.textAlign = 'center';
    mCtx.textBaseline = 'middle';

    // Allowable corridor thickness for Ketat mode
    const corridorWidth = 32;

    // Draw dilated stroke to create the boundary corridor
    mCtx.strokeStyle = '#000000';
    mCtx.lineWidth = corridorWidth;
    mCtx.lineCap = 'round';
    mCtx.lineJoin = 'round';
    mCtx.strokeText(displayChar, width / 2, height / 2);
    mCtx.fillStyle = '#000000';
    mCtx.fillText(displayChar, width / 2, height / 2);
  }, [displayChar, toleranceMode]);

  // Reset or resize main canvas
  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    updateMask(rect.width, rect.height, dpr);

    setHasDrawn(false);
    setHasError(false);
    setErrorCount(0);
    setShowPraise(false);
    setShowErrorModal(false);
    strokeHistoryRef.current = [];
    currentStrokeRef.current = [];
  }, [updateMask]);

  useEffect(() => {
    resetCanvas();
  }, [currentIdx, isUpperCase, toleranceMode, resetCanvas]);

  useEffect(() => {
    const handleResize = () => resetCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resetCanvas]);

  // Redraw all strokes from history stack (e.g. after undo)
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    let anyError = false;
    let anyDrawn = false;

    strokeHistoryRef.current.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      anyDrawn = true;
      if (stroke.isError) anyError = true;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.strokeStyle = stroke.isEraser ? '#ffffff' : stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.stroke();
      ctx.restore();
    });

    setHasDrawn(anyDrawn);
    setHasError(anyError);
  };

  const handleUndo = () => {
    if (strokeHistoryRef.current.length === 0) return;
    playPopSound();
    strokeHistoryRef.current.pop();
    redrawCanvas();
  };

  // Check if coordinates fall inside the letter mask
  const isInsideLetter = (x, y) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return true;

    const dpr = window.devicePixelRatio || 1;
    const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
    if (!mCtx) return true;

    const px = Math.round(x * dpr);
    const py = Math.round(y * dpr);

    if (px < 0 || px >= maskCanvas.width || py < 0 || py >= maskCanvas.height) {
      return false;
    }

    try {
      const pixel = mCtx.getImageData(px, py, 1, 1).data;
      return pixel[3] > 15; // Alpha > 15 means inside the letter corridor
    } catch {
      return true;
    }
  };

  const handleHearAudio = () => {
    speakLetterAndWord(currentLetter);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const startX = clientX - rect.left;
    const startY = clientY - rect.top;

    isDrawingRef.current = true;
    lastPointRef.current = { x: startX, y: startY };

    const pointValid = isEraser || isInsideLetter(startX, startY);

    if (!pointValid && !isEraser) {
      setHasError(true);
      setErrorCount((prev) => prev + 1);
      playOopsSound();
    }

    currentStrokeRef.current = {
      color: !pointValid ? '#dc2626' : activeColor,
      size: brushSize,
      isEraser,
      isError: !pointValid,
      points: [{ x: startX, y: startY }],
    };

    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    // Check collision with letter mask
    const pointValid = isEraser || isInsideLetter(currentX, currentY);

    if (!pointValid && !isEraser && !currentStrokeRef.current.isError) {
      currentStrokeRef.current.isError = true;
      setHasError(true);
      setErrorCount((prev) => prev + 1);
      playOopsSound();
    }

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentX, currentY);

    // If stroke went out of bounds, render in warning red!
    ctx.strokeStyle = isEraser
      ? '#ffffff'
      : currentStrokeRef.current.isError
      ? '#dc2626'
      : activeColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.stroke();

    lastPointRef.current = { x: currentX, y: currentY };
    currentStrokeRef.current.points.push({ x: currentX, y: currentY });
  };

  const stopDrawing = () => {
    if (isDrawingRef.current && currentStrokeRef.current) {
      strokeHistoryRef.current.push(currentStrokeRef.current);
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    playWhooshSound();
    resetCanvas();
  };

  const handlePrevious = () => {
    playPopSound();
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : ALPHABET.length - 1));
  };

  const handleNext = () => {
    playPopSound();
    setCurrentIdx((prev) => (prev < ALPHABET.length - 1 ? prev + 1 : 0));
  };

  const handleCheckAnswer = () => {
    if (!hasDrawn) {
      playOopsSound();
      return;
    }

    // If any stroke was out of bounds, IT IS WRONG!
    if (hasError) {
      playOopsSound();
      speakOops();
      setShowErrorModal(true);
    } else {
      // Correct!
      playVictorySound();
      setShowPraise(true);

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        handleNext();
      }, 2200);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-hidden font-['Nunito']">
      {/* Top Header: Kembali ke Menu, Case Switcher (Huruf Kecil / Besar) & Tetapan */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2 z-10 mb-1">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Pilihan Huruf Kecil / Huruf Besar (Sangat Jelas & Menonjol) */}
        <div className="flex items-center bg-white/95 p-1 rounded-full shadow-md border-2 border-amber-400">
          <button
            onClick={() => {
              if (isUpperCase) {
                playPopSound();
                setIsUpperCase(false);
              }
            }}
            className={`
              flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all cursor-pointer
              ${
                !isUpperCase
                  ? 'bg-sky-500 text-white shadow-xs scale-105 ring-2 ring-sky-300'
                  : 'text-slate-600 hover:bg-sky-50'
              }
            `}
            title="Tukar ke lukisan Huruf Kecil"
          >
            <span>abc</span>
            <span className="text-[11px] sm:text-xs">Kecil</span>
          </button>

          <button
            onClick={() => {
              if (!isUpperCase) {
                playPopSound();
                setIsUpperCase(true);
              }
            }}
            className={`
              flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all cursor-pointer
              ${
                isUpperCase
                  ? 'bg-amber-500 text-white shadow-xs scale-105 ring-2 ring-amber-300'
                  : 'text-slate-600 hover:bg-amber-50'
              }
            `}
            title="Tukar ke lukisan Huruf Besar"
          >
            <span>ABC</span>
            <span className="text-[11px] sm:text-xs">Besar</span>
          </button>
        </div>

        <button
          onClick={onOpenSettings}
          title="Tetapan Audio & Bunyi"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm rounded-full shadow-md border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Tetapan</span>
        </button>
      </div>

      {/* Top Bar: Letter Info, Audio & Tolerance Selector */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 bg-white/95 rounded-2xl px-3 sm:px-4 py-2 shadow-md border-2 border-amber-300 z-10">
        {/* Letter Navigator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handlePrevious}
            className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-all active:scale-95 cursor-pointer"
            title="Huruf Sebelum"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 bg-amber-400 text-slate-900 px-3 py-1 rounded-xl font-black text-xl sm:text-2xl shadow-inner font-['Fredoka']">
            <span>{displayChar}</span>
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-all active:scale-95 cursor-pointer"
            title="Huruf Seterusnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Word and Illustrated Drawing Context */}
        <div className="flex items-center gap-2 bg-amber-50/90 px-2.5 py-1 rounded-xl border border-amber-200 shadow-xs">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-lg shadow-xs p-1 border border-amber-200/80 flex-shrink-0">
            <PhonicsIllustration letter={currentLetter} size={36} className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="text-left">
            <span className="text-[10px] sm:text-xs text-slate-500 font-semibold block leading-none">Contoh:</span>
            <span className="text-xs sm:text-sm md:text-base font-extrabold text-slate-800 font-['Fredoka']">
              {currentLetter.toUpperCase()} untuk {phonics.word}
            </span>
          </div>
          <button
            onClick={handleHearAudio}
            className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full transition-all active:scale-90 shadow-sm ml-0.5 cursor-pointer"
            title="Dengar Sebutan"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Center Drawing Board Area */}
      <div className="relative flex-1 w-full max-w-2xl my-1 sm:my-2 flex flex-col items-center justify-center">
        {/* Real-time Status Banner */}
        <div className="w-full mb-1 flex items-center justify-between px-2">
          {hasError ? (
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-rose-600 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              <span>Salah! Terkeluar garisan ({errorCount}x)</span>
            </div>
          ) : hasDrawn ? (
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle className="w-4 h-4" />
              <span>Bagus! Garisan kemas di dalam huruf (Betul)</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-semibold italic">
              Tekap huruf mengikut laluan putih di bawah:
            </span>
          )}

          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={strokeHistoryRef.current.length === 0}
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            title="Undur satu garisan"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undur</span>
          </button>
        </div>

        {/* The Interactive Canvas with Tracing Road Guide */}
        <div
          className={`
            relative w-full h-full max-h-[55vh] sm:max-h-[62vh] aspect-[4/3]
            bg-slate-50 rounded-3xl shadow-xl border-4 overflow-hidden transition-colors
            ${hasError ? 'border-rose-400 ring-4 ring-rose-300/60' : 'border-amber-300'}
          `}
          style={{ touchAction: 'none' }}
        >
          {/* Kindergarten 4-line guidelines */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-around py-10 px-6 opacity-25">
            <div className="w-full border-b-2 border-blue-400" />
            <div className="w-full border-b-2 border-dashed border-rose-400" />
            <div className="w-full border-b-2 border-blue-400" />
          </div>

          {/* Tracing Road: Highlighted white path corridor where strokes are valid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            {/* Soft glowing corridor */}
            <span
              className="font-bold text-white select-none tracking-tighter"
              style={{
                fontSize: 'clamp(7.5rem, 28vw, 17rem)',
                fontFamily: "'Fredoka', 'Nunito', sans-serif",
                lineHeight: 0.8,
                WebkitTextStroke: '28px #e2e8f0',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))',
              }}
            >
              {displayChar}
            </span>
          </div>

          {/* Center Guide Dashed Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-bold text-slate-300 select-none tracking-tighter"
              style={{
                fontSize: 'clamp(7.5rem, 28vw, 17rem)',
                fontFamily: "'Fredoka', 'Nunito', sans-serif",
                lineHeight: 0.8,
                WebkitTextStroke: '2px #94a3b8',
                color: 'transparent',
              }}
            >
              {displayChar}
            </span>
          </div>

          {/* User Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
            style={{ touchAction: 'none' }}
          />

          {/* Success Overlay Praise with Golden Star Celebration Reward */}
          {showPraise && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/92 backdrop-blur-xs p-4 animate-pop">
              <div className="relative flex flex-col items-center justify-center max-w-xs text-center">
                {/* 3D Shining Golden Star Reward */}
                <GoldenStarIllustration size={96} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

                {/* 3 Golden Stars Cluster Badge */}
                <ThreeGoldenStarsCluster className="mb-2" />

                {/* Success Title */}
                <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full shadow-lg border-2 border-emerald-300">
                  <span className="text-base sm:text-lg font-black font-['Fredoka']">
                    Tahniah! Betul!
                  </span>
                  <div className="w-6 h-6 bg-white rounded-full p-0.5 flex items-center justify-center shadow-xs">
                    <PhonicsIllustration letter={currentLetter} size={20} className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-slate-700 mt-2 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs font-['Fredoka']">
                  Huruf "{displayChar}" ({phonics.word}) berjaya dilukis!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls: Tools Palette & Action Buttons */}
      <div className="w-full max-w-2xl flex flex-col gap-2 z-10">
        {/* Tools row: Colors, Eraser, Sizes, Clear, Check Answer */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/95 p-2 sm:p-3 rounded-2xl shadow-md border-2 border-amber-300">
          {/* Crayon Color Picker */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {CRAYON_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  playPopSound();
                  setActiveColor(c.value);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform active:scale-90 flex-shrink-0 shadow-xs ${
                  !isEraser && activeColor === c.value
                    ? 'ring-4 ring-amber-400 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={`Warna ${c.name}`}
              />
            ))}
          </div>

          {/* Tools & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Eraser */}
            <button
              onClick={() => {
                playPopSound();
                setIsEraser(!isEraser);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isEraser
                  ? 'bg-amber-400 text-slate-900 border-amber-500 font-bold shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Pemadam"
            >
              <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Brush Sizes */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-300">
              {BRUSH_SIZES.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    playPopSound();
                    setBrushSize(b.size);
                  }}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                    brushSize === b.size
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title={`Saiz ${b.name}`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl border border-rose-300 transition-all active:scale-90"
              title="Padam Semua"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Check / Submit Answer Button */}
            <button
              onClick={handleCheckAnswer}
              className={`
                px-3 sm:px-4 py-2 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 text-white
                ${
                  hasError
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700'
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              <span>{hasError ? 'Periksa (Salah)' : 'Periksa Jawapan'}</span>
            </button>
          </div>
        </div>

        {/* Quick A-Z Ribbon */}
        <div className="w-full overflow-x-auto py-1 px-1 flex items-center gap-1 bg-white/80 rounded-xl border border-amber-200 shadow-xs">
          {ALPHABET.map((char, idx) => (
            <button
              key={char}
              onClick={() => {
                playPopSound();
                setCurrentIdx(idx);
              }}
              className={`flex-shrink-0 w-8 h-8 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                currentIdx === idx
                  ? 'bg-amber-500 text-white scale-110 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isUpperCase ? char.toUpperCase() : char}
            </button>
          ))}
        </div>
      </div>

      {/* Error Modal: When the child submits or draws out of bounds */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-rose-400 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center animate-pop">
            <div className="w-16 h-16 mx-auto mb-3 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center border-2 border-rose-300 animate-bounce">
              <AlertTriangle className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-rose-600 font-['Fredoka'] mb-1">
              Jawapan Kurang Tepat! ❌
            </h3>
            <p className="text-slate-600 text-sm font-semibold mb-4">
              Garisan lukisan terkeluar daripada bentuk huruf <strong>"{displayChar}"</strong>. Tekan butang di bawah untuk padam dan tekap semula di dalam garisan putih ya!
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleUndo();
                }}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all"
              >
                Undur Garisan Silap
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleClear();
                }}
                className="flex-1 py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                Padam Semua & Cuba Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
