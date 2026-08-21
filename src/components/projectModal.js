import { portfolioData } from '../data/portfolioData.js';

export class ProjectModal {
  constructor(lenisInstance) {
    this.lenis = lenisInstance;
    this.modal = document.getElementById('project-modal');
    this.title = document.getElementById('project-modal-title');
    this.tagline = document.getElementById('project-modal-tagline');
    this.desc = document.getElementById('project-modal-desc');
    this.techContainer = document.getElementById('project-modal-tech');
    this.tag = document.getElementById('project-modal-tag');
    this.systemId = document.getElementById('project-modal-system-id');
    this.archLayer1 = document.getElementById('project-modal-arch-1');
    this.archLayer2 = document.getElementById('project-modal-arch-2');
    this.archLayer3 = document.getElementById('project-modal-arch-3');
    this.archLayer4 = document.getElementById('project-modal-arch-4');
    this.closeBtn = document.getElementById('project-modal-close');

    this.init();
  }

  init() {
    if (!this.modal) return;

    document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = trigger.getAttribute('data-open-modal');
        this.open(projectId);
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  lockBackground() {
    if (this.lenis) this.lenis.stop();
    else if (window.__lenis) window.__lenis.stop();

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  unlockBackground() {
    // Only resume if no other modal is currently active
    const openModals = document.querySelectorAll('#project-modal:not(.hidden), #blog-modal:not(.hidden), #contact-modal:not(.hidden)');
    if (openModals.length <= 1) {
      if (this.lenis) this.lenis.start();
      else if (window.__lenis) window.__lenis.start();

      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  open(projectId) {
    const data = portfolioData.projects.find((p) => p.id === projectId);
    if (!data) return;

    if (this.title) this.title.innerText = data.title;
    if (this.tagline) this.tagline.innerText = data.tagline;
    if (this.desc) this.desc.innerText = data.description;
    if (this.tag) this.tag.innerText = data.category;
    if (this.systemId) this.systemId.innerText = data.systemId || `SYS-${data.number}`;

    if (data.architecture) {
      if (this.archLayer1) this.archLayer1.innerText = data.architecture.layer1;
      if (this.archLayer2) this.archLayer2.innerText = data.architecture.layer2;
      if (this.archLayer3) this.archLayer3.innerText = data.architecture.layer3;
      if (this.archLayer4) this.archLayer4.innerText = data.architecture.layer4;
    }

    if (this.techContainer) {
      this.techContainer.innerHTML = '';
      data.tech.forEach((techName) => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 bg-theme-surface border border-theme-border rounded-lg text-theme-text text-xs font-mono font-medium';
        span.innerText = techName;
        this.techContainer.appendChild(span);
      });
    }

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    this.modal.scrollTop = 0;
    this.lockBackground();
  }

  close() {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    this.unlockBackground();
  }
}
