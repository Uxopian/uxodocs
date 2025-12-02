---
title: Introduction
last_update:
  date: '2025-12-02T14:38:43.134Z'
  author: CI/CD Bot
content_hash: ee80b742a65db7d0cdaca623f3fb3a878d407ff5262be0457a1c9ff29cd4bda2
---







### How does ARender work

ARender makes on the fly rendering of documents so that you no longer need to store multiple converted versions of a
document in your ECM storage.

If you already possess these renderings, ARender can always make use of them and use the most optimized format for
viewing the document.

ARender is built on two components:

- **ARender UI**: front end Java Web server that serves the Web Browser, and handle the end user requests.
- **ARender Rendition**: backend Java Server: serves the renditions of documents and many other services using a REST
  API to the Web-UI server.

More information in the [architecture chapter](/docs/arender/learn/architecture/ecm-architecture).

### How does the rendering of a document in ARender work

If an end user wants to view a document, a request is sent to ARender. The front end server (ARender UI) will then
parse the end user request and find IDs, and any additional information needed to fetch the document. The document is
then sent to the Rendition server for rendering.

If the document is a native format for ARender (PDF, MP4) it will be quickly processed and sent back as
(Images of the pages, Video) to the end user.

If the document requires a conversion, ARender will use its detection tools to find what type of document it is and
convert it to one of the two native format. It will then be displayed.

The list of supported documents by ARender is extensible, and as long as a tool exist to convert it to one of our
target native formats, ARender can handle the document.

### How does ARender allow me to annotate documents

ARender uses the XFDF standard introduced by Adobe to produce annotations that are compatible with Adobe format.

This format of storage, is our own internal structure and can be saved either in your ECM storage, or in a local file
system, a database, etc... The annotations are therefore never stored directly on your documents, and you can always
view the original version. It requires a manual decision and action to produce a new version of a document in ARender in
which the annotations are incorporated.

Annotation export into the native binary format of Adobe, FDF, is also available for wider compatibility. That way you
are not stuck, with ARender, but we are truly glad that you are staying!

### How does ARender handle the performance and document caching

By default, and in order to not redo the same work multiple times, ARender stores a small document cache of one hour on
the Rendition server.

This cache is automatically deleted and purged. For most use cases, you won't have to change any values on this cache
mechanism as it is sized correctly to your platform capacities.

Please take note that ARender will not produce in this regard a download request for the documents each time a user
consult a document. If you wish to make audit trails based on your ECM downloads, please see the remaining of the
ARender documentation to understand the Auditing possibilities ARender has to offer, on top of your ECM features.

### Discover Seamless Integrations with ARender:

Explore a multitude of pre-built integrations designed to enhance your document management experience. Our ready-to-use 
integrations include:
* [IBM FileNet](https://www.arender.io/integrations/ibm-filenet),
* [Nuxeo](https://doc.nuxeo.com/nxdoc/nuxeo-enhanced-viewer/),
* [Alfresco](https://www.arender.io/integrations/alfresco),
* [FlowerDocs](https://flowerdocs.com/).

We also support various other Document Management Systems (DMS), and you can find the complete list of existing 
connectors [here](/docs/arender/what-is-arender/integrations)

#### Tailor-Made solutions for your unique requirements:

If your preferred DMS is not on the list or if you have specific requirements, ARender provides the flexibility to 
create your custom connector. Visit our dedicated documentation for detailed guidance on creating your personalized 
connector: [documentation](/docs/arender/development/framework/loadADocument).

Empower your document management strategy with ARender’s versatile integrations and customizable solutions. Enhance 
collaboration, streamline workflows, and optimize your document-centric processes effortlessly.
