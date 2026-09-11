import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Volume2,
  Trophy,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
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

// Data Sifir 2, Sifir 4 & Sifir 6 Sahaja (Mengikut Lembaran Kerja)
const SIFIR_DATA = [
  {
    sifirNumber: 2,
    title: 'Sifir 2',
    subtitle: 'Darab Dua',
    tag: 'Asas',
    themeName: 'emerald',
    badgeGradient: 'from-emerald-400 via-teal-500 to-emerald-600',
    activeTabBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-700 shadow-[0_5px_0_0_#047857]',
    inactiveTabBg: 'bg-white text-emerald-900 border-emerald-200 hover:border-emerald-400 shadow-[0_4px_0_0_#a7f3d0]',
    completedTabBg: 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-[0_4px_0_0_#6ee7b7]',
    cardBorder: 'border-emerald-300',
    cardBg: 'from-emerald-500/10 via-white to-teal-500/10',
    bannerBorder: 'border-emerald-400',
    accentColor: '#10B981',
    symbolColor: 'text-emerald-600',
    trayGradient: 'from-emerald-50 via-teal-50 to-emerald-100',
    trayBorder: 'border-emerald-300 shadow-[0_5px_0_0_#6ee7b7]',
    tileBg: 'bg-gradient-to-b from-white to-emerald-50 text-emerald-900 border-emerald-300 shadow-[0_4px_0_0_#10b981] hover:border-emerald-500',
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
    subtitle: 'Darab Empat',
    tag: 'Menengah',
    themeName: 'rose',
    badgeGradient: 'from-rose-400 via-pink-500 to-rose-600',
    activeTabBg: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-700 shadow-[0_5px_0_0_#be123c]',
    inactiveTabBg: 'bg-white text-rose-900 border-rose-200 hover:border-rose-400 shadow-[0_4px_0_0_#fecdd3]',
    completedTabBg: 'bg-rose-100 text-rose-900 border-rose-400 shadow-[0_4px_0_0_#fda4af]',
    cardBorder: 'border-rose-300',
    cardBg: 'from-rose-500/10 via-white to-pink-500/10',
    bannerBorder: 'border-rose-400',
    accentColor: '#F43F5E',
    symbolColor: 'text-rose-600',
    trayGradient: 'from-rose-50 via-pink-50 to-rose-100',
    trayBorder: 'border-rose-300 shadow-[0_5px_0_0_#fda4af]',
    tileBg: 'bg-gradient-to-b from-white to-rose-50 text-rose-900 border-rose-300 shadow-[0_4px_0_0_#f43f5e] hover:border-rose-500',
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
    subtitle: 'Darab Enam',
    tag: 'Hebat',
    themeName: 'amber',
    badgeGradient: 'from-amber-400 via-orange-500 to-amber-600',
    activeTabBg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-700 shadow-[0_5px_0_0_#b45309]',
    inactiveTabBg: 'bg-white text-amber-900 border-amber-200 hover:border-amber-400 shadow-[0_4px_0_0_#fde68a]',
    completedTabBg: 'bg-amber-100 text-amber-900 border-amber-400 shadow-[0_4px_0_0_#fcd34d]',
    cardBorder: 'border-amber-300',
    cardBg: 'from-amber-500/10 via-white to-orange-500/10',
    bannerBorder: 'border-amber-400',
    accentColor: '#F59E0B',
    symbolColor: 'text-amber-600',
    trayGradient: 'from-amber-50 via-orange-50 to-amber-100',
    trayBorder: 'border-amber-300 shadow-[0_5px_0_0_#fcd34d]',
    tileBg: 'bg-gradient-to-b from-white to-amber-50 text-amber-900 border-amber-300 shadow-[0_4px_0_0_#f59e0b] hover:border-amber-500',
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
];

export default function NumeracySifirGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const currentTable = SIFIR_DATA[activeTableIndex] || SIFIR_DATA[0];

  // Placed Answers: { [itemId]: answerNumber }
  const [placedAnswers, setPlacedAnswers] = useState({});
  // Selected Equation Slot (for tap-to-place flow)
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  // Hovered Slot during Drag-over
  const [dragOverSlotId, setDragOverSlotId] = useState(null);

  // Mobile Touch Dragging State
  const [touchDragging, setTouchDragging] = useState(null); // { value, x, y }

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Generate Answer Bank for the Current Sifir Table
  const answerBank = useMemo(() => {
    const list = currentTable.items.map((item, idx) => ({
      tileId: `${item.id}_tile_${idx}`,
      value: item.ans,
      originalItemId: item.id,
    }));
    // Deterministic shuffle
    return [...list].sort(() => 0.5 - Math.random());
  }, [currentTable]);

  // Set default selected slot when switching tables
  useEffect(() => {
    const firstIncomplete = currentTable.items.find((it) => placedAnswers[it.id] !== it.ans);
    setSelectedSlotId(firstIncomplete ? firstIncomplete.id : currentTable.items[0]?.id || null);
  }, [activeTableIndex]);

  // Completed count for current table
  const completedCountForTable = currentTable.items.filter(
    (item) => placedAnswers[item.id] === item.ans
  ).length;

  // Check all 3 tables (Sifir 2, 4, 6)
  const totalCompletedAllTables = SIFIR_DATA.reduce(
    (acc, tbl) => acc + tbl.items.filter((it) => placedAnswers[it.id] === it.ans).length,
    0
  );
  const totalQuestionsAllTables = SIFIR_DATA.reduce((acc, tbl) => acc + tbl.items.length, 0);

  // Handle Voice Speak for Equation
  const handleSpeakEquation = (item) => {
    playPopSound();
    const malayNumWords = {
      2: 'dua', 3: 'tiga', 4: 'empat', 5: 'lima', 6: 'enam', 7: 'tujuh', 8: 'lapan', 9: 'sembilan', 10: 'sepuluh',
    };
    const wordA = malayNumWords[item.a] || `${item.a}`;
    const wordB = malayNumWords[item.b] || `${item.b}`;
    const wordAns = `${item.ans}`;
    speakMalayText(`${wordA} darab ${wordB} sama dengan ${wordAns}`);
  };

  // Place Answer logic (used by both Click & Drag-Drop)
  const handlePlaceAnswer = (targetItemId, val) => {
    const targetItem = currentTable.items.find((it) => it.id === targetItemId);
    if (!targetItem) return;

    if (val === targetItem.ans) {
      // Correct Match!
      playMatchSuccessSound();
      const nextPlaced = {
        ...placedAnswers,
        [targetItemId]: val,
      };
      setPlacedAnswers(nextPlaced);

      // Move to next empty slot
      const nextIncomplete = currentTable.items.find(
        (it) => it.id !== targetItemId && nextPlaced[it.id] !== it.ans
      );
      if (nextIncomplete) {
        setSelectedSlotId(nextIncomplete.id);
      } else {
        setSelectedSlotId(null);
        // Check if ALL 3 sifir tables are fully done
        const allDone = SIFIR_DATA.every((tbl) =>
          tbl.items.every((it) => nextPlaced[it.id] === it.ans)
        );
        if (allDone) {
          setTimeout(() => {
            playVictorySound();
            confetti({ particleCount: 160, spread: 95, origin: { y: 0.6 } });
            setShowCompletionModal(true);
          }, 450);
        } else if (activeTableIndex < SIFIR_DATA.length - 1) {
          // Auto advance to next sifir table
          setTimeout(() => {
            playWhooshSound();
            setActiveTableIndex((prev) => prev + 1);
          }, 650);
        }
      }
    } else {
      // Wrong Match
      playOopsSound();
      speakMalayText('Cuba lagi!');
    }
  };

  // Handle Clicking on Answer Tile (Tap-to-place)
  const handleTileClick = (val) => {
    // Find target slot: currently selected or first incomplete
    const targetSlot = selectedSlotId
      ? currentTable.items.find((it) => it.id === selectedSlotId)
      : currentTable.items.find((it) => placedAnswers[it.id] !== it.ans);

    if (targetSlot) {
      handlePlaceAnswer(targetSlot.id, val);
    } else {
      playPopSound();
    }
  };

  // HTML5 Drag & Drop Handlers (Desktop)
  const handleDragStart = (e, val) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ value: val }));
    playPopSound();
  };

  const handleDropOnSlot = (e, targetItemId) => {
    e.preventDefault();
    setDragOverSlotId(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data && data.value !== undefined) {
        handlePlaceAnswer(targetItemId, data.value);
      }
    } catch (err) {
      console.warn('Drop error:', err);
    }
  };

  // Mobile Touch Drag Handlers (Phone / Tablet Touch Dragging)
  const handleTouchStart = (e, val) => {
    const touch = e.touches[0];
    if (!touch) return;
    playPopSound();
    setTouchDragging({
      value: val,
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchMove = (e) => {
    if (!touchDragging) return;
    const touch = e.touches[0];
    if (!touch) return;
    setTouchDragging((prev) => ({
      ...prev,
      x: touch.clientX,
      y: touch.clientY,
    }));

    // Detect if hovering over a slot
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);
    const slotElem = elem?.closest('[data-slot-id]');
    if (slotElem) {
      const slotId = slotElem.getAttribute('data-slot-id');
      setDragOverSlotId(slotId);
    } else {
      setDragOverSlotId(null);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchDragging) return;
    const touch = e.changedTouches[0];
    if (touch) {
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      const slotElem = elem?.closest('[data-slot-id]');
      if (slotElem) {
        const slotId = slotElem.getAttribute('data-slot-id');
        handlePlaceAnswer(slotId, touchDragging.value);
      }
    }
    setTouchDragging(null);
    setDragOverSlotId(null);
  };

  // Handle Remove / Return answer from slot
  const handleRemovePlacedAnswer = (itemId) => {
    playWhooshSound();
    setPlacedAnswers((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setSelectedSlotId(itemId);
  };

  // Reset active table
  const handleResetCurrentTable = () => {
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
    <div
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full min-h-0 overflow-y-auto bg-slate-50 select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-4"
    >
      {/* Playful Notebook Math Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            'radial-gradient(#38bdf8 1.2px, transparent 1.2px), radial-gradient(#fbbf24 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      {/* Floating Ghost Drag Preview for Mobile Touch Dragging */}
      {touchDragging && (
        <div
          style={{
            position: 'fixed',
            left: touchDragging.x - 28,
            top: touchDragging.y - 28,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-['Fredoka'] font-black text-xl flex items-center justify-center shadow-2xl border-2 border-white scale-110 animate-pulse"
        >
          {touchDragging.value}
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between px-1 pt-1 pb-2">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-full shadow-[0_4px_0_0_#fcd34d] border-2 border-amber-300 font-['Fredoka'] font-black text-xs sm:text-sm transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Menu</span>
        </button>

        {/* Header Title Badge */}
        <div className="flex items-center gap-1.5 bg-white/95 px-3.5 py-1.5 rounded-full shadow-[0_4px_0_0_#e2e8f0] border-2 border-amber-300">
          <span className="text-base">🎯</span>
          <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-amber-900 tracking-wide">
            Cabaran Sifir (2, 4 & 6)
          </span>
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-extrabold ml-1">
            {totalCompletedAllTables}/{totalQuestionsAllTables} ⭐
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCurrentTable}
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

      {/* SIFIR 2, 4, 6 3D CANDY TABS SWITCHER */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-2 my-1">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {SIFIR_DATA.map((tbl, idx) => {
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
                  relative py-2.5 px-2 rounded-2xl border-3 font-['Fredoka'] font-black text-center transition-all cursor-pointer flex flex-col items-center justify-center
                  ${
                    isTabActive
                      ? tbl.activeTabBg + ' scale-102 -translate-y-0.5 z-10'
                      : isTblDone
                      ? tbl.completedTabBg
                      : tbl.inactiveTabBg
                  }
                `}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base md:text-lg leading-tight">{tbl.title}</span>
                  {isTblDone && <span className="text-xs">⭐</span>}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold mt-0.5 ${
                    isTabActive ? 'text-white/90' : 'text-slate-500'
                  }`}
                >
                  {doneCount} / {tbl.items.length} Selesai
                </span>
              </button>
            );
          })}
        </div>

        {/* Instruction Banner with Audio Speaker */}
        <div className={`bg-gradient-to-r ${currentTable.cardBg} backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border-2 ${currentTable.bannerBorder} shadow-xs flex items-center justify-between gap-2`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${currentTable.badgeGradient} flex items-center justify-center text-white text-base shadow-sm flex-shrink-0`}>
              ✨
            </div>
            <div className="flex flex-col">
              <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-slate-800 leading-tight">
                Lengkapkan {currentTable.title}: <span className="text-sky-700 underline decoration-sky-300">Tarik</span> atau <span className="text-amber-700 underline decoration-amber-300">Tekan</span> nombor jawapan!
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              speakMalayText(`Mari selesaikan ${currentTable.title}! Tarik atau tekan nombor jawapan yang tepat.`);
            }}
            title="Dengar Arahan"
            className="p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-xl border border-slate-300 transition-transform active:scale-95 cursor-pointer flex-shrink-0 shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-sky-600" />
          </button>
        </div>
      </div>

      {/* MAIN SIFIR EQUATIONS CONTAINER (2 COLUMNS x 4 ROWS FOR MOBILE) */}
      <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col gap-2.5 my-1">
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-[0_6px_0_0_#e2e8f0] border-3 border-slate-200/90 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {currentTable.items.map((item) => {
              const userAns = placedAnswers[item.id];
              const isCorrect = userAns === item.ans;
              const isSelected = selectedSlotId === item.id;
              const isDragOver = dragOverSlotId === item.id;

              return (
                <div
                  key={item.id}
                  data-slot-id={item.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverSlotId(item.id);
                  }}
                  onDragLeave={() => setDragOverSlotId(null)}
                  onDrop={(e) => handleDropOnSlot(e, item.id)}
                  className={`
                    flex items-center justify-between p-1.5 sm:p-2.5 rounded-2xl border-2 transition-all duration-200
                    ${
                      isCorrect
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-xs'
                        : isDragOver
                        ? 'bg-amber-50 border-amber-500 ring-3 ring-amber-300 scale-102'
                        : isSelected
                        ? 'bg-sky-50 border-sky-500 shadow-sm ring-2 ring-sky-300'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                    }
                  `}
                >
                  {/* Equation Text & Voice Button (e.g. 2 x 5 =) */}
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <button
                      onClick={() => handleSpeakEquation(item)}
                      title="Dengar Sebutan Sifir"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="font-['Fredoka'] font-black text-sm sm:text-base text-slate-800 tracking-wide flex items-center gap-0.5 sm:gap-1">
                      <span className="w-4 text-center">{item.a}</span>
                      <span className={`${currentTable.symbolColor} font-extrabold text-xs sm:text-sm`}>×</span>
                      <span className="w-4 text-center">{item.b}</span>
                      <span className="text-slate-400 font-bold">=</span>
                    </div>
                  </div>

                  {/* Interactive Target Drop/Tap Slot */}
                  <div
                    onClick={() => {
                      if (isCorrect) {
                        handleRemovePlacedAnswer(item.id);
                      } else {
                        playPopSound();
                        setSelectedSlotId(item.id);
                      }
                    }}
                    title={isCorrect ? 'Tekan untuk padam & tukar' : 'Tekan atau tarik jawapan ke sini'}
                    className={`
                      w-12 h-9 sm:w-16 sm:h-11 rounded-xl flex items-center justify-center font-['Fredoka'] font-black text-sm sm:text-base transition-all cursor-pointer select-none
                      ${
                        isCorrect
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md border-2 border-emerald-600 animate-pop'
                          : userAns !== undefined
                          ? 'bg-rose-400 text-white border-2 border-rose-600'
                          : isDragOver
                          ? 'bg-amber-100 border-2 border-dashed border-amber-500 text-amber-700 scale-105'
                          : isSelected
                          ? 'bg-white border-2 border-dashed border-sky-500 text-sky-600 shadow-inner animate-pulse'
                          : 'bg-white border-2 border-dashed border-slate-300 text-slate-400 hover:border-sky-400'
                      }
                    `}
                  >
                    {userAns !== undefined ? (
                      <span className="flex items-center gap-0.5 sm:gap-1">
                        <span>{userAns}</span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-white" />
                        )}
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

        {/* ANSWER BANK TRAY (JAWAPAN) - DRAGGABLE & CLICKABLE */}
        <div className={`bg-gradient-to-r ${currentTable.trayGradient} rounded-3xl p-3 sm:p-4 border-3 ${currentTable.trayBorder}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
              <span>🎯</span>
              <span>PILIHAN JAWAPAN</span>
            </span>
            <span className="text-[11px] font-bold text-slate-600">
              Tarik atau tekan nombor
            </span>
          </div>

          {/* 8 Draggable / Clickable Candy Tiles in 2 Rows */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
            {answerBank.map((tile) => {
              const isUsed = placedAnswers[tile.originalItemId] === tile.value;

              return (
                <button
                  key={tile.tileId}
                  draggable={!isUsed}
                  onDragStart={(e) => handleDragStart(e, tile.value)}
                  onTouchStart={(e) => !isUsed && handleTouchStart(e, tile.value)}
                  onClick={() => handleTileClick(tile.value)}
                  disabled={isUsed}
                  className={`
                    py-2 px-1 rounded-2xl font-['Fredoka'] font-black text-base sm:text-lg md:text-xl transition-all duration-150 cursor-pointer flex items-center justify-center border-2 touch-manipulation
                    ${
                      isUsed
                        ? 'bg-slate-200/80 border-slate-300 text-slate-400 opacity-40 cursor-not-allowed shadow-none scale-95'
                        : currentTable.tileBg + ' active:scale-95 active:translate-y-1 hover:scale-105'
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

      {/* BOTTOM QUICK SIFIR SWITCHER */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between gap-2 pt-1 pb-0.5">
        <button
          onClick={() => {
            if (activeTableIndex > 0) {
              playPopSound();
              setActiveTableIndex((prev) => prev - 1);
            }
          }}
          disabled={activeTableIndex === 0}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-xl font-['Fredoka'] font-black text-xs shadow-[0_3px_0_0_#cbd5e1] border-2 border-slate-300 transition-all cursor-pointer
            ${
              activeTableIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-slate-100 text-slate-700 active:translate-y-0.5 active:shadow-none'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
          <span>Sifir Sebelum</span>
        </button>

        <span className="font-['Fredoka'] font-black text-xs text-slate-500">
          {currentTable.title} ({completedCountForTable} / {currentTable.items.length})
        </span>

        {activeTableIndex < SIFIR_DATA.length - 1 ? (
          <button
            onClick={() => {
              playPopSound();
              setActiveTableIndex((prev) => prev + 1);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-['Fredoka'] font-black text-xs shadow-[0_3px_0_0_#0284c7] border-2 border-blue-400 transition-all hover:scale-105 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <span>Sifir Seterusnya</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button
            onClick={() => {
              if (totalCompletedAllTables === totalQuestionsAllTables) {
                playVictorySound();
                confetti({ particleCount: 160, spread: 95, origin: { y: 0.6 } });
                setShowCompletionModal(true);
              } else {
                playPopSound();
                speakMalayText('Selesaikan semua soalan sifir untuk semak kejayaan!');
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-['Fredoka'] font-black text-xs shadow-[0_3px_0_0_#15803d] border-2 border-emerald-400 transition-all hover:scale-105 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <span>Semak Semua</span>
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
          </button>
        )}
      </div>

      {/* COMPLETION VICTORY MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center flex flex-col items-center animate-pop">
            <ThreeGoldenStarsCluster />

            <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-amber-700 mt-3">
              Tahniah! Hebat Sifir 2, 4 & 6! 🎉
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-bold mt-1">
              Anda berjaya menyelesaikan kesemua 24 soalan darab untuk Sifir 2, Sifir 4 dan Sifir 6 dengan cemerlang!
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <button
                onClick={() => {
                  setPlacedAnswers({});
                  setActiveTableIndex(0);
                  setShowCompletionModal(false);
                  playWhooshSound();
                }}
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
