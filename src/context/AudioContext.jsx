import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContextState = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nodesRef = useRef([]);

  const startAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm ambient meditative chords (432Hz base frequency, calm golden tones)
      const freqs = [108, 162, 216, 324, 432];
      const newNodes = [];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        // Gentle volume modulation for silk-like breathing feeling
        oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        newNodes.push(osc);
      });

      nodesRef.current = newNodes;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio could not start automatically:", e);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        setTimeout(() => {
          nodesRef.current.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (err) {}
          });
          nodesRef.current = [];
          setIsPlaying(false);
        }, 1500);
      } catch (e) {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      nodesRef.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (err) {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch (err) {}
      }
    };
  }, []);

  return (
    <AudioContextState.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContextState.Provider>
  );
}

export function useAmbientAudio() {
  const context = useContext(AudioContextState);
  if (!context) {
    throw new Error('useAmbientAudio must be used within an AudioProvider');
  }
  return context;
}
