---
title: Image for rejected document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: fb67fbecb8e7bc4c1c85ffc75680f267356cb64bb9f26ef69b3d9ba227b6bc80
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
