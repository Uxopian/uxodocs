---
title: Santé du serveur
---

Une nouvelle servlet est déployée permettant d'afficher l'état de santé du serveur.

## Requête 

Cette fonctionnalité est accessible via la servlet : **healthRecordsServlet**

La requête est utilisable uniquement en GET.


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/health/records?check=scope'
```

* check : (optionnel)
    * SELF : renvoie la page HTML même si aucun service n'est complet
    * RENDITION : envoie une erreur si aucune service n'est complet

## Réponse de la servlet

Une page HTML est affichée avec les différents services. Pour chacun, le port, l'état et la disponibilité du service sont affichés.