---
title: Document builder
---

### Interagir avec le documentBuilder

- Object: getARenderJS().getDocumentBuilder()

    | Fonction | Description                            |
    | -------- | -------------------------------------- |
    | close()  | Ferme le découpeur de documents        |
    | open()   | Ouvre le découpeur de documents        |
    | reset()  | Remet à zéro le découpeur de documents |

### S'abonner à la sauvegarde de document découpé

- Object: getARenderJS().getDocumentBuilder()

    | Fonction                                          | Description                                                                           | Arguments                                                                                                                                   |
    | ------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
    | registerNotifyAlterDocumentContentEvent(callback) | Enregistre une fonction callback à appeler en cas de sauvegarde d'un document découpé | **callback:** La fonction callback à appeler                                                                                                |
    | registerSubmitAlterDocumentContentEvent(callback) | Enregistre une fonction callback à appeler en cas de demande de creation de document  | **callback:** La fonction callback à appeler                                                                                                |
    | getSubmittedAlterDocumentContentDescription(obj)  | Récupère la description du contenu du document modifié                                | **obj:** l'objet SubmitAlterDocumentContentEvent source                                                                                     |
```xml
    | getDocumentMetadata(desc,index)                   | Extrait l'object DocumentMetadata de l'objet source AlterContentDescription           | <!-- Commentaire nettoyé --><!-- Commentaire nettoyé -->  |
```
    | getResultDocumentId(obj)                          | Récupère le documentId qui résulte du découpage de document                           | **obj:** l'événement qui a été envoyé lorsque l'opération altercontent a été effectuée                                                      |


- Object: getARenderJS().getDocumentMetadata()

    | Fonction                                          | Description                                                | Arguments                                                                                                                                                                        |
    | ------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
```xml
    | addDocumentMetadata(metadata, key, value)         | Ajoute une metadata à un objet documentMetadata            | <!-- Commentaire nettoyé --><!-- Commentaire nettoyé --> |
```


``` javascript
function arenderjs_init(arenderjs_)
<!-- Expression supprimée -->;
                });
  arenderjs_.getDocumentBuilder()
                .registerNotifyAlterDocumentContentEvent(function(obj)<!-- Expression supprimée -->;
                });
}

function armt_onSubmitAlterDocumentContentEvent(arenderjs_,obj)
<!-- Commentaire nettoyé -->

function armt_onNotifyAlterDocumentContentEvent(arenderjs_,obj)
<!-- Commentaire nettoyé -->
```

