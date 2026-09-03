// src/experience/scenes/HomeScene.tsx
import React from 'react';
import { SpatialMonolith } from '../SpatialMonolith';
import { ArchitecturalWorld } from '../ArchitecturalWorld';
import { TerrainContours } from '../TerrainContours';

interface HomeSceneProps {
  scrollProgress: number;
}

export const HomeScene: React.FC<HomeSceneProps> = ({ scrollProgress }) => {
  return (
    <>
      {/* Central Architectural Monolith */}
      <SpatialMonolith scrollProgress={scrollProgress} />

      {/* Flanking Architectural Pillars & Grid Plane */}
      <ArchitecturalWorld scrollProgress={scrollProgress} />

      {/* High-Altitude Topographic Wireframe */}
      <TerrainContours scrollProgress={scrollProgress} />
    </>
  );
};

export default HomeScene;
