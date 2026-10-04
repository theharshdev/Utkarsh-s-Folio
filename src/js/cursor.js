import gsap from 'gsap';

export function initCustomCursor() {
  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches
    );
  };

  const cursorContainer = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (!cursorContainer || !cursorDot || isTouchDevice()) {
    if (cursorContainer) {
      cursorContainer.classList.add('hidden');
    }
    return;
  }

  // Smooth lerp tracking using GSAP quickTo
  const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.12, ease: 'power2.out' });
  const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.12, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    if (cursorContainer.classList.contains('opacity-0')) {
      cursorContainer.classList.remove('opacity-0');
      cursorContainer.classList.add('opacity-100');
    }

    setDotX(e.clientX);
    setDotY(e.clientY);
  });

  window.addEventListener('mouseleave', () => {
    cursorContainer.classList.add('opacity-0');
    cursorContainer.classList.remove('opacity-100');
  });

  window.addEventListener('mouseenter', () => {
    cursorContainer.classList.remove('opacity-0');
    cursorContainer.classList.add('opacity-100');
  });

  // Micro scale on clickable elements
  const updateCursorInteractions = () => {
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor], .project-accordion-header'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorDot, {
          scale: 1.6,
          duration: 0.25,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
      });
    });
  };

  updateCursorInteractions();
  window.refreshCursorInteractions = updateCursorInteractions;
}
