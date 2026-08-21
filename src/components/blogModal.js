import { portfolioData } from '../data/portfolioData.js';
import { gsap } from 'gsap';

export class BlogModal {
  constructor(lenisInstance) {
    this.lenis = lenisInstance;
    this.modal = document.getElementById('blog-modal');
    this.closeBtn = document.getElementById('blog-modal-close');
    this.modalContent = document.getElementById('blog-modal-content');
    this.progressBar = document.getElementById('blog-modal-progress');
    this.currentArticleId = null;

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Delegated click listener for all blog article triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-blog]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const articleId = trigger.getAttribute('data-open-blog');
        if (articleId) {
          this.open(articleId);
        }
      }
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Modal background overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Keyboard shortcuts: Esc to close, ArrowLeft / ArrowRight to cycle
    document.addEventListener('keydown', (e) => {
      if (!this.modal || this.modal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowRight') {
        this.navigateNext();
      } else if (e.key === 'ArrowLeft') {
        this.navigatePrev();
      }
    });

    // Scroll reading progress
    if (this.modal) {
      this.modal.addEventListener('scroll', () => {
        const scrollTop = this.modal.scrollTop;
        const scrollHeight = this.modal.scrollHeight - this.modal.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if (this.progressBar) {
          this.progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
      });
    }
  }

  lockBackground() {
    if (this.lenis) this.lenis.stop();
    else if (window.__lenis) window.__lenis.stop();

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  unlockBackground() {
    const openModals = document.querySelectorAll('#project-modal:not(.hidden), #blog-modal:not(.hidden), #contact-modal:not(.hidden)');
    if (openModals.length <= 1) {
      if (this.lenis) this.lenis.start();
      else if (window.__lenis) window.__lenis.start();

      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  renderArticle(data) {
    if (!data || !this.modalContent) return;

    const currentIndex = portfolioData.articles.findIndex((a) => a.id === data.id);
    const prevArticle = currentIndex > 0 ? portfolioData.articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < portfolioData.articles.length - 1 ? portfolioData.articles[currentIndex + 1] : null;

    let sectionsHtml = '';
    if (data.sections && data.sections.length > 0) {
      sectionsHtml = data.sections.map((section) => `
        <div class="space-y-4 pt-6 border-t border-theme-border">
          <h3 class="font-extrabold text-xl sm:text-2xl text-theme-text tracking-tight">${section.heading}</h3>
          <p class="text-sm sm:text-base text-theme-muted font-normal leading-relaxed whitespace-pre-line">${section.body}</p>
          
          ${section.callout ? `
            <div class="p-4 sm:p-5 bg-theme-surface border border-theme-border rounded-xl font-mono text-xs sm:text-sm text-theme-text font-semibold flex items-start gap-3">
              <span class="text-neutral-900 font-bold shrink-0 mt-0.5">✦</span>
              <span>${section.callout}</span>
            </div>
          ` : ''}

          ${section.code ? `
            <div class="my-4 rounded-xl overflow-hidden border border-theme-border bg-neutral-950 text-neutral-100 font-mono text-xs shadow-lg">
              <div class="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-[11px] text-neutral-400">
                <span class="font-semibold uppercase tracking-wider">// CODE SPECIFICATION</span>
                <button class="copy-code-btn text-neutral-400 hover:text-white transition-colors" data-code="${encodeURIComponent(section.code)}">
                  Copy Code
                </button>
              </div>
              <pre class="p-4 sm:p-6 overflow-x-auto leading-relaxed text-neutral-200"><code>${this.escapeHtml(section.code)}</code></pre>
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    let takeawaysHtml = '';
    if (data.takeaways && data.takeaways.length > 0) {
      takeawaysHtml = `
        <div class="p-6 sm:p-8 bg-theme-surface border border-theme-border rounded-2xl space-y-4">
          <h4 class="font-mono text-xs text-theme-text uppercase tracking-widest font-bold">// KEY ARCHITECTURAL TAKEAWAYS</h4>
          <ul class="space-y-2 text-xs sm:text-sm text-theme-muted">
            ${data.takeaways.map((item) => `
              <li class="flex items-start gap-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-theme-text mt-2 shrink-0"></span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    let tagsHtml = '';
    if (data.tags && data.tags.length > 0) {
      tagsHtml = data.tags.map((tag) => `
        <span class="px-3 py-1 bg-white border border-theme-border rounded-lg text-theme-text text-xs font-mono font-medium shadow-sm">
          ${tag}
        </span>
      `).join('');
    }

    this.modalContent.innerHTML = `
      <!-- Top Meta Badge Row -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-theme-border pb-4 pr-12 sm:pr-14 font-mono text-xs text-theme-muted">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-theme-surface border border-theme-border text-theme-text font-bold uppercase tracking-wider">
            ${data.number} // ${data.category}
          </span>
          <span class="text-theme-subtle">•</span>
          <span>${data.date}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-theme-subtle">${data.readTime}</span>
          <span class="text-theme-subtle">•</span>
          <button id="blog-copy-link-btn" class="font-bold text-theme-text hover:text-neutral-600 transition-colors uppercase tracking-wider flex items-center gap-1">
            <span>Share</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
      </div>

      <!-- Title & Subtitle Header -->
      <div class="space-y-3 pt-2">
        <h2 class="font-extrabold text-3xl sm:text-5xl text-theme-text uppercase tracking-tight leading-[1.05]">
          ${data.title}
        </h2>
        ${data.subtitle ? `<p class="text-base sm:text-lg text-theme-muted font-medium leading-relaxed">${data.subtitle}</p>` : ''}
        <div class="flex items-center gap-3 pt-2 text-xs font-mono text-theme-subtle">
          <span>AUTHOR: <strong class="text-theme-text">${data.author || 'Utkarsh Kushwaha'}</strong></span>
        </div>
      </div>

      <!-- Executive Summary Card -->
      ${data.summary ? `
        <div class="p-6 bg-theme-surface-subtle border border-theme-border rounded-2xl space-y-2">
          <p class="font-mono text-xs text-theme-text uppercase tracking-wider font-bold">// EXECUTIVE SUMMARY</p>
          <p class="text-sm sm:text-base text-theme-muted font-normal leading-relaxed">${data.summary}</p>
        </div>
      ` : ''}

      <!-- Detailed Sections -->
      <div class="space-y-8">
        ${sectionsHtml}
      </div>

      <!-- Takeaways Box -->
      ${takeawaysHtml}

      <!-- Tag Cloud -->
      <div class="pt-4 space-y-2">
        <p class="font-mono text-xs text-theme-subtle uppercase tracking-wider font-semibold">RELEVANT DOMAINS &amp; TOPICS</p>
        <div class="flex flex-wrap gap-2">
          ${tagsHtml}
        </div>
      </div>

      <!-- Footer Navigation: Prev / Next Article -->
      <div class="pt-8 border-t border-theme-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        ${prevArticle ? `
          <button class="prev-article-btn p-4 bg-theme-surface border border-theme-border rounded-xl text-left hover:bg-theme-surface-alt transition-colors group">
            <span class="text-[10px] text-theme-subtle uppercase block">← PREVIOUS NOTE</span>
            <span class="font-bold text-theme-text text-sm line-clamp-1 mt-1 group-hover:text-neutral-600 transition-colors">${prevArticle.title}</span>
          </button>
        ` : `<div></div>`}

        ${nextArticle ? `
          <button class="next-article-btn p-4 bg-theme-surface border border-theme-border rounded-xl text-right hover:bg-theme-surface-alt transition-colors group sm:col-start-2">
            <span class="text-[10px] text-theme-subtle uppercase block">NEXT NOTE →</span>
            <span class="font-bold text-theme-text text-sm line-clamp-1 mt-1 group-hover:text-neutral-600 transition-colors">${nextArticle.title}</span>
          </button>
        ` : `<div></div>`}
      </div>
    `;

    // Wire copy link and code copy handlers inside rendered article
    const shareBtn = document.getElementById('blog-copy-link-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        this.showToast('Article URL copied to clipboard');
      });
    }

    this.modalContent.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.getAttribute('data-code') || '');
        navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy Code'; }, 2000);
      });
    });

    // Wire prev/next buttons
    const prevBtn = this.modalContent.querySelector('.prev-article-btn');
    if (prevBtn && prevArticle) {
      prevBtn.addEventListener('click', () => this.open(prevArticle.id));
    }

    const nextBtn = this.modalContent.querySelector('.next-article-btn');
    if (nextBtn && nextArticle) {
      nextBtn.addEventListener('click', () => this.open(nextArticle.id));
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showToast(text) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    if (!toast) return;

    if (toastText) toastText.textContent = text;
    toast.classList.remove('hidden');
    toast.classList.add('flex');

    gsap.fromTo(toast,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    setTimeout(() => {
      gsap.to(toast, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          toast.classList.add('hidden');
          toast.classList.remove('flex');
        }
      });
    }, 2500);
  }

  navigateNext() {
    if (!this.currentArticleId) return;
    const currentIndex = portfolioData.articles.findIndex((a) => a.id === this.currentArticleId);
    if (currentIndex < portfolioData.articles.length - 1) {
      this.open(portfolioData.articles[currentIndex + 1].id);
    }
  }

  navigatePrev() {
    if (!this.currentArticleId) return;
    const currentIndex = portfolioData.articles.findIndex((a) => a.id === this.currentArticleId);
    if (currentIndex > 0) {
      this.open(portfolioData.articles[currentIndex - 1].id);
    }
  }

  open(articleId) {
    const data = portfolioData.articles.find((a) => a.id === articleId);
    if (!data) return;

    this.currentArticleId = articleId;
    this.renderArticle(data);

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    this.modal.scrollTop = 0;
    if (this.progressBar) this.progressBar.style.width = '0%';
    this.lockBackground();

    // Animate card entrance
    const card = document.getElementById('blog-modal-card');
    if (card) {
      gsap.fromTo(card,
        { scale: 0.96, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }

  close() {
    const card = document.getElementById('blog-modal-card');
    if (card) {
      gsap.to(card, {
        scale: 0.96,
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          this.modal.classList.add('hidden');
          this.modal.classList.remove('flex');
          this.unlockBackground();
        }
      });
    } else {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('flex');
      this.unlockBackground();
    }
  }
}
