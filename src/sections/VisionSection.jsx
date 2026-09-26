import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Sparkles, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function VisionSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="vision"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir border-t border-gold/10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.vision.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.vision.title}
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* Big Quote / Manifesto Lead */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-noir-card via-noir-surface to-noir-card border border-gold/20 shadow-2xl relative">
          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-sahara-100 italic leading-relaxed font-light">
            “{t.vision.quote}”
          </p>
        </div>

        {/* Detailed Editorial Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sahara-300 font-sans text-sm md:text-base leading-relaxed">
          {t.vision.manifesto.map((paragraph, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-noir-card/40 border border-white/5 space-y-3">
              <span className="font-mono text-xs text-gold font-bold">0{idx + 1}</span>
              <p>{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Video 01: The Desert Awakening (Brand Opening Film) */}
        {t.cinematicVideos?.videos?.[0] && (
          <div className="pt-4 max-w-5xl mx-auto">
            <CinematicVideoPlayer
              video={t.cinematicVideos.videos[0]}
              isActive={true}
              showDetails={true}
            />
          </div>
        )}

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {t.vision.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="luxury-card p-8 rounded-2xl space-y-6 group"
              onMouseEnter={() => setCursor('hover', pillar.title)}
              onMouseLeave={resetCursor}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-noir transition-colors duration-300">
                {idx === 0 && <Compass className="w-5 h-5" />}
                {idx === 1 && <Sparkles className="w-5 h-5" />}
                {idx === 2 && <Heart className="w-5 h-5" />}
              </div>

              <div className="space-y-3">
                <h3 className="font-editorial text-2xl text-sahara-100 font-normal">
                  {pillar.title}
                </h3>
                <p className="text-sm text-sahara-300 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gold">
                <span>{pillar.metric}</span>
                <span className="text-white/20">◆</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
