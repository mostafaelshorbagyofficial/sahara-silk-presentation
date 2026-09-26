import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Crown, Sparkles, Globe, Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CommunitySection({ onOpenBriefing }) {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);

  const handleSubmitBriefing = (e) => {
    e.preventDefault();
    setBriefingSubmitted(true);
    setTimeout(() => {
      setBriefingSubmitted(false);
      setIsBriefingModalOpen(false);
    }, 2500);
  };

  return (
    <section
      id="community"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir-surface border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.community.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.community.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.community.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* 3 Experience Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.community.experiencePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="luxury-card p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between group"
              onMouseEnter={() => setCursor('hover', pillar.title)}
              onMouseLeave={resetCursor}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-noir transition-colors duration-300">
                  {idx === 0 && <Crown className="w-5 h-5" />}
                  {idx === 1 && <Sparkles className="w-5 h-5" />}
                  {idx === 2 && <Globe className="w-5 h-5" />}
                </div>

                <h3 className="font-editorial text-2xl text-sahara-100 font-normal">
                  {pillar.title}
                </h3>

                <p className="text-sm text-sahara-300 font-sans leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs font-mono text-gold flex items-center justify-between">
                <span>{pillar.benefit}</span>
                <span className="text-white/20">◆</span>
              </div>
            </div>
          ))}
        </div>

        {/* Video 05: The Runway to Oasis (Final Campaign & Runway Film) */}
        {t.cinematicVideos?.videos?.[4] && (
          <div className="pt-4 max-w-5xl mx-auto">
            <CinematicVideoPlayer
              video={t.cinematicVideos.videos[4]}
              isActive={true}
              showDetails={true}
            />
          </div>
        )}

        {/* Executive Closing & Schedule Briefing Banner */}
        <div className="text-center max-w-4xl mx-auto py-20 px-8 rounded-3xl bg-gradient-to-b from-noir-card via-noir to-noir-card border border-gold/40 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-transparent pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <h3 className="font-display text-4xl sm:text-6xl text-sahara-100 uppercase tracking-widest font-light">
              {t.community.footerCta.heading}
            </h3>
            <p className="font-editorial text-xl sm:text-2xl text-gold italic font-light">
              {t.community.footerCta.subheading}
            </p>
          </div>

          <div className="pt-4 relative z-10 flex justify-center">
            <button
              onClick={() => setIsBriefingModalOpen(true)}
              onMouseEnter={() => setCursor('hover', t.community.footerCta.buttonText)}
              onMouseLeave={resetCursor}
              className="px-10 py-5 rounded-full bg-gold text-noir font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_35px_rgba(197,168,128,0.5)] flex items-center gap-3 transform hover:-translate-y-0.5"
            >
              <span>{t.community.footerCta.buttonText}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Presentation Footer Metadata */}
        <footer className="pt-12 border-t border-white/10 text-center space-y-4 text-xs font-mono text-sahara-400">
          <p className="tracking-wider">{t.community.footerCta.copyright}</p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-sahara-400">
            <span>PARIS</span>
            <span>•</span>
            <span>MARRAKECH</span>
            <span>•</span>
            <span>DUBAI</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </footer>

      </div>

      {/* Briefing Modal */}
      {isBriefingModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsBriefingModalOpen(false)}
          />

          <div className="relative z-10 max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-noir-card border border-gold/40 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-gold uppercase tracking-widest">
                {t.meta.confidential}
              </span>
              <h4 className="font-editorial text-3xl text-sahara-100">
                {t.community.footerCta.buttonText}
              </h4>
            </div>

            {briefingSubmitted ? (
              <div className="py-12 text-center space-y-4 text-gold">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-pulse" />
                <p className="font-editorial text-xl text-sahara-100">
                  {isRTL ? "تم استلام طلبك بنجاح. سيتواصل معك فريق الإدارة التنفيذية قريباً." : "Your request has been received. Our executive concierge will reach out shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBriefing} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-sahara-300 uppercase mb-1">
                    {isRTL ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-noir-surface border border-white/15 focus:border-gold outline-none text-sahara-100 text-sm"
                    placeholder={isRTL ? "الاسم الكريم" : "Your Name"}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-sahara-300 uppercase mb-1">
                    {isRTL ? "البريد الإلكتروني المؤسسي" : "Executive Email"}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-noir-surface border border-white/15 focus:border-gold outline-none text-sahara-100 text-sm"
                    placeholder={isRTL ? "email@company.com" : "email@company.com"}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-sahara-300 uppercase mb-1">
                    {isRTL ? "المؤسسة / المنصب" : "Organization / Title"}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-noir-surface border border-white/15 focus:border-gold outline-none text-sahara-100 text-sm"
                    placeholder={isRTL ? "اسم الشركة أو الصندوق" : "Partner / Luxury Group"}
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBriefingModalOpen(false)}
                    className="px-6 py-3 rounded-xl text-xs font-mono text-sahara-400 hover:text-white"
                  >
                    {t.nav.close}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gold text-noir text-xs font-mono font-bold tracking-wider uppercase hover:bg-gold-light transition-colors"
                  >
                    {isRTL ? "إرسال الطلب" : "Confirm Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
