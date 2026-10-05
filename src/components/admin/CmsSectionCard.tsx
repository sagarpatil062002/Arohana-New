'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import CmsToggle from './CmsToggle';

export interface CmsSectionCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  enabled: boolean;
  onToggleEnabled: (nextEnabled: boolean) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onDelete?: () => void;
  canDelete?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  headerRightExtra?: React.ReactNode;
}

/**
 * Standardized Section Card for Ārohana Admin CRM.
 * Used uniformly for Home sections, Army sections, Work sections,
 * Services, About, Tourin, and repeatability items.
 */
export default function CmsSectionCard({
  id,
  title,
  subtitle,
  badge,
  enabled,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  onDelete,
  canDelete = false,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  defaultCollapsed = false,
  children,
  style = {},
  className = '',
  headerRightExtra,
}: CmsSectionCardProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  return (
    <div
      id={id}
      className={`cms-section-card ${className}`}
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
    >
      {/* ── Section Card Header ── */}
      <div
        style={{
          padding: '0.85rem 1.15rem',
          backgroundColor: '#FAFAFB',
          borderBottom: isCollapsed ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          userSelect: 'none',
        }}
      >
        {/* Left: Collapsible toggle + Title / Badges */}
        <div
          onClick={handleToggleCollapse}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flex: 1,
            minWidth: 0,
            cursor: 'pointer',
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleCollapse();
            }}
            aria-label={isCollapsed ? `Expand ${title}` : `Collapse ${title}`}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#71717A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              borderRadius: '4px',
              transition: 'color 0.15s ease',
            }}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: '#111113',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {badge}
                </span>
              )}
              <h4
                style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  fontWeight: 650,
                  color: '#111113',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </h4>
            </div>
            {subtitle && (
              <p
                style={{
                  margin: '0.15rem 0 0 0',
                  fontSize: '0.72rem',
                  color: '#71717A',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions (Uniform CmsToggle, Reorder buttons, Optional Extra, Delete) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          {headerRightExtra}

          {/* Standardized CmsToggle */}
          <CmsToggle
            checked={enabled}
            onChange={onToggleEnabled}
            size="sm"
          />

          {/* Reordering Controls: Move Up */}
          {onMoveUp && (
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={(e) => {
                e.stopPropagation();
                if (canMoveUp) onMoveUp();
              }}
              title="Move section up"
              aria-label="Move section up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: canMoveUp ? '#FFFFFF' : '#F4F4F5',
                color: canMoveUp ? '#27272A' : '#D4D4D8',
                cursor: canMoveUp ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
              }}
            >
              <ArrowUp size={13} />
            </button>
          )}

          {/* Reordering Controls: Move Down */}
          {onMoveDown && (
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={(e) => {
                e.stopPropagation();
                if (canMoveDown) onMoveDown();
              }}
              title="Move section down"
              aria-label="Move section down"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: canMoveDown ? '#FFFFFF' : '#F4F4F5',
                color: canMoveDown ? '#27272A' : '#D4D4D8',
                cursor: canMoveDown ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
              }}
            >
              <ArrowDown size={13} />
            </button>
          )}

          {/* Optional Delete Control */}
          {canDelete && onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete section"
              aria-label="Delete section"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── Section Card Body (Collapsible, Preserves Form State) ── */}
      {!isCollapsed && (
        <div
          style={{
            padding: '1.25rem 1.35rem',
            backgroundColor: '#FFFFFF',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
