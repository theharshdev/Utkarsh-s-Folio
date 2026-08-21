import { gsap } from 'gsap';

export class CinematicLoader {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.loaderEl   = document.getElementById('cinematic-loader');
    this.nameEl     = document.getElementById('loader-name');
    this.statusEl   = document.getElementById('loader-status');
    this.progressEl = document.getElementById('loader-progress-bar');
    this.percentEl  = document.getElementById('loader-percent');

    this.hasCompleted = false;

    // Lock scroll immediately on creation
    this.lockScroll();

    this.init();
  }

  // Prevent any wheel, touch drag, or keyboard scrolling while loader is active
  preventScrollHandler = (e) => {
    // If it's a keyboard event, block navigation keys
    if (e.type === 'keydown') {
      const blockedKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ', 'Home', 'End'];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
      }
      return;
    }
    e.preventDefault();
  };

  lockScroll() {
    // Force scroll position to top
    window.scrollTo(0, 0);

    // CSS overflow locking
    document.documentElement.classList.add('overflow-hidden');
    document.body.classList.add('overflow-hidden');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';

    // Event-level locking for mouse wheel, trackpad, touch swipe, and key presses
    window.addEventListener('wheel', this.preventScrollHandler, { passive: false });
    window.addEventListener('touchmove', this.preventScrollHandler, { passive: false });
    window.addEventListener('keydown', this.preventScrollHandler, { passive: false });
  }

  unlockScroll() {
    // Remove event-level locks
    window.removeEventListener('wheel', this.preventScrollHandler);
    window.removeEventListener('touchmove', this.preventScrollHandler);
    window.removeEventListener('keydown', this.preventScrollHandler);

    // Restore CSS overflow
    document.documentElement.classList.remove('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.height = '';

    // Ensure we start at top of page
    window.scrollTo(0, 0);
  }

  updateDisplay(val) {
    const rounded = Math.max(0, Math.min(100, Math.round(val)));
    if (this.percentEl) this.percentEl.textContent = rounded;
    if (this.progressEl) this.progressEl.style.width = `${rounded}%`;
  }

  finish() {
    if (this.hasCompleted) return;
    this.hasCompleted = true;

    gsap.to(this.loaderEl, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (this.loaderEl) {
          this.loaderEl.style.display = 'none';
          this.loaderEl.setAttribute('aria-hidden', 'true');
        }

        // Unlock scroll after loader has fully faded away
        this.unlockScroll();

        if (this.onComplete) this.onComplete();
      },
    });
  }

  init() {
    if (!this.loaderEl) {
      this.finish();
      return;
    }

    // Safety fallback timer
    const safetyTimer = setTimeout(() => this.finish(), 6000);

    // Initial state
    gsap.set([this.nameEl, this.statusEl, this.percentEl], { opacity: 0 });
    gsap.set(this.nameEl, { y: 10 });

    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimer);
        this.finish();
      },
    });

    tl
      // 1. Entrance animation
      .to(this.nameEl, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      .to([this.statusEl, this.percentEl], {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.25')

      // 2. Smooth, realistic loading progression
      // Phase 1: 0 → 28%
      .to(progress, {
        value: 28,
        duration: 0.6,
        ease: 'power1.out',
        onUpdate: () => this.updateDisplay(progress.value),
      })
      // Phase 2: 28 → 65% (steady work)
      .to(progress, {
        value: 65,
        duration: 1.1,
        ease: 'power1.inOut',
        onUpdate: () => this.updateDisplay(progress.value),
      })
      // Phase 3: 65 → 88%
      .to(progress, {
        value: 88,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => this.updateDisplay(progress.value),
      })
      // Phase 4: 88 → 98% (gentle slowdown near end)
      .to(progress, {
        value: 98,
        duration: 0.6,
        ease: 'power1.inOut',
        onUpdate: () => this.updateDisplay(progress.value),
      })
      // Phase 5: 98 → 100%
      .to(progress, {
        value: 100,
        duration: 0.25,
        ease: 'power2.in',
        onUpdate: () => this.updateDisplay(progress.value),
      })

      // Brief hold at 100% before smooth fade-out
      .to({}, { duration: 0.3 });
  }
}
