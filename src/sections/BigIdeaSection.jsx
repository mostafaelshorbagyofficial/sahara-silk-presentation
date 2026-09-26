import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { Sun, Droplets, Sparkles } from 'lucide-react';

export default function BigIdeaSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="big-idea"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-noir via-noir-surface to-noir border-t border-gold/10 overflow-hidden"
    >
      {/* Subtle Sand Wave Background Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none film-grain" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.bigIdea.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.bigIdea.title}
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* Cinematic Hero Statement Banner */}
        <div className="text-center max-w-4xl mx-auto py-16 px-8 rounded-3xl bg-noir-card/80 border border-gold/30 shadow-2xl space-y-6">
          <span className="font-mono text-xs text-gold tracking-[0.3em] uppercase block">
            {t.bigIdea.manifestoLead}
          </span>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl text-sahara-100 uppercase tracking-wider font-light">
            {t.bigIdea.bigIdeaTitle}
          </h3>
          <p className="font-editorial text-lg sm:text-2xl text-sahara-300 italic max-w-2xl mx-auto font-light leading-relaxed">
            {t.bigIdea.editorialBody}
          </p>
        </div>

        {/* 3 Creative Brand Territories */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-sahara-200">
              {isRTL ? "المناطق الإبداعية الثلاث للعلامة" : "The 3 Core Brand Territories"}
            </h4>
            <span className="font-mono text-xs text-gold">01 — 03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.bigIdea.territories.map((terr, idx) => (
              <div
                key={idx}
                className="luxury-card p-8 rounded-2xl space-y-6 group"
                onMouseEnter={() => setCursor('hover', terr.name)}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-light text-gold">
                    {terr.num}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:border-gold transition-colors">
                    {idx === 0 && <Sun className="w-4 h-4" />}
                    {idx === 1 && <Droplets className="w-4 h-4" />}
                    {idx === 2 && <Sparkles className="w-4 h-4" />}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-editorial text-2xl text-sahara-100 font-normal">
                    {terr.name}
                  </h5>
                  <p className="text-sm text-sahara-300 font-sans leading-relaxed font-light">
                    {terr.concept}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
