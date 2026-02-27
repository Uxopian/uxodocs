---
title: "ARender v2023.17.0 – Upgrade Notes"
draft: false
date: "2025-30-01"
weight: -202317
aliases:
  - /release/2023.17/
_build:
  list: never
---

> **Release note:** See [v2023.17.0](../release-notes).

## ⚙️ Customization and Configuration

This section details the changes to properties used for application configuration and customization.

### New Properties

This release introduces several new properties for link annotation customization and a completely reworked keyboard **`shortcut system for better control over user interactions.

#### Link Annotation Customization

**`toolbar.link.hasOpacity=true`**
**`toolbar.link.hasColor=true`**
**`toolbar.link.hasStyle=true`**

#### Keyboard Shortcut System

**Copy (CTRL-c & CTRL-x)** 
**`shortcut.copy.enabled=true`**

**Print**
**`shortcut.print.key=p`**
**`shortcut.print.ctrl=true`**
**`shortcut.print.shift=false`**
**`shortcut.print.alt=false`**

##### Navigation & View

**Zoom In**
**`shortcut.zoomin.key=k`**
**`shortcut.zoomin.ctrl=true`**
**`shortcut.zoomin.shift=false`**
**`shortcut.zoomin.alt=false`**

**Zoom Out**
**`shortcut.zoomout.key=i`**
**`shortcut.zoomout.ctrl=true`**
**`shortcut.zoomout.shift=false`**
**`shortcut.zoomout.alt=false`**

**Fullscreen**
**`shortcut.fullscreen.key=q`**
**`shortcut.fullscreen.ctrl=true`**
**`shortcut.fullscreen.shift=false`**
**`shortcut.fullscreen.alt=false`**

**Next Page**
**`shortcut.nextPage.key=ArrowRight`**
**`shortcut.nextPage.ctrl=false`**
**`shortcut.nextPage.shift=false`**
**`shortcut.nextPage.alt=false`**

**Previous Page**
**`shortcut.previousPage.key=ArrowLeft`**
**`shortcut.previousPage.ctrl=false`**
**`shortcut.previousPage.shift=false`**
**`shortcut.previousPage.alt=false`**

**Move Page Down**
**`shortcut.movePageDown.key=ArrowDown`**
**`shortcut.movePageDown.ctrl=false`**
**`shortcut.movePageDown.shift=false`**
**`shortcut.movePageDown.alt=false`**

**Move Page Up**
**`shortcut.movePageUp.key=ArrowUp`**
**`shortcut.movePageUp.ctrl=false`**
**`shortcut.movePageUp.shift=false`**
**`shortcut.movePageUp.alt=false`**

**Page Down**
**`shortcut.pageDown.key=PageDown`**
**`shortcut.pageDown.ctrl=false`**
**`shortcut.pageDown.shift=false`**
**`shortcut.pageDown.alt=false`**

**Page Up**
**`shortcut.pageUp.key=PageUp`**
**`shortcut.pageUp.ctrl=false`**
**`shortcut.pageUp.shift=false`**
**`shortcut.pageUp.alt=false`**



##### General Actions

**Search**
**`shortcut.search.key=f`**
**`shortcut.search.ctrl=true`**
**`shortcut.search.shift=false`**
**`shortcut.search.alt=false`**

**Save**
**`shortcut.save.key=s`**
**`shortcut.save.ctrl=true`**
**`shortcut.save.shift=false`**
**`shortcut.save.alt=false`**

**Duplicate Annotation**
**`shortcut.duplicate.key=d`**
**`shortcut.duplicate.ctrl=true`**
**`shortcut.duplicate.shift=false`**
**`shortcut.duplicate.alt=false`**

**About Dialog**
**`shortcut.about.key=,`**
**`shortcut.about.ctrl=true`**
**`shortcut.about.shift=false`**
**`shortcut.about.alt=false`**

**Delete Thumbnail**
**`shortcut.delthumb.key=Delete`**
**`shortcut.delthumb.ctrl=false`**
**`shortcut.delthumb.shift=true`**
**`shortcut.delthumb.alt=false`**

### Deleted properties

The following properties are removed in favor of the new properties and they were not working.

**`shortCut.copy.enabled`**
**`shortCut.cut.enabled`**
**`shortCut.print.key`**
**`shortCut.print.enabled`**

## 📦 Product

### Performance Improvements

**Image Conversion:** A new conversion factory utilizing PDFBox has been introduced for PNG and JPEG files. This ensures that converted PDF sizes remain as close to the original image size as possible.

**Thumbnail Loading Optimization:** Refined the page navigation behavior during scrolling to optimize the number of calls made to the Rendition server for image previews.


## 💻 API

No new API endpoints have been introduced in this release.