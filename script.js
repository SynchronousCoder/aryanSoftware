/* ============================================================
   SCRIPT.JS — Aryan Software
   GSAP + ScrollTrigger animations
   Navbar toggle (PRESERVED LOGIC), cursor, form, UPI copy
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.15, ease: 'power2.out' });
  });

  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(loop);
  })();
}

/* ── PAGE LOADER ────────────────────────────────────────────── */
function initLoader() {
  const loader    = document.getElementById('page-loader');
  if (!loader) return;

  const wordmark  = loader.querySelector('.loader-wordmark');
  const counter   = loader.querySelector('.loader-counter');

  gsap.to(wordmark, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' });

  let n = 0;
  const iv = setInterval(() => {
    n += Math.random() * 18 | 0;
    if (n >= 100) { n = 100; clearInterval(iv); }
    if (counter) counter.textContent = n + '%';
  }, 80);

  setTimeout(() => {
    gsap.to(loader, {
      yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.3,
      onComplete: () => {
        loader.style.display = 'none';
        initHeroAnimations();
      }
    });
  }, 1800);
}

/* ── NAVBAR — EXACT ORIGINAL LOGIC PRESERVED ───────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('fullscreen-menu');
  const links     = document.querySelectorAll('.menu-nav a');
  const footer    = document.querySelector('.menu-footer');
  const line1     = document.querySelector('.ham-line-1');
  const line2     = document.querySelector('.ham-line-2');

  if (!navbar || !hamburger || !menu) return;

  let open = false;
  let tl;

  // scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  function buildTl() {
    tl = gsap.timeline({ paused: true });
    tl.to(menu, {
      clipPath: 'circle(150% at calc(100% - 6% - 22px) 38px)',
      opacity: 1, duration: 0.75, ease: 'power3.inOut'
    })
    .to(links, {
      y: 0, opacity: 1, duration: 0.7,
      stagger: 0.07, ease: 'power3.out'
    }, '-=0.35')
    .to(footer, {
      opacity: 1, y: 0, duration: 0.4, ease: 'power2.out'
    }, '-=0.2');
  }

  function openMenu() {
    open = true;
    document.body.classList.add('menu-open');
    menu.classList.add('is-open');
    // lines → X
    gsap.to(line1, { rotation: 45,  y:  4.5, width: 26, background: '#F8F7F2', duration: 0.35, ease: 'power2.inOut' });
    gsap.to(line2, { rotation: -45, y: -4.5, width: 26, background: '#F8F7F2', duration: 0.35, ease: 'power2.inOut' });
    if (!tl) buildTl();
    tl.play();
  }

  function closeMenu() {
    open = false;
    document.body.classList.remove('menu-open');
    // X → lines
    gsap.to(line1, { rotation: 0, y: 0, width: 28, background: 'var(--ink)', duration: 0.35, ease: 'power2.inOut' });
    gsap.to(line2, { rotation: 0, y: 0, width: 18, background: 'var(--ink)', duration: 0.35, ease: 'power2.inOut' });
    tl.reverse().then(() => menu.classList.remove('is-open'));
  }

  hamburger.addEventListener('click', () => open ? closeMenu() : openMenu());
  links.forEach(l => l.addEventListener('click', () => { if (open) closeMenu(); }));
}

/* ── HERO ANIMATIONS ────────────────────────────────────────── */
function initHeroAnimations() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.1 });

  tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to('.hero-h1', { opacity: 1, duration: 0 })
    .to('.hero-h1 .line-inner', { y: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }, '-=0.3')
    .to('.hero-sub',       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-actions',   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .to('.hero-trust-row', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.hero-scroll-cue',{ opacity: 1, duration: 0.6 }, '-=0.3');

  // Floating shapes
  gsap.to('.hv-ring-1',  { y: -18, rotation: 14, duration: 4,   yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.hv-ring-2',  { y:  14, rotation: -9, duration: 5.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.8 });
  gsap.to('.hv-screen',  { y: -12, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.3 });
  gsap.to('.hv-glow',    { scale: 1.2, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.hv-chip-1',  { y: -10, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
  gsap.to('.hv-chip-2',  { y:  10, duration: 4,   yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.2 });
  gsap.to('.hv-chip-3',  { y:  -8, duration: 5,   yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.9 });

  // Hero right fade-in
  gsap.from('.hero-right', { opacity: 0, x: 60, duration: 1.2, delay: 0.6, ease: 'power3.out' });

  // Parallax on scroll
  gsap.to('.hero-right', {
    y: -100,
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });

  // Mouse parallax
  document.addEventListener('mousemove', e => {
    const xR = (e.clientX / window.innerWidth  - 0.5) * 2;
    const yR = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('.hv-ring-1',  { x: xR * -14, y: yR * -10, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
    gsap.to('.hv-ring-2',  { x: xR *  10, y: yR *   8, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
    gsap.to('.hv-screen',  { x: xR *  -8, y: yR *  -6, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
    gsap.to('.hv-chip-1',  { x: xR *  12, y: yR *   6, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
    gsap.to('.hv-chip-2',  { x: xR * -10, y: yR *  -8, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
  });
}

/* ── PAGE HERO (inner pages) ────────────────────────────────── */
function initPageHero() {
  const hero = document.querySelector('.page-hero-content');
  if (!hero) return;

  gsap.from(Array.from(hero.children), {
    opacity: 0, y: 30, stagger: 0.12,
    duration: 0.85, delay: 0.45, ease: 'power3.out'
  });
}

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initScrollAnimations() {
  // eyebrows
  document.querySelectorAll('.eyebrow').forEach(el => {
    gsap.from(el, {
      opacity: 0, x: -20, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // section titles
  document.querySelectorAll('.section-title, .cta-h2').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 28, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // section subtitles
  document.querySelectorAll('.section-subtitle, .cta-sub').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // reveal-up utility
  document.querySelectorAll('.reveal-up').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 36, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // service rows
  document.querySelectorAll('.svc-row').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: i % 2 === 0 ? -30 : 30,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // CTA inner
  const ctaInner = document.querySelector('.cta-inner');
  if (ctaInner) {
    gsap.from(Array.from(ctaInner.children), {
      opacity: 0, y: 40, stagger: 0.14, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: ctaInner.parentElement, start: 'top 75%', toggleActions: 'play none none none' }
    });
  }

  // footer
  const footerTop = document.querySelector('.footer-top');
  if (footerTop) {
    gsap.from(Array.from(footerTop.children), {
      opacity: 0, y: 28, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: 'footer', start: 'top 90%', toggleActions: 'play none none none' }
    });
  }
}

/* ── PRODUCT CARDS — Cinematic stagger ──────────────────────── */
function initProductCards() {
  // products page grid
  document.querySelectorAll('.p-card').forEach((card, idx) => {
    const col  = idx % 3;
    const xDir = col === 0 ? -60 : col === 2 ? 60 : 0;
    const delay = (idx % 3) * 0.1;

    gsap.from(card, {
      x: xDir, y: 50, opacity: 0,
      rotationY: xDir > 0 ? 12 : xDir < 0 ? -12 : 0,
      transformPerspective: 800,
      duration: 0.9, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
    });
    // ensure visible after anim
    gsap.set(card, { clearProps: 'opacity,y,x,rotationY', delay: delay + 0.9 });
  });

  // home 6-card grid — alternating L/R
  document.querySelectorAll('.h-card').forEach((card, idx) => {
    const dir   = idx % 2 === 0 ? -70 : 70;
    const rDelay = idx < 2 ? 0 : idx < 4 ? 0.08 : 0.16;

    gsap.from(card, {
      x: dir, opacity: 0,
      rotationY: dir > 0 ? 12 : -12,
      transformPerspective: 800,
      duration: 0.95, delay: rDelay,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
    });
  });
}

/* ── SERVICE CARDS ──────────────────────────────────────────── */
function initServiceCards() {
  document.querySelectorAll('.svc-card').forEach((card, idx) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.8,
      delay: (idx % 2) * 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

/* ── TILT EFFECT ────────────────────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.h-card, .p-card, .svc-card, .why-card, .pillar-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, { rotationX: -y * 4, rotationY: x * 5, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}

/* ── ABOUT ANIMATIONS ───────────────────────────────────────── */
function initAboutAnimations() {
  document.querySelectorAll('.metric-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: 30, duration: 0.65, delay: i * 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  document.querySelectorAll('.pillar-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.65, delay: (i % 2) * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  document.querySelectorAll('.val-item').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.6, delay: (i % 3) * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.values-strip', start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  document.querySelectorAll('.why-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 0.65, delay: (i % 3) * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

/* ── PAYMENT ANIMATIONS ─────────────────────────────────────── */
function initPaymentAnimations() {
  if (!document.querySelector('.table-wrap')) return;
  gsap.from('.pay-notice', { opacity: 0, y: 24, duration: 0.7, delay: 0.4, ease: 'power3.out' });
  gsap.from('.table-wrap', { opacity: 0, y: 32, duration: 0.85, delay: 0.55, ease: 'power3.out' });
  gsap.from('.pay-method-card', {
    opacity: 0, y: 24, stagger: 0.1, duration: 0.65, delay: 0.7, ease: 'power3.out'
  });
  gsap.from('.upi-box', { opacity: 0, y: 28, duration: 0.75, delay: 0.85, ease: 'power3.out' });
  document.querySelectorAll('tbody tr').forEach((row, i) => {
    gsap.from(row, { opacity: 0, x: -18, duration: 0.45, delay: 0.6 + i * 0.05, ease: 'power2.out' });
  });
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Animate in
  gsap.from('.contact-info > *', {
    opacity: 0, y: 28, stagger: 0.1, duration: 0.7, delay: 0.4, ease: 'power3.out'
  });
  gsap.from('.contact-form-box', {
    opacity: 0, x: 36, duration: 0.85, delay: 0.5, ease: 'power3.out'
  });

  // Inline validation
  function validate(el) {
    const v = el.value.trim();
    if (el.required && !v) { el.classList.add('error'); return false; }
    if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { el.classList.add('error'); return false; }
    el.classList.remove('error');
    return true;
  }
  form.querySelectorAll('.form-inp, .form-ta').forEach(el => {
    el.addEventListener('blur',  () => validate(el));
    el.addEventListener('input', () => el.classList.remove('error'));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required].form-inp,[required].form-ta').forEach(el => { if (!validate(el)) ok = false; });
    const cb = form.querySelector('.form-check');
    if (cb && !cb.checked) { ok = false; cb.style.outline = '2px solid #C83C3C'; }
    if (!ok) { gsap.from('.form-submit-btn', { x: -6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }); return; }

    const btn = form.querySelector('.form-submit-btn');
    btn.classList.add('loading'); btn.disabled = true;

    // backend call
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.querySelector('#name')?.value,
          email:   form.querySelector('#email')?.value,
          phone:   form.querySelector('#phone')?.value,
          subject: form.querySelector('#subject')?.value,
          message: form.querySelector('#message')?.value,
        })
      });
    } catch (_) {}

    setTimeout(() => {
      btn.classList.remove('loading'); btn.disabled = false;
      btn.innerHTML = '<span class="btn-label">✓ Message Sent!</span>';
      btn.style.background = 'var(--green)';
      const s = document.getElementById('form-success');
      if (s) { s.style.display = 'block'; gsap.from(s, { opacity: 0, y: 10, duration: 0.5 }); }
    }, 1800);
  });
}

/* ── UPI COPY ───────────────────────────────────────────────── */
function initUPICopy() {
  const btn = document.querySelector('.upi-copy-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const id = document.querySelector('.upi-id')?.textContent?.trim();
    if (!id) return;
    navigator.clipboard.writeText(id).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Copied!'; btn.style.color = 'var(--gold-lt)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2500);
    });
  });
}

/* ── PAGE TRANSITIONS ───────────────────────────────────────── */
function initPageTransitions() {
  gsap.from('body', { opacity: 0, duration: 0.45, ease: 'power2.out' });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (!href.endsWith('.html') && href !== '/') return;
    link.addEventListener('click', e => {
      e.preventDefault();
      gsap.to('body', { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { window.location.href = href; } });
    });
  });
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initPageTransitions();

  const hasLoader = !!document.getElementById('page-loader');
  if (hasLoader) {
    initLoader(); // hero runs after loader exits
  } else {
    initPageHero();
    initPaymentAnimations();
    initAboutAnimations();
    initContactForm();
  }

  initScrollAnimations();
  initProductCards();
  initServiceCards();
  initUPICopy();
  initTilt();
});
