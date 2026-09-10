# Guide d'Administration du Site

## 📝 Comment Accéder à l'Admin Panel

### URL
```
https://lea-guery-odelin.web.app/admin
```

### Connexion
1. Cliquez sur le bouton "Login with GitHub"
2. Connectez-vous avec votre compte GitHub
3. Vous accédez à l'interface de gestion du contenu

---

## 🎯 Sections Éditables

### 1. **Paramètres du Site** ⚙️
Informations globales du site :
- Titre du site
- Description générale
- Email de contact
- Logos (FR, EN, DE)

**Accès:** Section "Paramètres du Site"

### 2. **À Propos** 👤
Votre présentation professionnelle :
- Biographie (texte enrichi)
- Photo de profil
- Spécialités (liste)
- Support multilingue (FR, EN, DE)

**Accès:** Section "À Propos"

### 3. **Services** 💼
Vos domaines d'intervention :
- Concerts classiques
- Événements privés (mariages, etc.)
- Formations/Ateliers
- Projets spéciaux

**Accès:** Section "Services" → Ajouter nouveau service

**Pour chaque service :**
- Nom
- Description détaillée
- Public cible
- Tarifs (optionnel)
- Icône/Emoji

### 4. **Formation & Certifications** 🎓
Votre parcours académique :
- Diplômes
- Certifications
- Années
- Institutions

**Accès:** Section "Formation & Certifications" → Ajouter

### 5. **Parcours Artistique** 🎼
Vos événements et projets importants :
- Titres des concerts/événements
- Dates et lieux
- Descriptions
- Photos (optionnel)
- Type (concert, festival, collaboration, etc.)

**Accès:** Section "Parcours Artistique" → Ajouter

### 6. **Galerie** 📸
Vos photos professionnelles :
- Uploads d'images
- Descriptions
- Catégorisation (portrait, performance, événement)
- Dates (optionnel)

**Accès:** Section "Galerie" → Ajouter image

### 7. **Vidéos** 🎥
Vos performances enregistrées :
- URL YouTube
- Titre et description
- Type de vidéo
- Support multilingue

**Accès:** Section "Vidéos" → Ajouter

**Format URL :**
```
https://youtu.be/xxxxx
ou
https://www.youtube.com/watch?v=xxxxx
```

### 8. **Témoignages** ⭐
Avis de clients et collaborateurs :
- Auteur
- Titre/Poste
- Texte du témoignage
- Photo (optionnel)
- Lien (optionnel)
- Support multilingue

**Accès:** Section "Témoignages & Références" → Ajouter

### 9. **Informations de Contact** 📞
Vos coordonnées :
- Email de contact
- Téléphone
- Ville
- Liens réseaux sociaux (Instagram, LinkedIn, YouTube, Facebook)

**Accès:** Section "Informations de Contact"

### 10. **Actualités & Blog** 📰 *(Optionnel)*
Partager vos actualités et articles :
- Titre
- Contenu (markdown)
- Image d'en-tête
- Date de publication
- Tags
- Brouillon ou publié

**Accès:** Section "Actualités & Blog" → Ajouter article

---

## 🌐 Support Multilingue

Certaines sections supportent le français, anglais et allemand :
- À Propos
- Contact
- Certaines sections du blog

**Comment éditer en plusieurs langues :**
1. Créez/éditez le contenu en français
2. Une fois sauvegardé, l'interface propose les autres langues
3. Remplissez les traductions

---

## 💾 Publier vos Modifications

### Workflow de Publication

1. **Édition** : Modifiez le contenu dans l'admin panel
2. **Sauvegarde** : Le contenu est automatiquement sauvegardé
3. **Révision** (optionnel) : Les modifications passent en "Draft" d'abord
4. **Publication** : Cliquez "Publish" pour valider
5. **Déploiement** : Le site se met à jour automatiquement (5-10 min)

### Vérifier la Publication
- Actualisez votre site après ~5-10 minutes
- Nettoyez le cache (Cmd+Shift+R sur Mac, Ctrl+Shift+R sur Windows)

---

## 📋 Conseils de Rédaction

### Biographie (À Propos)
- Rédigez en 2-3 paragraphes
- Mettez en avant vos spécialités
- Mentionnez votre expérience
- **Longueur recommandée :** 200-300 mots

### Descriptions de Services
- Soyez clair et concis
- Incluez le public cible
- Mentionnez les tarifs si disponibles
- **Longueur :** 50-100 mots par service

### Galerie
- Une description par image
- Mentionnez le contexte (lieu, date, événement)
- Catégorisez correctement
- **Max 5-10 photos par catégorie**

### Vidéos
- Ajoutez une description du contenu
- Mentionnez les collaborateurs si applicable
- Vérifiez que l'URL YouTube est correcte

---

## 🔒 Sécurité

- Vos modifications ne sont publiées qu'après confirmation
- Workflow éditorial : les brouillons restent privés jusqu'à publication
- Historique git : toutes les modifications sont tracées (rollback possible)
- **Ne partagez jamais** votre token GitHub

---

## 🆘 Troubleshooting

### "Erreur de connexion GitHub"
- Vérifiez que vous êtes autorisé sur le repo GitHub
- Déconnectez-vous et reconnectez-vous
- Nettoyez le cache du navigateur

### "Les modifications ne s'affichent pas"
- Attendez 5-10 minutes (déploiement en cours)
- Nettoyez le cache (Cmd+Shift+R / Ctrl+Shift+R)
- Vérifiez le statut du déploiement dans GitHub Actions

### "Image ne s'upload pas"
- Vérifiez la taille du fichier (< 10MB)
- Format recommandé : JPG, PNG, WebP
- Nommez le fichier simplement (évitez caractères spéciaux)

### "L'URL YouTube ne marche pas"
- Vérifiez le format : `https://youtu.be/xxxxx`
- Ou : `https://www.youtube.com/watch?v=xxxxx`
- La vidéo ne doit pas être en "non-listée"

---

## 📞 Support

Pour toute question :
- Email : bureau@lecresvb.fr
- Consultez ce guide
- Contactez l'équipe technique

---

**Dernière mise à jour :** 10 septembre 2026
