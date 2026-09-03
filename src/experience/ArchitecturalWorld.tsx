// src/experience/ArchitecturalWorld.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArchitecturalWorldProps {
  scrollProgress: number;
}

export const ArchitecturalWorld: React.FC<ArchitecturalWorldProps> = ({ scrollProgress }) => {
  const gridFloorRef = useRef<THREE.GridHelper>(null);
  const monolithsGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (gridFloorRef.current) {
      gridFloorRef.current.position.z = (scrollProgress * 6) % 2 - 1;
    }
    if (monolithsGroupRef.current) {
      monolithsGroupRef.current.rotation.y = scrollProgress * 0.4;
    }
  });

  return (
    <group>
      {/* Infinite Tactical Grid Plane */}
      <gridHelper
        ref={gridFloorRef}
        args={[30, 30, '#C5A46D', '#1a273b']}
        position={[0, -3.8, 0]}
      />

      {/* Flanking Monolithic Pillars */}
      <group ref={monolithsGroupRef}>
        {[-5, 5].map((x, i) => (
          <group key={i} position={[x, 0, -2]}>
            {/* Dark Obsidian Column */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.6, 8, 0.6]} />
              <meshStandardMaterial
                color="#060a12"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            {/* Vertical Golden Edge Inset */}
            <mesh position={[x > 0 ? -0.31 : 0.31, 0, 0]}>
              <boxGeometry args={[0.02, 7.8, 0.04]} />
              <meshStandardMaterial
                color="#C5A46D"
                emissive="#C5A46D"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        ))}

        {/* Floating Architectural Cross-Beams */}
        {[-3, 0, 3].map((z, idx) => (
          <mesh key={idx} position={[0, 4.2, z]}>
            <boxGeometry args={[11, 0.1, 0.2]} />
            <meshStandardMaterial
              color="#131e30"
              metalness={0.7}
              roughness={0.4}
              wireframe={idx === 1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
