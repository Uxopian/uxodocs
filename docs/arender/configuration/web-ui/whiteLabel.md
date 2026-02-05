---
title: "White label"
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: 0faf347426a0223c3113b55f7f4c307fe73edc097404131578b3b89ec74719a2
---


## Introduction

Since ARender 4.4.1, you can remove any references of the ARender brand through the configuration.

## Configuration

### The References to ARender in "About" section

A property allows to remove references to 'ARender'. Removed references are in the "About" panel.
![image](pathname:///img/arender/aboutARenderEN.png)

Apply following property to remove those references :
```cfg title="arender.properties"
# Remove any references of ARender in the application
arender.white.labeling=true
```


Result after activation of the white label property :


![image](pathname:///img/arender/aboutWhiteLabelingEN.png)


### The references at loading and saving


At document loading or saving, an 'ARender' text is visible at the center of the page.

![image](pathname:///img/arender/textArenderSave.png)

This text is configurable with the following property :

```cfg title="arender.properties"
# Display the label when document starts to open
startup.loading.label=Just-Loading
```

![image](pathname:///img/arender/textARenderSaveWhiteLabel.png)


### ARender logo

![image](pathname:///img/arender/TopPanelEye.jpg)

To modify ARender logo from the top panel, apply following configuration.

To use the white icon :
```cfg title="arender.properties"
# Define the top panel logo URL
topPanel.logo.url=arender-icones-svg-white/submenu/toolbar/icone-details.svg
```

![image](pathname:///img/arender/aboutIconWhiteLabelWhite.png)

To use the gray icon :
```cfg title="arender.properties"
# Define the top panel logo URL
topPanel.logo.url=arender-icones-svg/submenu/toolbar/icone-details.svg
```

![image](pathname:///img/arender/aboutIconWhiteLabelGray.png)

### Modification of window title

Last 'ARender' reference is in the window title of the browser. This can be modified by editing the file ARender.html that can be found at the root folder of your ARender deployment. Then you can modify the following line to remove 'ARender' :

![image](pathname:///img/arender/editARenderWindowTitle.png)

After edit :

![image](pathname:///img/arender/editARenderWindowTitleAfter.png)
