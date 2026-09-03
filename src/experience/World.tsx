// src/experience/World.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingParticles } from './FloatingParticles';
import { HomeScene } from './scenes/HomeScene';
import { AboutScene } from './scenes/AboutScene';
import { ServicesScene } from './scenes/ServicesScene';
import { WorkScene } from './scenes/WorkScene';
import { ArmyScene } from './scenes/ArmyScene';
import { TourinScene } from './scenes/TourinScene';
import { ContactScene } from './scenes/ContactScene';

interface WorldProps {
  scrollProgress: number;
  pathname?: string;
}

export const World: React.FC<WorldProps> = ({ scrollProgress, pathname = '/' }) => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const p = scrollProgress;
    if (spotLightRef.current) {
      // Dynamic lighting shift based on route and scroll
      let isWarm = false;
      if (pathname === '/about' || pathname === '/services') {
        isWarm = true;
      } else if (pathname === '/army-projects' || pathname === '/tourin') {
        isWarm = false; // cool high-altitude crisp tone
      } else if (pathname === '/contact') {
        isWarm = true;
      } else {
        isWarm = (p > 0.15 && p < 0.4) || (p > 0.6 && p < 0.8) || p > 0.9;
      }

      const targetColor = isWarm ? new THREE.Color('#e0b878') : new THREE.Color('#94b8e8');
      spotLightRef.current.color.lerp(targetColor, 0.05);
      spotLightRef.current.intensity = THREE.MathUtils.lerp(1.2, 2.0, Math.sin(p * Math.PI));
    }
  });

  return (
    <>
      {/* Atmosphere Fog */}
      <color attach="background" args={['#04070e']} />
      <fog attach="fog" args={['#04070e', 6, 22]} />

      {/* Lighting Architecture */}
      <ambientLight ref={ambientLightRef} intensity={0.45} color="#8a9eb8" />

      {/* Dramatic Golden Key Light */}
      <spotLight
        ref={spotLightRef}
        position={[4, 8, 6]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.8}
        color="#e0b878"
      />

      {/* Subtle Cyan-Steel Rim Light */}
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color="#48688a" />

      {/* Ambient Spatial Dust Particles */}
      <FloatingParticles count={180} />

      {/* Page-Specific 3D Scene */}
      {pathname === '/about' && <AboutScene scrollProgress={scrollProgress} />}
      {pathname === '/services' && <ServicesScene scrollProgress={scrollProgress} />}
      {pathname === '/work' && <WorkScene scrollProgress={scrollProgress} />}
      {pathname === '/army-projects' && <ArmyScene scrollProgress={scrollProgress} />}
      {pathname === '/tourin' && <TourinScene scrollProgress={scrollProgress} />}
      {pathname === '/contact' && <ContactScene scrollProgress={scrollProgress} />}
      {(pathname === '/' ||
        (pathname !== '/about' &&
          pathname !== '/services' &&
          pathname !== '/work' &&
          pathname !== '/army-projects' &&
          pathname !== '/tourin' &&
          pathname !== '/contact')) && <HomeScene scrollProgress={scrollProgress} />}
    </>
  );
};

export default World;
