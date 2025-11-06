import React from 'react';
import { Rocket, Star } from 'lucide-react';

export default function HeaderNav({ activeTab, onChange }) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-600 shadow-lg shadow-fuchsia-500/25 grid place-items-center">
            <Rocket className="text-white" size={20} />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Cosmic Classifier</p>
            <p className="text-violet-200/70 text-xs -mt-0.5">SDSS-17 • ML • 3D</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 text-sm">
          <button
            onClick={() => onChange('classifier')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'classifier'
                ? 'bg-white/15 text-white shadow-inner shadow-white/10'
                : 'text-violet-200/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Classifier
          </button>
          <button
            onClick={() => onChange('dictionary')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'dictionary'
                ? 'bg-white/15 text-white shadow-inner shadow-white/10'
                : 'text-violet-200/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <Star size={16} /> Dictionary
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
