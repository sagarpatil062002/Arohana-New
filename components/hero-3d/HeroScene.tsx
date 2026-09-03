"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SculpturalObject } from "./SculpturalObject";
import { HeroLighting } from "./HeroLighting";
import { HeroCamera } from "./HeroCamera";

interface HeroSceneProps {
  progress: number;
  mouseX: number;
  mouseY: number;
}

export default function HeroScene({ progress, mouseX, mouseY }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ progress, mouseX, mouseY });

  useEffect(() => {
    propsRef.current = { progress, mouseX, mouseY };
  }, [progress, mouseX, mouseY]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050811, 0.08);

    // Camera
    const heroCamera = new HeroCamera(width, height, isMobile);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting
    const lighting = new HeroLighting();
    scene.add(lighting.group);

    // Sculptural Brand Object
    const sculpture = new SculpturalObject();
    scene.add(sculpture.group);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const { progress: currentProgress, mouseX: currentMouseX, mouseY: currentMouseY } = propsRef.current;

      // Update camera trajectory & parallax
      heroCamera.update(currentProgress, currentMouseX, currentMouseY, delta);

      // Update sculpture rotations & animations
      sculpture.update(delta, currentMouseX, currentMouseY);

      // Update dynamic light position
      lighting.update(currentMouseX, currentMouseY);

      renderer.render(scene, heroCamera.camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const mobile = newWidth < 768;

      heroCamera.updateAspect(newWidth, newHeight, mobile);
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      sculpture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
