---
title: "Document navigator"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: bf15905e61eeb611b8eb7d8b13d20964eb056e3bf11518667e30ffd3f0c38a8c
---

## General

By default, the document navigator is opened on the thumb explorer. The user can browse between panels by clicking on the corresponding icon. He can close the panel by clicking on the icon corresponding to the opened panel. 

- Key: documentnavigator

| Description                                                 | Parameter Key       | Type                                                                                                                              |
| ----------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Width of document navigator                                 | width               | Pixels                                                                                                                            |
| Time before splitter ears disappear (Depreacted in v.4.7.0) | ears.hideTimerDelay | Milliseconds                                                                                                                      |
| Position of the splitter on opening                         | initialWidth        | **Default**: default position; **Reduced**: hidden; **Expanded**: at 70% of window width (Enum) |

## Thumb explorer

The table below lists the general configuration of the explorer allowing
to browse into documents through thumbs.

- Key: thumbexplorer

    | Description                                            | Parameter Key  | Type    |
    | ------------------------------------------------------ | -------------- | ------- |
    | Enable/disable the explorer                            | enabled        | Boolean |
    | Indentation between a master document and its children | indentation    | Pixels  |
    | Depth level of documents to load                       | maxLevelToLoad | Integer |
    | Enable/disable metadata display                        | metadata       | Boolean |

```cfg title="arender.properties"
# Disable the thumb explorer
thumbexplorer.enabled=false
```

The table below enumerates specific configuration related to thumbs.

- Key: thumbexplorer.thumb

   | Description                                   | Parameter Key  | Type    |
   | --------------------------------------------- | -------------- | ------- |
   | Default width of the thumbs                   | width          | Pixels  |
   | Margin between each thumb                     | margin         | Pixels  |
   | Explorer width from which thumbs are expanded | grow.min       | Pixels  |
   | Increment of thumb expanding                  | grow.increment | Pixels  |
   | NA                                            | grow.ratio     | Integer |

```cfg title="arender.properties"
# Define an explorer whose thumbs are expanded when it is maximized by a user
thumbexplorer.thumb.width=100
thumbexplorer.thumb.margin=200
thumbexplorer.thumb.increment=10
```

## Legacy annotation explorer

- Key: annotationexplorer

    | Description                                        | Property key          | Type    |
    | -------------------------------------------------- | --------------------- | ------- |
    | Enable/Disable this explorer                       | enabled               | Boolean |
    | Display Sticky note answer                         | showStickyNoteReplies | Boolean |
    | Display Sticky note label before content           | showStickyNoteLabel   | Boolean |
    | Adapt explorer size to fit to the annotation table | adaptiveWidth.enabled | Boolean |

```cfg title="arender.properties"
annotationexplorer.enabled=false
annotationExplorer.showStickyNoteReplies=false
annotationExplorer.showStickyNoteLabel=true
annotationExplorer.adaptativeWidth.enabled=false
```

## Annotation explorer

- Key: annotation.comment.explorer

    | Description                                                                | Property key                      | Type    |
    | -------------------------------------------------------------------------- | --------------------------------- | ------- |
    | Possibility to display annotations in minimized format                     | inline.enabled                    | Boolean |
    | Display annotations in minimized format when annotation explorer is opened | show.annotation.minimized.on.open | Boolean |

```cfg title="arender.properties"
annotation.comment.explorer.inline.enabled=true
annotation.comment.explorer.show.annotation.minimized.on.open=false
```

## Bookmark explorer

- Key: bookmarkexplorer

    | Description                  | Parameter Key | Type    |
    | ---------------------------- | ------------- | ------- |
    | Enable/Disable this explorer | enabled       | Boolean |

```cfg title="arender.properties"
# Disable the bookmark explorer
bookmarkexplorer.enabled=false
```
