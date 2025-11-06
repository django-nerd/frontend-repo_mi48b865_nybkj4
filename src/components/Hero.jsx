import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1a]/30 to-[#050513]" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            SDSS-17 Stellar Classification
          </h1>
          <p className="mt-3 text-sm sm:text-base text-violet-100/80 max-w-2xl">
            Explore the cosmos with an immersive, ML-powered classifier. Choose a model, enter stellar parameters, and visualize the result in 3D.
          </p>
        </div>
      </div>
    </section>
  );
}
