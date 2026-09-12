import React from 'react';
import { Award, RotateCcw, Sparkles } from 'lucide-react';

export default function VictoryModal({ isOpen, onRestart, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-b from-amber-50 to-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden animate-pop">
        {/* Glow effect */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-40" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-300 rounded-full blur-2xl opacity-40" />

        {/* Trophy / Stars */}
        <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center bg-amber-100 rounded-full border-4 border-amber-300 shadow-inner">
          <Award className="w-14 h-14 text-amber-500 animate-bounce" />
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-spin" />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-amber-900 mb-2 font-['Fredoka']">
          Tahniah! Anda Hebat! 🎉
        </h2>
        <p className="text-slate-600 text-sm md:text-base mb-6 font-semibold">
          Semua huruf A hingga Z telah berjaya dipaparkan! Anda kini mahir mengenal abjad.
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6 text-3xl text-amber-400">
          <span>⭐</span>
          <span className="scale-125">🌟</span>
          <span>⭐</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 font-['Fredoka'] font-bold rounded-2xl shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 text-base cursor-pointer"
          >
            <span>Lihat Jawapan</span>
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-['Fredoka'] font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Semula</span>
          </button>
        </div>
      </div>
    </div>
  );
}
