import React, { useState, useEffect } from 'react';

const fields = [
  { key: 'ra', label: 'Right Ascension (α)', unit: 'deg', min: 0, max: 360, step: 0.01, placeholder: '0 – 360' },
  { key: 'dec', label: 'Declination (δ)', unit: 'deg', min: -90, max: 90, step: 0.01, placeholder: '-90 – 90' },
  { key: 'u', label: 'u magnitude', unit: 'mag', min: 0, max: 30, step: 0.01, placeholder: '0 – 30' },
  { key: 'g', label: 'g magnitude', unit: 'mag', min: 0, max: 30, step: 0.01, placeholder: '0 – 30' },
  { key: 'r', label: 'r magnitude', unit: 'mag', min: 0, max: 30, step: 0.01, placeholder: '0 – 30' },
  { key: 'i', label: 'i magnitude', unit: 'mag', min: 0, max: 30, step: 0.01, placeholder: '0 – 30' },
];

export default function ParameterForm({ values, onChange, onSubmit, onReset }) {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const allFilled = fields.every((f) => values[f.key] !== '' && values[f.key] !== undefined && values[f.key] !== null);
    setValid(allFilled);
  }, [values]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((f) => (
          <label key={f.key} className="relative group">
            <span className="block text-xs text-violet-200/80 mb-1">{f.label}</span>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-fuchsia-400/60">
              <input
                type="number"
                inputMode="decimal"
                step={f.step}
                min={f.min}
                max={f.max}
                value={values[f.key] ?? ''}
                onChange={(e) => onChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-transparent outline-none text-white placeholder-violet-200/50"
                required
              />
              <span className="text-xs text-violet-200/70 border-l border-white/10 pl-2">{f.unit}</span>
            </div>
            <span className="absolute -bottom-4 left-0 text-[10px] text-violet-300/60">Range: {f.min} to {f.max}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!valid}
          className={`px-4 py-2 rounded-xl text-white transition-all ${
            valid
              ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:brightness-110 shadow-lg shadow-fuchsia-500/25'
              : 'bg-white/10 cursor-not-allowed text-white/60'
          }`}
        >
          Classify Object
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded-xl text-white/90 bg-white/10 hover:bg-white/15 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
