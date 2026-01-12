---
title: Image processing
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: c3439cd3eb8218a2c84f040bd89f4d294575be0e1f5f0014dc984eade4e17abd
---

To improve the visibility of elements on certain documents, it is possible to manipulate the contrast, the brightness and the inversion of color by using a slider ranging from -100 to 100 where 0 is the default value.

![image](/img/arender/features/imageProcessing/processingPanel.gif)

The buttons to display the sliders individually can be activated with the following properties :

```cfg
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

```cfg
# Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS
topPanel.imageProcessMenu.process.mode=ALL_DOCUMENTS
```
