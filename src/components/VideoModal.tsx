"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#0a0a0e] border border-white/20 rounded-sm overflow-hidden shadow-2xl">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#050505]">
          <div className="text-xs font-mono text-text-muted uppercase tracking-widest">
            ĀROHANA STRATEGIC REEL // OUR APPROACH
          </div>
          <button
            onClick={onClose}
            className="text-white hover:opacity-75 transition-opacity"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video simulation preview */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <Image
            src="/assets/raysons.jpg"
            alt="Strategic Film Reel"
            fill
            className="object-cover opacity-70 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-mono tracking-widest text-emerald-400 mb-2 uppercase">
              ● EDITORIAL FILM ARCHIVE
            </span>
            <h3 className="font-display text-2xl md:text-4xl text-white uppercase mb-2">
              From whiteboard strategy to on-ground reality
            </h3>
            <p className="text-sm text-text-secondary max-w-xl font-sans">
              Capturing the commercial rigor, hospitality machinery, and high-altitude institutional discipline behind Ārohana's client engagements.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
