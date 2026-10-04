import gsap from 'gsap';

export function initPixelFaceEmoji() {
  const face = document.getElementById('pixel-face-emoji');
  if (!face) return;

  const eyes = face.querySelectorAll('.pixel-eye');
  const pupils = face.querySelectorAll('.pixel-pupil');
  const mouth = face.querySelector('.pixel-mouth');

  if (!eyes.length || !pupils.length) return;

  // Eye Tracking Logic
  const handleMouseMove = (e) => {
    eyes.forEach((eye, index) => {
      const pupil = pupils[index];
      if (!pupil) return;

      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.hypot(deltaX, deltaY);

      // Max pupil movement radius inside the eye socket
      const maxRadius = Math.max(3, rect.width * 0.28);
      const radius = Math.min(distance * 0.035, maxRadius);

      const pupilX = Math.cos(angle) * radius;
      const pupilY = Math.sin(angle) * radius;

      gsap.to(pupil, {
        x: pupilX,
        y: pupilY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  // Natural Random Blinking Animation
  let blinkTimeout;
  const triggerBlink = () => {
    gsap.to(eyes, {
      scaleY: 0.1,
      duration: 0.07,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        const nextBlinkDelay = 3000 + Math.random() * 3500;
        blinkTimeout = setTimeout(triggerBlink, nextBlinkDelay);
      },
    });
  };

  blinkTimeout = setTimeout(triggerBlink, 2500);

  // Fun Interactive Hover State
  face.addEventListener('mouseenter', () => {
    gsap.to(face, {
      scale: 1.15,
      rotate: -4,
      duration: 0.25,
      ease: 'back.out(2)',
    });
    if (mouth) {
      mouth.classList.add('is-excited');
    }
  });

  face.addEventListener('mouseleave', () => {
    gsap.to(face, {
      scale: 1,
      rotate: 0,
      duration: 0.35,
      ease: 'power2.out',
    });
    if (mouth) {
      mouth.classList.remove('is-excited');
    }
  });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    clearTimeout(blinkTimeout);
  };
}
