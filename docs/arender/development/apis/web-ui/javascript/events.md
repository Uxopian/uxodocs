---
title: Évènements
---

## S'abonner aux erreurs de chargement des documents

- Objet : getARenderJS()

    | Fonction                                  | Description                                                                             | Arguments                                                      |
    | ----------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
    | registerNotifyLoadingErrorEvent(callback) | Enregistre une fonction callback à appeler en cas d'erreur de chargement des documents  | **callback :** la fonction callback à appeler en cas d'erreur  |


```js
// Subscribe a function to the errors
getARenderJS().registerNotifyLoadingErrorEvent(function(documentId,message) <!-- Expression supprimée -->;
});

// Loads the PDF reference document
// If an error occurs I am notified on the function defined before!
getARenderJS().loadDocument(
  "loadingQuery?url=http://www.arender.fr/pdf/pdf/PDFReference15_v5.pdf",
  function(id) <!-- Expression supprimée -->; }
);
```


## S'abonner à la fin du chargement des modules asynchrones ARender

- Objet : getARenderJS()

    | Fonction                                      | Description                                                                               | Arguments                                                             |
    | --------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | registerAllAsyncModulesStartedEvent(callback) | Enregistre une fonction callback à appeler en fin de chargement des modules asynchrones.  | **callback :** la fonction callback à appeler à la fin du chargement  |


```js
// Subscribe a function to the loading. When asynchronous modules are loaded I am notified
getARenderJS().registerAllAsyncModulesStartedEvent(function() <!-- Expression supprimée -->;
});
```


## S'abonner à un changement de page

- Object: getARenderJS()

| Function                                      | Description                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------- |
| registerNotifyPageChangeEvent(callback)       | Enregistre une fonction de rappel executée lorsqu'un changement de page est demandé |


``` javascript
// Je suis notifié d'une demande de changement de page
getARenderJS().registerNotifyPageChangeEvent(
  function(currentPage, pageCount, documentId) <!-- Expression supprimée -->
  }
);
```


## Préparer un événement de lancement de plugin ARender

- Objet : getARenderJS()

    | Fonction                                 | Description                                                                                  |
    | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
    | preparePluginEvent(key,value,pluginName) | Insère un couple (Key,Value) à la future URL du plugin ouvert dans ARender de nom pluginName |
    | clearPluginEvent(pluginName)             | Nettoie toute valeur potentiellement stockée (Key,Value) au plugin nommé pluginName          |
    | openPlugin(pluginName,openInMultiView)   | Ouvre le plugin pluginName dans ARender, en multiView ou non avec le booléen openInMultiView |

Ces fonctions permettent de préparer un événement d'ouverture de plugin
afin d'enrichir son lancement de manière contextualisée depuis ARender.

``` javascript
function arenderjs_init(ajs)
<!-- Commentaire nettoyé -->
```

## Interagir avec les ancres 

- Objet: getARenderJS()

    | Fonction                                                                                                          | Description                            |
    | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
    | askOpenAnchorModal(boolean isFromThumbPresenter, String documentId, float x, float y, float w, float h, int page) | Ouvre la popup de création des ancres  |
    
    * isFromThumbPresenter : si true, génère une ancre à partir de la vignette sélectionnée. Si false génère une ancre à  partir de la vue du document.
    * documentId : l'id du document
    * x : la position x de l'ancre
    * y : la position y de l'ancre
    * w : la largeur de l'ancre
    * h : la hauteur de l'ancre
    * page : le numéro de la page de l'ancre


``` javascript
// Créer une ancre à partir d'une vignette de la page 1 du document
getARenderJS().askOpenAnchorModal(true, "documentId", 44, 26, 25, 30, 0);
```

