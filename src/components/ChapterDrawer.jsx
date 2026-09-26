import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { X, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

export default function ChapterDrawer({ isOpen, onClose, activeChapterId }) {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelectChapter = (id) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-fade-in">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`relative z-10 w-full max-w-xl bg-noir-card/95 border-s border-gold/20 h-full overflow-y-auto flex flex-col p-8 sm:p-12 shadow-2xl transition-transform duration-500 ease-luxury`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-gold uppercase">
              {t.meta.edition}
            </span>
            <h2 className="text-xl font-display uppercase tracking-widest text-sahara-100 mt-1">
              {t.nav.chapters}
            </h2>
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => setCursor('hover', t.nav.close)}
            onMouseLeave={resetCursor}
            className="p-2.5 rounded-full border border-white/10 hover:border-gold/50 text-sahara-300 hover:text-white transition-all duration-300"
            aria-label={t.nav.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter List */}
        <nav className="flex-1 py-8 space-y-2">
          {t.chapters.map((chapter, idx) => {
            const isActive = chapter.id === activeChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => handleSelectChapter(chapter.id)}
                onMouseEnter={() => setCursor('hover', t.nav.explore)}
                onMouseLeave={resetCursor}
                className={`w-full group text-start p-4 rounded-xl transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'bg-gold/10 border border-gold/40 text-gold'
                    : 'hover:bg-white/[0.03] border border-transparent text-sahara-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-gold/70 w-7">
                    {chapter.number}
                  </span>
                  <span className="font-editorial text-lg md:text-xl font-normal transition-colors">
                    {chapter.title}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold">
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-sahara-400 font-sans">
          <span>{t.meta.confidential}</span>
          <span className="font-mono text-gold">{t.meta.brandName}</span>
        </div>
      </div>
    </div>
  );
}
