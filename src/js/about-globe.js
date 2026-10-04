import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAboutGlobe() {
  const container = document.getElementById('about-globe-wrap');
  const canvas = document.getElementById('about-globe-canvas');
  const aboutSection = document.getElementById('about');

  if (!container || !canvas || !aboutSection) return;

  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || 750;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  
  const isMobile = width < 768;
  camera.position.z = isMobile ? 10.2 : 8.2;
  camera.position.y = 0;
  camera.position.x = 0;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
  scene.add(ambientLight);

  const orangePointLight = new THREE.PointLight(0xff4d00, 4.5, 20);
  orangePointLight.position.set(4, 3, 6);
  scene.add(orangePointLight);

  const masterGlobeGroup = new THREE.Group();
  masterGlobeGroup.position.x = isMobile ? 0 : (width > 1200 ? 2.2 : 1.4);
  masterGlobeGroup.position.y = 0;
  scene.add(masterGlobeGroup);

  const globeRadius = 3.0;

  // 1. Semi-translucent Dark Obsidian Core Sphere (depth shading)
  const coreGeo = new THREE.SphereGeometry(globeRadius * 0.985, 36, 36);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x0c0c0c,
    transparent: true,
    opacity: 0.12,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  masterGlobeGroup.add(coreMesh);

  // 2. Geometric Latitude & Longitude Wireframe Rings
  const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(globeRadius, 3));
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xff4d00,
    transparent: true,
    opacity: 0.25,
  });
  const wireGlobe = new THREE.LineSegments(wireGeo, wireMat);
  masterGlobeGroup.add(wireGlobe);

  // 3. Dense Surface Coordinate Point Cloud (Orange Nodes)
  const pointCount = 950;
  const positions = new Float32Array(pointCount * 3);
  for (let i = 0; i < pointCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / pointCount);
    const theta = Math.sqrt(pointCount * Math.PI) * phi;

    positions[i * 3] = globeRadius * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = globeRadius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = globeRadius * Math.cos(phi);
  }

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pointMat = new THREE.PointsMaterial({
    color: 0xff4d00,
    size: 0.045,
    transparent: true,
    opacity: 0.88,
  });
  const pointCloud = new THREE.Points(pointGeo, pointMat);
  masterGlobeGroup.add(pointCloud);

  // 4. Floating Atmospheric Orbit Ring (Large Curved Meridian)
  const ringGeo = new THREE.TorusGeometry(globeRadius * 1.14, 0.012, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xff4d00,
    transparent: true,
    opacity: 0.45,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2.6;
  ringMesh.rotation.y = -Math.PI / 5;
  masterGlobeGroup.add(ringMesh);

  const ringGeo2 = new THREE.TorusGeometry(globeRadius * 1.25, 0.008, 16, 120);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x0c0c0c,
    transparent: true,
    opacity: 0.22,
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.x = -Math.PI / 3;
  masterGlobeGroup.add(ringMesh2);

  // 5. Data Flow Trajectory Arcs (Curved Splines between Nodes)
  const createDataArc = (startVec, endVec, peakHeight, color = 0xff4d00) => {
    const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const midLength = midVec.length();
    midVec.normalize().multiplyScalar(midLength + peakHeight);

    const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    const points = curve.getPoints(32);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
    const arcMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.65,
    });
    return new THREE.Line(arcGeo, arcMat);
  };

  const arcsGroup = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const idx1 = Math.floor(Math.random() * pointCount);
    const idx2 = Math.floor(Math.random() * pointCount);
    const v1 = new THREE.Vector3(positions[idx1 * 3], positions[idx1 * 3 + 1], positions[idx1 * 3 + 2]);
    const v2 = new THREE.Vector3(positions[idx2 * 3], positions[idx2 * 3 + 1], positions[idx2 * 3 + 2]);
    const arc = createDataArc(v1, v2, 0.35 + Math.random() * 0.4);
    arcsGroup.add(arc);
  }
  masterGlobeGroup.add(arcsGroup);

  // Set aesthetic static tilt angle
  masterGlobeGroup.rotation.z = -0.22;
  masterGlobeGroup.rotation.x = 0.35;

  // ScrollTrigger Scroll Rotation (Rotates naturally as user scrolls)
  ScrollTrigger.create({
    trigger: aboutSection,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.2,
    onUpdate: (self) => {
      masterGlobeGroup.rotation.y = self.progress * Math.PI * 1.5;
    },
  });

  // Animation Loop - Autonomous steady rotation (Zero mouse following)
  let animationId;
  let clock = new THREE.Clock();

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Continuous steady kinetic rotation
    wireGlobe.rotation.y += delta * 0.12;
    pointCloud.rotation.y += delta * 0.12;
    arcsGroup.rotation.y += delta * 0.12;

    ringMesh.rotation.z = elapsedTime * 0.08;
    ringMesh2.rotation.z = -elapsedTime * 0.06;

    renderer.render(scene, camera);
  };

  animate();

  // Resize Handler
  const handleResize = () => {
    if (!container) return;
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || 750;

    const isMob = width < 768;
    camera.aspect = width / height;
    camera.position.z = isMob ? 10.2 : 8.2;
    camera.updateProjectionMatrix();

    masterGlobeGroup.position.x = isMob ? 0 : (width > 1200 ? 2.2 : 1.4);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
  };
}
