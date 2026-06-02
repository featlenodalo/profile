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

// Fetch GitHub projects
async function fetchGitHubProjects(username) {
  const container = document.getElementById('projects-list');
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    
    const repos = await response.json();
    container.innerHTML = ''; // Clear existing static projects or loading message

    repos.filter(repo => !repo.fork).forEach(repo => {
      const card = document.createElement('article');
      card.className = 'project';
      card.innerHTML = `
        <h4>${repo.name}</h4>
        <p>${repo.description || 'No description provided.'}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    container.innerHTML = '<p>Unable to load projects at this time.</p>';
  }
}

fetchGitHubProjects('featlenodalo');
