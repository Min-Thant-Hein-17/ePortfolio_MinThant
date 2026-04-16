// Design: Precise, calm interactions reinforcing editorial futurist portfolio experience

// ============================================================================
// TYPEWRITER EFFECT
// ============================================================================

const typewriterElement = document.getElementById('typewriter');
const phrases = [
  'build AI systems',
  'solve real problems',
  'stay updated',
  'learn continuously',
  'make an impact'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 50;
const pauseBetweenPhrases = 2000;

function typewriter() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typewriterElement.textContent = currentPhrase.substring(0, charIndex);

  let delay = typingSpeed;

  if (isDeleting) {
    delay = deletingSpeed;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = pauseBetweenPhrases;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 500;
  }

  setTimeout(typewriter, delay);
}

// Start typewriter on page load
if (typewriterElement) {
  typewriter();
}

// ============================================================================
// NAVBAR SCROLL BLUR EFFECT
// ============================================================================

const navbar = document.getElementById('navbar');
let lastScrollY = 0;

function updateNavbarBlur() {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    navbar.classList.add('is-scrolled');
  } else {
    navbar.classList.remove('is-scrolled');
  }
  
  lastScrollY = scrollY;
}

window.addEventListener('scroll', updateNavbarBlur, { passive: true });

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

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

// ============================================================================
// NAVIGATION HIGHLIGHTING ON SCROLL
// ============================================================================

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function activateCurrentSection() {
  const threshold = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = navLinks.find((navLink) => navLink.getAttribute('href') === `#${id}`);

    if (!link) return;

    const isCurrent = threshold >= section.offsetTop && threshold < section.offsetTop + section.offsetHeight;
    link.classList.toggle('is-active', isCurrent);
  });
}

window.addEventListener('scroll', activateCurrentSection, { passive: true });
window.addEventListener('load', activateCurrentSection);
window.addEventListener('resize', activateCurrentSection);

// ============================================================================
// REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================================================

const revealItems = document.querySelectorAll('.reveal');

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

// ============================================================================
// FOOTER YEAR
// ============================================================================

const yearTarget = document.getElementById('year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

// ============================================================================
// PROJECT FILTER FUNCTIONALITY
// ============================================================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-grid');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter projects
    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
