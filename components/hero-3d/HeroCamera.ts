import * as THREE from "three";

export class HeroCamera {
  public camera: THREE.PerspectiveCamera;
  private startPos: THREE.Vector3;
  private targetSettledPos: THREE.Vector3;
  private currentPos: THREE.Vector3;
  private currentLookAt: THREE.Vector3;
  private targetLookAt: THREE.Vector3;
  private startLookAt: THREE.Vector3;

  constructor(width: number, height: number, isMobile: boolean) {
    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(isMobile ? 48 : 38, aspect, 0.1, 100);

    // Starting macro close-up position (fragment inspection)
    this.startPos = new THREE.Vector3(0.9, 0.55, 1.5);
    this.startLookAt = new THREE.Vector3(0.2, 0.15, 0.1);

    // Final settled wide heroic viewpoint
    const settledZ = isMobile ? 6.8 : 5.4;
    const settledY = isMobile ? -0.25 : 0;
    this.targetSettledPos = new THREE.Vector3(0, settledY, settledZ);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    this.currentPos = this.startPos.clone();
    this.currentLookAt = this.startLookAt.clone();

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentLookAt);
  }

  public updateAspect(width: number, height: number, isMobile: boolean) {
    this.camera.aspect = width / height;
    this.camera.fov = isMobile ? 48 : 38;
    const settledZ = isMobile ? 6.8 : 5.4;
    const settledY = isMobile ? -0.25 : 0;
    this.targetSettledPos.set(0, settledY, settledZ);
    this.camera.updateProjectionMatrix();
  }

  /**
   * Updates camera position based on intro transition progress (0.0 to 1.0)
   * and mouse parallax offsets (-1.0 to 1.0)
   */
  public update(progress: number, mouseX: number, mouseY: number, delta: number) {
    // Smooth quintic easing for the transition pull-back
    const easeProgress = 1 - Math.pow(1 - progress, 4);

    // Interpolate base trajectory from start macro to settled wide
    const baseTrajX = THREE.MathUtils.lerp(this.startPos.x, this.targetSettledPos.x, easeProgress);
    const baseTrajY = THREE.MathUtils.lerp(this.startPos.y, this.targetSettledPos.y, easeProgress);
    const baseTrajZ = THREE.MathUtils.lerp(this.startPos.z, this.targetSettledPos.z, easeProgress);

    // Mouse parallax increases as the camera pulls back into settled state
    const parallaxStrength = easeProgress * 0.45;
    const destX = baseTrajX + mouseX * parallaxStrength;
    const destY = baseTrajY - mouseY * (parallaxStrength * 0.7);
    const destZ = baseTrajZ;

    // Smooth lerp damping for cinematic physical inertia
    const damping = Math.min(1, delta * 4.5);
    this.currentPos.x = THREE.MathUtils.lerp(this.currentPos.x, destX, damping);
    this.currentPos.y = THREE.MathUtils.lerp(this.currentPos.y, destY, damping);
    this.currentPos.z = THREE.MathUtils.lerp(this.currentPos.z, destZ, damping);

    this.camera.position.copy(this.currentPos);

    // LookAt interpolation
    const destLookAtX = THREE.MathUtils.lerp(this.startLookAt.x, this.targetLookAt.x, easeProgress) + mouseX * 0.15;
    const destLookAtY = THREE.MathUtils.lerp(this.startLookAt.y, this.targetLookAt.y, easeProgress) - mouseY * 0.1;
    const destLookAtZ = THREE.MathUtils.lerp(this.startLookAt.z, this.targetLookAt.z, easeProgress);

    this.currentLookAt.x = THREE.MathUtils.lerp(this.currentLookAt.x, destLookAtX, damping);
    this.currentLookAt.y = THREE.MathUtils.lerp(this.currentLookAt.y, destLookAtY, damping);
    this.currentLookAt.z = THREE.MathUtils.lerp(this.currentLookAt.z, destLookAtZ, damping);

    this.camera.lookAt(this.currentLookAt);
  }
}
