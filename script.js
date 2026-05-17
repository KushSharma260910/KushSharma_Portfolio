// ==============================
// INTRO SLIDESHOW
// ==============================
let currentSlide = 0;
const totalSlides = 5;

function changeSlide(dir) {
  goSlide(currentSlide + dir);
}

function goSlide(n) {
  const slides = document.querySelectorAll('.intro-slide');
  const dots = document.querySelectorAll('.dot-ind');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance every 4 seconds
function startSlideAuto() {
  setInterval(() => changeSlide(1), 4000);
}

// ==============================
// HERO CANVAS — Particle field
// ==============================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '56,217,245' : '168,85,247'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},0.7)`;
      ctx.fill();
    });

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,217,245,${0.12 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ==============================
// TYPING ANIMATION
// ==============================
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['websites.', 'IoT systems.', 'cool things.', 'the future.'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1600); // pause at full word
        return;
      }
      setTimeout(type, 90);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    }
  }
  type();
}

function goTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function enterSite() {
  const intro = document.getElementById('intro-screen');
  const main = document.getElementById('main-site');
  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    main.classList.remove('hidden');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
    }, 100);
    initScrollReveal();
    initNavScroll();
    initTyping();
    startSlideAuto();
  }, 700);
}

// Particles
(function() {
  const c = document.getElementById('intro-particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*5+4}s;--delay:${Math.random()*5}s;background:${Math.random()>.5?'#38d9f5':'#a855f7'};`;
    c.appendChild(p);
  }
})();

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelectorAll('.theme-icon').forEach(i => i.textContent = isDark ? '🌙' : '☀️');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    document.querySelectorAll('.theme-icon').forEach(i => i.textContent = saved === 'dark' ? '☀️' : '🌙');
  }
})();

function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initNavScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navBtns = document.querySelectorAll('.nav-links button');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navBtns.forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes("'" + current + "'")) b.classList.add('active');
    });
  }, { passive: true });
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// Cursor glow
(function() {
  const g = document.createElement('div');
  g.style.cssText = 'position:fixed;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(56,217,245,.04) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left .15s ease,top .15s ease;mix-blend-mode:screen;';
  document.body.appendChild(g);
  document.addEventListener('mousemove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
})();

document.body.style.overflow = 'hidden';
