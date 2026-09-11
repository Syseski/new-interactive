import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Vector Illustrations for the 4 Question Images (Gitar, Tuala, Rusa, Daun)
function QuizObjectIllustration({ type, className = "w-full h-full" }) {
  switch (type) {
    case 'gitar':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Acoustic Guitar / Ukulele */}
          <g transform="translate(10, 8) rotate(-15 40 40)">
            {/* Guitar Body */}
            <path
              d="M36 50 C24 50 18 64 24 76 C30 88 56 88 62 76 C66 68 58 60 52 56 C56 50 54 40 48 36 C42 32 38 40 36 50 Z"
              fill="#F97316"
              stroke="#9A3412"
              strokeWidth="2.5"
            />
            {/* Front Soundboard Inner Accent */}
            <path
              d="M38 54 C28 54 24 64 28 74 C34 84 52 84 58 74 C60 68 54 62 48 58 C52 52 50 44 46 40 C42 38 40 44 38 54 Z"
              fill="#FB923C"
            />
            {/* Sound Hole */}
            <circle cx="43" cy="62" r="7" fill="#451A03" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="43" cy="62" r="9" stroke="#FDE047" strokeWidth="1" fill="none" />
            {/* Bridge */}
            <rect x="35" y="76" width="16" height="4" rx="1.5" fill="#78350F" />
            {/* Neck & Fretboard */}
            <rect x="39" y="16" width="8" height="24" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            {/* Frets */}
            <line x1="39" y1="22" x2="47" y2="22" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="39" y1="28" x2="47" y2="28" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="39" y1="34" x2="47" y2="34" stroke="#CBD5E1" strokeWidth="1" />
            {/* Headstock */}
            <polygon points="37,6 49,6 48,16 38,16" fill="#F97316" stroke="#9A3412" strokeWidth="1.5" />
            {/* Tuning Pegs */}
            <circle cx="35" cy="9" r="2" fill="#E2E8F0" />
            <circle cx="35" cy="13" r="2" fill="#E2E8F0" />
            <circle cx="51" cy="9" r="2" fill="#E2E8F0" />
            <circle cx="51" cy="13" r="2" fill="#E2E8F0" />
            {/* Strings */}
            <line x1="41" y1="8" x2="41" y2="76" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
            <line x1="43" y1="8" x2="43" y2="76" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
            <line x1="45" y1="8" x2="45" y2="76" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
          </g>
        </svg>
      );

    case 'tuala':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Towel Hanging on Wall Rack */}
          <rect x="14" y="24" width="72" height="6" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="14" cy="27" r="4.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />
          <circle cx="86" cy="27" r="4.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />

          {/* Hanging Towel Body */}
          <path
            d="M24 28 L76 28 L74 84 C74 86 70 88 66 88 L34 88 C30 88 26 86 26 84 Z"
            fill="#BAE6FD"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          {/* Towel Fold Highlight */}
          <path d="M26 28 L50 28 L48 88 L26 88 Z" fill="#E0F2FE" />
          {/* Decorative Towel Border Stripes */}
          <line x1="28" y1="72" x2="72" y2="72" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="28" y1="78" x2="72" y2="78" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="28" y1="82" x2="72" y2="82" stroke="#38BDF8" strokeWidth="2.5" />
        </svg>
      );

    case 'rusa':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Cute Deer (Rusa) */}
          <g transform="translate(15, 10)">
            {/* Antlers */}
            <path d="M26 22 C22 14 18 10 12 8 M16 12 C18 6 22 4 24 2 M20 10 C26 8 28 4 30 0" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 22 C38 14 42 10 48 8 M44 12 C42 6 38 4 36 2 M40 10 C34 8 32 4 30 0" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />

            {/* Deer Body */}
            <ellipse cx="44" cy="54" rx="22" ry="14" fill="#D97706" />
            <ellipse cx="46" cy="52" rx="18" ry="10" fill="#F59E0B" />
            {/* White Spots on Deer Back */}
            <circle cx="40" cy="50" r="1.8" fill="#FEF3C7" />
            <circle cx="46" cy="48" r="2" fill="#FEF3C7" />
            <circle cx="52" cy="51" r="1.8" fill="#FEF3C7" />
            <circle cx="48" cy="55" r="1.5" fill="#FEF3C7" />

            {/* Deer Legs */}
            <line x1="30" y1="62" x2="28" y2="84" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="36" y1="64" x2="35" y2="83" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="62" x2="56" y2="84" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="64" x2="63" y2="83" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
            {/* Hooves */}
            <rect x="25" y="82" width="6" height="3" rx="1" fill="#451A03" />
            <rect x="54" y="82" width="6" height="3" rx="1" fill="#451A03" />

            {/* Neck & Head */}
            <path d="M26 50 L20 30 L32 26 L36 46 Z" fill="#D97706" />
            <ellipse cx="22" cy="24" rx="10" ry="8" fill="#F59E0B" />
            {/* Snout */}
            <ellipse cx="14" cy="26" rx="6" ry="5" fill="#FEF3C7" />
            <circle cx="10" cy="25" r="2.5" fill="#451A03" />
            {/* Eye */}
            <circle cx="20" cy="22" r="2.5" fill="#1E293B" />
            <circle cx="19" cy="21" r="0.8" fill="#FFFFFF" />
            {/* Ear */}
            <ellipse cx="30" cy="18" rx="6" ry="3" fill="#D97706" transform="rotate(-30 30 18)" />
            <ellipse cx="30" cy="18" rx="4" ry="1.8" fill="#FED7AA" transform="rotate(-30 30 18)" />
            {/* Fluffy Tail */}
            <ellipse cx="66" cy="48" rx="5" ry="4" fill="#FEF3C7" />
          </g>
        </svg>
      );

    case 'daun':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Green Leaves Pair */}
          <g transform="translate(12, 10)">
            {/* Main Big Green Leaf */}
            <path
              d="M48 76 C48 76 72 58 72 24 C54 24 28 44 28 64 C28 72 38 76 48 76 Z"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="2.5"
            />
            {/* Leaf Veins */}
            <path d="M34 68 Q50 48 68 28" stroke="#86EFAC" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M44 56 Q54 50 62 48" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M38 62 Q46 58 54 58" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Smaller Left Leaf */}
            <path
              d="M34 76 C34 76 12 60 14 34 C30 34 44 50 42 68 C40 74 34 76 34 76 Z"
              fill="#16A34A"
              stroke="#14532D"
              strokeWidth="2"
            />
            <path d="M22 66 Q26 50 18 38" stroke="#BBF7D0" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Stem */}
            <path d="M42 74 Q44 86 46 88" stroke="#14532D" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}

// Full Countryside / Nature Landscape Background
function LandscapeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Blue Sky Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] to-[#BAE6FD]" />

      {/* Scalable SVG Landscape Art */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Layer 1: Stylized Fluffy Clouds */}
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="80" cy="160" r="55" />
          <circle cx="130" cy="140" r="70" />
          <circle cx="180" cy="170" r="60" />
          <circle cx="40" cy="190" r="45" />

          <circle cx="490" cy="220" r="65" />
          <circle cx="550" cy="190" r="75" />
          <circle cx="600" cy="230" r="60" />
          <circle cx="440" cy="240" r="50" />
        </g>

        {/* Cloud Shade Accents */}
        <g fill="#E0F2FE" opacity="0.6">
          <path d="M20 200 Q80 230 180 200 L180 240 L20 240 Z" />
          <path d="M430 250 Q510 280 600 240 L600 280 L430 280 Z" />
        </g>

        {/* Layer 2: Distant Teal & Green Hills */}
        <path d="M0 450 Q160 390 320 440 T600 420 L600 900 L0 900 Z" fill="#6EE7B7" opacity="0.75" />
        <path d="M0 490 Q220 430 420 480 T600 450 L600 900 L0 900 Z" fill="#34D399" opacity="0.85" />

        {/* Layer 3: Rolling Green Hills */}
        <path d="M0 540 Q180 490 360 530 T600 510 L600 900 L0 900 Z" fill="#22C55E" />
        <path d="M0 580 Q250 540 450 580 T600 560 L600 900 L0 900 Z" fill="#16A34A" />

        {/* Lush Foliage / Trees on Left & Right */}
        {/* Left Trees */}
        <circle cx="-15" cy="560" r="75" fill="#15803D" />
        <circle cx="30" cy="530" r="65" fill="#16A34A" />
        <circle cx="75" cy="565" r="55" fill="#22C55E" />

        {/* Right Trees */}
        <circle cx="615" cy="560" r="75" fill="#15803D" />
        <circle cx="570" cy="530" r="65" fill="#16A34A" />
        <circle cx="525" cy="565" r="55" fill="#22C55E" />

        {/* Layer 4: Center Winding Sandy/Dirt Countryside Path */}
        <path
          d="M320 530 C340 590 430 630 400 710 C365 790 270 820 160 900 L450 900 C490 840 510 780 480 700 C445 630 375 590 350 530 Z"
          fill="#C2410C"
          opacity="0.3"
        />
        <path
          d="M325 530 C345 590 425 630 395 710 C360 790 265 820 170 900 L440 900 C480 840 500 780 470 700 C435 630 370 590 345 530 Z"
          fill="#D97706"
          opacity="0.85"
        />
        <path
          d="M330 530 C350 590 420 630 390 710 C355 790 260 820 180 900 L430 900 C470 840 490 780 460 700 C425 630 365 590 340 530 Z"
          fill="#F59E0B"
          opacity="0.9"
        />
        <path
          d="M335 535 C355 595 415 635 385 715 C350 795 255 825 190 900 L420 900 C460 840 480 780 450 705 C415 635 360 595 335 535 Z"
          fill="#FBBF24"
          opacity="0.95"
        />

        {/* Wooden Farm Fences at Bottom Left & Right */}
        {/* Left Fence */}
        <g transform="translate(10, 780)">
          {/* Wooden Rails */}
          <line x1="0" y1="35" x2="80" y2="35" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <line x1="0" y1="75" x2="80" y2="75" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          {/* Posts */}
          <rect x="15" y="10" width="10" height="90" rx="3" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <rect x="65" y="10" width="10" height="90" rx="3" fill="#92400E" stroke="#451A03" strokeWidth="2" />
        </g>

        {/* Right Fence */}
        <g transform="translate(510, 780)">
          {/* Wooden Rails */}
          <line x1="0" y1="35" x2="80" y2="35" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <line x1="0" y1="75" x2="80" y2="75" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          {/* Posts */}
          <rect x="15" y="10" width="10" height="90" rx="3" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <rect x="65" y="10" width="10" height="90" rx="3" fill="#92400E" stroke="#451A03" strokeWidth="2" />
        </g>

        {/* Small Wildflowers on grassy edges */}
        <circle cx="130" cy="850" r="7" fill="#F43F5E" /><circle cx="130" cy="850" r="2.5" fill="#FEF08A" />
        <circle cx="155" cy="875" r="8" fill="#38BDF8" /><circle cx="155" cy="875" r="3" fill="#FEF08A" />
        <circle cx="455" cy="850" r="7" fill="#EC4899" /><circle cx="455" cy="850" r="2.5" fill="#FEF08A" />
        <circle cx="480" cy="870" r="8" fill="#A855F7" /><circle cx="480" cy="870" r="3" fill="#FEF08A" />
      </svg>
    </div>
  );
}

// 4 Questions Data matching reference screenshot
const QUIZ_DATA = [
  {
    id: 1,
    number: 1,
    type: 'gitar',
    imageSrc: getAssetUrl('/images/choose-correct/1.png'),
    options: ['Gitar', 'Piano'],
    answer: 'Gitar',
  },
  {
    id: 2,
    number: 2,
    type: 'tuala',
    imageSrc: getAssetUrl('/images/choose-correct/2.png'),
    options: ['Tuala', 'Kuaci'],
    answer: 'Tuala',
  },
  {
    id: 3,
    number: 3,
    type: 'rusa',
    imageSrc: getAssetUrl('/images/choose-correct/3.png'),
    options: ['Rusa', 'Kuda'],
    answer: 'Rusa',
  },
  {
    id: 4,
    number: 4,
    type: 'daun',
    imageSrc: getAssetUrl('/images/choose-correct/4.png'),
    options: ['Daun', 'Daging'],
    answer: 'Daun',
  },
];

// Single Quiz Row Component
function QuizRow({ item, selectedAnswer, onSelectAnswer }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isCorrect = selectedAnswer && selectedAnswer.toLowerCase() === item.answer.toLowerCase();

  return (
    <div className="w-full flex items-center justify-between gap-3 sm:gap-6 p-1">
      {/* Left: Picture Card Box (White rounded with thick border) */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 flex items-center justify-center border-3 sm:border-4 border-slate-900 shadow-lg flex-shrink-0 overflow-hidden">
        {!imgFailed && item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.answer}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain transition-transform hover:scale-105 drop-shadow-xs"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <QuizObjectIllustration type={item.type} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain" />
          </div>
        )}
      </div>

      {/* Right: 2 Choice Buttons (Dua Pilihan Jawapan) */}
      <div className="flex-1 grid grid-cols-2 gap-2.5 sm:gap-4">
        {item.options.map((option) => {
          const isThisSelected = selectedAnswer === option;
          const isThisCorrect = isThisSelected && isCorrect;
          const isThisWrong = isThisSelected && !isCorrect;

          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(item.id, option)}
              className={`
                h-14 sm:h-18 md:h-22 rounded-xl sm:rounded-2xl font-black text-base sm:text-2xl md:text-3xl font-['Fredoka']
                border-3 sm:border-4 transition-all duration-150 shadow-lg flex items-center justify-center gap-2 cursor-pointer
                ${
                  isThisCorrect
                    ? 'bg-emerald-400 text-slate-900 border-emerald-700 scale-[1.03] shadow-emerald-400/50 ring-4 ring-emerald-300 animate-pop'
                    : isThisWrong
                    ? 'bg-rose-100 text-rose-800 border-rose-600 animate-shake ring-2 ring-rose-300'
                    : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] text-slate-900 border-slate-900 hover:scale-[1.02] active:scale-95'
                }
              `}
            >
              <span>{option}</span>
              {isThisCorrect && (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-900 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper to shuffle an array
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ChooseCorrectGame({ orientation, onBackToMenu, onOpenSettings }) {
  // Shuffled questions with randomized option choices (left / right)
  const [quizQuestions, setQuizQuestions] = useState(() =>
    QUIZ_DATA.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );
  // Map of questionId -> selectedAnswer
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // Track wrong clicks for shake animation
  const [wrongSelection, setWrongSelection] = useState(null);
  // Show celebration modal
  const [showCelebration, setShowCelebration] = useState(false);
  // Track if celebration has already triggered for this run
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Initialize and randomize options
  useEffect(() => {
    setSelectedAnswers({});
    setWrongSelection(null);
    setShowCelebration(false);
    setHasCelebrated(false);
    setQuizQuestions(
      QUIZ_DATA.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
  }, []);

  // Check completion
  useEffect(() => {
    const totalQuestions = QUIZ_DATA.length;
    let correctCount = 0;

    QUIZ_DATA.forEach((q) => {
      if (selectedAnswers[q.id] && selectedAnswers[q.id].toLowerCase() === q.answer.toLowerCase()) {
        correctCount++;
      }
    });

    if (totalQuestions > 0 && correctCount === totalQuestions && !hasCelebrated) {
      setHasCelebrated(true);
      setShowCelebration(true);
      playVictorySound();
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
      });
    }
  }, [selectedAnswers, hasCelebrated]);

  // Handle user selecting an option
  const handleSelectAnswer = (questionId, option) => {
    const question = QUIZ_DATA.find((q) => q.id === questionId);
    if (!question) return;

    if (question.answer.toLowerCase() === option.toLowerCase()) {
      // Correct!
      playMatchSuccessSound();
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: option,
      }));
      setWrongSelection(null);
    } else {
      // Wrong!
      playOopsSound();
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: option,
      }));
      setWrongSelection({ questionId, option });
      // Reset wrong selection after brief animation
      setTimeout(() => {
        setSelectedAnswers((prev) => {
          const updated = { ...prev };
          delete updated[questionId];
          return updated;
        });
        setWrongSelection(null);
      }, 700);
    }
  };

  const handleReset = () => {
    playPopSound();
    setSelectedAnswers({});
    setWrongSelection(null);
    setShowCelebration(false);
    setHasCelebrated(false);
    setQuizQuestions(
      QUIZ_DATA.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
  };

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between p-2 sm:p-4 select-none overflow-y-auto font-['Nunito'] bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] to-[#86EFAC]">
      {/* Gorgeous Countryside Landscape Background matching user reference image */}
      <LandscapeBackground />

      {/* Top Header: Kembali ke Menu & Tetapan */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        {/* Back Button (Green Pill) */}
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Title Badge */}
        <div className="flex items-center gap-1.5 bg-white/95 px-4 py-1 rounded-full shadow-sm border-2 border-amber-300">
          <span className="text-xs sm:text-sm font-black text-amber-900 font-['Fredoka']">
            Pilih Jawapan Betul
          </span>
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

      {/* Instruction Banner with Teacher Mascot (Matching Reference Image) */}
      <div className="w-full max-w-3xl flex items-center gap-2 z-20 mb-2 px-1">
        <div className="flex-1 flex items-center gap-3 bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 px-3.5 py-2 rounded-2xl shadow-md border-2 border-amber-400">
          {/* Teacher at blackboard mascot */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
              {/* Blackboard */}
              <rect x="10" y="10" width="80" height="50" rx="4" fill="#065F46" stroke="#78350F" strokeWidth="3" />
              <line x1="20" y1="25" x2="45" y2="25" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="20" y1="35" x2="40" y2="35" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
              {/* Teacher Figure */}
              <g transform="translate(45, 18)">
                <ellipse cx="25" cy="18" rx="8" ry="9" fill="#FED7AA" />
                <circle cx="25" cy="15" r="9" fill="#1E293B" />
                <ellipse cx="25" cy="18" rx="7" ry="6" fill="#FED7AA" />
                {/* Suit */}
                <path d="M15 30 L35 30 L40 60 L10 60 Z" fill="#475569" />
                {/* Arm pointing to board */}
                <path d="M18 34 L-5 20" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
                <circle cx="-5" cy="20" r="2.5" fill="#FED7AA" />
                {/* Legs */}
                <line x1="18" y1="60" x2="18" y2="80" stroke="#334155" strokeWidth="4" />
                <line x1="32" y1="60" x2="32" y2="80" stroke="#334155" strokeWidth="4" />
              </g>
            </svg>
          </div>

          <p className="text-xs sm:text-sm md:text-base font-extrabold text-amber-950 font-['Fredoka'] tracking-wide">
            Pilih jawapan yang betul berdasarkan gambar
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER: 4 QUIZ ROWS */}
      <div className="w-full max-w-3xl flex flex-col gap-3 my-1 z-10">
        {quizQuestions.map((item) => (
          <QuizRow
            key={item.id}
            item={item}
            selectedAnswer={selectedAnswers[item.id]}
            onSelectAnswer={handleSelectAnswer}
            isWrongSelection={wrongSelection && wrongSelection.questionId === item.id}
          />
        ))}
      </div>

      {/* VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Shining Golden Star Reward Graphic */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Rating */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              Anda berjaya memilih kesemua jawapan yang betul berdasarkan gambar!
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
                onClick={handleReset}
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
