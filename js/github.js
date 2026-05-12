/**
 * GitHub API Module
 * Handles all GitHub API calls and dynamic rendering
 */

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  TypeScript: '#2b7489',
  'Jupyter Notebook': '#DA5B0B',
  R: '#198CE7',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  SCSS: '#c6538c',
  Vue: '#41b883',
  default: '#8b949e'
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

async function fetchGitHubUser(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('GitHub user fetch failed:', e.message);
    return null;
  }
}

async function fetchGitHubRepos(username, count = 6) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${count}`
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('GitHub repos fetch failed:', e.message);
    return [];
  }
}

function renderProjectCard(repo) {
  const lang = repo.language || null;
  const langColor = lang ? getLangColor(lang) : null;
  const desc = repo.description
    ? (repo.description.length > 100 ? repo.description.slice(0, 97) + '…' : repo.description)
    : 'No description available.';

  return `
    <div class="project-card reveal">
      <div class="project-card-header">
        <div class="project-icon"><i class="fas fa-code-branch"></i></div>
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-name">${repo.name}</a>
        ${repo.fork ? '<span class="project-fork-badge">fork</span>' : ''}
      </div>
      <p class="project-desc">${desc}</p>
      <div class="project-footer">
        ${lang ? `
          <span class="lang-badge">
            <span class="lang-dot" style="background:${langColor}"></span>
            ${lang}
          </span>` : ''}
        <span class="project-stat">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </span>
        <span class="project-stat">
          <i class="fas fa-code-branch"></i> ${repo.forks_count}
        </span>
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
          View <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>`;
}

function renderSkeletons(container, count = 6) {
  container.innerHTML = Array(count)
    .fill('<div class="project-skeleton"><div class="sk-line sk-title"></div><div class="sk-line sk-body"></div><div class="sk-line sk-body short"></div><div class="sk-line sk-footer"></div></div>')
    .join('');
}

async function initGitHub() {
  const username = CONFIG.github.username;
  const reposGrid = document.getElementById('projectsGrid');
  const repoCountEl = document.getElementById('repoCount');
  const followerCountEl = document.getElementById('followerCount');
  const ghLocationEl = document.getElementById('ghLocation');

  // Show skeletons immediately
  if (reposGrid) renderSkeletons(reposGrid, CONFIG.github.reposToShow);

  // Fetch user data
  const user = await fetchGitHubUser(username);
  if (user) {
    if (repoCountEl) repoCountEl.textContent = user.public_repos ?? '–';
    if (followerCountEl) followerCountEl.textContent = user.followers ?? '–';
    if (ghLocationEl && user.location) ghLocationEl.textContent = user.location;

    // Update hero avatar with GitHub avatar
    const heroAvatar = document.getElementById('heroAvatar');
    if (heroAvatar && user.avatar_url) {
      heroAvatar.src = user.avatar_url;
      heroAvatar.alt = user.name || username;
    }
  }

  // Fetch repos
  const repos = await fetchGitHubRepos(username, CONFIG.github.reposToShow);

  if (reposGrid) {
    if (repos.length === 0) {
      reposGrid.innerHTML = `
        <div class="projects-empty">
          <i class="fas fa-inbox"></i>
          <p>No public repositories found.</p>
        </div>`;
    } else {
      reposGrid.innerHTML = repos.map(renderProjectCard).join('');
      // Trigger reveal for dynamically added cards
      requestAnimationFrame(() => initReveal());
    }
  }
}
