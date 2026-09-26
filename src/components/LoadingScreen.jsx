import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingScreen({ onFinish }) {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState(0); // 0: Logo, 1: Subtitle & Line, 2: Fade Out
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Step 1: Reveal Subtitle
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 600);

    // Step 2: Fade Out Loader
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1400);

    // Step 3: Complete & Unmount
    const timer3 = setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-noir flex flex-col items-center justify-center transition-opacity duration-700 ease-luxury ${
        step === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6 max-w-lg">
        {/* Brand Name */}
        <h1 className="font-display text-2xl md:text-4xl font-light tracking-[0.3em] uppercase text-sahara-100 animate-fade-in">
          {t.meta.brandName}
        </h1>

        {/* Delicate Golden Line */}
        <div className="my-6 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 transform scale-x-100" />

        {/* Subtitle / Tagline */}
        <p
          className={`text-xs md:text-sm tracking-[0.2em] uppercase font-sans text-sahara-400 transition-all duration-700 ${
            step >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-3'
          }`}
        >
          {t.meta.tagline}
        </p>
      </div>
    </div>
  );
}
