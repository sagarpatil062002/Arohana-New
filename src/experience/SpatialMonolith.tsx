// src/experience/SpatialMonolith.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpatialMonolithProps {
  scrollProgress: number;
}

export const SpatialMonolith: React.FC<SpatialMonolithProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const slabLeftRef = useRef<THREE.Mesh>(null);
  const slabRightRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slow ambient rotation
    groupRef.current.rotation.y += delta * 0.15;

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Morphing based on scroll
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.2;
      const ringScale = 1 + p * 0.8;
      ring1Ref.current.scale.set(ringScale, ringScale, ringScale);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3;
      ring2Ref.current.rotation.x -= delta * 0.2;
    }

    if (coreRef.current) {
      // Core pulse
      const pulse = Math.sin(Date.now() * 0.002) * 0.05 + 1;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (slabLeftRef.current && slabRightRef.current) {
      // Slabs separate like an architectural gateway as you scroll
      const separation = THREE.MathUtils.lerp(0.8, 3.2, p);
      slabLeftRef.current.position.x = -separation;
      slabRightRef.current.position.x = separation;

      slabLeftRef.current.rotation.y = THREE.MathUtils.lerp(0, 0.4, p);
      slabRightRef.current.rotation.y = THREE.MathUtils.lerp(0, -0.4, p);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Radiant Core Monolith */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#C5A46D"
          metalness={0.9}
          roughness={0.15}
          emissive="#C5A46D"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Outer Rotating Architectural Halo 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#F3EFE6"
          metalness={0.8}
          roughness={0.2}
          emissive="#C5A46D"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Outer Rotating Halo 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.4, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#C5A46D"
          metalness={0.95}
          roughness={0.1}
          wireframe
        />
      </mesh>

      {/* Gateway Monolithic Slabs */}
      <mesh ref={slabLeftRef} position={[-0.8, 0, -0.5]}>
        <boxGeometry args={[0.3, 3.6, 0.8]} />
        <meshStandardMaterial
          color="#0c1322"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      <mesh ref={slabRightRef} position={[0.8, 0, -0.5]}>
        <boxGeometry args={[0.3, 3.6, 0.8]} />
        <meshStandardMaterial
          color="#0c1322"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Trim Accents on Slabs */}
      <mesh position={[-0.8, 0, 0.02]}>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshStandardMaterial color="#C5A46D" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.8, 0, 0.02]}>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshStandardMaterial color="#C5A46D" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
};
