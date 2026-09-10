window.CMS_MANUAL_INIT = true;

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const config = {
  backend: isLocal
    ? { name: 'test-repo' }
    : {
        name: 'github',
        repo: 'romaingueryodelin/lea-guery-odelin',
        branch: 'main',
        auth_endpoint: '/auth.html',
      },
  media_folder: 'DB/uploads',
  public_folder: '/DB/uploads',
  publish_mode: 'editorial_workflow',
  i18n: {
    structure: 'multiple_folders',
    locales: ['fr', 'en', 'de'],
    default_locale: 'fr',
  },
  collections: [
    {
      name: 'settings',
      label: 'Paramètres du Site',
      files: [{
        name: 'general',
        label: 'Informations Générales',
        file: 'content/settings.yml',
        fields: [
          { label: 'Titre du site', name: 'site_title', widget: 'string' },
          { label: 'Description', name: 'site_description', widget: 'text' },
          { label: 'Email de contact', name: 'contact_email', widget: 'string' },
          { label: 'Logo (FR)', name: 'logo_fr', widget: 'image', required: false },
          { label: 'Logo (EN)', name: 'logo_en', widget: 'image', required: false },
          { label: 'Logo (DE)', name: 'logo_de', widget: 'image', required: false },
        ],
      }],
    },
    {
      name: 'hero',
      label: 'Accueil (Hero)',
      folder: 'content/hero',
      i18n: true,
      format: 'yml',
      create: false,
      fields: [
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'Sous-titre', name: 'subtitle', widget: 'string', i18n: true },
        { label: 'Description', name: 'description', widget: 'text', i18n: true },
        { label: 'Image de fond', name: 'image', widget: 'image' },
      ],
    },
    {
      name: 'about',
      label: 'À Propos',
      folder: 'content/about',
      i18n: true,
      format: 'yml',
      create: false,
      fields: [
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'Biographie - Paragraphe 1', name: 'biography_1', widget: 'text', i18n: true },
        { label: 'Biographie - Paragraphe 2', name: 'biography_2', widget: 'text', i18n: true },
        { label: 'Image Portrait', name: 'portrait_image', widget: 'image' },
      ],
    },
    {
      name: 'gallery',
      label: 'Galerie',
      folder: 'content/gallery',
      format: 'yml',
      create: true,
      fields: [
        { label: 'Image', name: 'image', widget: 'image' },
        { label: 'Texte alternatif', name: 'alt', widget: 'string' },
      ],
    },
    {
      name: 'skills',
      label: 'Formation & Certifications',
      folder: 'content/skills',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Diplôme/Certification', name: 'title', widget: 'string', i18n: true },
        { label: 'École/Institution', name: 'institution', widget: 'string' },
        { label: 'Période', name: 'period', widget: 'string' },
        { label: 'Note (optionnel)', name: 'highlight_note', widget: 'string', i18n: true, required: false },
        { label: 'Description (optionnel)', name: 'description', widget: 'text', i18n: true, required: false },
      ],
    },
    {
      name: 'videos',
      label: 'Vidéos',
      folder: 'content/videos',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'URL YouTube', name: 'youtube_url', widget: 'string', pattern: ['^https://youtu', 'Doit commencer par https://youtu'] },
        { label: 'Description', name: 'description', widget: 'markdown', i18n: true, required: false },
        { label: 'Type', name: 'type', widget: 'select', options: ['solo', 'collaboration', 'concert', 'masterclass', 'other'] },
      ],
    },
    {
      name: 'experiences',
      label: 'Parcours Artistique',
      folder: 'content/experiences',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Catégorie', name: 'category', widget: 'string', i18n: true },
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'Institution (optionnel)', name: 'institution', widget: 'string', required: false },
        { label: 'Période', name: 'period', widget: 'string' },
        { label: 'Description', name: 'description', widget: 'markdown', i18n: true },
        { label: 'Lien vidéo (optionnel)', name: 'video_link', widget: 'string', required: false },
        { label: 'Image (optionnel)', name: 'image', widget: 'image', required: false },
      ],
    },
    {
      name: 'services',
      label: 'Domaines d\'Intervention',
      folder: 'content/services',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Nom du service', name: 'title', widget: 'string', i18n: true },
        { label: 'Public', name: 'audience', widget: 'string', i18n: true },
        { label: 'Description', name: 'description', widget: 'markdown', i18n: true },
        { label: 'Tarifs (optionnel)', name: 'pricing', widget: 'string', required: false },
        { label: 'Icône/Emoji (optionnel)', name: 'icon', widget: 'string', required: false },
      ],
    },
    {
      name: 'events',
      label: 'Projets en Cours',
      folder: 'content/events',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Date', name: 'date', widget: 'string' },
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'Description', name: 'description', widget: 'markdown', i18n: true },
        { label: 'Lien (optionnel)', name: 'link', widget: 'string', required: false },
        { label: 'Image (optionnel)', name: 'image', widget: 'image', required: false },
      ],
    },
    {
      name: 'testimonials',
      label: 'Témoignages & Références',
      folder: 'content/testimonials',
      i18n: true,
      format: 'yml',
      create: true,
      fields: [
        { label: 'Auteur', name: 'author', widget: 'string' },
        { label: 'Rôle/Institution (optionnel)', name: 'role', widget: 'string', required: false },
        { label: 'Texte', name: 'text', widget: 'markdown', i18n: true },
      ],
    },
    {
      name: 'contact',
      label: 'Informations de Contact',
      folder: 'content/contact',
      i18n: true,
      format: 'yml',
      create: false,
      fields: [
        { label: 'Titre', name: 'title', widget: 'string', i18n: true },
        { label: 'Description', name: 'description', widget: 'markdown', i18n: true },
        { label: 'Email', name: 'email', widget: 'string' },
        { label: 'WhatsApp (optionnel)', name: 'whatsapp', widget: 'string', required: false },
        { label: 'Liens Réseaux', name: 'social_links', widget: 'list', required: false, fields: [
          { label: 'Plateforme', name: 'platform', widget: 'select', options: ['facebook', 'instagram', 'linkedin', 'youtube'] },
          { label: 'URL', name: 'url', widget: 'string' },
        ] },
      ],
    },
  ],
};

setTimeout(() => {
  if (window.CMS) {
    window.CMS.init({ config });
  }
}, 500);
