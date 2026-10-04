import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initThreeScene() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  // Scene & Camera setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe7e6e1, 20, 65);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 22);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  renderer.domElement.className = 'w-full h-full block';

  // Group to hold all 3D AI system components
  const aiSystemGroup = new THREE.Group();
  scene.add(aiSystemGroup);

  // 1. Central Intelligent Processing Core (LLM & Synthesis Core)
  const coreGroup = new THREE.Group();
  
  // Outer Wireframe Polyhedron
  const outerCoreGeo = new THREE.IcosahedronGeometry(2.5, 1);
  const outerCoreMat = new THREE.MeshBasicMaterial({
    color: 0xff4d00,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const outerCore = new THREE.Mesh(outerCoreGeo, outerCoreMat);
  coreGroup.add(outerCore);

  // Inner Solid Glowing Core
  const innerCoreGeo = new THREE.OctahedronGeometry(1.2, 0);
  const innerCoreMat = new THREE.MeshBasicMaterial({
    color: 0xff4d00,
    wireframe: false,
    transparent: true,
    opacity: 0.9,
  });
  const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
  coreGroup.add(innerCore);

  // Orbital Vector Rings around core
  const ringGeo1 = new THREE.RingGeometry(3.6, 3.65, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x334155,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35,
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  coreGroup.add(ring1);

  const ringGeo2 = new THREE.RingGeometry(4.4, 4.45, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xff4d00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45,
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  coreGroup.add(ring2);

  // Position core on right side
  coreGroup.position.set(5.5, 0.5, 0);
  aiSystemGroup.add(coreGroup);

  // 2. Vector Embedding Space Nodes (Points & Clusters)
  const isMobile = window.innerWidth < 768;
  const nodeCount = isMobile ? 60 : 150;
  const nodePositions = [];
  const nodeColors = [];
  const nodeNodes = [];

  const colorPalette = [
    new THREE.Color(0xff4d00), // Electric Orange
    new THREE.Color(0x0f172a), // Deep Slate
    new THREE.Color(0x334155), // Slate Charcoal
    new THREE.Color(0xff4d00), // Electric Orange
    new THREE.Color(0x64748b), // Muted Slate Grey
  ];

  for (let i = 0; i < nodeCount; i++) {
    const clusterIndex = i % 4;
    let cx = 0, cy = 0, cz = 0;
    if (clusterIndex === 0) { cx = -3; cy = 2; cz = -2; }
    else if (clusterIndex === 1) { cx = 5; cy = 3; cz = -1; }
    else if (clusterIndex === 2) { cx = -2; cy = -3; cz = 1; }
    else { cx = 6; cy = -2; cz = 0; }

    const radius = 2.5 + Math.random() * 3.0;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    const x = cx + radius * Math.sin(phi) * Math.cos(theta);
    const y = cy + radius * Math.sin(phi) * Math.sin(theta);
    const z = cz + radius * Math.cos(phi);

    nodePositions.push(x, y, z);

    const pickedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    nodeColors.push(pickedColor.r, pickedColor.g, pickedColor.b);

    nodeNodes.push({
      baseX: x, baseY: y, baseZ: z,
      currentX: x, currentY: y, currentZ: z,
      speed: 0.2 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
    });
  }

  const nodesGeometry = new THREE.BufferGeometry();
  nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
  nodesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

  // Crisp circular texture via canvas
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.85)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const pointTexture = new THREE.CanvasTexture(canvas);

  const nodesMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.35 : 0.45,
    vertexColors: true,
    map: pointTexture,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });

  const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
  aiSystemGroup.add(nodesMesh);

  // 3. Dynamic Connecting Neural Lines
  const maxLineConnections = isMobile ? 35 : 80;
  const linePositions = new Float32Array(maxLineConnections * 6);
  const lineColors = new Float32Array(maxLineConnections * 6);

  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
  });

  const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  aiSystemGroup.add(linesMesh);

  // 4. Floating Document & Vector Cards
  const cardGroup = new THREE.Group();
  const cardGeo = new THREE.PlaneGeometry(1.2, 0.8);
  const cardBorderGeo = new THREE.EdgesGeometry(cardGeo);
  const cardCount = isMobile ? 4 : 8;
  const cardMeshes = [];

  for (let i = 0; i < cardCount; i++) {
    const cardBorderMat = new THREE.LineBasicMaterial({
      color: 0xff4d00,
      transparent: true,
      opacity: 0.45,
    });
    const cardMesh = new THREE.LineSegments(cardBorderGeo, cardBorderMat);
    
    const angle = (i / cardCount) * Math.PI * 2;
    const distance = 5.5 + Math.random() * 3;
    cardMesh.position.set(
      Math.cos(angle) * distance + (i % 2 === 0 ? 3 : -2),
      Math.sin(angle) * 3 + (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 4
    );
    cardMesh.rotation.set(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    );

    cardGroup.add(cardMesh);
    cardMeshes.push({
      mesh: cardMesh,
      rotSpeedX: 0.002 * (Math.random() + 0.5),
      rotSpeedY: 0.003 * (Math.random() + 0.5),
      floatOffset: Math.random() * Math.PI * 2,
    });
  }
  aiSystemGroup.add(cardGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const orangeLight = new THREE.PointLight(0xff4d00, 2.5, 50);
  orangeLight.position.set(6, 2, 5);
  scene.add(orangeLight);

  // Mouse Parallax coordinates
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // GSAP ScrollTrigger Integration
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;
      aiSystemGroup.rotation.y = p * 0.8;
      camera.position.z = 22 + p * 8;
      camera.position.y = -p * 6;
    },
  });

  // Animation Loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth Mouse Lerp
    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    // Apply mouse parallax
    aiSystemGroup.rotation.x = currentMouseY * 0.15;
    aiSystemGroup.rotation.y = currentMouseX * 0.25 + elapsedTime * 0.03;

    // Rotate Central Processing Core
    outerCore.rotation.x += 0.004;
    outerCore.rotation.y += 0.006;
    innerCore.rotation.x -= 0.008;
    innerCore.rotation.y -= 0.01;
    ring1.rotation.z += 0.003;
    ring2.rotation.z -= 0.005;

    // Pulse Inner Core scale subtly
    const corePulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
    innerCore.scale.set(corePulse, corePulse, corePulse);

    // Update Nodes and Lines
    const positions = nodesGeometry.attributes.position.array;
    let lineIdx = 0;
    const maxDist = 3.6;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < nodeCount; i++) {
      const node = nodeNodes[i];
      const offset = node.offset + elapsedTime * node.speed;
      node.currentX = node.baseX + Math.sin(offset) * 0.35;
      node.currentY = node.baseY + Math.cos(offset * 0.8) * 0.35;
      node.currentZ = node.baseZ + Math.sin(offset * 1.2) * 0.25;

      positions[i * 3] = node.currentX;
      positions[i * 3 + 1] = node.currentY;
      positions[i * 3 + 2] = node.currentZ;

      if (lineIdx < maxLineConnections) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (lineIdx >= maxLineConnections) break;
          const other = nodeNodes[j];
          const dx = node.currentX - other.currentX;
          const dy = node.currentY - other.currentY;
          const dz = node.currentZ - other.currentZ;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            const alpha = 1.0 - Math.sqrt(distSq) / maxDist;
            
            linePositions[lineIdx * 6] = node.currentX;
            linePositions[lineIdx * 6 + 1] = node.currentY;
            linePositions[lineIdx * 6 + 2] = node.currentZ;

            linePositions[lineIdx * 6 + 3] = other.currentX;
            linePositions[lineIdx * 6 + 4] = other.currentY;
            linePositions[lineIdx * 6 + 5] = other.currentZ;

            // Line colors (Orange to Slate)
            lineColors[lineIdx * 6] = 1.0 * alpha;
            lineColors[lineIdx * 6 + 1] = 0.3 * alpha;
            lineColors[lineIdx * 6 + 2] = 0.0 * alpha;

            lineColors[lineIdx * 6 + 3] = 0.2 * alpha;
            lineColors[lineIdx * 6 + 4] = 0.25 * alpha;
            lineColors[lineIdx * 6 + 5] = 0.3 * alpha;

            lineIdx++;
          }
        }
      }
    }

    nodesGeometry.attributes.position.needsUpdate = true;

    for (let k = lineIdx; k < maxLineConnections; k++) {
      linePositions[k * 6] = 0;
      linePositions[k * 6 + 1] = 0;
      linePositions[k * 6 + 2] = 0;
      linePositions[k * 6 + 3] = 0;
      linePositions[k * 6 + 4] = 0;
      linePositions[k * 6 + 5] = 0;
    }
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;

    // Update Floating Cards
    cardMeshes.forEach((item) => {
      item.mesh.rotation.x += item.rotSpeedX;
      item.mesh.rotation.y += item.rotSpeedY;
      item.mesh.position.y += Math.sin(elapsedTime * 1.5 + item.floatOffset) * 0.002;
    });

    renderer.render(scene, camera);
  };

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}
