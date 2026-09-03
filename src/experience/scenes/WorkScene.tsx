// src/experience/scenes/WorkScene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WorkSceneProps {
  scrollProgress: number;
}

export const WorkScene: React.FC<WorkSceneProps> = ({ scrollProgress }) => {
  const galleryGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (galleryGroupRef.current) {
      // Dynamic arc rotation tied to scroll
      galleryGroupRef.current.rotation.y = scrollProgress * Math.PI * 0.8 + state.clock.elapsedTime * 0.05;
      galleryGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={galleryGroupRef} position={[0, -0.3, 0]}>
      {/* 6 Spatial Project Gateway Frames */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx / 6) * Math.PI * 2;
        const radius = 3.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={idx} position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
            {/* Project Slate Frame */}
            <mesh>
              <boxGeometry args={[1.4, 2.2, 0.08]} />
              <meshStandardMaterial color="#0A101C" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
            </mesh>
            {/* Outer Golden Border Wireframe */}
            <mesh position={[0, 0, 0.05]}>
              <ringGeometry args={[0.8, 0.82, 4]} />
              <meshBasicMaterial color="#C5A46D" transparent opacity={0.6} />
            </mesh>
            {/* Top Index pip */}
            <mesh position={[0, 1.0, 0.05]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#C5A46D" />
            </mesh>
          </group>
        );
      })}

      {/* Central Axis Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3.5, 16]} />
        <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.6, 0.02, 16, 80]} />
        <meshBasicMaterial color="#C5A46D" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};
