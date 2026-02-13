# Architecture du Site SocialMatch Platform

## Vue d'Ensemble

SocialMatch est une plateforme de rencontre moderne et sécurisée conçue pour faciliter les connexions authentiques entre utilisateurs. L'architecture du site est organisée autour de trois piliers principaux : **la vitrine publique**, **l'espace utilisateur authentifié** et **l'administration**.

---

## 1. Structure Générale du Site

### 1.1 Zones Publiques (Accessibles sans authentification)

Les pages publiques permettent aux visiteurs de découvrir la plateforme sans créer de compte.

| Page | URL | Objectif | Contenu |
|------|-----|----------|---------|
| **Landing Page** | `/` | Présenter la plateforme | Hero section, features, testimonials, CTA |
| **Conditions Générales de Vente** | `/cgv` | Informations légales | Conditions commerciales, responsabilités |
| **Conditions Générales d'Utilisation** | `/cgu` | Règles d'utilisation | Règles de comportement, modération |
| **Formulaire de Contact** | `/contact` | Support utilisateur | Formulaire de contact, FAQ |
| **Page 404** | `/404` | Erreur | Message d'erreur, liens de navigation |

### 1.2 Zones Protégées (Accessibles après authentification)

Les pages protégées nécessitent une authentification 2FA sécurisée.

| Page | URL | Objectif | Fonctionnalités |
|------|-----|----------|-----------------|
| **Dashboard** | `/dashboard` | Accueil utilisateur | Statistiques, raccourcis, notifications |
| **Profil** | `/profile/edit` | Gestion du profil | Édition bio, photo, préférences |
| **Découverte** | `/discover` | Système de matching | Cartes de profils, likes, filtres |
| **Messagerie** | `/messages` | Communication | Conversations, messages, notifications |

---

## 2. Flux Utilisateur

### 2.1 Parcours Visiteur → Utilisateur

```
Visiteur
   ↓
Landing Page (/)
   ↓
Clic "Se connecter" / "Découvrir"
   ↓
OAuth Manus (authentification)
   ↓
Création/Édition Profil (/profile/edit)
   ↓
Dashboard (/dashboard)
   ↓
Découverte (/discover) ou Messagerie (/messages)
```

### 2.2 Flux Principal d'Utilisation

```
Dashboard (/dashboard)
   ├→ Découverte (/discover)
   │   ├→ Like/Unlike profils
   │   └→ Créer matches
   │
   ├→ Messagerie (/messages)
   │   ├→ Lire conversations
   │   └→ Envoyer messages
   │
   └→ Profil (/profile/edit)
       ├→ Éditer bio
       ├→ Changer photo
       └→ Gérer préférences
```

---

## 3. Composants Clés

### 3.1 Navigation Principale

**Header (Sticky)**
- Logo SocialMatch avec lien vers `/`
- Menu de navigation (Desktop)
- Bouton utilisateur / Déconnexion
- Responsive (Hamburger menu sur mobile)

**Footer**
- Liens rapides (CGV, CGU, Contact)
- Réseaux sociaux
- Copyright

### 3.2 Authentification

**Manus OAuth**
- Connexion sécurisée via Manus
- Création de compte automatique
- Session persistante avec JWT

**2FA (Two-Factor Authentication)**
- Configuration optionnelle TOTP
- Codes de secours
- Vérification lors de la connexion

### 3.3 Système de Matching

**Page Découverte (/discover)**
- Affichage de cartes de profils
- Système de like/unlike
- Filtres (âge, localisation, préférences)
- Historique des likes

**Création de Matches**
- Matching bidirectionnel (like mutuel)
- Notification utilisateur
- Accès à la messagerie

### 3.4 Messagerie

**Page Messagerie (/messages)**
- Liste des conversations
- Interface de chat
- Historique des messages
- Indicateurs de présence (futur)

**Architecture WebSocket (Futur)**
- Messages temps réel
- Notifications push
- Synchronisation multi-appareils

### 3.5 Gestion de Profil

**Page Profil (/profile/edit)**
- Édition bio et description
- Upload de photo
- Sélection de préférences
- Paramètres de confidentialité
- Configuration 2FA

---

## 4. Design et Identité Visuelle

### 4.1 Palette de Couleurs

| Couleur | Code | Utilisation |
|---------|------|-------------|
| **Primaire** | #5C0029 | Boutons, accents, headers |
| **Secondaire** | #F2ED6F | Highlights, accents texte |
| **Tertiaire** | #F3E8EE | Fonds, cartes légères |
| **Neutre** | #F5E6D3 | Fonds principaux |
| **Noir** | #1A1A1A | Texte, contrastes |

### 4.2 Typographies

| Élément | Police | Utilisation |
|---------|--------|-------------|
| **Titres** | Abril Fatface | H1, H2, H3, logos |
| **Texte** | Nunito | Corps de texte, labels |

### 4.3 Images de Fond

- **Landing Hero** : Gradient beige/marron/or avec cœurs
- **Discover Section** : Gradient chaud avec motifs de matching
- **Messages Section** : Gradient rose/beige avec icônes de conversation

---

## 5. Architecture Technique

### 5.1 Stack Technologique

**Frontend**
- React 19 avec Vite
- TailwindCSS 4 pour le styling
- Shadcn/UI pour les composants
- tRPC pour la communication backend

**Backend**
- Express.js (Node.js)
- tRPC pour les procédures RPC
- Drizzle ORM pour la base de données

**Base de Données**
- MySQL avec 11 tables
- Gestion des utilisateurs, profils, messages, matches

**Authentification**
- Manus OAuth pour la connexion
- JWT pour les sessions
- TOTP pour la 2FA

### 5.2 Flux de Données

```
Frontend (React)
   ↓
tRPC Client
   ↓
Backend (Express + tRPC)
   ↓
Drizzle ORM
   ↓
MySQL Database
```

---

## 6. Pages Détaillées

### 6.1 Landing Page (/)

**Sections**
1. **Hero** : Titre, sous-titre, CTA
2. **Features** : 3-4 fonctionnalités principales
3. **Testimonials** : Avis utilisateurs
4. **Statistics** : Nombres clés (utilisateurs, matches)
5. **CTA Final** : Appel à l'action "Commencer"
6. **Footer** : Liens, réseaux sociaux

**Design**
- Fond avec images générées (beige/marron/or)
- Titre en Abril Fatface
- Boutons en marron (#5C0029)
- Responsive design

### 6.2 Dashboard (/dashboard)

**Sections**
1. **Header** : Bienvenue utilisateur
2. **Statistiques** : Profils vus, likes reçus, matches
3. **Raccourcis** : Boutons vers Découverte, Messagerie
4. **Notifications** : Nouveaux matches, messages
5. **Suggestions** : Profils recommandés

**Design**
- Layout avec sidebar (Desktop)
- Cartes avec statistiques
- Gradients marron/or

### 6.3 Découverte (/discover)

**Sections**
1. **Filtres** : Âge, localisation, préférences
2. **Cartes de Profils** : Affichage principal
3. **Actions** : Like, Unlike, Passer
4. **Historique** : Profils vus

**Design**
- Cartes avec photos de profil
- Boutons d'action (cœur, croix)
- Animation de swipe (futur)

### 6.4 Messagerie (/messages)

**Sections**
1. **Liste de Conversations** : Sidebar
2. **Interface de Chat** : Messages et input
3. **Informations de Profil** : Détails du match

**Design**
- Deux colonnes (Desktop)
- Messages avec timestamps
- Input de message en bas

### 6.5 Profil (/profile/edit)

**Sections**
1. **Photo de Profil** : Upload et aperçu
2. **Bio** : Texte libre
3. **Préférences** : Filtres de matching
4. **Sécurité** : Configuration 2FA
5. **Confidentialité** : Paramètres de visibilité

**Design**
- Formulaires avec validation
- Aperçu en temps réel
- Bouton de sauvegarde

### 6.6 CGV et CGU

**Structure**
- Sections numérotées
- Texte légal complet
- Liens de navigation

**Design**
- Fond blanc avec accents marron
- Typographie lisible
- Sections bien organisées

---

## 7. Flux de Données Clés

### 7.1 Création de Profil

```
Utilisateur
   ↓
Remplit formulaire (/profile/edit)
   ↓
Upload photo (S3)
   ↓
Sauvegarde dans DB
   ↓
Profil visible aux autres utilisateurs
```

### 7.2 Système de Matching

```
Utilisateur A like Utilisateur B
   ↓
Enregistrement dans DB (likes)
   ↓
Vérification like mutuel
   ↓
Si mutuel : Création match
   ↓
Notification aux deux utilisateurs
   ↓
Accès à la messagerie
```

### 7.3 Messagerie

```
Utilisateur A envoie message
   ↓
Message sauvegardé en DB
   ↓
Notification Utilisateur B
   ↓
Utilisateur B reçoit message
   ↓
Peut répondre
```

---

## 8. Sécurité

### 8.1 Authentification

- **OAuth Manus** : Connexion sécurisée
- **2FA TOTP** : Authentification à deux facteurs
- **JWT** : Tokens de session sécurisés
- **Logs d'audit** : Enregistrement des connexions

### 8.2 Protection des Données

- **Chiffrement** : Mots de passe hashés
- **HTTPS** : Communication sécurisée
- **RGPD** : Conformité légale
- **Validation** : Vérification des entrées utilisateur

### 8.3 Modération

- **Système de signalement** : Signaler les utilisateurs abusifs
- **Suppression de contenu** : Modération des profils
- **Bannissement** : Exclusion des utilisateurs violant les règles

---

## 9. Performance et Optimisation

### 9.1 Frontend

- **Code splitting** : Chargement lazy des pages
- **Images optimisées** : Compression et formats modernes
- **Caching** : Mise en cache des données
- **CDN** : Distribution des assets

### 9.2 Backend

- **Pagination** : Limitation des résultats
- **Indexation DB** : Requêtes rapides
- **Compression** : Gzip pour les réponses
- **Monitoring** : Suivi des performances

---

## 10. Évolutions Futures

### 10.1 Court Terme

- **WebSocket** : Messagerie temps réel
- **Notifications Push** : Alertes utilisateur
- **Vérification d'Identité** : Upload de documents

### 10.2 Moyen Terme

- **Système de Réputation** : Notes et avis
- **Événements** : Rencontres organisées
- **Abonnements Premium** : Fonctionnalités avancées

### 10.3 Long Terme

- **IA Matching** : Recommandations intelligentes
- **Vidéo Chat** : Communication vidéo
- **Intégration Réseaux Sociaux** : Import de profils

---

## 11. Métriques et Analytics

### 11.1 Métriques Clés

| Métrique | Objectif | Suivi |
|----------|----------|-------|
| **Utilisateurs Actifs** | Croissance | Dashboard |
| **Taux de Matching** | Engagement | Analytics |
| **Temps Moyen de Session** | Rétention | Analytics |
| **Taux de Conversion** | Inscription | Analytics |

### 11.2 Outils

- **Google Analytics** : Suivi du trafic
- **Sentry** : Monitoring des erreurs
- **Azure Monitor** : Santé de l'infrastructure

---

## Conclusion

L'architecture de SocialMatch est conçue pour être **scalable**, **sécurisée** et **user-friendly**. Chaque page et composant a été pensé pour offrir une expérience fluide et engageante, tout en maintenant les plus hauts standards de sécurité et de confidentialité.

La plateforme est prête pour un déploiement en production sur Azure avec votre domaine IONOS, et peut facilement évoluer pour accueillir de nouvelles fonctionnalités et utilisateurs.
