import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { WebCanvasUniverse } from './three/webCanvas.js';
import { CinematicLoader } from './components/loader.js';
import { NavigationManager } from './components/navigation.js';
import { TechHubInteractive } from './components/techHub.js';
import { ProjectModal } from './components/projectModal.js';
import { BlogModal } from './components/blogModal.js';
import { ContactManager } from './components/contactManager.js';
import { ScrollAnimationManager } from './animations/scrollManager.js';
import { initMagneticElements } from './animations/magnetic.js';

// ── Register GSAP plugins ─────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Disable browser scroll restoration ───────────────────────────────────────
// Must be set before DOMContentLoaded fires to prevent browser from
// restoring scroll position after reload.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to very top immediately — runs before any paint
window.scrollTo(0, 0);

// ─────────────────────────────────────────────────────────────────────────────

function initPortfolio() {
  // Ensure we're still at the top after loader exit (some browsers
  // attempt restoration again after DOMContentLoaded)
  window.scrollTo(0, 0);

  // 1. Initialize Canvas Universe
  const threeUniverse = new WebCanvasUniverse(document.getElementById('three-web-bg'));

  // 2. Initialize Scroll Choreography & Lenis smooth scroll
  const scrollManager = new ScrollAnimationManager(threeUniverse);

  // Store global reference for scroll isolation
  window.__lenis = scrollManager.lenis;

  // 3. Initialize Navigation — pass lenis so nav can pause/resume it
  const navigation = new NavigationManager(scrollManager.lenis);

  // 4. Initialize Tech Matrix Interactive Hub
  const techHub = new TechHubInteractive();

  // 5. Initialize Project Case Study Modal
  const projectModal = new ProjectModal(scrollManager.lenis);

  // 6. Initialize Blog Publications Modal Reader
  const blogModal = new BlogModal(scrollManager.lenis);

  // 7. Initialize Contact System & Toast
  const contactManager = new ContactManager(scrollManager.lenis);

  // 8. Initialize Magnetic Proximity Elements
  initMagneticElements();

  // 8. Cinematic Hero Entrance Motion Timeline (runs after loader exits)
  const heroTL = gsap.timeline({ delay: 0.15 });

  heroTL
    .fromTo('#hero-meta-top',
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.hero-title-line',
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo('#hero-lower-grid',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .add(() => {
      threeUniverse.playEntrance();
    }, '-=0.8');

  // Refresh ScrollTrigger once layout is fully painted
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    navigation.refresh();
  });

  // Sync on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    navigation.refresh();
  }, { passive: true });
}

// ── Entry Point ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Belt-and-suspenders: ensure top on DOMContentLoaded too
  window.scrollTo(0, 0);

  new CinematicLoader(() => {
    initPortfolio();
  });
});
