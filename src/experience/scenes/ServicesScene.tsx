// src/experience/scenes/ServicesScene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ServicesSceneProps {
  scrollProgress: number;
}

export const ServicesScene: React.FC<ServicesSceneProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodeNetRef = useRef<THREE.Mesh>(null);
  const prismRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.y = (scrollProgress - 0.5) * 0.8;
    }
    if (nodeNetRef.current) {
      nodeNetRef.current.rotation.x += delta * 0.3;
      nodeNetRef.current.rotation.y += delta * 0.4;
    }
    if (prismRef.current) {
      prismRef.current.rotation.y += delta * 0.35;
      prismRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
    if (lensRef.current) {
      lensRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      lensRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 01 Left: Digital Brand Growth (Faceted Node Network) */}
      <group position={[-3.2, 0.5, 0]}>
        <mesh ref={nodeNetRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial color="#C5A46D" wireframe metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#0A1220" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 02 Center: Hospitality Consulting (Architectural Spatial Prism) */}
      <group ref={prismRef} position={[0, -0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 1.2, 2.0, 6]} />
          <meshStandardMaterial color="#0c1524" metalness={0.8} roughness={0.2} transparent opacity={0.85} />
        </mesh>
        {/* Gold Trim Ring */}
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[1.05, 0.02, 16, 40]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <torusGeometry args={[1.18, 0.02, 16, 40]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>

      {/* 03 Right: Content & Brand Production (Cinematic Lens Armature) */}
      <group ref={lensRef} position={[3.2, 0.5, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[1.2, 0.04, 16, 60]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[0.9, 0.03, 16, 50]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.4} metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Background connecting horizon ray */}
      <mesh position={[0, -1.8, -1]}>
        <planeGeometry args={[16, 0.02]} />
        <meshBasicMaterial color="#C5A46D" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
