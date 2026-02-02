---
title: "Save recomposed document"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: bf3f3dd8ac98972f5853730a921abfe8562d5054d13c6c42c213bfab88ec54a4
---

## Prerequisite

Below you will find a configuration with properties modification.

Be sure to read the chapter *Web-UI configuration guide* before.

Moreover, in order to save new document with ARender you need to
activate the documentBuilder functionality as below:

```cfg
documentbuilder.enabled=true
```

## Tutorial for ARender versions strictly lower than 3.1.4

It is possible to define different behaviors at the save of a built
document.

Below, the properties to modify:

```cfg
documentbuilder.save.behavior=UPDATE_NO_DOCUMENT
```

Role: behavior to adopt at the save.

Possible values:

CREATE_NEW_FIRST_DOCUMENT: a new document is created in the CSP.

UPDATE_FIRST_DOCUMENT: a new version of the document is created in
the CSP.

UPDATE_NO_DOCUMENT: no action on the CSP side.

```cfg
documentbuilder.save.download=true
```

Role: Activate/deactivate document download on client side.

Possible values: true/false.

## Tutorial for ARender versions 3.1.4 and higher

It is possible to show different buttons having specific behavior at
document save.

Below, the properties to modify:

```cfg
documentbuilder.button.legacySave.enabled=true
```

Role: get back to the legacy behavior of pre 3.1.4 ARender versions (see [Tutorial for ARender versions strictly lower than 3.1.4](#tutorial-for-arender-versions-strictly-lower-than-3.1.4)).

Possible values: true/false.

```cfg
documentbuilder.button.download.enabled=true
```

Role: Activate/deactivate the download button of a built document on the
client side.

Possible values: true/false.

```cfg
documentbuilder.button.createFirst.enabled=true
```

Role: Activate/deactivate the button that create a new document in the CSP
corresponding to the built document.

Possible values: true/false.

```cfg
documentbuilder.button.updateFirst.enabled=true
```

Role: Activate/deactivate the button that create a new version of the document
in the CSP corresponding to the built document.

Possible values: true/false.
