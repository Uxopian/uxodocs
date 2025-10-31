# Vue d'ensemble - Web-UI

Le serveur Web-UI d'ARender fournit l'interface utilisateur et gère l'intégration avec les systèmes de gestion documentaire (GED).

## Rôle du Web-UI

### Fonctionnalités principales
- **Interface utilisateur** : Application web moderne pour la visualisation
- **Connecteurs GED** : Intégration avec Alfresco, IBM FileNet, M-Files
- **Authentification** : Gestion des utilisateurs et sessions
- **API REST** : Services pour applications tierces

### Architecture
```
[Navigateur] → [Web-UI Server] → [Rendition Server]
                     ↓
                [GED Platform]
```

## Connecteurs supportés

### Alfresco
- Alfresco Share
- Alfresco Content App (ACA)

### IBM FileNet
- Content Navigator (ICN)
- WebSphere Application Server
- Apache Tomcat

### M-Files
- Intégration native M-Files
- Architecture moderne recommandée

## Prochaines étapes

Choisissez votre connecteur :
- [Installation générale](./installation/)
- [Configuration](./configuration.md)
- [Alfresco](./alfresco/)
- [IBM FileNet](./ibm-filenet/)
- [M-Files](./m-files/)