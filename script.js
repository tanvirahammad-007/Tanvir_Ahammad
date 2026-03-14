/* ═══════════════════════════════════════════════════════
   Tanvir Ahammad — DEVELOPER PORTFOLIO  |  script.js v4
   Refactored: Bug fixes, upgraded cursor, robust scroll
   reveal, tab/skill-bar sync, accessibility improvements.
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Entry point ──────────────────────────────────── */
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
  initMusic();
});

/* ═══════════════════════════════════════════════════════
   PAGE LOADER
   Fix: visibility + opacity combo; display:none after fade;
        window.load safety fallback.
═══════════════════════════════════════════════════════ */
function initLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;

  var done = false;

  function hideLoader() {
    if (done) return;
    done = true;
    loader.classList.add('hidden');

    // Remove from DOM after CSS transition completes (600ms)
    setTimeout(function () {
      loader.style.display = 'none';
    }, 620);

    // Make hero elements visible
    document.querySelectorAll(
      '#hero .reveal-up, #hero .reveal-right, #hero .reveal-left'
    ).forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Primary: matches CSS loader bar animation (~1.4s)
  setTimeout(hideLoader, 1600);

  // Safety: always hide on full page load
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 200);
  });
}

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR — suryanshsva.framer.website style
   Two-part: tiny instant dot + large lagging ring.
   - Dot tracks mouse 1:1 (no lag)
   - Ring trails behind via lerp
   - Both scale/morph on hover and click
   - Disabled on touch devices
═══════════════════════════════════════════════════════ */
function initCursor() {
  // Only on pointer devices
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  document.body.classList.add('has-custom-cursor');

  var mouseX = -200, mouseY = -200; // start off-screen
  var ringX  = -200, ringY  = -200;
  var LERP   = 0.10; // 0.08–0.12 = natural lag feel
  var rafId;

  // Track mouse instantly for dot
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Instant dot — no lerp
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Animate ring with lerp (trailing)
  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover: grow ring, hide dot
  var hoverEls = document.querySelectorAll(
    'a, button, .project-card, .stat-card, .tech-pill, .tab-btn, ' +
    'input, textarea, label, [role="button"], .nav-cta, .social-dot, .social-btn'
  );

  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Click: quick shrink pulse
  document.addEventListener('mousedown', function () {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', function () {
    document.body.classList.remove('cursor-click');
  });

  // Hide/show on window leave/enter
  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Stop RAF when page hidden (battery)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      animateRing();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   PARTICLES CANVAS
═══════════════════════════════════════════════════════ */
function initParticles() {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  // Skip entirely on very small screens
  if (window.innerWidth < 480) {
    canvas.style.display = 'none';
    return;
  }

  var ctx = canvas.getContext('2d');
  var W, H, particles;
  var isMobile = window.innerWidth < 768;
  var rafId;

  function Particle() { this.reset(true); }
  Particle.prototype.reset = function (randomY) {
    this.x     = Math.random() * W;
    this.y     = randomY ? Math.random() * H : H + 5;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = -(Math.random() * 0.5 + 0.15);
    this.r     = Math.random() * 1.5 + 0.4;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '0,245,212' : '123,97,255';
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.0007;
    if (this.y < -5 || this.alpha <= 0) this.reset(false);
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha.toFixed(3) + ')';
    ctx.fill();
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    isMobile = W < 768;
  }

  function makeParticles() {
    var n = isMobile
      ? Math.min(25, Math.floor(W / 22))
      : Math.min(60, Math.floor(W / 25));
    particles = [];
    for (var i = 0; i < n; i++) particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    var len = particles.length;
    for (var i = 0; i < len; i++) {
      // Connecting lines — skip on mobile (too CPU intensive)
      if (!isMobile) {
        for (var j = i + 1; j < len; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0,245,212,' + (0.03 * (1 - d / 110)).toFixed(3) + ')';
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      particles[i].update();
      particles[i].draw();
    }

    rafId = requestAnimationFrame(loop);
  }

  resize();
  makeParticles();
  loop();

  // Debounced resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      makeParticles();
    }, 150);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   NAVBAR — scroll class + active link via IntersectionObserver
═══════════════════════════════════════════════════════ */
function initNavbar() {
  var navbar   = document.getElementById('navbar');
  var links    = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  // Scrolled state (glassmorphism background)
  var scrollTick = false;
  function onScroll() {
    if (!scrollTick) {
      requestAnimationFrame(function () {
        navbar.classList.toggle('scrolled', window.pageYOffset > 20);
        scrollTick = false;
      });
      scrollTick = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link — use IntersectionObserver for accuracy
  var currentId = '';

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) currentId = entry.target.id;
      });
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + currentId);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  } else {
    // Fallback: scroll offset
    window.addEventListener('scroll', function () {
      var cur = '';
      sections.forEach(function (s) {
        if (window.pageYOffset >= s.offsetTop - 130) cur = s.id;
      });
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
      });
    }, { passive: true });
  }
}

/* ═══════════════════════════════════════════════════════
   MOBILE MENU — with ARIA attributes
═══════════════════════════════════════════════════════ */
function initMobileMenu() {
  var ham    = document.getElementById('hamburger');
  var menu   = document.getElementById('mobile-menu');
  var closeBtn = document.getElementById('mobile-menu-close');
  var links  = document.querySelectorAll('.mobile-link');
  if (!ham || !menu) return;

  function openMenu() {
    ham.classList.add('open');
    menu.classList.add('open');
    menu.removeAttribute('aria-hidden');
    ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus to close button for accessibility
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closeMenu() {
    ham.classList.remove('open');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    ham.focus();
  }

  ham.addEventListener('click', function () {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  links.forEach(function (l) { l.addEventListener('click', closeMenu); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  // Close on backdrop click
  menu.addEventListener('click', function (e) {
    if (e.target === menu) closeMenu();
  });
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL for all hash links
═══════════════════════════════════════════════════════ */
function initSmoothScroll() {
  var NAV_H = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h'), 10) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_H;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
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
    'Creative Web Apps.',
    'Coding Projects.'
  ];

  var phraseIdx  = 0;
  var charIdx    = 0;
  var isDeleting = false;

  function type() {
    var current = phrases[phraseIdx];

    if (!isDeleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === current.length) {
        // Pause before deleting
        setTimeout(function () {
          isDeleting = true;
          type();
        }, 1900);
        return;
      }
      setTimeout(type, 65 + Math.random() * 40);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 35);
    }
  }

  // Start after loader finishes
  setTimeout(type, 1800);
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   Fix: hero section revealed by loader, not observer.
═══════════════════════════════════════════════════════ */
function initScrollReveal() {
  var els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  // Fallback for old browsers
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // once visible, unobserve
      }
    });
  }, {
    threshold:   0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(function (el) {
    // Hero elements are revealed by loader — skip observer
    if (!el.closest('#hero')) obs.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════
   HERO IMAGE TILT (mouse move 3D effect)
═══════════════════════════════════════════════════════ */
function initHeroTilt() {
  var frame = document.getElementById('hero-tilt');
  if (!frame || window.matchMedia('(hover: none)').matches) return;

  frame.addEventListener('mousemove', function (e) {
    var r = frame.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width  - 0.5;
    var y = (e.clientY - r.top)  / r.height - 0.5;
    frame.style.transition = 'transform 0.08s ease';
    frame.style.transform  =
      'perspective(600px) rotateX(' + (-y * 16) + 'deg) rotateY(' + (x * 16) + 'deg)';
  });

  frame.addEventListener('mouseleave', function () {
    frame.style.transition = 'transform 0.55s ease';
    frame.style.transform  = 'perspective(600px) rotateX(0) rotateY(0)';
  });
}

/* ═══════════════════════════════════════════════════════
   SKILL TABS
   Fix: use hidden attribute (not display:none) for ARIA;
        re-trigger skill bar animation on tab switch.
═══════════════════════════════════════════════════════ */
function initSkillTabs() {
  var btns  = document.querySelectorAll('.tab-btn');
  var panes = document.querySelectorAll('.tab-pane');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.dataset.tab;
      if (!tabId) return;

      // Update buttons
      btns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      panes.forEach(function (p) {
        p.classList.remove('active');
        p.hidden = true;
      });

      var activePane = document.getElementById('tab-' + tabId);
      if (!activePane) return;
      activePane.classList.add('active');
      activePane.hidden = false;

      // Animate skill bars in newly active pane
      activePane.querySelectorAll('.skill-fill').forEach(function (fill, i) {
        var w = fill.dataset.width || '0';
        fill.style.transition = 'none';
        fill.style.width = '0%';
        // Reflow + animate
        setTimeout(function () {
          fill.style.transition = 'width 0.9s cubic-bezier(0,0,0.2,1)';
          fill.style.width = w + '%';
        }, 40 + i * 70);
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   SKILL BARS — animate active tab on first scroll into view
═══════════════════════════════════════════════════════ */
function initSkillBars() {
  var section = document.getElementById('skills');
  if (!section) return;

  var done = false;

  function triggerBars() {
    if (done) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
      done = true;
      window.removeEventListener('scroll', triggerBars);

      document.querySelectorAll('.tab-pane.active .skill-fill').forEach(function (fill, i) {
        var w = fill.dataset.width || '0';
        fill.style.transition = 'none';
        fill.style.width = '0%';
        setTimeout(function () {
          fill.style.transition = 'width 0.9s cubic-bezier(0,0,0.2,1)';
          fill.style.width = w + '%';
        }, 120 + i * 100);
      });
    }
  }

  window.addEventListener('scroll', triggerBars, { passive: true });
  // Try once after DOM paint
  setTimeout(triggerBars, 200);
}

/* ═══════════════════════════════════════════════════════
   STAT COUNTERS — animate on first scroll into view
═══════════════════════════════════════════════════════ */
function initCounters() {
  var els = document.querySelectorAll('.stat-number');
  if (!els.length) return;

  var done = false;

  function triggerCounters() {
    if (done) return;
    // Check if first stat card is near viewport
    var r = els[0].getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) {
      done = true;
      window.removeEventListener('scroll', triggerCounters);

      els.forEach(function (el) {
        var target = parseInt(el.dataset.target, 10) || 0;
        var start  = performance.now();
        var DURATION = 1800; // ms

        function tick(now) {
          var p = Math.min((now - start) / DURATION, 1);
          // Ease-out exponential
          var eased = 1 - Math.pow(2, -10 * p);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target; // ensure exact value
        }
        requestAnimationFrame(tick);
      });
    }
  }

  window.addEventListener('scroll', triggerCounters, { passive: true });
  setTimeout(triggerCounters, 200);
}

/* ═══════════════════════════════════════════════════════
   3D TILT PROJECT CARDS
═══════════════════════════════════════════════════════ */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r  = card.getBoundingClientRect();
      var x  = (e.clientX - r.left)  / r.width  - 0.5;
      var y  = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
      card.style.transform  =
        'perspective(800px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) translateZ(6px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
      card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM — UI feedback (no backend in this version)
═══════════════════════════════════════════════════════ */
function initContactForm() {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn  = form.querySelector('button[type="submit"]');
    var span = btn ? btn.querySelector('span') : null;

    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }
    if (span) span.textContent = 'Sending…';

    // Simulate send (replace with real API call if needed)
    setTimeout(function () {
      if (span) span.textContent = 'Sent ✓';
      if (btn) {
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg, #00c9a7, #00a389)';
      }
      if (success) {
        success.hidden = false;
        success.style.display = 'block';
      }
      form.reset();

      // Reset after 4s
      setTimeout(function () {
        if (span) span.textContent = 'Send Message';
        if (btn) {
          btn.style.background = '';
          btn.disabled = false;
        }
        if (success) {
          success.hidden = true;
          success.style.display = '';
        }
      }, 4000);
    }, 1400);
  });
}

/* ═══════════════════════════════════════════════════════
   PARALLAX ORBS on scroll (desktop only)
═══════════════════════════════════════════════════════ */
function initParallaxOrbs() {
  if (window.innerWidth < 768) return;

  var o1 = document.querySelector('.orb-1');
  var o2 = document.querySelector('.orb-2');
  var o3 = document.querySelector('.orb-3');
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (ticking) return;
    requestAnimationFrame(function () {
      var y = window.pageYOffset;
      if (o1) o1.style.transform = 'translate(' + (y * 0.04) + 'px,' + (y * 0.07) + 'px)';
      if (o2) o2.style.transform = 'translate(' + (-y * 0.04) + 'px,' + (-y * 0.05) + 'px)';
      if (o3) o3.style.transform = 'translate(' + (y * 0.02) + 'px,' + (y * 0.04) + 'px)';
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════ */
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════
   TECH PILL GLOW (mouse-position radial gradient)
═══════════════════════════════════════════════════════ */
function initPillGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.tech-pill').forEach(function (pill) {
    pill.addEventListener('mousemove', function (e) {
      var r   = pill.getBoundingClientRect();
      var pct = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      var pct2 = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      pill.style.background =
        'radial-gradient(circle at ' + pct + '% ' + pct2 + '%, rgba(0,245,212,0.14), rgba(0,245,212,0.03))';
    });
    pill.addEventListener('mouseleave', function () {
      pill.style.background = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════
   BACKGROUND MUSIC PLAYER
   - Click button or press M key to toggle
   - Smooth volume fade in/out
   - Toast notification
   - Auto-pause when tab hidden
   - Graceful error if music.mp3 missing
═══════════════════════════════════════════════════════ */
function initMusic() {
  var btn   = document.getElementById('music-btn');
  var audio = document.getElementById('bg-music');
  if (!btn || !audio) return;

  var playing   = false;
  var firstPlay = true;
  var toastTimer;

  audio.volume = 0.45;

  // Create toast element
  var toast = document.createElement('div');
  toast.className = 'music-toast';
  toast.innerHTML =
    '<span class="music-toast-dot"></span>' +
    '<span class="music-toast-msg"></span>';
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.querySelector('.music-toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  // Smooth volume fade
  function fadeTo(target, duration, onDone) {
    var from  = audio.volume;
    var start = performance.now();

    (function step(now) {
      var p = Math.min((now - start) / duration, 1);
      audio.volume = from + (target - from) * p;
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        audio.volume = target;
        if (onDone) onDone();
      }
    })(start);
  }

  function playMusic() {
    audio.volume = 0;
    audio.play().then(function () {
      playing = true;
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Pause background music');
      fadeTo(0.45, 900);
      showToast(firstPlay ? '♪  Now Playing — Lo-fi Beats' : '♪  Music resumed');
      firstPlay = false;
      try { localStorage.setItem('portfolio_music', 'playing'); } catch (_) {}
    }).catch(function () {
      showToast('Tap ▶ again to enable music');
    });
  }

  function pauseMusic() {
    fadeTo(0, 500, function () {
      audio.pause();
      playing = false;
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play background music');
      showToast('Music paused');
      try { localStorage.setItem('portfolio_music', 'paused'); } catch (_) {}
    });
  }

  btn.addEventListener('click', function () {
    if (playing) pauseMusic(); else playMusic();
  });

  // Keyboard shortcut: M
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'm' || e.key === 'M') {
      if (playing) pauseMusic(); else playMusic();
    }
  });

  // Auto-pause when tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && playing) {
      audio.pause();
    } else if (!document.hidden && playing) {
      audio.play().catch(function () {});
    }
  });

  // Handle missing music file gracefully
  audio.addEventListener('error', function () {
    showToast('⚠  Add music.mp3 to your folder');
    btn.style.opacity = '0.35';
    btn.disabled = true;
  });
}