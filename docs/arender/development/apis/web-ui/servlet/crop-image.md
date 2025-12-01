---
title: Crop page
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 72b6c369d2d1a9f1a6fa7c95f27245629e2e143718f78ba3c6061ffb11a3dd7d
---







A servlet is deployed to have an image which corresponds to a cropped page of a document.

## Request 

This functionality is accessible via the servlet: **cropImageServlet**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/cropImageServlet?uuid=docUUID&locale=langue&pagePosition=page&desc=size'
```

* uuid: document id
* locale: the language of the text
* pagePosition: the page of the document
* desc: the settings for cropping (size, position, color etc)

## Servlet Response

An image is returned corresponding to the document page as a parameter, with a descriptive text to explain how to save the image.
