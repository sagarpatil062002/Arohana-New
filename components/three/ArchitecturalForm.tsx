"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Massing() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // slow, confident auto-rotation
    g.rotation.y += delta * 0.16;
    // restrained mouse parallax (±~5deg)
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.16, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, px * 0.05, 0.05);
    // subtle scroll breathing
    const s = typeof window !== "undefined" ? window.scrollY : 0;
    g.position.y = Math.sin(s * 0.0009) * 0.12;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]} rotation={[0.18, 0.6, 0]}>
      {/* base slab */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.34, 2.3]} />
        <meshStandardMaterial color="#d4cec4" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* mid volume */}
      <mesh position={[0.18, 0.56, 0.08]}>
        <boxGeometry args={[1.45, 0.92, 1.45]} />
        <meshStandardMaterial color="#9b958b" roughness={0.7} metalness={0.12} />
      </mesh>
      {/* offset tower */}
      <mesh position={[-0.52, 1.16, -0.18]}>
        <boxGeometry args={[0.82, 1.12, 0.82]} />
        <meshStandardMaterial color="#6f6a62" roughness={0.6} metalness={0.18} />
      </mesh>
      {/* floating slab */}
      <mesh position={[0.12, 1.84, 0.18]}>
        <boxGeometry args={[1.9, 0.16, 1.0]} />
        <meshStandardMaterial color="#ddd7cd" roughness={0.5} metalness={0.22} />
      </mesh>
    </group>
  );
}

export default function ArchitecturalForm() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 5.3], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#e8cdb8" />
      <Massing />
    </Canvas>
  );
}
