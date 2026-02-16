---
title: ARender Customisations
sidebar_position: 6
description: Customise ARender within FlowerDocs.
date: "2010-06-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: c9fcd7d768276b6581ce624f728639d1dcf1820c2b6d35bc5320135f816e78a6
---

# Introduction

FlowerDocs natively embeds ARender.
ARender can be configured using a number of parameters, not all of which have been qualified within FlowerDocs.
You can find below the list of customisations that have been tested and validated in FlowerDocs.

You can follow this documentation page to learn how to use these customisations [here](./arender-config)

## Annotation styles

| Sticky note                            |                                             |
| :------------------------------------- | :------------------------------------------ |
| Minimum width                          | annotation.stickyNote.minimum.width         |
| Minimum height                         | annotation.stickyNote.minimum.height        |
| Background color                       | annotation.stickyNote.default.color         |
| Font size                              | annotation.stickyNote.default.fontColor     |
| Font size                              | annotation.stickyNote.default.fontSize      |
| Default font                           | annotation.stickyNote.default.font          |
| Hide ‘reply’ button when text is empty | annotation.stickyNote.can.hide.reply.button |

<br/>

| FreeText         |                                          |
| :--------------- | :--------------------------------------- |
| Opacity          | annotation.freetext.opacity              |
| Background color | annotation.freetext.default.color        |
| Border color     | annotation.freetext.default.border.color |
| Border width     | annotation.freetext.default.border.width |
| Font size        | annotation.freetext.default.font.size    |

<br/>

| Rectangle      |                                           |
| :------------- | :---------------------------------------- |
| Opacity        | annotation.rectangle.opacity              |
| Minimum width  | annotation.rectangle.minimum.width        |
| Minimum height | annotation.rectangle.minimum.height       |
| Font color     | annotation.rectangle.default.color        |
| Border color   | annotation.rectangle.default.border.color |
| Border size    | annotation.rectangle.default.border.width |

<br/>

| Highlight, strikeout and underline text |                                        |
| :-------------------------------------- | :------------------------------------- |
| Opacity                                 | annotation.highligthtext.opacity       |
| Background color                        | annotation.highlighttext.default.color |

<br/>

## Toaster management

| Parameter                | Description                | Default Value |
| :----------------------- | :------------------------- | :------------ |
| toaster.log.info.enabled | Display information toasts | `false`       |

<br/>

You can find more details in the documentation [ARender online](https://docs.arender.io/guides/configurations/web-ui/properties/annotation/)
