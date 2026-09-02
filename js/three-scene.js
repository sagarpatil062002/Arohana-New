/**
 * Three.js Interactive 3D Kinetic Background
 * Features an iridescent dark-metallic sculptural form that floats, deforms,
 * and tracks mouse movements with smooth inertia, matching the reference theme.
 */

class ArohanaThreeScene {
  constructor(containerId = 'webgl-hero-canvas') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sculpture = null;
    this.particles = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.clock = null;
    this.animationFrameId = null;
    this.isVisible = true;

    this.init();
  }

  init() {
    // Check WebGL availability
    if (!window.THREE) {
      console.warn('Three.js not loaded. Skipping 3D initialization.');
      return;
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x08080a, 0.035);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting - Cinematic Dark Studio Look
    const ambientLight = new THREE.AmbientLight(0x222230, 2.5);
    this.scene.add(ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    this.keyLight.position.set(5, 5, 4);
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.PointLight(0xa5b4fc, 4.5, 20);
    this.rimLight.position.set(-5, -3, 3);
    this.scene.add(this.rimLight);

    this.accentLight = new THREE.PointLight(0xe2e8f0, 3.0, 15);
    this.accentLight.position.set(0, 4, 2);
    this.scene.add(this.accentLight);

    // 5. Create Kinetic Metallic Sculpture
    this.createSculpture();

    // 6. Create Subtle Floating Dust Particles
    this.createParticles();

    // 7. Event Listeners
    this.clock = new THREE.Clock();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));

    // Intersection Observer for performance (pause when out of view)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(this.container);

    // 8. Start Render Loop
    this.animate();
  }

  createSculpture() {
    // Elegant complex Torus Knot / Organic Kinetic Ribbon
    const geometry = new THREE.TorusKnotGeometry(2.0, 0.58, 180, 36, 2, 3);

    // Custom dark chrome metallic material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x18181f,
      emissive: 0x07070a,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
      wireframe: false,
      flatShading: false
    });

    this.sculpture = new THREE.Mesh(geometry, material);
    this.sculpture.position.set(1.5, 0.2, 0); // Positioned slightly to the right for typography balance
    this.scene.add(this.sculpture);

    // Secondary subtle dark inner core orb
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d12,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: true
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.sculpture.add(this.coreMesh);
  }

  createParticles() {
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      scales[i / 3] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX - this.windowHalf.x) * 0.0008;
    this.mouse.targetY = (e.clientY - this.windowHalf.y) * 0.0008;
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.windowHalf.x = width / 2;
    this.windowHalf.y = height / 2;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    // Responsive positioning: center on mobile, offset on desktop
    if (this.sculpture) {
      if (width < 768) {
        this.sculpture.position.set(0, 0.4, -1.0);
        this.sculpture.scale.set(0.65, 0.65, 0.65);
      } else if (width < 1200) {
        this.sculpture.position.set(0.8, 0, 0);
        this.sculpture.scale.set(0.85, 0.85, 0.85);
      } else {
        this.sculpture.position.set(1.5, 0.2, 0);
        this.sculpture.scale.set(1.05, 1.05, 1.05);
      }
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    if (!this.isVisible) return;

    const elapsedTime = this.clock.getElapsedTime();

    // Smooth inertia tracking for mouse
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (this.sculpture) {
      // Gentle kinetic rotation
      this.sculpture.rotation.x = Math.sin(elapsedTime * 0.25) * 0.3 + this.mouse.y * 1.5;
      this.sculpture.rotation.y = elapsedTime * 0.22 + this.mouse.x * 2.0;
      this.sculpture.rotation.z = Math.cos(elapsedTime * 0.18) * 0.2;

      // Subtle organic floating displacement
      this.sculpture.position.y = Math.sin(elapsedTime * 0.8) * 0.15 + (window.innerWidth < 768 ? 0.4 : 0.2);

      if (this.coreMesh) {
        this.coreMesh.rotation.y = -elapsedTime * 0.4;
        this.coreMesh.rotation.x = elapsedTime * 0.3;
      }
    }

    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04;
      this.particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;
    }

    // Dynamic light movement
    if (this.keyLight) {
      this.keyLight.position.x = 5 + this.mouse.x * 4;
      this.keyLight.position.y = 5 - this.mouse.y * 4;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Global initialization helper
window.initThreeScene = function() {
  if (document.getElementById('webgl-hero-canvas')) {
    return new ArohanaThreeScene('webgl-hero-canvas');
  }
  return null;
};
