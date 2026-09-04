'use strict';
'use client';

import React from 'react';
import Link from 'next/link';

interface FroxenButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'lime';
  className?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export const FroxenButton: React.FC<FroxenButtonProps> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  showArrow = true,
  type = 'button',
  target,
  rel,
}) => {
  const variantClass =
    variant === 'lime'
      ? 'froxen-button-lime'
      : variant === 'outline'
      ? 'froxen-button-outline'
      : 'froxen-button-primary';

  const content = (
    <span className="inline-flex items-center gap-2">
      <span className="button-text-roll">
        <span className="button-text-top">{children}</span>
        <span className="button-text-bottom text-inherit font-semibold">{children}</span>
      </span>
      {showArrow && (
        <svg
          className="froxen-arrow w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={`froxen-button ${variantClass} ${className}`}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`froxen-button ${variantClass} ${className}`}
    >
      {content}
    </button>
  );
};

export default FroxenButton;
