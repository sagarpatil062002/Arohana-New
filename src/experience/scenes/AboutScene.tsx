// src/experience/scenes/AboutScene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AboutSceneProps {
  scrollProgress: number;
}

export const AboutScene: React.FC<AboutSceneProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pillarsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle breathing rotation
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ringRef.current.rotation.z += delta * 0.2;
    }
    if (pillarsRef.current) {
      // Rotate pillars group based on scroll
      pillarsRef.current.rotation.y = scrollProgress * Math.PI * 1.5;
      pillarsRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Central Compass Ring representing directional journey */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Inner Horizon Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 80]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* 4 Architectural Milestone Pillars (Hospitality, Pivot, Ladakh, Advisory) */}
      <group ref={pillarsRef}>
        {[0, 1, 2, 3].map((idx) => {
          const angle = (idx / 4) * Math.PI * 2;
          const radius = 2.4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const heights = [1.8, 2.4, 3.2, 2.6];
          const height = heights[idx];

          return (
            <group key={idx} position={[x, height / 2 - 1, z]}>
              {/* Monolithic pillar core */}
              <mesh>
                <boxGeometry args={[0.3, height, 0.3]} />
                <meshStandardMaterial color="#0b1320" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Golden vertical edge strip */}
              <mesh position={[0.151, 0, 0]}>
                <boxGeometry args={[0.01, height, 0.04]} />
                <meshStandardMaterial color="#C5A46D" metalness={0.95} roughness={0.1} />
              </mesh>
              {/* Top golden cap */}
              <mesh position={[0, height / 2 + 0.02, 0]}>
                <boxGeometry args={[0.34, 0.04, 0.34]} />
                <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Subtle bottom ground circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <ringGeometry args={[0.1, 4.5, 64]} />
        <meshBasicMaterial color="#0A101C" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
};
