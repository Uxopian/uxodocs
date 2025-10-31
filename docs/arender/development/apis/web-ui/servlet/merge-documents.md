---
title: Fusionner des documents
---

ARender met à disposition un moyen de fusionner plusieurs documents en
un PDF via une servlet.
L'UUID du nouveau document (composé de la fusion de ceux envoyés en paramètre) sera retourné.

## Requête

Cette fonctionnalité est utilisable via la servlet :
**mergeDocumentsServlet**.

Elle est utilisable en POST et en GET

### Exemple d'utilisation

Ci-dessous, un exemple avec des documents accessibles via URL. Cette
fonctionnalité est bien-sûr utilisable pour n'importe quel type de
connecteur (FileNet, Alfresco etc...).

``` bash
curl --data "url=../../samples/arender.pdf&url=../../samples/fw4.pdf" http://<!-- Commentaire nettoyé -->/ARender/arendergwt/mergeDocumentsServlet?url=../../samples/arender.pdf&url=../../samples/fw4.pdf&url=../../samples/arender-en.pdf'
```

## Réponse de la servlet

La servlet retourne l'UUID du document fusionné et son nombre de pages.


``` javascript
{"uuid":"b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0","nbPages":"32"}
```


Ici l'UUID est : b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0.

Le nombre de page est 32.

Une fois la requête exécutée, le document fusionné est dans le cache
ARender et est visualisable via l'URL ci-dessous :

> `http://\{arender_host\}/ARender/?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0`

Il est même téléchargeable via :

> `http://\{arender_host\}/ARender/arendergwt/downloadServlet?uuid=b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0&title=DocumentTitle&type=INITIAL`
