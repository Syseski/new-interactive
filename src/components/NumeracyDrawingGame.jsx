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
  CheckCircle2,
  Undo2,
  ArrowLeft,
  Settings,
  Trophy,
  Star,
  Eye,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  speakMalayText,
  speakOops,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Numbers 0 to 10 Data with Counting Objects and Audio Words
export const NUMBERS_DATA = [
  {
    num: 0,
    word: 'SIFAR',
    altWord: 'KOSONG',
    count: 0,
    emoji: '📦',
    itemName: 'Kotak Kosong',
    description: 'Sifar atau kosong bererti tiada sebarang objek.',
    speechText: 'Nombor sifar. Tiada sebarang objek.',
    color: '#64748b',
    bgLight: 'bg-slate-100',
    borderCol: 'border-slate-300',
    guideHints: ['Mulakan dari atas, pusing ke kiri hingga ke bawah dan kembali ke atas.'],
  },
  {
    num: 1,
    word: 'SATU',
    count: 1,
    emoji: '🍎',
    itemName: 'Epal Merah',
    description: 'Satu biji epal merah yang manis.',
    speechText: 'Nombor satu. Satu biji epal merah.',
    color: '#ef4444',
    bgLight: 'bg-red-50',
    borderCol: 'border-red-300',
    guideHints: ['Tarik garisan serong sedikit ke atas, kemudian tarik garisan lurus ke bawah.'],
  },
  {
    num: 2,
    word: 'DUA',
    count: 2,
    emoji: '🦆',
    itemName: 'Itik Comel',
    description: 'Dua ekor itik sedang berenang.',
    speechText: 'Nombor dua. Dua ekor itik comel.',
    color: '#f59e0b',
    bgLight: 'bg-amber-50',
    borderCol: 'border-amber-300',
    guideHints: ['Lengkung ke kanan atas, condong ke bawah kiri, dan tarik garisan lurus ke kanan.'],
  },
  {
    num: 3,
    word: 'TIGA',
    count: 3,
    emoji: '🎈',
    itemName: 'Belon Ceria',
    description: 'Tiga biji belon berwarna-warni terbang tinggi.',
    speechText: 'Nombor tiga. Tiga biji belon ceria.',
    color: '#3b82f6',
    bgLight: 'bg-blue-50',
    borderCol: 'border-blue-300',
    guideHints: ['Buat separuh bulatan di atas, kemudian buat separuh bulatan di bawah.'],
  },
  {
    num: 4,
    word: 'EMPAT',
    count: 4,
    emoji: '⭐',
    itemName: 'Bintang Emas',
    description: 'Empat butir bintang bersinar terang.',
    speechText: 'Nombor empat. Empat butir bintang emas.',
    color: '#8b5cf6',
    bgLight: 'bg-purple-50',
    borderCol: 'border-purple-300',
    guideHints: ['Condong ke bawah kiri, tarik ke kanan, kemudian garis lurus tegak ke bawah.'],
  },
  {
    num: 5,
    word: 'LIMA',
    count: 5,
    emoji: '🌸',
    itemName: 'Bunga Wangi',
    description: 'Lima kuntum bunga mekar berkembang.',
    speechText: 'Nombor lima. Lima kuntum bunga wangi.',
    color: '#ec4899',
    bgLight: 'bg-pink-50',
    borderCol: 'border-pink-300',
    guideHints: ['Tarik garis pendek ke bawah, buat lengkung perut di bawah, dan garis topi di atas.'],
  },
  {
    num: 6,
    word: 'ENAM',
    count: 6,
    emoji: '🐟',
    itemName: 'Ikan Lincah',
    description: 'Enam ekor ikan berenang riang di dalam kolam.',
    speechText: 'Nombor enam. Enam ekor ikan lincah.',
    color: '#10b981',
    bgLight: 'bg-emerald-50',
    borderCol: 'border-emerald-300',
    guideHints: ['Mula dari atas, melengkung ke bawah kiri dan bulatkan di bahagian bawah.'],
  },
  {
    num: 7,
    word: 'TUJUH',
    count: 7,
    emoji: '🦋',
    itemName: 'Rama-rama',
    description: 'Tujuh ekor rama-rama terbang di taman.',
    speechText: 'Nombor tujuh. Tujuh ekor rama-rama cantik.',
    color: '#06b6d4',
    bgLight: 'bg-cyan-50',
    borderCol: 'border-cyan-300',
    guideHints: ['Tarik garisan lurus ke kanan, kemudian condongkan ke bawah kiri.'],
  },
  {
    num: 8,
    word: 'LAPAN',
    count: 8,
    emoji: '🍓',
    itemName: 'Strawberi',
    description: 'Lapan biji strawberi segar dan berkhasiat.',
    speechText: 'Nombor lapan. Lapan biji strawberi segar.',
    color: '#e11d48',
    bgLight: 'bg-rose-50',
    borderCol: 'border-rose-300',
    guideHints: ['Bentukkan huruf S dari atas, silangkan ke bawah, dan naik semula ke atas.'],
  },
  {
    num: 9,
    word: 'SEMBILAN',
    count: 9,
    emoji: '🍀',
    itemName: 'Daun Tuah',
    description: 'Sembilan helai daun hijau yang segar.',
    speechText: 'Nombor sembilan. Sembilan helai daun tuah.',
    color: '#16a34a',
    bgLight: 'bg-green-50',
    borderCol: 'border-green-300',
    guideHints: ['Buat bulatan di bahagian atas, kemudian tarik garisan lurus atau lengkung ke bawah.'],
  },
  {
    num: 10,
    word: 'SEPULUH',
    count: 10,
    emoji: '🍬',
    itemName: 'Gula-gula',
    description: 'Sepuluh biji gula-gula manis dan berwarna-warni.',
    speechText: 'Nombor sepuluh. Sepuluh biji gula-gula.',
    color: '#f97316',
    bgLight: 'bg-orange-50',
    borderCol: 'border-orange-300',
    guideHints: ['Tulis angka 1 di kiri, diikuti angka 0 di kanannya.'],
  },
];

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

export default function NumeracyDrawingGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentIdx, setCurrentIdx] = useState(1); // Start with number 1
  const [activeColor, setActiveColor] = useState(CRAYON_COLORS[0].value);
  const [brushSize, setBrushSize] = useState(18);
  const [isEraser, setIsEraser] = useState(false);
  const [toleranceMode, setToleranceMode] = useState('sederhana'); // 'santai', 'sederhana', 'kemas'

  // Drawing assessment state
  const [hasDrawn, setHasDrawn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showPraise, setShowPraise] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [completedNumbers, setCompletedNumbers] = useState({});
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Counting click item tracker
  const [tappedItemsCount, setTappedItemsCount] = useState(0);

  const canvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // History stack for Undo
  const strokeHistoryRef = useRef([]);
  const currentStrokeRef = useRef([]);

  const currentNumberData = NUMBERS_DATA[currentIdx] || NUMBERS_DATA[1];
  const displayNum = currentNumberData.num.toString();
  const isLandscape = orientation === 'landscape';

  // Setup offscreen collision mask
  const updateMask = useCallback(
    (width, height, dpr) => {
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

      // Font size tailored to canvas dimensions
      const isTen = currentNumberData.num === 10;
      const fontSize = isTen
        ? Math.min(width * 0.52, height * 0.68)
        : Math.min(width * 0.75, height * 0.78);

      mCtx.font = `bold ${fontSize}px 'Fredoka', 'Nunito', sans-serif`;
      mCtx.textAlign = 'center';
      mCtx.textBaseline = 'middle';

      // Allowable corridor thickness based on tolerance mode
      let corridorWidth = 52;
      if (toleranceMode === 'santai') corridorWidth = 72;
      if (toleranceMode === 'kemas') corridorWidth = 36;

      // Draw dilated stroke to create the boundary corridor
      mCtx.strokeStyle = '#000000';
      mCtx.lineWidth = corridorWidth;
      mCtx.lineCap = 'round';
      mCtx.lineJoin = 'round';
      mCtx.strokeText(displayNum, width / 2, height / 2);
      mCtx.fillStyle = '#000000';
      mCtx.fillText(displayNum, width / 2, height / 2);
    },
    [displayNum, currentNumberData.num, toleranceMode]
  );

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
    setTappedItemsCount(0);
    strokeHistoryRef.current = [];
    currentStrokeRef.current = [];
  }, [updateMask]);

  // Re-initialize canvas on number or window size change
  useEffect(() => {
    resetCanvas();
  }, [currentIdx, resetCanvas]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      resetCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resetCanvas]);

  // Check pixel collision against corridor mask
  const isInsideCorridor = (x, y) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return true;

    const dpr = window.devicePixelRatio || 1;
    const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
    if (!mCtx) return true;

    try {
      const pixel = mCtx.getImageData(Math.floor(x * dpr), Math.floor(y * dpr), 1, 1).data;
      return pixel[3] > 0;
    } catch {
      return true;
    }
  };

  // Canvas Drawing Handlers (Pointer Events)
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const coords = getCanvasCoords(e);
    isDrawingRef.current = true;
    lastPointRef.current = coords;
    currentStrokeRef.current = [coords];

    setHasDrawn(true);

    if (!isEraser) {
      const inside = isInsideCorridor(coords.x, coords.y);
      if (!inside) {
        setHasError(true);
        setErrorCount((prev) => prev + 1);
      }
    }

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = activeColor;
    }

    ctx.arc(coords.x, coords.y, brushSize / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const coords = getCanvasCoords(e);

    currentStrokeRef.current.push(coords);

    if (!isEraser) {
      const inside = isInsideCorridor(coords.x, coords.y);
      if (!inside) {
        setHasError(true);
        setErrorCount((prev) => prev + 1);
      }
    }

    const last = lastPointRef.current || coords;
    const midPoint = {
      x: (last.x + coords.x) / 2,
      y: (last.y + coords.y) / 2,
    };

    ctx.quadraticCurveTo(last.x, last.y, midPoint.x, midPoint.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(midPoint.x, midPoint.y);
    lastPointRef.current = coords;
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    isDrawingRef.current = false;
    lastPointRef.current = null;

    if (currentStrokeRef.current.length > 0) {
      strokeHistoryRef.current.push({
        points: [...currentStrokeRef.current],
        color: activeColor,
        size: brushSize,
        isEraser: isEraser,
      });
      currentStrokeRef.current = [];
    }
  };

  // Undo last stroke
  const handleUndo = () => {
    playPopSound();
    if (strokeHistoryRef.current.length === 0) return;

    strokeHistoryRef.current.pop();
    redrawFromHistory();
  };

  const redrawFromHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.clearRect(0, 0, rect.width, rect.height);

    let anyError = false;
    let errTotal = 0;

    strokeHistoryRef.current.forEach((stroke) => {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = stroke.size;

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
      }

      if (stroke.points.length > 0) {
        const start = stroke.points[0];
        ctx.moveTo(start.x, start.y);

        if (!stroke.isEraser && !isInsideCorridor(start.x, start.y)) {
          anyError = true;
          errTotal++;
        }

        for (let i = 1; i < stroke.points.length; i++) {
          const pt = stroke.points[i];
          const prev = stroke.points[i - 1];
          const mid = { x: (prev.x + pt.x) / 2, y: (prev.y + pt.y) / 2 };
          ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);

          if (!stroke.isEraser && !isInsideCorridor(pt.x, pt.y)) {
            anyError = true;
            errTotal++;
          }
        }
        ctx.stroke();
      }
    });

    setHasDrawn(strokeHistoryRef.current.length > 0);
    setHasError(anyError);
    setErrorCount(errTotal);
  };

  const handleClear = () => {
    playPopSound();
    resetCanvas();
  };

  const handlePrevious = () => {
    playPopSound();
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : NUMBERS_DATA.length - 1));
  };

  const handleNext = () => {
    playPopSound();
    setCurrentIdx((prev) => (prev < NUMBERS_DATA.length - 1 ? prev + 1 : 0));
  };

  const handleSpeakNumber = () => {
    playPopSound();
    speakMalayText(currentNumberData.speechText);
  };

  const handleTapObjectItem = (index) => {
    playPopSound();
    const countSpoken = (index + 1).toString();
    setTappedItemsCount(index + 1);
    speakMalayText(`${countSpoken}!`);
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (!hasDrawn) {
      playOopsSound();
      speakMalayText('Sila lukis dan tekap nombor di dalam garisan terlebih dahulu ya!');
      return;
    }

    if (hasError) {
      playOopsSound();
      speakOops();
      setShowErrorModal(true);
    } else {
      // Correct!
      playVictorySound();
      setShowPraise(true);

      const nextCompleted = {
        ...completedNumbers,
        [currentNumberData.num]: true,
      };
      setCompletedNumbers(nextCompleted);

      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
      });

      // Check if all 11 numbers (0 - 10) are completed
      const allDone = NUMBERS_DATA.every((n) => nextCompleted[n.num]);
      if (allDone) {
        setTimeout(() => {
          setShowVictoryModal(true);
        }, 1200);
      } else {
        setTimeout(() => {
          handleNext();
        }, 2200);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* 1. TOP HEADER: Back button, Title & Audio Settings */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Title Badge */}
        <div className="flex items-center gap-2 bg-white/95 px-4 py-1 rounded-full shadow-sm border-2 border-amber-300">
          <span className="text-base sm:text-lg">🔢</span>
          <span className="text-xs sm:text-sm font-black text-amber-900 font-['Fredoka']">
            Tulis & Lukis Nombor (0 - 10)
          </span>
        </div>

        {/* Tolerance & Audio Settings */}
        <div className="flex items-center gap-1.5">
          {/* Tolerance Selector */}
          <div className="hidden sm:flex items-center bg-white/90 rounded-full p-0.5 border border-amber-300 text-[11px] font-bold">
            <button
              onClick={() => setToleranceMode('santai')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                toleranceMode === 'santai' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Santai
            </button>
            <button
              onClick={() => setToleranceMode('sederhana')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                toleranceMode === 'sederhana' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sederhana
            </button>
            <button
              onClick={() => setToleranceMode('kemas')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                toleranceMode === 'kemas' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kemas
            </button>
          </div>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-full shadow-md border border-slate-700 transition-transform active:scale-95 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE ARENA */}
      <div
        className={`w-full max-w-4xl flex-1 flex flex-col ${
          isLandscape ? 'md:flex-row' : 'flex-col'
        } items-center justify-center gap-3 sm:gap-4 my-auto`}
      >
        {/* Left / Top Counting Visualization Card */}
        <div className="w-full md:w-72 bg-white/95 p-3.5 sm:p-4 rounded-3xl border-3 border-amber-300 shadow-lg flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-amber-100 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-['Fredoka'] text-amber-900">
                {currentNumberData.num}
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md font-['Fredoka']">
                {currentNumberData.word}
              </span>
            </div>

            <button
              onClick={handleSpeakNumber}
              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-xs transition-transform active:scale-90 cursor-pointer"
              title="Dengar Sebutan"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Objects to Count */}
          <div className="w-full min-h-[110px] sm:min-h-[140px] flex items-center justify-center p-2 bg-gradient-to-br from-amber-50/70 to-emerald-50/70 rounded-2xl border border-amber-200">
            {currentNumberData.count === 0 ? (
              <div className="text-center p-2">
                <span className="text-4xl block mb-1">🪹</span>
                <span className="text-xs font-black text-slate-500 font-['Fredoka']">
                  Tiada objek (0 / Sifar)
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[240px]">
                {Array.from({ length: currentNumberData.count }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTapObjectItem(idx)}
                    className={`text-2xl sm:text-3xl p-1 rounded-xl transition-all cursor-pointer active:scale-90 hover:scale-110 ${
                      idx < tappedItemsCount
                        ? 'bg-amber-200/90 ring-2 ring-amber-400 scale-105'
                        : 'bg-white/80 hover:bg-amber-100 shadow-xs'
                    }`}
                    title={`Kira ke-${idx + 1}`}
                  >
                    <span>{currentNumberData.emoji}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Description Badge */}
          <div className="w-full mt-2 text-center bg-amber-50/80 px-2 py-1 rounded-xl border border-amber-200/80">
            <p className="text-[11px] sm:text-xs font-bold text-slate-700 font-['Fredoka'] truncate">
              {currentNumberData.count} {currentNumberData.itemName}
            </p>
          </div>
        </div>

        {/* Center Canvas Tracing Board */}
        <div className="relative flex-1 w-full max-w-md md:max-w-lg aspect-square max-h-[360px] sm:max-h-[400px] bg-white rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#f59e0b 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Number Guide Template (Dashed White / Grey Outline with Directional Feel) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className={`
                font-['Fredoka'] font-black select-none
                ${currentNumberData.num === 10 ? 'text-[170px] sm:text-[210px]' : 'text-[240px] sm:text-[280px]'}
                text-transparent stroke-text
              `}
              style={{
                WebkitTextStroke: '22px #e2e8f0',
                textShadow: '0 0 16px rgba(245, 158, 11, 0.2)',
              }}
            >
              {displayNum}
            </span>
          </div>

          {/* Central Dashed Tracking Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className={`
                font-['Fredoka'] font-black select-none
                ${currentNumberData.num === 10 ? 'text-[170px] sm:text-[210px]' : 'text-[240px] sm:text-[280px]'}
                text-slate-100 opacity-90
              `}
            >
              {displayNum}
            </span>
          </div>

          {/* Starting Dot Indicator (Green pulse) */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black font-['Fredoka'] shadow-sm pointer-events-none animate-bounce">
            <span>🟢 Mula dari atas</span>
          </div>

          {/* User Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
          />

          {/* Success Overlay Praise */}
          {showPraise && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/94 backdrop-blur-xs p-4 animate-pop">
              <div className="relative flex flex-col items-center justify-center max-w-xs text-center">
                <GoldenStarIllustration size={96} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />
                <ThreeGoldenStarsCluster className="mb-2" />

                <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full shadow-lg border-2 border-emerald-300">
                  <span className="text-base sm:text-lg font-black font-['Fredoka']">
                    Tahniah! Betul! 🎉
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-slate-700 mt-2 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs font-['Fredoka']">
                  Nombor {displayNum} ({currentNumberData.word}) berjaya dilukis!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM CONTROLS: Palette, Tools & Number Ribbon */}
      <div className="w-full max-w-4xl flex flex-col gap-2 z-20 mt-1">
        {/* Tools row: Colors, Eraser, Sizes, Clear, Check Answer */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/95 p-2 sm:p-2.5 rounded-2xl shadow-md border-2 border-amber-300">
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
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform active:scale-90 flex-shrink-0 shadow-xs cursor-pointer ${
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
              className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
                isEraser
                  ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Pemadam"
            >
              <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Undo */}
            <button
              onClick={handleUndo}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all active:scale-90 cursor-pointer"
              title="Undur Garisan"
            >
              <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Brush Sizes */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300">
              {BRUSH_SIZES.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    playPopSound();
                    setBrushSize(b.size);
                  }}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
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
              className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl border border-rose-300 transition-all active:scale-90 cursor-pointer"
              title="Padam Semua"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Check / Submit Answer Button */}
            <button
              onClick={handleCheckAnswer}
              className={`
                px-3.5 sm:px-4 py-2 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 text-white cursor-pointer font-['Fredoka']
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

        {/* Quick Numbers 0 - 10 Ribbon */}
        <div className="w-full overflow-x-auto py-1 px-1 flex items-center justify-between gap-1.5 bg-white/80 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center gap-1">
            {NUMBERS_DATA.map((numItem, idx) => {
              const isCurrent = currentIdx === idx;
              const isDone = completedNumbers[numItem.num];

              return (
                <button
                  key={numItem.num}
                  onClick={() => {
                    playPopSound();
                    setCurrentIdx(idx);
                  }}
                  className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center relative font-['Fredoka'] ${
                    isCurrent
                      ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{numItem.num}</span>
                  {isDone && (
                    <span className="absolute -top-1 -right-1 text-[10px]">⭐</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-transform active:scale-90 cursor-pointer"
              title="Nombor Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
              title="Nombor Seterusnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. ERROR MODAL */}
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
              Garisan lukisan terkeluar daripada laluan nombor <strong>"{displayNum}"</strong>. Tekan butang di bawah untuk padam atau tekap semula di dalam garisan putih ya!
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleUndo();
                }}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer font-['Fredoka']"
              >
                Undur Garisan Silap
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleClear();
                }}
                className="flex-1 py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer font-['Fredoka']"
              >
                Padam & Cuba Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ALL NUMBERS COMPLETION VICTORY MODAL */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Anda Hebat! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              Kesemua nombor 0 hingga 10 telah berjaya dilukis dan ditekap dengan kemas dan tepat!
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  playPopSound();
                  setShowVictoryModal(false);
                }}
                className="w-full py-2.5 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 font-black rounded-xl text-sm shadow-sm transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>👁️</span>
                <span>Lihat Jawapan</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setCompletedNumbers({});
                  setCurrentIdx(0);
                  setShowVictoryModal(false);
                  resetCanvas();
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer"
              >
                Main Semula
              </button>

              <button
                onClick={onBackToMenu}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all font-['Fredoka'] cursor-pointer"
              >
                Kembali ke Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
