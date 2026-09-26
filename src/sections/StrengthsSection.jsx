import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Leaf, Shield, Award, Sparkles } from 'lucide-react';

export default function StrengthsSection() {
  const { t } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="strengths"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir-surface border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.strengths.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.strengths.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.strengths.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* 4 Strategic Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.strengths.cards.map((card, idx) => (
            <div
              key={idx}
              className="luxury-card p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between group"
              onMouseEnter={() => setCursor('hover', card.tag)}
              onMouseLeave={resetCursor}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-[11px] font-mono text-gold uppercase tracking-wider">
                    {card.tag}
                  </span>
                  <div className="text-white/20 group-hover:text-gold transition-colors">
                    {idx === 0 && <Leaf className="w-5 h-5" />}
                    {idx === 1 && <Sparkles className="w-5 h-5" />}
                    {idx === 2 && <Award className="w-5 h-5" />}
                    {idx === 3 && <Shield className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-sahara-100 font-normal">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-sahara-300 font-sans leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Proof Highlight */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-gold tracking-wide">
                  {card.highlight}
                </span>
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse-subtle" />
              </div>
            </div>
          ))}
        </div>

        {/* Video 02: The Alchemy of Silk & Argan (Molecular & Botanical Story) */}
        {t.cinematicVideos?.videos?.[1] && (
          <div className="pt-4 max-w-5xl mx-auto">
            <CinematicVideoPlayer
              video={t.cinematicVideos.videos[1]}
              isActive={true}
              showDetails={true}
            />
          </div>
        )}

      </div>
    </section>
  );
}
