# Guide de Déploiement SocialMatch Platform sur Azure

## Introduction

Ce guide vous accompagne étape par étape pour déployer votre plateforme SocialMatch sur Microsoft Azure avec votre domaine IONOS. À la fin de ce guide, votre site sera accessible à `votredomaine.com` avec un déploiement continu automatique.

**Durée estimée** : 30-45 minutes  
**Coût** : À partir de $10/mois (App Service gratuit possible avec Azure Free Tier)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Un compte **Azure** (créez-en un gratuitement sur [portal.azure.com](https://portal.azure.com))
- ✅ Un compte **GitHub** avec accès à votre code
- ✅ Un domaine **IONOS** (avec accès à la gestion DNS)
- ✅ **Cursor** ou **JetBrains** pour éditer le code (optionnel)
- ✅ Les informations de votre base de données MySQL

---

## Phase 1 : Exporter le Code vers GitHub

### Étape 1.1 : Accéder au Management UI de Manus

1. Ouvrez votre projet SocialMatch dans Manus
2. Cliquez sur le bouton **Management UI** (icône en haut à droite)
3. Naviguez vers **Settings → GitHub**

### Étape 1.2 : Exporter vers GitHub

1. Cliquez sur **"Export to GitHub"**
2. Connectez-vous à GitHub si nécessaire
3. Remplissez les informations :
   - **Repository name** : `social-match-platform`
   - **Owner** : Votre compte GitHub
   - **Description** : "SocialMatch Platform - Dating app with matching and messaging"
   - **Visibility** : Public (recommandé) ou Private

4. Cliquez sur **"Export"**

Manus créera automatiquement un nouveau repository avec tout votre code (frontend + backend).

### Étape 1.3 : Vérifier l'Export

1. Allez sur [github.com](https://github.com) et vérifiez que votre repository est créé
2. Vous devriez voir les dossiers : `client/`, `server/`, `drizzle/`, `package.json`, etc.

---

## Phase 2 : Créer une Base de Données MySQL sur Azure

### Étape 2.1 : Créer Azure Database for MySQL

1. Ouvrez [portal.azure.com](https://portal.azure.com)
2. Cliquez sur **"Create a resource"** (ou utilisez la barre de recherche)
3. Recherchez **"Azure Database for MySQL"** et cliquez dessus
4. Cliquez sur **"Create"**

### Étape 2.2 : Configurer la Base de Données

Remplissez les informations suivantes :

| Champ | Valeur |
|-------|--------|
| **Subscription** | Votre abonnement Azure |
| **Resource Group** | Créez-en une nouvelle : `socialmatch-rg` |
| **Server name** | `socialmatch-db` (doit être unique) |
| **Region** | Europe (West) ou votre région préférée |
| **MySQL version** | 8.0 |
| **Compute + storage** | Burstable, Standard_B1s (gratuit si eligible) |
| **Admin username** | `sqladmin` |
| **Password** | Créez un mot de passe fort (ex: `P@ssw0rd!Secure123`) |

Cliquez sur **"Review + create"**, puis **"Create"**.

### Étape 2.3 : Configurer les Paramètres de Connexion

Une fois la base de données créée :

1. Allez dans votre ressource **Azure Database for MySQL**
2. Cliquez sur **"Connection strings"**
3. Copiez la chaîne de connexion **"PHP"** (elle ressemble à ceci) :

```
Server=socialmatch-db.mysql.database.azure.com;Database=socialmatch;Uid=sqladmin@socialmatch-db;Pwd=YOUR_PASSWORD;
```

4. Remplacez `YOUR_PASSWORD` par votre mot de passe réel

Gardez cette chaîne de connexion, vous en aurez besoin plus tard.

### Étape 2.4 : Créer la Base de Données

1. Dans **Azure Database for MySQL**, allez dans **"Databases"**
2. Cliquez sur **"Add"**
3. Nommez-la `socialmatch`
4. Cliquez sur **"Save"**

---

## Phase 3 : Créer l'App Service sur Azure

### Étape 3.1 : Créer une Nouvelle App Service

1. Allez sur [portal.azure.com](https://portal.azure.com)
2. Cliquez sur **"Create a resource"**
3. Recherchez **"App Service"** et cliquez dessus
4. Cliquez sur **"Create"**

### Étape 3.2 : Configurer l'App Service

Remplissez les informations suivantes :

| Champ | Valeur |
|-------|--------|
| **Subscription** | Votre abonnement Azure |
| **Resource Group** | `socialmatch-rg` (la même que pour la DB) |
| **Name** | `socialmatch-app` (doit être unique) |
| **Publish** | Code |
| **Runtime stack** | Node.js 22 LTS |
| **Operating System** | Linux |
| **Region** | Europe (West) ou votre région préférée |
| **App Service Plan** | Créez-en un nouveau : `socialmatch-plan` |
| **Pricing plan** | Free (F1) ou Standard (S1) |

Cliquez sur **"Review + create"**, puis **"Create"**.

---

## Phase 4 : Configurer le Déploiement Continu depuis GitHub

### Étape 4.1 : Connecter GitHub à Azure

1. Allez dans votre **App Service** (socialmatch-app)
2. Cliquez sur **"Deployment Center"** (dans le menu de gauche)
3. Sélectionnez **"GitHub"** comme source
4. Cliquez sur **"Authorize"** et connectez-vous à GitHub
5. Sélectionnez :
   - **Organization** : Votre compte GitHub
   - **Repository** : `social-match-platform`
   - **Branch** : `main`

6. Cliquez sur **"Save"**

Azure créera automatiquement un **GitHub Actions workflow** qui déploiera votre code à chaque fois que vous poussez sur la branche `main`.

### Étape 4.2 : Vérifier le Workflow GitHub Actions

1. Allez sur votre repository GitHub
2. Cliquez sur **"Actions"**
3. Vous devriez voir un workflow en cours d'exécution
4. Attendez que le déploiement se termine (cela peut prendre 5-10 minutes)

---

## Phase 5 : Configurer les Variables d'Environnement

### Étape 5.1 : Ajouter les Secrets dans Azure

1. Allez dans votre **App Service** (socialmatch-app)
2. Cliquez sur **"Configuration"** (dans le menu de gauche)
3. Cliquez sur **"+ New application setting"** pour chaque variable :

| Clé | Valeur | Description |
|-----|--------|-------------|
| `DATABASE_URL` | `mysql://sqladmin@socialmatch-db:PASSWORD@socialmatch-db.mysql.database.azure.com:3306/socialmatch` | Remplacez PASSWORD par votre mot de passe |
| `JWT_SECRET` | Générez une clé aléatoire (ex: `your-super-secret-key-12345`) | Clé de signature des tokens JWT |
| `VITE_APP_ID` | Votre ID d'application Manus | Trouvez-le dans Manus Settings |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | URL du serveur OAuth Manus |
| `VITE_OAUTH_PORTAL_URL` | `https://oauth.manus.im` | URL du portail OAuth Manus |
| `OWNER_OPEN_ID` | Votre OpenID Manus | Trouvez-le dans Manus Settings |
| `OWNER_NAME` | Votre nom | Votre nom complet |
| `NODE_ENV` | `production` | Environnement de production |

4. Cliquez sur **"Save"** après avoir ajouté toutes les variables

### Étape 5.2 : Redémarrer l'App Service

1. Allez dans votre **App Service**
2. Cliquez sur **"Restart"** (en haut)
3. Attendez que l'application redémarre (2-3 minutes)

---

## Phase 6 : Lier Votre Domaine IONOS

### Étape 6.1 : Ajouter le Domaine Personnalisé dans Azure

1. Allez dans votre **App Service** (socialmatch-app)
2. Cliquez sur **"Custom domains"** (dans le menu de gauche)
3. Cliquez sur **"+ Add custom domain"**
4. Entrez votre domaine IONOS (ex: `socialmatch.fr`)
5. Cliquez sur **"Validate"**

Azure vous affichera les enregistrements DNS à configurer.

### Étape 6.2 : Configurer les Enregistrements DNS chez IONOS

1. Connectez-vous à votre compte **IONOS**
2. Allez dans **"Domaines"** → Votre domaine
3. Cliquez sur **"Gérer les enregistrements DNS"**
4. Ajoutez les enregistrements fournis par Azure :

**Pour un enregistrement CNAME :**

| Type | Nom | Valeur |
|------|-----|--------|
| CNAME | `www` | `socialmatch-app.azurewebsites.net` |

**Pour un enregistrement A (racine du domaine) :**

| Type | Nom | Valeur |
|------|-----|--------|
| A | `@` | Adresse IP fournie par Azure |

5. Cliquez sur **"Enregistrer"**

### Étape 6.3 : Valider le Domaine dans Azure

1. Retournez à Azure (**Custom domains**)
2. Attendez que le domaine soit validé (cela peut prendre 24-48h)
3. Une fois validé, vous verrez une coche verte

---

## Phase 7 : Activer HTTPS

### Étape 7.1 : Ajouter un Certificat SSL

1. Allez dans votre **App Service**
2. Cliquez sur **"Custom domains"**
3. Cliquez sur votre domaine
4. Activez **"HTTPS only"**
5. Azure génère automatiquement un certificat SSL gratuit

---

## Phase 8 : Tester Votre Déploiement

### Étape 8.1 : Accéder à Votre Site

1. Ouvrez votre navigateur
2. Allez à `https://votredomaine.com`
3. Vous devriez voir votre landing page SocialMatch

### Étape 8.2 : Vérifier les Logs

Si quelque chose ne fonctionne pas :

1. Allez dans votre **App Service**
2. Cliquez sur **"Log stream"** (dans le menu de gauche)
3. Vous verrez les logs en temps réel
4. Cherchez les erreurs et corrigez-les

---

## Phase 9 : Déploiement Continu

### Comment Déployer des Mises à Jour

À partir de maintenant, chaque fois que vous modifiez votre code :

1. **Modifiez votre code** dans Cursor ou JetBrains
2. **Committez et poussez** sur GitHub :
   ```bash
   git add .
   git commit -m "Description de vos changements"
   git push origin main
   ```

3. **GitHub Actions** déploiera automatiquement votre code sur Azure
4. Votre site sera mis à jour en 5-10 minutes

---

## Dépannage

### Le site affiche une erreur 502 Bad Gateway

**Solution** :
1. Vérifiez que toutes les variables d'environnement sont correctes
2. Vérifiez la connexion à la base de données
3. Redémarrez l'App Service
4. Consultez les logs (**Log stream**)

### Le domaine IONOS ne pointe pas vers Azure

**Solution** :
1. Attendez 24-48h pour la propagation DNS
2. Vérifiez les enregistrements DNS chez IONOS
3. Utilisez `nslookup votredomaine.com` pour vérifier

### Les images ne s'affichent pas

**Solution** :
1. Vérifiez que les URLs des images sont correctes
2. Vérifiez les permissions S3 si vous utilisez le stockage cloud
3. Consultez la console du navigateur pour les erreurs

---

## Coûts Estimés

| Service | Coût/mois | Notes |
|---------|-----------|-------|
| App Service (Free/S1) | $0-50 | Gratuit avec Free Tier |
| Azure Database MySQL | $10-50 | À partir de $10/mois |
| Domaine IONOS | $10-20 | Selon l'extension |
| **Total** | **$20-120** | Peut être gratuit avec Free Tier |

---

## Prochaines Étapes

1. **Configurer les notifications** : Ajoutez des emails de notification pour les nouveaux matchs
2. **Implémenter WebSocket** : Activez la messagerie temps réel
3. **Ajouter un CDN** : Utilisez Azure CDN pour accélérer les images
4. **Configurer les backups** : Activez les sauvegardes automatiques de la base de données
5. **Mettre en place le monitoring** : Utilisez Azure Monitor pour surveiller les performances

---

## Support

Si vous rencontrez des problèmes :

1. Consultez les **logs Azure** (Log stream)
2. Vérifiez les **GitHub Actions** pour les erreurs de déploiement
3. Contactez le **support Azure** : https://azure.microsoft.com/support/

---

**Félicitations !** 🎉 Votre plateforme SocialMatch est maintenant en ligne sur Azure avec votre domaine IONOS !
