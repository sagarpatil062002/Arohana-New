import * as THREE from "three";

export class SculpturalObject {
  public group: THREE.Group;
  private bladesGroup: THREE.Group;
  private coreMesh: THREE.Mesh;
  private ring1: THREE.Mesh;
  private ring2: THREE.Mesh;
  private particles: THREE.Points;
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.bladesGroup = new THREE.Group();
    this.group.add(this.bladesGroup);

    // ==========================================
    // 1. ASCENDING ARCHITECTURAL BLADES (ĀROHANA)
    // ==========================================
    const bladeCount = 28;
    const bladeGeo = new THREE.BoxGeometry(0.12, 1.8, 0.55);
    // Smooth bevel effect by scaling and positioning
    this.geometries.push(bladeGeo);

    // Deep navy anodized brushed titanium material
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0e1c2e),
      metalness: 0.88,
      roughness: 0.24,
      flatShading: false
    });
    this.materials.push(bladeMaterial);

    // Champagne edge accent material for select featured blades
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc5a46d),
      metalness: 0.92,
      roughness: 0.18
    });
    this.materials.push(accentMaterial);

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const progress = i / bladeCount;
      const radius = 1.25 + Math.sin(progress * Math.PI * 2) * 0.35;
      const elevation = (progress - 0.5) * 2.2;
      const scaleY = 0.6 + Math.sin(progress * Math.PI) * 0.9;

      const isAccent = i % 7 === 0;
      const mesh = new THREE.Mesh(bladeGeo, isAccent ? accentMaterial : bladeMaterial);

      mesh.position.set(
        Math.cos(angle) * radius,
        elevation,
        Math.sin(angle) * radius
      );

      // Rotate blades to form an ascending helical aerodynamic canopy
      mesh.rotation.x = Math.sin(angle) * 0.45;
      mesh.rotation.y = -angle + Math.PI / 2.5;
      mesh.rotation.z = Math.cos(angle) * 0.35 + (progress - 0.5) * 0.4;
      mesh.scale.set(1, scaleY, 1);

      this.bladesGroup.add(mesh);
    }

    // ==========================================
    // 2. INNER CHAMPAGNE GEOMETRIC CORE
    // ==========================================
    const coreGeo = new THREE.IcosahedronGeometry(0.68, 1);
    this.geometries.push(coreGeo);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd8bc8a),
      metalness: 0.95,
      roughness: 0.16,
      wireframe: false
    });
    this.materials.push(coreMaterial);

    this.coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    this.group.add(this.coreMesh);

    // ==========================================
    // 3. CONCENTRIC DATUM ORBIT RINGS
    // ==========================================
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.016, 16, 120);
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.012, 16, 120);
    this.geometries.push(ring1Geo, ring2Geo);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xa68a56),
      metalness: 0.96,
      roughness: 0.14
    });
    this.materials.push(ringMaterial);

    this.ring1 = new THREE.Mesh(ring1Geo, ringMaterial);
    this.ring1.rotation.x = Math.PI / 3.2;
    this.ring1.rotation.y = Math.PI / 6;
    this.group.add(this.ring1);

    this.ring2 = new THREE.Mesh(ring2Geo, ringMaterial);
    this.ring2.rotation.x = -Math.PI / 3.8;
    this.ring2.rotation.z = Math.PI / 4.5;
    this.group.add(this.ring2);

    // ==========================================
    // 4. FLOATING PARTICLES (ARCHITECTURAL DUST)
    // ==========================================
    const particleCount = 140;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 2.5;

      particlePos[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = r * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    this.geometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(0xc5a46d),
      size: 0.024,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    this.materials.push(particleMat);

    this.particles = new THREE.Points(particleGeo, particleMat);
    this.group.add(this.particles);

    // Subtle initial vertical tilt for imposing architectural presence
    this.group.rotation.x = 0.18;
  }

  public update(delta: number, mouseX: number, mouseY: number) {
    // Ambient primary sculpture rotation
    this.bladesGroup.rotation.y += delta * 0.22;
    this.bladesGroup.rotation.x = 0.12 + mouseY * 0.15;
    this.bladesGroup.rotation.z = mouseX * 0.12;

    // Counter-rotating inner core with subtle breathing pulse
    this.coreMesh.rotation.y -= delta * 0.35;
    this.coreMesh.rotation.x += delta * 0.15;

    // Datum rings orbital motion
    this.ring1.rotation.z += delta * 0.12;
    this.ring2.rotation.y -= delta * 0.08;

    // Particle field subtle drift
    this.particles.rotation.y += delta * 0.05;
  }

  public dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
  }
}
