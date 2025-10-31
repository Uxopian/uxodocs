---
title: Enlever l'arborescence des documents
---

Une nouvelle servlet est déployée permettant d'enlever l'arborescence des documents.
Un fichier Json est retourné et liste chaque page des documents enfants sans les hiérarchiser. 

Exemple : 
``` json
[
  "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/1/1/1|0|612.0",
  "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/1/1/2|0|612.0",
  "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/2|0|612.0",
  "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/3|0|841.0",
  "b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9MTFjYmE0YzQtMzUzNy00OWI4LTg2MGEtZjdiNjU4NzU3MjJj/1/3|1|595.0"
]
```



## Requête 

Cette fonctionnalité est accessible via la servlet : **flatDocumentLayout**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/flatDocumentLayout?uuid=docuuid'
```


## Réponse de la servlet

Un fichier Json est renvoyé avec les documents enfants du document initial sans leur arborescence.
