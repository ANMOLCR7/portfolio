// Smooth scroll for anchor links (with fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = this.getAttribute('href');
      }
      target.focus({ preventScroll: true });
    }
  });
});

// Scroll to top button logic
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollTopBtn.blur();
});

// Contact form validation and feedback
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      this.email.focus();
      return;
    }

    // Simulate successful submission
    alert('Thank you for reaching out, ' + name + '!');
    contactForm.reset();
  });
}
