#!/usr/bin/env node

/**
 * One-time / on-demand import: pulls the real Experiences and Events data
 * from Léa's public Google Sheet and writes it into content/experiences
 * and content/events as CMS-managed YAML, replacing what's there.
 *
 * Re-run this any time the Google Sheet changes and you want the CMS
 * (and therefore the site, after `npm run build`) to reflect it.
 *
 * Usage: node scripts/import-from-sheets.js
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const SPREADSHEET_ID = '1-ykF9j2iu1By8OL_WecmUN7JER_8zRbeB8w3V45zl8s';
const EXPERIENCES_GID = '0';
const EVENTS_GID = '567525720';
const LOCALES = ['fr', 'en', 'de'];
const CONTENT_DIR = path.join(__dirname, '../content');

async function fetchCsv(gid) {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet gid=${gid}: ${res.status}`);
  return res.text();
}

// RFC4180-ish CSV parser (handles quoted fields, embedded commas/newlines, "" escapes)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\r') { /* skip */ }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function slugify(str) {
  return (str || 'entry')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'entry';
}

function isUrl(str) {
  return !!str && /^https?:\/\//i.test(str.trim());
}

function writeYaml(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, YAML.stringify(data));
}

function clearDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

async function importExperiences() {
  const csv = await fetchCsv(EXPERIENCES_GID);
  const rows = parseCsv(csv).slice(1); // drop header
  const dataRows = rows.filter(r => r.some(cell => cell && cell.trim()));

  // Group consecutive rows into clusters of up to 3 (one per language)
  const clusters = [];
  let current = [];
  dataRows.forEach(r => {
    current.push(r);
    if (current.length === 3) { clusters.push(current); current = []; }
  });
  if (current.length) clusters.push(current);

  LOCALES.forEach(locale => clearDir(path.join(CONTENT_DIR, 'experiences', locale)));

  let count = 0;
  clusters.forEach((cluster, idx) => {
    const byLang = {};
    cluster.forEach(r => {
      const langue = (r[6] || '').trim().toUpperCase();
      const locale = { FR: 'fr', EN: 'en', DE: 'de' }[langue];
      if (locale) byLang[locale] = r;
    });
    if (Object.keys(byLang).length === 0) return;

    count++;
    const prefix = String(count).padStart(2, '0');
    const primary = byLang.fr || byLang.en || byLang.de;
    const slug = `${prefix}-${slugify(primary[3])}`;

    LOCALES.forEach(locale => {
      const r = byLang[locale] || primary; // fall back to whatever language exists
      const period = (r[2] || '').trim();
      const videoLink = isUrl(r[5]) ? r[5].trim() : '';
      const image = isUrl(r[7]) ? r[7].trim() : '';
      writeYaml(path.join(CONTENT_DIR, 'experiences', locale, `${slug}.yml`), {
        category: (r[0] || '').trim(),
        title: (r[3] || '').trim(),
        institution: '',
        period,
        description: (r[4] || '').trim(),
        video_link: videoLink,
        image,
      });
    });
  });

  console.log(`Experiences imported: ${count} entries x 3 locales`);
}

async function importEvents() {
  const csv = await fetchCsv(EVENTS_GID);
  const rows = parseCsv(csv).slice(1); // drop header

  clearDir(path.join(CONTENT_DIR, 'events', 'fr'));

  // Only FR rows have clean, complete data in the sheet today.
  // EN/DE rows are placeholders ("ALLEMAND", empty) - skipped, not imported.
  const frRows = rows.filter(r => {
    const langue = (r[5] || '').trim().toUpperCase();
    return langue === 'FR' && r[1] && r[1].trim();
  });

  let count = 0;
  frRows.forEach(r => {
    count++;
    const prefix = String(count).padStart(2, '0');
    const slug = `${prefix}-${slugify(r[1])}`;
    const link = isUrl(r[3]) ? r[3].trim() : '';
    const image = isUrl(r[4]) ? r[4].trim() : '';
    writeYaml(path.join(CONTENT_DIR, 'events', 'fr', `${slug}.yml`), {
      date: (r[0] || '').trim(),
      title: (r[1] || '').trim(),
      description: (r[2] || '').trim(),
      link,
      image,
    });
  });

  console.log(`Events imported: ${count} entries (FR only - EN/DE data in the sheet is incomplete, add via CMS)`);
}

(async () => {
  await importExperiences();
  await importEvents();
})().catch(err => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
