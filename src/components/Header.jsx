import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAmbientAudio } from '../context/AudioContext';
import { useCursor } from '../context/CursorContext';
import { Volume2, VolumeX, Menu, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export default function Header({ onOpenChapters, activeChapterId }) {
  const { language, setSpecificLanguage, t, isRTL, isSwitching } = useLanguage();
  const { isPlaying, toggleAudio } = useAmbientAudio();
  const { setCursor, resetCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const activeChapter = t.chapters.find(c => c.id === activeChapterId) || t.chapters[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
        isScrolled
          ? 'py-3.5 bg-noir/85 backdrop-blur-md border-b border-gold/10 shadow-2xl'
          : 'py-6 bg-gradient-to-b from-noir/90 via-noir/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Identity & Active Chapter Badge */}
        <div className="flex items-center gap-6">
          <a
            href="#vision"
            className="group flex items-center gap-3 text-sahara-100 hover:text-gold transition-colors duration-300"
            onMouseEnter={() => setCursor('hover', t.nav.explore)}
            onMouseLeave={resetCursor}
          >
            <div className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-subtle" />
            </div>
            <span className="font-display font-semibold tracking-[0.25em] text-sm md:text-base text-sahara-100 uppercase">
              {t.meta.brandName}
            </span>
          </a>

          {/* Current Chapter Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-full bg-sahara-900/40 border border-gold/15 text-xs text-sahara-300 tracking-wider">
            <span className="text-gold font-mono text-[11px] font-semibold">{activeChapter.number}</span>
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="truncate max-w-[200px]">{activeChapter.title}</span>
          </div>
        </div>

        {/* Right: Controls, Sound, Chapters & Minimal Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => setCursor('hover', isPlaying ? t.nav.soundOff : t.nav.soundOn)}
            onMouseLeave={resetCursor}
            className={`p-2.5 rounded-full border transition-all duration-300 ${
              isPlaying
                ? 'border-gold text-gold bg-gold/10 shadow-[0_0_15px_rgba(197,168,128,0.2)]'
                : 'border-white/10 text-sahara-400 hover:text-sahara-200 hover:border-gold/30'
            }`}
            title={isPlaying ? t.nav.soundOff : t.nav.soundOn}
            aria-label={isPlaying ? t.nav.soundOff : t.nav.soundOn}
          >
            {isPlaying ? (
              <div className="flex items-center gap-1.5 px-1">
                <Volume2 className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wider uppercase font-mono font-medium">
                  {isPlaying ? (language === 'en' ? 'Sound On' : 'الصوت مفعل') : ''}
                </span>
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Fullscreen Toggle (Desktop) */}
          <button
            onClick={toggleFullscreen}
            onMouseEnter={() => setCursor('hover', t.nav.fullscreen)}
            onMouseLeave={resetCursor}
            className="hidden sm:flex p-2.5 rounded-full border border-white/10 text-sahara-400 hover:text-sahara-200 hover:border-gold/30 transition-all duration-300"
            title={t.nav.fullscreen}
            aria-label={t.nav.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Chapters Index Trigger */}
          <button
            onClick={onOpenChapters}
            onMouseEnter={() => setCursor('hover', t.nav.chapters)}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-sahara-950/60 hover:bg-gold/15 hover:border-gold text-sahara-200 text-xs font-medium tracking-widest uppercase transition-all duration-300"
          >
            <Menu className="w-3.5 h-3.5 text-gold" />
            <span className="font-sans">{t.nav.menu}</span>
          </button>

          {/* MINIMAL PREMIUM LANGUAGE SWITCHER (EN | AR) */}
          <div className="relative flex items-center p-1 rounded-full bg-sahara-950/80 border border-gold/20 shadow-inner">
            <button
              onClick={() => setSpecificLanguage('en')}
              disabled={isSwitching}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                language === 'en'
                  ? 'bg-gold text-noir shadow-md font-sans'
                  : 'text-sahara-400 hover:text-sahara-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSpecificLanguage('ar')}
              disabled={isSwitching}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                language === 'ar'
                  ? 'bg-gold text-noir shadow-md font-arabicSans'
                  : 'text-sahara-400 hover:text-sahara-200'
              }`}
            >
              عربي
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
