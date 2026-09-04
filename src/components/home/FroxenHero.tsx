'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

export const FroxenHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen bg-[#060607] flex flex-col justify-between pt-32 md:pt-36 pb-12 px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-froxen-lime/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Hero Composition: Typography Led */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mb-8 md:mb-12">
        {/* Status Pill & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          <div className="froxen-pill">
            <span className="pulse-dot" />
            <span>Creative Consultancy &amp; Execution</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 uppercase">
            <span>GOA</span>
            <span className="text-froxen-lime">✦</span>
            <span>LADAKH</span>
            <span className="text-froxen-lime">✦</span>
            <span>MUMBAI</span>
          </div>
        </motion.div>

        {/* Oversized Typography Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase text-white leading-[0.88] max-w-6xl">
            We build brands, <br className="hidden sm:inline" />
            businesses <span className="text-neutral-500">&amp;</span> experiences.
          </h1>
        </motion.div>

        {/* Froxen Subtitle with dividing lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 my-8 max-w-4xl"
        >
          <div className="h-[1px] bg-white/10 flex-1" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-400 shrink-0">
            Strategy-Led Creativity &amp; Commercial Execution
          </span>
          <div className="h-[1px] bg-white/10 flex-1" />
        </motion.div>

        {/* Supporting Copy & CTAs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-8 lg:col-span-7"
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
              Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:col-span-4 lg:col-span-5 flex flex-wrap items-center md:justify-end gap-4"
          >
            <FroxenButton href="/contact" variant="lime">
              Start a Conversation
            </FroxenButton>
            <FroxenButton href="/work" variant="outline">
              See Our Work
            </FroxenButton>
          </motion.div>
        </div>
      </div>

      {/* Video Montage Artwork Composition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full relative group rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/hero-montage.mp4"
            poster="/images/home/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.82] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Gradients and Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-[#060607]/40 pointer-events-none" />

          {/* Froxen-style Video Control */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
            <button
              onClick={toggleVideo}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:border-froxen-lime transition-all cursor-pointer"
              aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
            >
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span>{isPlaying ? 'PAUSE MONTAGE' : 'PLAY MONTAGE'}</span>
            </button>
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block">
              8–12s Work Reel · Hospitality · Built Environment · Defence · Field
            </span>
          </div>

          {/* Rotating Studio Badge in Corner */}
          <div className="absolute top-6 right-6 z-20 pointer-events-none">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <div className="absolute inset-0 border border-white/20 rounded-full animate-spinSlow" />
              <div className="text-center">
                <span className="block text-froxen-lime text-base font-black">✦</span>
                <span className="block text-[8px] font-mono tracking-widest text-neutral-300 uppercase">
                  EST. 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FroxenHero;
