# Site Internet Léa Guéry-Odelin - Documentation Complète

**Date d'analyse:** 10 septembre 2026  
**Dernière mise à jour en ligne:** 6 février 2026  
**URL en production:** https://lea-guery-odelin.web.app  
**Projet GCP:** site-lea-484923 (Firebase Hosting)

---

## 📋 RÉSUMÉ EXÉCUTIF

Site **statique** d'une harpiste professionnelle (Léa Guéry-Odelin). Déployé sur Firebase Hosting, ~3160 lignes d'HTML avec CSS/JS intégrés. Support multilingue (FR/EN/DE), système de contact via EmailJS, galerie d'images et portail d'informations artistiques.

**État global:** ~75% complet. Fonctionnel mais avec des améliorations nécessaires.

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack Technologique
- **Hosting:** Firebase Hosting (Google Cloud)
- **Type:** Static HTML/CSS/JavaScript (SPA-like)
- **Build:** Aucun build system (HTML monolithique)
- **Frameworks:** Aucun (vanilla JS)
- **CSS:** Intégré en `<style>` (pas de fichiers externes)
- **JavaScript:** Intégré en `<script>` (pas de bundler)
- **Contact:** EmailJS (CDN `emailjs.init('6RN2yF7qMAx5LbXHF')`)
- **Polices:** Google Fonts (Cormorant Garamond, Montserrat)

### Répertoire Déployé

```
.
├── index.html                      (3161 lignes - page principale)
├── __/firebase/
│   ├── init.js                     (config Firebase auto-générée)
│   └── init.json                   (clés API Firebase)
└── DB/
    ├── Effe1-navbar.txt            (variante design navbar #1)
    ├── Effe2-navbar.txt            (variante design navbar #2)
    ├── Effe3-navbar.txt            (variante design navbar #3)
    ├── Images/                     (15 JPG ~200-500KB chacun)
    │   ├── image1.jpg ... image15.jpg
    ├── Logo_traductions/           (logos traduits)
    │   ├── fr.webp                 (FR logo)
    │   ├── en.png                  (EN logo)
    │   └── de.avif                 (DE logo)
    ├── Lea-Guery.jpg               (portrait professionnel, 122KB)
    ├── victor-serban-0fl9EOrYgb8-unsplash.jpg (hero image, 4.1MB)
    ├── Test_atlas_map_vienne.html  (carte interactive test)
    └── Ressources_transmises_par_bobo.txt (liste vidéos YouTube + liens)

Taille totale: ~8.3MB
```

---

## ✅ FONCTIONNALITÉS PRÉSENTES

### 1. **Navigation & Structure**
- ✅ Header responsive avec burger menu mobile
- ✅ Navigation fixe/sticky
- ✅ Liens d'ancrage internes (#hero, #about, #gallery, etc.)
- ✅ Trois variantes de design navbar en fichier (non implémentées, cf. TODO)

### 2. **Sections du Site**
1. **Hero (`#hero`)** - Présentation + image grand format
2. **À propos (`#about`)** - Présentation artistique de Léa
3. **Galerie (`#gallery`)** - 15 images organisées en grille
4. **Formation (`#skills`)** - Diplômes & certifications
5. **Vidéos (`#videos`)** - ACTUELLEMENT CACHÉE (`display: none`)
6. **Parcours (`#experiences`)** - Timeline artistique
7. **Services (`#services`)** - Domaines d'intervention (mariages, événements, etc.)
8. **Projets (`#events`)** - Événements en cours
9. **Testimonials (`#testimonials`)** - Reconnaissances & références
10. **Contact (`#contact`)** - Formulaire de contact

### 3. **Multilingue (i18n)**
- ✅ Support **3 langues:** FR, EN, DE
- ✅ Sélecteur de langue dans la navbar
- ✅ Traductions des titres de sections
- ✅ LocalStorage pour persister le choix de langue

### 4. **Système de Contact**
- ✅ Formulaire (nom, email, message)
- ✅ Intégration EmailJS
- ✅ Envoi d'emails vers `bureau@lecresvb.fr` (présumé - à vérifier)
- ✅ Message de succès/erreur affiché

### 5. **Design & Styles**
- ✅ **Palette luxe:** Crème, or brossé, charbon (thème chaud)
- ✅ **Dark mode:** Support complet (--dark-bg, --dark-text, etc.)
- ✅ **Responsive:** Mobile-first avec breakpoints
- ✅ **Animations:** Fade-in, scroll-reveal, transitions fluides
- ✅ **Polices:** Serif elegant (Cormorant) + sans-serif modern (Montserrat)

### 6. **Média**
- ✅ **15 images** haute résolution (~200-500KB)
- ✅ **Portrait professionnel** + photo hero 4.1MB
- ✅ **Logos traduits** (FR webp, EN png, DE avif)
- ✅ **Galerie optimisée** pour mobile/desktop

---

## ⚠️ PROBLÈMES & LIMITATIONS IDENTIFIÉS

### 1. **Section Vidéos Cachée**
- `#videos` en `display: none` - non accessible
- Les vidéos YouTube mentionnées dans `Ressources_transmises_par_bobo.txt` ne sont **pas intégrées**
- Videos listées dans le fichier ressources:
  - Concerto harpe & flûte: https://youtu.be/ZM6pDUB3jB0
  - Solo "Pour le tombeau d'Orphee": https://youtu.be/Hvl3M7Sz7g4
  - Duo AishaE & Léa: https://youtu.be/cGoyVhxOSCQ?si=zy3SV0_CmhevvdJi
  - Autres shorts YouTube

### 2. **Manque de Contenu Textuel**
- Descriptions minimales dans les sections about/services/experiences
- Pas de descriptions pour les images de galerie
- Besoin de contenu détaillé pour chaque section

### 3. **Fichiers de Navbar Non Utilisés**
- `Effe1-navbar.txt`, `Effe2-navbar.txt`, `Effe3-navbar.txt` - jamais appelés dans l'HTML
- Contiennent du code HTML/CSS/JS pour 3 designs navbars différents
- À décider : **garder ou supprimer?**

### 4. **Optimisation de la Image Hero**
- `victor-serban-0fl9EOrYgb8-unsplash.jpg` = **4.1MB** (trop volumineux!)
- À compresser/optimiser ou remplacer par une version plus légère

### 5. **Firebase Config Exposée**
- `__/firebase/init.json` contient la clé API publique (normal pour client web)
- Vérifier que le projet Firebase n'a pas d'accès base de données/auth non sécurisé

### 6. **Pas de Source Code Backup**
- Aucun `.git` local
- Aucun `package.json` / config de build
- Code monolithique 3160 lignes d'HTML - risqué pour maintenance
- **Recommandation:** créer un repo GitHub

### 7. **Pas de SEO/Meta**
- Title & description présents mais minimalistes
- Pas de Open Graph tags (pour partage social)
- Pas de structured data (schema.org)
- Pas de sitemap.xml

### 8. **Pas de Monitoring/Analytics**
- Aucun Google Analytics
- Aucun tracking de conversions/formulaires
- Impossible de mesurer le trafic

### 9. **Intégration Externe Incomplète**
- Lien LMN (Live Music Now) dans `Ressources_transmises_par_bobo.txt` - non affiché sur le site
- Possibilité de lier les réseaux sociaux (LinkedIn, Instagram, etc.) - absente

### 10. **Pas de Mobile App / PWA**
- Aucun service worker
- Aucun manifest.json
- Non installable en tant que PWA

---

## 🎯 TODO - Travail Restant (Priorisé)

### 🔴 **HAUTE PRIORITÉ** (Bloquant)

#### 1. Décommenter & Intégrer les Vidéos
```html
<!-- Actuellement: <section id="videos" style="display: none;"> -->
<!-- À faire: Retirer display: none et intégrer les 4 vidéos YouTube -->
```
- [ ] Retirer `display: none` de `#videos`
- [ ] Intégrer les 4 vidéos YouTube via iframes
- [ ] Ajouter descriptions/contexte pour chaque vidéo
- [ ] Tester responsive sur mobile

#### 2. Compresser Image Hero (4.1MB → ~500KB)
```bash
# Utiliser ImageMagick ou WebP
convert victor-serban-0fl9EOrYgb8-unsplash.jpg -quality 85 victor-serban-optimized.webp
```
- [ ] Créer version WebP (85% quality, ~500KB)
- [ ] Créer fallback JPG compressé
- [ ] Tester temps de chargement

#### 3. Ajouter Contenu Textuel Détaillé
- [ ] Remplir section "À propos" (bio complète)
- [ ] Détailler "Parcours Artistique" avec dates/événements
- [ ] Décrire les 3-4 "Domaines d'Intervention"
- [ ] Documenter chaque image de galerie (lieu, date, contexte)

#### 4. Créer Repo GitHub
```bash
git init
git remote add origin <repo-url>
git add .
git commit -m "Initial commit: Léa Guéry-Odelin harpiste website"
```
- [ ] Initialiser git local
- [ ] Créer `.gitignore`
- [ ] Push sur GitHub (public ou private)
- [ ] Mettre à jour `firebase.json` pour CI/CD

#### 5. Décider des Fichiers "Effe*"
- [ ] Analyser Effe1/2/3 designs navbar
- [ ] Choisir le meilleur design
- [ ] Intégrer en remplacement de la navbar actuelle
- [ ] Supprimer les fichiers non utilisés

### 🟡 **PRIORITÉ MOYENNE** (Améliorations)

#### 6. Ajouter SEO/Meta
- [ ] Open Graph tags (og:title, og:image, og:description)
- [ ] Meta description complète (160 caractères)
- [ ] Favicon `.ico` / Apple Touch Icon
- [ ] Canonical URL
- [ ] `robots.txt` + `sitemap.xml`

#### 7. Google Analytics
- [ ] Ajouter tracking ID Google Analytics 4
- [ ] Tracker événement "Contact form submitted"
- [ ] Tracker pageviews par langue
- [ ] Dasboard de suivi du trafic

#### 8. Intégrer Réseaux Sociaux
- [ ] Ajouter liens Instagram/LinkedIn/YouTube
- [ ] Social share buttons pour chaque section
- [ ] Embed Instagram feed (optionnel)

#### 9. Ajouter Formulaire de Newsletter
- [ ] Newsletter signup (Mailchimp/Brevo)
- [ ] Double opt-in flow
- [ ] Analytics abonnements

#### 10. PWA / Offline Support
- [ ] Créer `service-worker.js`
- [ ] Créer `manifest.json`
- [ ] Icons 192x192 + 512x512
- [ ] Test offline mode

### 🟢 **PRIORITÉ BASSE** (Nice-to-have)

#### 11. Optimiser Galerie
- [ ] Lazy loading des images
- [ ] Lightbox modal pour chaque image
- [ ] Filter par catégorie (portraits, performances, etc.)

#### 12. Blog / News
- [ ] Section blog pour actualités
- [ ] Articles sur l'histoire des différents projets
- [ ] Flux RSS

#### 13. Booking / Calendar
- [ ] Intégrer Calendly pour disponibilités
- [ ] Système de demande de devis (form → PDF)

#### 14. Accessibilité (WCAG 2.1 AA)
- [ ] Vérifier contraste des couleurs
- [ ] Ajouter `aria-labels`
- [ ] Tester avec lecteur d'écran
- [ ] Tester navigation au clavier

#### 15. Performance
- [ ] Audit Lighthouse (PageSpeed)
- [ ] Minifier CSS/JS
- [ ] HTTP caching headers
- [ ] CDN pour images (CloudFlare)

---

## 📊 ÉTAT DES SECTIONS

| Section | État | Contenu | Responsive | Notes |
|---------|------|---------|-----------|-------|
| Hero | ✅ Complet | Titre + image | ✅ Oui | Image à optimiser (4.1MB) |
| About | ⚠️ Partiel | Bio minimaliste | ✅ Oui | À remplir avec détails |
| Gallery | ✅ Complet | 15 images | ✅ Oui | Bien organisé, manque descriptions |
| Skills | ✅ Complet | Diplômes listés | ✅ Oui | Format correct |
| Videos | ❌ Caché | Non implémenté | ❓ Non testé | **À décommenter & intégrer** |
| Experiences | ⚠️ Partiel | Structure OK | ✅ Oui | Contenu à enrichir |
| Services | ⚠️ Partiel | 3-4 items | ✅ Oui | À détailler |
| Events | ⚠️ Partiel | Grid vide? | ✅ Oui | Dépend si y a données |
| Testimonials | ⚠️ Partiel | Quelques refs | ✅ Oui | À augmenter |
| Contact | ✅ Complet | Formulaire | ✅ Oui | EmailJS configuré |
| Nav | ✅ Complet | 3 langues | ✅ Oui | Variantes design non utilisées |
| Dark Mode | ✅ Complet | CSS variables | ✅ Oui | Fonctionnel |

---

## 🚀 ÉTAPES SUIVANTES (Dans L'Ordre)

1. **Immédiatement:**
   - [ ] Décommenter `#videos`, intégrer 4 vidéos YouTube
   - [ ] Compresser `victor-serban-*.jpg` de 4.1MB → 500KB

2. **Cette semaine:**
   - [ ] Remplir contenu textuel (about, services, experiences)
   - [ ] Créer repo GitHub avec `.gitignore`
   - [ ] Ajouter SEO meta tags

3. **Prochain déploiement:**
   - [ ] Analyser & décider des navbars Effe1/2/3
   - [ ] Google Analytics setup
   - [ ] Test Lighthouse audit

4. **Maintenance long terme:**
   - [ ] Accessibility audit
   - [ ] Blog/news section
   - [ ] PWA migration

---

## 📞 CONTACT & METADATA

| Clé | Valeur |
|-----|--------|
| **Email** | `bureau@lecresvb.fr` (présumé - à confirmer) |
| **Site** | https://lea-guery-odelin.web.app |
| **Projet GCP** | site-lea-484923 |
| **Dernière mise à jour** | 2026-02-06 16:36:58 UTC |
| **Déployeur** | firebase-cli (romainodelin@gmail.com) |
| **Multilingue** | FR / EN / DE |
| **Stack** | Firebase Hosting + Vanilla HTML/CSS/JS |

---

## ⚙️ COMMANDES UTILES

### Déployer une mise à jour (local)
```bash
# Si firebase-cli est installé
firebase deploy --project site-lea-484923
```

### Éditer localement
```bash
cd ~/Documents/Site\ internet\ lea
# Éditer index.html dans ton éditeur préféré
# Test local: python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Compresser images
```bash
# Hero image: 4.1MB → ~500KB
convert DB/victor-serban-0fl9EOrYgb8-unsplash.jpg -quality 85 DB/victor-serban-optimized.webp

# Batch resize galerie
for f in DB/Images/image*.jpg; do
  convert "$f" -quality 90 -resize 1200x1200 "$f"
done
```

### Créer structure git
```bash
git init
echo ".DS_Store" > .gitignore
echo "node_modules/" >> .gitignore
echo "firebase.json" >> .gitignore
git add .
git commit -m "Initial: Léa Guéry-Odelin harpiste website"
```

---

## 🎨 DESIGN NOTES

- **Palette:** Crème/Or/Charbon (luxe chaleureux)
- **Typographie:** Serif elegant pour titres (Cormorant), sans-serif moderne pour texte (Montserrat)
- **Spacing:** 240px 80px par section (généreux)
- **Animations:** Fade-in smooth, no jarring transitions
- **Dark mode:** Complet via CSS variables (--dark-bg, --dark-text, etc.)
- **Breakpoints:** Mobile-first responsive

---

**Fin de documentation. Version 1.0 — 2026-09-10**
