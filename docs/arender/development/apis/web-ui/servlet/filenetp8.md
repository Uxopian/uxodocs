---
title: FileNet servlet
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 9a65f21ac9851cdb6d3ebd5b7ddd9df318d54f347888919c936c10b197e48cf6
---

## Updating metadata

The servlet _updateDocumentMetadataServlet_ is dedicated to updating Filenet document metadata with a POST call.

Here is an example of the POST call, where _&#123;documentId&#125;_ is to be replaced by the documentId of the targeted document :

```````````cfg
``````````http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}``````````
```````````

Then, the body of the request will accept a JSON structure defining each metadata name to modify and the associated value. The _propertyKey_ correspond to the _symbolicName_ and _displayName_ properties of Filenet. The _propertyValue_ is the value that the metadata will take.

```cfg

  "propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"

```
