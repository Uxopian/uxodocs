---
title: Préparer l'ouverture un document externe
---

Une nouvelle servlet est déployée permettant de générer un UUID.

Cet UUID représentent les paramètres de l'URL interprétés par le connecteur. Selon cette configuration l'UUID sera en base64 ou chiffré.


```cfg
# document id bean names, values are documentIdGenerator (base64) and encryptedDocumentIdGenerator (chiffré)
arender.documentid.generator.beanName=documentIdGenerator
```


## Requête 

Cette fonctionnalité est accessible via la servlet : **openExternalDocument**

La requête est utilisable uniquement en GET


### Exemple d'utilisation

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/openExternalDocument?url=docURL'
```

## Réponse de la servlet

A partir de l'URL envoyé en paramètre, un UUID chiffré va être généré.