#!/usr/bin/env node

/**
 * Generate static index.html from content.json.
 * Replaces the HTML between <!-- CMS:xxx --> ... <!-- /CMS:xxx --> markers
 * with markup rendered from the FR content (default locale, for SEO).
 * Also injects window.CMS_CONTENT (all locales) for client-side language switching.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_FILE = path.join(__dirname, '../content.json');
const HTML_FILE = path.join(__dirname, '../index.html');

const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
let html = fs.readFileSync(HTML_FILE, 'utf-8');

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function markdownToHtml(str) {
  if (!str) return '';
  return escapeHtml(str).trim().split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('\n');
}

function replaceBetween(source, marker, innerHtml) {
  const re = new RegExp(`(<!--\\s*CMS:${marker}\\s*-->)([\\s\\S]*?)(<!--\\s*/CMS:${marker}\\s*-->)`);
  if (!re.test(source)) {
    console.warn(`Warning: marker CMS:${marker} not found`);
    return source;
  }
  return source.replace(re, `$1\n${innerHtml}\n$3`);
}

// HERO
function renderHero(data) {
  if (!data) return '';
  return `<div class="hero-image" data-parallax="0.5">
    <img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}, ${escapeHtml(data.subtitle)}" loading="eager">
</div>
<div class="hero-content">
    <h1 class="hero-title">${escapeHtml(data.title)}</h1>
    <p class="hero-subtitle">${escapeHtml(data.subtitle)}</p>
    <p class="hero-description">${escapeHtml(data.description)}</p>
</div>`;
}

// ABOUT
function renderAbout(data) {
  if (!data) return '';
  return `<h2>${escapeHtml(data.title)}</h2>
<div class="about-grid">
    <div class="about-image fade-in-up">
        <img src="${escapeHtml(data.portrait_image)}" alt="${escapeHtml(data.title)}">
    </div>
    <div class="about-text fade-in-up">
        <p>${escapeHtml(data.biography_1)}</p>
        <p>${escapeHtml(data.biography_2)}</p>
    </div>
</div>`;
}

// GALLERY (not i18n)
function renderGallery(items) {
  return items.map(item => `<div class="gallery-item fade-in-up">
    <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy">
</div>`).join('\n');
}

// SKILLS
function renderSkills(items) {
  return items.map(item => `<div class="skill-card">
    <h3>${escapeHtml(item.title)}</h3>
    <p><strong>${escapeHtml(item.institution)}</strong></p>
    ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
    <p style="margin-top: 12px; font-size: 0.9rem; opacity: 0.7;">${escapeHtml(item.period)}</p>
    ${item.highlight_note ? `<p style="margin-top: 20px; font-size: 0.85rem; color: var(--brushed-gold); font-weight: 500;">${escapeHtml(item.highlight_note)}</p>` : ''}
</div>`).join('\n');
}

// EXPERIENCES (grouped by category)
function renderExperiences(items) {
  const categories = [];
  const byCategory = {};
  items.forEach(item => {
    if (!byCategory[item.category]) {
      byCategory[item.category] = [];
      categories.push(item.category);
    }
    byCategory[item.category].push(item);
  });

  return categories.map(category => `<div class="exp-category">
    <h3 class="exp-category-title">${escapeHtml(category)}</h3>
    <div class="exp-timeline">
        ${byCategory[category].map(item => `<div class="exp-item fade-in-up">
            <div class="exp-content">
                <h4>${escapeHtml(item.title)}</h4>
                ${item.institution ? `<p class="exp-institution">${escapeHtml(item.institution)}</p>` : ''}
                <p class="exp-period">${escapeHtml(item.period)}</p>
                <p class="exp-description">${escapeHtml(item.description)}</p>
                ${item.video_link ? `<p><a href="${escapeHtml(item.video_link)}" target="_blank">Voir la vidéo</a></p>` : ''}
            </div>
        </div>`).join('\n')}
    </div>
</div>`).join('\n');
}

// SERVICES
function renderServices(items) {
  return items.map(item => `<div class="service-card fade-in-up">
    <h3>${escapeHtml(item.title)}</h3>
    <p class="service-audience">${escapeHtml(item.audience)}</p>
    <p class="service-description">${escapeHtml(item.description)}</p>
    <a href="#contact" class="service-cta">Discuter de ce projet</a>
</div>`).join('\n');
}

// EVENTS
function renderEvents(items) {
  if (items.length === 0) {
    return '<p style="text-align: center; grid-column: 1/-1; color: #999;">Aucun événement prévu pour le moment.</p>';
  }
  return items.map(item => `<div class="event-card">
    ${item.image ? `<div class="event-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"></div>` : ''}
    <div class="event-content">
        <span class="event-date">${escapeHtml(item.date)}</span>
        <h3 class="event-title">${escapeHtml(item.title)}</h3>
        <p class="event-description">${escapeHtml(item.description)}</p>
        ${item.link ? `<a href="${escapeHtml(item.link)}" class="event-button">En savoir plus</a>` : ''}
    </div>
</div>`).join('\n');
}

// TESTIMONIALS
function renderTestimonials(items) {
  return items.map(item => `<div class="testimonial-card">
    <p class="testimonial-text">« ${escapeHtml(item.text)} »</p>
    <p class="testimonial-author">— ${escapeHtml(item.author)}${item.role ? `, ${escapeHtml(item.role)}` : ''}</p>
</div>`).join('\n');
}

// CONTACT
function renderContactHeader(data) {
  if (!data) return '';
  return `<h2>${escapeHtml(data.title)}</h2>
<p class="section-lead">${markdownToHtml(data.description)}</p>`;
}

const SOCIAL_ICONS = {
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
};

function renderContactInfo(data) {
  if (!data) return '';
  const socialLinks = (data.social_links || []).map(link => `<a href="${escapeHtml(link.url)}" class="social-link" aria-label="${escapeHtml(link.platform)}" target="_blank">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${SOCIAL_ICONS[link.platform] || ''}</svg>
</a>`).join('\n');

  return `<div class="contact-info-item">
    <span class="contact-label">Email</span>
    <a href="mailto:${escapeHtml(data.email)}" class="contact-value">${escapeHtml(data.email)}</a>
</div>
${data.whatsapp ? `<div class="contact-info-item">
    <span class="contact-label">Cliquer sur le numéro pour me contacter via WhatsApp</span>
    <a href="https://wa.me/${escapeHtml(data.whatsapp.replace(/\D/g, ''))}" class="contact-value" target="_blank">${escapeHtml(data.whatsapp)}</a>
</div>` : ''}
<div class="contact-info-item">
    <span class="contact-label">Réseaux</span>
    <div class="social-links">
        ${socialLinks}
    </div>
</div>`;
}

// --- Apply replacements (default locale: fr) ---
html = replaceBetween(html, 'hero', renderHero(content.hero.fr));
html = replaceBetween(html, 'about', renderAbout(content.about.fr));
html = replaceBetween(html, 'gallery', renderGallery(content.gallery));
html = replaceBetween(html, 'skills', renderSkills(content.skills.fr));
html = replaceBetween(html, 'experiences', renderExperiences(content.experiences.fr));
html = replaceBetween(html, 'services', renderServices(content.services.fr));
html = replaceBetween(html, 'events', renderEvents(content.events.fr));
html = replaceBetween(html, 'testimonials', renderTestimonials(content.testimonials.fr));
html = replaceBetween(html, 'contact-header', renderContactHeader(content.contact.fr));
html = replaceBetween(html, 'contact-info', renderContactInfo(content.contact.fr));

// --- Meta ---
const metaHtml = `<title>${escapeHtml(content.settings.site_title)}</title>
<meta name="description" content="${escapeHtml(content.settings.site_description)}">`;
html = replaceBetween(html, 'meta', metaHtml);

// --- Inject CMS_CONTENT for client-side language switching ---
const cmsContentScript = `<script>window.CMS_CONTENT = ${JSON.stringify(content)};</script>`;
html = replaceBetween(html, 'DATA', cmsContentScript);

fs.writeFileSync(HTML_FILE, html);
console.log('index.html generated from content.json');
