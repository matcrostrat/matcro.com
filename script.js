/* ─── EMAILJS ────────────────────────────────────────────────── */
emailjs.init({ publicKey: 'E0LFyZ0Mh338G8QID' });

const EMAILJS_SERVICE  = 'matcro_honeypot';
const EMAILJS_TEMPLATE = 'template_sgnlh0s';

/* ─── NAV SCROLL STATE ──────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── HERO REVEAL ON LOAD ───────────────────────────────────── */
function heroReveal() {
  const lines = document.querySelectorAll('.reveal-line');
  const fades = document.querySelectorAll('.reveal-fade');

  // Slight delay to let paint settle
  requestAnimationFrame(() => {
    lines.forEach(el => el.classList.add('visible'));
    fades.forEach(el => el.classList.add('visible'));
  });
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

/* ─── STAGGERED CARD REVEALS ────────────────────────────────── */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('[data-reveal]');
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, idx * 120);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) cardObserver.observe(servicesGrid);

/* ─── CONTACT FORM ──────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('#name');
  const email = contactForm.querySelector('#email');
  let valid = true;

  // Simple validation
  [name, email].forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
  });

  if (email && email.value && !email.value.includes('@')) {
    email.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  // Honeypot check — bots fill the hidden field, humans never see it
  const honeypot = contactForm.querySelector('#website');
  if (honeypot && honeypot.value) return;

  const btn = contactForm.querySelector('.btn-primary');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, contactForm)
    .then(() => {
      contactForm.classList.add('hidden');
      formSuccess.classList.add('visible');
    })
    .catch(() => {
      btnText.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.outline = '2px solid #ff4d4d';
      btn.title = 'Something went wrong — please try again.';
    });
});

/* ─── SMOOTH ANCHOR SCROLLING ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', heroReveal);
