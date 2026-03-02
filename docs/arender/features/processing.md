---
title: Image processing
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 77b210855492a830a9516321f2d550fedfd37b20147cf8754ba4da2a895d8b6f
---

To improve the visibility of elements on certain documents, it is possible to manipulate the contrast, the brightness and the inversion of color by using a slider ranging from -100 to 100 where 0 is the default value.

![image](/img/arender/features/imageProcessing/processingPanel.gif)

The buttons to display the sliders individually can be activated with the following properties :

```properties
#Activate the brightness slider
topPanel.imageProcessMenu.brightness.enabled=true
#Activate the contrast slider
topPanel.imageProcessMenu.contrast.enabled=true
# Activate the invert colors slider
topPanel.imageProcessMenu.invert.enabled=true
```

By default, the buttons for the contrast and brightness sliders are enabled.

Image processing can be applied in three different ways :

- Current page
- All pages of the current document
- All pages of all opened documents

```properties
# Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS
topPanel.imageProcessMenu.process.mode=ALL_DOCUMENTS
```
