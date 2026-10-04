import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const fullscreenMenu = document.getElementById('fullscreen-orange-menu');
  const menuNavLinks = document.querySelectorAll('[data-menu-nav-target]');
  const directNavLinks = document.querySelectorAll('[data-nav-target]');

  let isMenuOpen = false;

  const lockScroll = () => {
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');
    if (window.lenis) window.lenis.stop();
  };

  const unlockScroll = () => {
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    if (window.lenis) window.lenis.start();
  };

  // Smooth Scroll Helper
  const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const performScroll = () => {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: -20,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 70,
          },
          ease: 'power3.inOut',
        });
      }
    };

    if (isMenuOpen) {
      closeMenu(performScroll);
    } else {
      performScroll();
    }
  };

  // Direct nav links (e.g. logo, CTA buttons, scroll button)
  directNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-nav-target');
      if (target) {
        scrollToSection(target);
      }
    });
  });

  // Fullscreen Menu Nav Links
  menuNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-menu-nav-target');
      if (target) {
        scrollToSection(target);
      }
    });
  });

  // Open Fullscreen Menu Animation (Cinematic Curtain Wipe & Kinetic Stagger)
  const openMenu = () => {
    if (isMenuOpen || !fullscreenMenu) return;
    isMenuOpen = true;

    fullscreenMenu.classList.remove('hidden', 'pointer-events-none');
    lockScroll();

    gsap.killTweensOf([
      fullscreenMenu,
      '#menu-header-bar',
      '#menu-footer-bar',
      '#menu-close-btn',
      '.menu-nav-item',
      '.menu-side-col > div',
    ]);

    const tl = gsap.timeline();

    // 1. Top-to-bottom curtain sheet entrance
    tl.fromTo(
      fullscreenMenu,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.65, ease: 'expo.out' }
    )
    // 2. Top and Bottom Bars Reveal
    .fromTo(
      '#menu-header-bar',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '#menu-footer-bar',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.5'
    )
    // 3. Close Button Back Spin
    .fromTo(
      menuCloseBtn,
      { rotate: -180, scale: 0.5, opacity: 0 },
      { rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' },
      '-=0.45'
    )
    // 4. Kinetic Staggered Links Cascade
    .fromTo(
      '.menu-nav-item',
      { y: 80, opacity: 0, rotate: 2 },
      { y: 0, opacity: 1, rotate: 0, duration: 0.65, stagger: 0.07, ease: 'power4.out' },
      '-=0.4'
    )
    // 5. Right Sidebar Telemetry Stagger
    .fromTo(
      '.menu-side-col > div',
      { x: 35, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.45'
    );
  };

  // Close Fullscreen Menu Animation (Ultra-Fast Retract & Smooth Collapse)
  const closeMenu = (callback) => {
    if (!isMenuOpen || !fullscreenMenu) return;
    isMenuOpen = false;

    gsap.killTweensOf([
      fullscreenMenu,
      '#menu-header-bar',
      '#menu-footer-bar',
      '#menu-close-btn',
      '.menu-nav-item',
      '.menu-side-col > div',
    ]);

    const tl = gsap.timeline({
      onComplete: () => {
        fullscreenMenu.classList.add('hidden', 'pointer-events-none');
        unlockScroll();
        // Reset transform for next opening
        gsap.set(fullscreenMenu, { yPercent: 0 });
        if (callback && typeof callback === 'function') {
          callback();
        }
      },
    });

    // 1. Rapid Nav Items Collapse Upward
    tl.to('.menu-nav-item', {
      y: -40,
      opacity: 0,
      duration: 0.22,
      stagger: 0.025,
      ease: 'power3.in',
    })
    // 2. Sidebar slide out
    .to(
      '.menu-side-col > div',
      { x: 25, opacity: 0, duration: 0.18, stagger: 0.02, ease: 'power2.in' },
      '-=0.15'
    )
    // 3. Spin Close Button Out
    .to(
      menuCloseBtn,
      { rotate: 90, scale: 0.6, opacity: 0, duration: 0.18, ease: 'power2.in' },
      '-=0.18'
    )
    // 4. Fade Bars
    .to(
      ['#menu-header-bar', '#menu-footer-bar'],
      { opacity: 0, duration: 0.18, ease: 'power2.in' },
      '-=0.18'
    )
    // 5. Smooth Sheet Retract
    .to(
      fullscreenMenu,
      {
        yPercent: -100,
        duration: 0.45,
        ease: 'expo.inOut',
      },
      '-=0.1'
    );
  };

  // Interactive Hover Focus on Nav Links
  const navList = document.getElementById('menu-nav-list');
  if (navList) {
    menuNavLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        menuNavLinks.forEach((other) => {
          if (other !== link) {
            gsap.to(other, { opacity: 0.35, duration: 0.25, ease: 'power2.out' });
          } else {
            gsap.to(other, { opacity: 1, x: 16, duration: 0.25, ease: 'power2.out' });
          }
        });
      });
    });

    navList.addEventListener('mouseleave', () => {
      menuNavLinks.forEach((link) => {
        gsap.to(link, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' });
      });
    });
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', () => closeMenu());
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // Active section indicator using ScrollTrigger
  const sections = ['hero', 'about', 'experience', 'expertise', 'architecture', 'projects', 'cta', 'contact'];
  
  sections.forEach((secId) => {
    const secEl = document.getElementById(secId);
    if (!secEl) return;

    ScrollTrigger.create({
      trigger: secEl,
      start: 'top center+=100',
      end: 'bottom center+=100',
      onToggle: (self) => {
        if (self.isActive) {
          updateActiveNav(secId);
        }
      },
    });
  });

  function updateActiveNav(activeId) {
    menuNavLinks.forEach((link) => {
      const target = link.getAttribute('data-menu-nav-target');
      if (target === activeId) {
        link.classList.add('translate-x-3');
      } else {
        link.classList.remove('translate-x-3');
      }
    });
  }

  // Lockout navbar during the Ball Roadmap section
  let isBallRoadmapActive = false;
  const roadmapSection = document.getElementById('velocity-roadmap');

  if (roadmapSection) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: roadmapSection,
        start: 'top top',
        end: '+=280%',
        onEnter: () => {
          isBallRoadmapActive = true;
          if (navbar) {
            gsap.to(navbar, { y: '-100%', duration: 0.25, ease: 'power2.inOut' });
          }
        },
        onEnterBack: () => {
          isBallRoadmapActive = true;
          if (navbar) {
            gsap.to(navbar, { y: '-100%', duration: 0.25, ease: 'power2.inOut' });
          }
        },
        onLeave: () => {
          isBallRoadmapActive = false;
        },
        onLeaveBack: () => {
          isBallRoadmapActive = false;
        },
      });
    });
  }

  // Smart Auto-Hide Navbar: Scroll Down = Hide, Scroll Up = Show
  let lastScrollY = window.scrollY;
  let isNavHidden = false;

  window.addEventListener(
    'scroll',
    () => {
      if (isMenuOpen || !navbar) return;
      const currentScrollY = window.scrollY;

      // Inside Ball Roadmap section: keep navbar strictly hidden at all times
      if (isBallRoadmapActive) {
        if (!isNavHidden) {
          isNavHidden = true;
          gsap.to(navbar, { y: '-100%', duration: 0.25, ease: 'power2.inOut' });
        }
        lastScrollY = currentScrollY;
        return;
      }

      // At top of page: always show cleanly in transparent state
      if (currentScrollY <= 60) {
        if (isNavHidden) {
          gsap.to(navbar, { y: '0%', duration: 0.35, ease: 'power2.out' });
          isNavHidden = false;
        }
        navbar.classList.remove('bg-[#e7e6e1]/95', 'backdrop-blur-md', 'border-black/10', 'shadow-md');
        navbar.classList.add('bg-transparent', 'border-transparent');
        lastScrollY = currentScrollY;
        return;
      }

      navbar.classList.add('bg-[#e7e6e1]/95', 'backdrop-blur-md', 'border-black/10', 'shadow-md');
      navbar.classList.remove('bg-transparent', 'border-transparent');

      const scrollDelta = currentScrollY - lastScrollY;

      // Scroll Down (delta > 6): Hide Navbar
      if (scrollDelta > 6 && !isNavHidden && currentScrollY > 100) {
        isNavHidden = true;
        gsap.to(navbar, {
          y: '-100%',
          duration: 0.35,
          ease: 'power2.inOut',
        });
      }
      // Scroll Up (delta < -6): Reveal Navbar
      else if (scrollDelta < -6 && isNavHidden) {
        isNavHidden = false;
        gsap.to(navbar, {
          y: '0%',
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
}
