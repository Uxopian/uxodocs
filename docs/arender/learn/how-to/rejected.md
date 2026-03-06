---
title: Image for rejected document
sidebar_position: 15
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: bffeb98e52a5d7cc2a0a413ad58a0d2f00e6379c4a9ab0ceb317869089f143d1
---

Since version 4.8.0, it is possible to configure the rendition server to display an image indicating that the document could not be loaded correctly.

## Activate the feature

To activate the functionality, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```properties
rejected.document.enabled=true
```

## Change the default image

To modify the default image, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```properties
rejected.document.path={path_to_the_file}
```

![image](/img/arender/documentation/rendition/rejected/custom_image.png)

## Change the title of the document

To modify the title of the document, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```properties
rejected.document.title=Custom title
```

![image](/img/arender/documentation/rendition/rejected/custom_title.png)
