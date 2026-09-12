import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Mic,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import {
  isBGMEnabled,
  setBGMEnabled,
  getBGMSliderValue,
  setBGMSliderValue,
  getBGMVolume,
  setBGMVolume,
  isVoiceEnabled,
  setVoiceEnabled,
  getVoiceVolume,
  setVoiceVolume,
  isSoundEnabled,
  setSoundEnabled,
  playPopSound,
} from '../utils/soundEffects';

export default function SettingsModal({ isOpen, onClose }) {
  const [bgmOn, setBgmOn] = useState(true);
  const [bgmVol, setBgmVol] = useState(0.50);
  const [voiceOn, setVoiceOn] = useState(true);
  const [voiceVol, setVoiceVol] = useState(0.85);
  const [soundOn, setSoundOn] = useState(true);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setBgmOn(isBGMEnabled());
      setBgmVol(getBGMSliderValue());
      setVoiceOn(isVoiceEnabled());
      setVoiceVol(getVoiceVolume());
      setSoundOn(isSoundEnabled());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleBGM = () => {
    const next = !bgmOn;
    setBgmOn(next);
    setBGMEnabled(next);
    playPopSound();
  };

  const handleChangeBGMVolume = (e) => {
    const val = parseFloat(e.target.value);
    setBgmVol(val);
    setBGMSliderValue(val);
    if (val > 0 && !bgmOn) {
      setBgmOn(true);
      setBGMEnabled(true);
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    setVoiceEnabled(next);
    playPopSound();
  };

  const handleChangeVoiceVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVoiceVol(val);
    setVoiceVolume(val);
    if (val > 0 && !voiceOn) {
      setVoiceOn(true);
      setVoiceEnabled(true);
    }
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    playPopSound();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-amber-400/80 rounded-3xl p-5 sm:p-6 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 transition-transform active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md">
            ⚙️
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black font-['Fredoka'] text-amber-300 tracking-wide">
              Tetapan Audio & Bunyi
            </h2>
            <p className="text-xs text-slate-400">
              Ubah kelantangan atau matikan / hidupkan audio
            </p>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex flex-col gap-4">
          {/* 1. Background Music (BGM) */}
          <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${bgmOn ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-500'}`}>
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Muzik Latar (BGM)</div>
                  <div className="text-[11px] text-slate-400">
                    {bgmOn ? `Aktif (${Math.round(bgmVol * 100)}%)` : 'Dimatikan (Mute)'}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={handleToggleBGM}
                type="button"
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                  bgmOn ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                    bgmOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Volume Slider */}
            {bgmOn && (
              <div className="pt-1.5 flex items-center gap-2">
                <span className="text-[11px] text-slate-400 w-12">Bunyi:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bgmVol}
                  onChange={handleChangeBGMVolume}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* 2. Voice-over (Sebutan Huruf) */}
          <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${voiceOn ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-500'}`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Suara Sebutan Huruf</div>
                  <div className="text-[11px] text-slate-400">
                    {voiceOn ? `Aktif (${Math.round(voiceVol * 100)}%)` : 'Dimatikan (Mute)'}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={handleToggleVoice}
                type="button"
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                  voiceOn ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                    voiceOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Volume Slider */}
            {voiceOn && (
              <div className="pt-1.5 flex items-center gap-2">
                <span className="text-[11px] text-slate-400 w-12">Bunyi:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={voiceVol}
                  onChange={handleChangeVoiceVolume}
                  className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* 3. Sound Effects (SFX / Pop & Fanfare) */}
          <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${soundOn ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-700 text-slate-500'}`}>
                  {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Kesan Bunyi (SFX)</div>
                  <div className="text-[11px] text-slate-400">
                    {soundOn ? 'Bunyi pop & kejayaan aktif' : 'Dimatikan (Mute)'}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={handleToggleSound}
                type="button"
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                  soundOn ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                    soundOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Done / Close Button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="mt-6 w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 font-['Fredoka'] text-base tracking-wide transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>Selesai</span>
        </button>
      </div>
    </div>
  );
}
