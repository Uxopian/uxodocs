---
title: Image processing
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: a965d229730c65c210029ce07c9b68ad0f25d99119ba60467055f51794116a4a
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
