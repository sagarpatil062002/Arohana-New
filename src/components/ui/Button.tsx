'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'red' | 'white' | 'dark' | 'ghost' | 'nav';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow' | 'upRight' | 'dot' | 'none';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
  avatarImg?: string;
}

export function Button({
  children,
  href,
  variant = 'red',
  size = 'md',
  icon = 'arrow',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
  avatarImg,
}: ButtonProps) {
  const variantStyles = {
    red: 'bg-stodio-red text-white hover:bg-stodio-redHover shadow-glow border border-stodio-red/30',
    white: 'bg-white text-stodio-white hover:bg-stodio-surface border border-stodio-border font-semibold shadow-sm',
    dark: 'bg-[#0A0A0A] border border-[#0A0A0A] text-white hover:border-stodio-red hover:bg-[#1C1C1C] shadow-sm',
    ghost: 'bg-transparent border border-stodio-border text-stodio-white hover:bg-stodio-surface hover:border-stodio-red',
    nav: 'bg-white border border-stodio-border text-stodio-white hover:border-stodio-red hover:bg-stodio-surface shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-medium',
  };

  const content = (
    <span className="flex items-center gap-2.5">
      {avatarImg && (
        <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-stodio-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" />
        </span>
      )}
      {icon === 'dot' && (
        <span className="w-2 h-2 rounded-full bg-stodio-red animate-pulse flex-shrink-0" />
      )}

      <span className="font-medium tracking-tight whitespace-nowrap">
        {children}
      </span>

      {icon === 'arrow' && (
        <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 ease-editorial group-hover:translate-x-1.5 flex-shrink-0" />
      )}
      {icon === 'upRight' && (
        <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
      )}
    </span>
  );

  const baseClasses = `group relative inline-flex items-center justify-center rounded-full hover:rounded-2xl transition-all duration-300 ease-editorial active:scale-[0.98] font-sans cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </button>
  );
}
