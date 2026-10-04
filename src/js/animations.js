import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
if (typeof ScrollTrigger.clearScrollMemory === 'function') {
  ScrollTrigger.clearScrollMemory('manual');
}

export function initAnimations() {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();

  // 1. Hero Reveal sequence
  window.playHeroEntrance = () => {
    window.scrollTo(0, 0);
    const heroTl = gsap.timeline();

    heroTl
      .fromTo(
        '#main-navbar',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '#hero-heading .hero-line',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '#hero-bottom-row',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );
  };

  // 2. Animated Stats Counters
  const counterElements = document.querySelectorAll('[data-counter]');
  counterElements.forEach((el) => {
    const targetVal = parseFloat(el.getAttribute('data-counter'));
    const isPlus = el.getAttribute('data-plus') === 'true';
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + Math.floor(obj.val) + (isPlus ? '+' : '') + suffix;
          },
        });
      },
    });
  });

  // 3. Section Headers & Fade-Ups
  const fadeElements = document.querySelectorAll('[data-reveal]');
  fadeElements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // 4. Orbital Animated AI & RAG Engineering Lifecycle
  initOrbitalLifecycle();

  // 5. Parallax Achievements & Experience Drawers (Matching Reference Layout)
  initExperienceDrawers();
  initExperienceParallax();

  // 6. When I'm the Best Fit Interactive Tabs (Problem vs Solution)
  initFitTabs();

  // 6.5 Interactive Skills Filter Tabs
  initSkillsFilter();

  // 7. Interactive Project Accordions
  initProjectAccordions();

  // 8. Magnetic & GSAP Button Interactions
  initButtonInteractions();

  // 9. Interactive Hero Capsule Tilt
  initCapsuleInteractiveMotion();

  // 10. Scroll-Driven Stepped Tracks & 3D Rolling Orange Ball (Matching Reference Photo)
  initRollingBallScrollAnimation();
}

function initFitTabs() {
  const tabs = document.querySelectorAll('[data-fit-tab]');
  const problemTitle = document.getElementById('fit-problem-title');
  const problemDesc = document.getElementById('fit-problem-desc');
  const problemIcon = document.getElementById('fit-problem-icon');
  const solutionTitle = document.getElementById('fit-solution-title');
  const solutionDesc = document.getElementById('fit-solution-desc');
  const solutionIcon = document.getElementById('fit-solution-icon');

  if (!tabs.length || !problemTitle || !solutionTitle) return;

  const data = {
    rag: {
      probTitle: 'Standard RAG failure & LLM hallucination',
      probDesc: 'Naive RAG models struggle on complex enterprise rules, fail multi-step reasoning, and cannot extract deterministic answers from intricate regulatory documents.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
      solTitle: 'GraphRAG, Text-to-SQL & Agentic AI pipelines',
      solDesc: 'I engineer GraphRAG pipelines combining knowledge graphs, CFR rule mapping, and autonomous multi-agent reasoning—improving retrieval accuracy by 45% and saving 50+ hours/month.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
    },
    agentic: {
      probTitle: 'Standard RAG failure & LLM hallucination',
      probDesc: 'Naive RAG models struggle on complex enterprise rules, fail multi-step reasoning, and cannot extract deterministic answers from intricate regulatory documents.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
      solTitle: 'GraphRAG, Text-to-SQL & Agentic AI pipelines',
      solDesc: 'I engineer GraphRAG pipelines combining knowledge graphs, CFR rule mapping, and autonomous multi-agent reasoning—improving retrieval accuracy by 45% and saving 50+ hours/month.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
    },
    scalability: {
      probTitle: 'Monolithic latency & slow frontend rendering',
      probDesc: 'Backend services suffering from poor API throughput, unoptimized database queries, and heavy client bundles leading to sluggish page loads and slow feature delivery.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
      solTitle: 'Scalable Next.js, React & FastAPI architecture',
      solDesc: 'High-throughput full-stack engineering boosting API throughput & page-load performance by 35% with query tuning, caching layers, and <1.2s page-load speeds.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>',
    },
    fullstack: {
      probTitle: 'Monolithic latency & slow frontend rendering',
      probDesc: 'Backend services suffering from poor API throughput, unoptimized database queries, and heavy client bundles leading to sluggish page loads and slow feature delivery.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
      solTitle: 'Scalable Next.js, React & FastAPI architecture',
      solDesc: 'High-throughput full-stack engineering boosting API throughput & page-load performance by 35% with query tuning, caching layers, and <1.2s page-load speeds.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>',
    },
    vector: {
      probTitle: 'Unstructured data silos & high retrieval latency',
      probDesc: '50k+ to 5M+ enterprise documents, PDFs, and multimedia recordings stored without real-time semantic discovery, resulting in multi-second query bottlenecks.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
      solTitle: 'OpenSearch vector ingestion & multimodal Whisper',
      solDesc: 'Engineered scalable data connectors and OpenSearch ingestion pipelines processing 50k+ to 5M+ documents with <200ms semantic search latency and Whisper audio translation.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5h16M9 4v16"/>',
    },
    opensearch: {
      probTitle: 'Unstructured data silos & high retrieval latency',
      probDesc: '50k+ to 5M+ enterprise documents, PDFs, and multimedia recordings stored without real-time semantic discovery, resulting in multi-second query bottlenecks.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
      solTitle: 'OpenSearch vector ingestion & multimodal Whisper',
      solDesc: 'Engineered scalable data connectors and OpenSearch ingestion pipelines processing 50k+ to 5M+ documents with <200ms semantic search latency and Whisper audio translation.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5h16M9 4v16"/>',
    },
    apis: {
      probTitle: 'Manual audit backlogs & proctoring bottlenecks',
      probDesc: 'Organizations wasting hundreds of human hours on manual exam invigilation, manual compliance checking, and slow inspection procedures with high error rates.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829M6 18l6-6-6-6"/>',
      solTitle: 'AI computer vision & automated integrity workflows',
      solDesc: 'Built AI-proctored systems with live face recognition, automated anomaly detection, and dynamic 20+ widget dashboards, reducing manual invigilation effort by 65%.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
    },
    proctoring: {
      probTitle: 'Manual audit backlogs & proctoring bottlenecks',
      probDesc: 'Organizations wasting hundreds of human hours on manual exam invigilation, manual compliance checking, and slow inspection procedures with high error rates.',
      probIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829M6 18l6-6-6-6"/>',
      solTitle: 'AI computer vision & automated integrity workflows',
      solDesc: 'Built AI-proctored systems with live face recognition, automated anomaly detection, and dynamic 20+ widget dashboards, reducing manual invigilation effort by 65%.',
      solIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-fit-tab');
      const item = data[key];
      if (!item) return;

      tabs.forEach((t) => {
        t.classList.remove('bg-brand-orange', 'text-black', 'font-black', 'border-black', 'shadow-sm');
        t.classList.add('bg-white', 'text-neutral-800', 'font-bold', 'border-black/15');
      });

      tab.classList.remove('bg-white', 'text-neutral-800', 'font-bold', 'border-black/15');
      tab.classList.add('bg-brand-orange', 'text-black', 'font-black', 'border-black', 'shadow-sm');

      const elementsToAnimate = [problemTitle, problemDesc, solutionTitle, solutionDesc];
      if (problemIcon) elementsToAnimate.push(problemIcon);
      if (solutionIcon) elementsToAnimate.push(solutionIcon);

      gsap.to(elementsToAnimate, {
        opacity: 0,
        y: 6,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          problemTitle.textContent = item.probTitle;
          problemDesc.textContent = item.probDesc;
          solutionTitle.textContent = item.solTitle;
          solutionDesc.textContent = item.solDesc;

          if (problemIcon && item.probIcon) {
            problemIcon.innerHTML = item.probIcon;
          }

          if (solutionIcon && item.solIcon) {
            solutionIcon.innerHTML = item.solIcon;
          }

          gsap.fromTo(
            elementsToAnimate,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', stagger: 0.03 }
          );
        }
      });
    });
  });
}

function initSkillsFilter() {
  const tabs = document.querySelectorAll('[data-skill-filter]');
  const cards = document.querySelectorAll('[data-skill-card]');
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-skill-filter');

      tabs.forEach((t) => {
        t.classList.remove('bg-brand-orange', 'text-black', 'border-black', 'shadow-sm');
        t.classList.add('bg-white', 'text-neutral-700', 'border-black/15');
      });
      tab.classList.remove('bg-white', 'text-neutral-700', 'border-black/15');
      tab.classList.add('bg-brand-orange', 'text-black', 'border-black', 'shadow-sm');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-skill-card');
        if (filter === 'all' || cat === filter) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'pointerEvents',
          });
          card.classList.remove('opacity-25', 'grayscale-[50%]');
        } else {
          gsap.to(card, {
            opacity: 0.25,
            scale: 0.98,
            duration: 0.25,
            ease: 'power2.in',
          });
          card.classList.add('opacity-25', 'grayscale-[50%]');
        }
      });
    });
  });
}

function initProjectAccordions() {
  const headers = document.querySelectorAll('.project-accordion-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const parent = header.closest('.project-accordion-item');
      const body = parent.querySelector('.project-accordion-body');
      const icon = header.querySelector('.project-accordion-icon');
      const circle = header.querySelector('.project-accordion-circle');
      const isOpen = !body.classList.contains('hidden');

      document.querySelectorAll('.project-accordion-body').forEach((b) => {
        if (b !== body && !b.classList.contains('hidden')) {
          gsap.to(b, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.inOut',
            onComplete: () => b.classList.add('hidden'),
          });
          const otherIcon = b.closest('.project-accordion-item').querySelector('.project-accordion-icon');
          const otherCircle = b.closest('.project-accordion-item').querySelector('.project-accordion-circle');
          if (otherIcon) otherIcon.textContent = '+';
          if (otherCircle) otherCircle.classList.add('opacity-0');
        }
      });

      if (isOpen) {
        gsap.to(body, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
          onComplete: () => body.classList.add('hidden'),
        });
        if (icon) icon.textContent = '+';
        if (circle) circle.classList.add('opacity-0');
      } else {
        body.classList.remove('hidden');
        gsap.fromTo(
          body,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        if (icon) icon.textContent = '−';
        if (circle) circle.classList.remove('opacity-0');
      }
    });
  });
}

function initButtonInteractions() {
  const ctaButtons = document.querySelectorAll('a[href="#projects"], a[href="#cta"]');
  ctaButtons.forEach((btn) => {
    const arrow = btn.querySelector('span:last-child');
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
      if (arrow) {
        gsap.to(arrow, { x: 3, y: -2, duration: 0.25, ease: 'power2.out' });
      }
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1.0, duration: 0.3, ease: 'power2.out' });
      if (arrow) {
        gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    });
  });
}

function initCapsuleInteractiveMotion() {
  const capsules = document.querySelectorAll('.hero-capsule');
  if (!capsules.length) return;

  capsules.forEach((capsule) => {
    capsule.addEventListener('mouseenter', () => {
      gsap.to(capsule, { scale: 1.04, duration: 0.25, ease: 'power2.out' });
    });
    capsule.addEventListener('mouseleave', () => {
      gsap.to(capsule, { scale: 1.0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

function initOrbitalLifecycle() {
  const nodes = document.querySelectorAll('.orbit-node-btn');
  const badge = document.getElementById('orbit-stage-badge');
  const desc = document.getElementById('orbit-stage-desc');
  const container = document.getElementById('about-pipeline-container');
  const stageEl = document.getElementById('orbital-spin-stage');

  if (!nodes.length || !badge || !desc || !container || !stageEl) return;

  const stages = [
    {
      id: 1,
      badge: 'STAGE 01 // MULTIMODAL INGESTION',
      desc: 'Ingest enterprise documents, PDFs, images, and audio via Whisper transcription with scalable S3 and SharePoint connectors.',
    },
    {
      id: 2,
      badge: 'STAGE 02 // GRAPH & RULE PARSING',
      desc: 'Extract entities and build knowledge graphs mapped with CFR and enterprise rules for deterministic context grounding.',
    },
    {
      id: 3,
      badge: 'STAGE 03 // OPENSEARCH VECTOR INDEX',
      desc: 'Generate dense custom embeddings indexed into OpenSearch and DynamoDB, guaranteeing <200ms semantic search across 5M+ docs.',
    },
    {
      id: 4,
      badge: 'STAGE 04 // AGENTIC AI REASONING',
      desc: 'Orchestrate multi-step reasoning, Text-to-SQL, and autonomous tool calling using CrewAI, LangChain, and Model Context Protocol (MCP).',
    },
    {
      id: 5,
      badge: 'STAGE 05 // FASTAPI MICROSERVICES',
      desc: 'Serve high-throughput asynchronous REST APIs with caching layers, query tuning, and 35% improved backend scalability.',
    },
    {
      id: 6,
      badge: 'STAGE 06 // REACT & NEXT.JS DELIVERY',
      desc: 'Stream verified results in real time with WebSocket/SSE to reactive Next.js and React frontends delivering <1.2s page loads.',
    },
  ];

  let currentActiveIdx = 0;

  const updateStageText = (idx) => {
    if (idx === currentActiveIdx) return;
    currentActiveIdx = idx;
    const stage = stages[idx];

    gsap.to([badge, desc], {
      opacity: 0,
      y: 4,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        badge.textContent = stage.badge;
        desc.textContent = stage.desc;
        gsap.fromTo(
          [badge, desc],
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.04 }
        );
      },
    });
  };

  // Base circular angles for the 6 stages (in radians)
  // 01: Top (12 o'clock), 02: Top-Right (2 o'clock), 03: Bottom-Right (4 o'clock),
  // 04: Bottom (6 o'clock), 05: Bottom-Left (8 o'clock), 06: Top-Left (10 o'clock)
  const baseAngles = [
    -Math.PI / 2,
    -Math.PI / 6,
    Math.PI / 6,
    Math.PI / 2,
    (5 * Math.PI) / 6,
    (-5 * Math.PI) / 6,
  ];

  const getRadius = () => {
    const W = stageEl.clientWidth || 360;
    if (W < 440) return W * 0.42;
    if (W < 640) return W * 0.40;
    return W * 0.38;
  };

  // Proxy object to drive pure trigonometric (x, y) positioning
  const orbitProxy = { angle: 0 };

  const renderNodes = () => {
    const R = getRadius();
    nodes.forEach((node, i) => {
      const theta = baseAngles[i] + orbitProxy.angle;
      const x = Math.cos(theta) * R;
      const y = Math.sin(theta) * R;
      // Position only: Node and all child text remain 100% horizontally level and upright!
      gsap.set(node, { x, y, rotation: 0 });
    });
  };

  // Initial positioning
  renderNodes();

  // Scroll-Driven Orbit Animation (Smooth 360-degree scrub around the circular path)
  gsap.to(orbitProxy, {
    angle: Math.PI * 2,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 0.4,
      onUpdate: (self) => {
        renderNodes();
        const stageIdx = Math.min(5, Math.floor(self.progress * 6));
        updateStageText(stageIdx);
      },
    },
  });

  // Interactive Click to smoothly rotate the circle to that node
  nodes.forEach((node, i) => {
    node.addEventListener('click', () => {
      updateStageText(i);
      const targetAngle = -baseAngles[i] - Math.PI / 2;
      gsap.to(orbitProxy, {
        angle: targetAngle,
        duration: 0.7,
        ease: 'power3.out',
        onUpdate: renderNodes,
      });
      const inner = node.querySelector('.orbit-node-inner');
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.15 },
          { scale: 1, duration: 0.35, ease: 'back.out(2)' }
        );
      }
    });
  });

  // Responsive Resize Handler
  window.addEventListener('resize', renderNodes);

  // Initial stage
  updateStageText(0);
}

function initExperienceDrawers() {
  const drawerItems = document.querySelectorAll('.exp-drawer-item');

  drawerItems.forEach((item) => {
    const header = item.querySelector('.exp-drawer-header');
    const body = item.querySelector('.exp-drawer-body');
    const toggle = item.querySelector('.exp-drawer-toggle');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = !body.classList.contains('hidden');

      // Close all other drawers
      drawerItems.forEach((other) => {
        if (other !== item) {
          const otherBody = other.querySelector('.exp-drawer-body');
          const otherToggle = other.querySelector('.exp-drawer-toggle');
          if (otherBody && !otherBody.classList.contains('hidden')) {
            gsap.to(otherBody, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => otherBody.classList.add('hidden'),
            });
            if (otherToggle) otherToggle.textContent = '+';
            other.classList.remove('ring-1', 'ring-brand-orange/40');
          }
        }
      });

      if (isOpen) {
        // Close current drawer
        gsap.to(body, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => body.classList.add('hidden'),
        });
        if (toggle) toggle.textContent = '+';
        item.classList.remove('ring-1', 'ring-brand-orange/40');
      } else {
        // Open current drawer
        body.classList.remove('hidden');
        gsap.fromTo(
          body,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        if (toggle) toggle.textContent = '−';
        item.classList.add('ring-1', 'ring-brand-orange/40');
      }
    });
  });
}

function initExperienceParallax() {
  const parallaxBg = document.getElementById('experience-parallax-bg');
  const drawerContainer = document.getElementById('experience-drawer-container');
  const section = document.getElementById('experience');

  if (parallaxBg && section) {
    gsap.to(parallaxBg, {
      y: 120,
      x: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  if (drawerContainer && section) {
    const items = drawerContainer.querySelectorAll('.exp-drawer-item');
    items.forEach((item, idx) => {
      gsap.fromTo(
        item,
        { y: 30 + idx * 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: idx * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
        }
      );
    });
  }
}

function initRollingBallScrollAnimation() {
  const ball = document.getElementById('rolling-orange-ball');
  const shadow = document.getElementById('ball-contact-shadow');
  const rippleContainer = document.getElementById('ball-ripple-container');
  const stage = document.getElementById('ball-scroll-stage');
  const section = document.getElementById('velocity-roadmap');
  const trackBars = document.querySelectorAll('.ball-step-bar');

  if (!ball || !stage || !section) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const getPositions = () => {
    const stageWidth = stage.offsetWidth;
    const isMobile = stageWidth < 640;
    const ballSize = ball.offsetWidth || (isMobile ? 56 : 72);
    
    // Dynamic extraction from actual DOM bars
    const barData = Array.from(trackBars).map((bar) => {
      const left = bar.offsetLeft;
      const width = bar.offsetWidth;
      const top = bar.offsetTop;
      const right = left + width;
      return { left, width, top, right };
    });

    const barTops = barData.length === 7 ? barData.map((b) => b.top) : [55, 118, 181, 244, 307, 370, 433];
    // Ball sits directly ON TOP of each bar (bottom of ball touches top of bar)
    const ballY = barTops.map((top) => top - ballSize + 2);
    const shadowY = barTops.map((top) => top - 6);

    const b0 = barData[0] || { left: 0, right: stageWidth * 0.28 };
    const b1 = barData[1] || { left: stageWidth * 0.12, right: stageWidth * 0.42 };
    const b2 = barData[2] || { left: stageWidth * 0.21, right: stageWidth * 0.51 };
    const b3 = barData[3] || { left: stageWidth * 0.39, right: stageWidth * 0.61 };
    const b4 = barData[4] || { left: stageWidth * 0.39, right: stageWidth * 0.67 };
    const b5 = barData[5] || { left: stageWidth * 0.45, right: stageWidth * 0.77 };
    const b6 = barData[6] || { left: stageWidth * 0.60, right: stageWidth * 1.00 };

    // The ball rolls until its right front touches the exact right end cap
    const endOffset = ballSize * 0.2;
    const forwardArc = ballSize * 0.25;

    // Exact edge-to-edge roll coordinates:
    const bar0_start = b0.left + 8;
    const bar0_end   = b0.right - endOffset;

    const bar1_land  = bar0_end + forwardArc;
    const bar1_end   = b1.right - endOffset;

    const bar2_land  = bar1_end + forwardArc;
    const bar2_end   = b2.right - endOffset;

    const bar3_land  = bar2_end + forwardArc;
    const bar3_end   = b3.right - endOffset;

    const bar4_land  = bar3_end + forwardArc;
    const bar4_end   = b4.right - endOffset;

    const bar5_land  = bar4_end + forwardArc;
    const bar5_end   = b5.right - endOffset;

    const bar6_land  = bar5_end + forwardArc;
    const bar6_end   = b6.right - endOffset;

    return {
      ballPts: [
        { x: -160, y: ballY[0] },             // 0. Outside left
        { x: bar0_start, y: ballY[0] },       // 1. Starts rolling on Bar 0
        { x: bar0_end, y: ballY[0] },         // 2. Rolls all the way to absolute right edge of Bar 0
        { x: bar1_land, y: ballY[1] },        // 3. Drops and Lands on Bar 1
        { x: bar1_end, y: ballY[1] },         // 4. Rolls all the way to absolute right edge of Bar 1
        { x: bar2_land, y: ballY[2] },        // 5. Drops and Lands on Bar 2
        { x: bar2_end, y: ballY[2] },         // 6. Rolls all the way to absolute right edge of Bar 2
        { x: bar3_land, y: ballY[3] },        // 7. Drops and Lands on Bar 3
        { x: bar3_end, y: ballY[3] },         // 8. Rolls all the way to absolute right edge of Bar 3
        { x: bar4_land, y: ballY[4] },        // 9. Drops and Lands on Bar 4
        { x: bar4_end, y: ballY[4] },         // 10. Rolls all the way to absolute right edge of Bar 4
        { x: bar5_land, y: ballY[5] },        // 11. Drops and Lands on Bar 5
        { x: bar5_end, y: ballY[5] },         // 12. Rolls all the way to absolute right edge of Bar 5
        { x: bar6_land, y: ballY[6] },        // 13. Drops and Lands on Bar 6
        { x: bar6_end, y: ballY[6] },         // 14. Rolls all the way across Bar 6 to right edge
        { x: stageWidth + 180, y: ballY[6] }, // 15. Outside right
      ],
      shadowY,
      ballSize,
    };
  };

  let { ballPts, shadowY, ballSize } = getPositions();
  gsap.set(ball, { x: ballPts[0].x, y: ballPts[0].y, rotation: 0 });
  if (shadow) {
    gsap.set(shadow, { x: ballPts[0].x + 4, y: shadowY[0], opacity: 0 });
  }

  // Micro landing impact ripple
  const triggerImpactRipple = (x, y) => {
    if (!rippleContainer) return;
    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full border border-brand-orange/60 pointer-events-none -translate-x-1/2 -translate-y-1/2';
    ripple.style.left = `${x + ballSize / 2}px`;
    ripple.style.top = `${y + ballSize}px`;
    ripple.style.width = '8px';
    ripple.style.height = '4px';
    rippleContainer.appendChild(ripple);

    gsap.to(ripple, {
      width: 48,
      height: 16,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  };

  // Dynamic bidirectional track bar highlight helper based on scroll progress
  const updateBarHighlightByProgress = (progress) => {
    let activeIndex = -1;
    if (progress >= 0.04 && progress < 0.17) activeIndex = 0;
    else if (progress >= 0.17 && progress < 0.31) activeIndex = 1;
    else if (progress >= 0.31 && progress < 0.45) activeIndex = 2;
    else if (progress >= 0.45 && progress < 0.58) activeIndex = 3;
    else if (progress >= 0.58 && progress < 0.71) activeIndex = 4;
    else if (progress >= 0.71 && progress < 0.85) activeIndex = 5;
    else if (progress >= 0.85 && progress <= 0.98) activeIndex = 6;

    trackBars.forEach((bar, i) => {
      if (i === activeIndex) {
        bar.classList.add('bg-[#0c0c0c]', 'text-white', 'scale-[1.02]');
        bar.classList.remove('bg-[#cecac0]', 'text-black');
      } else {
        bar.classList.remove('bg-[#0c0c0c]', 'text-white', 'scale-[1.02]');
        bar.classList.add('bg-[#cecac0]', 'text-black');
      }
    });
  };

  const ballTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateBarHighlightByProgress(self.progress),
    },
  });

  // Entrance from outside left
  ballTimeline
    .to(ball, { 
      x: ballPts[1].x, 
      y: ballPts[1].y, 
      rotation: 160, 
      ease: 'power1.out', 
      duration: 0.8,
      onStart: () => {
        if (shadow) gsap.to(shadow, { opacity: 0.45, duration: 0.3 });
      }
    })
    .to(shadow, { x: ballPts[1].x + 4, y: shadowY[0], opacity: 0.45, duration: 0.8, ease: 'power1.out' }, '<')
    
    // Roll across Bar 1 to the absolute right edge
    .to(ball, { x: ballPts[2].x, y: ballPts[2].y, rotation: 360, ease: 'none', duration: 1.0 })
    .to(shadow, { x: ballPts[2].x + 4, y: shadowY[0], ease: 'none', duration: 1.0 }, '<')
    
    // Drop 1 -> 2 (off absolute right edge of 1, falling with gravity onto 2)
    .to(ball, { 
      x: ballPts[3].x, 
      y: ballPts[3].y, 
      rotation: 480, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[3].x, ballPts[3].y)
    })
    .to(shadow, { x: ballPts[3].x + 4, y: shadowY[1], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 2 to the absolute right edge
    .to(ball, { x: ballPts[4].x, y: ballPts[4].y, rotation: 720, ease: 'none', duration: 1.0 })
    .to(shadow, { x: ballPts[4].x + 4, y: shadowY[1], ease: 'none', duration: 1.0 }, '<')
    
    // Drop 2 -> 3 (off absolute right edge of 2, falling with gravity onto 3)
    .to(ball, { 
      x: ballPts[5].x, 
      y: ballPts[5].y, 
      rotation: 840, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[5].x, ballPts[5].y)
    })
    .to(shadow, { x: ballPts[5].x + 4, y: shadowY[2], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 3 to the absolute right edge
    .to(ball, { x: ballPts[6].x, y: ballPts[6].y, rotation: 1080, ease: 'none', duration: 1.0 })
    .to(shadow, { x: ballPts[6].x + 4, y: shadowY[2], ease: 'none', duration: 1.0 }, '<')
    
    // Drop 3 -> 4 (off absolute right edge of 3, falling with gravity onto 4)
    .to(ball, { 
      x: ballPts[7].x, 
      y: ballPts[7].y, 
      rotation: 1200, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[7].x, ballPts[7].y)
    })
    .to(shadow, { x: ballPts[7].x + 4, y: shadowY[3], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 4 to the absolute right edge
    .to(ball, { x: ballPts[8].x, y: ballPts[8].y, rotation: 1360, ease: 'none', duration: 0.7 })
    .to(shadow, { x: ballPts[8].x + 4, y: shadowY[3], ease: 'none', duration: 0.7 }, '<')
    
    // Drop 4 -> 5 (off absolute right edge of 4, falling with gravity onto 5)
    .to(ball, { 
      x: ballPts[9].x, 
      y: ballPts[9].y, 
      rotation: 1480, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[9].x, ballPts[9].y)
    })
    .to(shadow, { x: ballPts[9].x + 4, y: shadowY[4], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 5 to the absolute right edge
    .to(ball, { x: ballPts[10].x, y: ballPts[10].y, rotation: 1680, ease: 'none', duration: 0.8 })
    .to(shadow, { x: ballPts[10].x + 4, y: shadowY[4], ease: 'none', duration: 0.8 }, '<')
    
    // Drop 5 -> 6 (off absolute right edge of 5, falling with gravity onto 6)
    .to(ball, { 
      x: ballPts[11].x, 
      y: ballPts[11].y, 
      rotation: 1800, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[11].x, ballPts[11].y)
    })
    .to(shadow, { x: ballPts[11].x + 4, y: shadowY[5], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 6 to the absolute right edge
    .to(ball, { x: ballPts[12].x, y: ballPts[12].y, rotation: 2040, ease: 'none', duration: 1.0 })
    .to(shadow, { x: ballPts[12].x + 4, y: shadowY[5], ease: 'none', duration: 1.0 }, '<')
    
    // Drop 6 -> 7 (off absolute right edge of 6, falling with gravity onto 7)
    .to(ball, { 
      x: ballPts[13].x, 
      y: ballPts[13].y, 
      rotation: 2160, 
      duration: 0.35, 
      ease: 'power2.in',
      onStart: () => triggerImpactRipple(ballPts[13].x, ballPts[13].y)
    })
    .to(shadow, { x: ballPts[13].x + 4, y: shadowY[6], duration: 0.35, ease: 'power2.in' }, '<')
    
    // Roll across Bar 7 to the absolute right edge
    .to(ball, { x: ballPts[14].x, y: ballPts[14].y, rotation: 2460, ease: 'none', duration: 1.1 })
    .to(shadow, { x: ballPts[14].x + 4, y: shadowY[6], ease: 'none', duration: 1.1 }, '<')
    
    // Exit outside screen right
    .to(ball, { 
      x: ballPts[15].x, 
      y: ballPts[15].y, 
      rotation: 2780, 
      ease: 'power1.in', 
      duration: 0.9,
      onComplete: () => {
        if (shadow) gsap.to(shadow, { opacity: 0, duration: 0.3 });
      }
    })
    .to(shadow, { x: ballPts[15].x + 4, y: shadowY[6], opacity: 0, ease: 'power1.in', duration: 0.9 }, '<');

    // Update on window resize
    const handleResize = () => {
      const updated = getPositions();
      ballPts = updated.ballPts;
      shadowY = updated.shadowY;
      ballSize = updated.ballSize;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
}
