// Nav shadow on scroll
const nav = document.getElementById('site-nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile hamburger
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    })
  );
}

// Hero canvas — particle network (homepage only)
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [];
  let rafId = null;

  const CONN_DIST = 120;
  function getCount() { return window.innerWidth < 768 ? 55 : 90; }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    w = canvas.width;
    h = canvas.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function init() {
    const COUNT = getCount();
    nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        primary: Math.random() < 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.018
      });
    }
  }

  function frame() {
    // background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // teal radial glow behind content
    const grad = ctx.createRadialGradient(w * 0.7, h * 0.4, 0, w * 0.7, h * 0.4, w * 0.6);
    grad.addColorStop(0, 'rgba(0,158,133,0.16)');
    grad.addColorStop(0.4, 'rgba(0,158,133,0.08)');
    grad.addColorStop(1, 'rgba(0,158,133,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // update positions
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.phase += n.speed;
    }

    // connection lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONN_DIST) {
          const alpha = (1 - dist / CONN_DIST) * 0.35;
          if (a.primary && b.primary) {
            ctx.strokeStyle = 'rgba(0,158,133,' + (alpha * 3.0) + ')';
            ctx.lineWidth = 0.7;
          } else {
            ctx.strokeStyle = 'rgba(255,255,255,' + (alpha * 0.9) + ')';
            ctx.lineWidth = 0.4;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const pulse = 0.5 + 0.5 * Math.sin(n.phase);
      if (n.primary) {
        const op = 0.7 + pulse * 0.3;
        // outer glow
        ctx.fillStyle = 'rgba(0,158,133,0.1)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.fillStyle = 'rgba(0,158,133,' + op + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const op = 0.15 + pulse * 0.2;
        ctx.fillStyle = 'rgba(255,255,255,' + op + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (rafId) return;
    console.log('animation started');
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function boot() { resize(); init(); start(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); init(); }, 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
})();

// Scroll-reveal on sections
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Contact form submission → app.theproductoperator.ai/api/contact-sales
document.querySelectorAll('form[data-tpo-contact]').forEach(form => {
  const endpoint = 'https://app.theproductoperator.ai/api/contact-sales';
  const urlSource = new URLSearchParams(window.location.search).get('source');
  const source = urlSource || form.dataset.source || 'web';
  const messageEl = form.querySelector('.form-message');
  const submitBtn = form.querySelector('button[type="submit"], button:not([type])');
  const submitLabel = submitBtn ? submitBtn.innerHTML : '';

  // Wake Railway on first form interaction so the service is warm by submit
  let formWarmed = false;
  const warmForm = () => {
    if (formWarmed) return;
    formWarmed = true;
    try {
      fetch('https://app.theproductoperator.ai/', {
        method: 'GET', mode: 'no-cors', credentials: 'omit',
        cache: 'no-store', keepalive: true
      }).catch(function () {});
    } catch (_) {}
  };
  form.addEventListener('focusin', warmForm, { once: true, passive: true });

  // GA4: track form interaction start
  let formStarted = false;
  form.addEventListener('focusin', () => {
    if (formStarted) return;
    formStarted = true;
    if (typeof gtag === 'function') {
      gtag('event', 'form_start', {
        form_source: window.location.pathname
      });
    }
  }, { once: true, passive: true });

  const showError = (text) => {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = 'form-message error';
    messageEl.hidden = false;
  };
  const clearMessage = () => {
    if (!messageEl) return;
    messageEl.hidden = true;
    messageEl.textContent = '';
    messageEl.className = 'form-message';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.elements._honey && form.elements._honey.value) return;
    clearMessage();

    const name = (form.elements.name?.value || '').trim();
    const email = (form.elements.email?.value || '').trim();
    const company = (form.elements.company?.value || '').trim();
    const role = (form.elements.role?.value || '').trim();
    const teamSize = (form.elements.team_size?.value || '').trim();
    const message = (form.elements.message?.value || '').trim();
    const inquiryType = (form.elements.inquiry_type?.value || '').trim();

    if (!name || !email) {
      showError('Name and email are required.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span>';
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          teamSize,
          message,
          source,
          ...(inquiryType ? { inquiry_type: inquiryType } : {})
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed. Please email marc@theproductoperator.ai directly.');
      }
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit_contact', {
          inquiry_type: inquiryType || 'not_specified',
          source: source
        });
      }
      window.location.href = '/thank-you.html';
    } catch (err) {
      showError(err.message || 'Submission failed. Please email marc@theproductoperator.ai directly.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitLabel;
      }
    }
  });
});

// GA4: track thank-you page as conversion confirmation
if (window.location.pathname.includes('thank-you')) {
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead');
  }
}

// GA4: track CTA clicks (platform links and contact CTAs)
document.querySelectorAll('a[href*="app.theproductoperator.ai"], a[href*="contact.html"], .nav-cta, .nav-cta-outline').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'function') return;
    const isPlatform = link.href && link.href.includes('app.theproductoperator.ai');
    gtag('event', isPlatform ? 'platform_cta_click' : 'cta_click', {
      link_text: (link.textContent || '').trim(),
      page: window.location.pathname
    });
  });
});

// GA4: track nav link clicks
document.querySelectorAll('#site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'function') return;
    gtag('event', 'nav_click', {
      link_text: (link.textContent || '').trim(),
      destination: link.getAttribute('href') || ''
    });
  });
});

// Dashboard mockup — protect from copy/select/drag extraction
document.querySelectorAll('.mockup-wrap').forEach(mockup => {
  mockup.addEventListener('contextmenu', e => e.preventDefault());
  mockup.addEventListener('selectstart', e => e.preventDefault());
  mockup.addEventListener('dragstart', e => e.preventDefault());
  mockup.addEventListener('copy', e => e.preventDefault());
});

// Platform warmup — wake Railway cold-starts on intent.
// Fires a no-cors fetch to app.theproductoperator.ai the first time the
// user hovers, focuses, or touches any link that points at it. Intent
// typically precedes click by 100-500ms, which gives the container a
// head start on boot so the click lands on a warm service.
(function warmupPlatform() {
  let warmed = false;
  const warm = () => {
    if (warmed) return;
    warmed = true;
    try {
      fetch('https://app.theproductoperator.ai/', {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit',
        cache: 'no-store',
        keepalive: true
      }).catch(function () {});
    } catch (_) {}
  };

  const links = document.querySelectorAll('a[href*="app.theproductoperator.ai"]');
  links.forEach(function (a) {
    a.addEventListener('mouseenter', warm, { once: true, passive: true });
    a.addEventListener('focus', warm, { once: true, passive: true });
    a.addEventListener('touchstart', warm, { once: true, passive: true });
  });
})();
