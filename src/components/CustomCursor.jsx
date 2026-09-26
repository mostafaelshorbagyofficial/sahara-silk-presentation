import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Detect touch device to disable custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorType !== 'default' && cursorText;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2 will-change-transform ${
        isExpanded ? 'scale-100' : 'scale-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isExpanded ? (
        <div className="px-3.5 py-1.5 rounded-full bg-gold/90 text-noir text-[11px] font-sans font-semibold tracking-widest uppercase shadow-xl backdrop-blur-sm border border-gold-light/40 flex items-center justify-center animate-fade-in whitespace-nowrap">
          {cursorText}
        </div>
      ) : (
        <div className="w-3 h-3 rounded-full bg-gold/70 ring-2 ring-gold/20 backdrop-blur-[1px] transition-all duration-200" />
      )}
    </div>
  );
}
