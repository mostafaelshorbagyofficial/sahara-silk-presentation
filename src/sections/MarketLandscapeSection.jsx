import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { TrendingUp, Target, Layers, CheckCircle2 } from 'lucide-react';

export default function MarketLandscapeSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [selectedQuadrant, setSelectedQuadrant] = useState(3); // Default to Sahara Silk

  return (
    <section
      id="market"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.market.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.market.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.market.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* Narrative Intro */}
        <div className="p-8 rounded-2xl bg-noir-card/60 border border-white/10 max-w-4xl">
          <p className="text-base sm:text-lg text-sahara-200 font-sans leading-relaxed">
            {t.market.analysisIntro}
          </p>
        </div>

        {/* Competitive Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.market.matrix.map((item, idx) => {
            const isSahara = idx === 3;
            const isSelected = selectedQuadrant === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedQuadrant(idx)}
                onMouseEnter={() => setCursor('hover', item.name)}
                onMouseLeave={resetCursor}
                className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-500 flex flex-col justify-between space-y-6 ${
                  isSahara
                    ? 'bg-gradient-to-b from-gold/15 via-gold/5 to-noir-card border-2 border-gold shadow-[0_0_30px_rgba(197,168,128,0.2)]'
                    : isSelected
                    ? 'bg-noir-card border border-gold/40'
                    : 'bg-noir-card/40 border border-white/5 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gold/70">0{idx + 1}</span>
                    {isSahara && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gold text-noir text-[10px] font-bold font-mono tracking-widest uppercase">
                        Whitespace
                      </span>
                    )}
                  </div>

                  <h3 className={`font-editorial text-xl sm:text-2xl ${isSahara ? 'text-gold font-medium' : 'text-sahara-100'}`}>
                    {item.name}
                  </h3>

                  <span className="inline-block text-xs font-mono text-sahara-400 bg-white/5 px-2.5 py-1 rounded">
                    {item.quadrant}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-sahara-300 font-sans leading-relaxed">
                  {item.weakness}
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {t.market.whitespaceMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-noir-card/80 border border-gold/15 space-y-3 text-center md:text-start"
            >
              <span className="font-editorial text-4xl sm:text-5xl text-gold block font-normal">
                {metric.value}
              </span>
              <h4 className="text-sm font-sans font-semibold text-sahara-100 uppercase tracking-wider">
                {metric.label}
              </h4>
              <p className="text-xs text-sahara-400 font-sans">
                {metric.context}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
