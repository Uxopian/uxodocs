# Alfresco - Vue d'ensemble

ARender s'intègre nativement avec Alfresco pour offrir une expérience de visualisation avancée.

## Modes d'intégration

### Alfresco Share
- Intégration dans l'interface Share existante
- Remplacement du visualiseur par défaut
- Configuration via modules AMP

### Alfresco Content App (ACA)
- Application Angular moderne
- Intégration via extensions
- Interface utilisateur optimisée

## Versions supportées

- Alfresco Community 6.x, 7.x, 23.x
- Alfresco Enterprise 6.x, 7.x, 23.x
- Alfresco Cloud Service (ACS)

## Architecture

```
[ACA/Share] → [ARender Web-UI] → [ARender Rendition] 
      ↓              ↓
[Alfresco Repository] → [Documents]
```

## Fonctionnalités

- Visualisation haute fidélité
- Annotations collaboratives
- Support multi-formats
- Intégration SSO
- Audit complet

## Guides d'installation

- [Alfresco Share](./in-share.md)
- [Alfresco Content App](./aca/)