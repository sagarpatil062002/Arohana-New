"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroObject() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Dimensions
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Sculpture: Interlocking Torus Knot (Polished Chrome / Gold)
    const isMobile = window.innerWidth < 768;
    const tubularSegments = isMobile ? 90 : 180;
    const radialSegments = isMobile ? 28 : 56;

    const knotGeometry = new THREE.TorusKnotGeometry(
      1.15,
      0.35,
      tubularSegments,
      radialSegments,
      2,
      3
    );

    // High luxury gold metal shader matching Figma screen 02
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.94,
      roughness: 0.16,
      envMapIntensity: 1.4
    });

    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knotMesh);

    // 2. Inner Orbiting Ring (Transformation / Execution)
    const ringGeometry = new THREE.TorusGeometry(1.68, 0.035, 16, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5A46D,
      metalness: 0.96,
      roughness: 0.15
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 3. Second Slanted Ring (Navy / Dark Metallic Anchor)
    const ring2Geometry = new THREE.TorusGeometry(1.8, 0.025, 16, 120);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: 0x4A6B82,
      metalness: 0.9,
      roughness: 0.25
    });
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2Mesh.rotation.y = Math.PI / 3.5;
    group.add(ring2Mesh);

    // 4. Subtle Golden Floating Ember Particles
    const particlesCount = 45;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.0;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xE8C87A,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlePoints);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x0D1524, 2.8);
    scene.add(ambientLight);

    // Key Light (Warm Gold luster)
    const keyLight = new THREE.DirectionalLight(0xFFF2D1, 4.2);
    keyLight.position.set(4.5, 5, 4);
    scene.add(keyLight);

    // Navy Accent Light
    const fillLight = new THREE.DirectionalLight(0x28487A, 3.2);
    fillLight.position.set(-4, -2.5, 2.5);
    scene.add(fillLight);

    // Sharp White Rim Light
    const rimLight = new THREE.PointLight(0xFFFFFF, 3.8, 12);
    rimLight.position.set(0, 3.5, -3);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.7;
      mouseY = y * 0.7;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        group.rotation.y += 0.0035;
        group.rotation.x += 0.0018;
        ringMesh.rotation.z += 0.005;
        ring2Mesh.rotation.z -= 0.004;
        particlePoints.rotation.y += 0.001;

        // Smooth mouse parallax
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        group.position.x = targetX * 0.35;
        group.position.y = -targetY * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D representation of Ārohana synthesis"
    />
  );
}

