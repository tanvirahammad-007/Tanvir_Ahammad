/* ═══════════════════════════════════════════════════════
   Tanvir Ahammad — DEVELOPER PORTFOLIO  |  script.js
   v3: Fixed loader stuck, cursor, hero reveal, skill bars
═══════════════════════════════════════════════════════ */

/* scrollToSection on window so HTML onclick attrs can reach it */
window.scrollToSection = function (id) {
  var target = document.getElementById(id);
  if (!target) return;
  var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: top, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', function () {
  initLoader();
  initCursor();
  initParticles();
  initNavbar();
  initMobileMenu();
  initTyping();
  initScrollReveal();
  initHeroTilt();
  initSkillTabs();
  initSkillBars();
  initCounters();
  initTiltCards();
  initContactForm();
  initSmoothScroll();
  initParallaxOrbs();
  initBackToTop();
  initPillGlow();
});

/* ═══════════════════════════════════════════════════════
   PAGE LOADER — the root cause of the stuck screen
   Fix: use display:none after opacity fade, plus a
        window.onload safety fallback
═══════════════════════════════════════════════════════ */
function initLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;
  var done = false;

  function hideLoader() {
    if (done) return;
    done = true;
    loader.classList.add('hidden');
    setTimeout(function () {
      loader.style.display = 'none';
    }, 600);
    /* Reveal hero section */
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-right, #hero .reveal-left').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Primary: hide after CSS bar animation finishes (~1.4s) */
  setTimeout(hideLoader, 1600);

  /* Safety fallback: always hide when page fully loads */
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 200);
  });
}

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  var dot = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  /* Enable custom cursor class on body */
  document.body.classList.add('has-custom-cursor');

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  (function animRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animRing);
  })();

  var hoverTargets = document.querySelectorAll('a, button, .project-card, .stat-card, .tech-pill, .tab-btn, input, textarea');
  hoverTargets.forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });

  document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

/* ═══════════════════════════════════════════════════════
   PARTICLES CANVAS
═══════════════════════════════════════════════════════ */
function initParticles() {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  /* Skip particle connections on mobile — too CPU intensive */
  var isMobile = window.innerWidth < 768;

  /* On low-power hint or very small screen, reduce further */
  var isLowPower = window.innerWidth < 480;
  if (isLowPower) {
    canvas.style.display = 'none'; /* skip entirely on tiny phones */
    return;
  }

  var ctx = canvas.getContext('2d');
  var W, H, particles;

  function Particle() { this.reset(true); }
  Particle.prototype.reset = function (rand) {
    this.x = Math.random() * W;
    this.y = rand ? Math.random() * H : H + 5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.5 + 0.15);
    this.r = Math.random() * 1.5 + 0.4;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '0,245,212' : '123,97,255';
  };
  Particle.prototype.update = function () {
    this.x += this.vx; this.y += this.vy; this.alpha -= 0.0007;
    if (this.y < -5 || this.alpha <= 0) this.reset(false);
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')';
    ctx.fill();
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    isMobile = W < 768;
  }
  function make() {
    /* Fewer particles on mobile to save battery */
    var n = isMobile ? Math.min(25, Math.floor(W / 20)) : Math.min(60, Math.floor(W / 24));
    particles = [];
    for (var i = 0; i < n; i++) particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      /* Skip connecting lines on mobile */
      if (!isMobile) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0,245,212,' + (0.035 * (1 - d / 110)) + ')'; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      particles[i].update(); particles[i].draw();
    }
    requestAnimationFrame(loop);
  }

  resize(); make(); loop();
  window.addEventListener('resize', function () { resize(); make(); });
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */
function initNavbar() {
  var navbar = document.getElementById('navbar');
  var links = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  function tick() {
    navbar.classList.toggle('scrolled', window.pageYOffset > 20);
    var cur = '';
    sections.forEach(function (s) { if (window.pageYOffset >= s.offsetTop - 130) cur = s.id; });
    links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ═══════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════ */
function initMobileMenu() {
  var ham = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  var links = document.querySelectorAll('.mobile-link');
  if (!ham || !menu) return;

  function close() { ham.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = ''; }

  ham.addEventListener('click', function () {
    ham.classList.toggle('open'); menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  links.forEach(function (l) { l.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
}

/* ═══════════════════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════════════════ */
function initTyping() {
  var el = document.getElementById('typing-text');
  if (!el) return;
  var phrases = [
    'C/C++ Projects.',
    'Web Applications.',
    'Software Solutions.',
    'Coding Projects.',
    'Creative Web Apps.'
  ];
  var pi = 0, ci = 0, del = false;

  function type() {
    var cur = phrases[pi];
    if (!del) {
      ci++; el.textContent = cur.slice(0, ci);
      if (ci === cur.length) { setTimeout(function () { del = true; type(); }, 1800); return; }
      setTimeout(type, 60 + Math.random() * 40);
    } else {
      ci--; el.textContent = cur.slice(0, ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
      setTimeout(type, 32);
    }
  }
  setTimeout(type, 1800);
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
function initScrollReveal() {
  var els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('visible'); }); return; }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(function (el) { if (!el.closest('#hero')) obs.observe(el); });
}

/* ═══════════════════════════════════════════════════════
   HERO IMAGE TILT
═══════════════════════════════════════════════════════ */
function initHeroTilt() {
  var frame = document.querySelector('.image-frame');
  if (!frame || window.matchMedia('(hover: none)').matches) return;

  frame.addEventListener('mousemove', function (e) {
    var r = frame.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    frame.style.transition = 'transform 0.08s ease';
    frame.style.transform = 'perspective(600px) rotateX(' + (-y * 18) + 'deg) rotateY(' + (x * 18) + 'deg)';
  });
  frame.addEventListener('mouseleave', function () {
    frame.style.transition = 'transform 0.5s ease';
    frame.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  });
}

/* ═══════════════════════════════════════════════════════
   SKILL TABS
═══════════════════════════════════════════════════════ */
function initSkillTabs() {
  var btns = document.querySelectorAll('.tab-btn');
  var panes = document.querySelectorAll('.tab-pane');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var t = btn.dataset.tab;
      btns.forEach(function (b) { b.classList.remove('active'); });
      panes.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var pane = document.getElementById('tab-' + t);
      if (!pane) return;
      pane.classList.add('active');
      pane.querySelectorAll('.skill-fill').forEach(function (f, i) {
        var w = f.dataset.width || '0';
        f.style.width = '0%';
        setTimeout(function () { f.style.width = w + '%'; }, 60 + i * 80);
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   SKILL BARS  — scroll-based trigger (reliable)
═══════════════════════════════════════════════════════ */
function initSkillBars() {
  var section = document.getElementById('skills');
  if (!section) return;
  var done = false;

  function run() {
    if (done) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
      done = true;
      document.querySelectorAll('.tab-pane.active .skill-fill').forEach(function (f, i) {
        var w = f.dataset.width || '0';
        f.style.width = '0%';
        setTimeout(function () { f.style.width = w + '%'; }, 150 + i * 100);
      });
      window.removeEventListener('scroll', run);
    }
  }
  window.addEventListener('scroll', run, { passive: true });
  setTimeout(run, 100); /* try once after paint */
}

/* ═══════════════════════════════════════════════════════
   COUNTERS
═══════════════════════════════════════════════════════ */
function initCounters() {
  var els = document.querySelectorAll('.stat-number');
  if (!els.length) return;
  var done = false;

  function run() {
    if (done) return;
    if (els[0].getBoundingClientRect().top < window.innerHeight * 0.9) {
      done = true;
      els.forEach(function (el) {
        var target = parseInt(el.dataset.target, 10) || 0;
        var start = performance.now();
        (function tick(now) {
          var p = Math.min((now - start) / 1800, 1);
          el.textContent = Math.round((1 - Math.pow(2, -10 * p)) * target);
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
      window.removeEventListener('scroll', run);
    }
  }
  window.addEventListener('scroll', run, { passive: true });
  run();
}

/* ═══════════════════════════════════════════════════════
   3D TILT CARDS
═══════════════════════════════════════════════════════ */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform 0.1s ease';
      card.style.transform = 'perspective(800px) rotateX(' + (-y * 14) + 'deg) rotateY(' + (x * 14) + 'deg) translateZ(6px)';
      card.style.background = 'radial-gradient(circle at ' + ((x + 0.5) * 100) + '% ' + ((y + 0.5) * 100) + '%, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 55%), var(--bg-glass)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.5s ease, background 0.3s ease';
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.background = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
function initContactForm() {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var span = form.querySelector('button[type="submit"] span');
    var btn = form.querySelector('button[type="submit"]');
    if (span) span.textContent = 'Sending…';
    btn.disabled = true; btn.style.opacity = '0.7';

    setTimeout(function () {
      if (span) span.textContent = 'Sent ✓';
      btn.style.opacity = '1'; btn.style.background = 'linear-gradient(135deg,#00c9a7,#00a389)';
      if (success) success.style.display = 'block';
      form.reset();
      setTimeout(function () {
        if (span) span.textContent = 'Send Message';
        btn.style.background = ''; btn.disabled = false;
        if (success) success.style.display = 'none';
      }, 4000);
    }, 1400);
  });
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   PARALLAX ORBS
═══════════════════════════════════════════════════════ */
function initParallaxOrbs() {
  /* Parallax is visually subtle on mobile and wastes scroll events — skip it */
  if (window.innerWidth < 768) return;

  var o1 = document.querySelector('.orb-1');
  var o2 = document.querySelector('.orb-2');
  var o3 = document.querySelector('.orb-3');
  var t = false;
  window.addEventListener('scroll', function () {
    if (t) return;
    requestAnimationFrame(function () {
      var y = window.pageYOffset;
      if (o1) o1.style.transform = 'translate(' + (y * 0.05) + 'px,' + (y * 0.08) + 'px)';
      if (o2) o2.style.transform = 'translate(' + (-y * 0.04) + 'px,' + (-y * 0.06) + 'px)';
      if (o3) o3.style.transform = 'translate(' + (y * 0.03) + 'px,' + (y * 0.05) + 'px)';
      t = false;
    }); t = true;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════ */
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ═══════════════════════════════════════════════════════
   PILL GLOW
═══════════════════════════════════════════════════════ */
function initPillGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.tech-pill').forEach(function (p) {
    p.addEventListener('mousemove', function (e) {
      var r = p.getBoundingClientRect();
      p.style.background = 'radial-gradient(circle at ' + ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%, rgba(0,245,212,0.14), rgba(0,245,212,0.04))';
    });
    p.addEventListener('mouseleave', function () { p.style.background = ''; });
  });
}