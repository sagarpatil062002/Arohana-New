// src/experience/CameraRig.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
  reducedMotion?: boolean;
  pathname?: string;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgress,
  reducedMotion = false,
  pathname = '/',
}) => {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentPos = useRef(new THREE.Vector3(0, 0, 7));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse move handler for gentle inertia parallax
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = normX;
      mouse.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Smooth mouse interpolation
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Parallax strength (disabled if reduced motion)
    const px = reducedMotion ? 0 : mouse.current.x * 0.4;
    const py = reducedMotion ? 0 : mouse.current.y * 0.3;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 7;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    // Page-specific camera angles
    if (pathname === '/about') {
      targetX = px * 0.8;
      targetY = 1.2 + py * 0.5 - p * 0.6;
      targetZ = 6.5 + p * 1.5;
      lookY = -0.3;
    } else if (pathname === '/services') {
      targetX = (p - 0.5) * 2.0 + px;
      targetY = 0.4 + py * 0.6;
      targetZ = 7.8;
      lookX = (p - 0.5) * 1.2;
    } else if (pathname === '/work') {
      targetX = Math.sin(p * Math.PI) * 1.5 + px;
      targetY = 0.6 + py * 0.5;
      targetZ = 7.2 - p * 1.0;
      lookY = -0.2;
    } else if (pathname === '/army-projects') {
      targetX = px * 0.6;
      targetY = 2.2 - p * 1.2 + py * 0.4;
      targetZ = 8.5;
      lookY = -0.8;
    } else if (pathname === '/tourin') {
      targetX = (p - 0.5) * 2.5 + px;
      targetY = 1.8 + py * 0.5;
      targetZ = 7.6 + p * 1.2;
      lookY = -0.6;
    } else if (pathname === '/contact') {
      targetX = px * 0.5;
      targetY = py * 0.4;
      targetZ = 5.8 - p * 0.8;
      lookY = 0;
    } else {
      // Home page cinematic waypoint sequence
      if (p < 0.15) {
        const subP = p / 0.15;
        targetX = THREE.MathUtils.lerp(0, 0.4, subP) + px;
        targetY = THREE.MathUtils.lerp(0, 0.5, subP) + py;
        targetZ = THREE.MathUtils.lerp(7, 8.5, subP);
      } else if (p < 0.3) {
        const subP = (p - 0.15) / 0.15;
        targetX = THREE.MathUtils.lerp(0.4, -1.8, subP) + px;
        targetY = THREE.MathUtils.lerp(0.5, 0.8, subP) + py;
        targetZ = THREE.MathUtils.lerp(8.5, 7.8, subP);
        lookX = THREE.MathUtils.lerp(0, -0.6, subP);
        lookY = THREE.MathUtils.lerp(0, 0.2, subP);
      } else if (p < 0.45) {
        const subP = (p - 0.3) / 0.15;
        targetX = THREE.MathUtils.lerp(-1.8, 1.6, subP) + px;
        targetY = THREE.MathUtils.lerp(0.8, -0.4, subP) + py;
        targetZ = THREE.MathUtils.lerp(7.8, 6.2, subP);
        lookX = THREE.MathUtils.lerp(-0.6, 0.5, subP);
      } else if (p < 0.6) {
        const subP = (p - 0.45) / 0.15;
        targetX = THREE.MathUtils.lerp(1.6, 0, subP) + px;
        targetY = THREE.MathUtils.lerp(-0.4, -1.6, subP) + py;
        targetZ = THREE.MathUtils.lerp(6.2, 8.2, subP);
        lookY = THREE.MathUtils.lerp(0, 0.8, subP);
      } else if (p < 0.75) {
        const subP = (p - 0.6) / 0.15;
        targetX = THREE.MathUtils.lerp(0, -1.2, subP) + px;
        targetY = THREE.MathUtils.lerp(-1.6, 1.0, subP) + py;
        targetZ = THREE.MathUtils.lerp(8.2, 7.5, subP);
        lookX = THREE.MathUtils.lerp(0, -0.4, subP);
      } else if (p < 0.9) {
        const subP = (p - 0.75) / 0.15;
        targetX = THREE.MathUtils.lerp(-1.2, 1.2, subP) + px;
        targetY = THREE.MathUtils.lerp(1.0, 0.4, subP) + py;
        targetZ = THREE.MathUtils.lerp(7.5, 6.8, subP);
      } else {
        const subP = (p - 0.9) / 0.1;
        targetX = THREE.MathUtils.lerp(1.2, 0, subP) + px * 0.5;
        targetY = THREE.MathUtils.lerp(0.4, 0, subP) + py * 0.5;
        targetZ = THREE.MathUtils.lerp(6.8, 4.4, subP);
      }
    }

    // Smooth lerp to camera coordinates
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
    currentLookAt.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.08);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
};
