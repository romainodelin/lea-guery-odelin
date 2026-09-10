#!/usr/bin/env node

/**
 * Build script - Compile YAML content files to JSON
 * Transforms content/*/fr.yml to a single content.json used by the site
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const CONTENT_DIR = path.join(__dirname, '../content');
const OUTPUT_FILE = path.join(__dirname, '../content.json');

function collectContent() {
  const content = {
    settings: {},
    about: {},
    services: [],
    skills: [],
    experiences: [],
    gallery: [],
    videos: [],
    testimonials: [],
    contact: {},
    blog: []
  };

  // Read settings
  try {
    const settingsPath = path.join(CONTENT_DIR, 'settings.yml');
    if (fs.existsSync(settingsPath)) {
      content.settings = YAML.parse(fs.readFileSync(settingsPath, 'utf-8'));
    }
  } catch (e) {
    console.warn('Warning: Could not read settings.yml', e.message);
  }

  // Read localized content (FR, EN, DE)
  ['fr', 'en', 'de'].forEach(locale => {
    // About
    try {
      const aboutPath = path.join(CONTENT_DIR, 'about', `${locale}.yml`);
      if (fs.existsSync(aboutPath)) {
        if (!content.about[locale]) content.about[locale] = {};
        content.about[locale] = YAML.parse(fs.readFileSync(aboutPath, 'utf-8'));
      }
    } catch (e) {
      console.warn(`Warning: Could not read about/${locale}.yml`, e.message);
    }

    // Contact
    try {
      const contactPath = path.join(CONTENT_DIR, 'contact', `${locale}.yml`);
      if (fs.existsSync(contactPath)) {
        if (!content.contact[locale]) content.contact[locale] = {};
        content.contact[locale] = YAML.parse(fs.readFileSync(contactPath, 'utf-8'));
      }
    } catch (e) {
      console.warn(`Warning: Could not read contact/${locale}.yml`, e.message);
    }
  });

  // Read collections (services, skills, experiences, gallery, videos, testimonials, blog)
  const collections = ['services', 'skills', 'experiences', 'gallery', 'videos', 'testimonials', 'blog'];

  collections.forEach(collection => {
    const collectionPath = path.join(CONTENT_DIR, collection);
    if (!fs.existsSync(collectionPath)) return;

    const files = fs.readdirSync(collectionPath);
    files.forEach(file => {
      if (!file.endsWith('.yml')) return;

      try {
        const filePath = path.join(collectionPath, file);
        const data = YAML.parse(fs.readFileSync(filePath, 'utf-8'));
        data.id = file.replace('.yml', '');
        content[collection].push(data);
      } catch (e) {
        console.warn(`Warning: Could not read ${collection}/${file}`, e.message);
      }
    });
  });

  return content;
}

function build() {
  console.log('🔨 Building content...');

  try {
    const content = collectContent();
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
    console.log(`✅ Built successfully: ${OUTPUT_FILE}`);
    console.log(`   - Settings: ${Object.keys(content.settings).length} fields`);
    console.log(`   - About: ${Object.keys(content.about).length} languages`);
    console.log(`   - Services: ${content.services.length} items`);
    console.log(`   - Skills: ${content.skills.length} items`);
    console.log(`   - Experiences: ${content.experiences.length} items`);
    console.log(`   - Gallery: ${content.gallery.length} images`);
    console.log(`   - Videos: ${content.videos.length} videos`);
    console.log(`   - Testimonials: ${content.testimonials.length} items`);
    console.log(`   - Blog: ${content.blog.length} articles`);
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
