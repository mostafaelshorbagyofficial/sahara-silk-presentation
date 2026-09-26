import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import CinematicVideoPlayer from '../components/CinematicVideoPlayer';
import { Film, PlayCircle, Clock } from 'lucide-react';

export default function CinematicVideosSection() {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);

  const currentFilm = t.cinematicVideos.videos[selectedFilmIndex];

  return (
    <section
      id="cinematic-videos"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-noir border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Chapter Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold font-semibold">
            {t.cinematicVideos.chapter}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-sahara-100 font-light">
            {t.cinematicVideos.title}
          </h2>
          <p className="text-base text-sahara-300 font-sans">
            {t.cinematicVideos.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mt-4" />
        </div>

        {/* 5 Films Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {t.cinematicVideos.videos.map((film, idx) => {
            const isSelected = selectedFilmIndex === idx;
            return (
              <button
                key={film.id}
                onClick={() => setSelectedFilmIndex(idx)}
                onMouseEnter={() => setCursor('hover', film.number)}
                onMouseLeave={resetCursor}
                className={`p-4 rounded-xl text-start transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-gold/15 border-2 border-gold shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                    : 'bg-noir-card/60 border border-white/10 hover:border-gold/30 hover:bg-noir-card'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-gold' : 'text-sahara-400'}`}>
                    {film.number}
                  </span>
                  <Film className={`w-3.5 h-3.5 ${isSelected ? 'text-gold' : 'text-white/20'}`} />
                </div>

                <div>
                  <h4 className={`text-sm font-editorial font-medium truncate ${isSelected ? 'text-sahara-100' : 'text-sahara-300'}`}>
                    {film.title}
                  </h4>
                  <span className="text-[10px] font-mono text-sahara-400 block truncate mt-0.5">
                    {film.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* The Active Cinematic Player Component */}
        <div className="max-w-5xl mx-auto">
          <CinematicVideoPlayer
            video={currentFilm}
            isActive={true}
            onSelect={() => {}}
          />
        </div>

      </div>
    </section>
  );
}
