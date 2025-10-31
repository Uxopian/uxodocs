---
title: Créer son document accessor
---

En fonction du type de service que vous souhaitez utiliser, nous avons
peut-être déjà chez nous un connecteur pour ce type de service.
N'hésitez donc pas à venir vers nous en premier lieu.

Si vous préférez directement implémenter votre connecteur, il y aura
deux étapes à suivre:

Créer un parseur d'URL, qui va prendre de l'URL d'ARender les paramètres
nécessaires et créer ensuite le second composant dont vous aurez besoin
: le document accessor.



La méthode canParse retourne vrai si les paramètres contenus dans l'URL
d'ARender sont suffisants pour pouvoir parser le document.

La méthode parse doit parser les paramètre de l'URL et pousser un
DocumentAccessor en rendition, en voici un exemple:

``` java
List();
parameters.add(new URLDocumentIdParameter(URL_REQUEST_PARAMETER, url));
DocumentId documentId = DocumentIdFactory.getInstance().generate(parameters);
DocumentAccessor documentAccessor = new DocumentAccessorURL(url, documentId);
documentService.loadDocumentAccessor(documentAccessor);
return documentAccessor.getUUID();
```

Ici, au lieu d'un DocumentAcessorURL, vous mettrez votre propre document
accessor.



Les méthodes détaillées dans la documentation concernant les
DocumentAccessor sont très simples et parlent d'elles même et ne
devraient pas vous causer de soucis d'implémentation.

Une fois que vous avez développé votre couple Parser/Accessor vous serez
capable d'ajouter le Parser au fichier
*configurations/arender-custom-server.properties* de ARender Web-UI.

- Déclarer un nouveau bean de parser d'URL dans votre fichier
  *arender-custom-server-integration.xml * situé dans le répertoire
  *configurations* et ajouter cette référence à la liste des parser
  disponibles, en tête de liste du fichier
  *arender-custom-server.properties* :

- Exemple de définition du bean dans le fichier
    *arender-custom-server-integration.xml * :


```xml
        **
```


- Exemple de la configuration de la propriété afin de référencer le
    bean dans le fichier *configurations/arender-custom-server.properties*) :


```cfg
arender.server.url.parsers.beanNames=customUrlParser,DefaultURLParser,DocumentIdURLParser,FileattachmentURLParser,ExternalBeanURLParser,AlterContentParser,FallbackURLParser
```


Dans le scénario de création d'un Accessor/Parser nous vous recommandons
fortement de faire un project Maven et de modifier uniquement les
fichiers autorisés afin de ne pas écraser des modifications apportées
par les nouvelles versions.
