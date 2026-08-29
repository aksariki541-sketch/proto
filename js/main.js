// =====================================================
// MUH. RIKI AKSA - PORTFOLIO JS
// Mobile menu, counter animation, scroll reveal, nav active state
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE MENU TOGGLE ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- COUNTER ANIMATION (Statistics section) ---------- */
  const counters = document.querySelectorAll('[data-counter]');

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- ELEVATION BAR ANIMATION (Mountain Journey) ---------- */
  const elevBars = document.querySelectorAll('.elev-bar-fill');

  const elevObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillPercent = entry.target.getAttribute('data-fill');
        entry.target.style.width = fillPercent + '%';
        elevObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  elevBars.forEach(el => elevObserver.observe(el));

  /* ---------- NAVBAR ACTIVE LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP ---------- */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (navbar) {
      if (currentScroll > lastScroll && currentScroll > 150) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScroll = currentScroll;
  });

});
