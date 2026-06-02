// Small interactions: year, contact form, simple validation
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  // For static sites: open mailto with contents
  const subject = encodeURIComponent('Portfolio contact from ' + fd.get('name'));
  const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
});
