// src/experience/Experience.tsx
import React, { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { ExperienceContext } from '../App';
import { CameraRig } from './CameraRig';
import { World } from './World';

interface ExperienceProps {
  lenis?: any;
  pathname?: string;
}

export const Experience: React.FC<ExperienceProps> = ({ pathname }) => {
  const { scrollProgress, deviceQuality, reducedMotion } = useContext(ExperienceContext);

  const dpr = deviceQuality === 'low' ? 1 : [1, 1.75];
  const activePath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr as any}
        gl={{
          antialias: deviceQuality !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 50 }}
      >
        <CameraRig
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          pathname={activePath}
        />
        <World scrollProgress={scrollProgress} pathname={activePath} />
      </Canvas>
    </div>
  );
};

export default Experience;
