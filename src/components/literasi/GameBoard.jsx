import React from 'react';
import LetterBox from './LetterBox';
import ParkBackground from './ParkBackground';
import MascotBanner from './MascotBanner';
import { RotateCcw, ArrowLeft, Home, Settings } from 'lucide-react';

export default function GameBoard({
  revealedLetters,
  onLetterClick,
  orientation,
  onReset,
  onBackToMenu,
  onOpenSettings,
  mascotMessage,
}) {
  const isLandscape = orientation === 'landscape';

  // Portrait layout definition (Row 1: a-f, Drop: g, Row 2: m-h, Drop: n, Row 3: o-t, Drop: u, Row 4: z-v)
  const portraitRows = [
    { type: 'row', letters: ['a', 'b', 'c', 'd', 'e', 'f'] },
    { type: 'drop-right', letter: 'g' },
    { type: 'row-reverse', letters: ['m', 'l', 'k', 'j', 'i', 'h'] },
    { type: 'drop-left', letter: 'n' },
    { type: 'row', letters: ['o', 'p', 'q', 'r', 's', 't'] },
    { type: 'drop-right', letter: 'u' },
    { type: 'row-reverse-end', letters: ['z', 'y', 'x', 'w', 'v'] },
  ];

  // Landscape layout definition (Row 1: a-h [8], Drop: i [1], Row 2: q-j [8], Drop: r [1], Row 3: s-z [8])
  const landscapeRows = [
    { type: 'row', letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] },
    { type: 'drop-right', letter: 'i' },
    { type: 'row-reverse', letters: ['q', 'p', 'o', 'n', 'm', 'l', 'k', 'j'] },
    { type: 'drop-left', letter: 'r' },
    { type: 'row', letters: ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'] },
  ];

  const activeRows = isLandscape ? landscapeRows : portraitRows;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      {/* Background Graphic */}
      <ParkBackground orientation={orientation} />

      {/* Top Section: Mascot & Instructions */}
      <div className="w-full pt-3 pb-2 px-4 z-10">
        <MascotBanner
          message={mascotMessage}
        />
      </div>

      {/* Center Section: Alphabet Trail Board */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-2 z-10">
        <div
          className={`w-full max-w-2xl mx-auto flex flex-col justify-center ${
            isLandscape ? 'max-w-4xl gap-2 md:gap-3' : 'gap-2 sm:gap-3 md:gap-4'
          }`}
        >
          {activeRows.map((row, rIdx) => {
            if (row.type === 'row') {
              return (
                <div
                  key={`r-${rIdx}`}
                  className="grid gap-2 sm:gap-3 md:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`,
                  }}
                >
                  {row.letters.map((char) => (
                    <LetterBox
                      key={char}
                      letter={char}
                      isRevealed={revealedLetters.has(char)}
                      onLetterClick={onLetterClick}
                    />
                  ))}
                </div>
              );
            }

            if (row.type === 'row-reverse') {
              return (
                <div
                  key={`r-${rIdx}`}
                  className="grid gap-2 sm:gap-3 md:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`,
                  }}
                >
                  {row.letters.map((char) => (
                    <LetterBox
                      key={char}
                      letter={char}
                      isRevealed={revealedLetters.has(char)}
                      onLetterClick={onLetterClick}
                    />
                  ))}
                </div>
              );
            }

            if (row.type === 'row-reverse-end') {
              return (
                <div
                  key={`r-${rIdx}`}
                  className="grid gap-2 sm:gap-3 md:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(6, minmax(0, 1fr))`,
                  }}
                >
                  {row.letters.map((char) => (
                    <LetterBox
                      key={char}
                      letter={char}
                      isRevealed={revealedLetters.has(char)}
                      onLetterClick={onLetterClick}
                    />
                  ))}
                  {/* Empty placeholder for alignment to match 6 columns */}
                  <div className="hidden sm:block" />
                </div>
              );
            }

            if (row.type === 'drop-right') {
              return (
                <div
                  key={`r-${rIdx}`}
                  className="grid gap-2 sm:gap-3 md:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${isLandscape ? 8 : 6}, minmax(0, 1fr))`,
                  }}
                >
                  <div
                    style={{
                      gridColumn: isLandscape ? '8 / span 1' : '6 / span 1',
                    }}
                  >
                    <LetterBox
                      letter={row.letter}
                      isRevealed={revealedLetters.has(row.letter)}
                      onLetterClick={onLetterClick}
                    />
                  </div>
                </div>
              );
            }

            if (row.type === 'drop-left') {
              return (
                <div
                  key={`r-${rIdx}`}
                  className="grid gap-2 sm:gap-3 md:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${isLandscape ? 8 : 6}, minmax(0, 1fr))`,
                  }}
                >
                  <div style={{ gridColumn: '1 / span 1' }}>
                    <LetterBox
                      letter={row.letter}
                      isRevealed={revealedLetters.has(row.letter)}
                      onLetterClick={onLetterClick}
                    />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Bottom Floating Bar: Kembali ke Menu (Left), Settings & Reset (Right) */}
      <div className="w-full px-4 py-2.5 flex items-center justify-between z-10">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs md:text-sm rounded-full shadow-md border border-rose-400 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            title="Tetapan Audio & Bunyi"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs md:text-sm rounded-full shadow-md border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-white text-slate-700 font-bold text-xs md:text-sm rounded-full shadow-md border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>Reset Huruf</span>
          </button>
        </div>
      </div>
    </div>
  );
}
