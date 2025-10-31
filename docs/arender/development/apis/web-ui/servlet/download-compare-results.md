---
title: Télécharger les résultats de la comparaison de documents
---

Une nouvelle servlet est déployée permettant de télécharger les résultats de la comparaison de deux documents.

## Requête 

Cette fonctionnalité est accessible via la servlet : **downloadDocumentWithCompareResultsServlet**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/downloadServlet/mergedWithCompareResult?left=doc1UUID&right=doc2UUID'
```

* left : l'uuid du premier document à comparer
* right : l'uuid du second document à comparer

## Réponse de la servlet

Un document est téléchargé. Il correspond aux résultats de la comparaison entre le doc1 et le doc2. 
En vert : le texte commun aux deux documents sera surligné 
En rouge : le texte différents entre les deux documents sera surligné 