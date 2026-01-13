---
title: Save recomposed document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 88c821911cf0e6c5c1bcdc2bb7c6981542943cfe56f10f76b7e341b756177286
---

## Prerequisite

Below you will find a configuration with properties modification.

Be sure to read before the chapter : [Web-UI configuration guide](/docs/arender/installation/standalone/web-ui/configuration).

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
