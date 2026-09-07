'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TEAM_STRUCTURE_CONTENT } from '@/data/services-content';
import SectionBand from '@/components/services/SectionBand';

const NODES: Array<{
  id: string;
  label: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  textX: number;
  textY: number;
}> = [
  { id: 'strategy', label: 'STRATEGY', x: 132, y: 126, anchor: 'start', textX: 146, textY: 131 },
  { id: 'creative', label: 'CREATIVE', x: 508, y: 126, anchor: 'end', textX: 494, textY: 131 },
  { id: 'design', label: 'DESIGN', x: 522, y: 396, anchor: 'start', textX: 536, textY: 401 },
  { id: 'production', label: 'PRODUCTION', x: 150, y: 440, anchor: 'end', textX: 136, textY: 445 },
  { id: 'tech', label: 'TECH & ANALYTICS', x: 320, y: 486, anchor: 'middle', textX: 320, textY: 505 },
];

const CENTER = { x: 320, y: 262, r: 78 };

export default function TeamStructure() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('.svc-diagram line', { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to('.svc-diagram line', {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.06,
        scrollTrigger: { trigger: '.svc-diagram', start: 'top 80%', once: true },
      });

      gsap.fromTo(
        '.svc-diagram circle[data-node], .svc-diagram-list',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: '.svc-diagram', start: 'top 80%', once: true },
        }
      );

      gsap.fromTo(
        '.svc-diagram text',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.06,
          scrollTrigger: { trigger: '.svc-diagram', start: 'top 80%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="svc-section">
      <div className="padding-global container-large">
        <SectionBand
          index="05"
          eyebrow={TEAM_STRUCTURE_CONTENT.eyebrow}
          meta="bespoke teams"
        />

        <div className="svc-team-grid">
          {/* Left — copy */}
          <div className="svc-team-copy">
            <h2 className="svc-sect-title">{TEAM_STRUCTURE_CONTENT.title}</h2>
            <p>{TEAM_STRUCTURE_CONTENT.content}</p>
            <div className="svc-team-tag">{TEAM_STRUCTURE_CONTENT.tagline}</div>
          </div>

          {/* Right — strategic map */}
          <div
            className="svc-diagram"
            role="img"
            aria-label="Specialists are assembled around your brief across strategy, creative, design, production and tech"
          >
            <span className="svc-fig-label">FIG. 05 — TEAM MAP</span>
            <svg viewBox="0 0 640 560" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="320"
                cy="262"
                r="240"
                fill="none"
                stroke="#171717"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              {NODES.map((node) => (
                <line
                  key={`line-${node.id}`}
                  pathLength={1}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="#171717"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
              ))}
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={CENTER.r}
                fill="none"
                stroke="#171717"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              <circle
                cx={CENTER.x}
                cy={CENTER.y - CENTER.r}
                r="4"
                fill="#DE322D"
              />
              <text
                x={CENTER.x}
                y={CENTER.y - 12}
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                letterSpacing="4"
                fill="#171717"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                YOUR
              </text>
              <text
                x={CENTER.x}
                y={CENTER.y + 18}
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                letterSpacing="4"
                fill="#171717"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                BRIEF
              </text>
              {NODES.map((node) => (
                <circle key={`dot-${node.id}`} data-node="" cx={node.x} cy={node.y} r="4" fill="#DE322D" />
              ))}
              {NODES.map((node) => (
                <text
                  key={`label-${node.id}`}
                  x={node.textX}
                  y={node.textY}
                  textAnchor={node.anchor}
                  fontSize="13"
                  fontWeight="500"
                  letterSpacing="2"
                  fill="#5F5D58"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {node.label}
                </text>
              ))}
            </svg>

            {/* Mobile-friendly simplification */}
            <div className="svc-diagram-list">
              <div className="svc-diagram-list-center">
                <i aria-hidden="true" />
                Your Brief
              </div>
              {NODES.map((node) => (
                <div className="svc-diagram-list-item" key={node.id}>
                  <i aria-hidden="true" />
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}