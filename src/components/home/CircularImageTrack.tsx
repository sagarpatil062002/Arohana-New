'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';

export interface CompanyItem {
  id: string;
  name: string; // Company Name like "Raysons"
  fullName: string;
  desc: string;
  image: string;
  link: string;
}

// 16 Client Companies (displaying company names, not categories)
export const COMPANIES: CompanyItem[] = [
  {
    id: 'raysons',
    name: 'Raysons',
    fullName: 'Raysons Group',
    desc: 'Industrial Castings & Real Estate',
    image: '/images/work/raysons-thumb.jpg',
    link: '/work/raysons-group',
  },
  {
    id: 'picturetime',
    name: 'PictureTime',
    fullName: 'PictureTime Digiplex',
    desc: 'High-Altitude Inflatable Cinema',
    image: '/images/work/picturetime-thumb.jpg',
    link: '/work/picturetime',
  },
  {
    id: 'loom-crafts',
    name: 'Loom Crafts',
    fullName: 'Loom Crafts Outdoor Living',
    desc: 'Luxury Outdoor & Modular Structures',
    image: '/images/work/loom-thumb.jpg',
    link: '/work/loom-crafts',
  },
  {
    id: 'indian-army',
    name: 'Indian Army',
    fullName: 'Indian Army Western Command',
    desc: 'Western Command & 14 Corps Projects',
    image: '/images/work/army-thumb.jpg',
    link: '/indian-army-projects',
  },
  {
    id: 'misu',
    name: 'Misu',
    fullName: 'Misu Pan-Asian',
    desc: 'Contemporary Pan-Asian Dining',
    image: '/images/work/misu-thumb.jpg',
    link: '/work/misu',
  },
  {
    id: 'rr-skins',
    name: 'RR Skins',
    fullName: 'RR Skins Clinical Care',
    desc: 'Clinical Dermatology & Healthcare',
    image: '/images/work/rrskins-thumb.jpg',
    link: '/work/rr-skins',
  },
  {
    id: 'blu-resorts',
    name: 'Blu Resorts',
    fullName: 'Blu Resorts Goa',
    desc: 'Boutique Coastal Living & Hospitality',
    image: '/images/work/blu-thumb.jpg',
    link: '/work',
  },
  {
    id: 'qubice',
    name: 'Qubice',
    fullName: 'Qubice Modular Systems',
    desc: 'Architectural Modular Solutions',
    image: '/images/work/qubice-thumb.jpg',
    link: '/work',
  },
  {
    id: 'neora-deck',
    name: 'Neora Deck',
    fullName: 'Neora Wood Composite',
    desc: 'Wood Composite & Built Environment',
    image: '/images/work/neora-thumb.jpg',
    link: '/work',
  },
  {
    id: 'she-project',
    name: 'SHE Project',
    fullName: 'SHE Livelihood Initiative',
    desc: 'High-Altitude Livelihood Initiative',
    image: '/images/work/she-thumb.jpg',
    link: '/work/she',
  },
  {
    id: 'dtk-karekar',
    name: 'DTK Karekar',
    fullName: 'DTK Karekar Jewellers',
    desc: 'Heritage Fine Jewellery & Retail',
    image: '/images/work/dtk-thumb.jpg',
    link: '/work',
  },
  {
    id: 'tourin',
    name: 'Tourin',
    fullName: 'Tourin Ladakh',
    desc: 'Experiential Travel Ladakh',
    image: '/images/work/tourin-thumb.jpg',
    link: '/tourin',
  },
  {
    id: 'sampark',
    name: 'Sampark',
    fullName: 'Sampark Communications',
    desc: 'Institutional Community Outreach',
    image: '/images/work/sampark-thumb.jpg',
    link: '/work',
  },
  {
    id: 'fraganta',
    name: 'Fraganta',
    fullName: 'Fraganta Perfumery',
    desc: 'Artisanal Perfumery & Luxury Retail',
    image: '/images/work/fraganta-thumb.jpg',
    link: '/work',
  },
  {
    id: 'citron',
    name: 'Citron',
    fullName: 'Citron Hospitality',
    desc: 'Curated Dining & Beverage Spaces',
    image: '/images/work/citron-thumb.jpg',
    link: '/work',
  },
  {
    id: 'kanopy',
    name: 'Kanopy',
    fullName: 'Kanopy Living Systems',
    desc: 'Modular Shading & Living Architecture',
    image: '/images/work/kanopy-thumb.jpg',
    link: '/work',
  },
];

export default function CircularImageTrack() {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);

  // Active company state for split-screen display
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);

  // Mutable animation and interaction refs for continuous 60fps WebGL loop
  const rotationAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);
  const rotationSpeedRef = useRef<number>(0.0022); // steady cruising speed
  const targetRotationSpeedRef = useRef<number>(0.0022);
  const isHoveredRef = useRef<boolean>(false);

  // Dragging and inertia refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const hasDraggedFarRef = useRef<boolean>(false);

  // Mouse tilt parallax refs
  const mouseTiltXRef = useRef<number>(0);
  const mouseTiltYRef = useRef<number>(0);
  const targetMouseTiltXRef = useRef<number>(0);
  const targetMouseTiltYRef = useRef<number>(0);

  // Scroll acceleration refs
  const scrollVelocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  const numCards = COMPANIES.length; // 16 cards
  const anglePerCard = (2 * Math.PI) / numCards;

  // Jump/lerp cylinder to face a specific company selected on the left
  const selectCompany = useCallback(
    (index: number) => {
      setActiveIndex(index);
      let targetA = -index * anglePerCard;
      const currentA = rotationAngleRef.current;
      const diff = Math.atan2(Math.sin(targetA - currentA), Math.cos(targetA - currentA));
      targetAngleRef.current = currentA + diff;
    },
    [anglePerCard]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Setup Three.js Scene, Camera, and Renderer
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Fog replicates CLOU Architects' seamless disappearance into pure white background
    const fogNear = 18.5;
    const fogFar = 28.0;
    scene.fog = new THREE.Fog(0xffffff, fogNear, fogFar);

    // Perspective architectural camera positioned for a bolder, larger presence with generous vertical clearance
    const camera = new THREE.PerspectiveCamera(24, width / height, 0.1, 100);
    camera.position.set(0, 0, 22.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Build 3D Cylindrical Ring Geometry (larger cards, broader radius, elegant panoramic tilt)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Shallower architectural tilt angle (~11 degrees downward tilt) keeps it panoramic without excessive vertical oval expansion
    const baseTiltX = -0.19;
    ringGroup.rotation.x = baseTiltX;

    const cylinderRadius = 5.2; // Broader radius for prominent panoramic presence
    const cardHeight = 2.85; // Significantly taller, bolder cards for high-impact imagery
    const cardArc = anglePerCard * 0.88; // 88% width with 12% architectural gap

    // Cylinder segment geometry for each card
    const cardGeometry = new THREE.CylinderGeometry(
      cylinderRadius,
      cylinderRadius,
      cardHeight,
      24,
      1,
      true,
      -cardArc / 2,
      cardArc
    );

    const textureLoader = new THREE.TextureLoader();
    const cardMeshes: THREE.Mesh[] = [];

    COMPANIES.forEach((company, i) => {
      const texture = textureLoader.load(company.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      // DoubleSide allows both front arc and rear arc to be visible
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);
      mesh.rotation.y = i * anglePerCard;
      mesh.userData = { company, index: i };

      ringGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    // 3. Responsive Scaling & Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 700;
      const h = container.clientHeight || 560;

      camera.aspect = w / h;

      if (w < 500) {
        camera.fov = 29;
        ringGroup.scale.set(0.96, 0.96, 0.96); // Bold and big on mobile without touching section bounds
      } else if (w < 992) {
        camera.fov = 26;
        ringGroup.scale.set(1.0, 1.0, 1.0);
      } else {
        camera.fov = 24;
        ringGroup.scale.set(1.05, 1.05, 1.05); // Bigger, commanding presence on desktop
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // 4. Scroll Acceleration Listener
    lastScrollYRef.current = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(deltaY) > 0.5) {
        scrollVelocityRef.current += deltaY * 0.00035;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 5. Raycasting for interactive hover and click detection
    const raycaster = new THREE.Raycaster();
    const mouseNormalized = new THREE.Vector2(-999, -999);
    let currentlyIntersected: THREE.Mesh | null = null;

    const updateRaycast = () => {
      raycaster.setFromCamera(mouseNormalized, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit !== currentlyIntersected) {
          currentlyIntersected = hit;
          const idx = hit.userData.index as number;
          setHoveredIndex(idx);
          setActiveIndex(idx);
        }
      } else {
        if (currentlyIntersected) {
          currentlyIntersected = null;
          setHoveredIndex(null);
        }
      }
    };

    // 6. Main 60fps RequestAnimationFrame Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.667, 2.0);
      lastTime = time;

      if (!isDraggingRef.current) {
        if (targetAngleRef.current !== null) {
          // Smoothly lerp towards clicked company angle
          const diff = targetAngleRef.current - rotationAngleRef.current;
          if (Math.abs(diff) > 0.001) {
            rotationAngleRef.current += diff * 0.08 * delta;
          } else {
            rotationAngleRef.current = targetAngleRef.current;
            targetAngleRef.current = null;
          }
        } else {
          // Momentum inertia decay after drag release
          if (Math.abs(dragVelocityRef.current) > 0.0001) {
            rotationAngleRef.current += dragVelocityRef.current * delta;
            dragVelocityRef.current *= Math.pow(0.92, delta);
          } else {
            dragVelocityRef.current = 0;

            // Scroll velocity decay
            if (Math.abs(scrollVelocityRef.current) > 0.0001) {
              rotationAngleRef.current += scrollVelocityRef.current * delta;
              scrollVelocityRef.current *= Math.pow(0.88, delta);
            } else {
              scrollVelocityRef.current = 0;
            }

            // Cruising rotation speed lerp
            rotationSpeedRef.current +=
              (targetRotationSpeedRef.current - rotationSpeedRef.current) * 0.06 * delta;
            rotationAngleRef.current += rotationSpeedRef.current * delta;
          }
        }

        // Keep angle in range
        if (rotationAngleRef.current > Math.PI * 2) rotationAngleRef.current -= Math.PI * 2;
        if (rotationAngleRef.current < -Math.PI * 2) rotationAngleRef.current += Math.PI * 2;
      }

      // Smooth mouse tilt parallax
      mouseTiltXRef.current +=
        (targetMouseTiltXRef.current - mouseTiltXRef.current) * 0.06 * delta;
      mouseTiltYRef.current +=
        (targetMouseTiltYRef.current - mouseTiltYRef.current) * 0.06 * delta;

      // Apply transformations to cylinder
      ringGroup.rotation.y = rotationAngleRef.current;
      ringGroup.rotation.x = baseTiltX + mouseTiltYRef.current;
      ringGroup.rotation.z = mouseTiltXRef.current;

      // Update raycast if mouse is inside canvas
      if (isHoveredRef.current) {
        updateRaycast();
      }

      // If user isn't hovering or targeting a specific card, find the company closest to front center
      if (!currentlyIntersected && targetAngleRef.current === null) {
        let minDiff = Infinity;
        let frontIdx = 0;
        for (let i = 0; i < numCards; i++) {
          const cardAngle = (i * anglePerCard + rotationAngleRef.current) % (Math.PI * 2);
          let diff = Math.abs(cardAngle);
          if (diff > Math.PI) diff = 2 * Math.PI - diff;
          if (diff < minDiff) {
            minDiff = diff;
            frontIdx = i;
          }
        }
        setActiveIndex(frontIdx);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // 7. Event Listeners for Interaction & Drag
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCursorPos({ x: e.clientX, y: e.clientY });

      mouseNormalized.x = (x / rect.width) * 2 - 1;
      mouseNormalized.y = -(y / rect.height) * 2 + 1;

      targetMouseTiltXRef.current = -mouseNormalized.x * 0.035;
      targetMouseTiltYRef.current = mouseNormalized.y * 0.045;

      if (isDraggingRef.current) {
        targetAngleRef.current = null;
        const deltaX = e.clientX - dragStartXRef.current;
        if (Math.abs(deltaX) > 6) {
          hasDraggedFarRef.current = true;
        }

        const angleDelta = (deltaX / rect.width) * Math.PI * 1.6;
        rotationAngleRef.current = dragStartAngleRef.current + angleDelta;

        const now = performance.now();
        const dt = now - lastDragTimeRef.current;
        if (dt > 10) {
          const stepX = e.clientX - lastDragXRef.current;
          dragVelocityRef.current = ((stepX / rect.width) * Math.PI * 1.6) / (dt / 16.667);
          lastDragXRef.current = e.clientX;
          lastDragTimeRef.current = now;
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsDraggingState(true);
      hasDraggedFarRef.current = false;
      targetAngleRef.current = null;
      dragStartXRef.current = e.clientX;
      dragStartAngleRef.current = rotationAngleRef.current;
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = performance.now();
      dragVelocityRef.current = 0;

      container.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDraggingState(false);

      dragVelocityRef.current = Math.max(-0.04, Math.min(0.04, dragVelocityRef.current));

      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Safe release
      }

      // If user clicked (did not drag), navigate to company portfolio
      if (!hasDraggedFarRef.current && currentlyIntersected) {
        const company = currentlyIntersected.userData.company as CompanyItem;
        router.push(company.link);
      }
    };

    const onMouseEnter = () => {
      isHoveredRef.current = true;
      targetRotationSpeedRef.current = 0.0006; // Slow down on hover
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseNormalized.set(-999, -999);
      setHoveredIndex(null);
      targetRotationSpeedRef.current = 0.0022;
      targetMouseTiltXRef.current = 0;
      targetMouseTiltYRef.current = 0;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);

      cardMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [anglePerCard, numCards, router]);

  const displayedCompany =
    hoveredIndex !== null ? COMPANIES[hoveredIndex] : COMPANIES[activeIndex];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Split Screen Container: Left Side Name & Info | Right Side Rotating 3D Cylinder */}
      <div
        className="padding-global container-large circular-track-grid"
        style={{
          display: 'grid',
          alignItems: 'center',
          gap: 'clamp(2rem, 3.5vw, 4rem)',
          paddingTop: '1rem',
          paddingBottom: '1.5rem',
        }}
      >
        {/* ==================== LEFT SIDE: COMPANY NAMES & EDITORIAL ==================== */}
        <div
          className="circular-track-left-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '540px',
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <div
            className="tag-mono"
            style={{
              color: '#777777',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#DE322D',
              }}
            />
            PARTNERSHIPS
          </div>

          {/* Main Heading */}
          <h2
            className="circular-track-heading"
            style={{
              fontSize: 'clamp(2.1rem, 3.5vw, 3.2rem)',
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: '#111111',
              margin: 0,
              marginBottom: '1.75rem',
            }}
          >
            Brands and organisations we&apos;ve worked with.
          </h2>

          {/* Active Company Spotlight Card (Desktop Only) */}
          <div
            className="circular-track-spotlight-card"
            style={{
              backgroundColor: '#fafafa',
              borderRadius: '6px',
              padding: 'clamp(1.5rem, 2.2vw, 2rem)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem',
              }}
            >
              {/* Prominent Company Name (like Raysons) */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                  fontWeight: 500,
                  color: '#111111',
                  letterSpacing: '-0.03em',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {displayedCompany.name}
              </h3>

              <span
                className="tag-mono"
                style={{
                  fontSize: '0.75rem',
                  color: '#999999',
                  letterSpacing: '0.08em',
                }}
              >
                {String(
                  (hoveredIndex !== null ? hoveredIndex : activeIndex) + 1
                ).padStart(2, '0')}{' '}
                / {String(numCards).padStart(2, '0')}
              </span>
            </div>

            {/* Company Commercial Descriptor */}
            <p
              style={{
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                color: '#555555',
                lineHeight: 1.45,
                margin: 0,
                marginBottom: '1.25rem',
              }}
            >
              {displayedCompany.fullName} — {displayedCompany.desc}
            </p>

            {/* Direct Case Study Action Link */}
            <Link
              href={displayedCompany.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#111111',
                color: '#ffffff',
                padding: '0.65rem 1.25rem',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                textDecoration: 'none',
                fontSize: '0.825rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'transform 0.25s ease, background-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DE322D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111111';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>EXPLORE CASE STUDY</span>
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </Link>
          </div>
        </div>

        {/* ==================== RIGHT SIDE: ROTATING 3D CYLINDER ==================== */}
        <div
          className="circular-track-right-canvas"
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Three.js WebGL Cylindrical Ring Viewport */}
          <div
            ref={mountRef}
            className="circular-track-canvas-mount"
            style={{
              width: '100%',
              height: 'clamp(480px, 58vh, 620px)',
              cursor: isDraggingState
                ? 'grabbing'
                : hoveredIndex !== null
                ? 'pointer'
                : 'grab',
              touchAction: 'pan-y',
              display: 'block',
            }}
          />

          {/* Interactive Floating Cursor Tooltip with Company Name */}
          {hoveredIndex !== null && (
            <div
              style={{
                position: 'fixed',
                left: cursorPos.x + 16,
                top: cursorPos.y - 36,
                zIndex: 9999,
                pointerEvents: 'none',
                backgroundColor: '#111111',
                color: '#ffffff',
                padding: '0.45rem 0.85rem',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                transform: 'translate3d(0, 0, 0)',
                transition: 'opacity 0.15s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {COMPANIES[hoveredIndex].name}
              </span>
              <ArrowUpRight size={13} color="#ffffff" strokeWidth={2.4} />
            </div>
          )}

          {/* Hint Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              pointerEvents: 'none',
            }}
          >
            <span
              className="tag-mono"
              style={{
                fontSize: '0.625rem',
                color: '#aaaaaa',
                letterSpacing: '0.1em',
              }}
            >
              DRAG TO ROTATE ↺
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.circular-track-grid) {
          grid-template-columns: minmax(320px, 0.85fr) minmax(460px, 1.15fr);
          align-items: center;
        }
        @media screen and (max-width: 991px) {
          :global(.circular-track-grid) {
            grid-template-columns: 1fr !important;
            padding-top: 0.5rem !important;
            padding-bottom: 2rem !important;
            gap: 1.25rem !important;
          }
          :global(.circular-track-left-content) {
            display: flex !important;
            max-width: 100% !important;
            text-align: left !important;
          }
          :global(.circular-track-heading) {
            margin-bottom: 0.5rem !important;
            font-size: clamp(1.9rem, 6.2vw, 2.5rem) !important;
          }
          :global(.circular-track-spotlight-card) {
            display: none !important;
          }
          :global(.circular-track-right-canvas) {
            width: 100% !important;
            min-height: 360px !important;
          }
          :global(.circular-track-canvas-mount) {
            height: clamp(360px, 48vh, 440px) !important;
          }
        }
      `}</style>
    </div>
  );
}
