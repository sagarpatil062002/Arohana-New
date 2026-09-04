'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

interface FroxenOffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { index: '01', title: 'HOME', href: '/' },
  { index: '02', title: 'ABOUT', href: '/about' },
  { index: '03', title: 'WORK', href: '/work' },
  { index: '04', title: 'SERVICES', href: '/services' },
  { index: '05', title: 'TOURIN', href: '/tourin' },
  { index: '06', title: 'INDIAN ARMY', href: '/indian-army-projects' },
  { index: '07', title: 'CONTACT', href: '/contact' },
];

export const FroxenOffCanvasMenu: React.FC<FroxenOffCanvasMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#060607]/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto px-6 md:px-16 py-8"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <span className="font-display text-2xl font-black tracking-wider text-white">
                ĀROHANA
              </span>
              <span className="text-[10px] font-mono tracking-widest text-froxen-lime border border-froxen-lime/30 px-2 py-0.5 rounded-full uppercase">
                STUDIO
              </span>
            </Link>

            <button
              onClick={onClose}
              className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Close menu"
            >
              <span className="text-xs font-mono uppercase tracking-widest group-hover:text-froxen-lime transition-colors">
                CLOSE
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-froxen-lime/50 transition-colors">
                <svg
                  className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </button>
          </div>

          {/* Main Grid: Nav Links (Left) + Studio Info (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 items-center flex-1">
            {/* Nav Links Column */}
            <div className="lg:col-span-7 flex flex-col gap-2">
              {MENU_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 md:gap-8 py-2 border-b border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <span className="font-mono text-xs md:text-sm text-neutral-500 group-hover:text-froxen-lime transition-colors">
                      {item.index}
                    </span>
                    <span className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white group-hover:text-froxen-lime group-hover:translate-x-3 transition-all duration-300">
                      {item.title}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-froxen-lime text-2xl">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Studio Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10 lg:pl-12 lg:border-l lg:border-white/10">
              {/* Availability Box */}
              <div className="froxen-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="pulse-dot" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                    Available for new projects
                  </span>
                </div>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  We partner with ambitious founders and organizations looking for strategic clarity, high-craft brand design, and on-ground execution.
                </p>
                <FroxenButton href="/contact" onClick={onClose} variant="primary">
                  Start a Conversation
                </FroxenButton>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:founder@byarohana.com"
                    className="text-neutral-200 hover:text-froxen-lime transition-colors font-medium"
                  >
                    founder@byarohana.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+918380092241"
                    className="text-neutral-200 hover:text-froxen-lime transition-colors font-medium"
                  >
                    +91 8380092241
                  </a>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Locations
                  </p>
                  <p className="text-neutral-300">Goa · Ladakh · Mumbai</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Speciality
                  </p>
                  <p className="text-neutral-300">Brand, Hospitality & Production</p>
                </div>
              </div>

              {/* Socials */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-froxen-lime transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-froxen-lime transition-colors"
                  >
                    INSTAGRAM ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer inside menu */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-3">
            <div>© 2026 ĀROHANA CONSULTANCY</div>
            <div>STRATEGY-LED CREATIVITY &amp; EXECUTION</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FroxenOffCanvasMenu;
