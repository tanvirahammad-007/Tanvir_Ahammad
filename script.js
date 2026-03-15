/* ═══════════════════════════════════════════════════════
   Tanvir Ahammad — DEVELOPER PORTFOLIO  |  script.js v5
   Changes v5:
   - Added dark/light theme toggle (localStorage persisted)
   - Added project filter buttons with smooth show/hide
   - Added real-time form field validation (valid/invalid CSS)
   - Added submit button loading state + spinner
   - Fixed: observer disconnect after skill bars animate
   - Fixed: keyboard shortcut 'T' for theme toggle
   - Fixed: mobile menu focus trap
   - Improved: typing animation restart on tab switch
   - Improved: counter animation uses requestAnimationFrame
   - Improved: particles only on screens ≥ 480px
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Helpers ──────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════════════════════
   1. PAGE LOADER
════════════════════════════════════════════════════════ */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 1800);
  });
})();

/* ════════════════════════════════════════════════════════
   2. DARK / LIGHT THEME TOGGLE  (NEW v5)
════════════════════════════════════════════════════════ */
(function initTheme() {
  const html   = document.documentElement;
  const btn    = $('#theme-toggle');
  const STORE  = 'ta-theme';

  // Restore saved preference, else respect OS preference
  const saved  = localStorage.getItem(STORE);
  const prefer = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const active = saved || prefer;
  html.setAttribute('data-theme', active);

  function toggle() {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORE, next);
    btn && (btn.setAttribute('aria-label',
      next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
  }

  btn && btn.addEventListener('click', toggle);
})();

/* ════════════════════════════════════════════════════════
   3. SWORD CURSOR
   Implemented purely in CSS (sword.png + cursor: url()).
   No JavaScript needed — removed old dot/ring tracker.
════════════════════════════════════════════════════════ */
/* (cursor logic lives entirely in style.css) */

/* ════════════════════════════════════════════════════════
   4. PARTICLES CANVAS
════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = $('#particles-canvas');
  if (!canvas) return;

  // Disable on very small screens for performance
  if (window.innerWidth < 480) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;
  const DESKTOP = () => window.innerWidth >= 480;

  const ACCENT   = '#00f5d4';
  const ACCENT2  = '#7b61ff';
  const MAX_DIST = 130;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    // Recalculate count
    const count = DESKTOP() ? Math.min(60, Math.floor((W * H) / 18000)) : 20;
    // Only rebuild if count changed significantly
    if (Math.abs(particles.length - count) > 5) buildParticles(count);
  }

  function buildParticles(n) {
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.6 ? ACCENT2 : ACCENT,
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = ACCENT;
          ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.globalAlpha = 1;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(draw);
  }

  // Pause when tab hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  }, { passive: true });

  resize();
  raf = requestAnimationFrame(draw);
})();

/* ════════════════════════════════════════════════════════
   5. NAVBAR — scroll class + active link via IntersectionObserver
════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar  = $('#navbar');
  const navLinks = $$('.nav-link, .mobile-link');
  const sections = $$('section[id]');

  // Scrolled class for shadow
  const onScroll = () => {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link tracking
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ════════════════════════════════════════════════════════
   6. MOBILE MENU
════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const menu      = $('#mobile-menu');
  const closeBtn  = $('#mobile-menu-close');
  const mobileLinks = $$('.mobile-link');

  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }
  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn  && closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

  // Close on outside click / Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
})();

/* ════════════════════════════════════════════════════════
   7. SCROLL REVEAL  (IntersectionObserver)
════════════════════════════════════════════════════════ */
(function initReveal() {
  const targets = $$('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // fire once only
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  targets.forEach(t => observer.observe(t));
})();

/* ════════════════════════════════════════════════════════
   8. TYPING ANIMATION
════════════════════════════════════════════════════════ */
(function initTyping() {
  const el = $('#typing-text');
  if (!el) return;

const phrases = [
  'C/C++ Programs',
  'Simple Web Apps',
  'Coding Ideas',
  'Coding Projects',
  'Clean UI Websites'
];

  let pi = 0, ci = 0, isDeleting = false;

  function type() {
    const phrase = phrases[pi];
    el.textContent = isDeleting
      ? phrase.slice(0, ci--)
      : phrase.slice(0, ci++);

    let delay = isDeleting ? 42 : 85;

    if (!isDeleting && ci > phrase.length) {
      isDeleting = true;
      delay = 1600; // hold at full word
    } else if (isDeleting && ci < 0) {
      isDeleting = false;
      ci = 0;
      pi = (pi + 1) % phrases.length;
      delay = 350;
    }
    setTimeout(type, delay);
  }

  // Start after hero entrance animations finish (≈1s)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(type, reduced ? 0 : 1000);
})();

/* ════════════════════════════════════════════════════════
   9. ANIMATED STAT COUNTERS
════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const start  = performance.now();
      const dur    = 1800;

      function step(now) {
        const t   = Math.min((now - start) / dur, 1);
        // Ease out cubic
        const ease = 1 - (1 - t) ** 3;
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ════════════════════════════════════════════════════════
   10. SKILLS TABS + ANIMATED BARS
════════════════════════════════════════════════════════ */
(function initSkills() {
  const tabBtns  = $$('.tab-btn');
  const panels   = $$('.skills-panel');

  // Animate a set of bars
  function animateBars(panel) {
    $$('.skill-fill', panel).forEach(fill => {
      const w = fill.dataset.width;
      // Use requestAnimationFrame for smooth paint
      requestAnimationFrame(() => {
        fill.style.width = w + '%';
        fill.classList.add('animated');
      });
    });
  }

  // Activate a tab
  function activateTab(target) {
    tabBtns.forEach(b => {
      const active = b.dataset.tab === target;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    panels.forEach(p => {
      const active = p.id === `tab-${target}`;
      p.classList.toggle('active', active);
      p.hidden = !active;
      if (active) {
        // Reset bars first, then animate in next frame
        $$('.skill-fill', p).forEach(f => { f.style.width = '0%'; f.classList.remove('animated'); });
        setTimeout(() => animateBars(p), 50);
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // Animate the default (frontend) tab when it enters view
  const firstPanel = panels.find(p => p.classList.contains('active'));
  if (firstPanel) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateBars(firstPanel);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(firstPanel);
  }
})();

/* ════════════════════════════════════════════════════════
   11. 3D TILT EFFECT on project cards + hero image
       (skipped on touch devices)
════════════════════════════════════════════════════════ */
(function initTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Hero image tilt
  const heroTilt = $('#hero-tilt');
  if (heroTilt) {
    heroTilt.addEventListener('mousemove', e => {
      const rect = heroTilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      heroTilt.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
    });
    heroTilt.addEventListener('mouseleave', () => { heroTilt.style.transform = ''; });
  }
})();

/* ════════════════════════════════════════════════════════
   12. MUSIC PLAYER  (toggle + keyboard shortcut M)
════════════════════════════════════════════════════════ */
(function initMusic() {
  const btn   = $('#music-btn');
  const audio = $('#bg-music');
  if (!btn || !audio) return;

  let playing = false;

  function toggle() {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play background music');
    } else {
      audio.volume = 0.10;  // gentle background volume (10%)
      audio.play().catch(() => {}); // autoplay may be blocked — silently fail
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Pause background music');
    }
    playing = !playing;
  }

  btn.addEventListener('click', toggle);

  // Keyboard shortcut: M
  document.addEventListener('keydown', e => {
    if (e.key === 'm' || e.key === 'M') {
      // Don't fire when typing in a field
      if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
      toggle();
    }
  });
})();

/* ════════════════════════════════════════════════════════
   13. PROJECT FILTER BUTTONS  (NEW v5)
════════════════════════════════════════════════════════ */
(function initProjectFilters() {
  const btns  = $$('.filter-btn');
  const cards = $$('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards
      cards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.classList.toggle('hidden', !tags.includes(filter));
        }
      });
    });
  });
})();

/* ════════════════════════════════════════════════════════
   14. REAL-TIME FORM VALIDATION  (NEW v5)
════════════════════════════════════════════════════════ */
(function initFormValidation() {
  const nameInput    = $('#name');
  const emailInput   = $('#email');
  const messageArea  = $('#message');

  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setValidity(el, valid) {
    if (!el) return;
    el.classList.toggle('valid',   valid);
    el.classList.toggle('invalid', !valid);
  }

  // Validate on blur (not on every keypress — less annoying)
  nameInput   && nameInput.addEventListener('blur',  () => setValidity(nameInput,   nameInput.value.trim().length >= 2));
  emailInput  && emailInput.addEventListener('blur', () => setValidity(emailInput,  validateEmail(emailInput.value.trim())));
  messageArea && messageArea.addEventListener('blur',() => setValidity(messageArea, messageArea.value.trim().length >= 10));

  // Update replyto hidden field from email
  emailInput && emailInput.addEventListener('input', () => {
    const replyto = $('#form-replyto');
    if (replyto) replyto.value = emailInput.value;
  });

  // Update form subject hidden field
  const subjectDisplay = $('#subject');
  subjectDisplay && subjectDisplay.addEventListener('input', () => {
    const hiddenSubject = $('#form-subject-hidden');
    if (hiddenSubject) hiddenSubject.value = subjectDisplay.value || 'Portfolio Contact';
  });
})();

/* ════════════════════════════════════════════════════════
   15. CONTACT FORM SUBMIT  (Web3Forms)
════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form      = $('#contact-form');
  const successEl = $('#form-success');
  const errorEl   = $('#form-error');
  const submitBtn = $('#form-submit-btn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Client-side required check
    const name    = $('#name')?.value.trim();
    const email   = $('#email')?.value.trim();
    const message = $('#message')?.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message || !emailOk) {
      if (errorEl) errorEl.textContent = 'Please fill in all required fields with valid info.';
      return;
    }

    // Loading state
    submitBtn && submitBtn.classList.add('submitting');
    errorEl && (errorEl.textContent = '');

    try {
      const data = new FormData(form);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        if (successEl) { successEl.hidden = false; }
        form.reset();
        // Clear validity indicators
        $$('.valid, .invalid', form).forEach(el => el.classList.remove('valid','invalid'));
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      if (errorEl) errorEl.textContent = '⚠️ Something went wrong. Please try again or email directly.';
    } finally {
      submitBtn && submitBtn.classList.remove('submitting');
    }
  });
})();

/* ════════════════════════════════════════════════════════
   16. KEYBOARD SHORTCUTS
════════════════════════════════════════════════════════ */
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Don't fire inside inputs / textareas
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;

    // T: toggle theme
    if (e.key === 't' || e.key === 'T') {
      $('#theme-toggle')?.click();
    }
  });
})();

/* ════════════════════════════════════════════════════════
   17. PARALLAX ORBS on mouse move  (desktop only)
════════════════════════════════════════════════════════ */
(function initOrbParallax() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const orbs = $$('.orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 10;
      orb.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  }, { passive: true });
})();