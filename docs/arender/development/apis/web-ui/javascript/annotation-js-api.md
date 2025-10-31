---
title: Annotations
description: API JavaScript pour les annotations ARender
sidebar_position: 2
keywords: ["configuration", "js", "javascript", "api"]
---

# Annotations

## S'abonner à l'évènement d'ajout d'annotation

- Objet: getARenderJS().getAnnotationJSAPI()

| Fonction                                     | Description                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| registerNotifyAnnotationAddedEvent(callback) | Enregistre une fonction callback qui sera appelée à l'ajout d'une annotation.  |

```js
 /*
 * S'abonner à l'évènement d'ajout d'une annotation
 *
 * @param {string} documentId - ID du document
 * @param {string} annotation - Le json de l'annotation ajoutée au document
 * @param {boolean} isFromDocumentParsing - True si l'annotation ajoutée provient de l'extraction des informations du document
 */
getARenderJS().getAnnotationJSAPI().registerNotifyAnnotationAddedEvent(function(documentId, annotation, isFromDocumentParsing) {
  console.log("Annotation added. DocumentId " + documentId + " annotation: " + annotation + " isFromDocumentParsing: " + isFromDocumentParsing);
});
```

## S'abonner à l'évènement de suppression d'annotation

- Objet: getARenderJS().getAnnotationJSAPI()

| Fonction                                       | Description                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| registerNotifyAnnotationDeletedEvent(callback) | Enregistre une fonction callback qui sera appelée à la suppression d'une annotation.  |