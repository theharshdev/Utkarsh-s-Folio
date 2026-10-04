import gsap from 'gsap';

export function initLoader(onComplete) {
  // Prevent browser scroll restoration and force top scroll on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Lock scrolling during page load
  document.body.classList.add('overflow-hidden');
  document.documentElement.classList.add('overflow-hidden');

  const loaderElement = document.getElementById('page-loader');
  const percentText = document.getElementById('loader-percent');
  const appRoot = document.getElementById('app-root');

  if (!loaderElement || !percentText) {
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    if (appRoot) {
      appRoot.classList.remove('opacity-0', 'pointer-events-none');
      appRoot.classList.add('opacity-100');
    }
    if (onComplete) onComplete();
    return;
  }

  const progress = { val: 0 };

  const updateDisplay = () => {
    const current = Math.min(100, Math.floor(progress.val));
    percentText.textContent = current < 10 ? `0${current}` : `${current}`;
  };

  // Realistic non-linear loading timeline with distinct delays and stalls (~4.8s total)
  const loaderTimeline = gsap.timeline({
    onUpdate: updateDisplay,
    onComplete: () => {
      percentText.textContent = '100';

      // 1. Reveal the styled application container
      if (appRoot) {
        appRoot.classList.remove('opacity-0', 'pointer-events-none');
        appRoot.classList.add('opacity-100');
      }

      // 2. Authentic hold at 100 before smooth exit transition
      gsap.to(loaderElement, {
        opacity: 0,
        duration: 0.55,
        delay: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          loaderElement.classList.add('pointer-events-none');
          loaderElement.style.display = 'none';
          document.body.classList.remove('overflow-hidden');
          document.documentElement.classList.remove('overflow-hidden');
          if (onComplete) onComplete();
        },
      });
    },
  });

  loaderTimeline
    // Initial initialization jump
    .to(progress, { val: 12, duration: 0.4, ease: 'power2.out' })
    // Pause 1: Brief DOM asset parsing pause
    .to(progress, { val: 14, duration: 0.45, ease: 'sine.inOut' })
    // Step 2: Compiling Three.js shader program
    .to(progress, { val: 38, duration: 0.65, ease: 'power1.inOut' })
    // Pause 2: Realistic buffer allocation hesitation
    .to(progress, { val: 41, duration: 0.55, ease: 'none' })
    // Step 3: Fast surge through vertex matrices
    .to(progress, { val: 67, duration: 0.6, ease: 'power2.out' })
    // Pause 3: Texture streaming & geometry compilation pause
    .to(progress, { val: 71, duration: 0.5, ease: 'sine.inOut' })
    // Step 4: Advancing toward 80s
    .to(progress, { val: 86, duration: 0.55, ease: 'power1.out' })
    // Pause 4: Deliberate heavy deceleration / hold in the late 80s
    .to(progress, { val: 91, duration: 0.6, ease: 'power1.inOut' })
    // Pause 5: Final pipeline verification crawl
    .to(progress, { val: 96, duration: 0.55, ease: 'sine.out' })
    // Snap to completion
    .to(progress, { val: 100, duration: 0.35, ease: 'power2.in' });
}
