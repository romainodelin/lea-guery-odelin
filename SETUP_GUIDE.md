# Guide de Configuration du CMS Decap

## 🚀 Configuration Initiale

### Étape 1 : Créer un Repo GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Créez un repo `lea-guery-odelin`
3. Copiez l'URL du repo

### Étape 2 : Initialiser Git Localement

```bash
cd ~/Documents/Site\ internet\ lea

# Initialiser git
git init

# Ajouter remote
git remote add origin https://github.com/romaingueryodelin/lea-guery-odelin.git

# Premier commit
git add .
git commit -m "Initial commit: Léa Guéry-Odelin website with Decap CMS"

# Push
git branch -M main
git push -u origin main
```

### Étape 3 : Configurer Decap CMS pour GitHub

#### Option A : Utiliser Decap CMS Hosting (Recommandé)

1. Allez sur [app.decapcms.org](https://app.decapcms.org)
2. Authentifiez-vous avec GitHub
3. Cliquez "New Site"
4. Sélectionnez votre repo `lea-guery-odelin`
5. Attendez la synchronisation

**URL d'accès :**
```
https://lea-guery-odelin.decapcms.org/admin
```

#### Option B : Héberger sur Firebase (Configuration Manuelle)

Si vous préférez garder l'admin sur votre domaine Firebase :

1. Modifiez `/admin/config.yml` :

```yaml
backend:
  name: github
  repo: romaingueryodelin/lea-guery-odelin
  branch: main
  auth_endpoint: /auth.html
```

2. Créez `/auth.html` avec la configuration OAuth GitHub

3. Mettez à jour `/admin/index.html` pour désactiver Netlify Identity :

```html
<script>
  CMS_MANUAL_INIT = true;
  CMS.init();
</script>
```

### Étape 4 : Créer un GitHub Token Personnel (si utilisation manuelle)

1. Allez sur GitHub → Settings → Developer settings → Personal access tokens
2. Générez un nouveau token avec permissions `repo` + `workflow`
3. Copiez le token (gardez-le secret !)
4. Vous pouvez l'utiliser dans Decap CMS

### Étape 5 : Configurer Firebase Deployment

#### Installer Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init hosting --project site-lea-484923
```

#### Ajouter secrets GitHub pour déploiement automatique

1. Générez une clé de service Firebase :
   - Allez sur [Google Cloud Console](https://console.cloud.google.com)
   - Projet : `site-lea-484923`
   - Créez une nouvelle clé de service (JSON)

2. Allez sur GitHub → Settings → Secrets
3. Créez un secret `FIREBASE_SERVICE_ACCOUNT_SITE_LEA_484923`
4. Collez la clé JSON (complète)

---

## 📦 Installation des Dépendances

```bash
npm install
```

## 🔨 Build Local

```bash
npm run build
```

Cela génère `content.json` à partir des fichiers YAML.

## 🧪 Test Local

```bash
npm run dev
```

Ouvre le site sur `http://localhost:8000`

---

## 🌐 Architecture Finale

```
lea-guery-odelin.web.app
├── /admin           → Decap CMS admin panel
│   ├── index.html
│   └── config.yml   ← Configuration des collections
├── /content         → Fichiers de contenu YAML
│   ├── settings.yml
│   ├── about/
│   ├── services/
│   ├── gallery/
│   └── ...
├── content.json     ← Généré par `npm run build`
└── index.html       ← Site principal (à modifier pour charger content.json)
```

### Flux de Mise à Jour

1. **Léa édite via l'admin** → `/admin`
2. **Decap CMS commit** → Fichiers YAML modifiés
3. **GitHub Actions trigger** → Exécute `npm run build`
4. **content.json généré** → Commit auto
5. **Firebase déploiement** → Site mis à jour

---

## ⚙️ Configuration de index.html pour charger le contenu

*(À faire après avoir confirmé que le CMS fonctionne)*

Modifier `index.html` pour charger le contenu depuis `content.json` :

```javascript
// Dans index.html, ajouter:
fetch('./content.json')
  .then(r => r.json())
  .then(content => {
    // Utiliser content.about, content.services, etc.
    // pour remplir dynamiquement le site
  });
```

---

## ✅ Checklist de Lancement

- [ ] Repo GitHub créé et connecté
- [ ] Git initialisé localement
- [ ] Decap CMS configuré
- [ ] GitHub secrets configurés
- [ ] Firebase CI/CD en place
- [ ] Admin panel accessible
- [ ] Contenu de base créé (services, about, etc.)
- [ ] Test de modification et déploiement
- [ ] Site mis à jour avec nouvelle modification
- [ ] Léa a accès à l'admin panel et au guide

---

## 🔐 Recommandations de Sécurité

1. **Jamais exposer les tokens** GitHub ou Firebase
2. **Utiliser les secrets GitHub** pour les données sensibles
3. **Restreindre l'accès** au repo (privé recommandé)
4. **Vérifier les commits** avant déploiement
5. **Sauvegarde régulière** (git history = backup)

---

## 📞 Aide & Support

- Docs Decap CMS : https://decapcms.org/docs/intro
- Docs Firebase : https://firebase.google.com/docs
- GitHub Actions : https://docs.github.com/actions

---

**Setup date:** 10 septembre 2026
