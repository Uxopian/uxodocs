---
title: Image for rejected document
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: e4fd951e128cfb8e396ccca70bca4b0b0ef57de51a7635aa9e1386953c9d773f
---








Since version 4.8.0, it is possible to configure the rendition server to display an image indicating that the document could not be loaded correctly.

![image](/img/arender/documentation/rendition/rejected/overview.png)

## Activate the feature

To activate the functionality, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.



```cfg
rejected.document.enabled=true
```




## Change the default image

To modify the default image, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.



```cfg
rejected.document.path={path_to_the_file}
```



![image](/img/arender/documentation/rendition/rejected/custom_image.png)


## Change the title of the document

To modify the title of the document, you will have to make a modification in the *application.properties* file in the *document-service-broker* microservice.



```cfg
rejected.document.title=Custom title
```



![image](/img/arender/documentation/rendition/rejected/custom_title.png)
