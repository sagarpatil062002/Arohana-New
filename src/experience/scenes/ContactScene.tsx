// src/experience/scenes/ContactScene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactSceneProps {
  scrollProgress: number;
}

export const ContactScene: React.FC<ContactSceneProps> = ({ scrollProgress }) => {
  const beaconRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 0.4;
      beaconRef.current.position.y = Math.sin(time * 1.2) * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.6) * 0.1;
      ring1Ref.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(time * 0.5) * 0.1;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Central Sovereign Golden Octahedron Core */}
      <mesh ref={beaconRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#C5A46D"
          metalness={0.95}
          roughness={0.08}
          emissive="#C5A46D"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Orbiting Gold Halo 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.025, 16, 80]} />
        <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Orbiting Gold Halo 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.0, 0.02, 16, 80]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>

      {/* Convergent Ground Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <ringGeometry args={[0.1, 4.8, 48]} />
        <meshBasicMaterial color="#C5A46D" wireframe transparent opacity={0.25 + scrollProgress * 0.1} />
      </mesh>
    </group>
  );
};
