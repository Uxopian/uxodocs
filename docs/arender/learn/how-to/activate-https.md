---
title: Activer la connexion SSL
---

Pour pouvoir utiliser une connexion sécurisée vers la rendition depuis
ARender, vous devrez modifier certains paramètres sur le serveur de
rendition et le serveur ARender.

```xml
<!-- Commentaire nettoyé -->
```
**Vous ne pourrez pas utiliser la connexion en http et en
https en même temps.**

## Du côté ARender

Ajouter les lignes suivantes dans votre fichier :


```cfg
arender.server.rendition.hosts=https://NOM_HÔTE_RENDITION_:PORT_RENDITION/
arender.rest.ssl.custom.use=true
```


## Du côté Rendition

Copier les fichiers se trouvant dans
"*VOTRE_DOSSIER_RENDITION/secure-mode-properties/*" vers le dossier
modules, afin d'écraser l'existant.
