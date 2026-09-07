import React from 'react';
import { RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-['Nunito',sans-serif] text-center select-none">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 flex flex-col items-center gap-3 animate-pop">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-3xl mb-1">
              🦁
            </div>
            <h2 className="font-['Fredoka'] font-black text-xl sm:text-2xl text-slate-800">
              Alamak, ada sedikit gangguan!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-bold">
              Jangan risau, tekan butang di bawah untuk memuat semula permainan.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-3 flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-['Fredoka'] font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-200 transition-transform active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Muat Semula Permainan</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
