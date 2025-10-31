---
title: Estampillage de documents
---

Cet extrait de code vous permet, en utilisant la dépendance ARender
arondor-arender-client-javarest, de communiquer avec les serveurs de
rendition afin de générer un PDF estampillé avec un tampon configuré au
préalable.

Dans cet exemple précis, nous allons donc mettre en place des tampons à
chaque page du document.

## Mise en place des variables

Ici, nous assumons que *data* contient les données binaires de votre
fichier que vous souhaitez utiliser comme base de l'estampillage.

``` java
RenditionRestClient client = new RenditionRestClient();
client.setAddress("http://localhost:8761");
// Assuming that this "data" contains your documentContent
InputStream data;
DocumentAccessor original = new DocumentAccessorByteArray(data);
```

## Chargement du documentAccessor

Ici, nous chargeons le documentAccessor et obtenons la version
*RENDERED* dans le cas où le document aurait eu besoin d'une conversion
avant son utilisation.

``` java
client.loadDocumentAccessor(original);
DocumentAccessor accessorConverted = client.getDocumentAccessor(original.getUUID(),
        DocumentAccessorSelector.RENDERED);
```

## Obtention du nombre de pages du document

``` java
DocumentLayout layout = client.getDocumentLayout(accessorConverted.getUUID());
int nbPages = -1;
if (layout instanceof DocumentPageLayout)
<!-- Commentaire nettoyé -->
else
{
    // send error
    throw ...
}
```

## Mise en place du style des tampons

``` java
// configure here the ARender stamp style
AnnotationStyle annotationStyle = new AnnotationStyle();

annotationStyle.setFontSize(80);
annotationStyle.setFontColor("rgb(0,0,255)");
annotationStyle.setBackgroundColor("none");
annotationStyle.setBorderWidth(0);
Map<String, String> styleMap = new HashMap<String, String>();
styleMap.put("fontSize", annotationStyle.getFontSize() + "");
styleMap.put("fontColor", annotationStyle.getFontColor() + "");
styleMap.put("borderWidth", annotationStyle.getBorderWidth() + "");
styleMap.put("borderColor", annotationStyle.getBorderColor() + "");
styleMap.put("backgroundColor", annotationStyle.getBackgroundColor() + "");
String newAppearance = "";
for (String key : styleMap.keySet())
<!-- Commentaire nettoyé -->
// the appearance for the ARender stamp is now built
```

## Mise en place de la liste d'annotations à envoyer

``` java
// now we prepare the list of stamps to send the rendition server
List<!-- Commentaire nettoyé -->();
for (int i = 0; i <!-- Commentaire nettoyé -->
```

## Mise en place de la tache de conversion du PDF en PDF altéré

``` java
AlterContentDescriptionWithAnnotations alterContent = new AlterContentDescriptionWithAnnotations();
 set annotations
alterContent.setAnnotations(stamps);
 set documentId
List<!-- Commentaire nettoyé -->();
sourceDocumentIdList.add(accessorConverted.getUUID());
DocumentId renderedDoc = client.alterDocumentContent(sourceDocumentIdList, alterContent);
```

## Obtention du document final

``` java
DocumentAccessor accessorFinalDocument = client.getDocumentAccessor(renderedDoc,
        DocumentAccessorSelector.RENDERED);
```

Les données binaires du document final produit se trouvent dans :

``` java
accessorFinalDocument.getInputStream();
```
