import { gsap } from 'gsap';
import { portfolioData } from '../data/portfolioData.js';

export class ContactManager {
  constructor(lenisInstance) {
    this.lenis = lenisInstance;
    this.emailCopyBtn = document.getElementById('contact-copy-email');
    this.toast = document.getElementById('toast-notification');
    this.ctaBtn = document.getElementById('contact-cta-btn');
    this.contactModal = document.getElementById('contact-modal');
    this.modalForm = document.getElementById('contact-form');
    this.inlineForm = document.getElementById('inline-contact-form');
    this.closeContactModalBtn = document.getElementById('contact-modal-close');

    this.init();
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

  init() {
    // 1. Direct Email Copy with Toast Feedback
    if (this.emailCopyBtn) {
      this.emailCopyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = portfolioData.developer.socials.email;
        navigator.clipboard.writeText(email).then(() => {
          this.showToast(`Email copied: ${email}`, 'success');
        }).catch(() => {
          this.showToast(email, 'info');
        });
      });
    }

    // 2. Open Modal CTA Button
    if (this.ctaBtn) {
      this.ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openContactModal();
      });
    }

    // 3. Modal Close Triggers
    if (this.closeContactModalBtn) {
      this.closeContactModalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeContactModal();
      });
    }

    if (this.contactModal) {
      this.contactModal.addEventListener('click', (e) => {
        if (e.target === this.contactModal) {
          this.closeContactModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.contactModal && !this.contactModal.classList.contains('hidden')) {
        this.closeContactModal();
      }
    });

    // 4. Initialize Forms with Client-Side Validation
    if (this.inlineForm) {
      this.setupFormValidation(this.inlineForm, 'inline');
    }
    if (this.modalForm) {
      this.setupFormValidation(this.modalForm, 'modal');
    }
  }

  setupFormValidation(form, prefix) {
    const nameInput = form.querySelector(`[name="name"]`) || form.querySelector(`#${prefix}-contact-name`) || form.querySelector('#contact-name');
    const emailInput = form.querySelector(`[name="email"]`) || form.querySelector(`#${prefix}-contact-email`) || form.querySelector('#contact-email');
    const serviceInput = form.querySelector(`[name="service"]`) || form.querySelector(`#${prefix}-contact-service`) || form.querySelector('#contact-service');
    const messageInput = form.querySelector(`[name="message"]`) || form.querySelector(`#${prefix}-contact-message`) || form.querySelector('#contact-message');
    const charCounter = form.querySelector('.char-counter');
    const submitBtn = form.querySelector('button[type="submit"]');

    const validators = {
      name: (val) => {
        if (!val || val.trim().length === 0) return 'Name or organization is required';
        if (val.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s.,'-]+$/.test(val.trim())) return 'Name contains invalid characters';
        return '';
      },
      email: (val) => {
        if (!val || val.trim().length === 0) return 'Email address is required';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email (e.g. name@domain.com)';
        return '';
      },
      service: (val) => {
        if (!val || val === '') return 'Please select an area of collaboration';
        return '';
      },
      message: (val) => {
        if (!val || val.trim().length === 0) return 'Mission brief description is required';
        if (val.trim().length < 15) return `Please describe your initiative (at least 15 chars, currently ${val.trim().length})`;
        if (val.trim().length > 1000) return 'Message exceeds maximum length of 1000 characters';
        return '';
      }
    };

    // Live character counter for message textarea
    if (messageInput && charCounter) {
      messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCounter.textContent = `${len} / 1000`;
        if (len >= 15 && len <= 1000) {
          charCounter.className = 'char-counter text-[11px] font-mono text-emerald-600 font-medium';
        } else if (len > 1000) {
          charCounter.className = 'char-counter text-[11px] font-mono text-red-500 font-semibold';
        } else {
          charCounter.className = 'char-counter text-[11px] font-mono text-theme-subtle';
        }
      });
    }

    const validateField = (input, fieldName) => {
      if (!input) return true;
      const errorMsg = validators[fieldName](input.value);
      const errorElem = form.querySelector(`[data-error-for="${fieldName}"]`);
      const container = input.closest('.form-group') || input.parentElement;

      if (errorMsg) {
        input.classList.remove('border-theme-border', 'border-emerald-500/80', 'bg-theme-surface-subtle', 'bg-white');
        input.classList.add('border-red-400', 'bg-red-50/50', 'text-neutral-900');
        if (errorElem) {
          errorElem.textContent = errorMsg;
          errorElem.classList.remove('hidden');
        }
        return false;
      } else {
        input.classList.remove('border-red-400', 'bg-red-50/50');
        input.classList.add('border-emerald-500/80', 'bg-white');
        if (errorElem) {
          errorElem.textContent = '';
          errorElem.classList.add('hidden');
        }
        return true;
      }
    };

    // Attach blur and input handlers for instant feedback
    if (nameInput) {
      nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
      nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('border-red-400')) validateField(nameInput, 'name');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
      emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('border-red-400')) validateField(emailInput, 'email');
      });
    }

    if (serviceInput) {
      serviceInput.addEventListener('change', () => validateField(serviceInput, 'service'));
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));
      messageInput.addEventListener('input', () => {
        if (messageInput.classList.contains('border-red-400')) validateField(messageInput, 'message');
      });
    }

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, 'name');
      const isEmailValid = validateField(emailInput, 'email');
      const isServiceValid = validateField(serviceInput, 'service');
      const isMessageValid = validateField(messageInput, 'message');

      if (!isNameValid || !isEmailValid || !isServiceValid || !isMessageValid) {
        // Shake first invalid input
        const firstInvalid = form.querySelector('.border-red-400');
        if (firstInvalid) {
          firstInvalid.focus();
          gsap.fromTo(firstInvalid,
            { x: -8 },
            { x: 8, duration: 0.08, repeat: 3, yoyo: true, ease: 'power2.inOut', onComplete: () => { gsap.set(firstInvalid, { x: 0 }); } }
          );
        }
        return;
      }

      // Enter loading state
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          TRANSMITTING BRIEF...
        `;
      }

      // Simulated network dispatch with latency
      setTimeout(() => {
        const senderName = nameInput ? nameInput.value.trim() : 'Collaborator';
        this.showToast(`Message transmitted! Utkarsh will respond within 24 hours.`, 'success');

        form.reset();
        if (charCounter) charCounter.textContent = '0 / 1000';

        // Clear green validation styles
        form.querySelectorAll('input, select, textarea').forEach((el) => {
          el.classList.remove('border-emerald-500/80', 'border-red-400', 'bg-white', 'bg-red-50/50');
          el.classList.add('border-theme-border', 'bg-theme-surface-subtle');
        });

        // Restore submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span class="text-emerald-300 font-bold">✓ TRANSMITTED SUCCESSFULLY</span>
          `;
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
          }, 3500);
        }

        // If modal, close after brief confirmation
        if (prefix === 'modal') {
          setTimeout(() => {
            this.closeContactModal();
          }, 1200);
        }
      }, 900);
    });
  }

  showToast(message, type = 'success') {
    if (!this.toast) return;

    const toastText = document.getElementById('toast-text');
    if (toastText) toastText.innerText = message;

    this.toast.classList.remove('hidden', 'translate-y-8', 'opacity-0');
    this.toast.classList.add('flex', 'translate-y-0', 'opacity-100');

    gsap.fromTo(
      this.toast,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
    );

    setTimeout(() => {
      gsap.to(this.toast, {
        y: 10,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          this.toast.classList.add('hidden', 'translate-y-8', 'opacity-0');
          this.toast.classList.remove('flex', 'translate-y-0', 'opacity-100');
        },
      });
    }, 3500);
  }

  openContactModal() {
    if (!this.contactModal) return;
    this.contactModal.classList.remove('hidden', 'pointer-events-none');
    this.contactModal.classList.add('flex', 'pointer-events-auto');
    this.contactModal.scrollTop = 0;
    this.lockBackground();

    const card = document.getElementById('contact-modal-card');
    gsap.fromTo(this.contactModal, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    if (card) {
      gsap.fromTo(card, { scale: 0.96, y: 15, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    }
  }

  closeContactModal() {
    if (!this.contactModal) return;
    const card = document.getElementById('contact-modal-card');
    if (card) {
      gsap.to(card, { scale: 0.96, opacity: 0, duration: 0.15 });
    }
    gsap.to(this.contactModal, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        this.contactModal.classList.add('hidden', 'pointer-events-none');
        this.contactModal.classList.remove('flex', 'pointer-events-auto');
        this.unlockBackground();
      }
    });
  }
}
