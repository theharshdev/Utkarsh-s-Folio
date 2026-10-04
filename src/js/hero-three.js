import * as THREE from 'three';

export function initHeroThree() {
  const container = document.getElementById('hero-three-wrap');
  const canvas = document.getElementById('hero-three-canvas');

  if (!container || !canvas) return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 380;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 6.2;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Master Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Helper to create thin, crisp 3D Circle Lines
  const createCircleLine = (radius, color, opacity = 0.65, segments = 128) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
      linewidth: 1,
    });
    return new THREE.LineLoop(geometry, material);
  };

  // Helper for thin Torus ring for depth
  const createTorusRing = (radius, tube, color, opacity = 0.75) => {
    const geometry = new THREE.TorusGeometry(radius, tube, 16, 120);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
    });
    return new THREE.Mesh(geometry, material);
  };

  // 1. Primary Orange Circle Ring
  const ring1 = createTorusRing(1.85, 0.012, 0xff4d00, 0.85);
  ring1.rotation.x = Math.PI / 3;
  masterGroup.add(ring1);

  // 2. Secondary Dark Obsidian Meridian Ring
  const ring2 = createTorusRing(2.1, 0.009, 0x1a1a1a, 0.45);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 6;
  masterGroup.add(ring2);

  // 3. Third Oblique Vector Ring (Orange Accent)
  const ring3 = createTorusRing(1.6, 0.008, 0xff4d00, 0.6);
  ring3.rotation.x = -Math.PI / 3;
  ring3.rotation.y = Math.PI / 3;
  masterGroup.add(ring3);

  // 4. Large Outer Ambient Horizon Ring
  const ring4 = createCircleLine(2.4, 0x0c0c0c, 0.25);
  ring4.rotation.x = Math.PI / 2.2;
  masterGroup.add(ring4);

  // 5. Inner Precise Concentric Circle
  const ring5 = createCircleLine(1.3, 0xff4d00, 0.5);
  ring5.rotation.y = Math.PI / 2;
  masterGroup.add(ring5);

  // 6. Subtle Dashed/Micro Coordinate Dots along orbit
  const dotCount = 28;
  const dotPositions = new Float32Array(dotCount * 3);
  for (let i = 0; i < dotCount; i++) {
    const theta = (i / dotCount) * Math.PI * 2;
    dotPositions[i * 3] = Math.cos(theta) * 1.85;
    dotPositions[i * 3 + 1] = Math.sin(theta) * 1.85;
    dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
  const dotMat = new THREE.PointsMaterial({
    color: 0xff4d00,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
  });
  const orbitDots = new THREE.Points(dotGeo, dotMat);
  ring1.add(orbitDots);

  // Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const onMouseMove = (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (e.clientX - windowHalfX) * 0.0006;
    mouseY = (e.clientY - windowHalfY) * 0.0006;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Animation Loop
  let animationId;
  let clock = new THREE.Clock();

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Damping mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    masterGroup.rotation.x = targetY + elapsedTime * 0.12;
    masterGroup.rotation.y = targetX + elapsedTime * 0.16;

    // Independent smooth ring rotations
    ring1.rotation.z = elapsedTime * 0.25;
    ring2.rotation.x = elapsedTime * 0.18;
    ring2.rotation.z = -elapsedTime * 0.15;
    ring3.rotation.y = -elapsedTime * 0.3;
    ring4.rotation.z = elapsedTime * 0.08;
    ring5.rotation.x = -elapsedTime * 0.22;

    renderer.render(scene, camera);
  };

  animate();

  // Resize Handler
  const handleResize = () => {
    if (!container) return;
    const newWidth = container.clientWidth || 380;
    const newHeight = container.clientHeight || 380;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
  };
}
