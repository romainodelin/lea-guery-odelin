# Guide d'Intégration CMS → Site HTML

## 🔄 Architecture

Actuellement :
```
index.html → Statique HTML
```

Après CMS :
```
content.yml → content.json → index.html (charge dynamiquement)
```

## 📋 Étapes d'Intégration

### Phase 1 : Configuration Decap CMS
✅ **DÉJÀ FAIT**
- `/admin/index.html` créé
- `/admin/config.yml` configuré
- Structure de contenu prête
- GitHub Actions setup

### Phase 2 : Modifier index.html pour charger content.json
⏳ **À FAIRE** (optionnel pour maintenance future)

Ajouter à `index.html` (après la balise `</body>`) :

```html
<script>
// Charger le contenu depuis content.json
fetch('./content.json')
  .then(response => response.json())
  .then(content => {
    // À PROPOS
    if (content.about.fr) {
      const about = content.about.fr;
      document.querySelector('#about-title').textContent = about.title || 'À Propos';
      document.querySelector('#about-bio').innerHTML = marked(about.biography);
      document.querySelector('#about-portrait').src = about.portrait_image;
    }
    
    // SERVICES
    const servicesContainer = document.querySelector('#services-list');
    if (content.services && servicesContainer) {
      content.services.forEach(service => {
        const serviceHTML = `
          <div class="service-card">
            <h3>${service.icon} ${service.title}</h3>
            <p>${service.description}</p>
          </div>
        `;
        servicesContainer.insertAdjacentHTML('beforeend', serviceHTML);
      });
    }
    
    // GALERIE
    const galleryContainer = document.querySelector('#gallery-grid');
    if (content.gallery && galleryContainer) {
      content.gallery.forEach(image => {
        const imgHTML = `
          <div class="gallery-item">
            <img src="${image.image}" alt="${image.title}" loading="lazy">
            <p>${image.title}</p>
          </div>
        `;
        galleryContainer.insertAdjacentHTML('beforeend', imgHTML);
      });
    }
    
    // VIDÉOS
    const videosContainer = document.querySelector('#videos-list');
    if (content.videos && videosContainer) {
      content.videos.forEach(video => {
        const videoId = extractYoutubeId(video.youtube_url);
        const videoHTML = `
          <div class="video-item">
            <iframe 
              width="100%" 
              height="300" 
              src="https://www.youtube.com/embed/${videoId}"
              allowfullscreen>
            </iframe>
            <h4>${video.title}</h4>
          </div>
        `;
        videosContainer.insertAdjacentHTML('beforeend', videoHTML);
      });
    }
  })
  .catch(error => console.error('Erreur chargement contenu:', error));

// Utilitaires
function extractYoutubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
  return match ? match[1] : url;
}
</script>

<!-- Charger la librairie markdown (optional) -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### Phase 3 : Déployer & Tester

```bash
# Builder le contenu
npm run build

# Tester localement
npm run dev

# Vérifier que content.json est créé
cat content.json | head -20
```

---

## 🎯 Stratégies d'Intégration

### Option A : Chargement Dynamique (JavaScript)
- ✅ Plus flexible
- ✅ Mise à jour sans rebuild HTML
- ✅ SEO moins bon (contenu chargé côté client)
- 🕐 Plus lent au premier chargement

### Option B : Génération Statique (Build-time)
- ✅ Meilleur SEO
- ✅ Plus rapide
- ✅ Pas de JS nécessaire
- ❌ Rebuild HTML à chaque changement

**Recommandation :** Option B (génération statique) pour meilleur SEO

---

## 🔧 Pour les Développeurs : Implémenter Option B

### Créer un générateur HTML

Fichier : `scripts/generate-html.js`

```javascript
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

// Charger content.json
const content = JSON.parse(fs.readFileSync('./content.json', 'utf-8'));

// Template pour About
const aboutTemplate = `
<section id="about">
  <h2>${content.about.fr.title}</h2>
  <div class="about-content">
    <img src="${content.about.fr.portrait_image}" alt="Portrait">
    <div>${content.about.fr.biography}</div>
  </div>
</section>
`;

// Générer le HTML complet
// ...
```

### Ajouter au build

Dans `package.json` :

```json
{
  "scripts": {
    "build": "node scripts/build.js && node scripts/generate-html.js"
  }
}
```

---

## ✅ Checklist pour Productivité

- [ ] CMS fonctionnel (Léa peut éditer)
- [ ] Contenu initial créé (services, about, etc.)
- [ ] GitHub Actions déploie correctement
- [ ] Test : modifier 1 service, vérifier sur site en live
- [ ] Documentation complète pour Léa
- [ ] **OPTIONNEL :** Intégration dynamique/statique

---

## 🚀 Roadmap Future

1. **Court terme :** Léa gère le contenu via CMS
2. **Moyen terme :** Dynamiser les sections avec content.json
3. **Long terme :** Blog, calendrier booking, PWA

---

**Guide créé :** 10 septembre 2026
