---
title: "Image for rejected document"
sidebar_position: 15
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: 68817389f1dae0f47e130123d81c19008dbf102b5b1395782ca2bd98974fc549
---


Since version 4.8.0, it is possible to configure the rendition server to display an image indicating that the document could not be loaded correctly.

![image](pathname:///img/arender/documentation/rendition/rejected/overview.png)

## Activate the feature

To activate the functionality, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.

```cfg title="application.properties"
rejected.document.enabled=true
```


## Change the default image

To modify the default image, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.

```cfg title="application.properties"
rejected.document.path={path_to_the_file}
```

![image](pathname:///img/arender/documentation/rendition/rejected/custom_image.png)


## Change the title of the document

To modify the title of the document, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.

```cfg title="application.properties"
rejected.document.title=Custom title
```

![image](pathname:///img/arender/documentation/rendition/rejected/custom_title.png)