"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function SpatialPlanesCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Studio lighting
    const ambient = new THREE.AmbientLight(0x0e1726, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf5efe6, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a46d, 2.0);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // 3 Dimensional Intersecting Planes (Business → Brand → Experience)
    const group = new THREE.Group();
    scene.add(group);

    const planeGeo = new THREE.BoxGeometry(1.6, 1.1, 0.02);

    // Plane 1: Business (Deep Titanium Navy)
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x0e1c2e,
      metalness: 0.9,
      roughness: 0.22
    });
    const plane1 = new THREE.Mesh(planeGeo, mat1);
    plane1.position.set(-0.25, 0.3, -0.2);
    plane1.rotation.set(0.2, 0.4, 0.1);
    group.add(plane1);

    // Plane 2: Brand (Sleek Obsidian with Gold Edge Trim)
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0x18283d,
      metalness: 0.85,
      roughness: 0.28
    });
    const plane2 = new THREE.Mesh(planeGeo, mat2);
    plane2.position.set(0.2, -0.15, 0.1);
    plane2.rotation.set(-0.3, -0.3, 0.2);
    group.add(plane2);

    // Plane 3: Experience (Warm Champagne Bronze)
    const mat3 = new THREE.MeshStandardMaterial({
      color: 0xc5a46d,
      metalness: 0.94,
      roughness: 0.18
    });
    const plane3 = new THREE.Mesh(planeGeo, mat3);
    plane3.position.set(0.0, 0.05, 0.35);
    plane3.scale.set(0.85, 0.85, 1);
    plane3.rotation.set(0.4, -0.2, -0.15);
    group.add(plane3);

    // Precision boundary frame line
    const wireGeo = new THREE.EdgesGeometry(planeGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0xe5cda7, transparent: true, opacity: 0.4 });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    plane3.add(wire);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      group.rotation.y += delta * 0.18;
      group.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      planeGeo.dispose();
      wireGeo.dispose();
      mat1.dispose();
      mat2.dispose();
      mat3.dispose();
      wireMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[300px] sm:min-h-[380px]" />;
}

export default function PositioningSection() {
  return (
    <section
      className="relative w-full py-28 sm:py-36 md:py-44 bg-[#070B14] text-white overflow-hidden"
      aria-label="Ārohana Strategic Positioning"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Monumental Editorial Statement */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#C5A46D] uppercase">
              POSITIONING // STRATEGIC DISCIPLINE
            </span>
          </div>

          <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-[-0.02em] text-white">
            Some businesses need better marketing.
            <span className="block text-white/45 mt-2 sm:mt-3">
              Others need a better way of thinking about the business itself.
            </span>
          </h2>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/[0.08]">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A46D] uppercase block mb-2">
                THE INTERSECTION
              </span>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                Ārohana operates at the convergence of commercial strategy, creative architecture, and boots-on-the-ground operational execution. We don’t separate brand perception from balance sheet unit economics.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A46D] uppercase block mb-2">
                THE REALITY
              </span>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                Whether restructuring a multi-entity industrial group, launching a high-altitude cinema network in Ladakh, or auditing restaurant kitchen margins, our work produces verified, repeatable outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Subtle 3D Spatial Geometry Element */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-square max-w-[380px] rounded-none border border-white/[0.08] bg-[#0A101C]/60 backdrop-blur-sm overflow-hidden flex items-center justify-center group shadow-2xl">
            {/* Corner Precision Marks */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/30 pointer-events-none" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/30 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/30 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/30 pointer-events-none" />

            <SpatialPlanesCanvas />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-[0.22em] text-white/40 uppercase pointer-events-none">
              <span>BUSINESS · BRAND · EXPERIENCE</span>
              <span>3D SPATIAL</span>
            </div>
          </div>

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mt-3">
            DIMENSIONAL AXIS // FIG. 01
          </span>
        </div>
      </div>
    </section>
  );
}
