# ⚡ Quick Start — CMS Decap en 5 Minutes

**Voici les 4 étapes pour lancer le CMS :**

---

## 1️⃣ GitHub Repo (2 min)

```bash
# Si pas déjà fait:
git init
git remote add origin https://github.com/romaingueryodelin/lea-guery-odelin.git
git add .
git commit -m "Initial: CMS setup"
git push -u origin main
```

---

## 2️⃣ Installer Dépendances (1 min)

```bash
npm install
```

---

## 3️⃣ Tester Build Local (1 min)

```bash
npm run build
# Vérifier que content.json est créé
cat content.json | head -10
```

---

## 4️⃣ Configurer Decap CMS (1 min)

### Option Recommandée: Decap Hosting

1. Allez sur https://app.decapcms.org
2. Connectez-vous avec GitHub
3. Sélectionnez votre repo `lea-guery-odelin`
4. ✅ C'est fait!

**Accédez au CMS :**
```
https://lea-guery-odelin.decapcms.org/admin
```

---

## ✅ Testé? Les Points à Vérifier

- [ ] `npm run build` crée `content.json`
- [ ] Décap CMS accessible via l'URL
- [ ] Vous pouvez vous connecter avec GitHub
- [ ] Vous voyez les sections (About, Services, etc.)

---

## 🎯 Test Rapide du Workflow

1. **Allez dans Admin** → https://lea-guery-odelin.decapcms.org/admin
2. **Allez dans "Services"**
3. **Cliquez "Ajouter un nouveau service"**
4. **Remplissez les champs** (nom, description)
5. **Cliquez "Publish"**
6. **Attendez 5-10 min** → GitHub Actions build + Firebase deploy
7. **Vérifiez** sur https://lea-guery-odelin.web.app

✅ **Si ça marche :** CMS fonctionnel !

---

## 📖 Guides Complets

- **Pour Léa:** [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md)
- **Pour l'équipe:** [`SETUP_GUIDE.md`](./SETUP_GUIDE.md)
- **Résumé complet:** [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md)

---

**Durée totale :** 5-10 minutes ⏱️
