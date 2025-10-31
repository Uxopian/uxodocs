---
title: ARender v2023.11.0 – Notes de version
---

> **Note de mise à jour :** consultez [v2023.11.0](/fr/releases/release-notes/v2023.11.0/).

## Depuis la version 2023.10.0

Aucun changement architectural ou de configuration.

## Produit

### Changements techniques

- PDFOwl : 1.24-15 à 1.24-17

## Important

### Régression dans l'équilibrage de charge interne d'ARender (Versions 2023.0.0 - 2023.11.0)

Une régression a été identifiée dans les versions d'ARender de 2023.0.0 à 2023.11.0 (incluses) affectant l'équilibrage de charge interne lors de l'utilisation de plusieurs URLs de rendu avec la propriété ```arender.server.rendition.hosts```.

Ce problème sera résolu dans la version 2023.12.0.

### Solution de contournement (si la mise à niveau n'est pas possible)

Ajoutez le bean Spring suivant :

**Pour ARender Web-UI (WAR) :**


```xml
**
**
```


**Pour ARender Web-UI (JAR) :**


```xml
**
**
```

