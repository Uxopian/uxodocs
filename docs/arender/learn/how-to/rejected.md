---
title: Image for rejected document
sidebar_position: 15
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: a6400d4592a77ef8a9ca0b74f06c83250988a9fb39f148f37ce1c83444341e0f
---

Since version 4.8.0, it is possible to configure the rendition server to display an image indicating that the document could not be loaded correctly.

![image](/img/arender/documentation/rendition/rejected/overview.png)

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
