'use client';

import React from 'react';

export interface CmsToggleProps {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Standardized Ārohana CMS Enable/Disable Toggle Control.
 * Used uniformly across all pages, sections, repeatables, media, and features.
 *
 * Visual Pattern:
 *   [ ● Enabled ]   (Green dot, green text, soft green tint)
 *   [ ● Disabled ]  (Neutral dot, muted text, soft neutral tint)
 */
export default function CmsToggle({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
  className = '',
  style = {},
  id,
}: CmsToggleProps) {
  const isChecked = Boolean(checked);

  // Responsive sizing configurations
  const sizeStyles = {
    sm: {
      padding: '0.25rem 0.55rem',
      fontSize: '0.72rem',
      dotSize: 6,
      gap: '0.35rem',
    },
    md: {
      padding: '0.38rem 0.75rem',
      fontSize: '0.78rem',
      dotSize: 7,
      gap: '0.45rem',
    },
    lg: {
      padding: '0.5rem 1rem',
      fontSize: '0.85rem',
      dotSize: 8,
      gap: '0.55rem',
    },
  }[size];

  const currentStyles = isChecked
    ? {
        backgroundColor: '#F0FDF4',
        border: '1px solid #86EFAC',
        color: '#15803D',
        dotColor: '#16A34A',
        dotShadow: '0 0 0 3px rgba(34, 197, 94, 0.25)',
      }
    : {
        backgroundColor: '#F4F4F5',
        border: '1px solid #E4E4E7',
        color: '#71717A',
        dotColor: '#A1A1AA',
        dotShadow: 'none',
      };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        ...style,
      }}
      className={className}
    >
      {label && (
        <span
          style={{
            fontSize: sizeStyles.fontSize,
            fontWeight: 600,
            color: '#3F3F46',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label ? `${label} (${isChecked ? 'Enabled' : 'Disabled'})` : isChecked ? 'Enabled' : 'Disabled'}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onChange(!isChecked);
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: sizeStyles.gap,
          padding: sizeStyles.padding,
          borderRadius: '9999px',
          border: currentStyles.border,
          backgroundColor: currentStyles.backgroundColor,
          color: currentStyles.color,
          fontSize: sizeStyles.fontSize,
          fontWeight: 650,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.18s ease-in-out',
          userSelect: 'none',
          outline: 'none',
          boxShadow: isChecked
            ? '0 1px 2px rgba(22, 163, 74, 0.12)'
            : '0 1px 2px rgba(0, 0, 0, 0.04)',
          opacity: disabled ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'translateY(-0.5px)';
            e.currentTarget.style.filter = 'brightness(0.97)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.filter = 'none';
          }
        }}
      >
        <span
          style={{
            width: sizeStyles.dotSize,
            height: sizeStyles.dotSize,
            borderRadius: '50%',
            backgroundColor: currentStyles.dotColor,
            boxShadow: currentStyles.dotShadow,
            display: 'inline-block',
            transition: 'background-color 0.18s ease, box-shadow 0.18s ease',
            flexShrink: 0,
          }}
        />
        <span style={{ letterSpacing: '0.01em' }}>
          {isChecked ? 'Enabled' : 'Disabled'}
        </span>
      </button>
    </div>
  );
}
