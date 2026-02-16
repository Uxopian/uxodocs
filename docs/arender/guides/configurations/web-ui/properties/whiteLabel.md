---
title: White label
sidebar_position: 13
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 99db7f653e06f86290b933177df1042ef2ac73ca2dfd065286f929b807b7bb9b
---

## Introduction

Since ARender 4.4.1, you can remove any references of the ARender brand through the configuration.

## Configuration

### The References to ARender in "About" section

A property allows removing references to 'ARender'. Removed references are in the "About" panel.
![image](/img/arender/aboutARenderEN.png)

Apply following property to remove those references :

```cfg
# Remove any references of ARender in the application
arender.white.labeling=true
```

Result after activation of the white label property :

![image](/img/arender/aboutWhiteLabelingEN.png)

### The references at loading and saving

At document loading or saving, an 'ARender' text is visible at the center of the page.

![image](/img/arender/textArenderSave.png)

This text is configurable with the following property :

```cfg
# Display the label when document starts to open
startup.loading.label=Just-Loading
```

![image](/img/arender/textARenderSaveWhiteLabel.png)

### Modification of window title

Last 'ARender' reference is in the window title of the browser. This can be modified by editing the file ARender.html that can be found at the root folder of your ARender deployment. Then you can modify the following line to remove 'ARender' :

![image](/img/arender/editARenderWindowTitle.png)

After edit :

![image](/img/arender/editARenderWindowTitleAfter.png)
