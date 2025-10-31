---
title: Performance serveur / modification serveur
---

## Afficher les performances serveur

Une servlet est déployée permettant d'afficher les performances de chaque serveur.
Ces performances seront envoyés dans un fichier, si le paramètre `format` est vide, non envoyé dans l'URL ou égal à `HTML`, le fichier sera un fichier HTML. 
Sinon le fichier sera un fichier JSON. 

### Requête 

Cette fonctionnalité est accessible via la servlet : **weatherServlet**

La requête est utilisable uniquement en GET


#### Exemple d'utilisation

``` bash
curl -X GET 'http://<!-- Commentaire nettoyé -->" 'http://<arender_host>/ARender/arendergwt/weatherServlet'
```
* arender_rendition_host : l'adresse du serveur à ajouter.

### Réponse de la servlet

Pour s'assure de l'ajout du serveur, il est possible d'utiliser la requête GET qui vous donnera les performances de chacun de vos serveurs.
