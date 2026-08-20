"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number; // ms
  once?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 * Subtle fade + upward movement when the element enters the viewport.
 * Honors prefers-reduced-motion (see globals.css). If JS is unavailable the
 * `.js` class is never added, so content stays visible.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const cls = [className, visible ? "is-visible" : ""].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={cls}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
