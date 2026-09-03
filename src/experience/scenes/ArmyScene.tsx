// src/experience/scenes/ArmyScene.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArmySceneProps {
  scrollProgress: number;
}

export const ArmyScene: React.FC<ArmySceneProps> = ({ scrollProgress }) => {
  const terrainMeshRef = useRef<THREE.Mesh>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);
  const elevationGroupRef = useRef<THREE.Group>(null);

  // Generate procedural topographic high-altitude wireframe
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 12, 32, 24);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      // Sharp mountain peaks
      const z =
        Math.sin(x * 0.7) * Math.cos(y * 0.7) * 1.5 +
        Math.sin(x * 1.4 + 1.2) * 0.8 +
        Math.max(0, 2.5 - dist * 0.4);
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return { geometry: geo };
  }, []);

  useFrame((state, delta) => {
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.5;
    }
    if (elevationGroupRef.current) {
      elevationGroupRef.current.rotation.y = (scrollProgress - 0.5) * 0.6 + state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={elevationGroupRef} position={[0, -1.2, 0]}>
      {/* Topographic Mountain Wireframe */}
      <mesh
        ref={terrainMeshRef}
        geometry={geometry}
        rotation={[-Math.PI / 2.3, 0, 0]}
        position={[0, -0.5, -2]}
      >
        <meshStandardMaterial
          color="#253852"
          wireframe
          transparent
          opacity={0.55}
          roughness={0.8}
        />
      </mesh>

      {/* 3 Concentric Tactical Elevation Rings */}
      <group position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial color="#C5A46D" transparent opacity={0.6} />
        </mesh>
        <mesh>
          <ringGeometry args={[3.5, 3.53, 64]} />
          <meshBasicMaterial color="#3b567d" transparent opacity={0.4} />
        </mesh>
        <mesh>
          <ringGeometry args={[5.0, 5.03, 64]} />
          <meshBasicMaterial color="#C5A46D" transparent opacity={0.3} />
        </mesh>

        {/* Rotating Radar Crosshair */}
        <mesh ref={radarRingRef}>
          <ringGeometry args={[0.05, 5.2, 4]} />
          <meshBasicMaterial color="#ff3344" wireframe transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Tactical Beacon at Peak */}
      <mesh position={[0, 1.8, -2]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#ff3344" emissive="#ff3344" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};
