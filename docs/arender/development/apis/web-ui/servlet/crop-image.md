---
title: "Crop page"
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