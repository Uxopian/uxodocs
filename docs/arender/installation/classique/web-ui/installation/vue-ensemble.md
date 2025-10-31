# Installation Web-UI - Vue d'ensemble

Guide d'installation du serveur Web-UI ARender pour l'interface utilisateur et les connecteurs GED.

## Prérequis

- Serveur de rendition ARender installé et fonctionnel
- Java JDK 11/17/21
- Base de données (PostgreSQL recommandé)
- Serveur d'applications ou conteneur web

## Types d'installation

### Installation standalone
- Serveur Web-UI indépendant
- Configuration via fichiers YAML/Properties
- Adapté pour la plupart des déploiements

### Installation intégrée GED
- Déploiement dans l'environnement GED existant
- Configuration spécialisée par plateforme
- Intégration SSO native

## Architecture recommandée

```
[Load Balancer] → [Web-UI Servers] → [Rendition Servers]
                         ↓
                   [GED Platform]
                         ↓
                    [Documents]
```

## Étapes d'installation

1. **Préparation** : Prérequis et environnement
2. **Installation** : Déploiement du serveur Web-UI
3. **Configuration** : Paramétrage de base
4. **Connecteur GED** : Configuration spécifique
5. **Tests** : Validation fonctionnelle
6. **Production** : Mise en service

Consultez les guides spécifiques à votre plateforme GED pour des instructions détaillées.