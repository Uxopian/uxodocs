---
title: Watermarks
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/watermarks
sidebar_position: 10
content_hash: bb4c94bfc57ac57b1fa97105927ab6fc14100a44565ab82eb537be228c87f4e5
---

# Watermarks

ARender supports watermarking documents at viewing time and on downloaded PDFs. Watermarks are rendered as repeated stamp annotations overlaid on each page.

## Default watermark

ARender ships with a built-in watermark whose content is:

```
Viewed by $USERNAME$ at $TIMESTAMP$
```

`$USERNAME$` is replaced with the authenticated user name. `$TIMESTAMP$` is replaced with the current date and time.

### Enabling the default watermark

Add these properties to the ARender server configuration (`arender-server-custom-vanilla.properties`):

```properties
# Watermark provider type
arender.server.watermark.display.provider=activableDisplayWatermarkProvider

# Activate watermark on startup (applies to viewing and downloads)
arender.watermark.activate.on.startup=true

# Required when using watermarks or redactions — enables annotation rendition processing
arender.server.process.annotations.rendition=true
```

Restart the ARender web application. Watermarks will appear on every page.

## Custom watermark

You can define your own watermark by declaring a Spring bean in `arender-custom-server-integration.xml`. The bean controls the text content, style, and position.

```xml title="arender-custom-server-integration.xml"
<bean id="myWatermark" class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
  <property name="name" value="MY_WATERMARK" />
  <property name="annotationType">
    <value type="com.arondor.viewer.annotation.common.AnnotationType">Stamp</value>
  </property>
  <property name="contentTemplate" value="CONFIDENTIAL - $USERNAME$" />
  <property name="annotationStyle">
    <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
      <property name="fontColor" value="black" />
      <property name="fontSize" value="20" />
      <property name="backgroundColor" value="none" />
      <property name="borderColor" value="black" />
      <property name="borderStyle" value="0" />
      <property name="borderWidth" value="0" />
      <property name="rotation" value="340" />
    </bean>
  </property>
  <!-- Available values: CENTER, TOP_LEFT -->
  <property name="watermarkPosition" value="CENTER" />
</bean>
```

### Style properties

| Property          | Description                          | Example values              |
|-------------------|--------------------------------------|-----------------------------|
| `fontColor`       | Text color                           | `black`, `rgb(255,0,0)`    |
| `fontSize`        | Font size in points                  | `20`, `80`                  |
| `backgroundColor` | Background behind text               | `none`, `white`             |
| `borderColor`     | Border color                         | `black`                     |
| `borderWidth`     | Border width (`0` to hide)           | `0`, `1`                    |
| `rotation`        | Rotation angle in degrees            | `340` (diagonal), `0`       |

### Template variables

| Variable       | Replaced with                  |
|----------------|--------------------------------|
| `$USERNAME$`   | Current authenticated user     |
| `$TIMESTAMP$`  | Current date and time          |

### Activating a custom watermark

Point the server configuration to your bean ID in `arender-custom-server.properties`:

```properties
arender.watermark.bean.name=myWatermark
```

Restart the ARender web application.

## Programmatic watermark creation (REST client)

You can generate watermarked PDFs server-side using the `arondor-arender-client-javarest` dependency. This approach creates stamp annotations on every page and burns them into a new PDF via the rendition server.

### 1. Initialize the client and load the document

```java
RenditionRestClient client = new RenditionRestClient();
client.setAddress("http://localhost:8761");

InputStream data = /* your document binary */;
DocumentAccessor original = new DocumentAccessorByteArray(data);
client.loadDocumentAccessor(original);

DocumentAccessor accessorConverted =
    client.getDocumentAccessor(original.getUUID(), DocumentAccessorSelector.RENDERED);
```

### 2. Get the page count

```java
DocumentLayout layout = client.getDocumentLayout(accessorConverted.getUUID());
int nbPages;
if (layout instanceof DocumentPageLayout) {
    nbPages = ((DocumentPageLayout) layout).getPageCount();
} else {
    throw new IllegalStateException("Unsupported layout type");
}
```

### 3. Configure the stamp style

```java
AnnotationStyle annotationStyle = new AnnotationStyle();
annotationStyle.setFontSize(80);
annotationStyle.setFontColor("rgb(0,0,255)");
annotationStyle.setBackgroundColor("none");
annotationStyle.setBorderWidth(0);

Map<String, String> styleMap = new HashMap<>();
styleMap.put("fontSize", String.valueOf(annotationStyle.getFontSize()));
styleMap.put("fontColor", annotationStyle.getFontColor());
styleMap.put("borderWidth", String.valueOf(annotationStyle.getBorderWidth()));
styleMap.put("borderColor", annotationStyle.getBorderColor());
styleMap.put("backgroundColor", annotationStyle.getBackgroundColor());

StringBuilder appearance = new StringBuilder();
for (Map.Entry<String, String> entry : styleMap.entrySet()) {
    appearance.append(entry.getKey()).append(":").append(entry.getValue()).append(";");
}
```

### 4. Create stamp annotations for each page

```java
List<Annotation> stamps = new ArrayList<>();
for (int i = 0; i < nbPages; i++) {
    StampElemType stamp = new StampElemType();
    stamp.setDocumentId(DocumentIdFactory.getInstance().generate());
    stamp.setContents("WATERMARK");
    stamp.setRotation(0);
    stamp.setPosition(new PageRelativePosition(0, 100, 400, 400));
    stamp.setAppearance(appearance.toString());
    stamp.setPage(i);
    stamps.add(stamp);
}
```

### 5. Generate the watermarked PDF

```java
AlterContentDescriptionWithAnnotations alterContent =
    new AlterContentDescriptionWithAnnotations();
alterContent.setAnnotations(stamps);

List<DocumentId> sourceIds = new ArrayList<>();
sourceIds.add(accessorConverted.getUUID());

DocumentId renderedDoc = client.alterDocumentContent(sourceIds, alterContent);
DocumentAccessor finalDoc =
    client.getDocumentAccessor(renderedDoc, DocumentAccessorSelector.RENDERED);

// The watermarked PDF binary
InputStream result = finalDoc.getInputStream();
```

:::tip
The programmatic approach is useful for batch processing or integrations where you need to produce watermarked PDFs without user interaction through the viewer.
:::
