---
title: Create Watermarked documents
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 4755c2e64b5d050ee4d81d1842a98b6bf85d59bd981e02a5b65580ffc52aec03
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
field *data* .

``` java
RenditionRestClient client = new RenditionRestClient();
client.setAddress("http://localhost:8761");
// Assuming that this "data" contains your documentContent
InputStream data;
DocumentAccessor original = new DocumentAccessorByteArray(data);
```

## Loading of the documentAccessor

In this code, we load the documentAccessor and get the *RENDERED*
version of it in case a conversion is needed on the rendition side.

``` java
client.loadDocumentAccessor(original);
DocumentAccessor accessorConverted = client.getDocumentAccessor(original.getUUID(),
        DocumentAccessorSelector.RENDERED);
```

## Obtaining the number of pages

``` java
DocumentLayout layout = client.getDocumentLayout(accessorConverted.getUUID());
int nbPages = -1;
if (layout instanceof DocumentPageLayout)

    nbPages = ((DocumentPageLayout) layout).getPageCount();

else

    // send error
    throw ...

```

## Setup the annotation style for stamps

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
for (String key: styleMap.keySet())

    newAppearance += key + ":" + styleMap.get(key) + ";";

// the appearance for the ARender stamp is now built
```

## Setup the list of stamps to send

``` java
// now we prepare the list of stamps to send the rendition server
List&lt;Annotation&gt; stamps = new ArrayList&lt;Annotation&gt;();
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

``` java
AlterContentDescriptionWithAnnotations alterContent = new AlterContentDescriptionWithAnnotations();
// set annotations
alterContent.setAnnotations(stamps);
// set documentId
List&lt;DocumentId&gt; sourceDocumentIdList = new ArrayList&lt;DocumentId&gt;();
sourceDocumentIdList.add(accessorConverted.getUUID());
DocumentId renderedDoc = client.alterDocumentContent(sourceDocumentIdList, alterContent);
```

## Fetch of the resulting document

``` java
DocumentAccessor accessorFinalDocument = client.getDocumentAccessor(renderedDoc,
        DocumentAccessorSelector.RENDERED);
```

The binary data of the resulting document is in:

``` java
accessorFinalDocument.getInputStream();
```
