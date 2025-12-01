---
title: Prepare the opening of an external document
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: e21c0b2a9664928f69582de3bb79947f805a796aadf6d223d5180a1c50ed4d95
---







A new servlet is deployed to generate an encrypted UUID.
This UUID represents the URL parameters interpreted by the connector. 
Depending on this configuration the UUID will be base64 or encrypted.



```cfg
# document id bean names, values are documentIdGenerator (base64) and encryptedDocumentIdGenerator (encrypted)
arender.documentid.generator.beanName=documentIdGenerator
```



## Request 

This functionality is accessible via the servlet: **openExternalDocument**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/openExternalDocument?url=docURL'
```

## Servlet Response

From the URL sent as a parameter, an encrypted UUID will be generated.
