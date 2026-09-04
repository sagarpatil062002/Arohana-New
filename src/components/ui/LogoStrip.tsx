'use client';

import React from 'react';
import { useCmsStore } from '@/lib/cmsStore';
import { SEED_CLIENT_LOGOS } from '@/data/seed-cms';
import { AmbientTicker } from '@/components/motion/AmbientTicker';

export function LogoStrip() {
  const { clientLogos } = useCmsStore();

  const list = Array.isArray(clientLogos) && clientLogos.length > 0 ? clientLogos : SEED_CLIENT_LOGOS;
  const approvedLogos = list.filter((l) => l.isPublicApproved);
  const displayList = approvedLogos.length > 0 ? approvedLogos : list;

  return (
    <div className="w-full py-10 sm:py-14 md:py-16 border-y border-stodio-dashed border-stodio-border bg-stodio-bg relative overflow-hidden text-left">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
        {/* Intro Ticker Lead with Rotating Star Icon */}
        <div className="flex items-center gap-3.5 flex-shrink-0 z-10 bg-stodio-bg pr-4">
          <div className="w-8 h-8 rounded-full border border-stodio-border bg-stodio-card flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg
              className="w-4 h-4 text-stodio-red animate-spinSlow"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.74 13.28C22.27 9.23 21.77 4.96 21.77 0H26.23C26.23 4.91 25.73 9.18 25.26 13.23C24.88 16.53 24.51 19.69 24.44 22.94C26.68 20.6 28.64 18.13 30.69 15.54C33.21 12.34 35.89 8.96 39.39 5.45L42.55 8.61C39.08 12.08 35.71 14.74 32.51 17.28C29.9 19.34 27.4 21.31 25.06 23.56C28.29 23.49 31.43 23.13 34.71 22.74C38.76 22.27 43.04 21.77 48 21.77V26.23C43.09 26.23 38.82 25.73 34.77 25.26C31.46 24.88 28.31 24.51 25.06 24.44C27.39 26.68 29.87 28.63 32.46 30.68C35.66 33.21 39.04 35.88 42.55 39.39L39.39 42.55C35.92 39.08 33.26 35.71 30.72 32.51C28.65 29.89 26.68 27.4 24.44 25.06C24.51 28.31 24.88 31.47 25.26 34.77C25.73 38.82 26.23 43.09 26.23 48H21.77C21.77 43.04 22.27 38.76 22.74 34.71C23.13 31.43 23.49 28.29 23.56 25.06C21.32 27.4 19.35 29.89 17.29 32.49C14.74 35.71 12.08 39.08 8.61 42.55L5.45 39.39C8.96 35.88 12.34 33.21 15.54 30.69C18.13 28.63 20.61 26.68 22.94 24.44C19.69 24.51 16.53 24.88 13.23 25.26C9.18 25.73 4.91 26.23 0 26.23V21.77C4.96 21.77 9.24 22.27 13.29 22.74C16.57 23.13 19.71 23.49 22.94 23.56C20.6 21.31 18.1 19.34 15.49 17.28C12.29 14.74 8.92 12.08 5.45 8.61L8.61 5.45C12.11 8.96 14.79 12.34 17.31 15.54C19.36 18.13 21.32 20.6 23.56 22.94C23.49 19.71 23.13 16.57 22.74 13.29Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-stodio-white font-semibold whitespace-nowrap">
            Brands and organisations we’ve worked with
          </span>
        </div>

        {/* Scrolling Ticker Stream with 70s linear infinite duration and soft glide on hover */}
        <div className="relative flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <AmbientTicker speed={70} pauseOnHover={true}>
            {displayList.map((brand, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer flex-shrink-0">
                <span className="text-sm font-medium tracking-tight text-stodio-muted group-hover:text-stodio-white transition-colors duration-300 whitespace-nowrap">
                  {brand.brandName}
                </span>
                {brand.sector && (
                  <span className="text-[10px] font-mono text-stodio-subtle uppercase px-2.5 py-0.5 rounded-full border border-stodio-border group-hover:border-stodio-red/40 group-hover:text-stodio-red transition-colors whitespace-nowrap">
                    {brand.sector}
                  </span>
                )}
                <span className="text-stodio-red font-mono text-xs select-none">/</span>
              </div>
            ))}
          </AmbientTicker>
        </div>
      </div>
    </div>
  );
}


