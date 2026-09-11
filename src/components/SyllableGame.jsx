import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  ChevronRight,
  ChevronLeft,
  Award,
  RefreshCw,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Data Set Suku Kata (100% Bahasa Melayu)
const SYLLABLE_SETS = [
  {
    id: 'set1',
    title: 'Set 1',
    subtitle: '2 Suku Kata',
    instruction: 'Susun suku kata untuk membentuk perkataan yang betul mengikut gambar.',
    items: [
      {
        id: 1,
        word: 'BAJU',
        displayWord: 'Baju',
        syllables: ['ba', 'ju'],
        shuffled: ['ju', 'ba'],
        imageSrc: getAssetUrl('/images/syllable/baju.png'),
        type: 'baju',
        hint: 'Pakaian harian kita.',
      },
      {
        id: 2,
        word: 'BOLA',
        displayWord: 'Bola',
        syllables: ['bo', 'la'],
        shuffled: ['la', 'bo'],
        imageSrc: getAssetUrl('/images/syllable/bola.png'),
        type: 'bola',
        hint: 'Alat permainan padang yang bulat.',
      },
      {
        id: 3,
        word: 'BUKU',
        displayWord: 'Buku',
        syllables: ['bu', 'ku'],
        shuffled: ['ku', 'bu'],
        imageSrc: getAssetUrl('/images/syllable/buku.png'),
        type: 'buku',
        hint: 'Bahan bacaan untuk menuntut ilmu.',
      },
      {
        id: 4,
        word: 'ROTI',
        displayWord: 'Roti',
        syllables: ['ro', 'ti'],
        shuffled: ['ti', 'ro'],
        imageSrc: getAssetUrl('/images/syllable/roti.png'),
        type: 'roti',
        hint: 'Makanan enak untuk sarapan pagi.',
      },
      {
        id: 5,
        word: 'KASUT',
        displayWord: 'Kasut',
        syllables: ['ka', 'sut'],
        shuffled: ['sut', 'ka'],
        imageSrc: getAssetUrl('/images/syllable/kasut.png'),
        type: 'kasut',
        hint: 'Dipakai pada kaki sebelum keluar.',
      },
      {
        id: 6,
        word: 'MEJA',
        displayWord: 'Meja',
        syllables: ['me', 'ja'],
        shuffled: ['ja', 'me'],
        imageSrc: getAssetUrl('/images/syllable/meja.png'),
        type: 'meja',
        hint: 'Perabot untuk belajar dan menulis.',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2',
    subtitle: '3 Suku Kata',
    instruction: 'Susun 3 suku kata untuk membentuk perkataan yang lengkap.',
    items: [
      {
        id: 1,
        word: 'KERETA',
        displayWord: 'Kereta',
        syllables: ['ke', 're', 'ta'],
        shuffled: ['ta', 'ke', 're'],
        imageSrc: getAssetUrl('/images/syllable/kereta.png'),
        type: 'kereta',
        hint: 'Kenderaan beroda empat.',
      },
      {
        id: 2,
        word: 'KELAPA',
        displayWord: 'Kelapa',
        syllables: ['ke', 'la', 'pa'],
        shuffled: ['pa', 'la', 'ke'],
        imageSrc: getAssetUrl('/images/syllable/kelapa.png'),
        type: 'kelapa',
        hint: 'Buah yang mempunyai air manis dan santan.',
      },
      {
        id: 3,
        word: 'TOMATO',
        displayWord: 'Tomato',
        syllables: ['to', 'ma', 'to'],
        shuffled: ['ma', 'to', 'to'],
        imageSrc: getAssetUrl('/images/syllable/tomato.png'),
        type: 'tomato',
        hint: 'Sayuran / buah merah yang berkhasiat.',
      },
      {
        id: 4,
        word: 'BASIKAL',
        displayWord: 'Basikal',
        syllables: ['ba', 'si', 'kal'],
        shuffled: ['kal', 'ba', 'si'],
        imageSrc: getAssetUrl('/images/syllable/basikal.png'),
        type: 'basikal',
        hint: 'Kenderaan dua roda yang dikayuh.',
      },
      {
        id: 5,
        word: 'PELANGI',
        displayWord: 'Pelangi',
        syllables: ['pe', 'la', 'ngi'],
        shuffled: ['ngi', 'pe', 'la'],
        imageSrc: getAssetUrl('/images/syllable/pelangi.png'),
        type: 'pelangi',
        hint: 'Tujuh warna indah di langit selepas hujan.',
      },
      {
        id: 6,
        word: 'ALMARI',
        displayWord: 'Almari',
        syllables: ['al', 'ma', 'ri'],
        shuffled: ['ri', 'al', 'ma'],
        imageSrc: getAssetUrl('/images/syllable/almari.png'),
        type: 'almari',
        hint: 'Perabot untuk menyimpan pakaian dan barang.',
      },
    ],
  },
];

// Fallback Vector Illustrations
function SyllableVectorIllustration({ type, className = 'w-full h-full' }) {
  switch (type) {
    case 'baju':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M 30,22 L 40,30 L 60,30 L 70,22 L 86,38 L 74,48 L 72,82 L 28,82 L 26,48 L 14,38 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="46" r="3" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="50" cy="60" r="3" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="50" cy="72" r="3" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M 40,30 Q 50,40 60,30" stroke="#0284C7" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case 'bola':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="38" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
          <polygon points="50,34 62,42 58,56 42,56 38,42" fill="#0F172A" />
          <path d="M 50,34 L 50,12" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M 62,42 L 84,36" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M 58,56 L 74,78" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M 42,56 L 26,78" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M 38,42 L 16,36" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      );
    case 'buku':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M 16,30 Q 50,36 50,78 Q 20,72 16,30 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <path d="M 84,30 Q 50,36 50,78 Q 80,72 84,30 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          <path d="M 22,38 Q 48,43 48,72" stroke="#FEF3C7" strokeWidth="2" strokeDasharray="3,3" fill="none" />
          <path d="M 78,38 Q 52,43 52,72" stroke="#FEF3C7" strokeWidth="2" strokeDasharray="3,3" fill="none" />
          <line x1="50" y1="36" x2="50" y2="78" stroke="#78350F" strokeWidth="3.5" />
        </svg>
      );
    case 'roti':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="20" y="42" width="60" height="34" rx="8" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
          <ellipse cx="50" cy="42" rx="34" ry="16" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <path d="M 32,36 Q 36,44 40,36" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 46,36 Q 50,44 54,36" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 60,36 Q 64,44 68,36" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'kasut':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M 18,52 L 32,34 L 54,42 L 72,50 Q 86,55 84,68 L 18,68 Z"
            fill="#EC4899"
            stroke="#BE185D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="15" y="68" width="72" height="10" rx="3" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="38" y1="42" x2="48" y2="52" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="44" x2="56" y2="54" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'meja':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Table top */}
          <polygon points="12,42 32,28 88,28 68,42" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <rect x="12" y="42" width="56" height="8" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          {/* Legs */}
          <rect x="18" y="50" width="6" height="32" fill="#78350F" />
          <rect x="60" y="50" width="6" height="32" fill="#78350F" />
          <rect x="34" y="36" width="5" height="26" fill="#92400E" />
          <rect x="80" y="36" width="5" height="26" fill="#92400E" />
        </svg>
      );
    case 'kereta':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M 15,62 L 20,48 L 36,36 L 68,36 L 82,48 L 88,62 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="3"
          />
          <rect x="12" y="58" width="76" height="14" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="2.5" />
          {/* Windows */}
          <polygon points="38,39 50,39 50,48 26,48" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          <polygon points="54,39 66,39 76,48 54,48" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          {/* Wheels */}
          <circle cx="30" cy="72" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="30" cy="72" r="4" fill="#94A3B8" />
          <circle cx="70" cy="72" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="70" cy="72" r="4" fill="#94A3B8" />
        </svg>
      );
    case 'kelapa':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="55" r="30" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
          <ellipse cx="50" cy="35" rx="14" ry="7" fill="#15803D" />
          <path d="M 48,30 L 45,18" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="38" cy="50" r="4" fill="#14532D" opacity="0.4" />
          <circle cx="62" cy="50" r="4" fill="#14532D" opacity="0.4" />
        </svg>
      );
    case 'tomato':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="55" r="32" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <ellipse cx="40" cy="44" rx="8" ry="4" fill="#F87171" transform="rotate(-20 40 44)" />
          {/* Stem & Leaves */}
          <path d="M 50,28 L 50,16" stroke="#65A30D" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="50,28 40,24 45,30 35,32 46,34 50,30" fill="#4ADE80" stroke="#16A34A" strokeWidth="1" />
          <polygon points="50,28 60,24 55,30 65,32 54,34 50,30" fill="#4ADE80" stroke="#16A34A" strokeWidth="1" />
        </svg>
      );
    case 'basikal':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Wheels */}
          <circle cx="28" cy="65" r="16" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
          <circle cx="72" cy="65" r="16" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
          {/* Frame */}
          <polygon points="28,65 48,65 62,45 42,45" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinejoin="round" />
          <line x1="48" y1="65" x2="42" y2="40" stroke="#3B82F6" strokeWidth="3" />
          <line x1="72" y1="65" x2="62" y2="45" stroke="#3B82F6" strokeWidth="3" />
          {/* Seat & Handle */}
          <line x1="38" y1="40" x2="46" y2="40" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="36" x2="66" y2="36" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="45" x2="63" y2="36" stroke="#3B82F6" strokeWidth="3" />
        </svg>
      );
    case 'pelangi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="65" rx="36" ry="36" stroke="#EF4444" strokeWidth="6" fill="none" />
          <ellipse cx="50" cy="65" rx="30" ry="30" stroke="#F59E0B" strokeWidth="6" fill="none" />
          <ellipse cx="50" cy="65" rx="24" ry="24" stroke="#10B981" strokeWidth="6" fill="none" />
          <ellipse cx="50" cy="65" rx="18" ry="18" stroke="#3B82F6" strokeWidth="6" fill="none" />
          <ellipse cx="50" cy="65" rx="12" ry="12" stroke="#8B5CF6" strokeWidth="6" fill="none" />
          {/* Clouds */}
          <ellipse cx="24" cy="68" rx="12" ry="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="76" cy="68" rx="12" ry="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      );
    case 'almari':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Main Wardrobe Body */}
          <rect x="22" y="16" width="56" height="70" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          {/* Left Door */}
          <rect x="25" y="20" width="24" height="60" rx="2" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="45" cy="50" r="2.5" fill="#78350F" />
          {/* Right Door */}
          <rect x="51" y="20" width="24" height="60" rx="2" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="55" cy="50" r="2.5" fill="#78350F" />
          {/* Bottom Legs */}
          <rect x="26" y="86" width="8" height="6" fill="#78350F" rx="1" />
          <rect x="66" y="86" width="8" height="6" fill="#78350F" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}

// Clue Thumbnail with automatic fallback
function SyllableImageThumbnail({ src, type, alt }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  if (!imgError && src) {
    return (
      <img
        src={src}
        alt={alt || type}
        onError={() => setImgError(true)}
        className="w-full h-full object-contain drop-shadow-md"
      />
    );
  }

  return <SyllableVectorIllustration type={type} className="w-full h-full object-contain" />;
}

// Syllable color themes for rich visual distinction
const SYLLABLE_COLORS = [
  'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-600',
  'bg-sky-400 hover:bg-sky-300 text-sky-950 border-sky-600',
  'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 border-emerald-600',
  'bg-rose-400 hover:bg-rose-300 text-rose-950 border-rose-600',
  'bg-purple-400 hover:bg-purple-300 text-purple-950 border-purple-600',
];

export default function SyllableGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = SYLLABLE_SETS[currentSetIndex] || SYLLABLE_SETS[0];

  const [itemIndex, setItemIndex] = useState(0);
  const currentItem = currentSet.items[itemIndex] || currentSet.items[0];

  // Placed syllables in slots: array of strings e.g. ['ba', 'ju'] or [null, null]
  const [placedSyllables, setPlacedSyllables] = useState([]);
  // Remaining available syllables in pool with unique tracking IDs
  const [availableSyllables, setAvailableSyllables] = useState([]);

  // Question validation state: 'idle', 'correct', 'wrong'
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  // Completed item tracking for current set
  const [completedItems, setCompletedItems] = useState({});
  // Completed set tracking
  const [completedSets, setCompletedSets] = useState({});
  // Victory celebration modal
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize or update state when item or set changes
  useEffect(() => {
    if (!currentItem) return;

    // Reset placed slots
    setPlacedSyllables(new Array(currentItem.syllables.length).fill(null));

    // Initialize available pool with unique keys
    const pool = currentItem.shuffled.map((syl, idx) => ({
      id: `${itemIndex}-${idx}-${syl}`,
      text: syl,
      originalIdx: idx,
    }));
    setAvailableSyllables(pool);
    setFeedbackStatus('idle');
  }, [itemIndex, currentSetIndex]);

  // Handle placing a syllable from pool to the first empty slot
  const handleSelectPoolSyllable = (item) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    // Find first empty slot
    const firstEmptyIndex = placedSyllables.findIndex((s) => s === null);
    if (firstEmptyIndex === -1) return;

    // Update placed syllables
    const newPlaced = [...placedSyllables];
    newPlaced[firstEmptyIndex] = item;
    setPlacedSyllables(newPlaced);

    // Remove from available pool
    const newAvailable = availableSyllables.filter((s) => s.id !== item.id);
    setAvailableSyllables(newAvailable);

    // Check answer if all slots are filled
    if (newPlaced.every((s) => s !== null)) {
      validateAnswer(newPlaced);
    }
  };

  // Handle removing a placed syllable back to pool
  const handleRemovePlacedSyllable = (slotIdx) => {
    if (feedbackStatus === 'correct') return;
    const item = placedSyllables[slotIdx];
    if (!item) return;

    playPopSound();
    const newPlaced = [...placedSyllables];
    newPlaced[slotIdx] = null;
    setPlacedSyllables(newPlaced);

    // Add back to pool
    setAvailableSyllables((prev) => [...prev, item]);
    setFeedbackStatus('idle');
  };

  // Validate current placed sequence
  const validateAnswer = (placedArray) => {
    const constructedWord = placedArray
      .map((item) => (item ? item.text : ''))
      .join('')
      .toUpperCase();

    const targetWord = currentItem.word.toUpperCase();

    if (constructedWord === targetWord) {
      // Correct!
      setFeedbackStatus('correct');
      playMatchSuccessSound();

      const newCompleted = {
        ...completedItems,
        [`${currentSet.id}-${currentItem.id}`]: true,
      };
      setCompletedItems(newCompleted);

      // Check if all items in this set are completed
      const allDone = currentSet.items.every(
        (item) => newCompleted[`${currentSet.id}-${item.id}`]
      );

      if (allDone) {
        setCompletedSets((prev) => ({ ...prev, [currentSet.id]: true }));
        setTimeout(() => {
          triggerVictoryCelebration();
        }, 1200);
      }
    } else {
      // Wrong!
      setFeedbackStatus('wrong');
      playWhooshSound();
    }
  };

  // Reset current question slots
  const handleResetCurrentWord = () => {
    playPopSound();
    setPlacedSyllables(new Array(currentItem.syllables.length).fill(null));
    const pool = currentItem.shuffled.map((syl, idx) => ({
      id: `${itemIndex}-${idx}-${syl}`,
      text: syl,
      originalIdx: idx,
    }));
    setAvailableSyllables(pool);
    setFeedbackStatus('idle');
  };

  // Navigate to previous word
  const handlePrevItem = () => {
    if (itemIndex > 0) {
      playPopSound();
      setItemIndex(itemIndex - 1);
    }
  };

  // Navigate to next word
  const handleNextItem = () => {
    if (itemIndex < currentSet.items.length - 1) {
      playPopSound();
      setItemIndex(itemIndex + 1);
    }
  };

  // Switch Sets
  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
    setItemIndex(0);
    setShowCelebration(false);
  };

  // Trigger full set celebration
  const triggerVictoryCelebration = () => {
    setShowCelebration(true);
    playVictorySound();

    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const hasNextSet = currentSetIndex < SYLLABLE_SETS.length - 1;
  const isCurrentItemDone = completedItems[`${currentSet.id}-${currentItem.id}`];

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-lime-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* 1. TOP NAVIGATION HEADER */}
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
        <div className="flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-sm border-2 border-lime-300">
          {SYLLABLE_SETS.map((set, idx) => {
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
                      ? 'bg-lime-500 text-white shadow-xs scale-105'
                      : 'bg-lime-50 hover:bg-lime-100 text-lime-900'
                  }
                `}
              >
                <span>{set.title}</span>
                {isSetDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Action Buttons (Reset & Settings) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetCurrentWord}
            title="Susun Semula"
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

      {/* 2. INSTRUCTION & PROGRESS BANNER */}
      <div className="w-full max-w-3xl flex flex-col gap-1.5 z-20 mb-2 px-1">
        <div className="flex items-center justify-between bg-gradient-to-r from-lime-200 via-amber-100 to-emerald-200 px-3.5 py-2 rounded-2xl shadow-sm border-2 border-lime-400">
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-lime-950 font-['Fredoka'] tracking-wide">
            {currentSet.instruction}
          </p>
          <span className="text-[11px] sm:text-xs font-black text-lime-800 bg-lime-300/80 px-2.5 py-0.5 rounded-lg border border-lime-400">
            {currentSet.subtitle}
          </span>
        </div>

        {/* Word Progress Dots */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            {currentSet.items.map((it, idx) => {
              const isCurrent = idx === itemIndex;
              const isDone = completedItems[`${currentSet.id}-${it.id}`];

              return (
                <button
                  key={it.id}
                  onClick={() => {
                    playPopSound();
                    setItemIndex(idx);
                  }}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs font-['Fredoka'] transition-all flex items-center justify-center cursor-pointer border-2
                    ${
                      isCurrent
                        ? 'bg-lime-500 text-white border-lime-600 scale-110 shadow-sm ring-2 ring-lime-300'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                        : 'bg-white/80 text-slate-600 border-slate-300 hover:bg-amber-50'
                    }
                  `}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : idx + 1}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-black text-slate-600 font-['Fredoka']">
            Perkataan {itemIndex + 1} / {currentSet.items.length}
          </span>
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE ARENA */}
      <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto">
        <div className="w-full bg-white/95 p-4 sm:p-6 rounded-3xl border-3 border-lime-300 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative Corner Badge */}
          <div className="absolute top-3 left-4 flex items-center gap-1.5 px-3 py-1 bg-lime-100/90 rounded-full border border-lime-300 text-lime-900 font-black text-xs font-['Fredoka']">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            <span>{currentItem.syllables.length} Suku Kata</span>
          </div>

          {/* Reset button inside card */}
          <button
            onClick={handleResetCurrentWord}
            className="absolute top-3 right-4 flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold text-xs bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Susun Semula</span>
          </button>

          {/* Target Picture Illustration Display */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl bg-gradient-to-b from-amber-50 to-lime-50/60 p-3 sm:p-4 border-2 border-lime-200 flex items-center justify-center shadow-inner mt-6 mb-2 transition-transform duration-300 hover:scale-105">
            <SyllableImageThumbnail
              src={currentItem.imageSrc}
              type={currentItem.type}
              alt={currentItem.displayWord}
            />
          </div>

          {/* Target Word Hint / Description */}
          <p className="text-xs sm:text-sm font-bold text-slate-500 italic mb-3 text-center px-4">
            "{currentItem.hint}"
          </p>

          {/* A. TARGET ANSWER SLOTS (KOTAK JAWAPAN) */}
          <div className="w-full flex flex-col items-center gap-2 mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider font-['Fredoka']">
              Kotak Jawapan:
            </span>

            <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
              {placedSyllables.map((slotItem, slotIdx) => {
                const isFilled = slotItem !== null;

                return (
                  <div
                    key={`slot-${slotIdx}`}
                    onClick={() => handleRemovePlacedSyllable(slotIdx)}
                    className={`
                      w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-22 rounded-2xl font-black text-xl sm:text-2xl md:text-3xl font-['Fredoka']
                      flex flex-col items-center justify-center border-3 transition-all duration-200 cursor-pointer select-none
                      ${
                        isFilled
                          ? feedbackStatus === 'correct'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 animate-bounce'
                            : feedbackStatus === 'wrong'
                            ? 'bg-rose-100 text-rose-900 border-rose-500 animate-shake'
                            : 'bg-lime-400 text-lime-950 border-lime-600 shadow-sm scale-102 hover:bg-lime-300'
                          : 'bg-slate-100 border-dashed border-slate-300 hover:border-lime-400 text-slate-400 shadow-inner'
                      }
                    `}
                  >
                    {isFilled ? (
                      <>
                        <span>{slotItem.text.toUpperCase()}</span>
                        <span className="text-[9px] sm:text-[10px] opacity-70 font-semibold leading-none">
                          Tekan utk buang
                        </span>
                      </>
                    ) : (
                      <span className="text-xs sm:text-sm text-slate-400 font-bold">
                        Slot {slotIdx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. SCRAMBLED SYLLABLE TILES (PILIHAN SUKU KATA) */}
          <div className="w-full flex flex-col items-center gap-2 pt-2 border-t-2 border-slate-100">
            <span className="text-xs font-black text-slate-600 font-['Fredoka']">
              Pilihan Suku Kata (Tekan untuk susun):
            </span>

            <div className="flex items-center justify-center gap-2.5 sm:gap-4 min-h-[64px] flex-wrap">
              {availableSyllables.length === 0 ? (
                <div className="text-xs font-bold text-slate-400 py-2">
                  {feedbackStatus === 'correct'
                    ? '🎉 Tahniah! Susunan suku kata adalah tepat!'
                    : 'Semua suku kata telah dimasukkan ke dalam kotak jawapan.'}
                </div>
              ) : (
                availableSyllables.map((sylObj, idx) => {
                  const colorClass =
                    SYLLABLE_COLORS[sylObj.originalIdx % SYLLABLE_COLORS.length];

                  return (
                    <button
                      key={sylObj.id}
                      onClick={() => handleSelectPoolSyllable(sylObj)}
                      className={`
                        w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-2xl font-black text-xl sm:text-2xl md:text-3xl font-['Fredoka']
                        flex items-center justify-center border-3 shadow-md transition-all active:scale-95 hover:scale-105 cursor-pointer
                        ${colorClass}
                      `}
                    >
                      <span>{sylObj.text.toUpperCase()}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Feedback message banner */}
          {feedbackStatus === 'correct' && (
            <div className="mt-3 px-4 py-1.5 bg-emerald-100 border-2 border-emerald-400 text-emerald-900 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] flex items-center gap-1.5 animate-pop">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Hebat! Perkataan: {currentItem.displayWord} ({currentItem.word})</span>
            </div>
          )}

          {feedbackStatus === 'wrong' && (
            <div className="mt-3 px-4 py-1.5 bg-rose-100 border-2 border-rose-400 text-rose-900 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] flex items-center gap-1.5 animate-shake">
              <span>Cuba lagi! Susunan belum tepat. Tekan kotak jawapan untuk tukar.</span>
            </div>
          )}
        </div>

        {/* Bottom Pagination Controls (Sebelum / Seterusnya) */}
        <div className="w-full flex items-center justify-between px-2">
          <button
            onClick={handlePrevItem}
            disabled={itemIndex === 0}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all
              ${
                itemIndex === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-white hover:bg-lime-50 text-slate-800 border-2 border-lime-300 shadow-sm active:scale-95 cursor-pointer'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelum</span>
          </button>

          <button
            onClick={handleNextItem}
            disabled={itemIndex === currentSet.items.length - 1}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all
              ${
                itemIndex === currentSet.items.length - 1
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-lime-500 hover:bg-lime-600 text-white border-2 border-lime-400 shadow-md active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-lime-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Golden Star Reward */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Cluster */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda berjaya menyelesaikan kesemua soalan ${currentSet.title} (${currentSet.subtitle})!`
                : 'Hebat sekali! Anda telah berjaya menguasai kesemua set Susun Suku Kata!'}
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

              {hasNextSet ? (
                <button
                  onClick={() => handleSwitchSet(currentSetIndex + 1)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Teruskan ke Set 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={() => {
                  setShowCelebration(false);
                  setItemIndex(0);
                  handleResetCurrentWord();
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer"
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
