---
title: Crop page
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 0d2d3ab0df36714e305a1c1a5b91ab1eddfc8e09cebc7c286f34932836b57fdc
---

A servlet is deployed to have an image which corresponds to a cropped page of a document.

## Request

This functionality is accessible via the servlet: **cropImageServlet**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/cropImageServlet?uuid=docUUID&locale=langue&pagePosition=page&desc=size'
```

- uuid: document id
- locale: the language of the text
- pagePosition: the page of the document
- desc: the settings for cropping (size, position, color etc)

## Servlet Response

An image is returned corresponding to the document page as a parameter, with a descriptive text to explain how to save the image.
