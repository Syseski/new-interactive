import {
  Settings,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
} from 'lucide-react';

export default function Navbar({
  activeGame,
  onOpenSettings,
  isFullscreen,
  onToggleFullscreen,
  orientationMode,
  onChangeOrientation,
  gameMode,
  onChangeGameMode,
  progressCount,
  totalLetters = 26,
}) {
  return (
    <header className="w-full bg-slate-800/95 text-white border-b border-slate-700 px-3 py-2 sm:px-6 shadow-md z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Branding & Game Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-lg font-black shadow-sm">
              🔤
            </div>
            <span className="text-sm sm:text-base font-extrabold tracking-wide font-['Fredoka'] text-amber-300">
              Literasi
            </span>
          </div>

          {/* Active Game Title Badge */}
          {activeGame === 'trail' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              1. Laluan Huruf
            </span>
          )}
          {activeGame === 'drawing' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              2. Tulis & Lukis
            </span>
          )}
          {activeGame === 'sentence' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              10. Susun Ayat
            </span>
          )}
          {activeGame === 'num_compare' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 6. Lebih atau Kurang
            </span>
          )}
          {activeGame === 'num_count' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 1. Kira & Warna
            </span>
          )}
          {activeGame === 'num_order' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 2. Susun Nombor
            </span>
          )}
                    {activeGame === 'num_sifir' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 9. Cabaran Sifir
            </span>
          )}
          {activeGame === 'num_explore' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 3. Kenal & Sebut Nombor
            </span>
          )}
          {activeGame === 'num_addition' && (
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-400/40 px-2.5 py-1 rounded-lg text-xs font-bold font-['Fredoka']">
              🔢 4. Tambah Mudah
            </span>
          )}
        </div>

        {/* Center: Contextual Mode & Progress (Only for Game 1) */}
        {activeGame === 'trail' && (
          <div className="flex items-center gap-2 sm:gap-4 order-3 sm:order-2 w-full sm:w-auto justify-between sm:justify-center border-t border-slate-700 sm:border-t-0 pt-1 sm:pt-0">
            {/* Mode Switcher */}
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => onChangeGameMode('puzzle')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  gameMode === 'puzzle'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Cari & Paparkan
              </button>
              <button
                onClick={() => onChangeGameMode('explore')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  gameMode === 'explore'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Mod Teroka
              </button>
            </div>

            {/* Progress Pill */}
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-300">Kemajuan:</span>
              <span className="text-xs font-bold text-amber-400">
                {progressCount}/{totalLetters}
              </span>
              <div className="w-14 sm:w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-lime-400 h-full transition-all duration-300"
                  style={{ width: `${(progressCount / totalLetters) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Right Controls: Orientation, Sound, Fullscreen */}
        <div className="flex items-center gap-1.5 order-2 sm:order-3">
          <div className="flex bg-slate-900/80 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => onChangeOrientation('auto')}
              title="Orientasi Auto"
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                orientationMode === 'auto' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => onChangeOrientation('portrait')}
              title="Paksa Potret (Tegak)"
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
                orientationMode === 'portrait' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Potret</span>
            </button>
            <button
              onClick={() => onChangeOrientation('landscape')}
              title="Paksa Landskap (Mendatar)"
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
                orientationMode === 'landscape' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Landskap</span>
            </button>
          </div>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="Tetapan Audio & Bunyi"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-700 text-amber-300 hover:text-white transition-colors cursor-pointer text-xs font-bold font-['Fredoka']"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Keluar Skrin Penuh' : 'Skrin Penuh'}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
