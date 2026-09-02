/**
 * Ārohana Consultancy - Core Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Modules
  initNavigation();
  initCustomCursor();
  initCaseStudies();
  initServicesInteractive();
  initEngagementToggle();
  initContactForm();
  initThreeScene();
  initScrollEffects();
});

/* ==========================================================================
   1. NAVIGATION & ROUTING
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileCloseBtn = document.querySelector('.mobile-nav-close');

  // Header scroll blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile drawer controls
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileCloseBtn && mobileDrawer) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Smooth hash routing and active state updates
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetSection = document.querySelector(targetHref);
        if (targetSection) {
          e.preventDefault();
          if (mobileDrawer) {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
          }
          
          targetSection.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', targetHref);

          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          if (link.classList.contains('nav-link')) {
            link.classList.add('active');
          }
        }
      }
    });
  });

  // Highlight navigation item based on scroll position
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   2. CUSTOM SMOOTH CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover expansion on interactive elements
  const hoverables = document.querySelectorAll('a, button, .case-study-card, .service-nav-item, input, textarea');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.borderColor = 'rgba(255, 255, 255, 0.75)';
      ring.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      ring.style.backgroundColor = 'transparent';
    });
  });
}

/* ==========================================================================
   3. CASE STUDIES & EDITORIAL MODAL SYSTEM
   ========================================================================== */
function initCaseStudies() {
  const container = document.getElementById('case-studies-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalBackdrop = document.getElementById('case-study-modal');
  const modalDrawer = document.getElementById('case-modal-drawer-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!container || !window.AROHANA_DATA) return;

  const caseStudies = window.AROHANA_DATA.caseStudies;

  // Render Case Study Cards
  function renderCards(filter = 'all') {
    container.innerHTML = '';
    const filtered = filter === 'all' 
      ? caseStudies 
      : caseStudies.filter(c => c.sectorId === filter);

    filtered.forEach(cs => {
      const card = document.createElement('div');
      card.className = 'case-study-card';
      card.setAttribute('data-id', cs.id);
      card.innerHTML = `
        <div class="case-card-image-wrap">
          <img src="${cs.image}" alt="${cs.title}" class="case-card-img" loading="lazy">
          <span class="case-card-badge">${cs.sector}</span>
        </div>
        <div class="case-card-body">
          <h3 class="case-card-client">${cs.title}</h3>
          <h4 class="case-card-headline">${cs.headline}</h4>
          <p class="case-card-summary">${cs.summary}</p>
          <div class="case-card-footer">
            <span class="mono-tag">${cs.snapshot.engagement}</span>
            <span class="case-card-cta">View Case Study <i data-lucide="arrow-right"></i></span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openCaseStudyModal(cs.id));
      container.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderCards(filter);
    });
  });

  // Initial Render
  renderCards('all');

  // Open Full Editorial Modal
  window.openCaseStudyModal = function(id) {
    const cs = caseStudies.find(item => item.id === id);
    if (!cs || !modalBackdrop || !modalDrawer) return;

    modalDrawer.innerHTML = `
      <div class="section-badge">Case Study Analysis</div>
      <h2 style="font-size: clamp(2rem, 3.5vw, 3.2rem); margin-bottom: 0.5rem;">${cs.title}</h2>
      <p style="font-size: 1.3rem; color: #cbd5e1; font-weight: 500; margin-bottom: 2rem;">${cs.headline}</p>

      <div class="modal-snapshot-grid">
        <div class="snapshot-item">
          <h5>Sector</h5>
          <p>${cs.snapshot.sector}</p>
        </div>
        <div class="snapshot-item">
          <h5>Location</h5>
          <p>${cs.snapshot.location}</p>
        </div>
        <div class="snapshot-item">
          <h5>Engagement</h5>
          <p>${cs.snapshot.engagement}</p>
        </div>
        <div class="snapshot-item">
          <h5>Duration</h5>
          <p>${cs.snapshot.duration}</p>
        </div>
      </div>

      <img src="${cs.image}" alt="${cs.title}" class="modal-hero-image">

      <div class="modal-section-block">
        <h4><span class="sparkle-icon">✦</span> The Situation</h4>
        <p>${cs.situation}</p>
      </div>

      <div class="modal-section-block">
        <h4><span class="sparkle-icon">✦</span> The Real Challenge</h4>
        <p>${cs.challenge}</p>
      </div>

      <div class="modal-section-block">
        <h4><span class="sparkle-icon">✦</span> The Thinking</h4>
        <p>${cs.thinking}</p>
      </div>

      <div class="modal-section-block">
        <h4><span class="sparkle-icon">✦</span> The Work</h4>
        <ul class="modal-workstreams-list">
          ${cs.work.map(w => `<li class="modal-workstream-item"><i data-lucide="check" style="margin-top: 3px; flex-shrink: 0; width: 18px; height: 18px;"></i> <span>${w}</span></li>`).join('')}
        </ul>
      </div>

      <div class="modal-proof-box">
        <h4><span class="sparkle-icon">✦</span> Verified Business Outcomes & Proof</h4>
        <p>${cs.proof}</p>
      </div>

      <div class="modal-section-block" style="padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
        <p style="font-size: 1.1rem; color: #ffffff; font-weight: 600; margin-bottom: 1.5rem;">${cs.closing}</p>
        <button class="btn btn-primary" onclick="closeCaseStudyModal(); scrollToContact('Case Study Brief: ${cs.title}');">
          Start a conversation about a similar challenge <span class="btn-icon-circle">→</span>
        </button>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // Close Modal
  window.closeCaseStudyModal = function() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudyModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudyModal();
      }
    });
  }

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeCaseStudyModal();
    }
  });
}

/* ==========================================================================
   4. SERVICES INTERACTIVE SWITCHER
   ========================================================================== */
function initServicesInteractive() {
  const serviceItems = document.querySelectorAll('.service-nav-item');
  const previewTitle = document.getElementById('preview-service-title');
  const previewTimeline = document.getElementById('preview-service-timeline');
  const previewDesc = document.getElementById('preview-service-desc');
  const previewInclusions = document.getElementById('preview-service-inclusions');

  if (!serviceItems.length || !window.AROHANA_DATA) return;

  const services = window.AROHANA_DATA.services;

  function updatePreview(index) {
    const s = services[index];
    if (!s) return;

    if (previewTitle) previewTitle.textContent = s.title;
    if (previewTimeline) previewTimeline.innerHTML = `⏱ ${s.timeframe}`;
    if (previewDesc) previewDesc.textContent = s.subtitle;

    if (previewInclusions) {
      previewInclusions.innerHTML = s.scope.slice(0, 8).map(item => `
        <div class="service-inclusion-pill">
          <i data-lucide="check-circle-2" style="width: 14px; height: 14px;"></i>
          <span>${item}</span>
        </div>
      `).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  serviceItems.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => {
      serviceItems.forEach(si => si.classList.remove('active'));
      item.classList.add('active');
      updatePreview(idx);
    });

    item.addEventListener('click', () => {
      serviceItems.forEach(si => si.classList.remove('active'));
      item.classList.add('active');
      updatePreview(idx);
    });
  });

  // Initialize with first service
  updatePreview(0);
}

/* ==========================================================================
   5. ENGAGEMENT MODELS TOGGLE MATRIX
   ========================================================================== */
function initEngagementToggle() {
  const toggleBtns = document.querySelectorAll('.engagement-toggle-btn');
  const cardsContainer = document.getElementById('engagement-cards-container');

  if (!cardsContainer || !window.AROHANA_DATA) return;

  const models = window.AROHANA_DATA.engagementModels;

  function renderModels(type = 'all') {
    cardsContainer.innerHTML = '';
    models.forEach(m => {
      const card = document.createElement('div');
      card.className = 'engagement-card';
      card.innerHTML = `
        <span class="mono-tag" style="margin-bottom: 0.5rem; color: #ffffff;">${m.commitment}</span>
        <h3 class="engagement-card-title">${m.name}</h3>
        <p class="engagement-card-bestfor">${m.bestFor}</p>
        <ul class="engagement-card-highlights">
          ${m.keyHighlights.map(h => `<li><i data-lucide="check" style="width: 14px; height: 14px;"></i> <span>${h}</span></li>`).join('')}
        </ul>
      `;
      cardsContainer.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderModels('all');
}

/* ==========================================================================
   6. CONTACT FORM & DISCOVERY SCHEDULER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Client';
    const email = document.getElementById('contact-email')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || '';
    const sector = document.getElementById('contact-sector')?.value || 'General';
    const message = document.getElementById('contact-message')?.value || '';

    // Show confirmation toast
    showToast(`Thank you, ${name}! Your brief has been routed to founder@byarohana.com`);
    form.reset();
  });
}

// Global helper to scroll to contact with context
window.scrollToContact = function(contextMsg = '') {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const msgField = document.getElementById('contact-message');
    if (msgField && contextMsg) {
      msgField.value = `Regarding: ${contextMsg}\n\n`;
      msgField.focus();
    }
  }
};

// Clipboard helper
window.copyToClipboard = function(text, label = 'Copied') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label}: ${text}`);
  }).catch(() => {
    showToast(`Contact: ${text}`);
  });
};

// Toast notification helper
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   7. SCROLL OBSERVER FOR FADE-IN ENTRANCES
   ========================================================================== */
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bento-card, .case-study-card, .timeline-milestone, .editorial-statement').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
