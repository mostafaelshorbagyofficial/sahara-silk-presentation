import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AudioProvider } from './context/AudioContext';
import { CursorProvider } from './context/CursorContext';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import ChapterDrawer from './components/ChapterDrawer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

import HeroSection from './sections/HeroSection';
import VisionSection from './sections/VisionSection';
import StrengthsSection from './sections/StrengthsSection';
import MarketLandscapeSection from './sections/MarketLandscapeSection';
import BigIdeaSection from './sections/BigIdeaSection';
import RitualSection from './sections/RitualSection';
import ContentStrategySection from './sections/ContentStrategySection';
import CinematicVideosSection from './sections/CinematicVideosSection';
import CreatorStrategySection from './sections/CreatorStrategySection';
import LaunchSequenceSection from './sections/LaunchSequenceSection';
import CommunitySection from './sections/CommunitySection';

function PresentationContent() {
  const { isSwitching, isRTL, t } = useLanguage();
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState('vision');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Smooth IntersectionObserver to dynamically detect which chapter is in view
  useEffect(() => {
    const chapterIds = [
      'vision',
      'strengths',
      'market',
      'big-idea',
      'ritual',
      'content-strategy',
      'cinematic-videos',
      'creator-strategy',
      'launch-sequence',
      'community',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapterId(chapterIds[i]);
          setActiveChapterIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterExperience = () => {
    const el = document.getElementById('vision');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-noir text-sahara-100 ${isRTL ? 'font-arabicSans' : 'font-sans'}`}>
      <CustomCursor />
      
      <Header
        onOpenChapters={() => setIsChapterDrawerOpen(true)}
        activeChapterId={activeChapterId}
      />

      <ProgressBar
        activeChapterIndex={activeChapterIndex}
        totalChapters={t.chapters.length}
      />

      <ChapterDrawer
        isOpen={isChapterDrawerOpen}
        onClose={() => setIsChapterDrawerOpen(false)}
        activeChapterId={activeChapterId}
      />

      {/* Main Content Container with Smooth Language Switching Animation */}
      <main className={`language-transition ${isSwitching ? 'is-switching' : ''}`}>
        <HeroSection onEnter={handleEnterExperience} />
        <VisionSection />
        <StrengthsSection />
        <MarketLandscapeSection />
        <BigIdeaSection />
        <RitualSection />
        <ContentStrategySection />
        <CinematicVideosSection />
        <CreatorStrategySection />
        <LaunchSequenceSection />
        <CommunitySection />
      </main>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <AudioProvider>
        <CursorProvider>
          {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
          <PresentationContent />
        </CursorProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}
