// Design reminder: Keep interactions precise, calm, and purposeful, reinforcing an editorial futurist portfolio experience.
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const counters = document.querySelectorAll('[data-counter]');
const revealItems = document.querySelectorAll('.reveal');
const yearTarget = document.getElementById('year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const activateCurrentSection = () => {
  const threshold = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = navLinks.find((navLink) => navLink.getAttribute('href') === `#${id}`);

    if (!link) return;

    const isCurrent = threshold >= section.offsetTop && threshold < section.offsetTop + section.offsetHeight;
    link.classList.toggle('is-active', isCurrent);
  });
};

const animateCounter = (element) => {
  const target = Number(element.dataset.counter || 0);
  const duration = 1200;
  const start = performance.now();

  const updateValue = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.floor(eased * target));

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = String(target);
    }
  };

  requestAnimationFrame(updateValue);
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.85 }
);

counters.forEach((counter) => counterObserver.observe(counter));

window.addEventListener('scroll', activateCurrentSection, { passive: true });
window.addEventListener('load', activateCurrentSection);
window.addEventListener('resize', activateCurrentSection);
