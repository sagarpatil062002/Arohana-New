'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'hidden'>('default');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined') {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
        return;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if target has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || 'VIEW';
        setCursorText(text);
        setCursorVariant('project');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setCursorVariant('hidden');
    const onMouseEnter = () => setCursorVariant('default');

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouch || cursorVariant === 'hidden') return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: mousePosition.x - (cursorVariant === 'project' ? 44 : 8),
        y: mousePosition.y - (cursorVariant === 'project' ? 44 : 8),
        width: cursorVariant === 'project' ? 88 : 16,
        height: cursorVariant === 'project' ? 88 : 16,
        backgroundColor: cursorVariant === 'project' ? '#C6FF00' : '#FFFFFF',
        opacity: mousePosition.x > 0 ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.5,
      }}
    >
      {cursorVariant === 'project' && (
        <span className="text-[11px] font-black tracking-wider uppercase text-black font-sans">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
