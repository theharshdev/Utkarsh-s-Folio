import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export class ScrollAnimationManager {
  constructor(webCanvasInstance) {
    this.webCanvas = webCanvasInstance;
    this.lenis = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.initSmoothScroll();
    this.initMarqueeScroller();
    this.initHorizontalShowcase();
    this.initEditorialSectionReveals();
    this.initExperienceTimeline();
  }

  initSmoothScroll() {
    if (this.prefersReducedMotion) return;

    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    this.lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (this.webCanvas) {
          this.webCanvas.setScrollProgress(self.progress);
        }
      }
    });
  }

  initMarqueeScroller() {
    const row1 = document.getElementById('marquee-track-1');
    const row2 = document.getElementById('marquee-track-2');

    if (row1) {
      const tween1 = gsap.to(row1, {
        xPercent: -50,
        ease: 'none',
        duration: 25,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: '#marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(tween1, {
            timeScale: 1 + Math.abs(self.getVelocity() / 400),
            duration: 0.2,
            overwrite: 'auto',
          });
        }
      });
    }

    if (row2) {
      const tween2 = gsap.fromTo(row2, { xPercent: -50 }, {
        xPercent: 0,
        ease: 'none',
        duration: 28,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: '#marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(tween2, {
            timeScale: 1 + Math.abs(self.getVelocity() / 400),
            duration: 0.2,
            overwrite: 'auto',
          });
        }
      });
    }
  }

  initHorizontalShowcase() {
    if (this.prefersReducedMotion) return;

    const track = document.getElementById('horizontal-track');
    const section = document.getElementById('projects');

    if (!track || !section) return;

    ScrollTrigger.matchMedia({
      // Desktop: Pinned horizontal scroll
      "(min-width: 1024px)": function() {
        const getDistance = () => {
          return track.scrollWidth - window.innerWidth + 96;
        };

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
          }
        });

        return () => {
          horizontalTween.kill();
          gsap.set(track, { clearProps: "all" });
        };
      },

      // Mobile/Tablet: Stacked normally (no pinning)
      "(max-width: 1023px)": function() {
        gsap.set(track, { clearProps: "all" });
      }
    });
  }

  initEditorialSectionReveals() {
    const reveals = document.querySelectorAll('.editorial-reveal');

    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    const bgNumbers = document.querySelectorAll('.bg-huge-number');
    bgNumbers.forEach((num) => {
      gsap.to(num, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: num.parentElement || num,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });
  }

  initExperienceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-node-item');

    timelineItems.forEach((item) => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        }
      });

      if (dot) {
        tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' });
      }
      if (card) {
        tl.fromTo(card, { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      }
    });
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}
