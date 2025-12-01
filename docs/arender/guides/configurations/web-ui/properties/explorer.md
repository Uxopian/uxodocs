---
title: Document navigator
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 248c1d50d2bde0fe90c15d243403fac9339c2e96593f2505095376798447bc12
---







## General

By default, the document navigator is opened on the thumb explorer. The user can browse between panels by clicking on the corresponding icon. He can close the panel by clicking on the icon corresponding to the opened panel. 


| Description                                                        | Parameter Key                         | Default value | Type    |
| ------------------------------------------------------------------ | ------------------------------------- | ------------- | ------- |
| Width of document navigator (in pixels)                            | documentnavigator.width               | 320           | Integer |
| Width of search navigator (in pixels)                              | documentnavigator.search.width        | 400           | Integer |
| Width of annotations navigator (in pixels)                         | documentnavigator.annotation.width    | 400           | Integer |
| Time before splitter ears disappear (Deprecated in v.4.7.0, in ms) | documentnavigator.ears.hideTimerDelay | 100           | Integer |
| Position of the splitter on opening (Default, Reduced, Expanded)   | documentnavigator.initialWidth        | Default       | String  |
| Sets up the ratio to be applied to the document navigator          | documentnavigator.expand.reduce.ratio | 70            | Integer |

## Thumb explorer

The table below lists the general configuration of the explorer allowing
to browse into documents through thumbs.

| Description                                                                | Parameter Key                                 | Default value | Type         |
| -------------------------------------------------------------------------- | --------------------------------------------- | ------------- | ------------ |
| Enable/disable the explorer                                                | thumbexplorer.enabled                         | true          | Boolean      |
| Indentation between a master document and its children (in pixels)         | thumbexplorer.indentation                     | 20            | Integer      |
| Depth level of documents to load                                           | thumbexplorer.maxLevelToLoad                  | 10            | Integer      |
| Enable/disable metadata display                                            | thumbexplorer.metadata                        | true          | Boolean      |
| Allows thumbnails titles to have HTML content                              | thumbexplorer.title.allowHTML                 | false         | Boolean      |
| Thumbnails will display a popup information with document metadata (in ms) | thumbexplorer.layout.loading.delay            | 5             | Integer      |
| Allows to create an URL anchor to a page from the thumbnails               | thumbexplorer.contextualMenu.createPageAnchor | true          | Boolean      |



The table below enumerates specific configuration related to thumbs.


| Description                                                       | Parameter Key                      | Default value | Type    |
| ----------------------------------------------------------------- | ---------------------------------- | ------------- | ------- |
| Default width of the thumbs (in pixels)                           | thumbexplorer.thumb.width          | 100           | Integer |
| Margin between each thumb (in pixels)                             | thumbexplorer.thumb.margin         | 5             | Integer |
| Explorer width from which thumbs are expanded (in pixels)         | thumbexplorer.thumb.grow.min       | 300           | Integer |
| Increment of thumb expanding (in pixels)                          | thumbexplorer.thumb.grow.increment | 10            | Integer |
| Sets up the growth ratio corresponding to the growth of the panel | thumbexplorer.thumb.grow.ratio     | 1             | Integer |



## Comment explorer


| Description                                                                                                | Property key                                                  | Default value  | Type    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------- | ------- |
| Enable/Disable this explorer                                                                               | annotation.comment.explorer.enabled                           | true           | Boolean |
| Possibility to display annotations in minimized format                                                     | annotation.comment.explorer.inline.enabled                    | false          | Boolean |
| Display annotations in minimized format when annotation explorer is opened                                 | annotation.comment.explorer.show.annotation.minimized.on.open | false          | Boolean |
| Sets up the comment explorer on the east side of ARender                                                   | annotation.comment.explorer.eastSide.enabled                  | false          | Boolean |
| Opens the comment explorer when an annotation is edited                                                    | annotation.comment.explorer.openOnEdit                        | false          | Boolean |
| Animate while expanding the comment explorer                                                               | annotation.comment.explorer.animate.on.expand                 | true           | Boolean |
| Shows a simplified list of all authors on the comment explorer tab                                         | annotation.comment.explorer.showAllAnnotators                 | true           | Boolean |
| Shows a total number of annotations on the comment explorer tab                                            | annotation.comment.explorer.showTotalAnnotationsNumber        | false          | Boolean |
| Shows the comment explorer at startup of ARender as default panel                                          | annotation.comment.explorer.showAtStartup                     | false          | Boolean |
| Enable/Disable to also filter annotations in the page view                                                 | annotation.comment.explorer.filterPageAnnotations             | false          | Boolean |
| Set the sorting in increment otherwise in decrement date                                                   | annotation.comment.explorer.sortByIncrementDate               | true           | Boolean |
| Allow the display of the date or not                                                                       | annotation.comment.explorer.show.date                         | true           | Boolean |
| Display only the initials of the creator name                                                              | annotation.comment.explorer.creator.name.initial.only         | false          | Boolean |
| Enable to display only one annotation per page                                                             | annotation.comment.explorer.show.one.annotation.only          | false          | Boolean |
| Display target icon when annotation is other than numbered sticky note, otherwise the annotation type icon | annotation.comment.display.target.enabled                     | false          | Boolean |
| Enable to enter in edition mode when clicking on a comment zone                                            | comment.edit.annotation.onselection.enabled                   | true           | Boolean |



## Bookmark explorer


| Description                                           | Parameter Key                            | Default value | Type    |
| ----------------------------------------------------- | ---------------------------------------- | ------------- | ------- |
| Enable/Disable this explorer                          | bookmarkexplorer.enabled                 | true          | Boolean |
| Show the bookmark explorer at the application startup | bookmarkexplorer.showAtStartup           | false         | Boolean |
| Make the bookmarks draggable                          | bookmarkexplorer.draggable               | true          | Boolean |
| Enable/Disable the bookmark creation                  | bookmarkexplorer.add.bookmark.enabled    | true          | Boolean |
| Enable/Disable the bookmark deletion                  | bookmarkexplorer.delete.bookmark.enabled | true          | Boolean |
| Enable/Disable the bookmark animation                 | bookmarkexplorer.animation.enabled       | true          | Boolean |


## Advanced search explorer 

| Description                                                                         | Parameter Key                                    | Default value | Type    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- | ------- |
| Enable/Disable this explorer                                                        | advanced.searchexplorer.enabled                  | true          | Boolean |
| Sets up the minimum character length allowed                                        | advanced.searchexplorer.min.characterLength      | 0             | Integer |
| Sets up the maximum character length allowed                                        | advanced.searchexplorer.max.characterLength      | 255           | Integer |
| Search is updated on annotation refresh when the advanced search explorer is active | advanced.searchexplorer.updates.enabled          | false         | Boolean |
| The button for search and highlight is enabled                                      | advanced.searchexplorer.search.highlight.enabled | true          | Boolean |



## Hyperlink explorer


| Description                  | Parameter Key             | Default value | Type    |
| ---------------------------- | ------------------------- | ------------- | ------- |
| Enable/Disable this explorer | hyperlinkexplorer.enabled | true          | Boolean |



## Redact explorer

| Description                                   | Parameter Key             | Default value | Type    |
| --------------------------------------------- | ------------------------- | ------------- | ------- |
| Enable/Disable this explorer                  | redactexplorer.enabled    | false         | Boolean |
| Activate the redact annotation button         | redactexplorer.redact     | true          | Boolean |
| Activate the redact annotation zone button    | redactexplorer.redactZone | true          | Boolean |
