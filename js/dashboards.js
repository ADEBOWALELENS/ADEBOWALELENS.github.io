/**
 * Dashboards Gallery Module
 * Renders cards from CONFIG.dashboards, handles filtering + lightbox
 */

(function () {
  'use strict';

  let visible = [];
  let lbIdx   = 0;

  const TOOL_CLASS = {
    'Power BI': 'tool-powerbi',
    'Tableau':  'tool-tableau',
    'Excel':    'tool-excel'
  };

  const TOOL_BADGE_STYLE = {
    'Power BI': 'background:#F2C811;color:#000',
    'Tableau':  'background:#E97627;color:#fff',
    'Excel':    'background:#217346;color:#fff'
  };

  function toolClass(tool) {
    return TOOL_CLASS[tool] || 'tool-powerbi';
  }

  /* ---- Render ---- */
  function renderDashboards(filter) {
    const grid = document.getElementById('dashGrid');
    if (!grid || !CONFIG.dashboards) return;

    visible = (!filter || filter === 'all')
      ? CONFIG.dashboards
      : CONFIG.dashboards.filter(d => d.tool === filter);

    if (visible.length === 0) {
      grid.innerHTML = `
        <div class="dash-empty">
          <i class="fas fa-chart-bar"></i>
          <p>No dashboards found for this filter.</p>
        </div>`;
      return;
    }

    grid.innerHTML = visible.map((d, i) => `
      <div class="dash-card reveal" style="--delay:${i * 80}ms">
        <div class="dash-img-wrap">
          <img src="${d.image}" alt="${d.title}" loading="lazy">
          <span class="dash-tool-badge ${toolClass(d.tool)}">${d.tool}</span>
        </div>
        <div class="dash-body">
          <h3 class="dash-title">${d.title}</h3>
          <p class="dash-desc">${d.description}</p>
          <div class="dash-tags">
            ${d.tags.map(t => `<span class="dash-tag">${t}</span>`).join('')}
          </div>
          <div class="dash-actions">
            <button class="dash-btn dash-btn-primary" data-lb="${i}" aria-label="View ${d.title} full size">
              <i class="fas fa-search-plus" aria-hidden="true"></i> View Full Size
            </button>
            <button class="dash-btn dash-btn-outline" data-info="${i}" aria-label="Details for ${d.title}">
              <i class="fas fa-clipboard-list" aria-hidden="true"></i> View Details
            </button>
          </div>
        </div>
      </div>`).join('');

    grid.querySelectorAll('[data-lb]').forEach(btn => {
      btn.addEventListener('click', () => openLightbox(+btn.dataset.lb));
    });

    grid.querySelectorAll('[data-info]').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = visible[+btn.dataset.info];
        showToast(`${d.title} — built with ${d.tool}`, 'success');
      });
    });

    requestAnimationFrame(() => initReveal());
  }

  /* ---- Lightbox ---- */
  function openLightbox(idx) {
    lbIdx = idx;
    syncLightbox();
    document.getElementById('lightbox').classList.add('lightbox-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('lightbox-open');
    document.body.style.overflow = '';
  }

  function navigate(step) {
    lbIdx = (lbIdx + step + visible.length) % visible.length;
    const img = document.getElementById('lightboxImg');
    img.style.transition = 'opacity 0.15s ease';
    img.style.opacity = '0';
    setTimeout(() => {
      syncLightbox();
      img.style.opacity = '1';
    }, 160);
  }

  function syncLightbox() {
    const d = visible[lbIdx];
    if (!d) return;
    const img   = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const tool  = document.getElementById('lightboxTool');
    img.src            = d.image;
    img.alt            = d.title;
    title.textContent  = d.title;
    tool.textContent   = d.tool;
    tool.style.cssText = TOOL_BADGE_STYLE[d.tool] || '';
  }

  /* ---- Init ---- */
  function initDashboards() {
    if (!CONFIG.dashboards || !CONFIG.dashboards.length) return;

    renderDashboards('all');

    document.getElementById('dashFilters')
      ?.querySelectorAll('.dash-filter')
      .forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.dash-filter')
            .forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDashboards(btn.dataset.filter);
        });
      });

    document.getElementById('lightboxClose')
      ?.addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev')
      ?.addEventListener('click', () => navigate(-1));
    document.getElementById('lightboxNext')
      ?.addEventListener('click', () => navigate(1));

    document.getElementById('lightbox')
      ?.addEventListener('click', e => {
        if (e.target.id === 'lightbox') closeLightbox();
      });

    document.addEventListener('keydown', e => {
      if (!document.getElementById('lightbox')
          ?.classList.contains('lightbox-open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  window.initDashboards = initDashboards;
})();
