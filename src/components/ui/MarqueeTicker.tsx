'use client';

import React from 'react';

interface MarqueeTickerProps {
  items: string[];
  separator?: string;
  speed?: 'normal' | 'slow' | 'fast';
  reverse?: boolean;
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items,
  separator = '✦',
  speed = 'normal',
  reverse = false,
  className = '',
}) => {
  const speedClass =
    speed === 'slow'
      ? 'animate-marquee-slow'
      : speed === 'fast'
      ? 'animate-marquee'
      : 'animate-marquee';

  const animationClass = reverse ? 'animate-marquee-reverse' : speedClass;

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-4 border-y border-white/10 ${className}`}>
      <div className={`flex items-center shrink-0 ${animationClass}`}>
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="flex items-center">
            <span className="text-sm md:text-base font-medium tracking-wider uppercase text-neutral-300 px-6 md:px-8">
              {item}
            </span>
            <span className="text-froxen-lime text-xs opacity-70">
              {separator}
            </span>
          </div>
        ))}
      </div>
      <div className={`flex items-center shrink-0 ${animationClass}`} aria-hidden="true">
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="flex items-center">
            <span className="text-sm md:text-base font-medium tracking-wider uppercase text-neutral-300 px-6 md:px-8">
              {item}
            </span>
            <span className="text-froxen-lime text-xs opacity-70">
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
