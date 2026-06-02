// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  
  // This approach opens the user's default email client with the message pre-filled.
  // It is the most reliable way to handle contact forms on a static site without a server.
  const subject = encodeURIComponent('Professional Inquiry from ' + fd.get('name'));
  const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\nMessage:\n${fd.get('message')}`);
  
  window.location.href = `mailto:featlerose@gmail.com?subject=${subject}&body=${body}`;
  
  // Optional: Clear the form after submission
  e.target.reset();
  alert('Thank you! This will open your email application to send the message.');
});
