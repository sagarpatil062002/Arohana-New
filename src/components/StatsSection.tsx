"use client";

import { AROHANA_CONTENT } from "@/data/content";

export default function StatsSection() {
  const { stats } = AROHANA_CONTENT;

  return (
    <section className="bg-[#050505] text-white py-20 md:py-28 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* 4 Large Numbers Separated by Thin Vertical Dividers (Figma Specification) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-white/10">
          
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center ${
                idx === 0
                  ? "lg:pr-10"
                  : idx === stats.length - 1
                  ? "lg:pl-10 pt-6 lg:pt-0"
                  : "lg:px-10 pt-6 lg:pt-0"
              }`}
            >
              <div className="font-display text-[56px] sm:text-[68px] md:text-[80px] lg:text-[90px] leading-none text-white mb-2">
                {stat.number}
              </div>
              <div className="font-display text-lg sm:text-xl text-white tracking-wider uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-xs font-mono text-text-muted">
                {stat.sub}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
