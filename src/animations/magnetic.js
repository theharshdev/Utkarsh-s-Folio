import { gsap } from 'gsap';

export function initMagneticElements() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  const magneticTargets = document.querySelectorAll('[data-magnetic]');

  magneticTargets.forEach((target) => {
    const strength = parseFloat(target.getAttribute('data-magnetic-strength')) || 0.15;
    const content = target.querySelector('[data-magnetic-content]') || target;

    let bounds = target.getBoundingClientRect();

    const updateBounds = () => {
      bounds = target.getBoundingClientRect();
    };

    target.addEventListener('mouseenter', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });

    target.addEventListener('mousemove', (e) => {
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(content, {
        x: deltaX,
        y: deltaY,
        duration: 0.2,
        ease: 'power1.out',
      });
    });

    target.addEventListener('mouseleave', () => {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
}
