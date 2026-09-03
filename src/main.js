/**
 * ĀROHANA Interactive Script
 * Handles navigation, interactive modals, case study previews,
 * sector logo filtering, and dynamic carousel scroll interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModals();
  initCaseStudies();
  initSectorFilters();
  initCarousels();
  initHeroParallax();
});

/* -------------------------------------------------------------
 * 1. NAVBAR & MOBILE DRAWER
 * ------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Header blur / shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(8, 8, 9, 0.92)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.background = 'rgba(8, 8, 9, 0.75)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    }

    // Active nav indicator based on scroll position
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

/* -------------------------------------------------------------
 * 2. MODALS & CONVERSATION DRAWER
 * ------------------------------------------------------------- */
function initModals() {
  // Selectors
  const conversationModal = document.getElementById('conversation-modal');
  const storyModal = document.getElementById('story-modal');
  const workModal = document.getElementById('work-modal');
  const tourinModal = document.getElementById('tourin-modal');

  // Triggers
  const openConvoBtns = document.querySelectorAll('.open-conversation-btn');
  const readStoryBtn = document.getElementById('read-story-btn');
  const discoverTourinBtn = document.getElementById('discover-tourin-btn');

  // Close buttons
  const closeConvoBtn = document.getElementById('close-conversation-modal');
  const closeStoryBtn = document.getElementById('close-story-modal');
  const closeWorkBtn = document.getElementById('close-work-modal');
  const closeTourinBtn = document.getElementById('close-tourin-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Conversation Modal Trigger
  openConvoBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If triggered from another modal, close that first
      if (tourinModal && tourinModal.classList.contains('open')) {
        closeModal(tourinModal);
      }
      openModal(conversationModal);
    });
  });

  if (closeConvoBtn) closeConvoBtn.addEventListener('click', () => closeModal(conversationModal));
  if (closeStoryBtn) closeStoryBtn.addEventListener('click', () => closeModal(storyModal));
  if (closeWorkBtn) closeWorkBtn.addEventListener('click', () => closeModal(workModal));
  if (closeTourinBtn) closeTourinBtn.addEventListener('click', () => closeModal(tourinModal));

  if (readStoryBtn) {
    readStoryBtn.addEventListener('click', () => openModal(storyModal));
  }

  if (discoverTourinBtn) {
    discoverTourinBtn.addEventListener('click', () => openModal(tourinModal));
  }

  // Close on backdrop click
  [conversationModal, storyModal, workModal, tourinModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [conversationModal, storyModal, workModal, tourinModal].forEach(closeModal);
    }
  });

  // Conversation Form handling
  const conversationForm = document.getElementById('conversation-form');
  const formStatus = document.getElementById('form-status');
  if (conversationForm) {
    conversationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = conversationForm.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'INQUIRY SENT &check;';
        formStatus.textContent = 'Thank you! We will get back to you within 24 hours.';
        setTimeout(() => {
          closeModal(conversationModal);
          conversationForm.reset();
          submitBtn.innerHTML = 'SEND INQUIRY &rarr;';
          formStatus.textContent = '';
        }, 2200);
      }, 1000);
    });
  }
}

/* -------------------------------------------------------------
 * 3. CASE STUDIES DATA & DYNAMIC MODAL
 * ------------------------------------------------------------- */
const caseStudiesData = {
  raysons: {
    title: 'RAYSONS GROUP',
    category: 'Real Estate & Infrastructure',
    image: '/assets/work-raysons.png',
    headline: 'Redefining luxury high-rise positioning in tier-2 growth corridors.',
    overview: 'Raysons Group sought to transition from regional contractor identity into an iconic luxury real estate developer. Ārohana led complete brand architecture, high-spec digital experiences, and immersive launch collateral.',
    metrics: [
      { num: '3.4x', label: 'Inquiry Volume' },
      { num: '85%', label: 'Pre-launch Inventory Booked' },
      { num: '14 Days', label: 'To First Sales Cycle' }
    ]
  },
  loom: {
    title: 'LOOM CRAFTS',
    category: 'Interiors & Architectural Living',
    image: '/assets/work-loom.png',
    headline: 'Translating artisan textile legacy into high-end residential interiors.',
    overview: 'We transformed Loom Crafts’ heritage craftsmanship narrative into a contemporary design studio identity, crafting editorial catalog direction, digital flagship experience, and sensory showroom touchpoints.',
    metrics: [
      { num: '+140%', label: 'Architect Retainers' },
      { num: '4.8★', label: 'Client Brand Affinity' },
      { num: '2.1x', label: 'Order Value Expansion' }
    ]
  },
  picturetime: {
    title: 'PICTURETIME',
    category: 'Entertainment & Mobile Cinema Networks',
    image: '/assets/work-picturetime.png',
    headline: 'Pioneering inflatable mobile digital cinemas across rural & frontier India.',
    overview: 'A revolutionary entertainment initiative bringing theatrical first-day-first-show experiences to remote geographies. Ārohana handled visual brand strategy, impact documentation, and governmental pitch decks.',
    metrics: [
      { num: '12M+', label: 'Rural Viewers Reached' },
      { num: '150+', label: 'Active Travelling Screens' },
      { num: 'National', label: 'Innovation Award' }
    ]
  },
  she: {
    title: 'SHE',
    category: 'Community Initiative & Women Empowerment',
    image: '/assets/work-she.png',
    headline: 'Grassroots dignity, education, and livelihood generation for young girls.',
    overview: 'Crafted the foundational identity, community storytelling films, and grassroots fundraising collaterals that helped SHE scale vocational training programs and educational sponsorships across Maharashtra.',
    metrics: [
      { num: '8,500+', label: 'Girls Empowered' },
      { num: '100%', label: 'Direct Impact Allocation' },
      { num: '4 States', label: 'Expanded Footprint' }
    ]
  },
  misu: {
    title: 'MISU',
    category: 'Hospitality & Pan-Asian Cafe',
    image: '/assets/work-misu.png',
    headline: 'High-concept dining experience blending moody aesthetics with culinary finesse.',
    overview: 'From initial spatial identity and menu editorial direction to digital storytelling and launch campaigns, Ārohana designed every customer touchpoint for this breakthrough cafe concept.',
    metrics: [
      { num: '100%', label: 'Weekend Table Occupancy' },
      { num: '45K+', label: 'Organic Social Followers' },
      { num: 'Top 3', label: 'City Dining Destination' }
    ]
  },
  rrskins: {
    title: 'RR SKINS',
    category: 'Healthcare & Clinical Dermatology',
    image: '/assets/work-rrskins.png',
    headline: 'Demystifying clinical dermatology with empathetic luxury aesthetic.',
    overview: 'Medical branding often feels sterile or intimidating. Ārohana reimagined RR Skins as a serene, scientifically rigorous skincare haven with editorial photography, patient guidance tools, and digital booking.',
    metrics: [
      { num: '2.8x', label: 'Consultation Bookings' },
      { num: '92%', label: 'Treatment Completion Rate' },
      { num: '#1', label: 'Rated Regional Clinic' }
    ]
  }
};

function initCaseStudies() {
  const workCards = document.querySelectorAll('.work-card');
  const workModal = document.getElementById('work-modal');
  const dynamicContainer = document.getElementById('work-modal-dynamic');

  workCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = caseStudiesData[projectId];
      if (!data || !dynamicContainer) return;

      dynamicContainer.innerHTML = `
        <span class="eyebrow-label">${data.category}</span>
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-subtitle" style="font-size: 1.15rem; color: #ECE7DE; margin-bottom: 1.25rem;">${data.headline}</p>
        
        <img src="${data.image}" alt="${data.title}" class="case-study-hero-img" />
        
        <p style="color: var(--text-dim); line-height: 1.7; font-size: 1rem; margin-bottom: 2rem;">
          ${data.overview}
        </p>

        <div class="case-metrics-grid">
          ${data.metrics
            .map(
              (m) => `
            <div class="metric-box">
              <div class="metric-box-num">${m.num}</div>
              <div class="metric-box-label">${m.label}</div>
            </div>
          `
            )
            .join('')}
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button class="btn-pill btn-pill-primary open-conversation-btn" id="modal-convo-cta">
            DISCUSS A SIMILAR PROJECT &rarr;
          </button>
        </div>
      `;

      // Wire up inner CTA
      const innerCta = dynamicContainer.querySelector('#modal-convo-cta');
      if (innerCta) {
        innerCta.addEventListener('click', () => {
          workModal.classList.remove('open');
          const convoModal = document.getElementById('conversation-modal');
          convoModal.classList.add('open');
        });
      }

      workModal.classList.add('open');
      workModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* -------------------------------------------------------------
 * 4. SECTOR FILTERING & CLIENTS
 * ------------------------------------------------------------- */
function initSectorFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cells = document.querySelectorAll('.client-logo-cell');
  const viewClientsBtn = document.getElementById('view-clients-btn');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cells.forEach((cell) => {
        const sector = cell.getAttribute('data-sector') || '';
        if (filter === 'all' || sector.includes(filter)) {
          cell.classList.remove('dimmed');
          cell.style.display = 'flex';
        } else {
          cell.classList.add('dimmed');
        }
      });
    });
  });

  if (viewClientsBtn) {
    viewClientsBtn.addEventListener('click', () => {
      // Toggle all tabs back to all and flash cells
      const allTab = document.querySelector('.filter-tab[data-filter="all"]');
      if (allTab) allTab.click();
      viewClientsBtn.textContent = 'SHOWING ALL VERIFIED PARTNERS';
      setTimeout(() => {
        viewClientsBtn.innerHTML = 'VIEW ALL CLIENTS &rarr;';
      }, 3000);
    });
  }
}

/* -------------------------------------------------------------
 * 5. CAROUSEL SCROLLING CONTROLS
 * ------------------------------------------------------------- */
function initCarousels() {
  // Engagement models scroll
  const engTrack = document.getElementById('eng-cards-track');
  const engPrev = document.getElementById('eng-prev-btn');
  const engNext = document.getElementById('eng-next-btn');

  if (engTrack && engPrev && engNext) {
    engPrev.addEventListener('click', () => {
      engTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
    engNext.addEventListener('click', () => {
      engTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Work grid scroll (on mobile / tablet)
  const workGrid = document.getElementById('work-grid');
  const workPrev = document.getElementById('work-prev-btn');
  const workNext = document.getElementById('work-next-btn');

  if (workGrid && workPrev && workNext) {
    workPrev.addEventListener('click', () => {
      workGrid.scrollBy({ left: -360, behavior: 'smooth' });
    });
    workNext.addEventListener('click', () => {
      workGrid.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }
}

/* -------------------------------------------------------------
 * 6. HERO PARALLAX TILT
 * ------------------------------------------------------------- */
function initHeroParallax() {
  const heroKnot = document.getElementById('hero-sculpture-img');
  if (!heroKnot) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / 45;
    const deltaY = (clientY - centerY) / 45;

    heroKnot.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.4}deg)`;
  });
}
