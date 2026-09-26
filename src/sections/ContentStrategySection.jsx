import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { ArrowLeft, ArrowRight, Video, Sparkles, Layers, MessageSquare } from 'lucide-react';

export default function ContentStrategySection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="content-strategy"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir-surface border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header & Horizontal Scroll Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
              {t.contentStrategy.chapter}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
              {t.contentStrategy.title}
            </h2>
            <p className="text-base text-sahara-300 font-sans">
              {t.contentStrategy.subtitle}
            </p>
            <div className="w-16 h-[1px] bg-gold/50 mt-4" />
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-white/10 hover:border-gold text-sahara-300 hover:text-gold transition-all duration-300"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-white/10 hover:border-gold text-sahara-300 hover:text-gold transition-all duration-300"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Pillars Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {t.contentStrategy.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] shrink-0 luxury-card p-8 rounded-3xl space-y-6 snap-start flex flex-col justify-between group"
              onMouseEnter={() => setCursor('hover', pillar.number)}
              onMouseLeave={resetCursor}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold tracking-widest uppercase">
                    {pillar.number}
                  </span>
                  <div className="text-white/20 group-hover:text-gold transition-colors">
                    {idx === 0 && <Video className="w-5 h-5" />}
                    {idx === 1 && <Sparkles className="w-5 h-5" />}
                    {idx === 2 && <Layers className="w-5 h-5" />}
                    {idx === 3 && <MessageSquare className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="font-editorial text-2xl text-sahara-100 font-normal">
                  {pillar.title}
                </h3>

                <p className="text-sm text-sahara-300 font-sans leading-relaxed font-light">
                  {pillar.objective}
                </p>
              </div>

              {/* Formats and Cadence */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-sans">
                <div>
                  <span className="text-gold font-mono uppercase text-[10px] block mb-1">
                    {isRTL ? "صيغ المحتوى" : "Content Formats"}
                  </span>
                  <p className="text-sahara-300">{pillar.formats}</p>
                </div>
                <div>
                  <span className="text-gold font-mono uppercase text-[10px] block mb-1">
                    {isRTL ? "معدل النشر" : "Publishing Cadence"}
                  </span>
                  <p className="text-sahara-400 font-mono text-[11px]">{pillar.frequency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
