// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Handler with Formspree (AJAX)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const button = document.getElementById('submit-btn');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  button.disabled = true;
  button.textContent = 'Sending...';
  status.textContent = '';

  const data = new FormData(e.target);
  
  try {
    const response = await fetch(e.target.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.style.color = 'var(--accent)';
      status.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    } else {
      const result = await response.json();
      status.style.color = '#ff6b6b';
      if (result.errors) {
        status.textContent = result.errors.map(error => error.message).join(", ");
      } else {
        status.textContent = 'Oops! There was a problem submitting your form.';
      }
    }
  } catch (error) {
    status.style.color = '#ff6b6b';
    status.textContent = 'Oops! There was a problem submitting your form.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send Message';
  }
});

// Intersection Observer for active nav highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});
