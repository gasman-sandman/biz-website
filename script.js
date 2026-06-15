/* Serenity Therapy — Script */

// --- Sticky Nav ---
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile Nav Toggle ---
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open', !expanded);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }
});

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .testimonial-card, .step, .about-content, .about-image-wrap, .contact-info, .contact-form-wrap'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// --- Contact Form ---
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  // Simple validation
  [form.name, form.email, form.message].forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#E05252';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) return;

  // Simulate submission
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    successMsg.textContent = `Thank you, ${name}! I'll be in touch within one business day. If this is urgent, please call (212) 555-0182.`;
    successMsg.classList.add('visible');
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1000);
});

// Clear error styling on input
form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => { field.style.borderColor = ''; });
});

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id], .hero[id]');
const navItems = document.querySelectorAll('.nav-link:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--color-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
