---
title: "Behaviour testing"
sidebar_position: 5
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 67c22de224d0f33d8d0a1ff3607dead0838c555d035167b7cbd51e1b532c868c
---

This chapter is meant to check if ARender is working as expected. The
tests can be performed on a punctual basis (install, upgrade, etc) as
well as continuously to supervise.

## Rendition server

The easiest way to validate ARender Rendition installation is to check the health page, [see post installation documentation](../install/standalone/rendition/verification.md).  

## Presentation server

To test the presentation application, you just need to use the
*http://[arenderHost]/ARender/* web page this can be done.

## End to end

Depending on needs, different level of test can be set-up. As a matter
of fact, end-to-end test can be done to test the application as a whole.
Typically, HTTP GET requests can be used to test the opening of a
document and its rendition.

- Step 1: Using an URL to load a document:

        https://www.demo.arender.io/arendergwt/openExternalDocument?url=https://arender.io/docs/demo/ARender-doc-demo.pdf

This servlet page will return ARender's ID of the document.

You can provide to this servlet any usual URL parameter, ARender is
able to use every single connector.

- Step 2: Loading page test:

```bash
https://www.demo.arender.io/arendergwt/arendergwt/imageServlet?uuid=${id ARender}&pagePosition=1&desc=IM_800_0
```

This servlet is made to test the generation of a 800px pictures of page
one from the document `{id ARender}`

:::note
*In case of complex architecture, this methodology won't be able
to test every branch of the platform. Typically, If a rendition farm
is defined, it's not possible, using this, to ensure both rendition
server have been tested.*
:::
