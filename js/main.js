/**
 * Paramacharya School of Music — Carnatic Vocal Graduation Concert
 * Interactive Frontend Controller & Data Binder (with Instant Cache-Buster)
 */

const FALLBACK_DATA = {
  site: {
    title: "Kum. Sahana Kumar — Vocal Graduation Concert | Paramacharya School of Music",
    brand: "Paramacharya School of Music",
    logo: "assets/logo.png",
    rsvpUrl: "https://evite.me/carnatic-graduation-sahana",
    liveStreamUrl: "https://youtube.com/live/FpBsvT8wrjU?feature=share",
    venue: "Saratoga Civic Theater",
    address: "13777 Fruitvale Avenue, Saratoga, CA 95070",
    date: "Sunday, August 30, 2026",
    time: "4:00 PM – 7:00 PM PDT",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Saratoga%20Civic%20Theater%2C%2013777%20Fruitvale%20Ave%2C%20Saratoga%2C%20CA%2095070"
  }
};

async function fetchContentData() {
  try {
    const override = localStorage.getItem('carnaticContentOverride');
    if (override) return JSON.parse(override);
  } catch (e) {}

  try {
    // Bust JSON cache on every load
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
  brandTitles.forEach(el => { el.textContent = data.site.brand || 'Paramacharya School of Music'; });

  // Instant Cache-Busted Logo Binding
  const logoImgs = document.querySelectorAll('.brand-logo');
  if (data?.site?.logo) {
    const freshLogoUrl = data.site.logo + (data.site.logo.includes('?') ? '&' : '?') + 't=' + Date.now();
    logoImgs.forEach(img => {
      img.src = freshLogoUrl;
    });
  }

  const rsvpBtns = document.querySelectorAll('.bind-rsvp');
  rsvpBtns.forEach(el => { 
    if (data.site?.rsvpUrl) {
      el.href = data.site.rsvpUrl;
    } else {
      el.style.display = 'none';
    }
  });

  const liveStreamBtns = document.querySelectorAll('.bind-livestream');
  liveStreamBtns.forEach(el => {
    if (data.site?.liveStreamUrl) el.href = data.site.liveStreamUrl;
  });

  const directionsBtns = document.querySelectorAll('.bind-directions');
  directionsBtns.forEach(el => {
    if (data.site?.directionsUrl) el.href = data.site.directionsUrl;
  });

  // Page Specific Inits
  if (page === 'home') renderHomePage(data);
  if (page === 'program') renderProgramPage(data);
  if (page === 'artists') renderArtistsPage(data);
}

function renderHomePage(data) {
  if (!data?.home) return;

  const titleEl = document.getElementById('hero-title');
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const subEl = document.getElementById('hero-subtitle');
  const dateEl = document.getElementById('chip-date');
  const timeEl = document.getElementById('chip-time');
  const venueEl = document.getElementById('chip-venue');
  const aboutEl = document.getElementById('home-about-text');

  if (titleEl) titleEl.textContent = data.home.hero?.title || 'Kum. Sahana Kumar';
  if (eyebrowEl) eyebrowEl.textContent = data.home.hero?.eyebrow || 'Paramacharya School of Music';
  if (subEl) subEl.textContent = data.home.hero?.subtitle || '';
  if (dateEl) dateEl.innerHTML = `<span style="color:var(--accent);">📅</span> Date: ${data.site.date}`;
  if (timeEl) timeEl.innerHTML = `<span style="color:var(--accent);">⏰</span> Time: ${data.site.time}`;
  if (venueEl) venueEl.innerHTML = `<span style="color:var(--accent);">📍</span> Venue: ${data.site.venue}`;
  if (aboutEl) aboutEl.textContent = data.home.about || '';
}

function renderProgramPage(data) {
  if (!data?.program) return;

  const subtitleEl = document.getElementById('program-page-subtitle');
  if (subtitleEl && data.program.subtitle) {
    subtitleEl.textContent = data.program.subtitle;
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.program-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const badge = item.querySelector('.program-item-badge')?.textContent || '';
        const title = item.querySelector('.program-art-title')?.textContent || '';
        
        if (filter === 'all') {
          item.style.display = 'grid';
        } else if (filter === 'Varnam' && badge.includes('Varnam')) {
          item.style.display = 'grid';
        } else if (filter === 'Invocatory' && badge.includes('Invocatory')) {
          item.style.display = 'grid';
        } else if (filter === 'Sub-Main' && (badge.includes('Sub-Main') || title.includes('Jnanamosagarada'))) {
          item.style.display = 'grid';
        } else if (filter === 'Keerthanam' && (badge.includes('Keerthanam') || badge.includes('Sub-Main'))) {
          item.style.display = 'grid';
        } else if (filter === 'Centerpiece' && (badge.includes('Main') || title.includes('Sarojadala'))) {
          item.style.display = 'grid';
        } else if (filter === 'Devotional' && (badge.includes('Devotional') || badge.includes('Thiruppavai') || badge.includes('Kavadi'))) {
          item.style.display = 'grid';
        } else if (filter === 'Thillana' && (badge.includes('Thillana') || badge.includes('Benediction'))) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function renderArtistsPage(data) {
  if (!data?.artists) return;
}

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
