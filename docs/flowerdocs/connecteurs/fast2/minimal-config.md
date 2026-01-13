---
title: Minimum configuration
date: "2001-03-28T14:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 48df1563400b587394261c6fddfb43c3a351fd44b9f22278bd77adaadf0b8f38
---

# Access to FlowerDocs

To inject Fast2 documents into FlowerDocs, you need to :

- add a task to the map `FlowerDocInjector`
- define the `flowerDocConnectionProvider` property with a `FlowerDocConnectionProvider` class object, then the properties:
    - `login`, the service account identifier used to authenticate to FlowerDocs
    - `password`, the service account password used to authenticate to FlowerDocs
    - `scope`, the identifier of the scope into which the documents are to be injected
    - `endPoint`, the URL used to access FlowerDocs web services (example: http://localhost:8080/flower-docs-ws/services)

- define a property `propertyHelper` with a class object `com.arondor.fast2p8.flower.docs.PropertyHelper`

# Ignore certain properties

When integrating this task into a Fast2 process, documents may not be injected because they have a tag that is not referenced in the document class.

In fact, FlowerDocs refuses the creation of documents that are not valide. If these non-referenced tags are introduced by technical properties used in the Fast2 process, it is possible to exclude certain properties during the injection process. To do this, edit the `ignoredData` property.
