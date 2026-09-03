// src/experience/TerrainContours.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TerrainContoursProps {
  scrollProgress: number;
}

export const TerrainContours: React.FC<TerrainContoursProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);

  // Generate an undulating topographic plane geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 16, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // High-altitude ridge height function
      const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.2 +
                Math.sin(x * 1.2 + y * 0.8) * 0.4;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * 0.08;
    }
    if (meshRef.current) {
      // Subtle float
      meshRef.current.position.y = -3.2 + Math.sin(Date.now() * 0.001) * 0.15;
      
      // Topographic intensity scales up during Ladakh / Army / Tourin chapters
      const p = scrollProgress;
      const isArmyOrLadakh = (p > 0.35 && p < 0.65) || (p > 0.80 && p < 0.95);
      const targetOpacity = isArmyOrLadakh ? 0.75 : 0.25;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
      }
    }
  });

  return (
    <group position={[0, -2, -3]}>
      {/* 3D Topographic Terrain Grid */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[-Math.PI / 2.4, 0, 0]}
        position={[0, -3.2, 0]}
      >
        <meshStandardMaterial
          color="#3b567d"
          wireframe
          transparent
          opacity={0.35}
          emissive="#1b3252"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Concentric Elevation Contour Rings */}
      <group ref={ringsGroupRef} position={[0, -1.8, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        {[2.5, 3.8, 5.2, 6.6].map((radius, index) => (
          <mesh key={index} position={[0, 0, index * 0.3]}>
            <ringGeometry args={[radius, radius + 0.02, 48]} />
            <meshBasicMaterial
              color={index === 0 ? "#C5A46D" : "#5d789e"}
              transparent
              opacity={0.28 - index * 0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
