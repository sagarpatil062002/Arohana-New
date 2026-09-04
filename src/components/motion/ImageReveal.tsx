'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ImageRevealProps extends Omit<ImageProps, 'className'> {
  containerClassName?: string;
  imageClassName?: string;
  hoverScale?: boolean;
  scaleAmount?: number; // default 1.05
  duration?: number; // default 850ms
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  aspectRatio?: string;
}

export function ImageReveal({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  hoverScale = true,
  scaleAmount = 1.06,
  duration = 850,
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  fill,
  sizes,
  priority,
  ...rest
}: ImageRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const getTransform = () => {
    if (prefersReduced) return 'none';
    if (!inView) return 'scale3d(1.08, 1.08, 1) translate3d(0, 15px, 0)';
    if (isHovered && hoverScale) return `scale3d(${scaleAmount}, ${scaleAmount}, 1) translate3d(0, 0, 0)`;
    return 'scale3d(1, 1, 1) translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`overflow-hidden relative ${containerClassName}`}
    >
      <div
        className="w-full h-full relative"
        style={{
          opacity: inView || prefersReduced ? 1 : 0,
          transform: getTransform(),
          transitionProperty: 'transform, opacity',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${delay}ms`,
          willChange: 'transform, opacity',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
          {...rest}
        />
      </div>
    </div>
  );
}
