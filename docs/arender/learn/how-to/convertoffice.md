---
title: Office converter
---

Ce tutoriel présente un exemple d’utilisation d’ARender pour la
conversion d’un document Word en PDF. Pour cela, nous allons voir
comment exploiter l’API du serveur de rendition d’ARender qui est chargé
de convertir les documents en PDF et/ou de les transformer en images.

## Configuration

### Configuration Maven

Avant tout, il s’agit d’importer les dépendances à ARender qui sont
nécessaires pour cet exemple. Dans le cas d’un projet Maven, ajouter au
fichier pom.xml :

``` xml
<!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arondor-arender-common<!-- Commentaire nettoyé -->version_ARender<!-- Commentaire nettoyé -->jar<!-- Commentaire nettoyé -->compile<!-- Commentaire nettoyé -->
<!-- Commentaire nettoyé -->com.arondor.arender<!-- Commentaire nettoyé -->arender-rendition-rest-client<!-- Commentaire nettoyé -->version_ARender<!-- Commentaire nettoyé -->jar<!-- Commentaire nettoyé -->compile<!-- Commentaire nettoyé -->
```

### Configuration du DocumentService

Cette première étape consiste en la définition des informations
essentielles pour l’utilisation de l’API. L’objet DocumentService
encapsule la communication avec le serveur de rendition (qui peut être
distant).

``` java
RenditionRestClient client = new RenditionRestClient();
client.setRemoteTarget("http://localhost:8761/");
client.setMaxTries(3);
```

## Chargement du document

Le chargement du document sur le serveur de rendition est réalisé grâce
à l’appel de la méthode loadDocument(DocumentAccessor documentAccessor)
de l’interface DocumentService (que l’objet RenditionRestClient
implémente). Le paramètre fourni à cette méthode, le DocumentAccessor,
est un objet permettant au serveur d’accéder à un document (i.e son
contenu, ses méta-données…). Dans cet exemple, le document en question
est stocké sur le système de fichier local : nous instancions donc un
DocumentAccessorByteArray grâce au chemin du document à convertir.

``` java
String fileToConvertPath = "C:\\ARender_User\\Documents\\myWordDocument.docx";
FileInputStream fileInputStream = new FileInputStream(fileToConvertPath);
DocumentAccessor documentAccessor = new DocumentAccessorByteArray(fileInputStream);
client.loadDocumentAccessor(documentAccessor);
```

```xml
<!-- Commentaire nettoyé -->
```
Différentes implémentations du DocumentAccessor sont fournies
nativement par ARender. Mais cette interface reste un point d’extension
d’ARender qui en lui fournissant un accesseur approprié peut être
capable de récupérer un document dans n’importe quel système
d’information.
```xml
<!-- Commentaire nettoyé -->
```

### Récupération du document converti

Au sein d’un serveur de rendition, un document peut se trouver dans
différents états. Dans cet exemple, les états qui nous intéressent sont :

**Initial** : Correspond au document dans son état initial, i.e tel qu’il
a été chargé soit dans son format initial. 

**Rendered** : Correspond au
document rendered par le serveur de rendition. Pour cela, le document a
été converti en PDF. C’est donc celui que nous souhaitons récupérer
Ainsi différents accesseurs, implémentant l’interface DocumentAccessor,
sont stockés permettant d’accéder à ces différents états. L’énumération
DocumentAccessorSelector permet ainsi de récupérer le DocumentAccessor
approprié.

``` java
DocumentAccessor renderedDocumentAccessor = client.getDocumentAccessor(documentAccessor.getUUID(),DocumentAccessorSelector.RENDERED);
InputStream pdfDocumentInputStream = renderedDocumentAccessor.getInputStream();
```
