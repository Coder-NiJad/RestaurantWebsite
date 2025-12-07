// assets/site.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const list = document.getElementById('nav-list');
  if (btn && list) {
    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      list.style.display = expanded ? 'none' : 'block';
      list.setAttribute('aria-hidden', String(expanded));
    });
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !list.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        list.style.display = 'none';
        list.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          setTimeout(() => el.classList.add('reveal--visible'), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('reveal--visible'));
  }

  // Scroll-spy nav active toggle
  const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#'+en.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
});

// basic reservation validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const date = new Date(form.date.value + ' ' + form.time.value);
    if (date < new Date()) {
      e.preventDefault();
      document.getElementById('form-feedback').textContent = 'Please choose a future date/time.';
      return false;
    }
  });
});
