import { getAssetUrl } from "../../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  ImageIcon,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Vector Illustrations for the 5 Objects (Kerusi, Kasut, Kereta, Burung, Kucing)
function CustomObjectIllustration({ type, className = "w-full h-full" }) {
  switch (type) {
    case 'kereta':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="82" rx="42" ry="8" fill="#000000" opacity="0.15" />
          <path d="M12 56 C10 45 22 38 38 36 L50 18 C58 12 78 12 86 18 L94 36 C98 40 100 48 96 58 C94 66 90 70 80 70 L20 70 C12 70 12 64 12 56 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <path d="M48 20 L66 20 L66 36 L38 36 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <path d="M72 20 L84 20 L92 36 L72 36 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <circle cx="56" cy="28" r="4" fill="#FFFFFF" />
          <circle cx="57" cy="28" r="2" fill="#1E293B" />
          <circle cx="78" cy="28" r="4" fill="#FFFFFF" />
          <circle cx="79" cy="28" r="2" fill="#1E293B" />
          <circle cx="18" cy="50" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="94" cy="50" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="34" cy="70" r="14" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="34" cy="70" r="5" fill="#CBD5E1" />
          <circle cx="78" cy="70" r="14" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="78" cy="70" r="5" fill="#CBD5E1" />
        </svg>
      );
    case 'kasut':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="80" rx="42" ry="8" fill="#000000" opacity="0.15" />
          <g transform="translate(10, 24)">
            <path d="M8 28 C8 16 28 12 36 24 L58 28 C74 30 82 38 82 44 L8 44 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <path d="M62 30 C74 32 82 38 82 44 L58 44 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="6" y="42" width="78" height="7" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="6" y1="45" x2="84" y2="45" stroke="#EF4444" strokeWidth="1" />
            <line x1="28" y1="24" x2="40" y2="28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="36" y1="28" x2="48" y2="32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="32" x2="56" y2="36" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'kerusi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="84" rx="38" ry="6" fill="#000000" opacity="0.15" />
          <rect x="14" y="24" width="72" height="9" rx="2.5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
          <rect x="14" y="38" width="72" height="9" rx="2.5" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <polygon points="12,52 88,52 94,64 6,64" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          <path d="M18 30 L18 80 M26 60 L26 80 M82 30 L82 80 M74 60 L74 80" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M12 48 Q18 40 26 48 M74 48 Q82 40 88 48" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'burung':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="82" rx="28" ry="6" fill="#000000" opacity="0.15" />
          <path d="M22 68 Q50 64 80 72" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <polygon points="28,48 10,42 12,56 30,52" fill="#0284C7" />
          <ellipse cx="48" cy="46" rx="20" ry="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="54" cy="50" rx="13" ry="10" fill="#E0F2FE" />
          <ellipse cx="40" cy="44" rx="12" ry="8" fill="#0284C7" />
          <circle cx="64" cy="32" r="12" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <polygon points="74,30 88,34 74,38" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="68" cy="28" r="3.5" fill="#FFFFFF" />
          <circle cx="69.5" cy="28" r="2" fill="#1E293B" />
          <line x1="44" y1="60" x2="44" y2="68" stroke="#D97706" strokeWidth="2.5" />
          <line x1="54" y1="60" x2="54" y2="68" stroke="#D97706" strokeWidth="2.5" />
          <text x="82" y="24" fontSize="16" fontWeight="bold" fill="#EC4899">♪</text>
        </svg>
      );
    case 'kucing':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="84" rx="34" ry="7" fill="#000000" opacity="0.15" />
          <path d="M70 54 C88 38 94 22 84 15 C76 15 72 26 66 46" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" fill="none" />
          <ellipse cx="56" cy="58" rx="26" ry="20" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="44" cy="58" rx="16" ry="14" fill="#FFFFFF" />
          <circle cx="42" cy="38" r="20" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="42" cy="44" rx="12" ry="8" fill="#FFFFFF" />
          <polygon points="26,26 22,12 36,20" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <polygon points="27,24 25,16 34,21" fill="#FDA4AF" />
          <polygon points="58,26 62,12 48,20" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <polygon points="57,24 59,16 50,21" fill="#FDA4AF" />
          <circle cx="34" cy="34" r="4.5" fill="#1E293B" />
          <circle cx="33" cy="32" r="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="34" r="4.5" fill="#1E293B" />
          <circle cx="49" cy="32" r="1.5" fill="#FFFFFF" />
          <polygon points="41,40 43,40 42,42" fill="#F43F5E" />
          <path d="M38 44 Q42 47 42 42 Q42 47 46 44" stroke="#78350F" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="30" cy="40" r="3" fill="#FDA4AF" opacity="0.6" />
          <circle cx="54" cy="40" r="3" fill="#FDA4AF" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

// 5 OBJECTS (SINGLE SET)
const MATCH_ITEMS = [
  { id: 1, number: 1, word: 'Kucing', type: 'kucing', imageSrc: getAssetUrl('/images/match/1.png') },
  { id: 2, number: 2, word: 'Kereta', type: 'kereta', imageSrc: getAssetUrl('/images/match/2.png') },
  { id: 3, number: 3, word: 'Kasut', type: 'kasut', imageSrc: getAssetUrl('/images/match/3.png') },
  { id: 4, number: 4, word: 'Kerusi', type: 'kerusi', imageSrc: getAssetUrl('/images/match/4.png') },
  { id: 5, number: 5, word: 'Burung', type: 'burung', imageSrc: getAssetUrl('/images/match/5.png') },
];

// Helper to shuffle an array
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 5 PICTURE BOX COMPONENT (Box Bergambar)
function PictureBox({
  item,
  isMatched,
  matchedWord,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  isSelectedTarget,
  isPortrait = false,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-between p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl
        border-3 sm:border-4 transition-all duration-200 cursor-pointer shadow-md select-none w-full
        ${
          isMatched
            ? 'bg-emerald-50/95 border-emerald-400 shadow-emerald-200/50 scale-[1.01]'
            : isDragOver || isSelectedTarget
            ? 'bg-amber-100/90 border-amber-500 scale-105 ring-4 ring-amber-300/80 shadow-lg'
            : 'bg-white/95 border-amber-300 hover:border-amber-400 hover:shadow-lg hover:scale-[1.02]'
        }
      `}
    >
      {/* Box Header: Number Star Badge */}
      <div className="w-full flex items-center justify-between gap-1 mb-1">
        <div className="flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shadow-xs font-['Fredoka']">
          <span>⭐ {item.number}</span>
        </div>

        {isMatched && (
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-extrabold animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Betul!</span>
          </div>
        )}
      </div>

      {/* Picture Area: Large, Clear Image Area with Illustrated Vector Fallback */}
      <div
        className={`
          relative w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-50/70 to-orange-50/50 p-2 sm:p-3 flex items-center justify-center overflow-hidden border border-amber-200/80
          ${isPortrait ? 'h-28 sm:h-36 md:h-40' : 'h-22 sm:h-26 md:h-28'}
        `}
      >
        {!imgFailed && item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.word}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain drop-shadow-sm transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CustomObjectIllustration
              type={item.type}
              className={isPortrait ? 'w-24 h-24 sm:w-32 sm:h-32 object-contain' : 'w-18 h-18 sm:w-22 sm:h-22 object-contain'}
            />
          </div>
        )}
      </div>

      {/* Target Drop Zone / Answer Slot underneath the Picture */}
      <div
        className={`
          w-full mt-2 sm:mt-2.5 h-10 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center px-2 border-2 transition-all font-black text-xs sm:text-base font-['Fredoka']
          ${
            isMatched
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
              : isDragOver || isSelectedTarget
              ? 'bg-amber-300 text-slate-900 border-dashed border-amber-600 animate-pulse ring-2 ring-amber-400'
              : 'bg-slate-100 text-slate-400 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50'
          }
        `}
      >
        {isMatched ? (
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
            <span className="truncate">{matchedWord}</span>
          </div>
        ) : (
          <span className="text-[11px] sm:text-xs text-slate-400 font-semibold truncate">
            [ Seret perkataan di sini ]
          </span>
        )}
      </div>
    </div>
  );
}

export default function DragMatchGame({ orientation, onBackToMenu, onOpenSettings }) {
  // Map of slotNumber -> word matched
  const [matchedSlots, setMatchedSlots] = useState({});
  // Selected word card for tap-to-place interaction
  const [selectedWord, setSelectedWord] = useState(null);
  // Shuffled word options in the bank
  const [wordOptions, setWordOptions] = useState([]);
  // Currently dragged word
  const [draggedWord, setDraggedWord] = useState(null);
  // Drag over target box
  const [dragOverBox, setDragOverBox] = useState(null);
  // Show celebration modal when all 5 are matched
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Initialize single set
  useEffect(() => {
    setMatchedSlots({});
    setSelectedWord(null);
    setShowCelebration(false);
    setHasCelebrated(false);
    setDragOverBox(null);
    // Shuffle the word cards for challenge
    const words = MATCH_ITEMS.map((item) => item.word);
    setWordOptions(shuffleArray(words));
  }, []);

  // Check for completion
  useEffect(() => {
    const totalItems = MATCH_ITEMS.length;
    const correctCount = Object.keys(matchedSlots).length;

    if (totalItems > 0 && correctCount === totalItems && !hasCelebrated) {
      setHasCelebrated(true);
      setShowCelebration(true);
      playVictorySound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [matchedSlots, hasCelebrated]);

  // Handle word placement into a numbered picture box
  const handlePlaceWord = (targetNumber, word) => {
    if (!word) return;

    // Find the correct item for this box
    const targetItem = MATCH_ITEMS.find((it) => it.number === targetNumber);
    if (!targetItem) return;

    if (targetItem.word.toLowerCase() === word.toLowerCase()) {
      // Correct Match!
      playMatchSuccessSound();

      setMatchedSlots((prev) => ({
        ...prev,
        [targetNumber]: word,
      }));
      setSelectedWord(null);
      setDraggedWord(null);
      setDragOverBox(null);
    } else {
      // Wrong Match
      playOopsSound();
      setSelectedWord(null);
      setDraggedWord(null);
      setDragOverBox(null);
    }
  };

  // Drag handlers
  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e, boxNumber) => {
    e.preventDefault();
    setDragOverBox(boxNumber);
  };

  const handleDragLeave = () => {
    setDragOverBox(null);
  };

  const handleDrop = (e, targetNumber) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (word) {
      handlePlaceWord(targetNumber, word);
    }
    setDragOverBox(null);
  };

  // Tap handler on a word card in the bank
  const handleWordCardClick = (word) => {
    playPopSound();
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  // Tap handler on a picture box
  const handleBoxClick = (boxNumber) => {
    if (matchedSlots[boxNumber]) {
      playPopSound();
      return;
    }

    if (selectedWord) {
      handlePlaceWord(boxNumber, selectedWord);
    } else {
      playWhooshSound();
    }
  };

  const handleResetLevel = () => {
    playPopSound();
    setMatchedSlots({});
    setSelectedWord(null);
    setShowCelebration(false);
    setHasCelebrated(false);
    setWordOptions(shuffleArray(MATCH_ITEMS.map((i) => i.word)));
  };

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* Top Header: Kembali ke Menu & Tetapan */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        {/* Back Button (Green Pill) */}
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Title Tag */}
        <div className="flex items-center gap-1 bg-white/95 px-4 py-1 rounded-full shadow-sm border-2 border-amber-300">
          <span className="text-xs sm:text-sm font-black text-amber-900 font-['Fredoka']">
            Seret & Padan (5 Gambar)
          </span>
        </div>

        {/* Actions (Reset & Settings) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetLevel}
            title="Set Semula"
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full shadow-sm border border-amber-300 transition-transform active:scale-90"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan Audio"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-full shadow-md border border-slate-700 transition-transform active:scale-95"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>
        </div>
      </div>

      {/* Instruction Banner (Without voice-over button) */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 z-20 mb-2 px-1">
        <div className="flex-1 flex items-center gap-2 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 px-3.5 py-2 rounded-2xl shadow-sm border-2 border-amber-300">
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-amber-400 text-amber-950 rounded-xl shadow-xs">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-amber-950 font-['Fredoka'] tracking-wide">
            Seret jawapan yang betul ke gambar yang bersesuaian.
          </p>
        </div>
      </div>

      {/* CENTER: 5 PICTURE BOXES (5 BOX BERGAMBAR) */}
      <div className="relative flex-1 w-full max-w-4xl my-1 flex flex-col justify-center">
        {orientation === 'portrait' ? (
          /* Portrait Mode: 2-Column Responsive Multi-Row Grid for Big Clear Picture Boxes */
          <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 items-stretch py-1">
            {MATCH_ITEMS.map((item, idx) => (
              <div
                key={item.number}
                className={idx === 4 ? "col-span-2 w-full max-w-[280px] sm:max-w-[340px] mx-auto flex justify-center" : "w-full"}
              >
                <PictureBox
                  item={item}
                  isMatched={!!matchedSlots[item.number]}
                  matchedWord={matchedSlots[item.number]}
                  isDragOver={dragOverBox === item.number}
                  onDragOver={(e) => handleDragOver(e, item.number)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, item.number)}
                  onClick={() => handleBoxClick(item.number)}
                  isSelectedTarget={!!selectedWord && !matchedSlots[item.number]}
                  isPortrait={true}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Landscape Mode: 5-Column Side-by-Side Grid */
          <div className="w-full grid grid-cols-5 gap-2.5 sm:gap-3 items-stretch">
            {MATCH_ITEMS.map((item) => (
              <PictureBox
                key={item.number}
                item={item}
                isMatched={!!matchedSlots[item.number]}
                matchedWord={matchedSlots[item.number]}
                isDragOver={dragOverBox === item.number}
                onDragOver={(e) => handleDragOver(e, item.number)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.number)}
                onClick={() => handleBoxClick(item.number)}
                isSelectedTarget={!!selectedWord && !matchedSlots[item.number]}
                isPortrait={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM: WORD BANK / PILIHAN JAWAPAN */}
      <div className="w-full max-w-4xl flex flex-col gap-1.5 z-20 mt-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-xl">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs sm:text-sm font-black text-amber-950 font-['Fredoka'] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Pilihan Jawapan: Seret atau Tekan Perkataan</span>
          </span>
          {selectedWord && (
            <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
              Tekan kotak gambar sasaran!
            </span>
          )}
        </div>

        {/* Draggable Word Cards Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
          {wordOptions.map((word) => {
            const isUsed = Object.values(matchedSlots).includes(word);
            const isSelected = selectedWord === word;

            return (
              <div
                key={word}
                draggable={!isUsed}
                onDragStart={(e) => !isUsed && handleDragStart(e, word)}
                onClick={() => !isUsed && handleWordCardClick(word)}
                className={`
                  px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-base font-['Fredoka'] shadow-md select-none transition-all duration-150
                  ${
                    isUsed
                      ? 'bg-slate-100 text-slate-300 border-2 border-slate-200 opacity-40 cursor-default shadow-none'
                      : isSelected
                      ? 'bg-amber-400 text-slate-900 border-3 border-amber-600 scale-110 ring-4 ring-amber-300 shadow-xl animate-bounce cursor-pointer'
                      : 'bg-gradient-to-b from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-amber-950 border-2 border-amber-500 hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing shadow-sm'
                  }
                `}
              >
                <span>{word}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* VICTORY CELEBRATION MODAL (With 3D Golden Star & 3-Star Cluster) */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Shining Golden Star Reward Graphic */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Rating Cluster */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              Anda berjaya memadankan kesemua 5 kotak bergambar dengan sangat tepat!
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  playPopSound();
                  setShowCelebration(false);
                }}
                className="w-full py-2.5 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 font-black rounded-xl text-sm shadow-sm transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>👁️</span>
                <span>Lihat Jawapan</span>
              </button>

              <button
                onClick={handleResetLevel}
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
