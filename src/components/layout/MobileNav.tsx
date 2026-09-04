'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { MAIN_NAVIGATION, SITE_METADATA } from '@/data/navigation';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white/98 backdrop-blur-2xl transition-opacity duration-300 ease-editorial animate-fadeIn">
      {/* Header Bar */}
      <div className="p-6 flex items-center justify-between border-b border-stodio-border">
        <Link href="/" onClick={onClose} className="flex items-center select-none py-1 hover:opacity-85 transition-opacity">
          <Image
            src="/images/arohana-logo.png"
            alt="Ārohana Consultancy"
            width={130}
            height={26}
            className="h-5 sm:h-6 w-auto max-h-6 max-w-[125px] object-contain"
          />
        </Link>

        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="p-2 rounded-full border border-stodio-border bg-white text-stodio-white hover:border-stodio-red active:scale-95 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
        <div className="text-[10px] font-mono text-stodio-subtle uppercase tracking-widest mb-4">
          Navigation Index
        </div>

        {MAIN_NAVIGATION.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              className={`p-4 rounded-2xl flex items-center justify-between transition-all duration-300 ease-editorial active:scale-[0.99] ${
                isActive
                  ? 'bg-stodio-surface border border-stodio-red text-stodio-white font-semibold shadow-sm'
                  : 'bg-stodio-surface/50 border border-stodio-border text-stodio-muted hover:text-stodio-white hover:bg-stodio-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-stodio-red">
                  0{index + 1}
                </span>
                <span className="text-lg font-medium tracking-tight">
                  {item.label}
                </span>
              </div>

              {item.number && (
                <span className="text-xs font-mono text-stodio-red">
                  [{item.number}]
                </span>
              )}
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stodio-red/10 text-stodio-red border border-stodio-red/30 font-mono">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-stodio-border bg-stodio-surface/40 space-y-4">
        <div className="space-y-2 text-xs text-stodio-muted">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-stodio-red" />
            <a href={`mailto:${SITE_METADATA.contact.email}`} className="hover:text-stodio-red transition-colors">
              {SITE_METADATA.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-stodio-red" />
            <a href={`tel:${SITE_METADATA.contact.phone}`} className="hover:text-stodio-red transition-colors">
              {SITE_METADATA.contact.displayPhone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-stodio-red" />
            <span>{SITE_METADATA.contact.presence}</span>
          </div>
        </div>

        <Button
          href="/contact"
          variant="red"
          size="md"
          className="w-full"
          onClick={onClose}
        >
          Start a Conversation
        </Button>
      </div>
    </div>
  );
}
