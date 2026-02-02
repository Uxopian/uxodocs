---
title: Properties
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 696fcce549ada45fdd59c15c6a96a761fa2851a3d1a6c7cb02785d3066bc3183
---
## about
### about.dialog.statistics.enable

- **Type:** boolean
- **Description:** Disable/enable showing statistics in the about dialog box
- **Default:**

    ```python
    about.dialog.statistics.enable=true
    ```
### about.dialog.statistics.table.enable

- **Type:** boolean
- **Description:** Disable/enable showing table statistics in the about dialog box (removes as well the graph values)
- **Default:**

    ```python
    about.dialog.statistics.table.enable=true
    ```
### about.dialog.statistics.charts.enable

- **Type:** boolean
- **Description:** Disable/enable the charts in the statistics section pulls the library from google API (gwt charts)
- **Default:**

    ```python
    about.dialog.statistics.charts.enable=false
    ```
### about.dialog.show.current.version

- **Type:** boolean
- **Description:** Displays the current version in the about dialog box
- **Default:**

    ```python
    about.dialog.show.current.version=true
    ```
### about.dialog.show.current.user

- **Type:** boolean
- **Description:** Displays the current user in the about dialog box
- **Default:**

    ```python
    about.dialog.show.current.user=true
    ```

## advanced
### advanced.searchexplorer.enabled

- **Type:** boolean
- **Description:** If true, enables the advanced search explorer
- **Default:**

    ```python
    advanced.searchexplorer.enabled=true
    ```
### advanced.searchexplorer.min.characterLength

- **Type:** integer
- **Description:** Sets up the minimum character length allowed
- **Default:**

    ```python
    advanced.searchexplorer.min.characterLength=0
    ```
### advanced.searchexplorer.max.characterLength

- **Type:** integer
- **Description:** Sets up the maximum character length allowed
- **Default:**

    ```python
    advanced.searchexplorer.max.characterLength=255
    ```
### advanced.searchexplorer.tooltipOnHover.enabled

- **Type:** boolean
- **Description:** If true, enables tooltip on hover
- **Default:**

    ```python
    advanced.searchexplorer.tooltipOnHover.enabled=true
    ```
### advanced.searchexplorer.caseSensitive.tooltip.enabled

- **Type:** boolean
- **Description:** If true, enables case sensitive tooltip
- **Default:**

    ```python
    advanced.searchexplorer.caseSensitive.tooltip.enabled=false
    ```
### advanced.searchexplorer.accentSensitive.tooltip.enabled

- **Type:** boolean
- **Description:** If true, enables accent sensitive tooltip
- **Default:**

    ```python
    advanced.searchexplorer.accentSensitive.tooltip.enabled=false
    ```
### advanced.searchexplorer.regex.tooltip.enabled

- **Type:** boolean
- **Description:** If true, enables regex tooltip
- **Default:**

    ```python
    advanced.searchexplorer.regex.tooltip.enabled=true
    ```
### advanced.searchexplorer.updates.enabled

- **Type:** boolean
- **Description:** If true, search is updated on annotation refresh when the the advanced search explorer is active
- **Default:**

    ```python
    advanced.searchexplorer.updates.enabled=false
    ```

## annotation
### annotation.canHideObfuscate

- **Type:** boolean
- **Description:** If true, all redaction annotations can be hidden using the regular hide annotations button
- **Default:**

    ```python
    annotation.canHideObfuscate=false
    ```
### annotation.autosave

- **Type:** boolean
- **Description:** Allows annotations to be automatically save after edition
- **Default:**

    ```python
    annotation.autosave=false
    ```
### annotation.autorefresh

- **Type:** boolean
- **Description:** Auto refreshes the annotations after save
- **Default:**

    ```python
    annotation.autorefresh=true
    ```
### annotation.autosave.timerDelay

- **Type:** integer
- **Description:** Auto save annotation timer delay in milliseconds
- **Default:**

    ```python
    annotation.autosave.timerDelay=1000
    ```
### annotation.loadingGIF

- **Type:** boolean
- **Description:** When saving annotations, display the loading animation
- **Default:**

    ```python
    annotation.loadingGIF=true
    ```
### annotation.loadExisting

- **Type:** boolean
- **Description:** Load the existing document annotations on display
- **Default:**

    ```python
    annotation.loadExisting=true
    ```
### annotation.displaySaveWarning

- **Type:** boolean
- **Description:** Display a warning to the end user when annotations are left unsaved
- **Default:**

    ```python
    annotation.displaySaveWarning=true
    ```
### annotation.forceReadOnly

- **Type:** boolean
- **Description:** All saved annotations will be set to read only
- **Default:**

    ```python
    annotation.forceReadOnly=false
    ```
### annotation.forceLocked

- **Type:** boolean
- **Description:** All saved annotations will be set to locked
- **Default:**

    ```python
    annotation.forceLocked=false
    ```
### annotation.comment.pictogram.enabled

- **Type:** boolean
- **Description:** Display a pictogram near the commented annotation
- **Default:**

    ```python
    annotation.comment.pictogram.enabled=true
    ```
### annotation.stickyNote.opacity

- **Type:** float
- **Description:** Opacity of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.opacity=1.0
    ```
### annotation.stickyNote.minimum.width

- **Type:** integer
- **Description:** Minimum width in pixel of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.minimum.width=140
    ```
### annotation.stickyNote.minimum.height

- **Type:** integer
- **Description:** Minimum height in pixel of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.minimum.height=70
    ```
### annotation.stickyNote.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.color=#F3F001
    ```
### annotation.stickyNote.hide.border

- **Type:** boolean
- **Description:** Hide borders options of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.hide.border=true
    ```
### annotation.stickyNote.hide.details

- **Type:** boolean
- **Description:** Hide details of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.hide.details=false
    ```
### annotation.stickyNote.default.font

- **Type:** String
- **Description:** Font of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.font=Helvetica
    ```
### annotation.stickyNote.default.fontColor

- **Type:** Color, in format #RRGGBB
- **Description:** Font color of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.fontColor=#000000
    ```
### annotation.stickyNote.default.fontSize

- **Type:** integer
- **Description:** Font size of the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.fontSize=2
    ```
### annotation.stickyNote.default.bold

- **Type:** boolean
- **Description:** Set the font bold by default for the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.bold=false
    ```
### annotation.stickyNote.default.underline

- **Type:** boolean
- **Description:** Set the font underlined by default for the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.underline=false
    ```
### annotation.stickyNote.default.italic

- **Type:** boolean
- **Description:** Set the font italic by default for the sticky note annotation
- **Default:**

    ```python
    annotation.stickyNote.default.italic=false
    ```
### annotation.stickyNote.dotLink.enabled

- **Type:** boolean
- **Description:** Enables a link between the pin and the note for sticky note
- **Default:**

    ```python
    annotation.stickyNote.dotLink.enabled=true
    ```
### annotation.stickyNote.pin.default.size

- **Type:** integer
- **Description:** Default pin size in pixel for the sticky note
- **Default:**

    ```python
    annotation.stickyNote.pin.default.size=20
    ```
### annotation.stickyNote.adapt.font.size.enabled

- **Type:** boolean
- **Description:** Adapt sticky note font size according to the zoom ratio
- **Default:**

    ```python
    annotation.stickyNote.adapt.font.size.enabled=false
    ```
### annotation.popup.autohide.delay.ms

- **Type:** integer
- **Description:** Auto hide delay in milliseconds for the annotation popups
- **Default:**

    ```python
    annotation.popup.autohide.delay.ms=300
    ```
### annotation.popup.default.background.color

- **Type:** Color, in format #RRGGBB
- **Description:** Popup fallback background color when the annotation background color is empty
- **Default:**

    ```python
    annotation.popup.default.background.color=#F6F6F6
    ```
### annotation.rectangle.opacity

- **Type:** float
- **Description:** Opacity for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.opacity=0.7
    ```
### annotation.rectangle.minimum.width

- **Type:** integer
- **Description:** Minimum width in pixel for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.minimum.width=30
    ```
### annotation.rectangle.minimum.height

- **Type:** integer
- **Description:** Minimum height in pixel for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.minimum.height=10
    ```
### annotation.rectangle.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.default.color=#EAF39C
    ```
### annotation.rectangle.default.border.color

- **Type:** Color, in format #RRGGBB
- **Description:** Border color for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.default.border.color=#EAF39C
    ```
### annotation.rectangle.default.border.width

- **Type:** integer
- **Description:** Border width in pixel for the rectangle annotation
- **Default:**

    ```python
    annotation.rectangle.default.border.width=0
    ```
### annotation.circle.opacity

- **Type:** float
- **Description:** Opacity for the circle annotation
- **Default:**

    ```python
    annotation.circle.opacity=0.7
    ```
### annotation.circle.minimum.width

- **Type:** integer
- **Description:** Minimum width in pixel for the circle annotation
- **Default:**

    ```python
    annotation.circle.minimum.width=30
    ```
### annotation.circle.minimum.height

- **Type:** integer
- **Description:** Minimum height for the circle annotation
- **Default:**

    ```python
    annotation.circle.minimum.height=10
    ```
### annotation.circle.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the circle annotation
- **Default:**

    ```python
    annotation.circle.default.color=#EAF39C
    ```
### annotation.circle.default.border.color

- **Type:** Color, in format #RRGGBB
- **Description:** Border color for the circle annotation
- **Default:**

    ```python
    annotation.circle.default.border.color=#EAF39C
    ```
### annotation.circle.default.border.width

- **Type:** integer
- **Description:** Border width in pixel for the circle annotation
- **Default:**

    ```python
    annotation.circle.default.border.width=0
    ```
### annotation.highlighttext.opacity

- **Type:** float
- **Description:** Opacity for the highlight annotation
- **Default:**

    ```python
    annotation.highlighttext.opacity=0.7
    ```
### annotation.highlighttext.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the highlight annotation
- **Default:**

    ```python
    annotation.highlighttext.default.color=#EAF39C
    ```
### annotation.redaction.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the redaction annotation
- **Default:**

    ```python
    annotation.redaction.default.color=#273746
    ```
### annotation.highlighttext.strike.width.ratio

- **Type:** float
- **Description:** Strike width ratio for underline - strike through annotations
- **Default:**

    ```python
    annotation.highlighttext.strike.width.ratio=0.1
    ```
### annotation.freetext.opacity

- **Type:** float
- **Description:** Opacity for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.opacity=0.7
    ```
### annotation.freetext.minimum.width

- **Type:** integer
- **Description:** Minimum width in pixel for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.minimum.width=30
    ```
### annotation.freetext.minimum.height

- **Type:** integer
- **Description:** Minimum height in pixel for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.minimum.height=10
    ```
### annotation.freetext.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.default.color=#EEEEEE
    ```
### annotation.freetext.default.border.color

- **Type:** Color, in format #RRGGBB
- **Description:** Border color for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.default.border.color=#FF0000
    ```
### annotation.freetext.default.border.width

- **Type:** integer
- **Description:** Border width in pixel for the Freetext annotation
- **Default:**

    ```python
    annotation.freetext.default.border.width=2
    ```
### annotation.freetext.adapt.font.size.enabled

- **Type:** boolean
- **Description:** Adapt font size according to the zoom ratio
- **Default:**

    ```python
    annotation.freetext.adapt.font.size.enabled=false
    ```
### annotation.arrow.backgroundColor

- **Type:** Color, in format rgb(r,g,b)
- **Description:** Arrow annotation color
- **Default:**

    ```python
    annotation.arrow.backgroundColor=rgb(42, 72, 105)
    ```
### annotation.arrow.computeDistance

- **Type:** boolean
- **Description:** Allow arrows to measure distances
- **Default:**

    ```python
    annotation.arrow.computeDistance=false
    ```
### annotation.arrow.minimal.head.size

- **Type:** integer
- **Description:** Defines a minimal head size in pixel for arrows
- **Default:**

    ```python
    annotation.arrow.minimal.head.size=-1
    ```
### annotation.arrow.x.defaultDistance

- **Type:** integer
- **Description:** Defines a base distance for the head of arrow in X in pixel
- **Default:**

    ```python
    annotation.arrow.x.defaultDistance=12
    ```
### annotation.arrow.y.defaultDistance

- **Type:** integer
- **Description:** Defines a base distance for the head of arrow in Y in pixel
- **Default:**

    ```python
    annotation.arrow.y.defaultDistance=12
    ```
### annotation.polygon.opacity

- **Type:** float
- **Description:** Opacity for the polygon annotation
- **Default:**

    ```python
    annotation.polygon.opacity=0.7
    ```
### annotation.polygon.backgroundColor

- **Type:** Color, in format rgb(r,g,b)
- **Description:** Color for the polygon annotation
- **Default:**

    ```python
    annotation.polygon.backgroundColor=rgb(42, 72, 105)
    ```
### annotation.polygon.width

- **Type:** float
- **Description:** Border width for the polygon annotation
- **Default:**

    ```python
    annotation.polygon.width=2.0f
    ```
### annotation.polyline.opacity

- **Type:** integer
- **Description:** Opacity for the polyline annotation
- **Default:**

    ```python
    annotation.polyline.opacity=1
    ```
### annotation.polyline.backgroundColor

- **Type:** Color, in format rgb(r,g,b)
- **Description:** Color for the polyline annotation
- **Default:**

    ```python
    annotation.polyline.backgroundColor=rgb(42, 72, 105)
    ```
### annotation.polyline.width

- **Type:** float
- **Description:** Border width for the polyline annotation
- **Default:**

    ```python
    annotation.polyline.width=2.0f
    ```
### annotation.ink.opacity

- **Type:** integer
- **Description:** Opacity for the freehand annotation
- **Default:**

    ```python
    annotation.ink.opacity=1
    ```
### annotation.ink.backgroundColor

- **Type:** Color, in format rgb(r,g,b)
- **Description:** Color for the freehand annotation
- **Default:**

    ```python
    annotation.ink.backgroundColor=rgb(42, 72, 105)
    ```
### annotation.ink.width

- **Type:** float
- **Description:** Border width for the freehand annotation
- **Default:**

    ```python
    annotation.ink.width=2.0f
    ```
### annotation.hyperlink.opacity

- **Type:** float
- **Description:** Opacity for the Hyperlink annotation
- **Default:**

    ```python
    annotation.hyperlink.opacity=0.5f
    ```
### annotation.hyperlink.default.color

- **Type:** Color, in format #RRGGBB
- **Description:** Color for the Hyperlink annotation
- **Default:**

    ```python
    annotation.hyperlink.default.color=#0000FF
    ```
### annotation.stamp.create.in.browser.orientation

- **Type:** boolean
- **Description:** Allow stamps to be create in the current browser orientation (including document rotations)
- **Default:**

    ```python
    annotation.stamp.create.in.browser.orientation=false
    ```
### annotation.stampCustom.enabled

- **Type:** boolean
- **Description:** Allow custom stamp to be created
- **Default:**

    ```python
    annotation.stampCustom.enabled=true
    ```
### annotation.stampCustom.maxFavorite

- **Type:** integer
- **Description:** Maximum of custom stamp allowed to be added in favorite
- **Default:**

    ```python
    annotation.stampCustom.maxFavorite=15
    ```
### annotation.freetext.drag.widgets.on.edit

- **Type:** boolean
- **Description:** Auto activate the draggable widgets for the Freetext when in edition mode.
- **Default:**

    ```python
    annotation.freetext.drag.widgets.on.edit=true
    ```
### annotation.rotation.windmillEffect.enabled

- **Type:** boolean
- **Description:** Stamp rotation effect in video mode (easter egg)
- **Default:**

    ```python
    annotation.rotation.windmillEffect.enabled=false
    ```
### annotation.loadPerPage

- **Type:** boolean
- **Description:** Annotations are loaded per page
- **Default:**

    ```python
    annotation.loadPerPage=false
    ```
### annotation.searchTextInAnnotations

- **Type:** boolean
- **Description:** When searching for text, also search within annotation content
- **Default:**

    ```python
    annotation.searchTextInAnnotations=true
    ```
### annotation.default.stroke.dasharray

- **Type:** String
- **Description:** Default dash array style when the border style is set to DASH
- **Default:**

    ```python
    annotation.default.stroke.dasharray=5.0,2.0
    ```
### annotation.info.popup.enabled

- **Type:** boolean
- **Description:** Activate the info popup for annotations
- **Default:**

    ```python
    annotation.info.popup.enabled=true
    ```
### annotation.info.popup.evenIfEditable

- **Type:** boolean
- **Description:** Activate the popup info for annotations who aren't editable
- **Default:**

    ```python
    annotation.info.popup.evenIfEditable=false
    ```
### annotation.info.popup.displayUpdate

- **Type:** boolean
- **Description:** Display the last updated time for the annotation
- **Default:**

    ```python
    annotation.info.popup.displayUpdate=false
    ```
### annotation.comment.explorer.enabled

- **Type:** boolean
- **Description:** Activates the comment explorer for displaying annotation details
- **Default:**

    ```python
    annotation.comment.explorer.enabled=true
    ```
### annotation.comment.explorer.eastSide.enabled

- **Type:** boolean
- **Description:** Sets up the comment explorer on the east side of ARender
- **Default:**

    ```python
    annotation.comment.explorer.eastSide.enabled=false
    ```
### annotation.comment.explorer.openOnEdit

- **Type:** boolean
- **Description:** Opens the comment explorer when an annotation is edited
- **Default:**

    ```python
    annotation.comment.explorer.openOnEdit=false
    ```
### annotation.comment.explorer.showAllAnnotators

- **Type:** boolean
- **Description:** Shows a simplified list of all authors on the comment explorer tab
- **Default:**

    ```python
    annotation.comment.explorer.showAllAnnotators=true
    ```
### annotation.comment.explorer.showTotalAnnotationsNumber

- **Type:** boolean
- **Description:** Shows a total number of annotations on the comment explorer tab
- **Default:**

    ```python
    annotation.comment.explorer.showTotalAnnotationsNumber=false
    ```
### annotation.comment.explorer.showAtStartup

- **Type:** boolean
- **Description:** Shows the comment explorer at startup of ARender as default pane
- **Default:**

    ```python
    annotation.comment.explorer.showAtStartup=false
    ```
### annotation.use.local.storage

- **Type:** boolean
- **Description:** Use local storage for annotation preferences
- **Default:**

    ```python
    annotation.use.local.storage=false
    ```

## annotationExplorer
### annotationExplorer.showStickyNoteReplies

- **Type:** boolean
- **Description:** Legacy annotation explorer, show the sticky notes replies
- **Default:**

    ```python
    annotationExplorer.showStickyNoteReplies=false
    ```
### annotationExplorer.showStickyNoteLabel

- **Type:** boolean
- **Description:** Legacy annotation explorer, show the sticky notes labels
- **Default:**

    ```python
    annotationExplorer.showStickyNoteLabel=true
    ```
### annotationExplorer.adaptativeWidth.enabled

- **Type:** boolean
- **Description:** Legacy annotation explorer, adapts the width of the panel accordingly
- **Default:**

    ```python
    annotationExplorer.adaptativeWidth.enabled=true
    ```

## annotationexplorer
### annotationexplorer.enabled

- **Type:** boolean
- **Description:** If true, enables the legacy annotation explorer
- **Default:**

    ```python
    annotationexplorer.enabled=false
    ```

## arender
### arender.web.socket.enabled

- **Type:** boolean
- **Description:** Enables web socket and try to initiate the web socket if the browser web socket is available.
  By enabling web sockets, it will try to use it to retrieve the document layout if it is taking more than a second, 
  for example when a conversion is needed, which can optimizes performances.
- **Default:**

    ```python
    arender.web.socket.enabled=true
    ```
### arender.pollLastVersion

- **Type:** boolean
- **Description:** Enables ARender version check
- **Default:**

    ```python
    arender.pollLastVersion=true
    ```

## arenderjs
### arenderjs.startupScript

- **Type:** String
- **Description:** ARenderJS Configuration: customization startup script URL
- **Default:** 
    ```python
    (none, or empty by default)
    ```

## bookmarkexplorer
### bookmarkexplorer.enabled

- **Type:** boolean
- **Description:** If true, enables the bookmark explorer
- **Default:**

    ```python
    bookmarkexplorer.enabled=true
    ```
### bookmarkexplorer.showAtStartup

- **Type:** boolean
- **Description:** If true, show the bookmark explorer at the application startup
- **Default:**

    ```python
    bookmarkexplorer.showAtStartup=false
    ```
### bookmarkexplorer.draggable

- **Type:** boolean
- **Description:** If true, make the bookmarks draggable
- **Default:**

    ```python
    bookmarkexplorer.draggable=false
    ```
### bookmarkexplorer.add.bookmark.enabled

- **Type:** boolean
- **Description:** If true, enables the bookmark creation
- **Default:**

    ```python
    bookmarkexplorer.add.bookmark.enabled=true
    ```
### bookmarkexplorer.delete.bookmark.enabled

- **Type:** boolean
- **Description:** If true, enables the bookmark deletion
- **Default:**

    ```python
    bookmarkexplorer.delete.bookmark.enabled=true
    ```

## comment
### comment.showAnnotationImage

- **Type:** boolean
- **Description:** Shows in the comment explorer an icon of the annotation
- **Default:**

    ```python
    comment.showAnnotationImage=true
    ```
### comment.textArea.maxHeight

- **Type:** integer
- **Description:** Comment text area max height corresponds to the maximum height when expanding the text with the button "Show more", in pixels
- **Default:**

    ```python
    comment.textArea.maxHeight=0
    ```
### comment.contextStatusMenu.enabled

- **Type:** boolean
- **Description:** Enable contextual status menu will allow to right click on an comment annotation to add a status
- **Default:**

    ```python
    comment.contextStatusMenu.enabled=false
    ```
### comment.multiple.thread.level.enabled

- **Type:** boolean
- **Description:** Enable multiple comment thread level display
- **Default:**

    ```python
    comment.multiple.thread.level.enabled=false
    ```
### comment.richtext.shortcut.enabled

- **Type:** boolean
- **Description:** Enable richtext shortcut: [Enter] validates the annotation comment and [Shift]+[Enter] makes a new line
- **Default:**

    ```python
    comment.richtext.shortcut.enabled=false
    ```

## contextualMenu
### contextualMenu.enabled

- **Type:** boolean
- **Description:** Activates ARender contextual right click menu
- **Default:**

    ```python
    contextualMenu.enabled=true
    ```
### contextualMenu.icons.enabled

- **Type:** boolean
- **Description:** Activates ARender contextual icons mode
- **Default:**

    ```python
    contextualMenu.icons.enabled=false
    ```
### contextualMenu.hasPrint

- **Type:** boolean
- **Description:** Enables the print option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasPrint=false
    ```
### contextualMenu.hasPrintAll

- **Type:** boolean
- **Description:** Enables the print all documents option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasPrintAll=false
    ```
### contextualMenu.hasStickyNote

- **Type:** boolean
- **Description:** Enables the create a sticky note option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasStickyNote=true
    ```
### contextualMenu.hasCropBoxImage

- **Type:** boolean
- **Description:** Enables the create a cropbox image from the contextual menu
- **Default:**

    ```python
    contextualMenu.hasCropBoxImage=false
    ```
### contextualMenu.hasHighlightText

- **Type:** boolean
- **Description:** Enables a textual highlight annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasHighlightText=true
    ```
### contextualMenu.hasStrikeoutText

- **Type:** boolean
- **Description:** Enables a strike through annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasStrikeoutText=true
    ```
### contextualMenu.hasUnderlineText

- **Type:** boolean
- **Description:** Enables an underline annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasUnderlineText=true
    ```
### contextualMenu.hasHighlight

- **Type:** boolean
- **Description:** Enables an highlight annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasHighlight=true
    ```
### contextualMenu.hasCircle

- **Type:** boolean
- **Description:** Enables a circle annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasCircle=true
    ```
### contextualMenu.hasArrow

- **Type:** boolean
- **Description:** Enables an arrow annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasArrow=true
    ```
### contextualMenu.hasPolygon

- **Type:** boolean
- **Description:** Enables a polygon annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasPolygon=false
    ```
### contextualMenu.hasPolyline

- **Type:** boolean
- **Description:** Enables a polyline annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasPolyline=false
    ```
### contextualMenu.hasFreehand

- **Type:** boolean
- **Description:** Enables a freehand annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasFreehand=false
    ```
### contextualMenu.hasPageRotation

- **Type:** boolean
- **Description:** Enables the rotate option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasPageRotation=false
    ```
### contextualMenu.hasMultiView

- **Type:** boolean
- **Description:** Enables the open multiview option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasMultiView=false
    ```
### contextualMenu.hasShowGuideRuler

- **Type:** boolean
- **Description:** Enables the "show guide here" option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasShowGuideRuler=false
    ```
### contextualMenu.hasHideGuideRuler

- **Type:** boolean
- **Description:** Enables the "hide guide ruler" option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasHideGuideRuler=false
    ```
### contextualMenu.hasHyperlink

- **Type:** boolean
- **Description:** Enables a hyperlink creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasHyperlink=true
    ```
### contextualMenu.hasAnchor

- **Type:** boolean
- **Description:** Enables an anchor creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasAnchor=true
    ```
### contextualMenu.hasStamp

- **Type:** boolean
- **Description:** Enables a stamp annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasStamp=false
    ```
### contextualMenu.hasFreetext

- **Type:** boolean
- **Description:** Enables a freetext annotation creation option for the contextual menu
- **Default:**

    ```python
    contextualMenu.hasFreetext=false
    ```

## date
### date.format

- **Type:** String
- **Description:** Specify the date format for the annotations
- **Default:**

    ```python
    date.format=dd-MM-yyyy HH:mm:ss
    ```

## document
### document.vertical.slider.changeToPage.enabled

- **Type:** boolean
- **Description:** Enabling the scroll by step instead of jumping to page on the scrollUp and scrollDown button
- **Default:**

    ```python
    document.vertical.slider.changeToPage.enabled=false
    ```
### document.vertical.slider.new.click.scrollbar.behavior

- **Type:** boolean
- **Description:** No description yet provided
- **Default:**

    ```python
    document.vertical.slider.new.click.scrollbar.behavior=true
    ```
### document.progressiveLoading

- **Type:** boolean
- **Description:** Activates the progressive loading of ARender front end side (the layout is asked by parts from the front end)
- **Default:**

    ```python
    document.progressiveLoading=false
    ```
### document.loading.progress.update

- **Type:** boolean
- **Description:** Update and notify the end user to the progressive loading mechanisms
- **Default:**

    ```python
    document.loading.progress.update=true
    ```

## documentbuilder
### documentbuilder.enabled

- **Type:** boolean
- **Description:** Enables the document builder button (and feature)
- **Default:**

    ```python
    documentbuilder.enabled=false
    ```
### documentbuilder.button.visible

- **Type:** boolean
- **Description:** Sets the document builder button visible
- **Default:**

    ```python
    documentbuilder.button.visible=true
    ```
### documentbuilder.activateOnStartup

- **Type:** boolean
- **Description:** Activate the document builder at startup as soon as the documents are ready
- **Default:**

    ```python
    documentbuilder.activateOnStartup=false
    ```
### documentbuilder.hideDocumentNavigator

- **Type:** boolean
- **Description:** Hide the document navigator once the document builder is opened
- **Default:**

    ```python
    documentbuilder.hideDocumentNavigator=true
    ```
### documentbuilder.displaySaveWarning

- **Type:** boolean
- **Description:** Display a save warning if a document with modifications is left when leaving ARender
- **Default:**

    ```python
    documentbuilder.displaySaveWarning=true
    ```
### documentbuilder.thumbs.draggable

- **Type:** boolean
- **Description:** Make the document builder thumbnails draggable in order to organize the pages
- **Default:**

    ```python
    documentbuilder.thumbs.draggable=true
    ```
### documentbuilder.width

- **Type:** integer
- **Description:** Sets the document builder panel width
- **Default:**

    ```python
    documentbuilder.width=280
    ```
### documentbuilder.save.action

- **Type:** String
- **Description:** Sets the document builder default save button action
- **Default:**

    ```python
    documentbuilder.save.action=save
    ```
### documentbuilder.save.behavior

- **Type:** String
- **Description:** Sets the document builder save behavior (legacy): UPDATE_NO_DOCUMENT, CREATE_NEW_FIRST_DOCUMENT, UPDATE_FIRST_DOCUMENT, UPDATE_ALL_DOCUMENT
- **Default:**

    ```python
    documentbuilder.save.behavior=UPDATE_NO_DOCUMENT
    ```
### documentbuilder.save.download

- **Type:** boolean
- **Description:** Activates the local download builder button
- **Default:**

    ```python
    documentbuilder.save.download=true
    ```
### documentbuilder.save.delete

- **Type:** boolean
- **Description:** Activates the delete current document from the builder button
- **Default:**

    ```python
    documentbuilder.save.delete=false
    ```
### documentbuilder.save.freeze

- **Type:** boolean
- **Description:** Once documents are built, a frozen title will remain and need to be manually removed to confirm the operation
- **Default:**

    ```python
    documentbuilder.save.freeze=true
    ```
### documentbuilder.addChild.enabled

- **Type:** boolean
- **Description:** Allow the document builder to create child documents (folders)
- **Default:**

    ```python
    documentbuilder.addChild.enabled=false
    ```
### documentbuilder.createDocument.enabled

- **Type:** boolean
- **Description:** Allow the document builder to create new documents (not only compose)
- **Default:**

    ```python
    documentbuilder.createDocument.enabled=true
    ```
### documentbuilder.deleteSelectedThumbs.enabled

- **Type:** boolean
- **Description:** Activate the feature to delete on right click a list of selected thumbs
- **Default:**

    ```python
    documentbuilder.deleteSelectedThumbs.enabled=true
    ```
### documentbuilder.createDocumentFromSelectedThumbs.enabled

- **Type:** boolean
- **Description:** Activate the feature to create a new document from selected thumbs
- **Default:**

    ```python
    documentbuilder.createDocumentFromSelectedThumbs.enabled=true
    ```
### documentbuilder.close.enabled

- **Type:** boolean
- **Description:** Activate the contextual menu option to close the builder
- **Default:**

    ```python
    documentbuilder.close.enabled=true
    ```
### documentbuilder.button.legacySave.enabled

- **Type:** boolean
- **Description:** Activate the legacy save document builder button
- **Default:**

    ```python
    documentbuilder.button.legacySave.enabled=false
    ```
### documentbuilder.button.download.enabled

- **Type:** boolean
- **Description:** Activate the button: download the builder document locally
- **Default:**

    ```python
    documentbuilder.button.download.enabled=true
    ```
### documentbuilder.button.custom.enabled

- **Type:** boolean
- **Description:** Activate the button: run custom action on builder document
- **Default:**

    ```python
    documentbuilder.button.custom.enabled=false
    ```
### documentbuilder.button.download.annotations.enabled

- **Type:** boolean
- **Description:** Activate the button: download the builder document with annotation
- **Default:**

    ```python
    documentbuilder.button.download.annotations.enabled=false
    ```
### documentbuilder.button.updateAll.enabled

- **Type:** boolean
- **Description:** Activate the button: update all documents
- **Default:**

    ```python
    documentbuilder.button.updateAll.enabled=false
    ```
### documentbuilder.button.createFirst.enabled

- **Type:** boolean
- **Description:** Activate the button: Create new first document
- **Default:**

    ```python
    documentbuilder.button.createFirst.enabled=false
    ```
### documentbuilder.button.updateFirst.enabled

- **Type:** boolean
- **Description:** Activate the button: Update the document
- **Default:**

    ```python
    documentbuilder.button.updateFirst.enabled=false
    ```
### documentbuilder.button.saveAll.enabled

- **Type:** boolean
- **Description:** If active, the saveAll button will visible
- **Default:**

    ```python
    documentbuilder.button.saveAll.enabled=false
    ```
### documentbuilder.button.saveAll.active.when.empty

- **Type:** boolean
- **Description:** If active, the saveAll button will be always visible if enabled, even if documents are empty
- **Default:**

    ```python
    documentbuilder.button.saveAll.active.when.empty=false
    ```
### documentbuilder.button.updateAll.active.when.empty

- **Type:** boolean
- **Description:** If active, the updateAll button will be always visible if enabled, even if documents are empty
- **Default:**

    ```python
    documentbuilder.button.updateAll.active.when.empty=false
    ```
### documentbuilder.populatorPolicy

- **Type:** String
- **Description:** Sets up the policy to populate the document builder: CopyCurrentDocument or EmptyDocument
- **Default:**

    ```python
    documentbuilder.populatorPolicy=CopyCurrentDocument
    ```
### documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy

- **Type:** boolean
- **Description:** Sets up the policy CopyCurrentDocument from the builder, does it need to flatten the documents indentation or not
- **Default:**

    ```python
    documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy=true
    ```
### documentbuilder.button.hideUntilLoaded

- **Type:** boolean
- **Description:** Hides the document builder button until all documents have been loaded
- **Default:**

    ```python
    documentbuilder.button.hideUntilLoaded=true
    ```
### documentbuilder.afterDownload

- **Type:** String
- **Description:** Thumb navigator view behavior after processing a download in documentbuilder: hide, disable, nochange
- **Default:**

    ```python
    documentbuilder.afterDownload=hide
    ```
### documentbuilder.button.refresh.enabled

- **Type:** boolean
- **Description:** Activate the button: Refresh the document to its original state
- **Default:**

    ```python
    documentbuilder.button.refresh.enabled=true
    ```
### documentbuilder.button.page.removal.enabled

- **Type:** boolean
- **Description:** Activate the red cross button to remove a page in the document builder. 
- **Default:**

    ```python
    documentbuilder.button.page.removal.enabled=true
    ```
### documentbuilder.button.document.removal.enabled

- **Type:** boolean
- **Description:** Activate the cross button to delete the document in the document builder
- **Default:**

    ```python
    documentbuilder.button.document.removal.enabled=true
    ```

## documentnavigator
### documentnavigator.width

- **Type:** integer
- **Description:** Sets up the width (in pixel) of the document navigator (left tabs of ARender)
- **Default:**

    ```python
    documentnavigator.width=255
    ```
### documentnavigator.ears.hideTimerDelay

- **Type:** integer
- **Description:** Sets up the time (in ms) to auto hide the arrow for maximizing or reducing the document navigator
- **Default:**

    ```python
    documentnavigator.ears.hideTimerDelay=500
    ```
### documentnavigator.initialWidth

- **Type:** String
- **Description:** Sets up the default position of the document navigator tabs: Default, Reduced or Expanded
- **Default:**

    ```python
    documentnavigator.initialWidth=Default
    ```
### documentnavigator.expand.reduce.ratio

- **Type:** integer
- **Description:** Default value set up to 70. The document navigator will take 70 percent of the screen.
- **Default:**

    ```python
    documentnavigator.expand.reduce.ratio=70
    ```

## error
### error.warninDelay

- **Type:** integer
- **Description:** Delay (in s) before showing the warning menu that the document might take time to process
- **Default:**

    ```python
    error.warninDelay=10
    ```
### error.hasDownloadButton

- **Type:** boolean
- **Description:** Allow the error menu to display a download link for the document
- **Default:**

    ```python
    error.hasDownloadButton=true
    ```
### error.hideErrorStack

- **Type:** boolean
- **Description:** Disable the error menu to display error stack traces (useful for debug/integration testing, not suitable for production)
- **Default:**

    ```python
    error.hideErrorStack=true
    ```

## filter
### filter.comment.showTabImage

- **Type:** boolean
- **Description:** Allows to filter the annotation in the comment explorer
- **Default:**

    ```python
    filter.comment.showTabImage=true
    ```
### filter.comment.showTabLabel

- **Type:** boolean
- **Description:** Shows a label instead of icons for filtering
- **Default:**

    ```python
    filter.comment.showTabLabel=false
    ```
### filter.comment.showSwitchFilter

- **Type:** boolean
- **Description:** Shows the switch filter for solved/unresolved requests
- **Default:**

    ```python
    filter.comment.showSwitchFilter=true
    ```

## hyperlinks
### hyperlinks.loadInARender

- **Type:** boolean
- **Description:** Open hyperlinks into ARender instead of new window
- **Default:**

    ```python
    hyperlinks.loadInARender=false
    ```
### hyperlinks.loadFromPDF

- **Type:** boolean
- **Description:** Load hyperlinks coming from the PDF file
- **Default:**

    ```python
    hyperlinks.loadFromPDF=true
    ```
### hyperlinks.displayFrame

- **Type:** boolean
- **Description:** Display frame/blue box around hyperlinks if needed
- **Default:**

    ```python
    hyperlinks.displayFrame=true
    ```
### hyperlinks.load.internal

- **Type:** boolean
- **Description:** Hyperlinks contained from the PDF document will be loaded
- **Default:**

    ```python
    hyperlinks.load.internal=true
    ```
### hyperlinks.load.external

- **Type:** boolean
- **Description:** Hyperlinks contained from the annotations will be loaded
- **Default:**

    ```python
    hyperlinks.load.external=true
    ```

## image
### image.cropbox.target.dpi

- **Type:** integer
- **Description:** Configures the target DPI for the pictures generated from the cropbox (base dpi is 72, default target is 150)
- **Default:**

    ```python
    image.cropbox.target.dpi=150
    ```
### image.cropbox.window.position.left.px

- **Type:** integer
- **Description:** Setup the position in pixel of the Left of the popup window
- **Default:**

    ```python
    image.cropbox.window.position.left.px=0
    ```
### image.cropbox.window.position.top.px

- **Type:** integer
- **Description:** Setup the position in pixel of the Top of the popup window
- **Default:**

    ```python
    image.cropbox.window.position.top.px=0
    ```
### image.cropbox.window.position.width.px

- **Type:** integer
- **Description:** If superior to -1, will set the width of the popup window. If -1, will set to a "screen ratio" of the screen available space
- **Default:**

    ```python
    image.cropbox.window.position.width.px=-1
    ```
### image.cropbox.window.position.height.px

- **Type:** integer
- **Description:** If superior to -1, will set the height of the popup window. If -1, will set to a "screen ratio" of the screen available space
- **Default:**

    ```python
    image.cropbox.window.position.height.px=-1
    ```
### image.cropbox.window.screen.ratio

- **Type:** integer
- **Description:** Sets the screen ratio to use of available space for the width and height when they are set to -1
- **Default:**

    ```python
    image.cropbox.window.screen.ratio=3
    ```
### image.cropbox.can.expand

- **Type:** boolean
- **Description:** If true, resizing the window will allow the expand of images (over their natural sizes)
- **Default:**

    ```python
    image.cropbox.can.expand=true
    ```
### image.cropbox.include.annotations

- **Type:** boolean
- **Description:** If true, annotations will be on the cropbox
- **Default:**

    ```python
    image.cropbox.include.annotations=true
    ```

## mousewheel
### mousewheel.speed.factor

- **Type:** float
- **Description:** Mousewheel velocity ratio factor, the higher the faster
- **Default:**

    ```python
    mousewheel.speed.factor=1.0
    ```

## notifications
### notifications.duration

- **Type:** integer
- **Description:** Sets up the time, in milliseconds of ARender legacy notifications
- **Default:**

    ```python
    notifications.duration=500
    ```

## plume
### plume.enabled

- **Type:** boolean
- **Description:** Enables Plume integration with ARender
- **Default:**

    ```python
    plume.enabled=false
    ```

## print
### print.renditionWidth

- **Type:** integer
- **Description:** Width in pixels for the images used by the print as images feature
- **Default:**

    ```python
    print.renditionWidth=1200
    ```
### print.imageStyle

- **Type:** String
- **Description:** Sets up the CSS print width size once rendered
- **Default:**

    ```python
    print.imageStyle=width:800px;
    ```
### print.includeAnnotationsByDefault

- **Type:** boolean
- **Description:** Always check by default the "print with annotations" option
- **Default:**

    ```python
    print.includeAnnotationsByDefault=false
    ```
### print.forcePrintAnnotations

- **Type:** boolean
- **Description:** Force the print of annotations (cannot be unchecked)
- **Default:**

    ```python
    print.forcePrintAnnotations=false
    ```
### print.waterMarkActive

- **Type:** boolean
- **Description:** Activate the watermarking feature from the print menu
- **Default:**

    ```python
    print.waterMarkActive=false
    ```
### print.usePDFPrint

- **Type:** boolean
- **Description:** Print using a PDF instead of a set of images, lowers total download size
- **Default:**

    ```python
    print.usePDFPrint=true
    ```
### print.allDocumentsByDefault

- **Type:** boolean
- **Description:** Print by default all documents
- **Default:**

    ```python
    print.allDocumentsByDefault=false
    ```

## rotation
### rotation.ignoreForceReadOnly

- **Type:** boolean
- **Description:** Rotation annotations shall ignore force read only
- **Default:**

    ```python
    rotation.ignoreForceReadOnly=false
    ```
### rotation.ignoreForceLocked

- **Type:** boolean
- **Description:** Rotation annotations shall ignore force locked
- **Default:**

    ```python
    rotation.ignoreForceLocked=false
    ```

## shortCut
### shortCut.copy.enabled

- **Type:** boolean
- **Description:** Enables copy shortcut with CRTL+C
- **Default:**

    ```python
    shortCut.copy.enabled=true
    ```
### shortCut.cut.enabled

- **Type:** boolean
- **Description:** Enables copy shortcut with CRTL+X
- **Default:**

    ```python
    shortCut.cut.enabled=true
    ```
### shortCut.print.key

- **Type:** String
- **Description:** Configures a print key shortcut
- **Default:**

    ```python
    shortCut.print.key=p
    ```
### shortCut.print.enabled

- **Type:** boolean
- **Description:** Enables a print key shortcut
- **Default:**

    ```python
    shortCut.print.enabled=true
    ```

## style
### style.sheet

- **Type:** String
- **Description:** Change the default ARender CSS
- **Default:**

    ```python
    style.sheet=ARender-mat.min.css
    ```

## thumbexplorer
### thumbexplorer.enabled

- **Type:** boolean
- **Description:** Activates the thumbExplorer: the view to browse the document by thumbnails
- **Default:**

    ```python
    thumbexplorer.enabled=true
    ```
### thumbexplorer.indentation

- **Type:** integer
- **Description:** Sets up the indentation of Thumbs, in pixels when they need to indent (child documents)
- **Default:**

    ```python
    thumbexplorer.indentation=20
    ```
### thumbexplorer.maxLevelToLoad

- **Type:** integer
- **Description:** Sets up the maximum level of indentation
- **Default:**

    ```python
    thumbexplorer.maxLevelToLoad=10
    ```
### thumbexplorer.thumb.margin

- **Type:** integer
- **Description:** Sets up the thumbs margin in pixels
- **Default:**

    ```python
    thumbexplorer.thumb.margin=5
    ```
### thumbexplorer.thumb.width

- **Type:** integer
- **Description:** Sets up the thumbs width in pixels
- **Default:**

    ```python
    thumbexplorer.thumb.width=100
    ```
### thumbexplorer.thumb.grow.min

- **Type:** integer
- **Description:** Sets up the minimum amount of pixels needed for the pictree to grow in size
- **Default:**

    ```python
    thumbexplorer.thumb.grow.min=300
    ```
### thumbexplorer.thumb.grow.increment

- **Type:** integer
- **Description:** Sets up the growth increment once the thumbnail can grow
- **Default:**

    ```python
    thumbexplorer.thumb.grow.increment=10
    ```
### thumbexplorer.thumb.grow.ratio

- **Type:** integer
- **Description:** Sets up the growth ratio corresponding to the growth of the panel
- **Default:**

    ```python
    thumbexplorer.thumb.grow.ratio=1
    ```
### thumbexplorer.title.allowHTML

- **Type:** boolean
- **Description:** If true, allows thumbnails titles to have HTML content
- **Default:**

    ```python
    thumbexplorer.title.allowHTML=false
    ```
### thumbexplorer.metadata

- **Type:** boolean
- **Description:** If true, thumbnails will display a popup information with document metadata
- **Default:**

    ```python
    thumbexplorer.metadata=true
    ```
### thumbexplorer.layout.loading.delay

- **Type:** integer
- **Description:** Sets up the delay in milliseconds to load the layout for the thumbnails
- **Default:**

    ```python
    thumbexplorer.layout.loading.delay=5
    ```
### thumbexplorer.contextualMenu.createPageAnchor

- **Type:** boolean
- **Description:** Allows to create an URL anchor to a page from the thumbnails
- **Default:**

    ```python
    thumbexplorer.contextualMenu.createPageAnchor=true
    ```

## timeline
### timeline.panel.annotationBar.showResizeCircleButton

- **Type:** boolean
- **Description:** Display the resize button for the annotation timeline panel for videos
- **Default:**

    ```python
    timeline.panel.annotationBar.showResizeCircleButton=true
    ```
### timeline.panel.annotationBar.changeVideoCurrentTimeOnDrag.enabled

- **Type:** boolean
- **Description:** On drag of the annotations, update the video timer accordingly
- **Default:**

    ```python
    timeline.panel.annotationBar.changeVideoCurrentTimeOnDrag.enabled=true
    ```
### timeline.panel.openIfAnnotated

- **Type:** boolean
- **Description:** Opens the timeline panel if annotations are existing on the video
- **Default:**

    ```python
    timeline.panel.openIfAnnotated=true
    ```
### timeline.panel.openOnEdit

- **Type:** boolean
- **Description:** Opens the timeline panel if an annotation is being edited on video
- **Default:**

    ```python
    timeline.panel.openOnEdit=true
    ```

## toaster
### toaster.log.severe.autoHide

- **Type:** boolean
- **Description:** Allows SEVERE toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.severe.autoHide=false
    ```
### toaster.log.warning.autoHide

- **Type:** boolean
- **Description:** Allows WARNING toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.warning.autoHide=true
    ```
### toaster.log.info.autoHide

- **Type:** boolean
- **Description:** Allows INFO toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.info.autoHide=true
    ```
### toaster.log.config.autoHide

- **Type:** boolean
- **Description:** Allows CONFIG toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.config.autoHide=true
    ```
### toaster.log.fine.autoHide

- **Type:** boolean
- **Description:** Allows FINE toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.fine.autoHide=true
    ```
### toaster.log.finer.autoHide

- **Type:** boolean
- **Description:** Allows FINER toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.finer.autoHide=true
    ```
### toaster.log.finest.autoHide

- **Type:** boolean
- **Description:** Allows FINEST toaster notifications to autohide
- **Default:**

    ```python
    toaster.log.finest.autoHide=true
    ```
### toaster.log.severe.enabled

- **Type:** boolean
- **Description:** Allows SEVERE toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.severe.enabled=true
    ```
### toaster.log.warning.enabled

- **Type:** boolean
- **Description:** Allows WARNING toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.warning.enabled=true
    ```
### toaster.log.info.enabled

- **Type:** boolean
- **Description:** Allows INFO toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.info.enabled=true
    ```
### toaster.log.config.enabled

- **Type:** boolean
- **Description:** Allows CONFIG toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.config.enabled=false
    ```
### toaster.log.fine.enabled

- **Type:** boolean
- **Description:** Allows FINE toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.fine.enabled=false
    ```
### toaster.log.finer.enabled

- **Type:** boolean
- **Description:** Allows FINER toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.finer.enabled=false
    ```
### toaster.log.finest.enabled

- **Type:** boolean
- **Description:** Allows FINEST toaster notifications to be displayed
- **Default:**

    ```python
    toaster.log.finest.enabled=false
    ```
### toaster.toast.timeout

- **Type:** integer
- **Description:** Sets up the timeout for toaster notifications to be hidden
- **Default:**

    ```python
    toaster.toast.timeout=2000
    ```
### toaster.toast.newestOnTop

- **Type:** boolean
- **Description:** If true, displays the newest toaster logs on top, if false, on the bottom
- **Default:**

    ```python
    toaster.toast.newestOnTop=true
    ```

## toolbar
### toolbar.activateBorders

- **Type:** boolean
- **Description:** Allows from the toolbar to alter the borders of annotations
- **Default:**

    ```python
    toolbar.activateBorders=true
    ```
### toolbar.lockedObfuscate

- **Type:** boolean
- **Description:** If true, all redaction annotations will become locked once saved, and can no longer be edited
- **Default:**

    ```python
    toolbar.lockedObfuscate=false
    ```
### toolbar.opacity.slider.enabled

- **Type:** boolean
- **Description:** Enables opacity slider for annotations that support it
- **Default:**

    ```python
    toolbar.opacity.slider.enabled=true
    ```
### toolbar.richtext.hasSubscript

- **Type:** boolean
- **Description:** Enables subscript support in rich text
- **Default:**

    ```python
    toolbar.richtext.hasSubscript=false
    ```
### toolbar.richtext.hasSuperscript

- **Type:** boolean
- **Description:** Enables superscript support in rich text
- **Default:**

    ```python
    toolbar.richtext.hasSuperscript=false
    ```
### toolbar.richtext.hasStrikeThrough

- **Type:** boolean
- **Description:** Enables strike through support in rich text
- **Default:**

    ```python
    toolbar.richtext.hasStrikeThrough=false
    ```
### toolbar.richtext.hasRemoveFormat

- **Type:** boolean
- **Description:** Enables the format removal of the selected in rich text
- **Default:**

    ```python
    toolbar.richtext.hasRemoveFormat=false
    ```

## topPanel
### topPanel.logo

- **Type:** boolean
- **Description:** Show the top panel logo
- **Default:**

    ```python
    topPanel.logo=true
    ```
### topPanel.logo.url

- **Type:** String
- **Description:** Define the top panel logo URL
- **Default:**

    ```python
    topPanel.logo.url=arender-icones-svg/arender-logo-white.svg
    ```
### topPanel.logo.width

- **Type:** integer
- **Description:** The top panel logo width (in pixel)
- **Default:**

    ```python
    topPanel.logo.width=26
    ```
### topPanel.logo.height

- **Type:** integer
- **Description:** The top panel logo height (in pixel)
- **Default:**

    ```python
    topPanel.logo.height=26
    ```
### topPanel.logo.margin.left

- **Type:** integer
- **Description:** The top panel logo margin left (in pixel)
- **Default:**

    ```python
    topPanel.logo.margin.left=10
    ```
### topPanel.widgets.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the top panel
- **Default:**

    ```python
    topPanel.widgets.beanNames=logo,documentMenu,printButton,annotationMenu,cropBoxButton,saveDirtyAnnotations,refreshAnnotation,addObfuscateAnnotationButton,addObfuscateZoneAnnotationButton,ImageProcessingVerticalSubMenu,navigationButtons,zoomButtons,rotationButtons,multiViewTools,annotationToolbar,searchBox,fullscreenButton,documentBuilderButton,plumeMenu
    ```
### topPanel.navigation.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the navigation section
- **Default:**

    ```python
    topPanel.navigation.buttons.beanNames=firstPageButton,previousPageButton,pageNavigation,nextPageButton,lastPageButton
    ```
### topPanel.zoom.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the zoom section
- **Default:**

    ```python
    topPanel.zoom.buttons.beanNames=zoomOut,zoomBox,zoomIn,zoomInZone,zoomInZoneGlass,zoomFullWidth,zoomFullHeight,zoomFullPage
    ```
### topPanel.rotation.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the rotation section
- **Default:**

    ```python
    topPanel.rotation.buttons.beanNames=rotateAllLeft,rotateLeft,rotateRight,rotateAllRight,rotateReset
    ```
### topPanel.annotation.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the annotation sub-menu
- **Default:**

    ```python
    topPanel.annotation.buttons.beanNames=addStickyNoteAnnotationButton,addFreeTextAnnotationButton,addHighlightRectangleAnnotationButton,addHighlightCircleAnnotationButton,addHighlightRectangleAnnotationRepeatButton,addHighlightCircleAnnotationRepeatButton,addPolygonAnnotationButton,addPolylineAnnotationButton,addFreehandAnnotationButton,addHighlightTextAnnotationButton,addUnderlineTextAnnotationButton,addStrikethroughTextAnnotationButton,addArrowAnnotationButton,addArrowAnnotationRepeatButton,addStampAnnotationButton,addPolygonAnnotationRepeatButton,addPolylineAnnotationRepeatButton,addFreehandAnnotationRepeatButton,addHighlightTextAnnotationRepeatButton,addUnderlineTextAnnotationRepeatButton,addStrikethroughTextAnnotationRepeatButton,showAllAnnotationsButton,showAllAnnotationsAndRotationsButton
    ```
### topPanel.download.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the download/upload file sub-menu
- **Default:**

    ```python
    topPanel.download.buttons.beanNames=downloadButton,downloadRootButton,downloadPdfButton,downloadAllButton,downloadAnnotationsButton,downloadAnnotationsCSVButton,downloadXFDFAnnotationsButton,downloadFDFAnnotationsButton,downloadWithFDFAnnotationsButton,uploadButton,uploadURLButton,uploadXFDFButton
    ```
### topPanel.imageProcessing.buttons.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the image processing file sub-menu
- **Default:**

    ```python
    topPanel.imageProcessing.buttons.beanNames=ImageProcessingVerticalSubMenu
    ```
### topPanel.imageProcessing.buttons.vertical.beanNames

- **Type:** String
- **Description:** The list of widgets to define (XML bean names) for the image processing file sub-menu in vertical
- **Default:**

    ```python
    topPanel.imageProcessing.buttons.vertical.beanNames=contrastSlider,brightnessSlider
    ```
### topPanel.documentMenu

- **Type:** boolean
- **Description:** Activate the document sub-menu
- **Default:**

    ```python
    topPanel.documentMenu=true
    ```
### topPanel.cropbox.enabled

- **Type:** boolean
- **Description:** Activate the button for cropbox in the toppanel
- **Default:**

    ```python
    topPanel.cropbox.enabled=false
    ```
### topPanel.lineHeadTailMenu

- **Type:** boolean
- **Description:** Change to false to remove line head options menu.
- **Default:**

    ```python
    topPanel.lineHeadTailMenu=true
    ```
### topPanel.documentMenu.upload

- **Type:** boolean
- **Description:** Activate the upload file button
- **Default:**

    ```python
    topPanel.documentMenu.upload=true
    ```
### topPanel.documentMenu.url

- **Type:** boolean
- **Description:** Activate the open url button
- **Default:**

    ```python
    topPanel.documentMenu.url=true
    ```
### topPanel.documentMenu.url.open.using.enter

- **Type:** boolean
- **Description:** Allow to use enter to validate the input URL from the URL button
- **Default:**

    ```python
    topPanel.documentMenu.url.open.using.enter=true
    ```
### topPanel.documentMenu.xfdfUpload

- **Type:** boolean
- **Description:** Activate the top panel XFDF upload button
- **Default:**

    ```python
    topPanel.documentMenu.xfdfUpload=false
    ```
### topPanel.documentMenu.download

- **Type:** boolean
- **Description:** Activate the top panel download document button
- **Default:**

    ```python
    topPanel.documentMenu.download=true
    ```
### topPanel.documentMenu.download.root

- **Type:** boolean
- **Description:** Activate the top panel download composite document button
- **Default:**

    ```python
    topPanel.documentMenu.download.root=true
    ```
### topPanel.documentMenu.download.behavior

- **Type:** String
- **Description:** The default behavior for download. Valid values: DOWNLOAD_SOURCE or DOWNLOAD_NON_PDF
- **Default:**

    ```python
    topPanel.documentMenu.download.behavior=DOWNLOAD_NON_PDF
    ```
### topPanel.documentMenu.downloadPDF

- **Type:** boolean
- **Description:** Activate the top panel button: download document as PDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadPDF=true
    ```
### topPanel.documentMenu.downloadAll

- **Type:** boolean
- **Description:** Activate the top panel button: download all current documents as a single PDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadAll=true
    ```
### topPanel.documentMenu.downloadAnnotation

- **Type:** boolean
- **Description:** Activate the top panel button: download the current document with annotations as PDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadAnnotation=true
    ```
### topPanel.documentMenu.downloadCSVAnnotations

- **Type:** boolean
- **Description:** Activate the top panel button: download the current document annotations as CSV
- **Default:**

    ```python
    topPanel.documentMenu.downloadCSVAnnotations=false
    ```
### topPanel.documentMenu.downloadWithFDFAnnotation

- **Type:** boolean
- **Description:** Activate the top panel button: download the current document with annotations as FDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadWithFDFAnnotation=false
    ```
### topPanel.documentMenu.downloadXFDFAnnotations

- **Type:** boolean
- **Description:** Activate the top panel button: download the current document annotations as XFDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadXFDFAnnotations=false
    ```
### topPanel.documentMenu.downloadFDFAnnotations

- **Type:** boolean
- **Description:** Activate the top panel button: download the current document annotations as FDF
- **Default:**

    ```python
    topPanel.documentMenu.downloadFDFAnnotations=false
    ```
### topPanel.imageProcessMenu.processBrightness

- **Type:** String
- **Description:** Sets up slider to handle brightness
- **Default:**

    ```python
    topPanel.imageProcessMenu.processBrightness=brightness
    ```
### topPanel.imageProcessMenu.processContrast

- **Type:** String
- **Description:** Sets up slider to handle contrast
- **Default:**

    ```python
    topPanel.imageProcessMenu.processContrast=contrast
    ```
### topPanel.imageProcessMenu.doOnAllPage

- **Type:** boolean
- **Description:** Enable the image process on all pages
- **Default:**

    ```python
    topPanel.imageProcessMenu.doOnAllPage=true
    ```
### topPanel.imageProcessMenu.maxBrightness

- **Type:** integer
- **Description:** Sets up the max value of the brightness slider
- **Default:**

    ```python
    topPanel.imageProcessMenu.maxBrightness=201
    ```
### topPanel.imageProcessMenu.maxContrast

- **Type:** integer
- **Description:** Sets up the max value of the contrast slider
- **Default:**

    ```python
    topPanel.imageProcessMenu.maxContrast=201
    ```
### topPanel.imageProcessMenu.defaultBrightness

- **Type:** integer
- **Description:** Sets up the default value of the brightness slider
- **Default:**

    ```python
    topPanel.imageProcessMenu.defaultBrightness=100
    ```
### topPanel.imageProcessMenu.defaultContrast

- **Type:** integer
- **Description:** Sets up the default value of the contrast slider
- **Default:**

    ```python
    topPanel.imageProcessMenu.defaultContrast=100
    ```
### topPanel.imageProcessMenu

- **Type:** boolean
- **Description:** Activate the top panel imageProcessing button
- **Default:**

    ```python
    topPanel.imageProcessMenu=true
    ```
### topPanel.subMenu.button.timeOut

- **Type:** integer
- **Description:** Sets up the time in Milliseconds before the sub-menu buttons disappear
- **Default:**

    ```python
    topPanel.subMenu.button.timeOut=100
    ```
### topPanel.subMenu.subPanel.timeOut

- **Type:** integer
- **Description:** Sets up the time in Milliseconds before the sub-menu panel disappears
- **Default:**

    ```python
    topPanel.subMenu.subPanel.timeOut=500
    ```
### topPanel.print

- **Type:** boolean
- **Description:** Activate the print button in the topPanel
- **Default:**

    ```python
    topPanel.print=true
    ```
### topPanel.annotationMenu

- **Type:** boolean
- **Description:** Activate the annotation sub-menu
- **Default:**

    ```python
    topPanel.annotationMenu=true
    ```
### topPanel.annotationMenu.stickyNote

- **Type:** boolean
- **Description:** Activate the sticky note annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.stickyNote=true
    ```
### topPanel.annotationMenu.freetext

- **Type:** boolean
- **Description:** Activate the freetext annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.freetext=true
    ```
### topPanel.annotationMenu.stickyNote.editable

- **Type:** boolean
- **Description:** Allow the sticky note to be edited
- **Default:**

    ```python
    topPanel.annotationMenu.stickyNote.editable=true
    ```
### topPanel.annotationMenu.highlight

- **Type:** boolean
- **Description:** Activate the highlight annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.highlight=true
    ```
### topPanel.annotationMenu.highlight.repeat

- **Type:** boolean
- **Description:** Activate the highlight annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.highlight.repeat=false
    ```
### topPanel.annotationMenu.arrow

- **Type:** boolean
- **Description:** Activate the arrow annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.arrow=true
    ```
### topPanel.annotationMenu.arrow.repeat

- **Type:** boolean
- **Description:** Activate the arrow annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.arrow.repeat=false
    ```
### topPanel.annotationMenu.polygon

- **Type:** boolean
- **Description:** Activate the polygon annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.polygon=true
    ```
### topPanel.annotationMenu.polygon.repeat

- **Type:** boolean
- **Description:** Activate the polygon annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.polygon.repeat=false
    ```
### topPanel.annotationMenu.polyline

- **Type:** boolean
- **Description:** Activate the polyline annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.polyline=true
    ```
### topPanel.annotationMenu.polyline.repeat

- **Type:** boolean
- **Description:** Activate the polyline annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.polyline.repeat=false
    ```
### topPanel.annotationMenu.freehand

- **Type:** boolean
- **Description:** Activate the freehand annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.freehand=true
    ```
### topPanel.annotationMenu.freehand.repeat

- **Type:** boolean
- **Description:** Activate the freehand annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.freehand.repeat=false
    ```
### topPanel.annotationMenu.highlightText

- **Type:** boolean
- **Description:** Activate the text highlight annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.highlightText=false
    ```
### topPanel.annotationMenu.highlightText.repeat

- **Type:** boolean
- **Description:** Activate the text highlight annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.highlightText.repeat=false
    ```
### topPanel.annotationMenu.underlineText

- **Type:** boolean
- **Description:** Activate the text underline annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.underlineText=false
    ```
### topPanel.annotationMenu.underlineText.repeat

- **Type:** boolean
- **Description:** Activate the text underline annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.underlineText.repeat=false
    ```
### topPanel.annotationMenu.strikethroughText

- **Type:** boolean
- **Description:** Activate the strikethrough text annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.strikethroughText=false
    ```
### topPanel.annotationMenu.strikethroughText.repeat

- **Type:** boolean
- **Description:** Activate the strikethrough text annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.strikethroughText.repeat=false
    ```
### topPanel.annotationMenu.circle

- **Type:** boolean
- **Description:** Activate the circle annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.circle=true
    ```
### topPanel.annotationMenu.circle.repeat

- **Type:** boolean
- **Description:** Activate the circle annotation button, in repeat mode (does not cancel unless pressed again)
- **Default:**

    ```python
    topPanel.annotationMenu.circle.repeat=false
    ```
### topPanel.annotationMenu.stamp

- **Type:** boolean
- **Description:** Activate the stamp annotation button
- **Default:**

    ```python
    topPanel.annotationMenu.stamp=true
    ```
### topPanel.annotationMenu.hide

- **Type:** boolean
- **Description:** Activate the hide annotations button
- **Default:**

    ```python
    topPanel.annotationMenu.hide=true
    ```
### topPanel.annotationMenu.hideAll

- **Type:** boolean
- **Description:** Activate the hide all annotations button (includes redaction)
- **Default:**

    ```python
    topPanel.annotationMenu.hideAll=false
    ```
### topPanel.obfuscate

- **Type:** boolean
- **Description:** Activate the redaction annotation button
- **Default:**

    ```python
    topPanel.obfuscate=false
    ```
### topPanel.refresh

- **Type:** boolean
- **Description:** Activate the refresh annotations button
- **Default:**

    ```python
    topPanel.refresh=true
    ```
### topPanel.zoomBox

- **Type:** boolean
- **Description:** Activate the boxed zoom button
- **Default:**

    ```python
    topPanel.zoomBox=true
    ```
### topPanel.pageNavigation.first

- **Type:** boolean
- **Description:** Activates the go to first page navigation button
- **Default:**

    ```python
    topPanel.pageNavigation.first=true
    ```
### topPanel.pageNavigation.previous

- **Type:** boolean
- **Description:** Activates the go to previous page navigation button
- **Default:**

    ```python
    topPanel.pageNavigation.previous=true
    ```
### topPanel.pageNavigation.next

- **Type:** boolean
- **Description:** Activates the go to next page navigation button
- **Default:**

    ```python
    topPanel.pageNavigation.next=true
    ```
### topPanel.pageNavigation.last

- **Type:** boolean
- **Description:** Activates the go to last page navigation button
- **Default:**

    ```python
    topPanel.pageNavigation.last=true
    ```
### topPanel.zoom.fullWidth

- **Type:** boolean
- **Description:** Activates the zoom (full width of document) button
- **Default:**

    ```python
    topPanel.zoom.fullWidth=true
    ```
### topPanel.zoom.fullHeight

- **Type:** boolean
- **Description:** Activates the zoom (full height of document) button
- **Default:**

    ```python
    topPanel.zoom.fullHeight=true
    ```
### topPanel.zoom.fullPage

- **Type:** boolean
- **Description:** Activates the zoom (full page  of document) button
- **Default:**

    ```python
    topPanel.zoom.fullPage=true
    ```
### topPanel.zoom.in

- **Type:** boolean
- **Description:** Activates the zoom in button
- **Default:**

    ```python
    topPanel.zoom.in=true
    ```
### topPanel.zoom.out

- **Type:** boolean
- **Description:** Activates the zoom out button
- **Default:**

    ```python
    topPanel.zoom.out=true
    ```
### topPanel.zoom.zone

- **Type:** boolean
- **Description:** Activates the zoom by zone button
- **Default:**

    ```python
    topPanel.zoom.zone=true
    ```
### topPanel.zoom.zoneGlass

- **Type:** boolean
- **Description:** Activates the zoom (magnifying glass) button
- **Default:**

    ```python
    topPanel.zoom.zoneGlass=false
    ```
### topPanel.zoom.zoneGlass.value

- **Type:** integer
- **Description:** Sets the default zoom ratio for the magnifying glass
- **Default:**

    ```python
    topPanel.zoom.zoneGlass.value=2
    ```
### topPanel.rotation.left

- **Type:** boolean
- **Description:** Activates the rotate left button
- **Default:**

    ```python
    topPanel.rotation.left=true
    ```
### topPanel.rotation.right

- **Type:** boolean
- **Description:** Activates the rotate right button
- **Default:**

    ```python
    topPanel.rotation.right=true
    ```
### topPanel.rotation.all

- **Type:** boolean
- **Description:** Activates the rotate all pages buttons
- **Default:**

    ```python
    topPanel.rotation.all=false
    ```
### topPanel.rotation.reset

- **Type:** boolean
- **Description:** Activates the rotate left button
- **Default:**

    ```python
    topPanel.rotation.reset=false
    ```
### topPanel.rotation.degree

- **Type:** integer
- **Description:** Sets up the amount of rotation applied when pressing the rotation buttons
- **Default:**

    ```python
    topPanel.rotation.degree=90
    ```
### topPanel.rotation.add

- **Type:** boolean
- **Description:** Activates rotations sub-menu
- **Default:**

    ```python
    topPanel.rotation.add=true
    ```
### topPanel.search

- **Type:** boolean
- **Description:** Activates the search in the top panel
- **Default:**

    ```python
    topPanel.search=true
    ```
### topPanel.search.default

- **Type:** boolean
- **Description:** If true, default search behavior. Otherwise, open in the advanced search panel
- **Default:**

    ```python
    topPanel.search.default=false
    ```
### topPanel.search.displayResultsInExplorer

- **Type:** boolean
- **Description:** If true and topPanel.search.default is true, display search text results in the AdvancedSearchExplorer.
- **Default:**

    ```python
    topPanel.search.displayResultsInExplorer=false
    ```
### topPanel.search.searchByVisiblePage

- **Type:** boolean
- **Description:** If true, the "next result" search button will jump to the next result on the current visible page instead of resuming where you left the search
- **Default:**

    ```python
    topPanel.search.searchByVisiblePage=true
    ```
### topPanel.fullscreen

- **Type:** boolean
- **Description:** Activates the full screen button in the top panel
- **Default:**

    ```python
    topPanel.fullscreen=true
    ```
### topPanel.fullscreen.hideTopPanel

- **Type:** boolean
- **Description:** If true, full screen will hide the top panel totally
- **Default:**

    ```python
    topPanel.fullscreen.hideTopPanel=false
    ```
### topPanel.fullscreen.alwaysShowTopPanel

- **Type:** boolean
- **Description:** If true, the toppanel will always be visible in fullscreen and won't hide
- **Default:**

    ```python
    topPanel.fullscreen.alwaysShowTopPanel=false
    ```

## upload
### upload.file.openInNewWindow

- **Type:** boolean
- **Description:** Uploaded files should open in a new window of ARender
- **Default:**

    ```python
    upload.file.openInNewWindow=false
    ```

## visualization
### visualization.mode

- **Type:** String
- **Description:** Visualization mode: Single, BookMode
- **Default:**

    ```python
    visualization.mode=Single
    ```
### visualization.reload.lower.quality

- **Type:** boolean
- **Description:** Reload lower quality images once the higher quality has been fetched (always load the perfect size, or save bandwidth)
- **Default:**

    ```python
    visualization.reload.lower.quality=false
    ```
### visualization.video.autoplay

- **Type:** boolean
- **Description:** Autoplay videos
- **Default:**

    ```python
    visualization.video.autoplay=true
    ```
### visualization.pagechange.mouse

- **Type:** boolean
- **Description:** Mousewheel can change a document page
- **Default:**

    ```python
    visualization.pagechange.mouse=false
    ```
### visualization.pagechange.animation

- **Type:** boolean
- **Description:** Do animation on page changes (with navigation buttons)
- **Default:**

    ```python
    visualization.pagechange.animation=false
    ```
### visualization.pagecorner.enabled

- **Type:** boolean
- **Description:** Display a corner on the pages border, allowing to change pages
- **Default:**

    ```python
    visualization.pagecorner.enabled=false
    ```
### visualization.pagecorner.animation

- **Type:** boolean
- **Description:** Animates the page corner
- **Default:**

    ```python
    visualization.pagecorner.animation=false
    ```
### visualization.fullscreen

- **Type:** boolean
- **Description:** Activates the full screen visualisation in ARender
- **Default:**

    ```python
    visualization.fullscreen=false
    ```
### visualization.zoom.type

- **Type:** String
- **Description:** Sets up the default zoom type: Default, FullWidth, FullHeight, In, Out, Custom, FullPage
- **Default:**

    ```python
    visualization.zoom.type=FullWidth
    ```
### visualization.zoom.value

- **Type:** integer
- **Description:** Default Zoom value, in percent in case of custom zoom
- **Default:**

    ```python
    visualization.zoom.value=100
    ```
### visualization.zoom.animation

- **Type:** boolean
- **Description:** Animate on zoom
- **Default:**

    ```python
    visualization.zoom.animation=false
    ```
### visualization.zoom.by.biggest.page

- **Type:** boolean
- **Description:** Zoom according to the biggest page (width or height). Otherwise to the first page
- **Default:**

    ```python
    visualization.zoom.by.biggest.page=true
    ```
### visualization.rotation.save.enabled

- **Type:** boolean
- **Description:** Allows rotations to be saved as annotation
- **Default:**

    ```python
    visualization.rotation.save.enabled=false
    ```
### visualization.guideruler.enabled

- **Type:** boolean
- **Description:** Activate the ruler guide for ARender
- **Default:**

    ```python
    visualization.guideruler.enabled=false
    ```
### visualization.guideruler.height

- **Type:** integer
- **Description:** Defines the height in pixel of the ruler guide
- **Default:**

    ```python
    visualization.guideruler.height=10
    ```
### visualization.guideruler.increment

- **Type:** integer
- **Description:** Defines the movement in height in pixel for the ruler guide
- **Default:**

    ```python
    visualization.guideruler.increment=10
    ```
### visualization.multiView.enabled

- **Type:** boolean
- **Description:** Allows documents to be viewed in multi documents
- **Default:**

    ```python
    visualization.multiView.enabled=true
    ```
### visualization.multiView.direction

- **Type:** String
- **Description:** Defines the direction in which the multi view will open documents: horizontal or vertical
- **Default:**

    ```python
    visualization.multiView.direction=vertical
    ```
### visualization.multiView.doComparison

- **Type:** boolean
- **Description:** Allows to compare documents on start of ARender, when two documents or more are opened
- **Default:**

    ```python
    visualization.multiView.doComparison=false
    ```
### visualization.multiView.showOnStart

- **Type:** boolean
- **Description:** Show the multivew mode on start
- **Default:**

    ```python
    visualization.multiView.showOnStart=false
    ```
### visualization.multiView.synchronized

- **Type:** boolean
- **Description:** Synchronize the scrolling of the views when in multiview
- **Default:**

    ```python
    visualization.multiView.synchronized=true
    ```
### visualization.multiView.focusOnClick

- **Type:** boolean
- **Description:** Force the user to click on the documents instead of mouse hovering to change on which document can be annotated
- **Default:**

    ```python
    visualization.multiView.focusOnClick=false
    ```
### visualization.multiView.header.timeoutMs

- **Type:** integer
- **Description:** Timeout in milliseconds to auto hide the timer
- **Default:**

    ```python
    visualization.multiView.header.timeoutMs=5000
    ```
### visualization.images.sharpen

- **Type:** boolean
- **Description:** Place a css on document images to undo some of the "optimisations" browser do to display images
- **Default:**

    ```python
    visualization.images.sharpen=false
    ```
### visualization.images.tolerance

- **Type:** integer
- **Description:** Adapts the images width tolerance in pixel (received versus drawn on screen).
- **Default:**

    ```python
    visualization.images.tolerance=10
    ```
### visualization.images.svg.preview

- **Type:** boolean
- **Description:** Enables or disables the SVG previews images
- **Default:**

    ```python
    visualization.images.svg.preview=true
    ```
### visualization.pages.prefetch

- **Type:** integer
- **Description:** Amount of pages to preload before they become visible
- **Default:**

    ```python
    visualization.pages.prefetch=2
    ```
### visualization.maximumConcurrentImageFetching

- **Type:** integer
- **Description:** Maximum number of document images to fetch simultaneously
- **Default:**

    ```python
    visualization.maximumConcurrentImageFetching=8
    ```
### visualization.nonVisiblePageTimeout

- **Type:** integer
- **Description:** Cleanup images which where non-visible for a long time (ms)
- **Default:**

    ```python
    visualization.nonVisiblePageTimeout=120000
    ```
### visualization.imageCleanupPeriod

- **Type:** integer
- **Description:** Period at which images are cleaned (ms)
- **Default:**

    ```python
    visualization.imageCleanupPeriod=1500
    ```
### visualization.maxImageCacheSize

- **Type:** integer
- **Description:** Maximum number of images to store in the cleanup cache before LRU eviction occurs
- **Default:**

    ```python
    visualization.maxImageCacheSize=20
    ```

## window
### window.maximize

- **Type:** boolean
- **Description:** Maximizes the ARender window
- **Default:**

    ```python
    window.maximize=false
    ```

