import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Volume2,
  Trophy,
  HelpCircle,
  Zap,
  Star,
  RefreshCw,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  speakMalayText,
} from '../utils/soundEffects';
import { ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Data Sifir & Soalan Darab
const SIFIR_SETS = [
  {
    id: 'set_2_4_6',
    title: 'Sifir 2, 4, 6',
    subtitle: 'Asas Darab',
    tables: [
      {
        sifirNumber: 2,
        title: 'Sifir 2',
        theme: 'emerald',
        badgeColor: 'bg-emerald-500',
        borderColor: 'border-emerald-300',
        bgColor: 'from-emerald-50 to-teal-50',
        textColor: 'text-emerald-800',
        accentColor: '#10B981',
        items: [
          { id: '2_2', a: 2, b: 2, ans: 4 },
          { id: '2_3', a: 2, b: 3, ans: 6 },
          { id: '2_4', a: 2, b: 4, ans: 8 },
          { id: '2_5', a: 2, b: 5, ans: 10 },
          { id: '2_6', a: 2, b: 6, ans: 12 },
          { id: '2_7', a: 2, b: 7, ans: 14 },
          { id: '2_8', a: 2, b: 8, ans: 16 },
          { id: '2_9', a: 2, b: 9, ans: 18 },
        ],
      },
      {
        sifirNumber: 4,
        title: 'Sifir 4',
        theme: 'rose',
        badgeColor: 'bg-rose-500',
        borderColor: 'border-rose-300',
        bgColor: 'from-rose-50 to-pink-50',
        textColor: 'text-rose-800',
        accentColor: '#F43F5E',
        items: [
          { id: '4_2', a: 4, b: 2, ans: 8 },
          { id: '4_3', a: 4, b: 3, ans: 12 },
          { id: '4_4', a: 4, b: 4, ans: 16 },
          { id: '4_5', a: 4, b: 5, ans: 20 },
          { id: '4_6', a: 4, b: 6, ans: 24 },
          { id: '4_7', a: 4, b: 7, ans: 28 },
          { id: '4_8', a: 4, b: 8, ans: 32 },
          { id: '4_9', a: 4, b: 9, ans: 36 },
        ],
      },
      {
        sifirNumber: 6,
        title: 'Sifir 6',
        theme: 'amber',
        badgeColor: 'bg-amber-500',
        borderColor: 'border-amber-300',
        bgColor: 'from-amber-50 to-orange-50',
        textColor: 'text-amber-800',
        accentColor: '#F59E0B',
        items: [
          { id: '6_2', a: 6, b: 2, ans: 12 },
          { id: '6_3', a: 6, b: 3, ans: 18 },
          { id: '6_4', a: 6, b: 4, ans: 24 },
          { id: '6_5', a: 6, b: 5, ans: 30 },
          { id: '6_6', a: 6, b: 6, ans: 36 },
          { id: '6_7', a: 6, b: 7, ans: 42 },
          { id: '6_8', a: 6, b: 8, ans: 48 },
          { id: '6_9', a: 6, b: 9, ans: 54 },
        ],
      },
    ],
  },
  {
    id: 'set_3_5_7',
    title: 'Sifir 3, 5, 7',
    subtitle: 'Tahap Menengah',
    tables: [
      {
        sifirNumber: 3,
        title: 'Sifir 3',
        theme: 'sky',
        badgeColor: 'bg-sky-500',
        borderColor: 'border-sky-300',
        bgColor: 'from-sky-50 to-blue-50',
        textColor: 'text-sky-800',
        accentColor: '#0EA5E9',
        items: [
          { id: '3_2', a: 3, b: 2, ans: 6 },
          { id: '3_3', a: 3, b: 3, ans: 9 },
          { id: '3_4', a: 3, b: 4, ans: 12 },
          { id: '3_5', a: 3, b: 5, ans: 15 },
          { id: '3_6', a: 3, b: 6, ans: 18 },
          { id: '3_7', a: 3, b: 7, ans: 21 },
          { id: '3_8', a: 3, b: 8, ans: 24 },
          { id: '3_9', a: 3, b: 9, ans: 27 },
        ],
      },
      {
        sifirNumber: 5,
        title: 'Sifir 5',
        theme: 'violet',
        badgeColor: 'bg-violet-500',
        borderColor: 'border-violet-300',
        bgColor: 'from-violet-50 to-purple-50',
        textColor: 'text-violet-800',
        accentColor: '#8B5CF6',
        items: [
          { id: '5_2', a: 5, b: 2, ans: 10 },
          { id: '5_3', a: 5, b: 3, ans: 15 },
          { id: '5_4', a: 5, b: 4, ans: 20 },
          { id: '5_5', a: 5, b: 5, ans: 25 },
          { id: '5_6', a: 5, b: 6, ans: 30 },
          { id: '5_7', a: 5, b: 7, ans: 35 },
          { id: '5_8', a: 5, b: 8, ans: 40 },
          { id: '5_9', a: 5, b: 9, ans: 45 },
        ],
      },
      {
        sifirNumber: 7,
        title: 'Sifir 7',
        theme: 'amber',
        badgeColor: 'bg-amber-600',
        borderColor: 'border-amber-400',
        bgColor: 'from-amber-50 to-yellow-50',
        textColor: 'text-amber-900',
        accentColor: '#D97706',
        items: [
          { id: '7_2', a: 7, b: 2, ans: 14 },
          { id: '7_3', a: 7, b: 3, ans: 21 },
          { id: '7_4', a: 7, b: 4, ans: 28 },
          { id: '7_5', a: 7, b: 5, ans: 35 },
          { id: '7_6', a: 7, b: 6, ans: 42 },
          { id: '7_7', a: 7, b: 7, ans: 49 },
          { id: '7_8', a: 7, b: 8, ans: 56 },
          { id: '7_9', a: 7, b: 9, ans: 63 },
        ],
      },
    ],
  },
  {
    id: 'set_8_9_10',
    title: 'Sifir 8, 9, 10',
    subtitle: 'Tahap Hebat',
    tables: [
      {
        sifirNumber: 8,
        title: 'Sifir 8',
        theme: 'indigo',
        badgeColor: 'bg-indigo-500',
        borderColor: 'border-indigo-300',
        bgColor: 'from-indigo-50 to-blue-50',
        textColor: 'text-indigo-800',
        accentColor: '#6366F1',
        items: [
          { id: '8_2', a: 8, b: 2, ans: 16 },
          { id: '8_3', a: 8, b: 3, ans: 24 },
          { id: '8_4', a: 8, b: 4, ans: 32 },
          { id: '8_5', a: 8, b: 5, ans: 40 },
          { id: '8_6', a: 8, b: 6, ans: 48 },
          { id: '8_7', a: 8, b: 7, ans: 56 },
          { id: '8_8', a: 8, b: 8, ans: 64 },
          { id: '8_9', a: 8, b: 9, ans: 72 },
        ],
      },
      {
        sifirNumber: 9,
        title: 'Sifir 9',
        theme: 'fuchsia',
        badgeColor: 'bg-fuchsia-500',
        borderColor: 'border-fuchsia-300',
        bgColor: 'from-fuchsia-50 to-pink-50',
        textColor: 'text-fuchsia-800',
        accentColor: '#D946EF',
        items: [
          { id: '9_2', a: 9, b: 2, ans: 18 },
          { id: '9_3', a: 9, b: 3, ans: 27 },
          { id: '9_4', a: 9, b: 4, ans: 36 },
          { id: '9_5', a: 9, b: 5, ans: 45 },
          { id: '9_6', a: 9, b: 6, ans: 54 },
          { id: '9_7', a: 9, b: 7, ans: 63 },
          { id: '9_8', a: 9, b: 8, ans: 72 },
          { id: '9_9', a: 9, b: 9, ans: 81 },
        ],
      },
      {
        sifirNumber: 10,
        title: 'Sifir 10',
        theme: 'teal',
        badgeColor: 'bg-teal-500',
        borderColor: 'border-teal-300',
        bgColor: 'from-teal-50 to-emerald-50',
        textColor: 'text-teal-800',
        accentColor: '#14B8A6',
        items: [
          { id: '10_2', a: 10, b: 2, ans: 20 },
          { id: '10_3', a: 10, b: 3, ans: 30 },
          { id: '10_4', a: 10, b: 4, ans: 40 },
          { id: '10_5', a: 10, b: 5, ans: 50 },
          { id: '10_6', a: 10, b: 6, ans: 60 },
          { id: '10_7', a: 10, b: 7, ans: 70 },
          { id: '10_8', a: 10, b: 8, ans: 80 },
          { id: '10_9', a: 10, b: 9, ans: 90 },
        ],
      },
    ],
  },
];

export default function NumeracySifirGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const currentSet = SIFIR_SETS[activeSetIndex] || SIFIR_SETS[0];

  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const currentTable = currentSet.tables[activeTableIndex] || currentSet.tables[0];

  // User Placed Answers: { [itemId]: answerNumber }
  const [placedAnswers, setPlacedAnswers] = useState({});
  // Selected Equation Slot (for tap-to-place flow)
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Generate Answer Bank for the Current Sifir Table
  const answerBank = useMemo(() => {
    const list = currentTable.items.map((item, idx) => ({
      tileId: `${item.id}_tile_${idx}`,
      value: item.ans,
      originalItemId: item.id,
    }));
    // Deterministic shuffle based on Sifir table
    return list.sort(() => 0.5 - Math.random());
  }, [currentTable]);

  // Reset when set or table changes
  useEffect(() => {
    // Find first incomplete slot if any
    const firstIncomplete = currentTable.items.find((it) => placedAnswers[it.id] !== it.ans);
    setSelectedSlotId(firstIncomplete ? firstIncomplete.id : currentTable.items[0]?.id || null);
  }, [activeTableIndex, activeSetIndex]);

  // Check how many are correct for current table
  const completedCountForTable = currentTable.items.filter(
    (item) => placedAnswers[item.id] === item.ans
  ).length;

  const isTableFullyCompleted = completedCountForTable === currentTable.items.length;

  // Check all tables in the active set
  const allTablesCompleted = currentSet.tables.every((tbl) =>
    tbl.items.every((it) => placedAnswers[it.id] === it.ans)
  );

  // Handle Voice Speak for Equation
  const handleSpeakEquation = (item) => {
    playPopSound();
    const malayNumWords = {
      2: 'dua', 3: 'tiga', 4: 'empat', 5: 'lima', 6: 'enam', 7: 'tujuh', 8: 'lapan', 9: 'sembilan', 10: 'sepuluh',
    };
    const wordA = malayNumWords[item.a] || `${item.a}`;
    const wordB = malayNumWords[item.b] || `${item.b}`;
    const wordAns = `${item.ans}`;
    speakMalayText(`${wordA} kali ${wordB} sama dengan ${wordAns}`);
  };

  // Handle Selecting a Tile from the Answer Bank
  const handleSelectAnswerTile = (val) => {
    // If a slot is selected
    const targetSlot = selectedSlotId
      ? currentTable.items.find((it) => it.id === selectedSlotId)
      : currentTable.items.find((it) => placedAnswers[it.id] !== it.ans);

    if (!targetSlot) {
      playPopSound();
      return;
    }

    if (val === targetSlot.ans) {
      // Correct!
      playMatchSuccessSound();
      const nextPlaced = {
        ...placedAnswers,
        [targetSlot.id]: val,
      };
      setPlacedAnswers(nextPlaced);

      // Advance to next incomplete slot in this table
      const nextIncomplete = currentTable.items.find(
        (it) => it.id !== targetSlot.id && nextPlaced[it.id] !== it.ans
      );
      if (nextIncomplete) {
        setSelectedSlotId(nextIncomplete.id);
      } else {
        setSelectedSlotId(null);
        // Check if all tables in current set are done
        const setDone = currentSet.tables.every((tbl) =>
          tbl.items.every((it) => nextPlaced[it.id] === it.ans)
        );
        if (setDone) {
          setTimeout(() => {
            playVictorySound();
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            setShowCompletionModal(true);
          }, 400);
        } else if (activeTableIndex < currentSet.tables.length - 1) {
          // Auto switch to next sifir table in set
          setTimeout(() => {
            playWhooshSound();
            setActiveTableIndex((prev) => prev + 1);
          }, 600);
        }
      }
    } else {
      // Incorrect guess
      playOopsSound();
      speakMalayText('Cuba lagi!');
    }
  };

  // Handle Remove / Reset a placed slot
  const handleRemovePlacedAnswer = (itemId) => {
    playWhooshSound();
    setPlacedAnswers((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setSelectedSlotId(itemId);
  };

  // Reset entire active table
  const handleResetTable = () => {
    playWhooshSound();
    setPlacedAnswers((prev) => {
      const next = { ...prev };
      currentTable.items.forEach((it) => {
        delete next[it.id];
      });
      return next;
    });
    setSelectedSlotId(currentTable.items[0]?.id || null);
    setShowCompletionModal(false);
  };

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto bg-gradient-to-b from-amber-50/40 via-sky-50/40 to-slate-100 select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-4">
      {/* Playful Notebook Math Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 z-0"
        style={{
          backgroundImage:
            'radial-gradient(#38bdf8 1.2px, transparent 1.2px), radial-gradient(#fbbf24 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between px-1 pt-1 pb-2">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-full shadow-[0_4px_0_0_#fcd34d] border-2 border-amber-300 font-['Fredoka'] font-black text-xs sm:text-sm transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Menu</span>
        </button>

        {/* Set Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/95 p-1 rounded-full shadow-[0_4px_0_0_#e2e8f0] border-2 border-sky-200">
          {SIFIR_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => {
                playPopSound();
                setActiveSetIndex(idx);
                setActiveTableIndex(0);
              }}
              className={`
                px-2.5 sm:px-3.5 py-1 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all cursor-pointer flex items-center gap-1
                ${
                  activeSetIndex === idx
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:bg-amber-50'
                }
              `}
            >
              <span>{idx === 0 ? '⭐' : idx === 1 ? '🚀' : '👑'}</span>
              <span>{set.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTable}
            title="Mula Semula Sifir Ini"
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

      {/* SIFIR TABLE STATION SWITCHER & INSTRUCTION BANNER */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-2 my-1">
        {/* Sifir 3D Badges Tabs (e.g. Sifir 2, Sifir 4, Sifir 6) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {currentSet.tables.map((tbl, idx) => {
            const isTabActive = activeTableIndex === idx;
            const doneCount = tbl.items.filter((it) => placedAnswers[it.id] === it.ans).length;
            const isTblDone = doneCount === tbl.items.length;

            return (
              <button
                key={tbl.sifirNumber}
                onClick={() => {
                  playPopSound();
                  setActiveTableIndex(idx);
                }}
                className={`
                  relative py-2 px-3 rounded-2xl border-3 font-['Fredoka'] font-black text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center
                  ${
                    isTabActive
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-blue-700 shadow-[0_5px_0_0_#0369a1] scale-102 -translate-y-0.5'
                      : isTblDone
                      ? 'bg-emerald-100/90 text-emerald-800 border-emerald-400 shadow-[0_4px_0_0_#a7f3d0]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 shadow-[0_4px_0_0_#e2e8f0]'
                  }
                `}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base">{tbl.title}</span>
                  {isTblDone && <span className="text-xs">⭐</span>}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold mt-0.5 ${isTabActive ? 'text-sky-100' : 'text-slate-500'}`}>
                  {doneCount} / {tbl.items.length} Selesai
                </span>
              </button>
            );
          })}
        </div>

        {/* Instruction Card */}
        <div className="bg-gradient-to-r from-amber-400/15 via-white to-sky-400/15 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border-2 border-amber-300 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg shadow-sm">
              ✨
            </div>
            <div className="flex flex-col">
              <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-slate-800 leading-tight">
                Lengkapkan {currentTable.title}: Tekan petak soalan, kemudian pilih jawapan yang tepat!
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              speakMalayText(`Mari belajar ${currentTable.title}! Selesaikan semua soalan untuk dapat bintang!`);
            }}
            title="Dengar Arahan"
            className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl border border-amber-300 transition-transform active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN SIFIR EQUATIONS GRID & ANSWER TRAY */}
      <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col gap-3 my-1">
        {/* Equations Container (8 items in 2 columns of 4 rows for clean mobile layout) */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-[0_6px_0_0_#e2e8f0] border-3 border-sky-300 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {currentTable.items.map((item) => {
              const userAns = placedAnswers[item.id];
              const isCorrect = userAns === item.ans;
              const isSelected = selectedSlotId === item.id;

              return (
                <div
                  key={item.id}
                  className={`
                    flex items-center justify-between p-1.5 sm:p-2.5 rounded-2xl border-2 transition-all duration-200
                    ${
                      isCorrect
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-xs'
                        : isSelected
                        ? 'bg-sky-50 border-sky-500 shadow-sm ring-2 ring-sky-300'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                    }
                  `}
                >
                  {/* Equation Equation Text (e.g. 2 x 5 =) */}
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <button
                      onClick={() => handleSpeakEquation(item)}
                      title="Dengar Sebutan Sifir"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="font-['Fredoka'] font-black text-sm sm:text-base text-slate-800 tracking-wide flex items-center gap-1">
                      <span className="w-5 text-center">{item.a}</span>
                      <span className="text-amber-500 font-extrabold text-xs sm:text-sm">×</span>
                      <span className="w-5 text-center">{item.b}</span>
                      <span className="text-slate-400">=</span>
                    </div>
                  </div>

                  {/* Interactive Answer Slot Box */}
                  <div
                    onClick={() => {
                      if (isCorrect) {
                        handleRemovePlacedAnswer(item.id);
                      } else {
                        playPopSound();
                        setSelectedSlotId(item.id);
                      }
                    }}
                    title={isCorrect ? 'Tekan untuk padam & tukar' : 'Tekan untuk pilih petak ini'}
                    className={`
                      w-12 h-9 sm:w-16 sm:h-11 rounded-xl flex items-center justify-center font-['Fredoka'] font-black text-sm sm:text-base transition-all cursor-pointer select-none
                      ${
                        isCorrect
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md border-2 border-emerald-600 animate-pop'
                          : userAns !== undefined
                          ? 'bg-rose-400 text-white border-2 border-rose-600'
                          : isSelected
                          ? 'bg-white border-2 border-dashed border-sky-500 text-sky-600 shadow-inner animate-pulse'
                          : 'bg-white border-2 border-dashed border-slate-300 text-slate-400 hover:border-sky-400'
                      }
                    `}
                  >
                    {userAns !== undefined ? (
                      <span className="flex items-center gap-1">
                        <span>{userAns}</span>
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </span>
                    ) : isSelected ? (
                      <span className="text-xs text-sky-500 font-extrabold">?</span>
                    ) : (
                      <span className="text-xs text-slate-300">•</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANSWER BANK TRAY (JAWAPAN) */}
        <div className="bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-amber-100/90 rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-[0_5px_0_0_#fcd34d]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-amber-900 flex items-center gap-1.5">
              <span>🎯</span>
              <span>PILIHAN JAWAPAN</span>
            </span>
            <span className="text-[11px] font-bold text-amber-800">
              Tekan nombor untuk mengisi petak
            </span>
          </div>

          {/* Tiles Grid with 3D Glossy Candy Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
            {answerBank.map((tile) => {
              // Check if this tile is currently placed
              const isUsed = Object.values(placedAnswers).includes(tile.value);

              return (
                <button
                  key={tile.tileId}
                  onClick={() => handleSelectAnswerTile(tile.value)}
                  className={`
                    py-2 px-1 rounded-2xl font-['Fredoka'] font-black text-base sm:text-lg transition-all duration-150 cursor-pointer flex items-center justify-center border-2
                    ${
                      isUsed
                        ? 'bg-slate-200 border-slate-300 text-slate-400 opacity-60 hover:opacity-100'
                        : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300 shadow-[0_4px_0_0_#fcd34d] hover:scale-105 active:translate-y-1 active:shadow-none'
                    }
                  `}
                >
                  {tile.value}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMPLETION VICTORY MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center flex flex-col items-center animate-pop">
            <ThreeGoldenStarsCluster />

            <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-amber-700 mt-3">
              Tahniah! Juara Sifir! 🎉
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-bold mt-1">
              Anda berjaya melengkapkan kesemua sifir dalam {currentSet.title} dengan cemerlang!
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <button
                onClick={handleResetTable}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-['Fredoka'] font-bold text-sm sm:text-base transition-transform active:scale-95 cursor-pointer shadow-sm"
              >
                Ulang Sifir Ini
              </button>

              {activeSetIndex < SIFIR_SETS.length - 1 ? (
                <button
                  onClick={() => {
                    playPopSound();
                    setActiveSetIndex((prev) => prev + 1);
                    setActiveTableIndex(0);
                    setShowCompletionModal(false);
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-['Fredoka'] font-black text-sm sm:text-base shadow-[0_4px_0_0_#d97706] transition-transform hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  Set Seterusnya →
                </button>
              ) : (
                <button
                  onClick={onBackToMenu}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-['Fredoka'] font-black text-sm sm:text-base shadow-[0_4px_0_0_#15803d] transition-transform hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  Ke Menu Utama 🏆
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
