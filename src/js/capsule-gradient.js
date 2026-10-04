export function initCapsuleGradients() {
  const capsules = document.querySelectorAll('.hero-capsule');
  if (!capsules.length) return;

  const bgElements = Array.from(capsules)
    .map((capsule) => capsule.querySelector('.capsule-gradient-bg'))
    .filter(Boolean);

  if (!bgElements.length) return;

  // Single unified physics state for 100% synchronized identical behavior
  let currentX = 50;
  let currentY = 50;
  let targetX = 50;
  let targetY = 50;

  // Global mousemove listener across the whole website
  window.addEventListener(
    'mousemove',
    (e) => {
      // Global normalized cursor coordinates across the screen (0% to 100%)
      const normX = (e.clientX / window.innerWidth) * 100;
      const normY = (e.clientY / window.innerHeight) * 100;

      // Horizontal target
      targetX = Math.max(8, Math.min(92, normX));

      // Amplified vertical travel sensitivity
      const amplifiedY = 50 + (normY - 50) * 2.2;
      targetY = Math.max(-20, Math.min(120, amplifiedY));
    },
    { passive: true }
  );

  // When cursor leaves window, return target back to center
  window.addEventListener('mouseleave', () => {
    targetX = 50;
    targetY = 50;
  });

  // Snappier, direct responsiveness (less sluggish / less floaty smoothing)
  let time = 0;
  const updateLoop = () => {
    time += 0.035;

    // Subtle idle wave
    const idleWaveX = Math.sin(time) * 1.5;
    const idleWaveY = Math.cos(time * 1.2) * 3.5;

    // Snappier response rate (0.24 instead of slow 0.08)
    currentX += (targetX + idleWaveX - currentX) * 0.24;
    currentY += (targetY + idleWaveY - currentY) * 0.24;

    const formattedX = `${currentX.toFixed(2)}%`;
    const formattedY = `${currentY.toFixed(2)}%`;

    // Apply identical synchronized coordinates to all hero capsules
    bgElements.forEach((bg) => {
      bg.style.setProperty('--grad-x', formattedX);
      bg.style.setProperty('--grad-y', formattedY);
    });

    requestAnimationFrame(updateLoop);
  };

  requestAnimationFrame(updateLoop);
}
