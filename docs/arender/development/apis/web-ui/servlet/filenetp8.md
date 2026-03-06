---
title: FileNet servlet
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 8d10ecf3e12921dca6a90a354a21290437620e48624d33311cdc22a5cc40b698
---

## Updating metadata

The servlet _updateDocumentMetadataServlet_ is dedicated to updating Filenet document metadata with a POST call.

Here is an example of the POST call, where _&#123;documentId&#125;_ is to be replaced by the documentId of the targeted document :

```properties
http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}
```

Then, the body of the request will accept a JSON structure defining each metadata name to modify and the associated value. The _propertyKey_ correspond to the _symbolicName_ and _displayName_ properties of Filenet. The _propertyValue_ is the value that the metadata will take.

```json
{
  "propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"
}
```
