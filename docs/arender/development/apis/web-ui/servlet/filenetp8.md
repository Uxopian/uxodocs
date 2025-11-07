---
title: "FileNet servlet"
---







## Updating metadata

The servlet *updateDocumentMetadataServlet* is dedicated to updating Filenet document metadata with a POST call.

Here is an example of the POST call, where *&#123;documentId&#125;* is to be replaced by the documentId of the targeted document :



```cfg
``````````http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}``````````
```



Then, the body of the request will accept a JSON structure defining each metadata name to modify and the associated value. The *propertyKey* correspond to the *symbolicName* and *displayName* properties of Filenet. The *propertyValue* is the value that the metadata will take.



```cfg

  "propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"

```


