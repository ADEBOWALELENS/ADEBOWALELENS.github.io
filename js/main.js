/**
 * Main JavaScript — animations, UI, interactions
 */

/* =========================================
   THEME TOGGLE
   ========================================= */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

(function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* =========================================
   NAVBAR
   ========================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  updateScrollSpy();
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (navLinks && hamburger && !navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

/* =========================================
   SCROLL SPY
   ========================================= */
function updateScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* =========================================
   SCROLL TO TOP
   ========================================= */
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================
   STAR CANVAS
   ========================================= */
(function initStarCanvas() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animId;
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(count = 180) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        opacity: Math.random(),
        twinkle: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        speed: Math.random() * 0.12 + 0.03
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.opacity += s.twinkle;
      if (s.opacity <= 0) { s.opacity = 0; s.twinkle = Math.abs(s.twinkle); }
      if (s.opacity >= 1) { s.opacity = 1; s.twinkle = -Math.abs(s.twinkle); }
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(88,166,255,${s.opacity * 0.8})`;
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      createStars();
      draw();
    }, 200);
  });

  // Pause animation when hero is not visible
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cancelAnimationFrame(animId);
        draw();
      } else {
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0 }).observe(heroSection);
  }
})();

/* =========================================
   TYPING EFFECT
   ========================================= */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const titles = CONFIG.personal.titles;
  let tIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word = titles[tIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 95);
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % titles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    }
  }

  setTimeout(tick, 800);
})();

/* =========================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================= */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.revealed)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('revealed'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => obs.observe(el));
}

/* =========================================
   RENDER EXPERIENCE TIMELINE
   ========================================= */
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;

  container.innerHTML = CONFIG.experience.map((exp, i) => `
    <div class="timeline-item reveal" style="--delay:${i * 100}ms">
      <div class="timeline-dot ${exp.current ? 'current' : ''}"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <p class="timeline-company">
              <i class="fas fa-building"></i> ${exp.company}
              <span class="timeline-location"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
            </p>
          </div>
          <span class="timeline-period ${exp.current ? 'current' : ''}">${exp.period}</span>
        </div>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li><i class="fas fa-chevron-right"></i>${b}</li>`).join('')}
        </ul>
        <div class="timeline-tags">
          ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

/* =========================================
   RENDER EDUCATION
   ========================================= */
function renderEducation() {
  const container = document.getElementById('educationGrid');
  if (!container) return;

  container.innerHTML = CONFIG.education.map((edu, i) => `
    <div class="edu-card reveal" style="--delay:${i * 120}ms">
      <div class="edu-icon">
        <i class="fas ${edu.icon}"></i>
      </div>
      <div class="edu-body">
        <h3 class="edu-degree">${edu.degree}</h3>
        <p class="edu-school"><i class="fas fa-university"></i> ${edu.school}</p>
        <span class="edu-period"><i class="fas fa-calendar-alt"></i> ${edu.period}</span>
      </div>
    </div>`).join('');
}

/* =========================================
   CONTACT FORM — mailto: (no backend needed)
   ========================================= */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName')?.value.trim()    || '';
    const email   = document.getElementById('contactEmail')?.value.trim()   || '';
    const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Enquiry';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in your name, email, and message.', 'warning');
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONFIG.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    if (submitBtn) {
      const orig = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening your email app…';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = orig;
        submitBtn.disabled = false;
        form.reset();
        showToast('✅ Your email app should have opened!', 'success');
      }, 2500);
    }
  });
})();

/* =========================================
   COPY TO CLIPBOARD
   ========================================= */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Copied to clipboard!', 'success');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-check';
        setTimeout(() => (icon.className = 'fas fa-copy'), 2000);
      }
    }).catch(() => {
      showToast('Could not copy — please copy manually.', 'error');
    });
  });
});

/* =========================================
   TOAST NOTIFICATIONS
   ========================================= */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast toast-${type} toast-show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = 'toast';
  }, 3500);
}

/* =========================================
   PDF VIEWER CHECK
   ========================================= */
async function checkPDF() {
  const viewer = document.getElementById('pdfViewer');
  const placeholder = document.getElementById('pdfPlaceholder');
  if (!viewer || !placeholder) return;

  try {
    const res = await fetch(CONFIG.personal.cvPath, { method: 'HEAD' });
    if (res.ok) {
      viewer.src = CONFIG.personal.cvPath;
      viewer.style.display = 'block';
      placeholder.style.display = 'none';
    }
  } catch {
    // Keep placeholder visible
  }
}

/* =========================================
   SMOOTH ANCHOR SCROLLING
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================================
   INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderEducation();
  initDashboards();
  initReveal();
  checkPDF();
  initGitHub();
  updateScrollSpy();
});
