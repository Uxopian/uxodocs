---
title: "Quickstart"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 54196ef2c6ef0637c49931bcc9504b7659531d53e7abf15166d65d6ee13eae14
---

## ARender, view any documents, anywhere

### What is ARender

ARender is an HTML5 viewer, allowing you to see and annotate 300+
document formats online directly in your browser.

The following browsers are supported:
* Safari 11+
* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Internet Explorer 11+
* Safari Mobile
* Chrome Android

ARender is as well mobile friendly, as we have dedicated interfaces 
for mobile phones and tablets!

You can try ARender online right now, at this address:
[https://arender.io/demo](https://arender.io/demo)

### How does ARender work

ARender makes on the fly rendering of documents so that you no longer
need to store multiple converted versions of a document in your ECM
storage.

If you already possess those renderings, ARender can always make use of
them and use the most optimized format for viewing the document.

ARender is built on two components:

- The front end Java Web server (referred as Web-UI server): serves
  the HTML application, and handle the end user requests.
- The backend Java Server (referred as Rendition server): serves
  the renditions of documents and many other services using a REST
  API to the Web-UI server.

If you would like to dive in details on how the rendition server works,
a presentation is available as a
[slideshow](https://docs.google.com/presentation/d/1AMbT8v-iaTEiTbZnCdpaE14JKJt-Rn9lk-Ctdn08-xo/present?usp=sharing).

### How does the rendering of a document in ARender work

If an end user wants to consult a document, a request is sent to
ARender. The front end server (Web-UI) will then parse the end user request
and find IDs, and any additionnal information needed to fetch the
document. The document is then sent to the Rendition server for
rendering.

If the document is a native format for ARender (PDF, MP4) it will be
quickly processed and sent back as (Images of the pages, Video) to the
end user.

If the document requires a conversion, ARender will use its detection
tools to find what type of document it is and convert it to one of the
two native format. It will then be displayed.

The list of supported documents by ARender is extensible, and as long as
a tool exist to convert it to one of our target native formats, ARender
can handle the document.

### How does ARender allows me to annotate documents

ARender uses the XFDF standard introduced by Adobe to produce
annotations that are compatible with Adobe format. When you annotate
with ARender, your annotations are supported for many versions to come!

This format of storage, is our own internal structure and can be saved
either in your ECM storage, or in a local file system, a database,
etc... The annotations are therefore never stored directly on your
documents and you can always consult the original version. It requires a
manual decision and action to produce a new version of a document in
ARender in which the annotations are incorporated.

We as well offer exports of our annotations into the native binary
format of Adobe, FDF, for wider compatibility. You are not stuck, with
ARender, but we are truly glad that you are staying!

### How does ARender handle the performance and document caching

By default, and in order to not redo the same work multiple times,
ARender stores a small document cache of one hour on the Rendition
server.

This cache is automatically deleted and purged. For most use cases, you
won't have to change any values on this cache mechanism as it is sized
correctly to your platform capacities.

Please take note that ARender will not produce in this regard a download
request for the documents each time a user consult a document. If you
wish to make audit trails based on your ECM downloads, please see the
remaining of the ARender documentation to understand the Auditing
possibilities ARender has to offer, on top of your ECM features.

### How can I integrate my ECM with ARender

We have many out of the box integration ready to be used: Alfresco, IBM
ICN, ICM, FlowerDocs, and many other custom ECM!

If you do not find in the documentation how to integrate your ECM with
ARender, please contact us and we will see with you if this ECM is not
already handled by one of the many ARender partners.

If your ECM is made purely custom by your company, you can easily
integrate ARender in an Iframe of your ECM, and control ARender using
the extended Javascript API (full documentation available).