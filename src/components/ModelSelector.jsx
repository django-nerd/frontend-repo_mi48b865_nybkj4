import React from 'react';
import { Brain, Layers, Sparkles } from 'lucide-react';

const models = [
  { id: 'rf', name: 'Random Forest', icon: Layers, desc: 'Ensemble of decision trees' },
  { id: 'svm', name: 'Support Vector Machine', icon: Sparkles, desc: 'Max-margin classifier' },
  { id: 'nn', name: 'Neural Network', icon: Brain, desc: 'Deep learning model' },
];

export default function ModelSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {models.map((m) => {
        const Icon = m.icon;
        const active = selected === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`group relative p-4 rounded-2xl border transition-all text-left overflow-hidden ${
              active
                ? 'border-fuchsia-400/60 bg-fuchsia-500/10 shadow-[0_0_40px_-10px] shadow-fuchsia-500/40'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-indigo-500/30 blur-2xl"/>
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-xl grid place-items-center ${
                active ? 'bg-gradient-to-br from-fuchsia-500 to-indigo-600' : 'bg-white/10'
              }`}>
                <Icon className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{m.name}</p>
                <p className="text-violet-200/70 text-xs">{m.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
