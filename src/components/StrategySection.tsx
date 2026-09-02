"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

interface StrategySectionProps {
  onOpenVideo?: () => void;
}

export default function StrategySection({ onOpenVideo }: StrategySectionProps) {
  const { pointOfView } = AROHANA_MASTER_CONTENT;

  return (
    <section className="bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-10 md:mb-16">
          <div className="section-indicator-line text-black/80">
            <span>01. A POINT OF VIEW</span>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Positioning Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <h2 className="font-display font-display-section text-[38px] sm:text-[52px] md:text-[66px] lg:text-[76px] text-black mb-8 leading-[1.02]">
              {pointOfView.statement}
            </h2>

            <p className="text-[16px] md:text-[18px] text-black/80 leading-relaxed font-sans max-w-[540px] mb-8">
              {pointOfView.explanation}
            </p>

            <div className="pt-6 border-t border-black/10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-black/60 uppercase">
              <div>// COMMERCIAL CONTEXT</div>
              <div>// SECTOR UNDERSTANDING</div>
              <div>// DISCIPLINED EXECUTION</div>
            </div>

          </div>

          {/* Right Column: Large Editorial Image of Madhura On-Ground in Ladakh */}
          <div className="lg:col-span-6">
            <div
              onClick={onOpenVideo}
              role="button"
              tabIndex={0}
              className="group relative w-full aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 overflow-hidden cursor-pointer rounded-sm shadow-xl"
            >
              <Image
                src="/assets/founder_madhura.jpg"
                alt="Madhura Hawal on-ground strategic direction"
                fill
                className="object-cover img-editorial opacity-95"
              />
              
              {/* Soft Dark Vignette */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />

              {/* Center Circular Play / Perspective Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-[#FE320A] group-hover:text-white transition-all duration-300">
                  <Play className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                </div>
              </div>

              {/* Bottom Right Label */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 border border-white/20">
                OUR APPROACH
              </div>

              {/* Bottom Left Caption */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white/90 text-[10px] font-mono tracking-wider uppercase max-w-xs bg-black/60 backdrop-blur-sm p-1 px-2">
                MADHURA HAWAL // ON-GROUND STRATEGIC DIRECTION
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
