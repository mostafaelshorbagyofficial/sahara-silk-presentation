import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCursor } from '../context/CursorContext';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Sparkles } from 'lucide-react';

export default function CinematicVideoPlayer({
  video,
  isActive = true,
  className = '',
  aspectRatio = 'aspect-[9/16]',
  showDetails = true,
}) {
  const { t, isRTL } = useLanguage();
  const { setCursor, resetCursor } = useCursor();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.playbackDuration || 60);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videoSrc = video.videoSrc || video.src || `/videos/video-01.mp4`;

  // Update duration when metadata loads
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || video.playbackDuration || 60);
      setIsVideoLoaded(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Playback error:", err);
      });
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleScrub = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Switch video source if video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      
      {/* 9:16 Vertical Video Presentation Object */}
      <div
        ref={containerRef}
        className={`group relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] rounded-3xl overflow-hidden border transition-all duration-700 ease-luxury shadow-2xl bg-noir-card ${
          isActive
            ? 'border-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(197,168,128,0.2)] ring-1 ring-gold/30'
            : 'border-white/10 hover:border-gold/30'
        }`}
      >
        {/* Subtle Ambient Backlight inside frame */}
        <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-black pointer-events-none z-10" />

        {/* 9:16 Aspect Ratio Viewport Container */}
        <div className="relative aspect-[9/16] w-full bg-noir overflow-hidden flex items-center justify-center max-h-[640px]">
          
          {/* Actual 9:16 Vertical HTML5 Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            loop
            muted={isMuted}
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain block bg-black select-none pointer-events-none"
          />

          {/* Ambient Film Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80 z-20" />

          {/* Top Badges & Metadata */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-30">
            <span className="px-3 py-1 rounded-full bg-noir/85 backdrop-blur-md border border-gold/30 text-[10px] font-mono font-medium text-gold uppercase tracking-wider shadow-lg">
              {video.number ? `${video.number} • ` : ''}{video.category || (isRTL ? 'فيلم سينمائي' : 'Cinematic Asset')}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-sahara-300 border border-white/10">
                9:16
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-sahara-300 flex items-center gap-1 border border-white/10">
                <Clock className="w-3 h-3 text-gold" />
                {video.duration || formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Center Play/Pause Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer"
            onClick={togglePlay}
            onMouseEnter={() => setCursor('hover', isPlaying ? t.player.pause : t.player.play)}
            onMouseLeave={resetCursor}
          >
            <button
              type="button"
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all duration-500 ease-luxury shadow-2xl ${
                isPlaying
                  ? 'bg-noir/60 backdrop-blur-md text-gold border border-gold/40 scale-90 opacity-0 group-hover:opacity-90'
                  : 'bg-gold text-noir shadow-[0_0_30px_rgba(197,168,128,0.6)] scale-100 group-hover:scale-105'
              }`}
              aria-label={isPlaying ? t.player.pause : t.player.play}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-gold" />
              ) : (
                <Play className={`w-7 h-7 fill-current ${isRTL ? 'me-0.5' : 'ms-0.5'}`} />
              )}
            </button>
          </div>

          {/* Bottom Minimal Luxury Video Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-noir via-noir/90 to-transparent z-30 flex flex-col gap-2">
            
            {/* Progress Scrub Bar */}
            <div
              className="w-full h-1.5 bg-white/25 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all duration-200 relative"
              onClick={handleScrub}
            >
              <div
                className="h-full bg-gradient-to-r from-gold via-gold-rich to-gold-accent transition-all duration-150 ease-out rounded-full"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            {/* Control Bar Actions */}
            <div className="flex items-center justify-between text-xs text-sahara-300 font-mono pt-1">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="hover:text-gold transition-colors p-1"
                  aria-label={isPlaying ? t.player.pause : t.player.play}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-gold" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="text-[11px]">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="hover:text-gold transition-colors p-1"
                  aria-label={isMuted ? t.player.unmute : t.player.mute}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="hover:text-gold transition-colors p-1"
                  aria-label={t.player.fullscreen}
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Details & Production Notes */}
        {showDetails && (
          <div className="p-5 sm:p-6 bg-noir-card/95 border-t border-white/10 space-y-3">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-gold uppercase block">
                {t.player.nowPlaying}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-sahara-100 mt-0.5">
                {video.title}
              </h3>
            </div>

            {video.logline && (
              <p className="text-xs sm:text-sm font-sans text-sahara-300 leading-relaxed font-light">
                {video.logline}
              </p>
            )}

            {/* Visual & Sound Specifications */}
            {(video.visuals || video.soundtrack) && (
              <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-white/10 text-[11px] text-sahara-400">
                {video.visuals && (
                  <div>
                    <span className="text-gold font-mono uppercase text-[9px] block mb-0.5">
                      {isRTL ? "التوجيه البصري" : "Visual Direction"}
                    </span>
                    <p className="line-clamp-2 leading-relaxed">{video.visuals}</p>
                  </div>
                )}
                {video.soundtrack && (
                  <div>
                    <span className="text-gold font-mono uppercase text-[9px] block mb-0.5">
                      {isRTL ? "الموسيقى والتصميم الصوتي" : "Score & Sound"}
                    </span>
                    <p className="line-clamp-2 leading-relaxed">{video.soundtrack}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
