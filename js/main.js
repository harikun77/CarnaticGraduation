/**
 * Carnatic Graduation Concert — Interactive Frontend Controller
 * Dynamically binds content.json to DOM with full fallback support
 */

// Embedded fallback data for seamless local file:// browsing
const FALLBACK_DATA = {
  site: {
    title: "Sahana Kumar — Carnatic Vocal Graduation Concert",
    brand: "Carnatic Margam",
    rsvpUrl: "https://evite.me/carnatic-graduation-sahana",
    liveStreamUrl: "https://youtube.com/live",
    venue: "Visual & Performing Arts Center",
    address: "21250 Stevens Creek Blvd, Cupertino, CA 95014",
    date: "Saturday, August 29, 2026",
    time: "4:30 PM PDT",
    directionsUrl: "https://maps.google.com/?q=Visual+and+Performing+Arts+Center+Cupertino+CA"
  }
};

async function fetchContentData() {
  // Check localStorage override (useful for live admin / local testing)
  try {
    const override = localStorage.getItem('carnaticContentOverride');
    if (override) return JSON.parse(override);
  } catch (e) {}

  try {
    const res = await fetch('content.json?ts=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP status ' + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Could not fetch content.json (likely local file:// origin). Using embedded data.', err);
    return FALLBACK_DATA;
  }
}

async function initPage() {
  const data = await fetchContentData();
  const page = document.documentElement.getAttribute('data-page') || 'home';

  // Global site bindings
  if (data?.site?.title) document.title = data.site.title;

  const brandTitles = document.querySelectorAll('.bind-brand-title');
  brandTitles.forEach(el => { el.textContent = data.site.brand || 'Carnatic Margam'; });

  const rsvpBtns = document.querySelectorAll('.bind-rsvp');
  rsvpBtns.forEach(el => { 
    if (data.site.rsvpUrl) el.href = data.site.rsvpUrl; 
  });

  const liveStreamBtns = document.querySelectorAll('.bind-livestream');
  liveStreamBtns.forEach(el => {
    if (data.site.liveStreamUrl) el.href = data.site.liveStreamUrl;
  });

  const directionsBtns = document.querySelectorAll('.bind-directions');
  directionsBtns.forEach(el => {
    if (data.site.directionsUrl) el.href = data.site.directionsUrl;
  });

  // Page Specific Inits
  if (page === 'home') renderHomePage(data);
  if (page === 'program') renderProgramPage(data);
  if (page === 'artists') renderArtistsPage(data);
}

/* ==========================================================================
   Home Page Binding
   ========================================================================== */
function renderHomePage(data) {
  if (!data?.home) return;

  const titleEl = document.getElementById('hero-title');
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const subEl = document.getElementById('hero-subtitle');
  const dateEl = document.getElementById('chip-date');
  const timeEl = document.getElementById('chip-time');
  const venueEl = document.getElementById('chip-venue');
  const aboutEl = document.getElementById('home-about-text');

  if (titleEl) titleEl.textContent = data.home.hero?.title || 'Sahana Kumar';
  if (eyebrowEl) eyebrowEl.textContent = data.home.hero?.eyebrow || 'Carnatic Vocal Graduation Concert';
  if (subEl) subEl.textContent = data.home.hero?.subtitle || '';
  if (dateEl) dateEl.textContent = `Date: ${data.site.date}`;
  if (timeEl) timeEl.textContent = `Time: ${data.site.time}`;
  if (venueEl) venueEl.textContent = `Venue: ${data.site.venue}`;
  if (aboutEl) aboutEl.textContent = data.home.about || '';

  // Stats
  const statsContainer = document.getElementById('home-stats');
  if (statsContainer && data.home.stats) {
    statsContainer.innerHTML = '';
    data.home.stats.forEach(stat => {
      const card = document.createElement('div');
      card.className = 'stat';
      card.innerHTML = `<span>${stat.label}</span><strong>${stat.value}</strong>`;
      statsContainer.appendChild(card);
    });
  }
}

/* ==========================================================================
   Program Guide Binding (Core Page)
   ========================================================================== */
function renderProgramPage(data) {
  if (!data?.program) return;

  const subtitleEl = document.getElementById('program-page-subtitle');
  if (subtitleEl && data.program.subtitle) {
    subtitleEl.textContent = data.program.subtitle;
  }

  const container = document.getElementById('program-bento-container');
  if (!container || !data.program.items) return;

  const items = data.program.items;

  function renderList(filterCategory = 'all') {
    container.innerHTML = '';
    const filtered = filterCategory === 'all' 
      ? items 
      : items.filter(item => item.category.toLowerCase().includes(filterCategory.toLowerCase()));

    filtered.forEach(item => {
      const article = document.createElement('article');
      article.className = 'program-item';
      article.innerHTML = `
        <div class="program-image-wrapper">
          <span class="program-badge">${item.category}</span>
          <div class="program-visual-icon">${item.visualIcon || '🎵'}</div>
          <div class="program-image-title">${item.title}</div>
          <div class="program-image-subtitle">${item.composer}</div>
        </div>
        <div class="program-details">
          <div class="program-details-header">
            <h3>${item.number}. ${item.title}</h3>
          </div>
          <p>${item.overview}</p>
          <p>${item.details.replace(/\n/g, '<br/>')}</p>
          <div class="program-meta">
            <div class="meta-item"><strong>Ragam:</strong> ${item.ragam}</div>
            <div class="meta-item"><strong>Talam:</strong> ${item.talam}</div>
            <div class="meta-item"><strong>Composer:</strong> ${item.composer}</div>
            <div class="meta-item"><strong>Deity / Theme:</strong> ${item.deity}</div>
          </div>
        </div>
      `;
      container.appendChild(article);
    });
  }

  renderList('all');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderList(cat);
    });
  });
}

/* ==========================================================================
   Artists & Bios Binding
   ========================================================================== */
function renderArtistsPage(data) {
  if (!data?.artists) return;

  // Vocalist (Sahana)
  const vocalist = data.artists.vocalist;
  if (vocalist) {
    const nameEl = document.getElementById('vocalist-name');
    const taglineEl = document.getElementById('vocalist-tagline');
    const bioContainer = document.getElementById('vocalist-bio');
    const highlightsContainer = document.getElementById('vocalist-highlights');
    const imgEl = document.getElementById('vocalist-img');

    if (nameEl) nameEl.textContent = vocalist.name;
    if (taglineEl) taglineEl.textContent = vocalist.tagline;
    if (imgEl && vocalist.image) imgEl.src = vocalist.image;

    if (bioContainer && vocalist.bio) {
      bioContainer.innerHTML = '';
      vocalist.bio.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        bioContainer.appendChild(p);
      });
    }

    if (highlightsContainer && vocalist.highlights) {
      highlightsContainer.innerHTML = '';
      vocalist.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlightsContainer.appendChild(li);
      });
    }
  }

  // Guru (Smt. Geetha Ravi)
  const guru = data.artists.guru;
  if (guru) {
    const nameEl = document.getElementById('guru-name');
    const taglineEl = document.getElementById('guru-tagline');
    const bioContainer = document.getElementById('guru-bio');
    const highlightsContainer = document.getElementById('guru-highlights');

    if (nameEl) nameEl.textContent = guru.name;
    if (taglineEl) taglineEl.textContent = guru.tagline;

    if (bioContainer && guru.bio) {
      bioContainer.innerHTML = '';
      guru.bio.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        bioContainer.appendChild(p);
      });
    }

    if (highlightsContainer && guru.highlights) {
      highlightsContainer.innerHTML = '';
      guru.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlightsContainer.appendChild(li);
      });
    }
  }

  // Accompanists Grid
  const accompanists = data.artists.accompanists;
  const accContainer = document.getElementById('accompanists-container');
  if (accContainer && accompanists) {
    accContainer.innerHTML = '';
    accompanists.forEach(acc => {
      const card = document.createElement('div');
      card.className = 'accompanist-card';
      card.innerHTML = `
        <div class="accompanist-header">
          <div class="accompanist-icon">${acc.icon || '🎵'}</div>
          <div class="accompanist-info">
            <h3>${acc.name}</h3>
            <span class="accompanist-instrument">${acc.instrument}</span>
          </div>
        </div>
        <p>${acc.bio}</p>
      `;
      accContainer.appendChild(card);
    });
  }
}

/* ==========================================================================
   Navigation Toggle & Lifecycle
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  initPage();
});
