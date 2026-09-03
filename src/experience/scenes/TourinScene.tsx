// src/experience/scenes/TourinScene.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TourinSceneProps {
  scrollProgress: number;
}

export const TourinScene: React.FC<TourinSceneProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mountainRef = useRef<THREE.Mesh>(null);
  const snowMotesRef = useRef<THREE.Points>(null);

  // Procedural Himalayan Ridges
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 14, 40, 30);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Sweeping mountain ridges
      const z =
        Math.sin(x * 0.5 + 0.5) * Math.cos(y * 0.4) * 2.2 +
        Math.sin(x * 1.1) * 0.7 +
        Math.cos(y * 0.9) * 0.9;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return { geometry: geo };
  }, []);

  // Ambient mountain dust / snow particles
  const particles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 6 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Gentle cinematic camera drift
      groupRef.current.position.z = -scrollProgress * 2;
      groupRef.current.rotation.y = (scrollProgress - 0.5) * 0.4;
    }
    if (snowMotesRef.current) {
      snowMotesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, -1]}>
      {/* Mountain Ridges Wireframe */}
      <mesh
        ref={mountainRef}
        geometry={geometry}
        rotation={[-Math.PI / 2.2, 0, 0]}
        position={[0, -0.8, -2]}
      >
        <meshStandardMaterial
          color="#C5A46D"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.9}
        />
      </mesh>

      {/* Floating Mountain Snow / Dust Motes */}
      <points ref={snowMotesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
      </points>

      {/* 14,000 FT Pass Summit Waypoint Marker */}
      <group position={[0, 1.4, -3]}>
        <mesh>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
          <meshBasicMaterial color="#C5A46D" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};
