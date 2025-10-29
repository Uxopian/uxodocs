---
title: "APIs"
---

# APIs FlowerDocs

FlowerDocs expose plusieurs types d'APIs pour répondre aux différents besoins d'intégration et de personnalisation.

## JavaScript API (JSAPI)

L'API JavaScript permet d'enrichir l'interface FlowerDocs GUI avec vos propres scripts côté client.

### Cas d'usage
- **Personnalisation de l'interface** : adaptation de l'ergonomie
- **Validation métier** : contrôles personnalisés sur les formulaires
- **Intégrations tierces** : appels vers des services externes
- **Automatisation** : scripts pour simplifier les tâches récurrentes

### Fonctionnalités principales
- **Gestion des documents** : création, modification, suppression
- **Interface utilisateur** : popups, formulaires, navigation
- **Recherche** : requêtes personnalisées
- **Événements** : réaction aux actions utilisateur

## Core API

Les APIs REST et SOAP du serveur FlowerDocs Core permettent l'intégration avec les systèmes tiers.

### APIs REST
- **Format** : JSON
- **Authentification** : Token-based
- **Documentation** : Swagger/OpenAPI
- **Versioning** : Support des versions multiples

### APIs SOAP
- **Format** : XML
- **WSDL** : Disponible pour chaque service
- **Sécurité** : WS-Security supporté
- **Compatibilité** : Standards WS-*

### Services disponibles
- **Documents** : CRUD et gestion des contenus
- **Recherche** : Moteur de recherche avancé
- **Utilisateurs** : Gestion des comptes et permissions
- **Workflows** : Gestion des processus métier

## Plugins API

Le système de plugins permet d'étendre les fonctionnalités de FlowerDocs.

### Types de plugins
- **Connecteurs** : intégration avec des systèmes externes
- **Transformations** : traitement automatique des documents
- **Authentification** : mécanismes d'auth personnalisés
- **Notifications** : canaux de notification additionnels

### Architecture
- **Interface Java** : implémentation de contrats définis
- **Lifecycle** : gestion automatique du cycle de vie
- **Configuration** : paramétrage via propriétés
- **Hot-reload** : rechargement à chaud des plugins

## Sécurité des APIs

### Authentification
- **OAuth 2.0** : Standard pour l'autorisation
- **JWT** : Tokens JSON Web Token
- **API Keys** : Clés d'API pour les services
- **LDAP** : Intégration avec l'annuaire

### Autorisation
- **RBAC** : Contrôle d'accès basé sur les rôles
- **Scopes** : Limitation fine des permissions
- **Rate limiting** : Protection contre les abus
- **Audit** : Traçabilité des appels d'API

## Bonnes pratiques

### Performance
- **Pagination** : pour les listes importantes
- **Cache** : utilisation des en-têtes HTTP
- **Compression** : gzip pour réduire la bande passante
- **Async** : appels asynchrones quand possible

### Fiabilité
- **Retry** : mécanismes de nouvelle tentative
- **Timeout** : délais d'attente appropriés
- **Monitoring** : supervision des APIs
- **Logging** : journalisation détaillée