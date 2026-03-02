---
title: Menu bar
sidebar_position: 7
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 59af685869442cc051e92bbb736329c88174ab717ba1c65fcf6eed0745d93e43
---

## Document menu

| Description                                                             | Parameter Key                                   | Default value    | Type    |
| ----------------------------------------------------------------------- | ----------------------------------------------- | ---------------- | ------- |
| Activate the document sub-menu                                          | topPanel.documentMenu                           | true             | Boolean |
| Upload a document from local disk                                       | topPanel.documentMenu.upload                    | true             | Boolean |
| Upload a document from a remote URL                                     | topPanel.documentMenu.url                       | true             | Boolean |
| Allow to use "enter" to validate the input URL from the URL button      | topPanel.documentMenu.url.open.using.enter      | true             | Boolean |
| Upload XFDF annotations from local                                      | topPanel.documentMenu.xfdfUpload                | false            | Boolean |
| Download current document in PDF                                        | topPanel.documentMenu.downloadPDF               | true             | Boolean |
| Download current document in native format (only not PDF document)      | topPanel.documentMenu.download                  | true             | Boolean |
| Download all visualized documents                                       | topPanel.documentMenu.downloadAll               | true             | Boolean |
| Download current document with its annotations                          | topPanel.documentMenu.downloadAnnotation        | true             | Boolean |
| Download annotations in CSV format                                      | topPanel.documentMenu.downloadCSVAnnotation     | false            | Boolean |
| Download document with FDF annotations                                  | topPanel.documentMenu.downloadWithFDFAnnotation | false            | Boolean |
| Download annotations in XFDF format                                     | topPanel.documentMenu.downloadXFDFAnnotations   | false            | Boolean |
| Activate the top panel download composite document button               | topPanel.documentMenu.download.root             | true             | Boolean |
| The default behavior for download : DOWNLOAD_SOURCE or DOWNLOAD_NON_PDF | topPanel.documentMenu.download.behavior         | DOWNLOAD_NON_PDF | String  |
| Download all current documents as original format in a ZIP              | topPanel.documentMenu.downloadAllSources        | true             | Boolean |
| Download the current document as FDF                                    | topPanel.documentMenu.downloadFDFAnnotations    | false            | Boolean |
| Download the compared documents side by side with compare result on it  | topPanel.documentMenu.download.with.compare     | true             | Boolean |
| Activate the download sub-menu (Since version 2023.15.0)                | topPanel.downloadMenu.enabled                   | true             | Boolean |
| Activate the import sub-menu (Since version 2023.15.0)                  | topPanel.importMenu.enabled                     | true             | Boolean |

## Print menu

| Description                                                  | Parameter Key  | Default value | Type    |
| ------------------------------------------------------------ | -------------- | ------------- | ------- |
| Display a dialog box allowing to choose the type of printing | topPanel.print | true          | Boolean |

```properties
# Hide the print button
topPanel.print=false
```

## Annotation menu

| Description                                                                      | Parameter Key                                    | Default value | Type    |
| -------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- | ------- |
| Activate the annotation sub-menu                                                 | topPanel.annotationMenu                          | true          | Boolean |
| Create a sticky note                                                             | topPanel.annotationMenu.stikyNote                | true          | Boolean |
| Create a rectangle                                                               | topPanel.annotationMenu.highlight                | true          | Boolean |
| Create a circle                                                                  | topPanel.annotationMenu.circle                   | true          | Boolean |
| Create an arrow                                                                  | topPanel.annotationMenu.arrow                    | true          | Boolean |
| Create a measurement arrow                                                       | topPanel.annotationMenu.arrow.measure            | true          | Boolean |
| Create a highlight text                                                          | topPanel.annotationMenu.highlightText            | false         | Boolean |
| Create an underline text                                                         | topPanel.annotationMenu.underlineText            | false         | Boolean |
| Create a strikeout text                                                          | topPanel.annotationMenu.strikethroughText        | false         | Boolean |
| Create a polygon                                                                 | topPanel.annotationMenu.polygon                  | true          | Boolean |
| Create a polyline                                                                | topPanel.annotationMenu.polyline                 | true          | Boolean |
| Create a freehand                                                                | topPanel.annotationMenu.freehand                 | true          | Boolean |
| Create a hyperlink                                                               | topPanel.annotationMenu.hyperlink                | false         | Boolean |
| Create a stamp                                                                   | topPanel.annotationMenu.stamp                    | true          | Boolean |
| Create an audio annotation                                                       | topPanel.annotationMenu.sound                    | false         | Boolean |
| Display/hide all annotations                                                     | topPanel.annotationMenu.hide                     | true          | Boolean |
| Display/hide annotations &amp; rotations                                         | topPanel.annotationMenu.hideAll                  | false         | Boolean |
| Create a freetext                                                                | topPanel.annotationMenu.freetext                 | true          | Boolean |
| Allow the sticky note to be edited                                               | topPanel.annotationMenu.stickyNote.editable      | true          | Boolean |
| Create a rectangle in repeat mode (does not cancel unless pressed again)         | topPanel.annotationMenu.highlight.repeat         | false         | Boolean |
| Create an arrow in repeat mode (does not cancel unless pressed again)            | topPanel.annotationMenu.arrow.repeat             | false         | Boolean |
| Create a measurement arrow in repeat mode (does not cancel unless pressed again) | topPanel.annotationMenu.arrow.measure.repeat     | false         | Boolean |
| Create a polygon in repeat mode (does not cancel unless pressed again)           | topPanel.annotationMenu.polygon.repeat           | false         | Boolean |
| Create a polyline in repeat mode (does not cancel unless pressed again)          | topPanel.annotationMenu.polyline.repeat          | false         | Boolean |
| Create a freehand in repeat mode (does not cancel unless pressed again)          | topPanel.annotationMenu.freehand.repeat          | false         | Boolean |
| Create a highlight text in repeat mode (does not cancel unless pressed again)    | topPanel.annotationMenu.highlightText.repeat     | false         | Boolean |
| Create an underline text in repeat mode (does not cancel unless pressed again)   | topPanel.annotationMenu.underlineText.repeat     | false         | Boolean |
| Create a strikeout text in repeat mode (does not cancel unless pressed again)    | topPanel.annotationMenu.strikethroughText.repeat | false         | Boolean |
| Create a circle in repeat mode (does not cancel unless pressed again)            | topPanel.annotationMenu.circle.repeat            | false         | Boolean |
| Create a hyperlink in repeat mode (does not cancel unless pressed again)         | topPanel.annotationMenu.hyperlink.repeat         | false         | Boolean |

## Navigation

| Description         | Parameter Key                    | Default value | Type    |
| ------------------- | -------------------------------- | ------------- | ------- |
| Go to first page    | topPanel.pageNavigation.first    | true          | Boolean |
| Go to previous page | topPanel.pageNavigation.previous | true          | Boolean |
| Go to next page     | topPanel.pageNavigation.next     | true          | Boolean |
| Go to last page     | topPanel.pageNavigation.last     | true          | Boolean |

## Zoom

| Description                                         | Parameter Key                 | Default value | Type    |
| --------------------------------------------------- | ----------------------------- | ------------- | ------- |
| Zoom in                                             | topPanel.zoom.in              | true          | Boolean |
| Zoom out                                            | topPanel.zoom.out             | true          | Boolean |
| Zoom on a selected zone                             | topPanel.zoom.zone            | true          | Boolean |
| Adjust the zoom to the window width                 | topPanel.zoom.fullWidth       | true          | Boolean |
| Adjust the zoom to the window height                | topPanel.zoom.fullHeight      | true          | Boolean |
| Adjust the zoom to both the window width and height | topPanel.zoom.fullPage        | true          | Boolean |
| Enable zone zoom in external window                 | topPanel.zoom.zoneGlass       | false         | Boolean |
| Zone zoom multiplication                            | topPanel.zoom.zoneGlass.value | 2             | Integer |

## Rotation

| Description                                                               | Parameter Key            | Default value | Type    |
| ------------------------------------------------------------------------- | ------------------------ | ------------- | ------- |
| Rotate current page to the right                                          | topPanel.rotation.right  | true          | Boolean |
| Rotate current page to the left                                           | topPanel.rotation.left   | true          | Boolean |
| Rotate all pages to the left and right                                    | topPanel.rotation.all    | false         | Boolean |
| Reset all rotations                                                       | topPanel.rotation.reset  | false         | Boolean |
| Sets up the amount of rotation applied when pressing the rotation buttons | topPanel.rotation.degree | 90            | Integer |
| Activates rotations sub-menu                                              | topPanel.rotation.add    | true          | Boolean |

## Pages navigation

| Description                    | Parameter Key                    | Default value | Type    |
| ------------------------------ | -------------------------------- | ------------- | ------- |
| Go to first page navigation    | topPanel.pageNavigation.first    | true          | Boolean |
| Go to previous page navigation | topPanel.pageNavigation.previous | true          | Boolean |
| Go to next page navigation     | topPanel.pageNavigation.next     | true          | Boolean |
| Go to last page navigation     | topPanel.pageNavigation.last     | true          | Boolean |

## Other features

| Description                                                                                                                            | Parameter Key                                | Default value | Type    |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------- | ------- |
| Refresh annotations                                                                                                                    | topPanel.refresh                             | true          | Boolean |
| Full text search                                                                                                                       | topPanel.search                              | true          | Boolean |
| Default search behavior. Otherwise, open in the advanced search panel                                                                  | topPanel.search.default                      | false         | Boolean |
| If true and topPanel.search.default is true, display search text results in the AdvancedSearchExplorer                                 | topPanel.search.displayResultsInExplorer     | true          | Boolean |
| The "next result" search button will jump to the next result on the current visible page instead of resuming where you left the search | topPanel.searchByVisiblePage                 | true          | Boolean |
| Full screen mode                                                                                                                       | topPanel.fullscreen                          | true          | Boolean |
| Full screen mode will hide the top panel totally                                                                                       | topPanel.fullscreen.hideTopPanel             | false         | Boolean |
| The toppanel will always be visible in full screen and won't hide                                                                      | topPanel.fullscreen.alwaysShowTopPanel       | false         | Boolean |
| Boxed zoom                                                                                                                             | topPanel.zoomBox                             | true          | Boolean |
| Copy all text of the document                                                                                                          | topPanel.document.text                       | false         | Boolean |
| Cropbox                                                                                                                                | topPanel.cropbox.enabled                     | false         | Boolean |
| Brightness slider                                                                                                                      | topPanel.imageProcessMenu.brightness.enabled | true          | Boolean |
| Contrast slider                                                                                                                        | topPanel.imageProcessMenu.contrast.enabled   | false         | Boolean |
| Invert color slider                                                                                                                    | topPanel.imageProcessMenu.invert.enabled     | false         | Boolean |
| Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS                                                           | topPanel.imageProcessMenu.process.mode       | ALL_DOCUMENTS | String  |
