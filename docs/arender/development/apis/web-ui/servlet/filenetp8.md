---
title: FileNet servlet
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: 2e64352545bb917dfd94f4269411baf1eb368b10e4c39bc456771231fe05dddb
---

## Updating metadata

The servlet _updateDocumentMetadataServlet_ is dedicated to updating Filenet document metadata with a POST call.

Here is an example of the POST call, where _{documentId}_ is to be replaced by the documentId of the targeted document :

```cfg
`http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}`
```

Then, the body of the request will accept a JSON structure defining each metadata name to modify and the associated value. The _propertyKey_ correspond to the _symbolicName_ and _displayName_ properties of Filenet. The _propertyValue_ is the value that the metadata will take.

```cfg

  "propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"

```
