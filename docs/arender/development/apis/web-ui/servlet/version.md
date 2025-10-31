---
title: Version
---

Depuis la version 2023.6.0, une nouvelle servlet a été introduite pour afficher la version ARender.

## Requête 

Cette fonctionnalité est accessible via la servlet: **VersionServlet**

Utilisable avec la méthode HTTP **GET**

### Exemple de requête

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/version'
```

## Réponse de la servlet

La version déployée d'ARender au format texte brut
