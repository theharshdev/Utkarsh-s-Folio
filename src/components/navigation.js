import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export class NavigationManager {
  constructor(lenisInstance) {
    this.lenis    = lenisInstance;
    this.navbar   = document.getElementById('nav-wrapper');

    this.navLinks    = Array.from(document.querySelectorAll('.nav-item-link'));
    this.mobileLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));

    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.mobileMenu   = document.getElementById('mobile-menu');
    this.mobileClose  = document.getElementById('mobile-menu-close');

    this.currentSection   = 'home';
    this.isMobileOpen     = false;
    this.activeTween      = null;
    this.isScrolling      = false;
    this.isNavHidden      = false;

    this.init();
  }

  get navHeight() {
    return this.navbar ? this.navbar.offsetHeight : 0;
  }

  /**
   * Resolves target DOM element and section key from a link element or string
   */
  resolveTarget(target) {
    let key = null;
    let targetEl = null;

    if (typeof target === 'string') {
      key = target.replace('#', '').toLowerCase();
    } else if (target && target.getAttribute) {
      key = target.getAttribute('data-nav') || target.dataset.nav;
      if (!key) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          key = href.replace('#', '').toLowerCase();
        }
      }
    }

    if (!key) return { key: 'home', element: document.body };

    // Standardize synonyms
    if (key === 'work') key = 'projects';
    if (key === 'hero') key = 'home';

    if (key === 'home') {
      targetEl = document.getElementById('hero') || document.body;
    } else {
      targetEl = document.getElementById(key);
    }

    return { key, element: targetEl || document.body };
  }

  /**
   * Smoothly scrolls to target section using Lenis (when present) or GSAP ScrollTo
   */
  scrollToSection(target) {
    const { key, element } = this.resolveTarget(target);
    if (!element) return;

    // Reveal navbar during programmatic navigation
    this.showNavbar();

    // Kill any in-flight GSAP scroll
    if (this.activeTween) {
      this.activeTween.kill();
      this.activeTween = null;
    }

    const navOffset = this.navHeight + 10;
    const currentY = this.lenis ? this.lenis.scroll : window.scrollY;
    
    let targetY = 0;
    if (key !== 'home' && element !== document.body) {
      const rect = element.getBoundingClientRect();
      targetY = Math.max(0, rect.top + currentY - navOffset);
    }

    const distance = Math.abs(targetY - currentY);
    const duration = Math.min(1.3, Math.max(0.7, distance / 2000));

    this.isScrolling = true;
    this.setActive(key);

    if (this.lenis) {
      this.lenis.scrollTo(targetY, {
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          this.isScrolling = false;
          ScrollTrigger.refresh();
          this.setActive(key);
          this.showNavbar();
        }
      });
    } else {
      this.activeTween = gsap.to(window, {
        duration,
        scrollTo: { y: targetY, autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          this.activeTween = null;
          this.isScrolling = false;
          ScrollTrigger.refresh();
          this.setActive(key);
          this.showNavbar();
        },
      });
    }
  }

  /**
   * Reveal navbar — slides down into view
   */
  showNavbar() {
    if (!this.navbar) return;
    this.isNavHidden = false;
    this.navbar.style.transform = 'translate3d(0, 0px, 0)';
  }

  /**
   * Hide navbar — slides up out of view
   */
  hideNavbar() {
    if (!this.navbar || this.isNavHidden || this.isMobileOpen || this.isScrolling) return;
    this.isNavHidden = true;
    const h = (this.navbar.offsetHeight || 80) + 10;
    this.navbar.style.transform = `translate3d(0, -${h}px, 0)`;
  }

  /**
   * Setup smart sticky scroll listener
   */
  setupSmartSticky() {
    if (!this.navbar) return;

    let lastScrollY = window.scrollY;

    const handleScroll = (currentY) => {
      if (this.isMobileOpen || this.isScrolling) {
        this.showNavbar();
        lastScrollY = currentY;
        return;
      }

      // At top of page (first 60px): always show navbar
      if (currentY <= 60) {
        this.showNavbar();
        lastScrollY = currentY;
        return;
      }

      const diff = currentY - lastScrollY;

      // Scrolling DOWN -> hide navbar
      if (diff > 5 && currentY > 100) {
        this.hideNavbar();
      }
      // Scrolling UP (even slightly) -> reveal navbar
      else if (diff < -3) {
        this.showNavbar();
      }

      lastScrollY = currentY;
    };

    // 1. Lenis scroll listener
    if (this.lenis) {
      this.lenis.on('scroll', (e) => {
        const y = (typeof e.scroll === 'number') ? e.scroll : window.scrollY;
        handleScroll(y);
      });
    }

    // 2. Native scroll listener
    window.addEventListener('scroll', () => {
      handleScroll(window.scrollY);
    }, { passive: true });
  }

  setActive(key) {
    this.currentSection = key;

    this.navLinks.forEach((link) => {
      const { key: linkKey } = this.resolveTarget(link);
      if (linkKey === key) {
        link.classList.add('text-theme-text', 'font-semibold');
        link.classList.remove('text-theme-muted');
      } else {
        link.classList.remove('text-theme-text', 'font-semibold');
        link.classList.add('text-theme-muted');
      }
    });

    this.mobileLinks.forEach((link) => {
      const { key: linkKey } = this.resolveTarget(link);
      if (linkKey === key) {
        link.classList.add('text-theme-text', 'font-extrabold');
        link.classList.remove('text-theme-muted');
      } else {
        link.classList.remove('text-theme-text', 'font-extrabold');
        link.classList.add('text-theme-muted');
      }
    });
  }

  clearActive() {
    this.currentSection = 'home';
    this.navLinks.forEach((l) => {
      l.classList.remove('text-theme-text', 'font-semibold');
      l.classList.add('text-theme-muted');
    });
    this.mobileLinks.forEach((l) => {
      l.classList.remove('text-theme-text', 'font-extrabold');
      l.classList.add('text-theme-muted');
    });
  }

  handleLinkClick(e, target) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.scrollToSection(target);
    if (this.isMobileOpen) {
      this.closeMobileMenu();
    }
  }

  setupLinks() {
    const links = document.querySelectorAll('a[href^="#"], [data-nav]');
    links.forEach((link) => {
      link.replaceWith(link.cloneNode(true));
    });

    document.querySelectorAll('a[href^="#"], [data-nav]').forEach((link) => {
      link.addEventListener('click', (e) => this.handleLinkClick(e, link));
    });

    this.navLinks = Array.from(document.querySelectorAll('.nav-item-link'));
    this.mobileLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));
  }

  setupScrollSpy() {
    const sections = ['projects', 'about', 'experience', 'blog', 'contact'];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          if (!this.isScrolling) this.setActive(id);
        },
        onEnterBack: () => {
          if (!this.isScrolling) this.setActive(id);
        },
        onLeaveBack: () => {
          if (!this.isScrolling && id === sections[0]) this.clearActive();
        },
      });
    });
  }

  setupMobileMenu() {
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.mobileMenu   = document.getElementById('mobile-menu');
    this.mobileClose  = document.getElementById('mobile-menu-close');

    this.mobileToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openMobileMenu();
    });

    this.mobileClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeMobileMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileOpen) this.closeMobileMenu();
    });
  }

  openMobileMenu() {
    if (!this.mobileMenu) return;
    this.isMobileOpen = true;
    this.showNavbar();
    this.mobileMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    gsap.timeline()
      .fromTo(this.mobileMenu,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      )
      .fromTo('.mobile-menu-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.35, ease: 'power3.out' },
        '-=0.05'
      );
  }

  closeMobileMenu() {
    if (!this.mobileMenu) return;
    this.isMobileOpen = false;
    document.body.style.overflow = '';

    gsap.to(this.mobileMenu, {
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        this.mobileMenu.style.display = 'none';
      },
    });
  }

  init() {
    this.setupLinks();
    this.setupMobileMenu();
    this.setupScrollSpy();
    this.setupSmartSticky();

    requestAnimationFrame(() => this.setActive('home'));

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    }, { passive: true });
  }

  refresh() {
    ScrollTrigger.refresh();
    this.setActive(this.currentSection);
  }
}
