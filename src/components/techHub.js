import { gsap } from 'gsap';
import { portfolioData } from '../data/portfolioData.js';

export class TechHubInteractive {
  constructor() {
    this.container = document.getElementById('tech-interactive-hub');
    this.detailTitle = document.getElementById('tech-detail-title');
    this.detailCategory = document.getElementById('tech-detail-category');
    this.detailDesc = document.getElementById('tech-detail-desc');
    this.detailLevel = document.getElementById('tech-detail-level');

    this.init();
  }

  init() {
    const techNodes = document.querySelectorAll('[data-tech-node]');

    techNodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const techName = node.getAttribute('data-tech-node');
        const techObj = portfolioData.technologyHub.find((t) => t.name.toLowerCase() === techName.toLowerCase());

        if (techObj && this.detailTitle) {
          gsap.to([this.detailTitle, this.detailCategory, this.detailDesc, this.detailLevel], {
            opacity: 0,
            y: -5,
            duration: 0.15,
            onComplete: () => {
              this.detailTitle.innerText = techObj.name;
              this.detailCategory.innerText = `// ${techObj.category.toUpperCase()}`;
              this.detailDesc.innerText = techObj.desc;
              this.detailLevel.innerText = techObj.level;

              gsap.to([this.detailTitle, this.detailCategory, this.detailDesc, this.detailLevel], {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.04,
              });
            }
          });
        }

        techNodes.forEach((n) => {
          n.classList.remove('border-theme-text', 'bg-theme-accent-soft', 'border-theme-blue', 'bg-theme-blue-soft', 'text-theme-blue');
          n.classList.add('border-theme-border', 'bg-theme-card');
        });
        node.classList.remove('border-theme-border', 'bg-theme-card');
        node.classList.add('border-theme-text', 'bg-theme-accent-soft');
      });
    });
  }
}
