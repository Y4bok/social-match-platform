# 🚀 Claudine - Guide Complet de Déploiement & Évolution

## Table des Matières
1. [Modifier les Textes Facilement](#modifier-les-textes)
2. [Déployer sur Azure avec GitHub](#déployer-azure)
3. [Configurer Azure SQL Database](#azure-sql)
4. [Implémenter la Messagerie Instantanée](#messagerie-instantanée)
5. [Authentification Multi-Fournisseurs](#authentification)
6. [Roadmap Complète](#roadmap)

---

## 1. Modifier les Textes Facilement {#modifier-les-textes}

### Approche Actuelle (Textes en Dur dans le Code)

Actuellement, tous les textes sont directement dans les fichiers React (`client/src/pages/*.tsx`). Pour les modifier, vous devez éditer le code.

### ✅ Solution Recommandée : Fichier de Traductions JSON

**Créer un fichier de traductions centralisé :**

```bash
# Créer le dossier
mkdir -p client/src/locales

# Créer le fichier de traductions français
touch client/src/locales/fr.json
```

**Contenu du fichier `client/src/locales/fr.json` :**

```json
{
  "app": {
    "name": "Claudine",
    "tagline": "Le réseau professionnel de la distribution"
  },
  "home": {
    "hero_title": "Bienvenue sur Claudine",
    "hero_subtitle": "Connectez-vous avec les experts de la distribution",
    "cta_button": "Rejoindre maintenant"
  },
  "feed": {
    "title": "Actualités",
    "no_posts": "Aucun post pour le moment"
  },
  "groups": {
    "title": "Communautés",
    "join_group": "Rejoindre le groupe"
  }
}
```

**Créer un hook personnalisé pour les traductions :**

```typescript
// client/src/hooks/useTranslation.ts
import fr from '../locales/fr.json';

export function useTranslation() {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = fr;
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  return { t };
}
```

**Utiliser dans les composants :**

```tsx
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('home.hero_title')}</h1>
      <p>{t('home.hero_subtitle')}</p>
    </div>
  );
}
```

**Avantages :**
- ✅ Modifier les textes sans toucher au code
- ✅ Facile à ajouter d'autres langues (en.json, es.json, etc.)
- ✅ Gestion centralisée des contenus

---

## 2. Déployer sur Azure avec GitHub {#déployer-azure}

### Étape 1 : Exporter le Code vers GitHub

**Dans Manus Management UI :**
1. Allez dans **Settings → GitHub**
2. Cliquez sur **"Export to GitHub"**
3. Sélectionnez votre compte GitHub
4. Créez un nouveau repository (ex: `claudine-app`)
5. Manus exportera tout le code

### Étape 2 : Créer une App Service sur Azure

**Connectez-vous à [portal.azure.com](https://portal.azure.com) :**

1. **Créer une ressource** → **App Service**
2. **Configurez :**
   - **Resource Group** : Créez-en une (ex: `claudine-rg`)
   - **Name** : `claudine-app` (unique)
   - **Runtime stack** : **Node.js 22 LTS**
   - **Operating System** : **Linux**
   - **Region** : Europe West (ou votre région)
   - **App Service Plan** : Standard (recommandé pour production)

3. **Cliquez sur "Review + Create"** → **Create**

### Étape 3 : Configurer le Déploiement Continu depuis GitHub

**Dans votre App Service Azure :**

1. Allez dans **Deployment Center**
2. Sélectionnez **GitHub** comme source
3. **Autorisez Azure** à accéder à votre compte GitHub
4. Sélectionnez :
   - **Organization** : Votre compte
   - **Repository** : `claudine-app`
   - **Branch** : `main`
5. Cliquez sur **Save**

Azure créera automatiquement un **workflow GitHub Actions** pour les déploiements continus.

### Étape 4 : Configurer les Variables d'Environnement

**Dans votre App Service :**

1. Allez dans **Settings → Configuration**
2. Cliquez sur **New application setting**
3. Ajoutez les variables suivantes :

```
DATABASE_URL=Server=tcp:claudine-db.database.windows.net,1433;Initial Catalog=claudine;Persist Security Info=False;User ID=claudineadmin;Password=YourPassword123!;Encrypt=True;Connection Timeout=30;
JWT_SECRET=votre_secret_jwt_très_sécurisé_ici
VITE_APP_ID=votre_app_id_manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
NODE_ENV=production
VITE_APP_TITLE=Claudine
```

4. Cliquez sur **Save**

### Étape 5 : Configurer votre Domaine IONOS

**Chez IONOS :**

1. Connectez-vous à votre compte IONOS
2. Allez dans **Gestion des domaines**
3. Sélectionnez votre domaine
4. Allez dans **Gestion DNS**
5. Ajoutez un enregistrement **CNAME** :
   - **Nom** : `@` (ou `www`)
   - **Valeur** : `claudine-app.azurewebsites.net`
   - **TTL** : 3600

**Dans Azure :**

1. App Service → **Custom domains**
2. Cliquez sur **"Add custom domain"**
3. Entrez votre domaine IONOS
4. Validez la propriété du domaine
5. Activez **HTTPS only**

---

## 3. Configurer Azure SQL Database {#azure-sql}

### Créer une Azure SQL Database

**Sur [portal.azure.com](https://portal.azure.com) :**

1. **Créer une ressource** → **SQL Database**
2. **Configurez :**
   - **Database name** : `claudine`
   - **Server** : Créez un nouveau serveur
     - **Server name** : `claudine-db`
     - **Admin username** : `claudineadmin`
     - **Password** : Créez un mot de passe fort
   - **Pricing tier** : Standard (recommandé)

3. Cliquez sur **Review + Create** → **Create**

### Configurer la Connexion

**Modifier le fichier `.env` :**

```
DATABASE_URL=Server=tcp:claudine-db.database.windows.net,1433;Initial Catalog=claudine;Persist Security Info=False;User ID=claudineadmin;Password=YourPassword123!;Encrypt=True;Connection Timeout=30;
```

**Adapter le code pour SQL Server :**

```typescript
// server/db.ts
import { drizzle } from "drizzle-orm/sql-js"; // Remplacer par mssql
import { sql } from "drizzle-orm";

// Utiliser le driver MSSQL
import sql from "mssql";

export async function getDb() {
  const pool = new sql.ConnectionPool(process.env.DATABASE_URL);
  return drizzle(pool);
}
```

---

## 4. Implémenter la Messagerie Instantanée {#messagerie-instantanée}

### Installer Socket.io

```bash
cd /home/ubuntu/social-match-platform
pnpm add socket.io socket.io-client
pnpm add -D @types/socket.io
```

### Créer le Serveur WebSocket

**Créer `server/websocket.ts` :**

```typescript
import { Server } from "socket.io";
import type { Express } from "express";

export function setupWebSocket(app: Express, server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  // Stocker les connexions actives
  const userSockets = new Map<number, string>();

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    userSockets.set(userId, socket.id);

    // Événement : envoyer un message
    socket.on("send_message", async (data) => {
      const { conversationId, content, senderId } = data;

      // Sauvegarder en base de données
      // await db.insert(messages).values({ ... });

      // Envoyer au destinataire
      const receiverSocketId = userSockets.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          conversationId,
          content,
          senderId,
          timestamp: new Date(),
        });
      }
    });

    // Événement : utilisateur en ligne
    socket.on("user_online", () => {
      socket.broadcast.emit("user_status", {
        userId,
        status: "online",
      });
    });

    // Événement : déconnexion
    socket.on("disconnect", () => {
      userSockets.delete(userId);
      socket.broadcast.emit("user_status", {
        userId,
        status: "offline",
      });
    });
  });

  return io;
}
```

### Intégrer dans le Serveur Express

**Modifier `server/_core/index.ts` :**

```typescript
import { setupWebSocket } from "../websocket";

// ... code existant ...

const server = http.createServer(app);
setupWebSocket(app, server);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
```

### Utiliser dans le Frontend

**Créer `client/src/hooks/useSocket.ts` :**

```typescript
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(window.location.origin, {
      auth: {
        userId: localStorage.getItem("userId"),
      },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
}
```

**Utiliser dans un composant :**

```tsx
import { useSocket } from '@/hooks/useSocket';

export function Messages() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const sendMessage = (content: string) => {
    socket?.emit("send_message", {
      conversationId: 1,
      content,
      senderId: 1,
      receiverId: 2,
    });
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
```

---

## 5. Authentification Multi-Fournisseurs {#authentification}

### Installer les Dépendances

```bash
pnpm add passport passport-google-oauth20 passport-facebook passport-linkedin-oauth2
pnpm add -D @types/passport-google-oauth20
```

### Configurer Google OAuth

**Créer `server/auth/google.ts` :**

```typescript
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { upsertUser } from "../db";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await upsertUser({
          openId: `google_${profile.id}`,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          loginMethod: "google",
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
```

### Ajouter les Routes d'Authentification

**Modifier `server/_core/index.ts` :**

```typescript
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Créer une session
    res.redirect("/dashboard");
  }
);
```

### Ajouter les Variables d'Environnement

```
GOOGLE_CLIENT_ID=votre_client_id_google
GOOGLE_CLIENT_SECRET=votre_client_secret_google
FACEBOOK_APP_ID=votre_app_id_facebook
FACEBOOK_APP_SECRET=votre_app_secret_facebook
LINKEDIN_CLIENT_ID=votre_client_id_linkedin
LINKEDIN_CLIENT_SECRET=votre_client_secret_linkedin
```

---

## 6. Roadmap Complète {#roadmap}

### Phase 1 : Fondations (Semaines 1-2)
- [x] Base de données complète
- [x] Landing page professionnelle
- [x] Authentification Manus OAuth
- [ ] **Authentification multi-fournisseurs** (Google, Facebook, LinkedIn)
- [ ] **Messagerie instantanée** (Socket.io)

### Phase 2 : Fonctionnalités Sociales (Semaines 3-4)
- [x] Feed d'actualités
- [x] Système de posts/likes/commentaires
- [x] Groupes/communautés
- [ ] **Système de notifications** (push + email)
- [ ] **Recommandations personnalisées**

### Phase 3 : Optimisations (Semaines 5-6)
- [ ] **Gestion des contenus** (CMS intégré)
- [ ] **Analytics** (Google Analytics, Mixpanel)
- [ ] **Performance** (caching, CDN)
- [ ] **Modération** (système de signalement)

### Phase 4 : Monétisation (Semaines 7-8)
- [ ] **Abonnements premium** (Stripe)
- [ ] **Publicités ciblées**
- [ ] **Sponsorisation de groupes**

---

## 7. Processus de Déploiement Continu

### Comment ça Fonctionne

1. **Vous modifiez le code** dans votre IDE (VS Code, Cursor, JetBrains)
2. **Vous committez et poussez** vers GitHub :
   ```bash
   git add .
   git commit -m "Ajouter nouvelle fonctionnalité"
   git push origin main
   ```
3. **GitHub Actions se déclenche** automatiquement
4. **Azure redéploie** votre application en production
5. **Votre site est à jour** en 2-3 minutes

### Vérifier le Statut du Déploiement

**Sur GitHub :**
1. Allez dans votre repository
2. Cliquez sur **Actions**
3. Vous voyez le statut du déploiement en cours

**Sur Azure :**
1. App Service → **Deployment Center**
2. Vous voyez l'historique des déploiements

---

## 8. Commandes Utiles

```bash
# Développement local
pnpm dev

# Tests
pnpm test

# Build production
pnpm build

# Déployer (push vers GitHub, Azure se charge du reste)
git push origin main

# Voir les logs Azure
az webapp log tail --resource-group claudine-rg --name claudine-app
```

---

## 9. Support & Ressources

- **Documentation Manus** : https://docs.manus.im
- **Documentation Azure** : https://docs.microsoft.com/azure
- **Documentation Node.js** : https://nodejs.org/docs
- **Socket.io** : https://socket.io/docs

---

**Besoin d'aide ?** Contactez le support Manus : https://help.manus.im
