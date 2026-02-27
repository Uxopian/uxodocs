---
title: Create Watermarked documents
sidebar_position: 9
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 16d9c95414f02744e7298236732605f4c8db2c6ab4fb17b75fcaae8b1291f532
---

This code snippet allows you, using the ARender jar dependency
arondor-arender-client-javarest, to communicate with rendition servers
in order to generate PDFs with annotations.

In this particular example, we will setup a repeated stamp annotation on
each page of the document in order to generate a watermarking.

## Variables setup

Here you will have to setup the address of the rendition server you are
targeting and the binary content of the original document you want to
watermark. We assume in this example that the data is stored into the
field _data_ .

```java
RenditionRestClient client = new RenditionRestClient();
client.setAddress("http://localhost:8761");
// Assuming that this "data" contains your documentContent
InputStream data;
DocumentAccessor original = new DocumentAccessorByteArray(data);
```

## Loading of the documentAccessor

In this code, we load the documentAccessor and get the _RENDERED_
version of it in case a conversion is needed on the rendition side.

```java
client.loadDocumentAccessor(original);
DocumentAccessor accessorConverted = client.getDocumentAccessor(original.getUUID(),
        DocumentAccessorSelector.RENDERED);
```

## Obtaining the number of pages

```java
DocumentLayout layout = client.getDocumentLayout(accessorConverted.getUUID());
int nbPages = -1;
if (layout instanceof DocumentPageLayout)

    nbPages = ((DocumentPageLayout) layout).getPageCount();

else

    // send error
    throw ...

```

## Setup the annotation style for stamps

```java
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
for (String key: styleMap.keySet())

    newAppearance += key + ":" + styleMap.get(key) + ";";

// the appearance for the ARender stamp is now built
```

## Setup the list of stamps to send

```java
// now we prepare the list of stamps to send the rendition server
List<Annotation> stamps = new ArrayList<Annotation>();
for (int i = 0; i < nbPages; i++)

    StampElemType annotation = new StampElemType();
    annotation.setDocumentId(DocumentIdFactory.getInstance().generate());
    annotation.setContents("WATERMARK");
    annotation.setRotation(0);
    annotation.setPosition(new PageRelativePosition(0, 100, 400, 400));

    annotation.setAppearance(newAppearance);

    annotation.setPage(i);
    stamps.add(annotation);

```

## Creation of the conversion task

```java
AlterContentDescriptionWithAnnotations alterContent = new AlterContentDescriptionWithAnnotations();
// set annotations
alterContent.setAnnotations(stamps);
// set documentId
List<DocumentId> sourceDocumentIdList = new ArrayList<DocumentId>();
sourceDocumentIdList.add(accessorConverted.getUUID());
DocumentId renderedDoc = client.alterDocumentContent(sourceDocumentIdList, alterContent);
```

## Fetch of the resulting document

```java
DocumentAccessor accessorFinalDocument = client.getDocumentAccessor(renderedDoc,
        DocumentAccessorSelector.RENDERED);
```

The binary data of the resulting document is in:

```java
accessorFinalDocument.getInputStream();
```
