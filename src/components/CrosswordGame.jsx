import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  ChevronRight,
  Delete,
  Keyboard,
  Info,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Crossword Multi-Set Data (100% Authentic Bahasa Melayu)
const CROSSWORD_SETS = [
  {
    id: 'set1',
    title: 'Set 1',
    subtitle: 'Haiwan',
    instruction: 'Isikan huruf yang betul mengikut petunjuk gambar.',
    gridSize: { rows: 4, cols: 7 },
    clues: [
      {
        id: 1,
        number: 1,
        direction: 'across',
        word: 'KUCING',
        start: { r: 0, c: 0 },
        length: 6,
        label: '1 Melintang: Kucing',
        imageSrc: '/images/crossword/kucing.png',
        type: 'kucing',
      },
      {
        id: 2,
        number: 2,
        direction: 'down',
        word: 'KUDA',
        start: { r: 0, c: 0 },
        length: 4,
        label: '2 Menegak: Kuda',
        imageSrc: '/images/crossword/kuda.png',
        type: 'kuda',
      },
      {
        id: 3,
        number: 3,
        direction: 'down',
        word: 'IKAN',
        start: { r: 0, c: 3 },
        length: 4,
        label: '3 Menegak: Ikan',
        imageSrc: '/images/crossword/ikan.png',
        type: 'ikan',
      },
      {
        id: 4,
        number: 4,
        direction: 'across',
        word: 'AYAM',
        start: { r: 2, c: 3 },
        length: 4,
        label: '4 Melintang: Ayam',
        imageSrc: '/images/crossword/ayam.png',
        type: 'ayam',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2',
    subtitle: 'Buah-buahan',
    instruction: 'Isikan huruf yang betul mengikut petunjuk gambar.',
    gridSize: { rows: 6, cols: 10 },
    clues: [
      {
        id: 1,
        number: 1,
        direction: 'across',
        word: 'BETIK',
        start: { r: 0, c: 0 },
        length: 5,
        label: '1 Melintang: Betik',
        imageSrc: '/images/crossword/betik.png',
        type: 'betik',
      },
      {
        id: 2,
        number: 2,
        direction: 'down',
        word: 'EPAL',
        start: { r: 0, c: 1 },
        length: 4,
        label: '2 Menegak: Epal',
        imageSrc: '/images/crossword/epal.png',
        type: 'epal',
      },
      {
        id: 3,
        number: 3,
        direction: 'down',
        word: 'KELAPA',
        start: { r: 0, c: 4 },
        length: 6,
        label: '3 Menegak: Kelapa',
        imageSrc: '/images/crossword/kelapa.png',
        type: 'kelapa',
      },
      {
        id: 4,
        number: 4,
        direction: 'across',
        word: 'ANGGUR',
        start: { r: 3, c: 4 },
        length: 6,
        label: '4 Melintang: Anggur',
        imageSrc: '/images/crossword/anggur.png',
        type: 'anggur',
      },
    ],
  },
];

// Helper to compute active cell map and clue index numbers for a set
function buildGridModel(set) {
  const cellMap = {}; // key: "r-c" -> { r, c, answer, number, clueIds: [] }

  set.clues.forEach((clue) => {
    for (let i = 0; i < clue.length; i++) {
      const r = clue.direction === 'across' ? clue.start.r : clue.start.r + i;
      const c = clue.direction === 'across' ? clue.start.c + i : clue.start.c;
      const key = `${r}-${c}`;
      const char = clue.word[i].toUpperCase();

      if (!cellMap[key]) {
        cellMap[key] = {
          r,
          c,
          answer: char,
          number: i === 0 ? clue.number : null,
          clueIds: [clue.id],
        };
      } else {
        if (i === 0 && !cellMap[key].number) {
          cellMap[key].number = clue.number;
        }
        if (!cellMap[key].clueIds.includes(clue.id)) {
          cellMap[key].clueIds.push(clue.id);
        }
      }
    }
  });

  return cellMap;
}

// Vector Clue Illustrations (Fallback Icons)
function ClueVectorIllustration({ type, className = 'w-full h-full' }) {
  switch (type) {
    case 'kucing':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="55" rx="30" ry="26" fill="#FDBA74" stroke="#C2410C" strokeWidth="2.5" />
          <polygon points="26,38 32,15 45,32" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <polygon points="74,38 68,15 55,32" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          <circle cx="38" cy="52" r="4.5" fill="#1E293B" />
          <circle cx="62" cy="52" r="4.5" fill="#1E293B" />
          <polygon points="50,58 45,63 55,63" fill="#F43F5E" />
          <path d="M42 66 Q50 72 58 66" stroke="#9A3412" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'kuda':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M25 75 L30 35 L48 20 L65 24 L70 45 L55 55 L58 75 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <polygon points="48,20 50,10 56,20" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="42" cy="30" r="3.5" fill="#FEF3C7" />
          <circle cx="42" cy="30" r="2" fill="#1E293B" />
          <path d="M30 45 L35 75" stroke="#451A03" strokeWidth="3" />
        </svg>
      );
    case 'ikan':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="48" cy="50" rx="30" ry="20" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          <polygon points="74,50 92,35 88,50 92,65" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <circle cx="32" cy="46" r="3.5" fill="#FFFFFF" />
          <circle cx="31" cy="46" r="2" fill="#1E293B" />
          <path d="M44 38 Q52 50 44 62" stroke="#0284C7" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'ayam':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="24" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <polygon points="50,26 44,14 56,14" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <polygon points="30,50 20,53 30,58" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <circle cx="40" cy="45" r="3" fill="#1E293B" />
          <ellipse cx="60" cy="54" rx="12" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        </svg>
      );
    case 'betik':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="52" rx="26" ry="34" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
          <ellipse cx="50" cy="52" rx="16" ry="22" fill="#F97316" />
          {/* Black seeds */}
          <circle cx="46" cy="46" r="2.5" fill="#1E293B" />
          <circle cx="54" cy="46" r="2.5" fill="#1E293B" />
          <circle cx="50" cy="54" r="2.5" fill="#1E293B" />
          <circle cx="46" cy="60" r="2" fill="#1E293B" />
          <circle cx="54" cy="60" r="2" fill="#1E293B" />
          {/* Green Top */}
          <path d="M46 18 Q50 10 54 18" stroke="#65A30D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'epal':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="40" cy="55" r="24" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="60" cy="55" r="24" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <path d="M50 35 L50 20" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="60" cy="22" rx="8" ry="4" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" transform="rotate(-20 60 22)" />
        </svg>
      );
    case 'kelapa':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="55" r="30" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
          <ellipse cx="50" cy="35" rx="12" ry="6" fill="#15803D" />
          <path d="M48 30 L45 18" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="50" r="4" fill="#14532D" opacity="0.4" />
          <circle cx="60" cy="50" r="4" fill="#14532D" opacity="0.4" />
        </svg>
      );
    case 'anggur':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="42" cy="40" r="10" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="58" cy="40" r="10" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="35" cy="54" r="10" fill="#9333EA" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="50" cy="54" r="10" fill="#9333EA" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="65" cy="54" r="10" fill="#9333EA" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="43" cy="68" r="9" fill="#7E22CE" stroke="#6B21A8" strokeWidth="1.5" />
          <circle cx="57" cy="68" r="9" fill="#7E22CE" stroke="#6B21A8" strokeWidth="1.5" />
          <circle cx="50" cy="80" r="8" fill="#6B21A8" stroke="#581C87" strokeWidth="1.5" />
          <path d="M50 32 L50 20 Q55 15 62 16" stroke="#65A30D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Clue Thumbnail with fallback to vector illustration
function ClueImageThumbnail({ src, type, alt }) {
  const [imgError, setImgError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setImgError(false);
  }, [src]);

  if (!imgError && src) {
    return (
      <img
        src={src}
        alt={alt || type}
        onError={() => setImgError(true)}
        className="w-full h-full object-contain drop-shadow-xs"
      />
    );
  }

  return <ClueVectorIllustration type={type} className="w-full h-full object-contain" />;
}

export default function CrosswordGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = CROSSWORD_SETS[currentSetIndex] || CROSSWORD_SETS[0];

  // Map of active grid cells for current set
  const [cellMap, setCellMap] = useState(() => buildGridModel(currentSet));
  // User input letter map: { "r-c": 'K' }
  const [userLetters, setUserLetters] = useState({});
  // Selected cell: { r, c }
  const [selectedCell, setSelectedCell] = useState(null);
  // Active selected clue ID
  const [selectedClueId, setSelectedClueId] = useState(1);
  // Completed set IDs
  const [completedSets, setCompletedSets] = useState({});
  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Hidden native input ref for triggering mobile on-screen keyboard
  const nativeInputRef = useRef(null);

  // Re-initialize model when set changes
  useEffect(() => {
    const model = buildGridModel(currentSet);
    setCellMap(model);
    setUserLetters({});
    setShowCelebration(false);
    const firstClue = currentSet.clues[0];
    if (firstClue) {
      setSelectedClueId(firstClue.id);
      setSelectedCell(firstClue.start);
    }
  }, [currentSetIndex, currentSet]);

  // Check victory condition
  useEffect(() => {
    const keys = Object.keys(cellMap);
    if (keys.length === 0) return;

    let isAllCorrect = true;
    for (const key of keys) {
      const expected = cellMap[key].answer;
      const actual = (userLetters[key] || '').toUpperCase();
      if (expected !== actual) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect && !showCelebration) {
      setShowCelebration(true);
      setCompletedSets((prev) => ({ ...prev, [currentSet.id]: true }));
      playVictorySound();
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [userLetters, cellMap, showCelebration, currentSet]);

  // Helper to advance cursor to next cell in the active clue
  const advanceToNextCell = useCallback(
    (currentPos) => {
      const activeClue = currentSet.clues.find((c) => c.id === selectedClueId);
      if (!activeClue) return;

      const clueCells = [];
      for (let i = 0; i < activeClue.length; i++) {
        const r = activeClue.direction === 'across' ? activeClue.start.r : activeClue.start.r + i;
        const c = activeClue.direction === 'across' ? activeClue.start.c + i : activeClue.start.c;
        clueCells.push({ r, c });
      }

      const currentIndex = clueCells.findIndex((pos) => pos.r === currentPos.r && pos.c === currentPos.c);
      if (currentIndex >= 0 && currentIndex < clueCells.length - 1) {
        setSelectedCell(clueCells[currentIndex + 1]);
      }
    },
    [currentSet, selectedClueId]
  );

  // Helper to step backward (Backspace)
  const stepBackward = useCallback(
    (currentPos) => {
      const activeClue = currentSet.clues.find((c) => c.id === selectedClueId);
      if (!activeClue) return;

      const clueCells = [];
      for (let i = 0; i < activeClue.length; i++) {
        const r = activeClue.direction === 'across' ? activeClue.start.r : activeClue.start.r + i;
        const c = activeClue.direction === 'across' ? activeClue.start.c + i : activeClue.start.c;
        clueCells.push({ r, c });
      }

      const currentIndex = clueCells.findIndex((pos) => pos.r === currentPos.r && pos.c === currentPos.c);
      if (currentIndex > 0) {
        setSelectedCell(clueCells[currentIndex - 1]);
      }
    },
    [currentSet, selectedClueId]
  );

  // Handle typing a letter
  const handleInputLetter = useCallback(
    (letter) => {
      if (!selectedCell) return;
      const key = `${selectedCell.r}-${selectedCell.c}`;
      if (!cellMap[key]) return;

      const upper = letter.toUpperCase();
      const isCorrectLetter = cellMap[key].answer === upper;

      if (isCorrectLetter) {
        playMatchSuccessSound();
      } else {
        playPopSound();
      }

      setUserLetters((prev) => ({
        ...prev,
        [key]: upper,
      }));

      advanceToNextCell(selectedCell);
    },
    [selectedCell, cellMap, advanceToNextCell]
  );

  // Handle Backspace / Delete
  const handleDelete = useCallback(() => {
    if (!selectedCell) return;
    const key = `${selectedCell.r}-${selectedCell.c}`;

    playWhooshSound();
    setUserLetters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });

    stepBackward(selectedCell);
  }, [selectedCell, stepBackward]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleInputLetter(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (selectedCell) advanceToNextCell(selectedCell);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (selectedCell) stepBackward(selectedCell);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInputLetter, handleDelete, advanceToNextCell, stepBackward, selectedCell]);

  // Handle hidden input change (for mobile keyboard support)
  const handleNativeInputChange = (e) => {
    const val = e.target.value;
    if (val) {
      const lastChar = val[val.length - 1];
      if (/^[a-zA-Z]$/.test(lastChar)) {
        handleInputLetter(lastChar);
      }
    }
    e.target.value = '';
  };

  // Handle clicking a specific cell in the grid
  const handleCellClick = (r, c) => {
    const key = `${r}-${c}`;
    if (!cellMap[key]) return;

    playPopSound();
    setSelectedCell({ r, c });

    const cellClues = cellMap[key].clueIds;
    if (!cellClues.includes(selectedClueId)) {
      setSelectedClueId(cellClues[0]);
    }

    // Trigger mobile native keyboard
    if (nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  };

  // Handle clicking a picture clue card
  const handleClueClick = (clue) => {
    playPopSound();
    setSelectedClueId(clue.id);
    setSelectedCell(clue.start);

    // Focus input to trigger mobile keyboard
    if (nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  };

  const handleReset = () => {
    playPopSound();
    setUserLetters({});
    setShowCelebration(false);
    const firstClue = currentSet.clues[0];
    if (firstClue) {
      setSelectedClueId(firstClue.id);
      setSelectedCell(firstClue.start);
    }
  };

  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
  };

  const handleNextSet = () => {
    if (currentSetIndex < CROSSWORD_SETS.length - 1) {
      playPopSound();
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  const hasNextSet = currentSetIndex < CROSSWORD_SETS.length - 1;
  const activeClue = currentSet.clues.find((c) => c.id === selectedClueId);

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* Hidden input for mobile keyboard activation */}
      <input
        ref={nativeInputRef}
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={handleNativeInputChange}
        className="opacity-0 absolute -z-50 pointer-events-none w-0 h-0"
        aria-hidden="true"
      />

      {/* 1. TOP HEADER */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Set Selector Pills */}
        <div className="flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-sm border-2 border-amber-300">
          {CROSSWORD_SETS.map((set, idx) => {
            const isActive = idx === currentSetIndex;
            const isSetDone = completedSets[set.id];

            return (
              <button
                key={set.id}
                onClick={() => handleSwitchSet(idx)}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs font-['Fredoka'] transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs scale-105'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                  }
                `}
              >
                <span>{set.title}</span>
                {isSetDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Actions (Reset & Settings) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            title="Set Semula"
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full shadow-sm border border-amber-300 transition-transform active:scale-90 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan Audio"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-full shadow-md border border-slate-700 transition-transform active:scale-95 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>
        </div>
      </div>

      {/* 2. INSTRUCTION & THEME BANNER */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 z-20 mb-2 px-1">
        <div className="flex-1 flex items-center justify-between bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 px-3.5 py-2 rounded-2xl shadow-sm border-2 border-amber-400">
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-amber-950 font-['Fredoka'] tracking-wide">
            {currentSet.instruction}
          </p>
          <span className="text-[11px] sm:text-xs font-black text-amber-800 bg-amber-300/80 px-2.5 py-0.5 rounded-lg border border-amber-400">
            {currentSet.subtitle}
          </span>
        </div>
      </div>

      {/* 3. MAIN WORK AREA: Crossword Grid (Top) + Picture Clues List (Bottom) */}
      <div className="w-full max-w-3xl flex flex-col gap-3 sm:gap-4 my-auto">
        {/* A. INTERACTIVE CROSSWORD GRID (DI ATAS) */}
        <div className="w-full flex flex-col items-center justify-center bg-white/95 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-xl">
          {/* Active Word Banner */}
          {activeClue && (
            <div className="mb-2 px-3.5 py-1 bg-amber-100/90 rounded-full border border-amber-300 text-amber-950 font-black text-xs sm:text-sm font-['Fredoka'] flex items-center gap-1.5 animate-fade-in">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">
                {activeClue.number}
              </span>
              <span>{activeClue.label}</span>
              <span className="text-amber-700 text-[11px]">
                ({activeClue.direction === 'across' ? 'Melintang ➡️' : 'Menegak ⬇️'})
              </span>
            </div>
          )}

          {/* Grid Container */}
          <div
            className="grid gap-1 sm:gap-1.5 p-2 sm:p-3 bg-[#FAFAF9] rounded-2xl border-2 border-amber-200 shadow-inner max-w-full overflow-x-auto"
            style={{
              gridTemplateRows: `repeat(${currentSet.gridSize.rows}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${currentSet.gridSize.cols}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: currentSet.gridSize.rows }).map((_, r) =>
              Array.from({ length: currentSet.gridSize.cols }).map((_, c) => {
                const key = `${r}-${c}`;
                const cellData = cellMap[key];

                if (!cellData) {
                  // Non-playable cell
                  return (
                    <div
                      key={key}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-transparent opacity-10"
                    />
                  );
                }

                const userChar = userLetters[key] || '';
                const isCorrect = userChar && userChar.toUpperCase() === cellData.answer;
                const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
                const isInActiveClue = cellData.clueIds.includes(selectedClueId);

                return (
                  <div
                    key={key}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                      relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl font-black text-sm sm:text-lg md:text-xl font-['Fredoka']
                      flex items-center justify-center border-2 sm:border-3 transition-all duration-150 cursor-pointer select-none
                      ${
                        isSelected
                          ? 'bg-amber-300 text-slate-900 border-amber-600 scale-105 ring-3 ring-amber-400 shadow-md z-10 animate-pop'
                          : isInActiveClue
                          ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-xs'
                          : isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-xs'
                          : 'bg-white text-slate-900 border-slate-700 hover:bg-amber-50 hover:border-amber-500 shadow-xs'
                      }
                    `}
                  >
                    {/* Clue Number Badge */}
                    {cellData.number && (
                      <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-black text-slate-500 leading-none pointer-events-none">
                        {cellData.number}
                      </span>
                    )}

                    {/* Letter Character */}
                    <span className="pt-0.5">{userChar}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Helper Actions (Padam / Info) */}
          <div className="w-full flex items-center justify-between gap-2 mt-3 px-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-amber-600" />
              <span>Taip menggunakan papan kekunci telefon atau komputer</span>
            </span>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-full shadow-xs active:scale-95 cursor-pointer font-['Fredoka'] transition-all"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>Padam Huruf</span>
            </button>
          </div>
        </div>

        {/* B. PICTURE CLUES LIST (DI BAWAH) */}
        <div className="w-full bg-white/95 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-lg flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-black text-amber-950 font-['Fredoka'] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Petunjuk Gambar:</span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500">
              Tekan petunjuk untuk pilih perkataan
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {currentSet.clues.map((clue) => {
              const isSelected = selectedClueId === clue.id;

              // Check if word is complete
              let isWordComplete = true;
              for (let i = 0; i < clue.length; i++) {
                const r = clue.direction === 'across' ? clue.start.r : clue.start.r + i;
                const c = clue.direction === 'across' ? clue.start.c + i : clue.start.c;
                const key = `${r}-${c}`;
                if ((userLetters[key] || '').toUpperCase() !== clue.word[i].toUpperCase()) {
                  isWordComplete = false;
                  break;
                }
              }

              return (
                <button
                  key={clue.id}
                  onClick={() => handleClueClick(clue)}
                  className={`
                    flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer text-left
                    ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 shadow-sm scale-[1.02]'
                        : isWordComplete
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800'
                    }
                  `}
                >
                  {/* Clue Number Badge */}
                  <div className={`
                    w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg font-black text-xs sm:text-sm font-['Fredoka'] flex-shrink-0
                    ${isWordComplete ? 'bg-emerald-500 text-white' : isSelected ? 'bg-amber-500 text-white' : 'bg-amber-200 text-amber-900'}
                  `}>
                    {clue.number}
                  </div>

                  {/* Thumbnail Picture */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white p-1 border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-2xs">
                    <ClueImageThumbnail src={clue.imageSrc} type={clue.type} alt={clue.label} />
                  </div>

                  {/* Label & Direction Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-black font-['Fredoka'] truncate">
                      {clue.label}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 truncate">
                      ({clue.length} huruf {clue.direction === 'across' ? '➡️ Melintang' : '⬇️ Menegak'})
                    </p>
                  </div>

                  {isWordComplete && (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Golden Star Reward */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Cluster */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda berjaya menyelesaikan Teka Silang Kata ${currentSet.title} (${currentSet.subtitle})!`
                : 'Hebat! Anda telah berjaya menyelesaikan kesemua set Teka Silang Kata!'}
            </p>

            <div className="flex flex-col gap-2 w-full">
              {hasNextSet ? (
                <button
                  onClick={handleNextSet}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Seterusnya (Set 2)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer"
              >
                Main Semula Set Ini
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
