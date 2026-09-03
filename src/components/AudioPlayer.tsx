// src/components/AudioPlayer.tsx
import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create warm ambient drone pad
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        // Low warm frequency (harmonic fifth)
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // A2 approx

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(162, ctx.currentTime); // E3 fifth

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillator1Ref.current = osc1;
        oscillator2Ref.current = osc2;
        gainNodeRef.current = gain;
      } catch (err) {
        console.warn('Web Audio drone setup prevented by browser:', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtxRef.current.currentTime + 1
          );
          setTimeout(() => {
            oscillator1Ref.current?.stop();
            oscillator2Ref.current?.stop();
            oscillator1Ref.current?.disconnect();
            oscillator2Ref.current?.disconnect();
          }, 1100);
        } catch {
          // Ignore cleanup errors
        }
      }
    }

    return () => {
      // Cleanup on unmount
      try {
        oscillator1Ref.current?.stop();
        oscillator2Ref.current?.stop();
      } catch {
        // Ignore
      }
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/50 hover:text-[#C5A46D] transition-colors uppercase px-2.5 py-1 border border-white/10 rounded-sm"
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        letterSpacing: '0.2em',
        padding: '4px 10px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '2px',
        background: isPlaying ? 'rgba(197, 164, 109, 0.15)' : 'rgba(0, 0, 0, 0.3)',
        color: isPlaying ? '#C5A46D' : 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#C5A46D' : 'rgba(255, 255, 255, 0.3)',
          display: 'inline-block',
          animation: isPlaying ? 'subtlePulse 2s infinite ease-in-out' : 'none',
        }}
      />
      <span>SOUND: {isPlaying ? 'ON' : 'OFF'}</span>
    </button>
  );
};
