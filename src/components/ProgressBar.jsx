import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ProgressBar({ activeChapterIndex, totalChapters }) {
  const { t, isRTL } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedCurrent = String(activeChapterIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalChapters).padStart(2, '0');

  // Convert numerals to Arabic in Arabic mode if desired or standard numbers
  const displayCurrent = isRTL ? t.chapters[activeChapterIndex]?.number || formattedCurrent : formattedCurrent;
  const displayTotal = isRTL ? '١٠' : formattedTotal;

  return (
    <>
      {/* Top Gold Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-gold/60 via-gold-rich to-gold transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom Status Orientation */}
      <aside aria-label="Presentation Status" className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 z-40 pointer-events-none">
        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-noir-card/85 backdrop-blur-md border border-gold/15 shadow-xl text-xs font-mono text-sahara-300">
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-gold">
            <span>{displayCurrent}</span>
            <span className="text-white/20">/</span>
            <span className="text-sahara-400 font-normal">{displayTotal}</span>
          </div>

          <div className="w-[1px] h-3 bg-white/15 hidden sm:block" />

          <span className="hidden sm:inline font-sans text-[11px] text-sahara-400 tracking-wider">
            {t.nav.readingTime}
          </span>
        </div>
      </aside>
    </>
  );
}
