import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Trophy,
  Coins,
  Wallet,
  ShoppingBag,
  HelpCircle,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  speakMalayText,
} from '../../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from '../literasi/PhonicsIllustration';

// --- AUTHENTIC MALAYSIAN MONEY SVG RENDERER ---
export function MoneyRenderer({ item, size = 'md', className = '' }) {
  if (!item) return null;
  const { type, value, label } = item;

  // Sizes for Coins
  const coinSizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  };

  // Sizes for Banknotes
  const noteSizeMap = {
    sm: 'w-24 h-12',
    md: 'w-32 h-16 sm:w-40 sm:h-20',
    lg: 'w-40 h-20 sm:w-52 sm:h-26 md:w-60 md:h-30',
  };

  if (type === 'coin') {
    const isGold = value === 20 || value === 50;
    const currentSize = coinSizeMap[size] || coinSizeMap.md;

    return (
      <svg
        viewBox="0 0 100 100"
        className={`${currentSize} ${className} filter drop-shadow-md select-none transform hover:scale-105 transition-transform`}
        fill="none"
      >
        {/* Coin Outer Rim */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill={isGold ? '#F59E0B' : '#94A3B8'}
          stroke={isGold ? '#B45309' : '#475569'}
          strokeWidth="4"
        />
        {/* Coin Inner Face */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill={isGold ? '#FCD34D' : '#CBD5E1'}
          stroke={isGold ? '#D97706' : '#64748B'}
          strokeWidth="2"
        />
        {/* Decorative Dotted Ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          stroke={isGold ? '#B45309' : '#64748B'}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Coin Gloss */}
        <path
          d="M24 28 C34 18 66 18 76 28"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Hibiscus (Bunga Raya) mini motif */}
        <g transform="translate(42, 22) scale(0.8)">
          <circle cx="10" cy="8" r="4" fill={isGold ? '#D97706' : '#64748B'} opacity="0.6" />
          <circle cx="6" cy="12" r="4" fill={isGold ? '#D97706' : '#64748B'} opacity="0.6" />
          <circle cx="14" cy="12" r="4" fill={isGold ? '#D97706' : '#64748B'} opacity="0.6" />
        </g>
        {/* Value Text */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fill={isGold ? '#78350F' : '#1E293B'}
          fontSize="26"
          fontWeight="900"
          fontFamily="'Fredoka', sans-serif"
        >
          {value}
        </text>
        {/* SEN Text */}
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fill={isGold ? '#92400E' : '#334155'}
          fontSize="11"
          fontWeight="800"
          fontFamily="'Fredoka', sans-serif"
          letterSpacing="1"
        >
          SEN
        </text>
      </svg>
    );
  }

  // --- BANKNOTES (RM1, RM5, RM10) ---
  const currentSize = noteSizeMap[size] || noteSizeMap.md;

  const notePalettes = {
    1: {
      bg: 'from-sky-500 to-blue-600',
      border: 'border-blue-700',
      accent: 'bg-blue-300/40',
      text: 'text-blue-950',
      subText: 'text-blue-100',
      motif: 'Wau Bulan 🪁',
    },
    5: {
      bg: 'from-emerald-500 to-green-600',
      border: 'border-green-700',
      accent: 'bg-green-300/40',
      text: 'text-green-950',
      subText: 'text-green-100',
      motif: 'Enggang 🦜',
    },
    10: {
      bg: 'from-rose-500 to-red-600',
      border: 'border-red-700',
      accent: 'bg-red-300/40',
      text: 'text-red-950',
      subText: 'text-red-100',
      motif: 'Rafflesia 🌺',
    },
  };

  const p = notePalettes[value] || notePalettes[1];

  return (
    <div
      className={`
        ${currentSize} ${className} relative rounded-xl bg-gradient-to-r ${p.bg} border-2 sm:border-3 ${p.border}
        shadow-lg flex flex-col justify-between p-1.5 sm:p-2.5 select-none overflow-hidden transform hover:scale-105 transition-transform
      `}
    >
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center font-black text-white text-3xl sm:text-5xl font-['Fredoka'] pointer-events-none">
        RM{value}
      </div>

      {/* Top Row: BNM Text & Value */}
      <div className="flex items-center justify-between w-full z-10">
        <span className="text-[9px] sm:text-[11px] font-black tracking-wider text-white uppercase font-['Fredoka']">
          Bank Negara Malaysia
        </span>
        <span className="text-xs sm:text-sm font-black text-amber-200 font-['Fredoka']">
          RM{value}
        </span>
      </div>

      {/* Center Row: Motif & Agong Crown Emblem */}
      <div className="flex items-center justify-between w-full px-1 z-10">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-xs sm:text-base shadow-inner">
          👑
        </div>
        <span className="text-[10px] sm:text-xs font-black text-white/90 font-['Fredoka']">
          {p.motif}
        </span>
      </div>

      {/* Bottom Row: Big Bold Value & RM Label */}
      <div className="flex items-end justify-between w-full z-10">
        <span className="text-xs sm:text-sm font-black text-white font-['Fredoka']">
          RINGGIT MALAYSIA
        </span>
        <span className="text-lg sm:text-2xl font-black text-white font-['Fredoka'] leading-none">
          {value}
        </span>
      </div>
    </div>
  );
}

// MALAYSIAN MONEY DATA ITEMS
export const MONEY_ITEMS = {
  coin_5sen: { id: 'coin_5sen', type: 'coin', value: 5, label: '5 Sen', speech: 'Lima sen' },
  coin_10sen: { id: 'coin_10sen', type: 'coin', value: 10, label: '10 Sen', speech: 'Sepuluh sen' },
  coin_20sen: { id: 'coin_20sen', type: 'coin', value: 20, label: '20 Sen', speech: 'Dua puluh sen' },
  coin_50sen: { id: 'coin_50sen', type: 'coin', value: 50, label: '50 Sen', speech: 'Lima puluh sen' },
  note_rm1: { id: 'note_rm1', type: 'note', value: 1, label: 'RM 1', speech: 'Satu Ringgit' },
  note_rm5: { id: 'note_rm5', type: 'note', value: 5, label: 'RM 5', speech: 'Lima Ringgit' },
  note_rm10: { id: 'note_rm10', type: 'note', value: 10, label: 'RM 10', speech: 'Sepuluh Ringgit' },
};

// SHOP ITEMS FOR SET 3
export const SHOP_ITEMS = {
  pensel: { name: 'Pensel Comel', emoji: '✏️', price: '50 sen', priceText: '50 sen', answerId: 'coin_50sen' },
  pemadam: { name: 'Pemadam Getah', emoji: '🧼', price: '20 sen', priceText: '20 sen', answerId: 'coin_20sen' },
  aiskrim: { name: 'Ais Krim Sedap', emoji: '🍦', price: 'RM 1', priceText: 'Satu Ringgit', answerId: 'note_rm1' },
  buku: { name: 'Buku Cerita', emoji: '📚', price: 'RM 5', priceText: 'Lima Ringgit', answerId: 'note_rm5' },
  pembaris: { name: 'Pembaris Sekolah', emoji: '📏', price: '10 sen', priceText: '10 sen', answerId: 'coin_10sen' },
  warna: { name: 'Set Pensel Warna', emoji: '🎨', price: 'RM 10', priceText: 'Sepuluh Ringgit', answerId: 'note_rm10' },
};

// MONEY GAME DATA SETS
export const MONEY_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Kenal Duit Syiling & Wang Kertas',
    subtitle: 'Mata Wang Malaysia',
    instruction: 'Kenal pasti nilai duit syiling dan wang kertas Ringgit Malaysia!',
    questions: [
      {
        id: 'q1',
        mode: 'identify',
        questionText: 'Manakah duit syiling bernilai "20 Sen"?',
        spokenText: 'Manakah duit syiling bernilai dua puluh sen?',
        answerId: 'coin_20sen',
        answerName: '20 Sen',
        options: [
          MONEY_ITEMS.coin_5sen,
          MONEY_ITEMS.coin_20sen,
          MONEY_ITEMS.coin_50sen,
          MONEY_ITEMS.coin_10sen,
        ],
      },
      {
        id: 'q2',
        mode: 'identify',
        questionText: 'Manakah wang kertas berwarna biru bernilai "RM 1 (Satu Ringgit)"?',
        spokenText: 'Manakah wang kertas bernilai Satu Ringgit?',
        answerId: 'note_rm1',
        answerName: 'RM 1',
        options: [
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.note_rm10,
          MONEY_ITEMS.coin_50sen,
        ],
      },
      {
        id: 'q3',
        mode: 'identify',
        questionText: 'Manakah duit syiling bernilai "50 Sen"?',
        spokenText: 'Manakah duit syiling bernilai lima puluh sen?',
        answerId: 'coin_50sen',
        answerName: '50 Sen',
        options: [
          MONEY_ITEMS.coin_50sen,
          MONEY_ITEMS.coin_10sen,
          MONEY_ITEMS.coin_20sen,
          MONEY_ITEMS.coin_5sen,
        ],
      },
      {
        id: 'q4',
        mode: 'identify',
        questionText: 'Manakah wang kertas berwarna hijau bernilai "RM 5 (Lima Ringgit)"?',
        spokenText: 'Manakah wang kertas bernilai Lima Ringgit?',
        answerId: 'note_rm5',
        answerName: 'RM 5',
        options: [
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.note_rm10,
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.coin_20sen,
        ],
      },
      {
        id: 'q5',
        mode: 'identify',
        questionText: 'Manakah duit syiling bernilai "10 Sen"?',
        spokenText: 'Manakah duit syiling bernilai sepuluh sen?',
        answerId: 'coin_10sen',
        answerName: '10 Sen',
        options: [
          MONEY_ITEMS.coin_5sen,
          MONEY_ITEMS.coin_10sen,
          MONEY_ITEMS.coin_50sen,
          MONEY_ITEMS.coin_20sen,
        ],
      },
      {
        id: 'q6',
        mode: 'identify',
        questionText: 'Manakah wang kertas berwarna merah bernilai "RM 10 (Sepuluh Ringgit)"?',
        spokenText: 'Manakah wang kertas bernilai Sepuluh Ringgit?',
        answerId: 'note_rm10',
        answerName: 'RM 10',
        options: [
          MONEY_ITEMS.note_rm10,
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.coin_50sen,
        ],
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Kira Jumlah Wang Saku',
    subtitle: 'Hasil Tambah Nilai Wang',
    instruction: 'Kira jumlah duit di dalam dompet dan pilih nilai yang tepat!',
    questions: [
      {
        id: 'q1',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (20 sen + 20 sen + 10 sen)',
        spokenText: 'Dua puluh sen tambah dua puluh sen tambah sepuluh sen. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.coin_20sen, MONEY_ITEMS.coin_20sen, MONEY_ITEMS.coin_10sen],
        answerId: 'opt_50sen',
        answerName: '50 Sen',
        answerSpeech: 'Lima puluh sen',
        options: [
          { id: 'opt_40sen', label: '40 Sen', speech: 'Empat puluh sen', badgeColor: 'bg-amber-400' },
          { id: 'opt_50sen', label: '50 Sen', speech: 'Lima puluh sen', badgeColor: 'bg-emerald-500' },
          { id: 'opt_60sen', label: '60 Sen', speech: 'Enam puluh sen', badgeColor: 'bg-sky-500' },
          { id: 'opt_30sen', label: '30 Sen', speech: 'Tiga puluh sen', badgeColor: 'bg-rose-400' },
        ],
      },
      {
        id: 'q2',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (RM 1 + RM 1 + RM 1)',
        spokenText: 'Satu Ringgit tambah Satu Ringgit tambah Satu Ringgit. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.note_rm1, MONEY_ITEMS.note_rm1, MONEY_ITEMS.note_rm1],
        answerId: 'opt_rm3',
        answerName: 'RM 3',
        answerSpeech: 'Tiga Ringgit',
        options: [
          { id: 'opt_rm2', label: 'RM 2', speech: 'Dua Ringgit', badgeColor: 'bg-rose-400' },
          { id: 'opt_rm3', label: 'RM 3', speech: 'Tiga Ringgit', badgeColor: 'bg-emerald-500' },
          { id: 'opt_rm4', label: 'RM 4', speech: 'Empat Ringgit', badgeColor: 'bg-sky-500' },
          { id: 'opt_rm5', label: 'RM 5', speech: 'Lima Ringgit', badgeColor: 'bg-amber-400' },
        ],
      },
      {
        id: 'q3',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (50 sen + 20 sen)',
        spokenText: 'Lima puluh sen tambah dua puluh sen. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.coin_50sen, MONEY_ITEMS.coin_20sen],
        answerId: 'opt_70sen',
        answerName: '70 Sen',
        answerSpeech: 'Tujuh puluh sen',
        options: [
          { id: 'opt_60sen', label: '60 Sen', speech: 'Enam puluh sen', badgeColor: 'bg-amber-400' },
          { id: 'opt_70sen', label: '70 Sen', speech: 'Tujuh puluh sen', badgeColor: 'bg-emerald-500' },
          { id: 'opt_80sen', label: '80 Sen', speech: 'Lapan puluh sen', badgeColor: 'bg-sky-500' },
          { id: 'opt_50sen', label: '50 Sen', speech: 'Lima puluh sen', badgeColor: 'bg-rose-400' },
        ],
      },
      {
        id: 'q4',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (RM 5 + RM 1)',
        spokenText: 'Lima Ringgit tambah Satu Ringgit. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.note_rm5, MONEY_ITEMS.note_rm1],
        answerId: 'opt_rm6',
        answerName: 'RM 6',
        answerSpeech: 'Enam Ringgit',
        options: [
          { id: 'opt_rm5', label: 'RM 5', speech: 'Lima Ringgit', badgeColor: 'bg-amber-400' },
          { id: 'opt_rm6', label: 'RM 6', speech: 'Enam Ringgit', badgeColor: 'bg-emerald-500' },
          { id: 'opt_rm7', label: 'RM 7', speech: 'Tujuh Ringgit', badgeColor: 'bg-sky-500' },
          { id: 'opt_rm4', label: 'RM 4', speech: 'Empat Ringgit', badgeColor: 'bg-rose-400' },
        ],
      },
      {
        id: 'q5',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (RM 5 + RM 5)',
        spokenText: 'Lima Ringgit tambah Lima Ringgit. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.note_rm5, MONEY_ITEMS.note_rm5],
        answerId: 'opt_rm10',
        answerName: 'RM 10',
        answerSpeech: 'Sepuluh Ringgit',
        options: [
          { id: 'opt_rm8', label: 'RM 8', speech: 'Lapan Ringgit', badgeColor: 'bg-amber-400' },
          { id: 'opt_rm9', label: 'RM 9', speech: 'Sembilan Ringgit', badgeColor: 'bg-rose-400' },
          { id: 'opt_rm10', label: 'RM 10', speech: 'Sepuluh Ringgit', badgeColor: 'bg-emerald-500' },
          { id: 'opt_rm12', label: 'RM 12', speech: 'Dua belas Ringgit', badgeColor: 'bg-sky-500' },
        ],
      },
      {
        id: 'q6',
        mode: 'count_total',
        questionText: 'Berapakah jumlah wang ini? (50 sen + 50 sen)',
        spokenText: 'Lima puluh sen tambah lima puluh sen. Berapakah jumlahnya?',
        displayMoney: [MONEY_ITEMS.coin_50sen, MONEY_ITEMS.coin_50sen],
        answerId: 'opt_rm1',
        answerName: 'RM 1 (100 Sen)',
        answerSpeech: 'Satu Ringgit atau seratus sen',
        options: [
          { id: 'opt_80sen', label: '80 Sen', speech: 'Lapan puluh sen', badgeColor: 'bg-amber-400' },
          { id: 'opt_90sen', label: '90 Sen', speech: 'Sembilan puluh sen', badgeColor: 'bg-rose-400' },
          { id: 'opt_rm1', label: 'RM 1 (100 Sen)', speech: 'Satu Ringgit', badgeColor: 'bg-emerald-500' },
          { id: 'opt_70sen', label: '70 Sen', speech: 'Tujuh puluh sen', badgeColor: 'bg-sky-500' },
        ],
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Jom Beli di Kedai Sekolah!',
    subtitle: 'Simulasi Belanja & Bayaran',
    instruction: 'Pilih dan seret wang yang tepat untuk membayar harga barangan!',
    questions: [
      {
        id: 'q1',
        mode: 'shop',
        item: SHOP_ITEMS.pensel,
        questionText: 'Pensel ✏️ berharga 50 Sen. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Pensel comel berharga lima puluh sen. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'coin_50sen',
        answerName: '50 Sen',
        options: [
          MONEY_ITEMS.coin_50sen,
          MONEY_ITEMS.coin_10sen,
          MONEY_ITEMS.coin_5sen,
          MONEY_ITEMS.coin_20sen,
        ],
      },
      {
        id: 'q2',
        mode: 'shop',
        item: SHOP_ITEMS.pemadam,
        questionText: 'Pemadam 🧼 berharga 20 Sen. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Pemadam getah berharga dua puluh sen. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'coin_20sen',
        answerName: '20 Sen',
        options: [
          MONEY_ITEMS.coin_5sen,
          MONEY_ITEMS.coin_20sen,
          MONEY_ITEMS.coin_50sen,
          MONEY_ITEMS.coin_10sen,
        ],
      },
      {
        id: 'q3',
        mode: 'shop',
        item: SHOP_ITEMS.aiskrim,
        questionText: 'Ais Krim 🍦 berharga RM 1. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Ais krim sedap berharga Satu Ringgit. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'note_rm1',
        answerName: 'RM 1',
        options: [
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.coin_10sen,
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.coin_50sen,
        ],
      },
      {
        id: 'q4',
        mode: 'shop',
        item: SHOP_ITEMS.buku,
        questionText: 'Buku Cerita 📚 berharga RM 5. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Buku cerita berharga Lima Ringgit. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'note_rm5',
        answerName: 'RM 5',
        options: [
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.note_rm10,
          MONEY_ITEMS.coin_50sen,
        ],
      },
      {
        id: 'q5',
        mode: 'shop',
        item: SHOP_ITEMS.pembaris,
        questionText: 'Pembaris 📏 berharga 10 Sen. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Pembaris sekolah berharga sepuluh sen. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'coin_10sen',
        answerName: '10 Sen',
        options: [
          MONEY_ITEMS.coin_5sen,
          MONEY_ITEMS.coin_10sen,
          MONEY_ITEMS.coin_20sen,
          MONEY_ITEMS.coin_50sen,
        ],
      },
      {
        id: 'q6',
        mode: 'shop',
        item: SHOP_ITEMS.warna,
        questionText: 'Set Pensel Warna 🎨 berharga RM 10. Pilih wang yang secukupnya untuk bayar:',
        spokenText: 'Set pensel warna berharga Sepuluh Ringgit. Pilih wang yang secukupnya untuk bayar.',
        answerId: 'note_rm10',
        answerName: 'RM 10',
        options: [
          MONEY_ITEMS.note_rm5,
          MONEY_ITEMS.note_rm10,
          MONEY_ITEMS.note_rm1,
          MONEY_ITEMS.coin_50sen,
        ],
      },
    ],
  },
];

export default function NumeracyMoneyGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = MONEY_SETS[currentSetIndex] || MONEY_SETS[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQ = currentSet.questions[questionIndex] || currentSet.questions[0];

  // Persistent answered state per question: { 'set1-q1': { placedAnswer: item, isCorrect: true } }
  const [savedAnswers, setSavedAnswers] = useState({});
  // Completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState({});

  // Active placed answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Status: 'idle', 'correct', 'wrong'
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  // Shake / wrong choice trigger
  const [wrongChoice, setWrongChoice] = useState(null);
  // Drag state
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Victory celebration modal
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const qKey = `${currentSet.id}-${currentQ.id}`;

  // Sync state when question or set changes
  useEffect(() => {
    const saved = savedAnswers[qKey];
    if (saved) {
      setSelectedAnswer(saved.placedAnswer);
      setFeedbackStatus(saved.isCorrect ? 'correct' : 'idle');
    } else {
      setSelectedAnswer(null);
      setFeedbackStatus('idle');
    }
    setWrongChoice(null);
    setIsDragOver(false);
  }, [questionIndex, currentSetIndex, qKey, savedAnswers]);

  // Handle selecting / placing a money item or text option
  const handleSelectOption = (opt) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    setSelectedAnswer(opt);

    const isCorrect = opt.id === currentQ.answerId;
    const spokenFeedback = isCorrect
      ? `Tahniah! Jawapannya ialah ${currentQ.answerName}!`
      : `Cuba lagi! Itu bukan ${currentQ.answerName}.`;

    if (isCorrect) {
      // Correct!
      playMatchSuccessSound();
      setFeedbackStatus('correct');
      setWrongChoice(null);

      speakMalayText(spokenFeedback);

      const newSaved = {
        ...savedAnswers,
        [qKey]: { placedAnswer: opt, isCorrect: true },
      };
      setSavedAnswers(newSaved);

      const newCompleted = {
        ...completedQuestions,
        [qKey]: true,
      };
      setCompletedQuestions(newCompleted);

      // Check if all questions in this set are completed
      const totalInSet = currentSet.questions.length;
      const completedCount = currentSet.questions.filter((q) => newCompleted[`${currentSet.id}-${q.id}`]).length;

      if (completedCount === totalInSet && !hasCelebrated) {
        setTimeout(() => {
          setShowCelebration(true);
          setHasCelebrated(true);
          playVictorySound();

          confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F59E0B', '#10B981', '#38BDF8', '#F43F5E', '#A855F7'],
          });
        }, 800);
      }
    } else {
      // Wrong
      playOopsSound();
      setFeedbackStatus('wrong');
      setWrongChoice(opt.id);
      speakMalayText(spokenFeedback);

      setTimeout(() => {
        setWrongChoice(null);
        if (!savedAnswers[qKey]?.isCorrect) {
          setSelectedAnswer(null);
          setFeedbackStatus('idle');
        }
      }, 1000);
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (e, opt) => {
    if (feedbackStatus === 'correct') return;
    setDraggedItem(opt);
    e.dataTransfer.setData('text/plain', JSON.stringify(opt));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedItem) {
      handleSelectOption(draggedItem);
      setDraggedItem(null);
    }
  };

  // Speak question instruction
  const handleSpeakQuestion = () => {
    playWhooshSound();
    speakMalayText(currentQ.spokenText || currentQ.questionText);
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    playPopSound();
    if (questionIndex < currentSet.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    playPopSound();
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
    setQuestionIndex(0);
    setHasCelebrated(false);
    setShowCelebration(false);
  };

  const handleResetCurrentSet = () => {
    playPopSound();
    const newSaved = { ...savedAnswers };
    const newCompleted = { ...completedQuestions };

    currentSet.questions.forEach((q) => {
      delete newSaved[`${currentSet.id}-${q.id}`];
      delete newCompleted[`${currentSet.id}-${q.id}`];
    });

    setSavedAnswers(newSaved);
    setCompletedQuestions(newCompleted);
    setSelectedAnswer(null);
    setFeedbackStatus('idle');
    setHasCelebrated(false);
    setShowCelebration(false);
  };

  const totalAnsweredInSet = useMemo(() => {
    return currentSet.questions.filter((q) => completedQuestions[`${currentSet.id}-${q.id}`]).length;
  }, [currentSet, completedQuestions]);

  const isCurrentQuestionAnswered = !!completedQuestions[qKey];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-teal-400 via-emerald-100 to-amber-100 font-['Nunito',sans-serif]">
      {/* Background Decorative Coins and Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-6 left-6 animate-float" style={{ animationDuration: '4s' }}>
          <Coins className="w-16 h-16 text-amber-500" />
        </div>
        <div className="absolute top-12 right-10 animate-float" style={{ animationDuration: '5s' }}>
          <Wallet className="w-16 h-16 text-emerald-600" />
        </div>
        <div className="absolute bottom-16 left-12 animate-float" style={{ animationDuration: '4.5s' }}>
          <ShoppingBag className="w-16 h-16 text-teal-600" />
        </div>
      </div>

      {/* --- TOP HEADER & BAR --- */}
      <header className="relative z-20 w-full bg-slate-900/80 backdrop-blur-md px-3 py-2 sm:px-4 border-b border-teal-400/40 text-white flex items-center justify-between shadow-md">
        {/* Left: Back to Menu & Game Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer active:scale-95"
            title="Kembali ke Menu Utama"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-teal-400 font-['Fredoka']">
                🔢 7. Wang Saku
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 hidden xs:inline">
              {currentSet.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Set Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          {MONEY_SETS.map((s, idx) => {
            const isSetCompleted = s.questions.every((q) => completedQuestions[`${s.id}-${q.id}`]);
            return (
              <button
                key={s.id}
                onClick={() => handleSwitchSet(idx)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer font-['Fredoka'] ${
                  currentSetIndex === idx
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span>Set {idx + 1}</span>
                {isSetCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            );
          })}
        </div>

        {/* Right: Reset, Settings & Progress Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetCurrentSet}
            title="Ulang Set Ini"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
          <div className="hidden sm:flex items-center gap-1 bg-teal-950/80 border border-teal-400/40 px-2.5 py-1 rounded-lg text-xs font-bold text-teal-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {totalAnsweredInSet}/{currentSet.questions.length}
            </span>
          </div>
        </div>
      </header>

      {/* --- QUESTION PROGRESS BAR / PILLS --- */}
      <div className="relative z-10 w-full px-3 py-1.5 bg-teal-500/15 backdrop-blur-xs flex items-center justify-between border-b border-teal-300/30">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="p-1 rounded-lg text-teal-900 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {currentSet.questions.map((q, idx) => {
              const qDone = completedQuestions[`${currentSet.id}-${q.id}`];
              const isCurrent = idx === questionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playPopSound();
                    setQuestionIndex(idx);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs transition-all flex items-center justify-center cursor-pointer font-['Fredoka'] ${
                    isCurrent
                      ? 'bg-teal-600 text-white scale-110 shadow-md ring-2 ring-teal-300'
                      : qDone
                      ? 'bg-teal-400 text-teal-950 shadow-sm'
                      : 'bg-white/80 text-teal-900 hover:bg-white'
                  }`}
                >
                  {qDone ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={questionIndex === currentSet.questions.length - 1}
            className="p-1 rounded-lg text-teal-900 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* --- MAIN GAME ARENA --- */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* QUESTION CARD */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl border-3 border-teal-300/80 flex flex-col items-center relative transition-all duration-300">
          {/* Audio Speaker & Question Header */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 border-b border-teal-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakQuestion}
                className="p-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 active:scale-95 shadow-md transition cursor-pointer flex items-center gap-1.5"
                title="Dengar Arahan Suara"
              >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs font-bold font-['Fredoka'] hidden xs:inline">Dengar</span>
              </button>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 font-['Fredoka'] leading-tight">
                {currentQ.questionText}
              </h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-['Fredoka'] flex-shrink-0">
              Soalan {questionIndex + 1}/{currentSet.questions.length}
            </span>
          </div>

          {/* QUESTION CONTENT DISPLAY AREA */}
          <div className="w-full min-h-[140px] sm:min-h-[180px] bg-gradient-to-br from-teal-50/80 to-emerald-50/80 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center border-2 border-dashed border-teal-300 relative overflow-hidden">
            {/* 1. IDENTIFY MODE (TARGET SLOT TO PLACE MONEY) */}
            {currentQ.mode === 'identify' && (
              <div className="flex flex-col items-center justify-center my-2">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-28 h-24 sm:w-36 sm:h-28 md:w-44 md:h-32 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-teal-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop p-1">
                      <MoneyRenderer item={selectedAnswer} size={orientation === 'portrait' ? 'sm' : 'md'} />
                      <span className="text-xs font-black text-slate-800 mt-1 font-['Fredoka']">
                        {selectedAnswer.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-teal-500">
                      <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[10px] sm:text-xs font-bold text-teal-700 font-['Fredoka']">
                        Letak Duit Sini
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. COUNT TOTAL MODE (DISPLAY COINS/NOTES IN WALLET + TARGET VALUE SLOT) */}
            {currentQ.mode === 'count_total' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-2 w-full">
                {/* Visual Wallet Display */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl bg-amber-100/80 border-2 border-amber-300 shadow-sm max-w-xs sm:max-w-sm">
                  {currentQ.displayMoney.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      onClick={() => {
                        playPopSound();
                        speakMalayText(m.speech);
                      }}
                      className="cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                      title={m.speech}
                    >
                      <MoneyRenderer item={m} size={orientation === 'portrait' ? 'sm' : 'md'} />
                    </div>
                  ))}
                </div>

                <span className="text-2xl sm:text-3xl font-black text-teal-600">➔</span>

                {/* Target Total Slot */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-28 h-24 sm:w-36 sm:h-28 md:w-44 md:h-32 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-teal-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop p-2">
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-sm sm:text-base font-['Fredoka'] shadow">
                        {selectedAnswer.label}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-teal-500">
                      <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[10px] sm:text-xs font-bold text-teal-700 font-['Fredoka'] text-center">
                        Pilih Jumlah
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SHOP MODE (ITEM TO BUY + WALLET TARGET SLOT) */}
            {currentQ.mode === 'shop' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-2">
                {/* Shop Item Card */}
                <div
                  onClick={() => {
                    playPopSound();
                    speakMalayText(`${currentQ.item.name}, harga ${currentQ.item.priceText}`);
                  }}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white shadow-md border-2 border-amber-300 hover:scale-105 transition cursor-pointer"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl animate-float">
                    {currentQ.item.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-800 mt-1 font-['Fredoka']">
                    {currentQ.item.name}
                  </span>
                  <span className="text-xs font-black text-white bg-rose-500 px-2.5 py-0.5 rounded-full mt-1 font-['Fredoka']">
                    Harga: {currentQ.item.price}
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl font-black text-teal-600">➔</span>

                {/* Target Payment Slot */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-28 h-24 sm:w-36 sm:h-28 md:w-44 md:h-32 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-teal-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop p-1">
                      <MoneyRenderer item={selectedAnswer} size={orientation === 'portrait' ? 'sm' : 'md'} />
                      <span className="text-xs font-black text-slate-800 mt-1 font-['Fredoka']">
                        {selectedAnswer.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-teal-500">
                      <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[10px] sm:text-xs font-bold text-teal-700 font-['Fredoka']">
                        Bayar Sini
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Positive Success Banner */}
            {feedbackStatus === 'correct' && (
              <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full font-bold text-xs sm:text-sm font-['Fredoka'] shadow animate-bounce">
                <Sparkles className="w-4 h-4" />
                <span>Tahniah! Bayaran / Jawapan Tepat!</span>
              </div>
            )}
          </div>

          {/* ANSWER CHOICES BANK (TAP OR DRAG & DROP FOR ALL MODES) */}
          <div className="w-full mt-3 sm:mt-4">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
                Pilih atau Seret Jawapan:
              </span>
              <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full font-bold">
                Boleh Tekan / Tarik (Drag)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer?.id === opt.id;
                const isCorrectOpt = isCurrentQuestionAnswered && opt.id === currentQ.answerId;
                const isWrongOpt = wrongChoice === opt.id;

                return (
                  <button
                    key={oIdx}
                    draggable={feedbackStatus !== 'correct'}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none
                      border-3 active:scale-95
                      ${
                        isCorrectOpt
                          ? 'bg-emerald-100 border-emerald-500 shadow-md scale-102 ring-2 ring-emerald-300'
                          : isWrongOpt
                          ? 'bg-rose-100 border-rose-500 animate-shake shadow-md'
                          : isSelected
                          ? 'bg-sky-100 border-sky-400 shadow-sm'
                          : 'bg-white hover:bg-teal-50/70 border-slate-200 hover:border-teal-300 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    {/* If item has money renderer type (coin / note), render MoneyRenderer */}
                    {opt.type ? (
                      <MoneyRenderer item={opt} size={orientation === 'portrait' ? 'sm' : 'md'} />
                    ) : (
                      /* If amount badge option (Set 2) */
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-inner border border-amber-600">
                        <span className="text-sm sm:text-base font-black text-amber-950 font-['Fredoka']">
                          {opt.label}
                        </span>
                      </div>
                    )}
                    <span className="text-xs sm:text-sm font-black text-slate-800 mt-1 font-['Fredoka']">
                      {opt.label}
                    </span>
                    {isCorrectOpt && (
                      <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER CONTROLS --- */}
      <footer className="relative z-10 w-full px-3 py-2 bg-white/80 backdrop-blur-md border-t border-teal-200 flex items-center justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={questionIndex === 0}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka']"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelum</span>
        </button>

        <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
          Kemajuan Set: {totalAnsweredInSet}/{currentSet.questions.length} Selesai
        </span>

        <button
          onClick={handleNextQuestion}
          disabled={questionIndex === currentSet.questions.length - 1}
          className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka'] shadow-sm"
        >
          <span>Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* --- VICTORY CELEBRATION MODAL --- */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-teal-50 via-emerald-50 to-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-teal-300 text-center flex flex-col items-center animate-scaleUp">
            {/* Golden Star Banner */}
            <div className="mb-2">
              <ThreeGoldenStarsCluster className="w-24 sm:w-28 object-contain" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-teal-700 font-['Fredoka'] mb-1">
              Tahniah! Hebat Sekali! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Anda telah berjaya menyelesaikan semua soalan dalam <span className="font-bold text-teal-800">{currentSet.title}</span>!
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              {/* LIHAT JAWAPAN BUTTON */}
              <button
                onClick={() => {
                  playPopSound();
                  setShowCelebration(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Lihat Jawapan</span>
              </button>

              {/* NEXT SET BUTTON (if available) */}
              {currentSetIndex < MONEY_SETS.length - 1 && (
                <button
                  onClick={() => {
                    handleSwitchSet(currentSetIndex + 1);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Set Seterusnya ➔</span>
                </button>
              )}

              {/* RESTART SET */}
              <button
                onClick={handleResetCurrentSet}
                className="w-full py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs sm:text-sm font-['Fredoka'] transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Semula Set Ini</span>
              </button>

              {/* BACK TO MENU */}
              <button
                onClick={onBackToMenu}
                className="w-full py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
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
