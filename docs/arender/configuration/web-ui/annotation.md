---
title: "Annotations"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 9391283c4a738325603713b9a0e9a793153de60b3a5906873089ed45871200bf
---

## General

- Key: *annotation*

    | Description                                       | Parameter Key           | Type    |
    | ------------------------------------------------- | ----------------------- | ------- |
    | Automatic save mode                               | autosave                | Boolean |
    | Load existing annotations                         | loadExisting            | Boolean |
    | Display loading GIF when saving annotations       | loadingGIF              | Boolean |
    | Include annotation textual content when searching | searchTextInAnnotations | Boolean |

```cfg title="arender.properties"
# Enable autosave mode
annotation.autosave=true
# Display loading GIF
annotation.loadingGIF=true
```

## Autosave

- Key: *annotation.autosave*

    | Description                                                       | Parameter Key      | Type    |
    | ----------------------------------------------------------------- | ------------------ | ------- |
    | Saving may be triggered when using annotation creation repeatable | repeatMode.enabled | Boolean |

## Sticky Note

- Key: *annotation.stickyNote*

    | Description                                   | Parameter Key                | Type    |
    | --------------------------------------------- | ---------------------------- | ------- |
    | Opacity                                       | opacity                      | Boolean |
    | Minimum width                                 | minimum.width                | Integer |
    | Minimum height                                | minimum.height               | Integer |
    | Background color                              | default.color                | String  |
    | Font size                                     | default.fontSize             | Integer |
    | Default font                                  | default.font                 | String  |
    | Underlined text                               | default.underline            | Boolean |
    | Bold text                                     | default.bold                 | Boolean |
    | Italic text                                   | default.italic               | Boolean |
    | Hide border                                   | hide.border                  | Boolean |
    | Hide details about sticky note                | hide.details                 | Boolean |
    | Hide 'reply' button when text is empty        | can.hide.reply.button        | Boolean |
    | Minimum sizes are according to zoom           | according.to.zoom            | Boolean |
    | Ratio content edition height / total height   | content.edition.height.ratio | Float   |

## Rectangle

- Key: *annotation.rectangle*

    | Description      | Parameter Key        | Type    |
    | ---------------- | -------------------- | ------- |
    | Opacity          | opacity              | Float   |
    | Minimum width    | minimum.width        | Integer |
    | Minimum height   | minimum.height       | Integer |
    | Background color | default.color        | String  |
    | Border color     | default.border.color | String  |
    | Border width     | default.border.width | Integer |

## Circle

- Key: *annotation.circle*

    | Description      | Parameter Key        | Type    |
    | ---------------- | -------------------- | ------- |
    | Opacity          | opacity              | Float   |
    | Minimum width    | minimum.width        | Integer |
    | Minimum height   | minimum.height       | Integer |
    | Background color | default.color        | String  |
    | Border color     | default.border.color | String  |
    | Border width     | default.border.width | Integer |

## Highlight, strikeout and underline text

- Key: *annotation.highligthtext*

    | Description | Parameter Key | Type  |
    | ----------- | ------------- | ----- |
    | Opacity     | opacity       | Float |

## Obfuscate

| Description            | Parameter Key               | Type    |
| ---------------------- | --------------------------- | ------- |
| Allow hiding obfuscate | annotation.canHideObfuscate | Boolean |
| Lock obfuscate         | toolbar.lockedObfuscate     | Boolean |

## Polygon

- Key: *annotation.polygon*

    | Description      | Parameter Key   | Type   |
    | ---------------- | --------------- | ------ |
    | Opacity          | opacity         | Float  |
    | Background color | backgroundColor | String |
    | Border width     | width           | Float  |

## Polyline

- Key: *annotation.polyline*

    | Description      | Parameter Key   | Type   |
    | ---------------- | --------------- | ------ |
    | Opacity          | opacity         | Float  |
    | Background color | backgroundColor | String |
    | Border width     | width           | Float  |

## Freehand

- Key: *annotation.ink*

    | Description      | Parameter Key   | Type   |
    | ---------------- | --------------- | ------ |
    | Opacity          | opacity         | Float  |
    | Background color | backgroundColor | String |
    | Border width     | width           | Float  |

## Arrow

- Key: *annotation.arrow*

    | Description                                     | Parameter Key     | Type                               |
    | ----------------------------------------------- | ----------------- | ---------------------------------- |
    | Background color                                | backgroundColor   | String (RGB or hexadecimal format) |
    | Compute the arrow size                          | computeDistance   | Boolean                            |
    | Minimum head size                               | minimal.head.size | Integer (-1 to disable)            |
    | Default distance between head and tail (X-Axis) | x.defaultDistance | Integer                            |
    | Default distance between head and tail (Y-Axis) | y.defaultDistance | Integer                            |

## Date display

- Key: *annotation.date.display*

    | Description                                          | Parameter Key         | Type    |
    | ---------------------------------------------------- | --------------------- | ------- |
    | Display humanized dates in comments and sticky notes | humanizedDate.enabled | Boolean |
    | Display creation date on comments and sticky notes   | creationDate          | Boolean |

## Comment explorer

- Key: *annotation.comment.explorer*

    | Description                                                 | Parameter Key         | Type    |
    | ----------------------------------------------------------- | --------------------- | ------- |
    | The order in which comments appear in the exploration panel | sortByIncrementDate   | Boolean |
    | Also filters annotations on the page view              | filterPageAnnotations | Boolean |

## Comments and sticky notes field text

This part concerns the comments and the sticky notes.

- Key: *annotation.richtext*

    | Description                                         | Parameter Key       | Type    |
    | --------------------------------------------------- | ------------------- | ------- |
    | Activate the entry in edit mode with a double click | edition.doubleClick | Boolean |

## Information popup

This part concerns the popups which display annotation information on
mouse over.

- Key: *annotation.info.popup*

    | Description                                          | Parameter Key  | Type    |
    | ---------------------------------------------------- | -------------- | ------- |
    | Enable / disable popup                               | enabled        | Boolean |
    | Display the popup even if the annotation is editable | evenIfEditable | Boolean |
    | Display information about last update                | displayUpdate  | Boolean |

### Per page annotation loading

If the connector implements the Interface *AnnotationPageAccessor*,
annotations can be loaded on a per page basis in ARender version 3.1.0+.

In order to use this feature activate this parameter:

- annotation.loadPerPage=true

The signature of the interface is the following:

``` java
List<Annotationget(int page) throws AnnotationsNotSupportedException, AnnotationCredentialsException, InvalidAnnotationFormatException;
```

The connector will have to make use of buffers/per page access to the
backend annotation storage in order to benefit fully from this feature.


### Using local storage

Using local storage for annotation properties can be made possible with the property below.
Its activation does not allow to use the modifications of certain properties on the fly like the use of profiles.

| Description       | Parameter Key                | Type    |
| ------------------| ---------------------------- | ------- |
| Use local storage | annotation.use.local.storage | boolean |