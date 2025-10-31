---
title: Télécharger/charger un document sur le serveur
---

## Télécharger

Une servlet est déployée permettant de télécharger un document sur le serveur. 

### Requête 

Cette fonctionnalité est accessible via la servlet : **uploadServlet**

La requête est utilisable en GET


#### Exemple d'utilisation

``` bash
curl -X GET 'http://<!-- Commentaire nettoyé -->/ARender/arendergwt/uploadServlet"
```
* yourFile : le titre de votre document

### Réponse de la servlet

Un nouveau UUID est créé à partir du document envoyé dans la requête, pour être charger sur le serveur. 
Ce nouvel id est affiché.