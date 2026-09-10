#!/usr/bin/env node

/**
 * Build script - Compile YAML content files to JSON
 * Reads content/{collection}/{locale}/{slug}.yml for i18n folder collections
 * and content/{collection}/{slug}.yml for non-i18n folder collections.
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const CONTENT_DIR = path.join(__dirname, '../content');
const OUTPUT_FILE = path.join(__dirname, '../content.json');
const LOCALES = ['fr', 'en', 'de'];

const I18N_SINGLETONS = ['hero', 'about', 'contact'];
const I18N_LISTS = ['skills', 'videos', 'experiences', 'services', 'events', 'testimonials'];

function readYamlFile(filePath) {
  return YAML.parse(fs.readFileSync(filePath, 'utf-8'));
}

function readI18nSingleton(collection) {
  const result = {};
  LOCALES.forEach(locale => {
    const dir = path.join(CONTENT_DIR, collection, locale);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml'));
    if (files.length === 0) return;
    try {
      result[locale] = readYamlFile(path.join(dir, files[0]));
    } catch (e) {
      console.warn(`Warning: Could not read ${collection}/${locale}/${files[0]}`, e.message);
    }
  });
  return result;
}

function readI18nList(collection) {
  const result = {};
  LOCALES.forEach(locale => {
    result[locale] = [];
    const dir = path.join(CONTENT_DIR, collection, locale);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml')).sort();
    files.forEach(file => {
      try {
        const data = readYamlFile(path.join(dir, file));
        data.id = file.replace('.yml', '');
        result[locale].push(data);
      } catch (e) {
        console.warn(`Warning: Could not read ${collection}/${locale}/${file}`, e.message);
      }
    });
  });
  return result;
}

function readGallery() {
  const dir = path.join(CONTENT_DIR, 'gallery');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml')).sort();
  return files.map(file => {
    try {
      const data = readYamlFile(path.join(dir, file));
      data.id = file.replace('.yml', '');
      return data;
    } catch (e) {
      console.warn(`Warning: Could not read gallery/${file}`, e.message);
      return null;
    }
  }).filter(Boolean);
}

function collectContent() {
  const content = { settings: {}, gallery: [] };

  try {
    const settingsPath = path.join(CONTENT_DIR, 'settings.yml');
    if (fs.existsSync(settingsPath)) {
      content.settings = readYamlFile(settingsPath);
    }
  } catch (e) {
    console.warn('Warning: Could not read settings.yml', e.message);
  }

  content.gallery = readGallery();

  I18N_SINGLETONS.forEach(collection => {
    content[collection] = readI18nSingleton(collection);
  });

  I18N_LISTS.forEach(collection => {
    content[collection] = readI18nList(collection);
  });

  return content;
}

function build() {
  console.log('Building content...');

  try {
    const content = collectContent();
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
    console.log(`Built successfully: ${OUTPUT_FILE}`);
    console.log(`   - Settings: ${Object.keys(content.settings).length} fields`);
    console.log(`   - Hero: ${Object.keys(content.hero).length} languages`);
    console.log(`   - About: ${Object.keys(content.about).length} languages`);
    console.log(`   - Gallery: ${content.gallery.length} images`);
    console.log(`   - Skills (fr): ${content.skills.fr.length} items`);
    console.log(`   - Experiences (fr): ${content.experiences.fr.length} items`);
    console.log(`   - Services (fr): ${content.services.fr.length} items`);
    console.log(`   - Events (fr): ${content.events.fr.length} items`);
    console.log(`   - Testimonials (fr): ${content.testimonials.fr.length} items`);
    console.log(`   - Videos (fr): ${content.videos.fr.length} items`);
    console.log(`   - Contact: ${Object.keys(content.contact).length} languages`);
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();
