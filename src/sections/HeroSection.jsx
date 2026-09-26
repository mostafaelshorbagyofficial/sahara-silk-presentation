import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { ChevronDown, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function HeroSection({ onEnter }) {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-radial-gradient from-noir-surface via-noir to-black"
    >
      {/* Ambient Silk Light Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Editorial Eyebrow */}
      <div className="max-w-7xl mx-auto w-full pt-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.hero.eyebrow}</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 text-center md:text-start flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-sahara-100 uppercase leading-none">
            <span className="block font-light text-sahara-200">{t.hero.title}</span>
            <span className="block font-editorial italic font-normal text-gold text-3xl sm:text-5xl md:text-6xl mt-2">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-sans text-sahara-300 leading-relaxed max-w-2xl font-light">
            {t.hero.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              onClick={onEnter}
              onMouseEnter={() => setCursor('hover', t.hero.primaryCta)}
              onMouseLeave={resetCursor}
              className="px-8 py-4 rounded-full bg-gold text-noir font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] flex items-center gap-3 transform hover:-translate-y-0.5"
            >
              <span>{t.hero.primaryCta}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <a
              href="#vision"
              onMouseEnter={() => setCursor('hover', t.hero.secondaryCta)}
              onMouseLeave={resetCursor}
              className="px-8 py-4 rounded-full border border-gold/30 hover:border-gold text-sahara-200 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/[0.04]"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Minimal Editorial Emblem / Card */}
        <div className="hidden lg:flex flex-col items-center justify-center p-10 rounded-2xl bg-noir-card/60 backdrop-blur-xl border border-gold/20 max-w-xs text-center space-y-4 shadow-2xl">
          <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center text-gold">
            <span className="font-display text-2xl font-light">SS</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-gold">
              {t.meta.edition}
            </span>
            <p className="font-editorial text-sm italic text-sahara-300">
              {t.meta.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Key Metrics Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-start">
          {t.hero.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-editorial text-2xl sm:text-3xl text-gold font-normal">
                {stat.value}
              </span>
              <p className="text-xs text-sahara-400 uppercase tracking-wider font-sans">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
