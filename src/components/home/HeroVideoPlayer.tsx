'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';

interface HeroVideoPlayerProps {
  poster: string;
  videoSrc?: string;
  caption: string;
}

export function HeroVideoPlayer({
  poster,
  videoSrc = '/videos/hero-montage.mp4',
  caption,
}: HeroVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative rounded-3xl border border-stodio-border bg-stodio-card overflow-hidden shadow-2xl group">
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-stodio-bg">
        {/* HTML5 Video Layer */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stodio-bg via-stodio-bg/30 to-transparent pointer-events-none" />

        {/* Video Control Buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="p-3 rounded-full bg-stodio-card/80 hover:bg-stodio-red text-white backdrop-blur-md border border-stodio-border transition-all shadow-md focus:outline-none"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="p-3 rounded-full bg-stodio-card/80 hover:bg-stodio-red text-white backdrop-blur-md border border-stodio-border transition-all shadow-md focus:outline-none"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Overlay Info */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
          <div className="space-y-2 max-w-xl">
            <TagPill variant="red">Authentic On-Ground Proof</TagPill>
            <p className="text-xs sm:text-sm text-stodio-white font-normal leading-relaxed">
              {caption}
            </p>
          </div>
          <span className="text-[10px] font-mono text-stodio-muted tracking-wider uppercase bg-stodio-card/80 px-3 py-1.5 border border-stodio-border rounded-full backdrop-blur-md">
            Himalayan & Field Video Archive
          </span>
        </div>
      </div>
    </div>
  );
}
