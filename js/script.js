document.addEventListener('DOMContentLoaded', () => {
  // CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    // Expand cursor ring when hovering over interactive elements
    document.querySelectorAll('a, button, .proj-card, .skill-card, .cert-card, .about-card, .tl-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Hide custom cursor elements when hovering over input fields and textareas to reveal native text cursor
    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hidden');
        ring.classList.add('hidden');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hidden');
        ring.classList.remove('hidden');
      });
    });
  }

  // SCROLL PROGRESS
  const bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    });
  }

  // NAV SCROLL & BACK TO TOP BUTTON
  const nav = document.getElementById('navbar');
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
  });

  // ACTIVE NAV LINK SELECTION
  const sections = document.querySelectorAll('section[id], header');
  const navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) {
        cur = s.id || 'home';
      }
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });

  // MOBILE NAV TOGGLE
  const overlay = document.getElementById('navOverlay');
  const navToggle = document.getElementById('navToggle');
  const overlayClose = document.getElementById('overlayClose');

  if (overlay) {
    if (navToggle) {
      navToggle.addEventListener('click', () => overlay.classList.add('open'));
    }
    if (overlayClose) {
      overlayClose.addEventListener('click', () => overlay.classList.remove('open'));
    }
    document.querySelectorAll('.nav-ol-link').forEach(a => {
      a.addEventListener('click', () => overlay.classList.remove('open'));
    });
  }

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => ro.observe(r));

  // TYPEWRITER EFFECT
  const phrases = ['Data Analyst', 'IoT Developer', 'Power BI Expert', 'Python Developer'];
  let pi = 0, ci = 0, del = false;
  const typedEl = document.getElementById('typedText');

  if (typedEl) {
    function type() {
      const cur = phrases[pi];
      typedEl.textContent = del ? cur.substring(0, ci--) : cur.substring(0, ci++);
      if (!del && ci > cur.length) {
        del = true;
        setTimeout(type, 1400);
        return;
      }
      if (del && ci < 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, del ? 50 : 90);
    }
    setTimeout(type, 1200);
  }

  // FORM SUBMISSION HANDLER
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const n = document.getElementById('fname').value.trim();
      const emailVal = document.getElementById('femail').value.trim();
      
      if (!n || !emailVal) {
        alert('Please fill in your name and email.');
        return;
      }
      
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 5000);
      }
      
      contactForm.reset();
    });
  }
});
