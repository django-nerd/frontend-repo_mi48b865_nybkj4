import React from 'react';

const TERMS = [
  { term: 'Galaxy', def: 'A massive, gravitationally bound system of stars, gas, dust, and dark matter.' },
  { term: 'Star', def: 'A luminous sphere of plasma held together by gravity, powered by nuclear fusion.' },
  { term: 'Quasar', def: 'An extremely luminous active galactic nucleus powered by a supermassive black hole.' },
  { term: 'Magnitude', def: 'A logarithmic measure of brightness; lower magnitudes are brighter.' },
  { term: 'Redshift', def: 'Increase in wavelength of light due to cosmic expansion or relative motion.' },
  { term: 'Spectroscopy', def: 'Technique for analyzing light to determine composition, temperature, and motion.' },
  { term: 'SDSS', def: 'Sloan Digital Sky Survey—mapped millions of celestial objects with precise photometry and spectra.' },
  { term: 'Parsec', def: 'A unit of distance equal to 3.26 light-years (about 3.086×10^16 meters).' },
  { term: 'Right Ascension', def: 'Celestial longitude measured eastward along the celestial equator.' },
  { term: 'Declination', def: 'Celestial latitude measured north or south of the celestial equator.' },
];

export default function SpaceDictionary(){
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Space Dictionary</h2>
      <p className="text-violet-200/80 mb-6">Explore essential astronomy terms used throughout this experience.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TERMS.map((t) => (
          <article key={t.term} className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition shadow-lg shadow-purple-900/20">
            <h3 className="text-white font-semibold mb-2 group-hover:text-fuchsia-300 transition">{t.term}</h3>
            <p className="text-violet-200/80 text-sm">{t.def}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
