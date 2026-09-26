import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { Calendar, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function LaunchSequenceSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="launch-sequence"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.launchSequence.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.launchSequence.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.launchSequence.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* 4-Phase Timeline Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.launchSequence.phases.map((phase, idx) => {
            const isCurrent = activePhase === idx;

            return (
              <div
                key={idx}
                onClick={() => setActivePhase(idx)}
                onMouseEnter={() => setCursor('hover', phase.phase)}
                onMouseLeave={resetCursor}
                className={`luxury-card p-8 rounded-3xl cursor-pointer transition-all duration-500 flex flex-col justify-between space-y-6 ${
                  isCurrent
                    ? 'border-2 border-gold bg-gold/10 shadow-[0_0_30px_rgba(197,168,128,0.25)]'
                    : 'border-white/10 hover:border-gold/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold tracking-widest uppercase">
                      {phase.phase}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-gold/40" />
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-sahara-100 font-normal">
                    {phase.title}
                  </h3>

                  <p className="text-sm text-sahara-300 font-sans leading-relaxed font-light">
                    {phase.desc}
                  </p>
                </div>

                {/* Milestone Badge */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-gold">
                    {phase.milestone}
                  </span>
                  <CheckCircle className="w-4 h-4 text-gold/60" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
