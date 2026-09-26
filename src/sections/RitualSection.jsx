import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Sparkles, Clock, Droplet, ShieldCheck, Check } from 'lucide-react';

export default function RitualSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [activeStep, setActiveStep] = useState(0);

  const currentStepData = t.ritual.steps[activeStep];

  return (
    <section
      id="ritual"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.ritual.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.ritual.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.ritual.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6">
          {t.ritual.steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              onMouseEnter={() => setCursor('hover', step.name)}
              onMouseLeave={resetCursor}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-3 ${
                activeStep === idx
                  ? 'bg-gold text-noir font-bold shadow-[0_0_20px_rgba(197,168,128,0.3)]'
                  : 'bg-noir-card text-sahara-300 border border-white/10 hover:border-gold/40 hover:text-white'
              }`}
            >
              <span>{step.step}</span>
              <span className="opacity-40">|</span>
              <span className="font-sans font-normal truncate">{step.name}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center Flacon Silhouette & Visual Canvas */}
          <div className="lg:col-span-5 p-12 rounded-3xl bg-gradient-to-b from-noir-surface to-noir border border-gold/20 flex flex-col items-center justify-center text-center relative shadow-2xl min-h-[420px]">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-radial-gradient from-gold/15 to-transparent blur-2xl pointer-events-none" />

            {/* Stylized Minimal Flacon Graphic */}
            <div className="relative z-10 space-y-6 flex flex-col items-center">
              <div className="w-24 h-48 sm:w-28 sm:h-56 rounded-t-3xl rounded-b-xl border-2 border-gold/40 bg-gradient-to-b from-sahara-900/60 to-noir-surface shadow-2xl flex flex-col items-center justify-between p-4 relative overflow-hidden group">
                <div className="w-8 h-4 bg-gold/60 rounded-t-sm" />
                <div className="w-full text-center space-y-1">
                  <span className="text-[9px] font-display font-bold tracking-widest text-gold block">
                    SAHARA SILK
                  </span>
                  <span className="text-[8px] font-mono text-sahara-400 block truncate">
                    {currentStepData.type}
                  </span>
                </div>
                <div className="w-full h-1 bg-gold/30 rounded-full" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-gold tracking-wider block">
                  {currentStepData.volume}
                </span>
                <span className="text-[11px] text-sahara-400 font-sans block">
                  {isRTL ? "زجاج عنبري مصقول مع مضخة ذهبية" : "Amber Glass Flacon with Champagne Gold Dispenser"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Detailed Description & Usage */}
          <div className="lg:col-span-7 space-y-8 p-8 sm:p-10 rounded-3xl bg-noir-card/60 border border-white/10">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-mono text-gold uppercase tracking-wider inline-block">
                {currentStepData.type}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-sahara-100 font-normal">
                {currentStepData.name}
              </h3>
            </div>

            <p className="text-base text-sahara-200 font-sans leading-relaxed font-light">
              {currentStepData.desc}
            </p>

            <div className="p-6 rounded-2xl bg-noir-surface border border-gold/20 space-y-3">
              <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>{isRTL ? "طريقة التطبيق والطقس" : "Application & Sensory Method"}</span>
              </div>
              <p className="text-sm text-sahara-300 font-sans leading-relaxed">
                {currentStepData.usage}
              </p>
            </div>

            {/* Quick 3 Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-sahara-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold shrink-0" />
                <span>{isRTL ? "خالٍ من الكبريتات" : "100% Sulfate-Free"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold shrink-0" />
                <span>{isRTL ? "ترميم حريري فوري" : "Silk Micro-Bonding"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold shrink-0" />
                <span>{isRTL ? "حماية حرارية ٢٣٠°" : "230°C Heat Shield"}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Video 03: The 3-Step Night Ritual (Ritual Demonstration Masterclass) */}
        {t.cinematicVideos?.videos?.[2] && (
          <div className="pt-4 max-w-5xl mx-auto">
            <CinematicVideoPlayer
              video={t.cinematicVideos.videos[2]}
              isActive={true}
              showDetails={true}
            />
          </div>
        )}

      </div>
    </section>
  );
}
