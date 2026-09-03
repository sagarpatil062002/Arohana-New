import * as THREE from "three";

export class HeroLighting {
  public group: THREE.Group;
  private dynamicLight: THREE.PointLight;

  constructor() {
    this.group = new THREE.Group();

    // 1. Deep architectural ambient base
    const ambient = new THREE.AmbientLight(0x0e1726, 1.2);
    this.group.add(ambient);

    // 2. Crisp Key Light (Warm Off-white studio key)
    const keyLight = new THREE.DirectionalLight(0xf5efe6, 2.4);
    keyLight.position.set(4.5, 6.0, 4.0);
    this.group.add(keyLight);

    // 3. Warm Champagne Rim Light (Accentuates ascending edges from behind)
    const rimLight = new THREE.DirectionalLight(0xd8bc8a, 2.8);
    rimLight.position.set(-4.0, 3.5, -4.5);
    this.group.add(rimLight);

    // 4. Subtle Navy Ground Bounce Light
    const bounceLight = new THREE.DirectionalLight(0x192d47, 1.1);
    bounceLight.position.set(0, -4.0, 3.0);
    this.group.add(bounceLight);

    // 5. Interactive Mouse Light (Creates specular glints across facets)
    this.dynamicLight = new THREE.PointLight(0xf0e6d2, 1.8, 12, 1.5);
    this.dynamicLight.position.set(0, 0, 3.5);
    this.group.add(this.dynamicLight);
  }

  public update(mouseX: number, mouseY: number) {
    // Dynamic light shifts softly with mouse pointer
    this.dynamicLight.position.x = mouseX * 3.5;
    this.dynamicLight.position.y = -mouseY * 2.5;
  }
}
