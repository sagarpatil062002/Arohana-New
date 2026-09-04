import React from 'react';

interface TagPillProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'red' | 'subtle' | 'heroGlass' | 'heroAccent';
  className?: string;
  withIcon?: boolean;
}

export function TagPill({
  children,
  variant = 'dark',
  className = '',
  withIcon = true,
}: TagPillProps) {
  const variantStyles = {
    dark: 'bg-white/95 backdrop-blur-md border-stodio-border text-stodio-dark hover:border-stodio-red/50 shadow-sm font-bold',
    light: 'bg-stodio-surface border-stodio-border text-stodio-dark hover:border-stodio-red/50 font-semibold',
    red: 'bg-stodio-red/10 border-stodio-red/30 text-stodio-red font-bold',
    subtle: 'bg-stodio-surface border-stodio-borderSubtle text-stodio-dark font-medium',
    heroGlass: 'bg-black/60 backdrop-blur-md border-white/20 text-white font-semibold shadow-md',
    heroAccent: 'bg-black/60 backdrop-blur-md border-white/20 text-[#FF5A43] font-semibold shadow-md',
  };

  const isHero = variant === 'heroGlass' || variant === 'heroAccent';

  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-sans uppercase tracking-[0.05em] min-w-0 max-w-full transition-colors duration-300 ${variantStyles[variant]} ${className}`}
    >
      {withIcon && (
        <svg
          className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 2.5H3.75C3.06 2.5 2.5 3.06 2.5 3.75V16.25C2.5 16.94 3.06 17.5 3.75 17.5H16.25C16.94 17.5 17.5 16.94 17.5 16.25V3.75C17.5 3.06 16.94 2.5 16.25 2.5ZM13.125 10.625H10.625V13.125C10.625 13.47 10.345 13.75 10 13.75C9.655 13.75 9.375 13.47 9.375 13.125V10.625H6.875C6.53 10.625 6.25 10.345 6.25 10C6.25 9.655 6.53 9.375 6.875 9.375H9.375V6.875C9.375 6.53 9.655 6.25 10 6.25C10.345 6.25 10.625 6.53 10.625 6.875V9.375H13.125C13.47 9.375 13.75 9.655 13.75 10C13.75 10.345 13.47 10.625 13.125 10.625Z"
            fill={isHero ? '#FF5A43' : '#DE322D'}
          />
        </svg>
      )}
      <span className="truncate block">{children}</span>
    </div>
  );
}
