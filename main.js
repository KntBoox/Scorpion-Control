// NAV scroll border
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 80
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.06)';
}, { passive: true });

// Mobile nav toggle — class-based so it never fights the responsive CSS
const toggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav-links--open');
    toggle.classList.toggle('nav-mobile-toggle--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('nav-links--open');
      toggle.classList.remove('nav-mobile-toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Fade-in on scroll — safe: elements start visible, transition in when observed
const fadeSelectors = [
  '.process-step',
  '.diagram-item',
  '.testimonial-card',
  '.trust-block',
  '.split-stat',
  '.about-callout',
];

const fadeEls = document.querySelectorAll(fadeSelectors.join(','));

// Add a stylesheet for the transition so it's consistent
const style = document.createElement('style');
style.textContent = `
  .fade-pending {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-pending.fade-in {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Small stagger based on index within its parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-pending')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('fade-in');
      }, idx * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => {
  // Don't hide elements already in viewport at load time
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight * 0.95) {
    el.classList.add('fade-pending');
    observer.observe(el);
  }
});

// Form submit
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "Request Sent — We'll Be in Touch";
    btn.style.background = '#2E6E3A';
    btn.disabled = true;
  });
}
