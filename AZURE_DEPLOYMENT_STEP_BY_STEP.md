# 🚀 Claudine sur Azure - Guide Pas à Pas Complet

**Durée estimée : 45-60 minutes**

---

## 📋 Table des Matières

1. [Étape 1 : Exporter vers GitHub](#étape-1)
2. [Étape 2 : Créer l'Infrastructure Azure](#étape-2)
3. [Étape 3 : Configurer le Déploiement Continu](#étape-3)
4. [Étape 4 : Paramétrer les Variables d'Environnement](#étape-4)
5. [Étape 5 : Lier votre Domaine IONOS](#étape-5)
6. [Étape 6 : Tester et Valider](#étape-6)
7. [Étape 7 : Maintenance et Mises à Jour](#étape-7)

---

## ✅ Étape 1 : Exporter vers GitHub {#étape-1}

### 1.1 - Exporter depuis Manus

**Dans Manus Management UI :**

1. Ouvrez votre projet Claudine
2. Cliquez sur **Settings** (engrenage en bas à gauche)
3. Sélectionnez **GitHub** dans le menu latéral
4. Cliquez sur **"Export to GitHub"**

### 1.2 - Autoriser Manus à accéder à GitHub

1. Une fenêtre GitHub s'ouvre
2. Cliquez sur **"Authorize manus-io"**
3. Entrez votre mot de passe GitHub si demandé
4. Acceptez les permissions

### 1.3 - Créer le Repository

1. De retour dans Manus, vous voyez un formulaire
2. **Repository name** : `claudine-app` (ou votre nom)
3. **Owner** : Sélectionnez votre compte GitHub
4. **Description** : "Claudine - Média social professionnel pour la distribution"
5. **Visibility** : Private (recommandé)
6. Cliquez sur **"Create Repository"**

### 1.4 - Attendre l'Export

- Manus exporte tout votre code (5-10 minutes)
- Vous recevez une notification quand c'est terminé
- Allez sur [github.com](https://github.com) pour vérifier

**Vérification :**
```
https://github.com/votre-username/claudine-app
```

---

## ✅ Étape 2 : Créer l'Infrastructure Azure {#étape-2}

### 2.1 - Créer un Resource Group

**Connectez-vous à [portal.azure.com](https://portal.azure.com) :**

1. Cliquez sur **"Create a resource"**
2. Recherchez **"Resource Group"**
3. Cliquez sur **Create**
4. **Resource group name** : `claudine-rg`
5. **Region** : Europe West (ou votre région)
6. Cliquez sur **Review + Create** → **Create**

### 2.2 - Créer une App Service

**Dans Azure Portal :**

1. Cliquez sur **"Create a resource"**
2. Recherchez **"App Service"**
3. Cliquez sur **Create**

**Configurez :**

| Champ | Valeur |
|-------|--------|
| **Subscription** | Votre abonnement |
| **Resource Group** | `claudine-rg` |
| **Name** | `claudine-app` |
| **Publish** | Code |
| **Runtime stack** | Node.js 22 LTS |
| **Operating System** | Linux |
| **Region** | Europe West |
| **App Service Plan** | Créez un nouveau (Standard B1) |

4. Cliquez sur **Review + Create** → **Create**

**Attendre 2-3 minutes** que l'App Service soit créée.

### 2.3 - Créer une Azure SQL Database

**Dans Azure Portal :**

1. Cliquez sur **"Create a resource"**
2. Recherchez **"SQL Database"**
3. Cliquez sur **Create**

**Configurez :**

| Champ | Valeur |
|-------|--------|
| **Subscription** | Votre abonnement |
| **Resource Group** | `claudine-rg` |
| **Database name** | `claudine` |
| **Server** | Créez un nouveau |

**Pour le serveur :**

| Champ | Valeur |
|-------|--------|
| **Server name** | `claudine-db` |
| **Location** | Europe West |
| **Authentication method** | Use SQL authentication |
| **Server admin login** | `claudineadmin` |
| **Password** | Créez un mot de passe fort (ex: `Claudine@2024!`) |
| **Confirm password** | Confirmez |

4. Cliquez sur **Review + Create** → **Create**

**Attendre 3-5 minutes** que la base de données soit créée.

### 2.4 - Récupérer la Chaîne de Connexion

**Dans Azure Portal :**

1. Allez dans votre **SQL Database** (`claudine`)
2. Cliquez sur **Connection strings**
3. Copiez la chaîne **ADO.NET** :

```
Server=tcp:claudine-db.database.windows.net,1433;Initial Catalog=claudine;Persist Security Info=False;User ID=claudineadmin;Password={your_password};Encrypt=True;Connection Timeout=30;
```

**Remplacez `{your_password}` par votre mot de passe.**

---

## ✅ Étape 3 : Configurer le Déploiement Continu {#étape-3}

### 3.1 - Connecter GitHub à Azure

**Dans Azure Portal :**

1. Allez dans votre **App Service** (`claudine-app`)
2. Cliquez sur **Deployment Center** (à gauche)
3. Sélectionnez **GitHub** comme source
4. Cliquez sur **Authorize**

### 3.2 - Autoriser Azure sur GitHub

1. Une fenêtre GitHub s'ouvre
2. Cliquez sur **"Authorize AzureAppServiceDeployment"**
3. Entrez votre mot de passe GitHub
4. Acceptez les permissions

### 3.3 - Configurer le Repository et la Branche

**De retour dans Azure :**

1. **Organization** : Sélectionnez votre compte
2. **Repository** : `claudine-app`
3. **Branch** : `main`
4. Cliquez sur **Save**

**Azure crée automatiquement un workflow GitHub Actions.**

### 3.4 - Vérifier le Workflow

**Sur GitHub :**

1. Allez dans votre repository `claudine-app`
2. Cliquez sur **Actions**
3. Vous devez voir un workflow en cours ou complété
4. Si tout est ✅, le déploiement est configuré !

---

## ✅ Étape 4 : Paramétrer les Variables d'Environnement {#étape-4}

### 4.1 - Ajouter les Variables dans Azure

**Dans Azure Portal :**

1. Allez dans votre **App Service** (`claudine-app`)
2. Cliquez sur **Settings → Configuration**
3. Cliquez sur **"New application setting"**

**Ajoutez les variables suivantes :**

| Nom | Valeur | Notes |
|-----|--------|-------|
| `DATABASE_URL` | `Server=tcp:claudine-db.database.windows.net,1433;Initial Catalog=claudine;Persist Security Info=False;User ID=claudineadmin;Password=Claudine@2024!;Encrypt=True;Connection Timeout=30;` | Remplacez le mot de passe |
| `NODE_ENV` | `production` | Mode production |
| `JWT_SECRET` | `votre_secret_jwt_très_sécurisé_ici_min_32_caractères` | Générez un secret aléatoire |
| `VITE_APP_TITLE` | `Claudine` | Titre de l'app |
| `VITE_APP_ID` | Votre App ID Manus | Depuis Manus |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | URL OAuth |
| `VITE_OAUTH_PORTAL_URL` | `https://portal.manus.im` | Portal OAuth |
| `BUILT_IN_FORGE_API_URL` | `https://api.manus.im` | API Manus |
| `BUILT_IN_FORGE_API_KEY` | Votre clé API Manus | Depuis Manus |

4. Cliquez sur **Save** après chaque ajout

### 4.2 - Générer un JWT Secret Sécurisé

**Ouvrez un terminal et exécutez :**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copiez le résultat et collez-le dans `JWT_SECRET`.**

### 4.3 - Redémarrer l'App Service

**Dans Azure Portal :**

1. Allez dans votre **App Service** (`claudine-app`)
2. Cliquez sur **Restart** (en haut)
3. Attendez 1-2 minutes

---

## ✅ Étape 5 : Lier votre Domaine IONOS {#étape-5}

### 5.1 - Ajouter le Domaine dans Azure

**Dans Azure Portal :**

1. Allez dans votre **App Service** (`claudine-app`)
2. Cliquez sur **Settings → Custom domains**
3. Cliquez sur **"Add custom domain"**
4. Entrez votre domaine IONOS (ex: `claudine.fr`)
5. Cliquez sur **Validate**

**Azure vous demande de vérifier la propriété du domaine.**

### 5.2 - Configurer les DNS chez IONOS

**Connectez-vous à [ionos.fr](https://ionos.fr) :**

1. Allez dans **Domaines → Gestion des domaines**
2. Sélectionnez votre domaine
3. Cliquez sur **Gestion DNS**
4. Trouvez l'enregistrement `@` (root)
5. **Modifiez-le :**
   - **Type** : CNAME
   - **Valeur** : `claudine-app.azurewebsites.net`
   - **TTL** : 3600

6. Cliquez sur **Enregistrer**

**Attendez 10-30 minutes** pour la propagation DNS.

### 5.3 - Valider le Domaine dans Azure

**De retour dans Azure :**

1. Cliquez sur **Validate** (si vous êtes toujours sur la page)
2. Ou attendez 5 minutes et rafraîchissez
3. Azure vérifie automatiquement la propriété du domaine

**Une fois validé :**
1. Cliquez sur **Add custom domain**
2. Sélectionnez votre domaine
3. Cliquez sur **Save**

### 5.4 - Activer HTTPS

**Dans Azure Portal :**

1. Allez dans **Settings → TLS/SSL settings**
2. Cliquez sur **"HTTPS only"** → **On**
3. Cliquez sur **Save**

**Azure génère automatiquement un certificat SSL gratuit.**

---

## ✅ Étape 6 : Tester et Valider {#étape-6}

### 6.1 - Tester l'URL Azure

**Ouvrez votre navigateur :**

```
https://claudine-app.azurewebsites.net
```

Vous devez voir votre site Claudine !

### 6.2 - Tester votre Domaine IONOS

**Ouvrez votre navigateur :**

```
https://votre-domaine.fr
```

Vous devez voir votre site Claudine !

### 6.3 - Vérifier les Logs

**Dans Azure Portal :**

1. Allez dans votre **App Service** (`claudine-app`)
2. Cliquez sur **Monitoring → Log stream**
3. Vous voyez les logs en direct

**Cherchez les erreurs :**
- ❌ Erreurs de connexion à la base de données
- ❌ Erreurs d'authentification
- ✅ "Server running on..." = succès

### 6.4 - Tester la Base de Données

**Depuis Cursor ou JetBrains :**

1. Ouvrez un terminal
2. Exécutez :

```bash
cd /home/ubuntu/social-match-platform
pnpm db:push
```

Cela pousse les migrations vers Azure SQL Database.

---

## ✅ Étape 7 : Maintenance et Mises à Jour {#étape-7}

### 7.1 - Mettre à Jour le Code

**Depuis Cursor ou JetBrains :**

1. Modifiez le code
2. Testez localement :

```bash
pnpm dev
```

3. Committez et poussez :

```bash
git add .
git commit -m "Ajouter nouvelle fonctionnalité"
git push origin main
```

### 7.2 - Vérifier le Déploiement

**Sur GitHub :**

1. Allez dans **Actions**
2. Vous voyez le workflow en cours
3. Attendez que tout soit ✅

**Sur Azure :**

1. Allez dans **Deployment Center**
2. Vous voyez le nouveau déploiement

**Votre site se met à jour automatiquement en 2-3 minutes !**

### 7.3 - Voir les Logs de Déploiement

**Dans Azure Portal :**

1. Allez dans **Deployment Center**
2. Cliquez sur le dernier déploiement
3. Cliquez sur **Logs**
4. Vous voyez tous les détails du build et du déploiement

### 7.4 - Rollback en Cas de Problème

**Si quelque chose ne fonctionne pas :**

1. Allez dans **Deployment Center**
2. Cliquez sur un déploiement antérieur
3. Cliquez sur **Redeploy**
4. Azure revient à cette version

---

## 🎯 Résumé des URLs Importantes

| Service | URL |
|---------|-----|
| **Azure Portal** | https://portal.azure.com |
| **GitHub Repository** | https://github.com/votre-username/claudine-app |
| **Site Azure** | https://claudine-app.azurewebsites.net |
| **Site avec Domaine** | https://votre-domaine.fr |
| **IONOS Domaines** | https://ionos.fr |

---

## 🚨 Troubleshooting

### Problème : "Application Error"

**Solution :**
1. Vérifiez les logs Azure (Log stream)
2. Vérifiez la chaîne de connexion DATABASE_URL
3. Redémarrez l'App Service

### Problème : "Cannot connect to database"

**Solution :**
1. Vérifiez que Azure SQL Database est en cours d'exécution
2. Vérifiez le mot de passe dans DATABASE_URL
3. Vérifiez les règles de pare-feu Azure SQL

### Problème : "Domain not found"

**Solution :**
1. Attendez 24-48h pour la propagation DNS
2. Vérifiez les enregistrements DNS chez IONOS
3. Utilisez `nslookup votre-domaine.fr` pour tester

### Problème : "HTTPS certificate error"

**Solution :**
1. Attendez 5-10 minutes pour la génération du certificat
2. Rafraîchissez votre navigateur (Ctrl+Shift+R)
3. Videz le cache du navigateur

---

## ✅ Checklist Finale

- [ ] Repository GitHub créé et exporté
- [ ] Resource Group Azure créé
- [ ] App Service Azure créée
- [ ] Azure SQL Database créée
- [ ] Déploiement continu configuré
- [ ] Variables d'environnement ajoutées
- [ ] Domaine IONOS lié
- [ ] HTTPS activé
- [ ] Site accessible via Azure URL
- [ ] Site accessible via domaine IONOS
- [ ] Logs vérifiés (pas d'erreurs)
- [ ] Base de données testée

---

## 📞 Support

- **Manus Help** : https://help.manus.im
- **Azure Support** : https://support.microsoft.com/azure
- **GitHub Support** : https://support.github.com

**Bravo ! Votre site Claudine est maintenant en production sur Azure ! 🎉**
