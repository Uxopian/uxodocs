---
title: Image processing
sidebar_position: 7
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: b5524c1d8b11638f90b00bb421df43a348585341053e813acf3fe9897dcccc6f
---

To improve the visibility of elements on certain documents, it is possible to manipulate the contrast and brightness by using a slider ranging from -100 to 100 where 0 is the default value.


![image](pathname:///img/arender/features/imageProcessing/processingPanel.gif)


The feature can be activated with the following configuration :

```cfg title="arender.properties"
# Activate the top panel imageProcessing button
topPanel.imageProcessMenu=true
```


Values of the slider can be modified. Those properties are deprecated since version 4.7.0 :
```cfg title="arender.properties"
# Sets up the max value of the brightness slider
topPanel.imageProcessMenu.maxBrightness=200

# Sets up the max value of the contrast slider
topPanel.imageProcessMenu.maxContrast=200

# Sets up the default value of the brightness slider
topPanel.imageProcessMenu.defaultBrightness=100

# Sets up the default value of the contrast slider
topPanel.imageProcessMenu.defaultContrast=100
```


Image processing can be applied in three different ways :
- Current page
- All pages of the current document
- All pages of all opened documents

Before version 4.5.x, you can only apply image processing on every page or current page number on all documents.


Before version 4.5.x
```cfg title="arender.properties"
# Enable the image process on all pages
topPanel.imageProcessMenu.doOnAllPage=true
```

Since version 4.5.x
```cfg title="arender.properties"
# Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS
topPanel.imageProcessMenu.process.mode=ALL_DOCUMENTS
```

# Activate image processing buttons
Since version 4.7.x, the buttons to display the sliders individually can be activated with the following properties :
```cfg title="arender.properties"
#Activate the brightness slider
topPanel.imageProcessMenu.brightness.enabled=true
#Activate the contrast slider
topPanel.imageProcessMenu.contrast.enabled=true
```