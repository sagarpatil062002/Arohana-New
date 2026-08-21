"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import ErrorBoundary from "./ErrorBoundary";
import { useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import styles from "./BrandObject.module.css";

const ArchitecturalForm = dynamic(
  () => import("./three/ArchitecturalForm"),
  { ssr: false }
);

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function BrandObject() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  const show3D = !reduced && webgl;

  return (
    <section className="section" aria-labelledby="brand-object-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <Reveal as="p" className="eyebrow">
              How we think
            </Reveal>
            <Reveal as="h2" id="brand-object-heading" className={styles.headline} delay={80}>
              Structure, strategy and execution —<br />connected.
            </Reveal>
            <Reveal as="p" className={styles.body} delay={150}>
              Ārohana works where commercial context, sector understanding and
              creative execution meet — taking an idea through to something built.
            </Reveal>
          </div>

          <Reveal className={styles.stage} delay={120}>
            <div className={styles.panel} aria-hidden={show3D}>
              {show3D ? (
                <ErrorBoundary
                  fallback={
                    <div className={styles.fallback}>
                      <span className={styles.mark}>Ā</span>
                    </div>
                  }
                >
                  <ArchitecturalForm />
                </ErrorBoundary>
              ) : (
                // Static, lightweight fallback (mobile / reduced-motion / no WebGL)
                <div className={styles.fallback}>
                  <span className={styles.mark}>Ā</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
