---
title: Annotations
sidebar_position: 1
last_update:
  date: '2026-02-17T10:47:49.798Z'
  author: CI/CD Bot
content_hash: 5cec2145fbcf65a53fea27ec02709642ac308546cbc366628f0ac3a5968450fd
---

## General

| Description                                       | Parameter Key                                | Default value | Type    |
| ------------------------------------------------- | -------------------------------------------- | ------------- | ------- |
| Automatic save mode                               | annotation.autosave                          | false         | Boolean |
| Auto refreshes the annotations after save         | annotation.autorefresh                       | true          | Boolean |
| Load existing annotations                         | annotation.loadExisting                      | true          | Boolean |
| Display loading GIF when saving annotations       | annotation.loadingGIF                        | true          | Boolean |
| Include annotation textual content when searching | annotation.searchTextInAnnotations           | true          | Boolean |
| Allow annotation preferences update upon edition  | annotation.preferences.update.onEdit.enabled | false         | Boolean |

## Autosave

| Description                                                       | Parameter Key                          | Default value | Type    |
| ----------------------------------------------------------------- | -------------------------------------- | ------------- | ------- |
| Saving may be triggered when using annotation creation repeatable | annotation.autosave.repeatMode.enabled | false         | Boolean |
| Auto save annotation timer delay in milliseconds                  | annotation.autosave.timerDelay         | 1000          | Integer |

## Sticky Note

| Description                                                                                                                          | Parameter Key                                      | Default value | Type    |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------------- | ------- |
| Opacity                                                                                                                              | annotation.stickyNote.opacity                      | 1.0           | Float   |
| Minimum width                                                                                                                        | annotation.stickyNote.minimum.width                | 250           | Integer |
| Minimum height                                                                                                                       | annotation.stickyNote.minimum.height               | 170           | Integer |
| Background color                                                                                                                     | annotation.stickyNote.default.color                | #FFDD00       | String  |
| Font size                                                                                                                            | annotation.stickyNote.default.fontSize             | 2             | Integer |
| Default font                                                                                                                         | annotation.stickyNote.default.font                 | Helvetica     | String  |
| Underlined text                                                                                                                      | annotation.stickyNote.default.underline            | false         | Boolean |
| Bold text                                                                                                                            | annotation.stickyNote.default.bold                 | false         | Boolean |
| Italic text                                                                                                                          | annotation.stickyNote.default.italic               | false         | Boolean |
| Hide border                                                                                                                          | annotation.stickyNote.hide.border                  | true          | Boolean |
| Hide details about sticky note                                                                                                       | annotation.stickyNote.hide.details                 | false         | Boolean |
| Hide 'reply' button when text is empty                                                                                               | annotation.stickyNote.can.hide.reply.button        | false         | Boolean |
| Minimum sizes are according to zoom                                                                                                  | annotation.stickyNote.according.to.zoom            | true          | Boolean |
| Ratio content edition height / total height                                                                                          | annotation.stickyNote.content.edition.height.ratio | 0.7           | Float   |
| Font color of the sticky note annotation                                                                                             | annotation.stickyNote.default.fontColor            | #000000       | String  |
| Enables a link between the pin and the note for sticky note                                                                          | annotation.stickyNote.dotLink.enabled              | true          | Boolean |
| Default pin size in pixel for the sticky note                                                                                        | annotation.stickyNote.pin.default.size             | 20            | Integer |
| If true reply button will hide when stickyNote text is empty                                                                         | annotation.stickyNote.statusList.enabled           | true          | Boolean |
| Allow the display of the label or not : ALWAYS,HOVER,NEVER                                                                           | annotation.stickyNote.action.buttons               | HOVER         | String  |
| Allow the display of the date or not                                                                                                 | annotation.stickyNote.show.date                    | true          | Boolean |
| Display only the initials of the creator name if true                                                                                | annotation.stickyNote.creator.name.initial.only    | true          | Boolean |
| INITIALS shows the initials of the creator in the pin. INDEX shows the index of the stickynote                                       | annotation.stickyNote.pin.display.mode             | INITIALS      | String  |
| StickyNote will be outlined in blue and the edition mode will not be activated when the icon in the comment explorer will be clicked | annotation.stickyNote.outline                      | false         | Boolean |

## Rectangle

| Description      | Parameter Key                             | Default value | Type    |
| ---------------- | ----------------------------------------- | ------------- | ------- |
| Opacity          | annotation.rectangle.opacity              | 0.7           | Float   |
| Minimum width    | annotation.rectangle.minimum.width        | 30            | Integer |
| Minimum height   | annotation.rectangle.minimum.height       | 10            | Integer |
| Background color | annotation.rectangle.default.color        | #EAF39C       | String  |
| Border color     | annotation.rectangle.default.border.color | #EAF39C       | String  |
| Border width     | annotation.rectangle.default.border.width | 0             | Integer |

## Circle

| Description      | Parameter Key                          | Default value | Type    |
| ---------------- | -------------------------------------- | ------------- | ------- |
| Opacity          | annotation.circle.opacity              | 0.7           | Float   |
| Minimum width    | annotation.circle.minimum.width        | 30            | Integer |
| Minimum height   | annotation.circle.minimum.height       | 10            | Integer |
| Background color | annotation.circle.default.color        | #EAF39C       | String  |
| Border color     | annotation.circle.default.border.color | #EAF39C       | String  |
| Border width     | annotation.circle.default.border.width | 0             | Integer |

## Highlight, strikeout and underline text

| Description                            | Parameter Key                               | Default value | Type   |
| -------------------------------------- | ------------------------------------------- | ------------- | ------ |
| Opacity                                | annotation.highlighttext.opacity            | 0.7           | Float  |
| Background color                       | annotation.highlighttext.default.color      | #EAF39C       | String |
| Strike width ratio (underline, strike) | annotation.highlighttext.strike.width.ratio | 0.1           | Float  |

## Redact

| Description         | Parameter Key              | Default value | Type    |
| ------------------- | -------------------------- | ------------- | ------- |
| Allow hiding redact | annotation.can.hide.redact | false         | Boolean |
| Lock redact         | toolbar.redact.locked      | false         | Boolean |

## Polygon

| Description      | Parameter Key                      | Default value | Type   |
| ---------------- | ---------------------------------- | ------------- | ------ |
| Opacity          | annotation.polygon.opacity         | 0.7           | Float  |
| Background color | annotation.polygon.backgroundColor | #2A4869       | String |
| Border width     | annotation.polygon.width           | 2.0f          | Float  |
| Border color     | annotation.polygon.borderColor     | #2A4869       | Float  |

## Polyline

| Description      | Parameter Key                       | Default value | Type   |
| ---------------- | ----------------------------------- | ------------- | ------ |
| Opacity          | annotation.polyline.opacity         | 1             | Float  |
| Background color | annotation.polyline.backgroundColor | #2A4869       | String |
| Border width     | annotation.polyline.width           | 2.0f          | Float  |

## Freehand

| Description      | Parameter Key                  | Default value | Type   |
| ---------------- | ------------------------------ | ------------- | ------ |
| Opacity          | annotation.ink.opacity         | 1             | Float  |
| Background color | annotation.ink.backgroundColor | #2A4869       | String |
| Border width     | annotation.ink.width           | 2.0f          | Float  |

## Arrow

| Description                                                                                             | Parameter Key                             | Default value | Type                               |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | ---------------------------------- |
| Background color                                                                                        | annotation.arrow.backgroundColor          | #2A4869       | String (RGB or hexadecimal format) |
| Compute the arrow size                                                                                  | annotation.arrow.computeDistance          | false         | Boolean                            |
| Minimum head size                                                                                       | annotation.arrow.minimal.head.size        | -1            | Integer (-1 to disable)            |
| Default distance between head and tail (X-Axis)                                                         | annotation.arrow.x.defaultDistance        | 12            | Integer                            |
| Default distance between head and tail (Y-Axis)                                                         | annotation.arrow.y.defaultDistance        | 12            | Integer                            |
| Opacity                                                                                                 | annotation.arrow.opacity                  | 1.0           | Float                              |
| Border width                                                                                            | annotation.arrow.border.width             | 4.0           | Float                              |
| Head type : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.head.type                | OPEN_ARROW    | String                             |
| Tail type : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.tail.type                | NONE          | String                             |
| Defines a degree of accuracy for the arrow displayed measure                                            | annotation.arrow.distance.degree.accuracy | 0.01          | Float                              |

## Measurement arrow

| Description                                                                                             | Parameter Key                             | Default value | Type                               |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | ---------------------------------- |
| Background color                                                                                        | annotation.arrow.backgroundColor          | #2A4869       | String (RGB or hexadecimal format) |
| Minimum head size                                                                                       | annotation.arrow.minimal.head.size        | -1            | Integer (-1 to disable)            |
| Default distance between head and tail (X-Axis)                                                         | annotation.arrow.x.defaultDistance        | 12            | Integer                            |
| Default distance between head and tail (Y-Axis)                                                         | annotation.arrow.y.defaultDistance        | 12            | Integer                            |
| Opacity                                                                                                 | annotation.arrow.opacity                  | 1.0           | Float                              |
| Border width                                                                                            | annotation.arrow.border.width             | 4.0           | Float                              |
| Head type : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.measurement.head.type    | BUTT          | String                             |
| Tail type : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | annotation.arrow.measurement.tail.type    | BUTT          | String                             |
| Defines a degree of accuracy for the arrow displayed measure                                            | annotation.arrow.distance.degree.accuracy | 0.01          | Float                              |

## Date display

| Description                                          | Parameter Key                                 | Default value | Type    |
| ---------------------------------------------------- | --------------------------------------------- | ------------- | ------- |
| Display humanized dates in comments and sticky notes | annotation.date.display.humanizedDate.enabled | false         | Boolean |
| Display creation date on comments and sticky notes   | annotation.date.display.creationDate          | true          | Boolean |

## Comment explorer

|  
| Description | Parameter Key | Default value | Type |
| ------------------------------------------------------------ | ------------------------------------------------------------- | ------------- | ------- |
| The order in which comments appear in the exploration panel | annotation.comment.explorer.sortByIncrementDate | false | Boolean |
| Also filters annotations on the page view | annotation.comment.explorer.filterPageAnnotations | true | Boolean |
| Sets up the comment explorer on the east side | annotation.comment.explorer.eastSide.enabled | false | Boolean |
| Opens the comment explorer when an annotation is edited | annotation.comment.explorer.openOnEdit | false | Boolean |
| Animate while expanding the comment explorer | annotation.comment.explorer.animate.on.expand | true | Boolean |
| Shows a simplified list of all authors | annotation.comment.explorer.showAllAnnotators | true | Boolean |
| Shows a total number of annotations | annotation.comment.explorer.showTotalAnnotationsNumber | false | Boolean |
| Shows the comment explorer at startup | annotation.comment.explorer.showAtStartup | false | Boolean |
| Enable to display annotation in one line if needed | annotation.comment.explorer.inline.enabled | false | Boolean |
| Annotation in comment explorer will be displayed in one line | annotation.comment.explorer.show.annotation.minimized.on.open | false | Boolean |
| Allow the display of the date | annotation.comment.explorer.show.date | true | Boolean |
| Display only the initials of the creator name | annotation.comment.explorer.creator.name.initial.only | false | Boolean |
| Enable to display only one annotation per page | annotation.comment.explorer.show.one.annotation.only | false | Boolean |

## Comments and sticky notes field text

This part concerns the comments and the sticky notes.

| Description                                         | Parameter Key                           | Default value | Type    |
| --------------------------------------------------- | --------------------------------------- | ------------- | ------- |
| Activate the entry in edit mode with a double click | annotation.richtext.edition.doubleClick | false         | Boolean |

## Information popup

This part concerns the popups which display annotation information on
mouse over.

| Description                                          | Parameter Key                        | Default value | Type    |
| ---------------------------------------------------- | ------------------------------------ | ------------- | ------- |
| Enable / disable popup                               | annotation.info.popup.enabled        | true          | Boolean |
| Display the popup even if the annotation is editable | annotation.info.popup.evenIfEditable | false         | Boolean |
| Display information about last update                | annotation.info.popup.displayUpdate  | false         | Boolean |

### Per page annotation loading

If the connector implements the Interface _AnnotationPageAccessor_,
annotations can be loaded on a per page basis in ARender version 3.1.0+.

In order to use this feature activate this parameter:

- annotation.loadPerPage=true

The signature of the interface is the following:

```java
List<Annotationget(int page) throws AnnotationsNotSupportedException, AnnotationCredentialsException, InvalidAnnotationFormatException;
```

The connector will have to make use of buffers/per page access to the
backend annotation storage in order to benefit fully from this feature.

### Using local storage

Using local storage for annotation properties can be made possible with the property below.
Its activation does not allow to use the modifications of certain properties on the fly like the use of profiles.

| Description       | Parameter Key                | Type    |
| ----------------- | ---------------------------- | ------- |
| Use local storage | annotation.use.local.storage | boolean |
