"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";
import { SculpturalObject } from "@/components/hero-3d/SculpturalObject";

function Final3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Subtle serene lighting
    const ambient = new THREE.AmbientLight(0x0a1220, 1.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xf5efe6, 2.0);
    key.position.set(3, 4, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xc5a46d, 2.2);
    rim.position.set(-3, 2, -3);
    scene.add(rim);

    // Reuse the authentic Sculptural Brand Object in a calmer state
    const sculpture = new SculpturalObject();
    sculpture.group.scale.set(0.9, 0.9, 0.9);
    scene.add(sculpture.group);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      // Gentle, serene rotation
      sculpture.update(delta * 0.6, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      sculpture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
}

export default function Final3DCTA() {
  return (
    <section
      className="relative w-full min-h-[85vh] py-32 sm:py-44 bg-[#050811] text-white border-t border-white/[0.08] overflow-hidden flex flex-col justify-between items-center text-center select-none"
      aria-label="Final Call to Action"
    >
      {/* 3D WebGL Background Callback to Hero Object */}
      <Final3DCanvas />

      {/* Top Telemetry */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A46D] uppercase">
          03 // INITIATE COLLABORATION
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          CURRENTLY ACCEPTING SELECT ENGAGEMENTS
        </span>
      </div>

      {/* Center Monumental Closing Statement */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 my-auto py-12 flex flex-col items-center space-y-8">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.32em] text-[#C5A46D] uppercase">
          DIRECT ENGAGEMENT · NO INTERMEDIARIES
        </span>

        <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-normal uppercase tracking-tight text-white leading-[0.98]">
          IF YOU&apos;RE BUILDING <br />
          SOMETHING SERIOUS, <br />
          <span className="text-white/45">LET&apos;S TALK.</span>
        </h2>

        <p className="font-mono text-xs sm:text-base text-white/70 max-w-xl leading-relaxed">
          We work directly with founders, executive leadership, and institutional decision-makers who value strategic rigor and ground execution.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#C5A46D] bg-[#C5A46D] text-[#070B14] font-mono text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase hover:bg-transparent hover:text-white transition-all duration-300 shadow-2xl"
          >
            <span>Start a conversation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="mailto:hello@arohana.co.in"
            className="font-mono text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase px-6 py-4"
          >
            hello@arohana.co.in
          </a>
        </div>
      </div>

      {/* Bottom Coordinates */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
        <span>[ 16°41&apos;N 74°14&apos;E ]</span>
        <span>ĀROHANA CONSULTANCY // CLOSING 3D LOOP</span>
        <span>EST. 2020</span>
      </div>
    </section>
  );
}
