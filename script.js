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