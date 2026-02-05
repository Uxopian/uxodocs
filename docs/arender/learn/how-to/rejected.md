---
title: Image for rejected document
sidebar_position: 15
last_update:
  date: '2026-02-05T16:03:58.461Z'
  author: CI/CD Bot
content_hash: ebf77f7ee38b8475c6d6a5364dcc44f95d725d459c8ebc1ae799bcf2cc86ceb6
---

Since version 4.8.0, it is possible to configure the rendition server to display an image indicating that the document could not be loaded correctly.

## Activate the feature

To activate the functionality, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```cfg
rejected.document.enabled=true
```

## Change the default image

To modify the default image, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```cfg
rejected.document.path={path_to_the_file}
```

![image](/img/arender/documentation/rendition/rejected/custom_image.png)

## Change the title of the document

To modify the title of the document, you will have to make a modification in the _application.properties_ file in the _document-service-broker_ microservice.

```cfg
rejected.document.title=Custom title
```

![image](/img/arender/documentation/rendition/rejected/custom_title.png)
