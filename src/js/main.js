import '../index.css';
import { initLoader } from './loader.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCustomCursor } from './cursor.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initCapsuleGradients } from './capsule-gradient.js';
import { initPixelFaceEmoji } from './pixel-face.js';
import { initAboutGlobe } from './about-globe.js';
import gsap from 'gsap';

// Force browser to always start from the top on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  // Initialize Smooth Scrolling (Lenis + GSAP ScrollTrigger)
  initSmoothScroll();

  // Initialize Custom Cursor
  initCustomCursor();

  // Initialize Live UTC / IST Clock in footer/system bar
  initSystemClock();

  // Initialize Contact Form handler
  initContactForm();

  // Initialize Project Modals
  initProjectModals();

  // Initialize Hero Capsule Gradient Follow
  initCapsuleGradients();

  // Initialize Pixelated Face Emoji with Eye Tracking
  initPixelFaceEmoji();

  // Initialize Big 3D Orange Globe in About Section
  initAboutGlobe();

  // Initialize Page Loader and trigger animations on completion
  initLoader(() => {
    initNavigation();
    initAnimations();
    if (window.playHeroEntrance) {
      window.playHeroEntrance();
    }
  });
});

function initSystemClock() {
  const clockEl = document.getElementById('system-live-time');
  if (!clockEl) return;

  const updateTime = () => {
    const now = new Date();
    const istTime = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    clockEl.textContent = `${istTime} IST / SYSTEM ONLINE`;
  };

  updateTime();
  setInterval(updateTime, 1000);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatus = document.getElementById('contact-form-status');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      if (formStatus) {
        formStatus.textContent = 'ERROR: Please provide all required fields.';
        formStatus.className = 'text-xs font-mono text-rose-600 font-semibold';
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="inline-block animate-spin mr-2">◌</span>
      <span>TRANSMITTING MESSAGE...</span>
    `;

    if (formStatus) {
      formStatus.textContent = 'CONNECTING TO DISPATCH PIPELINE...';
      formStatus.className = 'text-xs font-mono text-brand-orange font-semibold';
    }

    setTimeout(() => {
      submitBtn.innerHTML = `
        <span class="text-black font-bold mr-2">✓</span>
        <span>MESSAGE DELIVERED</span>
      `;
      submitBtn.classList.remove('opacity-60');
      submitBtn.classList.add('bg-emerald-400', 'text-black');

      if (formStatus) {
        formStatus.textContent = 'SUCCESS: Utkarsh Kushwaha has received your transmission.';
        formStatus.className = 'text-xs font-mono text-emerald-600 font-bold';
      }

      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('cursor-not-allowed', 'bg-emerald-400', 'text-black');
        submitBtn.classList.add('bg-brand-orange', 'text-black');
        submitBtn.innerHTML = originalText;
        if (formStatus) {
          formStatus.textContent = '';
        }
      }, 5000);
    }, 1200);
  });
}

function initProjectModals() {
  const projectDetails = {
    'inspectron-ai': {
      title: 'Inspectron AI – AI-Powered Chat Application',
      category: 'GenAI & RAG Platform',
      tags: ['React.js', 'WebSocket', 'Python', 'FastAPI', 'PostgreSQL', 'OpenSearch', 'RAG', 'Anthropic LLM'],
      description: 'An enterprise AI-powered inspection chat platform enabling intelligent document parsing, automated CFR-based inspection analysis, and real-time interactive compliance chat.',
      highlights: [
        'Achieved 92–95% rule-matching accuracy using Anthropic LLM integrated with CFR-based inspection.',
        'Reduced auditor workload by 55% by processing complex PDFs and images with <2.5s response latency and deep analysis.',
        'Built high-performance FastAPI + PostgreSQL backend handling 10k+ daily inspection queries with scalable concurrency and WebSocket streaming.'
      ],
      link: '#',
    },
    'testa-saas': {
      title: 'Testa – AI-Proctored SAAS Examination Platform',
      category: 'AI Computer Vision & SaaS Platform',
      tags: ['Next.js', 'React', 'FastAPI', 'Node.js', 'Express', 'Python', 'Material UI (MUI)', 'AWS', 'GraphQL', 'Face Recognition'],
      description: 'A large-scale AI-proctored online examination system used for secure, real-time digital assessments with live anomaly detection and automated supervision workflows.',
      highlights: [
        'Reduced cheating incidents by 30–45% using automated anomaly detection in live digital assessments.',
        'Built an advanced internal admin dashboard with dynamic, configurable 20+ widgets using Material UI (MUI), enabling real-time monitoring and analytics.',
        'Implemented AI-powered proctoring features including live face recognition, continuous user behavior monitoring, and automated exam integrity workflows, reducing manual invigilation by 65%.',
        'Architected high-availability cloud infrastructure on AWS supporting thousands of simultaneous test-takers.'
      ],
      link: 'https://app.testaonline.com',
    },
    'enterprise-genai': {
      title: 'Enterprise GenAI Knowledgebase Platform',
      category: 'Agentic AI & Knowledge Graphs',
      tags: ['React.js', 'FastAPI', 'Python', 'LangChain', 'Graph RAG', 'OpenSearch', 'DynamoDB', 'Whisper', 'Agentic AI', 'AWS'],
      description: 'An advanced enterprise GenAI platform combining Graph-based RAG, multimodal audio transcription, and autonomous Agentic workflows across complex multi-format corporate repositories.',
      highlights: [
        'Implemented advanced Graph-based RAG pipelines combining vector embeddings, knowledge graphs, and CFR/enterprise-rule mapping for high-accuracy retrieval.',
        'Built Agentic AI workflows for multi-step reasoning, autonomous tool execution, data extraction, and automated compliance checks across enterprise datasets.',
        'Developed multimodal & multilingual capabilities using OpenAI Whisper for audio transcription and translation.',
        'Designed vector search + DynamoDB + OpenSearch architecture supporting 5M+ documents with <200ms query latency and connectors for S3, SharePoint, and APIs.'
      ],
      link: '#',
    },
    'ay-ventures': {
      title: 'AY-Ventures Platform Application',
      category: 'Full Stack & FinTech Web App',
      tags: ['Next.js', 'Shadcn', 'Tailwind CSS', 'TypeScript', 'Google Map API', 'GraphQL', 'RazorPay Payment Gateway'],
      description: 'A modern, responsive matchmaking web platform helping entrepreneurs and investors connect based on tailored preference matching, financial metrics, and geography.',
      highlights: [
        'Designed and developed a responsive web platform boosting investor compatibility accuracy by 35% and increasing user engagement by 50%.',
        'Implemented advanced filtering and matching algorithms, enhancing overall discovery experience.',
        'Achieved <1.2s page-load times using optimized Next.js routing, server-side rendering, and modern Tailwind UI.',
        'Integrated RazorPay payment gateway, Google Map API, and GraphQL endpoints for streamlined financial onboarding and transactions.'
      ],
      link: 'https://ayventures.in',
    },
    'spilly': {
      title: 'Spilly – Split Bills & Group Expenses Web Application',
      category: 'Full Stack & FinTech Web App',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'JWT Auth', 'REST API', 'Vercel'],
      description: 'A modern, intuitive group expense sharing and bill splitting web application designed to help friends and groups easily track shared expenses, split bills equally or by exact shares, and settle balances seamlessly.',
      highlights: [
        'Built real-time expense splitting engine supporting multi-payer contributions, custom percentages, and automated balance calculations.',
        'Engineered secure user authentication and group management allowing users to create shared circles, invite friends, and view transparent activity ledgers.',
        'Designed a mobile-first, responsive interface with instant balance recalculation, real-time activity updates, and lightweight <1s load times hosted on Vercel.'
      ],
      link: 'https://spilly.vercel.app/',
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalTags = document.getElementById('modal-project-tags');
  const modalDescription = document.getElementById('modal-project-desc');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  let isModalOpen = false;

  const lockScroll = () => {
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');
  };

  const unlockScroll = () => {
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
  };

  const openModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data) return;

    isModalOpen = true;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;

    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1 text-xs font-mono rounded-full bg-[#f3f2ee] text-neutral-800 border border-brand-orange/30 font-semibold';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalHighlights.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'text-sm text-neutral-600 flex items-start';
      li.innerHTML = `<span class="text-brand-orange font-mono font-bold mr-2">→</span><span>${item}</span>`;
      modalHighlights.appendChild(li);
    });

    // Check if live link button exists in modal, update it
    const modalLinkBtn = document.getElementById('modal-project-link');
    if (modalLinkBtn) {
      if (data.link && data.link !== '#') {
        modalLinkBtn.href = data.link;
        modalLinkBtn.classList.remove('hidden');
        modalLinkBtn.innerHTML = `<span>VISIT LIVE PLATFORM</span><span>↗</span>`;
      } else {
        modalLinkBtn.classList.add('hidden');
      }
    }

    modal.classList.remove('hidden');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    lockScroll();

    gsap.fromTo(
      '#modal-card-content',
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
    );
  };

  const closeModal = () => {
    if (!isModalOpen) return;
    isModalOpen = false;

    gsap.to('#modal-card-content', {
      y: 20,
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.add('hidden');
        modal.classList.add('opacity-0', 'pointer-events-none');
        unlockScroll();
      },
    });
  };

  document.querySelectorAll('[data-open-project]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = trigger.getAttribute('data-open-project');
      openModal(pId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  });
}
