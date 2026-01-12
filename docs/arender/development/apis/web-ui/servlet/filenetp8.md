---
title: FileNet servlet
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 7ab789fefb1d791a894a883d79f48b7405ef0297a9d02ca33c6960c3e395691d
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
