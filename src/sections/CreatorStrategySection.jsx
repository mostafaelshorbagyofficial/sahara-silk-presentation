import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Crown, Sparkles, Scissors, Users } from 'lucide-react';

export default function CreatorStrategySection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="creator-strategy"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir-surface border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.creatorStrategy.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.creatorStrategy.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.creatorStrategy.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* 3 Tiered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.creatorStrategy.tiers.map((tier, idx) => (
            <div
              key={idx}
              className="luxury-card p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between group"
              onMouseEnter={() => setCursor('hover', tier.count)}
              onMouseLeave={resetCursor}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-noir transition-colors">
                    {idx === 0 && <Crown className="w-5 h-5" />}
                    {idx === 1 && <Sparkles className="w-5 h-5" />}
                    {idx === 2 && <Scissors className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-xs text-gold font-bold">
                    {tier.count}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-sahara-100 font-normal">
                  {tier.name}
                </h3>

                <p className="text-sm text-sahara-300 font-sans leading-relaxed font-light">
                  {tier.profile}
                </p>

                <div className="pt-2 text-xs text-sahara-400 space-y-1">
                  <span className="text-gold font-mono uppercase text-[10px] block">
                    {isRTL ? "المخرجات والأنشطة" : "Deliverables & Activations"}
                  </span>
                  <p>{tier.deliverables}</p>
                </div>
              </div>

              {/* Total Audience Impact */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-gold tracking-wide font-semibold">
                  {tier.reach}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-subtle" />
              </div>
            </div>
          ))}
        </div>

        {/* Video 04: Voices of the Dunes (Creator & Community Storytelling) */}
        {t.cinematicVideos?.videos?.[3] && (
          <div className="pt-4 max-w-5xl mx-auto">
            <CinematicVideoPlayer
              video={t.cinematicVideos.videos[3]}
              isActive={true}
              showDetails={true}
            />
          </div>
        )}

      </div>
    </section>
  );
}
