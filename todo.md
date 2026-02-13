# SocialMatch Platform - TODO

## Phase 1: Architecture & Base de Données
- [x] Concevoir et implémenter le schéma de base de données complet
  - [x] Tables utilisateurs (profils, préférences, statut)
  - [x] Tables d'authentification (sessions, tokens 2FA)
  - [x] Tables de messagerie (conversations, messages)
  - [x] Tables de matching (likes, matches, accords)
  - [x] Tables de logs (audit trail)
  - [x] Tables de captcha (validation)

## Phase 2: Interface Utilisateur - Landing Page & Vitrine
- [x] Concevoir et implémenter la landing page moderne
  - [x] Hero section avec CTA
  - [x] Sections de features
  - [x] Testimonials/Social proof
  - [x] Pricing (si applicable)
  - [x] Footer avec liens
- [x] Créer la page de vitrine/présentation
- [x] Navigation globale (header/menu)
- [x] Design système cohérent (couleurs, typographie, espacements)

## Phase 3: Authentification & Sécurité
- [x] Implémenter l'authentification Manus OAuth
- [x] Ajouter la 2FA (Two-Factor Authentication)
  - [x] Génération de codes TOTP
  - [x] Vérification des codes
  - [x] Backup codes
- [ ] Implémenter le captcha (reCAPTCHA ou alternative)
- [x] Système de logs d'authentification
- [x] Gestion des sessions sécurisées

## Phase 4: Profils & Onboarding
- [x] Page de création de profil utilisateur
  - [x] Formulaire d'inscription complet
  - [x] Upload de photo de profil
  - [x] Préférences de matching
  - [x] Bio et description
- [x] Page d'édition de profil
- [x] Validation des données utilisateur

## Phase 5: Système de Matching
- [x] Implémenter la logique de "like" (swipe/like)
- [x] Système de matching bidirectionnel
- [x] Page de découverte (cartes de profils)
- [ ] Historique des likes/matches
- [ ] Notifications de nouveaux matches

## Phase 6: Messagerie Instantanée
- [ ] Architecture WebSocket pour messages temps réel
- [x] Page de conversations
- [x] Interface de chat
- [ ] Historique des messages
- [ ] Notifications de nouveaux messages
- [ ] Indicateurs de présence en ligne

## Phase 7: Accord & Consentement
- [x] Système d'accord/contrat entre participants
- [ ] Page de conditions d'utilisation
- [ ] Consentement RGPD
- [ ] Signature électronique (si nécessaire)
- [ ] Historique des accords

## Phase 8: Formulaire de Contact
- [x] Page de contact
- [x] Formulaire avec validation
- [x] Intégration avec base de données
- [ ] Notification au propriétaire
- [ ] Réponse automatique à l'utilisateur

## Phase 9: Dashboard & Gestion
- [ ] Dashboard utilisateur
  - [ ] Statistiques personnelles
  - [ ] Gestion des préférences
  - [ ] Historique d'activité
- [ ] Admin panel (si nécessaire)
- [ ] Gestion des utilisateurs

## Phase 10: Tests & Optimisation
- [ ] Tests unitaires (Vitest)
- [ ] Tests d'intégration
- [ ] Tests de sécurité (2FA, captcha, authentification)
- [ ] Optimisation des performances
- [ ] Responsive design (mobile, tablet, desktop)

## Phase 11: Déploiement & Finalisation
- [ ] Configuration de production
- [ ] Checkpoint final
- [ ] Documentation
- [ ] Présentation au client
