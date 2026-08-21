"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion, useIsMobile } from "@/hooks/useMedia";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Subtle magnetic pull toward the cursor for primary CTAs. Desktop only. */
export default function MagneticButton({
  href,
  children,
  className,
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || mobile || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const mx = Math.max(-10, Math.min(10, x * strength));
    const my = Math.max(-10, Math.min(10, y * strength));
    ref.current.style.transform = `translate(${mx}px, ${my}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="cta"
    >
      {children}
    </a>
  );
}
