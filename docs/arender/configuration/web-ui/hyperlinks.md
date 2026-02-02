---
title: "Hyperlinks"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 82c95a433eeecd89b69a1a00e27371f7c23027413a6ebfd5105fccea3e0e3d07
---

## General

- Key: hyperlinks

    | Description                                        | Parameter Key            | Type    |
    | -------------------------------------------------- | ------------------------ | ------- |
    | Load URLs into the ARender frame                   | hyperlinks.loadInARender | Boolean |
    | Load hyperlinks from the source document           | hyperlinks.loadFromPDF   | Boolean |
    | Allow internal hyperlinks from the source document | hyperlinks.load.internal | Boolean |
    | Allow external hyperlinks from the source document | hyperlinks.load.external | Boolean |

These parameters allow to influence of the behavior associated with
internal hyperlinks stored into source documents. If you do not wish to
have the internal links of a PDF to be displayed or clicked, use the
parameter *hyperlinks.loadFromPDF=false*.

## Annotation

The default color when creating the hyperlink is defined by the following property:

| Property                                 | Description                                             | Default value     |
| ---------------------------------------- | ------------------------------------------------------- | ----------------- |
| annotation.hyperlink.default.color       | Hyperlink color at creation                             | #EAF39C           |

```cfg title="arender.properties"

annotation.hyperlink.default.color=#EAF39C

```