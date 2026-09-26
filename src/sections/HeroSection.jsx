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

        {/* Brand Ambassador Hero Portrait */}
        <div className="flex flex-col items-center max-w-sm w-full mx-auto md:mx-0 group">
          <div className="relative rounded-3xl overflow-hidden border border-gold/40 bg-noir-card/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,168,128,0.15)] ring-1 ring-gold/20 p-2">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden">
              <img
                src="/images/hero-ambassador.jpg"
                alt="Sahara Silk Brand Ambassador"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Luxury Tag */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-noir-card/85 backdrop-blur-md border border-gold/30 text-center space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gold block">
                  {t.meta.brandName} • {t.meta.edition}
                </span>
                <p className="font-editorial text-xs italic text-sahara-200">
                  {t.meta.tagline}
                </p>
              </div>
            </div>
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
