---
title: Properties
---

## about 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| about.dialog.enabled | No description yet provided | boolean | true | 
| about.dialog.statistics.enable | Disable/enable showing statistics in the about dialog box | boolean | true | 
| about.dialog.statistics.table.enable | Disable/enable showing table statistics in the about dialog box (removes as well the graph values) | boolean | true | 
| about.dialog.statistics.charts.enable | Disable/enable the charts in the statistics section pulls the library from google API (gwt charts) | boolean | false | 
| about.dialog.show.current.version | Displays the current version in the about dialog box | boolean | true | 
| about.dialog.show.current.user | Displays the current user in the about dialog box | boolean | true | 

## advanced 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| advanced.searchexplorer.enabled | If true, enables the advanced search explorer | boolean | true | 
| advanced.searchexplorer.min.characterLength | Sets up the minimum character length allowed | integer | 0 | 
| advanced.searchexplorer.max.characterLength | Sets up the maximum character length allowed | integer | 255 | 
| advanced.searchexplorer.updates.enabled | If true, search is updated on annotation refresh when the the advanced search explorer is active | boolean | false | 
| advanced.searchexplorer.search.highlight.enabled | If true, the button for search and highlight is enabled | boolean | true | 

## annotation 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| annotation.canHideObfuscate | If true, all redaction annotations can be hidden using the regular hide annotations button | boolean | false | 
| annotation.autosave | Allows annotations to be automatically save after edition | boolean | false | 
| annotation.autorefresh | Auto refreshes the annotations after save | boolean | true | 
| annotation.autosave.timerDelay | Auto save annotation timer delay in milliseconds | integer | 1000 | 
| annotation.autosave.repeatMode.enabled | If auto save is enabled, saving may be triggered when using annotation creation repeatable | boolean | false | 
| annotation.loadingGIF | When saving annotations, display the loading animation | boolean | true | 
| annotation.loadExisting | Load the existing document annotations on display | boolean | true | 
| annotation.displaySaveWarning | Display a warning to the end user when annotations are left unsaved | boolean | true | 
| annotation.forceReadOnly | All saved annotations will be set to read only | boolean | false | 
| annotation.forceLocked | All saved annotations will be set to locked | boolean | false | 
| annotation.comment.pictogram.enabled | Display a pictogram near the commented annotation | boolean | true | 
| annotation.stickyNote.opacity | Opacity of the sticky note annotation | float | 1.0 | 
| annotation.stickyNote.minimum.width | Minimum width in pixel of the sticky note annotation | integer | 250 | 
| annotation.stickyNote.minimum.height | Minimum height in pixel of the sticky note annotation | integer | 170 | 
| annotation.stickyNote.size.according.to.zoom | Minimum sizes (width and height) according to zoom | boolean | true | 
| annotation.stickyNote.content.edition.height.ratio | The ratio of the content edition height according to the sticky note height | float | 0.7 | 
| annotation.stickyNote.default.color | Color of the sticky note annotation | Color, in format #RRGGBB | #FFDD00 | 
| annotation.stickyNote.hide.border | Hide borders options of the sticky note annotation | boolean | true | 
| annotation.stickyNote.hide.details | Hide details of the sticky note annotation | boolean | false | 
| annotation.stickyNote.default.font | Font of the sticky note annotation | String | Helvetica | 
| annotation.stickyNote.default.fontColor | Font color of the sticky note annotation | Color, in format #RRGGBB | #000000 | 
| annotation.stickyNote.default.fontSize | Font size of the sticky note annotation | integer | 2 | 
| annotation.stickyNote.default.bold | Set the font bold by default for the sticky note annotation | boolean | false | 
| annotation.stickyNote.default.underline | Set the font underlined by default for the sticky note annotation | boolean | false | 
| annotation.stickyNote.default.italic | Set the font italic by default for the sticky note annotation | boolean | false | 
| annotation.stickyNote.dotLink.enabled | Enables a link between the pin and the note for sticky note | boolean | true | 
| annotation.stickyNote.pin.default.size | Default pin size in pixel for the sticky note | integer | 20 | 
| annotation.stickyNote.can.hide.reply.button | If true, reply button will hide when stickyNote text is empty | boolean | false | 
| annotation.stickyNote.statusList.enabled | Activates the status list drop down | boolean | true | 
| annotation.stickyNote.action.buttons | Allow the display of the label or not. ALWAYS = the label always appears. HOVER = the label appears when the buttons are hovered. NEVER = the label is never displayed | String | HOVER | 
| annotation.stickyNote.show.date | Allow the display of the date or not. By default, the date is displayed | boolean | true | 
| annotation.stickyNote.creator.name.initial.only | Display only the initials of the creator name if true. Full name is displayed if false | String | true; | 
| annotation.popup.autohide.delay.ms | Auto hide delay in milliseconds for the annotation popups | integer | 300 | 
| annotation.popup.default.background.color | Popup fallback background color when the annotation background color is empty | Color, in format #RRGGBB | #F6F6F6 | 
| annotation.rectangle.opacity | Opacity for the rectangle annotation | float | 0.7 | 
| annotation.rectangle.minimum.width | Minimum width in pixel for the rectangle annotation | integer | 30 | 
| annotation.rectangle.minimum.height | Minimum height in pixel for the rectangle annotation | integer | 10 | 
| annotation.rectangle.default.color | Color for the rectangle annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.rectangle.default.border.color | Border color for the rectangle annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.rectangle.default.border.width | Border width in pixel for the rectangle annotation | integer | 0 | 
| annotation.circle.opacity | Opacity for the circle annotation | float | 0.7 | 
| annotation.circle.minimum.width | Minimum width in pixel for the circle annotation | integer | 30 | 
| annotation.circle.minimum.height | Minimum height for the circle annotation | integer | 10 | 
| annotation.circle.default.color | Color for the circle annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.circle.default.border.color | Border color for the circle annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.circle.default.border.width | Border width in pixel for the circle annotation | integer | 0 | 
| annotation.highlighttext.opacity | Opacity for the highlight annotation | float | 0.7 | 
| annotation.highlighttext.default.color | Color for the highlight annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.redaction.default.color | Color for the redaction annotation | Color, in format #RRGGBB | #273746 | 
| annotation.highlighttext.strike.width.ratio | Strike width ratio for underline - strike through annotations | float | 0.1 | 
| annotation.freetext.opacity | Opacity for the Freetext annotation | float | 0.7 | 
| annotation.freetext.minimum.width | Minimum width in pixel for the Freetext annotation | integer | 30 | 
| annotation.freetext.minimum.height | Minimum height in pixel for the Freetext annotation | integer | 10 | 
| annotation.freetext.default.color | Color for the Freetext annotation | Color, in format #RRGGBB | #EEEEEE | 
| annotation.freetext.default.border.color | Border color for the Freetext annotation | Color, in format #RRGGBB | #FF0000 | 
| annotation.freetext.default.border.width | Border width in pixel for the Freetext annotation | integer | 2 | 
| annotation.freetext.default.font.size | Font size in pixel | integer | 16 | 
| annotation.freetext.default.font.color | Font color | Color, in format #RRGGBB | #000000 | 
| annotation.freetext.default.font | Font family name | String | Helvetica | 
| annotation.freetext.adapt.font.size.enabled | Adapt font size according to the zoom ratio | boolean | false | 
| annotation.freetext.rotation.enabled | If true, freetext will rotate when rotating a page | boolean | false | 
| annotation.arrow.backgroundColor | Arrow annotation color | Color, in format rgb(r,g,b) | rgb(42, 72, 105) | 
| annotation.arrow.computeDistance | Allow arrows to measure distances | boolean | false | 
| annotation.arrow.minimal.head.size | Defines a minimal head size in pixel for arrows | integer | -1 | 
| annotation.arrow.x.defaultDistance | Defines a base distance for the head of arrow in X in pixel | integer | 12 | 
| annotation.arrow.y.defaultDistance | Defines a base distance for the head of arrow in Y in pixel | integer | 12 | 
| annotation.arrow.opacity | Defines arrow opacity | float | 1.0 | 
| annotation.arrow.border.width | Defines arrow border width | float | 4.0 | 
| annotation.arrow.head.type | Defines arrow head type. Possible values are : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | String | OPEN_ARROW | 
| annotation.arrow.tail.type | Defines arrow tail type. Possible values are : NONE, SQUARE, CIRCLE, DIAMOND, OPEN_ARROW, CLOSED_ARROW, BUTT, R_OPEN_ARROW, R_CLOSED_ARROW | String | NONE | 
| annotation.arrow.distance.degree.accuracy | Defines a degree of accuracy for the arrow displayed measure. The value is a power of ten (Examples : 1, 0.1, 0.01, 0.001, etc..) | float | 0.01 | 
| annotation.polygon.opacity | Opacity for the polygon annotation | float | 0.7 | 
| annotation.polygon.backgroundColor | Color for the polygon annotation | Color, in format rgb(r,g,b) | rgb(42, 72, 105) | 
| annotation.polygon.width | Border width for the polygon annotation | float | 2.0f | 
| annotation.polygon.borderColor | Border color for the polygon annotation | Color, in format rgb(r,g,b) | rgb(42, 72, 105) | 
| annotation.polyline.opacity | Opacity for the polyline annotation | integer | 1 | 
| annotation.polyline.backgroundColor | Color for the polyline annotation | Color, in format rgb(r,g,b) | rgb(42, 72, 105) | 
| annotation.polyline.width | Border width for the polyline annotation | float | 2.0f | 
| annotation.ink.opacity | Opacity for the freehand annotation | integer | 1 | 
| annotation.ink.backgroundColor | Color for the freehand annotation | Color, in format rgb(r,g,b) | rgb(42, 72, 105) | 
| annotation.ink.width | Border width for the freehand annotation | float | 2.0f | 
| annotation.hyperlink.opacity | Opacity for the Hyperlink annotation | float | 0.5f | 
| annotation.hyperlink.default.color | Color for the Hyperlink annotation | Color, in format #RRGGBB | #EAF39C | 
| annotation.hyperlink.externe.target.enabled | Allow the hyperlink target to be an external document | boolean | true | 
| annotation.stamp.create.in.browser.orientation | Allow stamps to be create in the current browser orientation (including document rotations) | boolean | false | 
| annotation.stamp.create.relative.to.zoom | If true, create stamps relatively to the zoom. Otherwise stamps will always have the same size regardless of the current zoom | boolean | true | 
| annotation.stampCustom.enabled | Allow custom stamp to be created | boolean | true | 
| annotation.stampCustom.maxFavorite | Maximum of custom stamp allowed to be added in favorite | integer | 15 | 
| annotation.stampCustom.min.text.length | Set minimum text length allowed for the custom stamp | integer | 2 | 
| annotation.freetext.drag.widgets.on.edit | Auto activate the draggable widgets for the Freetext when in edition mode. | boolean | true | 
| annotation.rotation.windmillEffect.enabled | Stamp rotation effect in video mode (easter egg) | boolean | false | 
| annotation.loadPerPage | Annotations are loaded per page | boolean | false | 
| annotation.searchTextInAnnotations | When searching for text, also search within annotation content | boolean | true | 
| annotation.default.stroke.dasharray | Default dash array style when the border style is set to DASH | String | 5.0,2.0 | 
| annotation.info.popup.enabled | Activate the info popup for annotations | boolean | true | 
| annotation.info.popup.evenIfEditable | Activate the popup info for annotations who aren't editable | boolean | false | 
| annotation.info.popup.displayUpdate | Display the last updated time for the annotation | boolean | false | 
| annotation.comment.explorer.enabled | Activates the comment explorer for displaying annotation details | boolean | true | 
| annotation.comment.explorer.eastSide.enabled | Sets up the comment explorer on the east side of ARender | boolean | false | 
| annotation.comment.explorer.openOnEdit | Opens the comment explorer when an annotation is edited | boolean | false | 
| annotation.comment.explorer.animate.on.expand | Animate while expanding the comment explorer | boolean | true | 
| annotation.comment.explorer.showAllAnnotators | Shows a simplified list of all authors on the comment explorer tab | boolean | true | 
| annotation.comment.explorer.showTotalAnnotationsNumber | Shows a total number of annotations on the comment explorer tab | boolean | false | 
| annotation.comment.explorer.showAtStartup | Shows the comment explorer at startup of ARender as default pane | boolean | false | 
| annotation.comment.explorer.inline.enabled | Enable to display annotation in one line if needed | boolean | false | 
| annotation.comment.explorer.show.annotation.minimized.on.open | By default, annotation in comment explorer will be displayed in one line. | boolean | false | 
| annotation.comment.explorer.filterPageAnnotations | If true, enable to also filter annotations in the page view | boolean | false | 
| annotation.comment.explorer.sortByIncrementDate | If true, set the sorting in increment otherwise in decrement date | boolean | true | 
| annotation.comment.explorer.show.date | Allow the display of the date or not. By default, the date is displayed | boolean | true | 
| annotation.comment.explorer.creator.name.initial.only | Display only the initials of the creator name if true. Full name is displayed if false | boolean | false | 
| annotation.date.display.humanizedDate.enabled | Display humanized date on comments and sticky notes | boolean | false | 
| annotation.date.display.creationDate | If true, display creation date otherwise the last modified date on comments and sticky notes | boolean | true | 
| annotation.richtext.edition.doubleClick | If true, double click on the field text is required to enter in edition | boolean | false | 
| annotation.blendMode | Enables blend mode for annotations that support it | boolean | false | 

## arender 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| arender.web.socket.enabled | Enables web socket and try to initiate the web socket if the browser web socket is available | boolean | true | 
| arender.pollLastVersion | Enables ARender version check | boolean | true | 
| arender.white.labeling | Remove any reference of ARender in the application | boolean | false | 

## arenderjs 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| arenderjs.startupScript | ARenderJS Configuration : customization startup script URL | String | empty by default | 

## bookmarkexplorer 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| bookmarkexplorer.enabled | If true, enables the bookmark explorer | boolean | true | 
| bookmarkexplorer.showAtStartup | If true, show the bookmark explorer at the application startup | boolean | false | 
| bookmarkexplorer.draggable | If true, make the bookmarks draggable | boolean | false | 
| bookmarkexplorer.add.bookmark.enabled | If true, enables the bookmark creation | boolean | true | 
| bookmarkexplorer.delete.bookmark.enabled | If true, enables the bookmark deletion | boolean | true | 
| bookmarkexplorer.animation.enabled | If true, enables the bookmark animation | boolean | false | 

## bottomPanel 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| bottomPanel.toggle.document.navigator.enabled | Enable the button to toggle the documentNavigator | boolean | false | 

## comment 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| comment.showAnnotationImage | Shows in the comment explorer an icon of the annotation | boolean | true | 
| comment.textArea.maxHeight | Comment text area max height corresponds to the maximum height when expanding the text with the button "Show more", in pixels | integer | 0 | 
| comment.contextStatusMenu.enabled | Enable contextual status menu will allow to right click on an comment annotation to add a status | boolean | false | 
| comment.multiple.thread.level.enabled | Enable multiple comment thread level display | boolean | false | 
| comment.richtext.shortcut.enabled | Enable richtext shortcut : [Enter] or [Esc] validate the annotation comment and [Shift]+[Enter] makes a new line | boolean | false | 

## contextualMenu 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| contextualMenu.enabled | Activates ARender contextual right click menu | boolean | true | 
| contextualMenu.icons.enabled | Activates ARender contextual icons mode | boolean | true | 
| contextualMenu.hasPrint | Enables the print option for the contextual menu | boolean | false | 
| contextualMenu.hasPrintAll | Enables the print all documents option for the contextual menu | boolean | false | 
| contextualMenu.hasStickyNote | Enables the create a sticky note option for the contextual menu | boolean | true | 
| contextualMenu.hasCropBoxImage | Enables the create a cropbox image from the contextual menu | boolean | false | 
| contextualMenu.hasHighlightText | Enables a textual highlight annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasStrikeoutText | Enables a strike through annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasUnderlineText | Enables an underline annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasHighlight | Enables an highlight annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasCircle | Enables a circle annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasArrow | Enables an arrow annotation creation option for the contextual menu | boolean | true | 
| contextualMenu.hasPolygon | Enables a polygon annotation creation option for the contextual menu | boolean | false | 
| contextualMenu.hasPolyline | Enables a polyline annotation creation option for the contextual menu | boolean | false | 
| contextualMenu.hasFreehand | Enables a freehand annotation creation option for the contextual menu | boolean | false | 
| contextualMenu.hasPageRotation | Enables the rotate option for the contextual menu | boolean | false | 
| contextualMenu.hasMultiView | Enables the open multiview option for the contextual menu | boolean | false | 
| contextualMenu.hasShowGuideRuler | Enables the "show guide here" option for the contextual menu | boolean | false | 
| contextualMenu.hasHideGuideRuler | Enables the "hide guide ruler" option for the contextual menu | boolean | false | 
| contextualMenu.hasHyperlink | Enables a hyperlink creation option for the contextual menu | boolean | true | 
| contextualMenu.hasAnchor | Enables an anchor creation option for the contextual menu | boolean | true | 
| contextualMenu.hasStamp | Enables a stamp annotation creation option for the contextual menu | boolean | false | 
| contextualMenu.hasFreetext | Enables a freetext annotation creation option for the contextual menu | boolean | false | 

## date 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| date.format | Specify the date format for the annotations | String | dd/MM/yyyy, HH:mm | 

## document 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| document.vertical.slider.changeToPage.enabled | Enabling the scroll by step instead of jumping to page on the scrollUp and scrollDown button | boolean | false | 
| document.vertical.slider.new.click.scrollbar.behavior | No description yet provided | boolean | true | 
| document.vertical.slider.use.legacy.scrollbar | True to use the browser native scrollbar | boolean | false | 
| document.vertical.slider.use.legacy.scrollbar.limit.pages | Set the number of document pages to use the legacy scrollbar otherwise use the ARender native one. For example, set to 1 : document with 1 page (or less) will use the native browser scrollbar | integer | 2 | 
| document.progressiveLoading | Activates the progressive loading of ARender front end side (the layout is asked by parts from the front end) | boolean | false | 
| document.loading.progress.update | Update and notify the end user to the progressive loading mechanisms | boolean | true | 

## documentbuilder 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| documentbuilder.enabled | Enables the document builder button (and feature) | boolean | false | 
| documentbuilder.button.visible | Sets the document builder button visible | boolean | true | 
| documentbuilder.activateOnStartup | Activate the document builder at startup as soon as the documents are ready | boolean | false | 
| documentbuilder.hideDocumentNavigator | Hide the document navigator once the document builder is opened | boolean | true | 
| documentbuilder.displaySaveWarning | Display a save warning if a document with modifications is left when leaving ARender | boolean | true | 
| documentbuilder.thumbs.draggable | Make the document builder thumbnails draggable in order to organize the pages | boolean | true | 
| documentbuilder.width | Sets the document builder panel width | integer | 280 | 
| documentbuilder.save.action | Sets the document builder default save button action | String | save | 
| documentbuilder.save.behavior | Sets the document builder save behavior (legacy) : UPDATE_NO_DOCUMENT, CREATE_NEW_FIRST_DOCUMENT, UPDATE_FIRST_DOCUMENT, UPDATE_ALL_DOCUMENT | String | UPDATE_NO_DOCUMENT | 
| documentbuilder.save.download | Activates the local download builder button | boolean | true | 
| documentbuilder.save.delete | Activates the delete current document from the builder button | boolean | false | 
| documentbuilder.save.freeze | Once documents are built, a frozen title will remain and need to be manually removed to confirm the operation | boolean | true | 
| documentbuilder.addChild.enabled | Allow the document builder to create child documents (folders) | boolean | false | 
| documentbuilder.createDocument.enabled | Allow the document builder to create new documents (not only compose) | boolean | true | 
| documentbuilder.deleteSelectedThumbs.enabled | Activate the feature to delete on right click a list of selected thumbs | boolean | true | 
| documentbuilder.createDocumentFromSelectedThumbs.enabled | Activate the feature to create a new document from selected thumbs | boolean | true | 
| documentbuilder.close.enabled | Activate the contextual menu option to close the builder | boolean | true | 
| documentbuilder.button.legacySave.enabled | Activate the legacy save document builder button | boolean | false | 
| documentbuilder.button.download.enabled | Activate the button : download the builder document locally | boolean | true | 
| documentbuilder.button.custom.enabled | Activate the button : run custom action on builder document | boolean | false | 
| documentbuilder.button.download.annotations.enabled | Activate the button : download the builder document with annotation | boolean | false | 
| documentbuilder.button.updateAll.enabled | Activate the button : update all documents | boolean | false | 
| documentbuilder.button.createFirst.enabled | Activate the button : Create new first document | boolean | false | 
| documentbuilder.button.updateFirst.enabled | Activate the button : Update the document | boolean | false | 
| documentbuilder.button.saveAll.active.when.empty | If active, the saveAll button will be always visible if enabled, even if documents are empty | boolean | false | 
| documentbuilder.button.updateAll.active.when.empty | If active, the updateAll button will be always visible if enabled, even if documents are empty | boolean | false | 
| documentbuilder.populatorPolicy | Sets up the policy to populate the document builder : CopyCurrentDocument or EmptyDocument | String | CopyCurrentDocument | 
| documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy | Sets up the policy CopyCurrentDocument from the builder, does it need to flatten the documents indentation or not | boolean | true | 
| documentbuilder.button.hideUntilLoaded | Hides the document builder button until all documents have been loaded | boolean | true | 
| documentbuilder.afterDownload | Thumb navigator view behavior after processing a download in documentbuilder : hide, disable, nochange | String | hide | 
| documentbuilder.button.refresh.enabled | Activate the button : Refresh the document to its original state | boolean | true | 
| documentbuilder.contextual.menu.download.enabled | Activate local download action in the contextual menu | boolean | false | 
| documentbuilder.contextual.menu.download.annotations.enabled | Activate download document with annotations action in the contextual menu | boolean | false | 
| documentbuilder.contextual.menu.createFirst.enabled | Activate the create first document action in the contextual menu | boolean | false | 
| documentbuilder.contextual.menu.updateFirst.enabled | Activate the update document action in the contextual menu | boolean | false | 
| documentbuilder.contextual.menu.delete.enabled | Activate the delete document action in the contextual menu | boolean | false | 

## documentnavigator 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| documentnavigator.width | Sets up the width (in pixel) of the document navigator (left tabs of ARender) | integer | 320 | 
| documentnavigator.search.width | Sets up the width (in pixel) of the advanced search in the document navigator (left tabs of ARender) | integer | 400 | 
| documentnavigator.annotation.width | Sets up the width (in pixel) of the annotation in the document navigator (left tabs of ARender) | integer | 400 | 
| documentnavigator.ears.hideTimerDelay | Sets up the time (in ms) to auto hide the arrow for maximizing or reducing the document navigator | integer | 100 | 
| documentnavigator.initialWidth | Sets up the default position of the document navigator tabs: Default, Reduced or Expanded | String | Default | 
| documentnavigator.expand.reduce.ratio | Default value set up to 70. The document navigator will take 70 percent of the screen. | integer | 70 | 

## error 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| error.warninDelay | Delay (in s) before showing the warning menu that the document might take time to process | integer | 10 | 
| error.hasDownloadButton | Allow the error menu to display a download link for the document | boolean | true | 
| error.hideErrorStack | Disable the error menu to display error stack traces (useful for debug/integration testing, not suitable for production) | boolean | true | 

## filter 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| filter.comment.showSwitchFilter | Shows the switch filter for solved/unresolved requests | boolean | false | 
| filter.comment.currentUser.enabled | Activates the button to filter annotations created by the current user | boolean | false | 

## html 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| html.plugin.enabled | Enables the html plugin, which allows to view html content directly in ARender, instead of the rendition of the html content | boolean | false | 

## hyperlinkexplorer 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| hyperlinkexplorer.enabled | If true, enables the hyperlink explorer | boolean | true | 

## hyperlinks 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| hyperlinks.loadInARender | Open hyperlinks into ARender instead of new window | boolean | false | 
| hyperlinks.loadFromPDF | Load hyperlinks coming from the PDF file | boolean | true | 
| hyperlinks.displayFrame | Display frame/blue box around hyperlinks if needed | boolean | true | 
| hyperlinks.load.internal | Hyperlinks contained from the PDF document will be loaded | boolean | true | 
| hyperlinks.load.external | Hyperlinks contained from the annotations will be loaded | boolean | true | 

## image 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| image.cropbox.target.dpi | Configures the target DPI for the pictures generated from the cropbox (base dpi is 72, default target is 150) | integer | 150 | 
| image.cropbox.window.position.left.px | Setup the position in pixel of the Left of the popup window | integer | 0 | 
| image.cropbox.window.position.top.px | Setup the position in pixel of the Top of the popup window | integer | 0 | 
| image.cropbox.window.position.width.px | If superior to -1, will set the width of the popup window. If -1, will set to a "screen ratio" of the screen available space | integer | -1 | 
| image.cropbox.window.position.height.px | If superior to -1, will set the height of the popup window. If -1, will set to a "screen ratio" of the screen available space | integer | -1 | 
| image.cropbox.window.screen.ratio | Sets the screen ratio to use of available space for the width and height when they are set to -1 | integer | 3 | 
| image.cropbox.can.expand | If true, resizing the window will allow the expand of images (over their natural sizes) | boolean | true | 
| image.cropbox.include.annotations | If true, annotations will be on the cropbox | boolean | true | 

## mousewheel 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| mousewheel.speed.factor | Mousewheel velocity ratio factor, the higher the faster | float | 1.0 | 

## notifications 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| notifications.duration | Sets up the time, in milliseconds of ARender legacy notifications | integer | 500 | 

## plume 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| plume.enabled | Enables Plume integration with ARender | boolean | false | 
| plume.url | Plume url | String | /plume | 

## preference 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| preference.color.mode | Change the toppanel colors. Will NOT work on Internet Explorer. Authorized value : DARK, LIGHT, CUSTOM | String | DARK | 

## print 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| print.renditionWidth | Width in pixels for the images used by the print as images feature | integer | 1200 | 
| print.imageStyle | Sets up the CSS print width size once rendered | String | width:800px; | 
| print.includeAnnotationsByDefault | Always check by default the "print with annotations" option | boolean | false | 
| print.forcePrintAnnotations | Force the print of annotations (cannot be unchecked) | boolean | false | 
| print.waterMarkActive | Activate the watermarking feature from the print menu | boolean | false | 
| print.usePDFPrint | Print using a PDF instead of a set of images, lowers total download size | boolean | true | 
| print.allDocumentsByDefault | Print by default all documents | boolean | false | 

## redactexplorer 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| redactexplorer.enabled | If true, enables the redact explorer | boolean | false | 
| redactexplorer.redact | Activate the redaction annotation button | boolean | true | 
| redactexplorer.redactZone | Activate the redaction annotation zone button | boolean | true | 

## rotation 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| rotation.ignoreForceReadOnly | Rotation annotations shall ignore force read only | boolean | false | 
| rotation.ignoreForceLocked | Rotation annotations shall ignore force locked | boolean | false | 

## shortCut 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| shortCut.copy.enabled | Enables copy shortcut with CRTL+C | boolean | true | 
| shortCut.cut.enabled | Enables copy shortcut with CRTL+X | boolean | true | 
| shortCut.print.key | Configures a print key shortcut | String | p | 
| shortCut.print.enabled | Enables a print key shortcut | boolean | true | 

## shortcut 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| shortcut.annotation.stickynote.key | Configures a key shortcut for stickynote creation | integer | 1 | 
| shortcut.annotation.stickynote.enabled | Enables the shortcut for stickynote creation with CTRL + key | boolean | true | 
| shortcut.annotation.freetext.key | Configures a key shortcut for freetext creation | integer | 2 | 
| shortcut.annotation.freetext.enabled | Enables the shortcut for freetext creation with CTRL + key | boolean | true | 
| shortcut.annotation.rectangle.key | Configures a key shortcut for highlight rectangle creation | integer | 3 | 
| shortcut.annotation.rectangle.enabled | Enables the shortcut for highlight rectangle creation with CTRL + key | boolean | true | 
| shortcut.annotation.circle.key | Configures a key shortcut for circle creation | integer | 4 | 
| shortcut.annotation.circle.enabled | Enables the shortcut for circle creation with CTRL + key | boolean | true | 
| shortcut.annotation.polygon.key | Configures a key shortcut for polygon creation | integer | 5 | 
| shortcut.annotation.polygon.enabled | Enables the shortcut for polygon creation with CTRL + key | boolean | true | 
| shortcut.annotation.polyline.key | Configures a key shortcut for polyline creation | integer | 6 | 
| shortcut.annotation.polyline.enabled | Enables the shortcut for polyline creation with CTRL + key | boolean | true | 
| shortcut.annotation.freehand.key | Configures a key shortcut for freehand creation | integer | 7 | 
| shortcut.annotation.freehand.enabled | Enables the shortcut for freehand creation with CTRL + key | boolean | true | 
| shortcut.annotation.arrow.key | Configures a key shortcut for arrow creation | integer | 8 | 
| shortcut.annotation.arrow.enabled | Enables the shortcut for arrow creation with CTRL + key | boolean | true | 
| shortcut.annotation.measure.key | Configures a key shortcut for arrow distance creation | integer | 9 | 
| shortcut.annotation.measure.enabled | Enables the shortcut for arrow distance creation with CTRL + key | boolean | true | 
| shortcut.annotation.stamp.key | Configures a key shortcut for stamp creation | integer | 0 | 
| shortcut.annotation.stamp.enabled | Enables the shortcut for stamp creation with CTRL + key | boolean | true | 

## startup 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| startup.loading.label | Display the label when document starts to open | String | ARender | 

## style 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| style.sheet | Change the default ARender CSS | String | css/arender-style.css | 

## text 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| text.selection.use.legacy | New text selection will select word by word when a word is partially/completely selected | boolean | true | 
| text.selection.hyperlink.use.enter | Use enter to confirm the selected text during hyperlinks creation | boolean | true | 

## thumbexplorer 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| thumbexplorer.enabled | Activates the thumbExplorer : the view to browse the document by thumbnails | boolean | true | 
| thumbexplorer.indentation | Sets up the indentation of Thumbs, in pixels when they need to indent (child documents) | integer | 20 | 
| thumbexplorer.maxLevelToLoad | Sets up the maximum level of indentation | integer | 10 | 
| thumbexplorer.thumb.margin | Sets up the thumbs margin in pixels | integer | 5 | 
| thumbexplorer.thumb.width | Sets up the thumbs width in pixels | integer | 100 | 
| thumbexplorer.thumb.grow.min | Sets up the minimum amount of pixels needed for the pictree to grow in size | integer | 300 | 
| thumbexplorer.thumb.grow.increment | Sets up the growth increment once the thumbnail can grow | integer | 10 | 
| thumbexplorer.thumb.grow.ratio | Sets up the growth ratio corresponding to the growth of the panel | integer | 1 | 
| thumbexplorer.title.allowHTML | If true, allows thumbnails titles to have HTML content | boolean | false | 
| thumbexplorer.metadata | If true, thumbnails will display a popup information with document metadata | boolean | true | 
| thumbexplorer.layout.loading.delay | Sets up the delay in milliseconds to load the layout for the thumbnails | integer | 5 | 
| thumbexplorer.contextualMenu.createPageAnchor | Allows to create an URL anchor to a page from the thumbnails | boolean | true | 

## timeline 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| timeline.panel.annotationBar.showResizeCircleButton | Display the resize button for the annotation timeline panel for videos | boolean | true | 
| timeline.panel.annotationBar.changeVideoCurrentTimeOnDrag.enabled | On drag of the annotations, update the video timer accordingly | boolean | true | 
| timeline.panel.openIfAnnotated | Opens the timeline panel if annotations are existing on the video | boolean | true | 
| timeline.panel.openOnEdit | Opens the timeline panel if an annotation is being edited on video | boolean | true | 

## toaster 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| toaster.log.severe.autoHide | Allows SEVERE toaster notifications to autohide | boolean | false | 
| toaster.log.warning.autoHide | Allows WARNING toaster notifications to autohide | boolean | true | 
| toaster.log.info.autoHide | Allows INFO toaster notifications to autohide | boolean | true | 
| toaster.log.config.autoHide | Allows CONFIG toaster notifications to autohide | boolean | true | 
| toaster.log.fine.autoHide | Allows FINE toaster notifications to autohide | boolean | true | 
| toaster.log.finer.autoHide | Allows FINER toaster notifications to autohide | boolean | true | 
| toaster.log.finest.autoHide | Allows FINEST toaster notifications to autohide | boolean | true | 
| toaster.log.severe.enabled | Allows SEVERE toaster notifications to be displayed | boolean | true | 
| toaster.log.warning.enabled | Allows WARNING toaster notifications to be displayed | boolean | true | 
| toaster.log.info.enabled | Allows INFO toaster notifications to be displayed | boolean | true | 
| toaster.log.config.enabled | Allows CONFIG toaster notifications to be displayed | boolean | false | 
| toaster.log.fine.enabled | Allows FINE toaster notifications to be displayed | boolean | false | 
| toaster.log.finer.enabled | Allows FINER toaster notifications to be displayed | boolean | false | 
| toaster.log.finest.enabled | Allows FINEST toaster notifications to be displayed | boolean | false | 
| toaster.toast.timeout | Sets up the timeout for toaster notifications to be hidden | integer | 2000 | 
| toaster.toast.newestOnTop | If true, displays the newest toaster logs on top, if false, on the bottom | boolean | true | 

## toolbar 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| toolbar.activateBorders | Allows from the toolbar to alter the borders of annotations | boolean | true | 
| toolbar.distance.physical.units | Base physical units. List of handled units : pt, px, in, mm, cm, dm, m, km, ml, yd, ft (NB: both physical and display units need to be the same) | String | in,cm,px | 
| toolbar.distance.display.units | Display distance units. List of handled units : pt, px, in, mm, cm, dm, m, km, ml, yd, ft (NB: both physical and display units need to be the same) | String | in,cm,px | 
| toolbar.distance.physical.value.enabled | Allow physical distance ratio value to be changed | boolean | false | 
| toolbar.distance.physical.display.units.sync | Allow physical and display distance units to be synchronized, changing physical unit will change the display unit | boolean | true | 
| toolbar.distance.display.units.alter.display.ratio.factor.enabled | Allow display units change to alter the display ratio value with its corresponding conversion factor | boolean | true | 
| toolbar.lockedObfuscate | If true, all redaction annotations will become locked once saved, and can no longer be edited | boolean | false | 
| toolbar.opacity.slider.enabled | Enables opacity slider for annotations that support it | boolean | true | 
| toolbar.richtext.hasSubscript | Enables subscript support in rich text | boolean | false | 
| toolbar.richtext.hasSuperscript | Enables superscript support in rich text | boolean | false | 
| toolbar.richtext.hasStrikeThrough | Enables strike through support in rich text | boolean | false | 
| toolbar.richtext.hasRemoveFormat | Enables the format removal of the selected in rich text | boolean | false | 
| toolbar.richtext.hasFonts | Enables fonts name support in rich text | boolean | true | 
| toolbar.richtext.hasFontSize | Enables font size support in rich text | boolean | true | 
| toolbar.richtext.hasFontColor | Enables font color support in rich text | boolean | true | 
| toolbar.richtext.hasUnderline | Enables underline support in rich text | boolean | true | 
| toolbar.richtext.hasBold | Enables bold support in rich text | boolean | true | 
| toolbar.richtext.hasItalic | Enables italic support in rich text | boolean | true | 
| toolbar.securityList.checkOwner | If true, the security list is only shown when the annotation belongs to the current user | boolean | true | 

## topPanel 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| topPanel.logo | Show the top panel logo | boolean | true | 
| topPanel.logo.url | Define the top panel logo URL | String | arender-icones-svg/arender-logo-white.svg | 
| topPanel.logo.width | The top panel logo width (in pixel) | integer | 26 | 
| topPanel.logo.height | The top panel logo height (in pixel) | integer | 26 | 
| topPanel.logo.margin.left | The top panel logo margin left (in pixel) | integer | 10 | 
| topPanel.widgets.beanNames | The list of widgets to define (XML bean names) for the top panel | String | fileAndAnnotationSection,modificationSection,navigationButtons,zoomButtons,multiViewTools,annotationToolbar,pluginSection | 
| topPanel.upload.buttons.beanNames | The list of widgets to define (XML bean names) for the upload/print file dropdown | String | uploadButton,uploadURLButton,uploadXFDFButton,printSeparatorHorizontal,printButton,printAllButton | 
| topPanel.download.buttons.beanNames | The list of widgets to define (XML bean names) for the download file dropdown | String | downloadButton,downloadRootButton,downloadAllSourcesButton,downloadPdfButton,\ | 
| topPanel.section.file.buttons.beanNames | The list of widgets to define (XML bean names) for the file section | String | importMenu, downloadMenu,saveDirtyAnnotations | 
| topPanel.section.file.annotation.buttons.beanNames | The list of widgets to define (XML bean names) for the file/annotation section | String | fileSection,annotationMenu | 
| topPanel.section.modification.buttons.beanNames | The list of widgets to define (XML bean names) for the modification section | String | brightnessContainer,contrastContainer,invertContainer,rotationSeparatorVertical,rotateAllLeft,rotateLeft,rotateRight,rotateAllRight,rotateReset | 
| topPanel.ellipsis.buttons.beanNames | The list of widgets to define (XML bean names) for the static content of ellipsis (More button/hamburger button) | String | labelAbout, aboutButton | 
| topPanel.section.plugin.buttons.beanNames | The list of widgets to define (XML bean names) for the plugins | String | plumeMenu,htmlPluginMenu | 
| topPanel.search.buttons.beanNames | The list of widgets to define (XML bean names) for the searchbox | String | searchBox | 
| topPanel.navigation.buttons.beanNames | The list of widgets to define (XML bean names) for the navigation section | String | firstPageButton,previousPageButton,pageNavigation,nextPageButton,lastPageButton | 
| topPanel.zoom.buttons.beanNames | The list of widgets to define (XML bean names) for the zoom section | String | zoomBox,zoomInZone,zoomInZoneGlass,cropBoxButton,zoomFullWidth,zoomFullHeight,zoomFullPage | 
| topPanel.rotation.buttons.beanNames | The list of widgets to define (XML bean names) for the rotation section | String | rotateAllLeft,rotateLeft,rotateRight,rotateAllRight,rotateReset | 
| topPanel.annotation.buttons.beanNames | The list of widgets to define (XML bean names) for the annotation sub-menu | String | addStickyNoteAnnotationButton,addFreeTextAnnotationButton,addHighlightRectangleAnnotationButton,addHighlightCircleAnnotationButton,addPolygonAnnotationButton,addPolylineAnnotationButton,addFreehandAnnotationButton,addHighlightTextAnnotationButton,addUnderlineTextAnnotationButton,addStrikethroughTextAnnotationButton,addArrowAnnotationButton,addArrowDistanceAnnotationButton,addStampAnnotationButton,annotationSeparatorVertical,addHyperlinkButton,showAllAnnotationsButton,showAllAnnotationsAndRotationsButton,refreshAnnotation | 
| topPanel.imageProcessing.buttons.vertical.beanNames | The list of widgets to define (XML bean names) for the image processing file sub-menu in vertical | String | contrastSlider,brightnessSlider,invertSlider | 
| topPanel.section.right.buttons.beanNames | The list of widgets to define (XML bean names) for right section of the toppanel | String | selectAllTextDocument,documentBuilderButton,fullscreenButton,searchSection,moreButton | 
| topPanel.imageProcessing.buttons.beanNames | DEPRECATED, button integrated in the property topPanel.section.modification.buttons.beanNames .The list of widgets to define (XML bean names) for the brightness and contrast button | String | brightnessContainer,contrastContainer,invertContainer | 
| topPanel.documentMenu | Activate the document sub-menu | boolean | true | 
| topPanel.cropbox.enabled | Activate the button for cropbox in the toppanel | boolean | false | 
| topPanel.lineHeadTailMenu | Change to false to remove line head options menu. | boolean | true | 
| topPanel.documentMenu.upload | Activate the upload file button | boolean | true | 
| topPanel.documentMenu.url | Activate the open url button | boolean | true | 
| topPanel.documentMenu.url.open.using.enter | Allow to use enter to validate the input URL from the URL button | boolean | true | 
| topPanel.documentMenu.xfdfUpload | Activate the top panel XFDF upload button | boolean | false | 
| topPanel.documentMenu.download | Activate the top panel download document button | boolean | true | 
| topPanel.documentMenu.download.root | Activate the top panel download composite document button | boolean | true | 
| topPanel.documentMenu.download.behavior | The default behavior for download. Valid values : DOWNLOAD_SOURCE or DOWNLOAD_NON_PDF | String | DOWNLOAD_NON_PDF | 
| topPanel.documentMenu.downloadPDF | Activate the top panel button : download document as PDF | boolean | true | 
| topPanel.documentMenu.downloadAllSources | Activate the top panel button : download all current documents as original format in a ZIP | boolean | true | 
| topPanel.documentMenu.downloadAll | Activate the top panel button : download all current documents as a single PDF | boolean | true | 
| topPanel.documentMenu.downloadAnnotation | Activate the top panel button : download the current document with annotations as PDF | boolean | true | 
| topPanel.documentMenu.downloadCSVAnnotations | Activate the top panel button : download the current document annotations as CSV | boolean | false | 
| topPanel.documentMenu.downloadWithFDFAnnotation | Activate the top panel button : download the current document with annotations as FDF | boolean | false | 
| topPanel.documentMenu.downloadXFDFAnnotations | Activate the top panel button : download the current document annotations as XFDF | boolean | false | 
| topPanel.documentMenu.downloadFDFAnnotations | Activate the top panel button : download the current document annotations as FDF | boolean | false | 
| topPanel.documentMenu.download.with.compare | Activate the top panel button : download the compared documents side by side with compare result on it | boolean | true | 
| topPanel.imageProcessMenu.brightness.enabled | Activate the brightness slider | boolean | true | 
| topPanel.imageProcessMenu.contrast.enabled | Activate the contrast slider | boolean | true | 
| topPanel.imageProcessMenu.invert.enabled | Activate the invert colors slider | boolean | false | 
| topPanel.imageProcessMenu.process.mode | Set how image processing is applied : CURRENT_PAGE, ALL_PAGES, ALL_DOCUMENTS | String | ALL_DOCUMENTS | 
| topPanel.imageProcessMenu.processBrightness | REMOVED since version 4.5.0 Sets up slider to handle brightness | String | BRIGHTNESS | 
| topPanel.imageProcessMenu.processContrast | REMOVED since version 4.5.0 Sets up slider to handle contrast | String | CONTRAST | 
| topPanel.imageProcessMenu.maxBrightness | REMOVED since version 4.7.0 Sets up the max value of the brightness slider | integer | 200 | 
| topPanel.imageProcessMenu.maxContrast | REMOVED since version 4.7.0 Sets up the max value of the contrast slider | integer | 200 | 
| topPanel.imageProcessMenu.defaultBrightness | REMOVED since version 4.7.0 Sets up the default value of the brightness slider | integer | 100 | 
| topPanel.imageProcessMenu.defaultContrast | REMOVED since version 4.7.0 Sets up the default value of the contrast slider | integer | 100 | 
| topPanel.imageProcessMenu | REMOVED since version 4.7.0, use topPanel.imageProcessMenu.brightness.enabled and topPanel.imageProcessMenu.contrast.enabled instead. Activate the top panel imageProcessing button | boolean | true | 
| topPanel.subMenu.button.timeOut | REMOVED since version 4.7.0 Sets up the time in Milliseconds before the sub-menu buttons disappear | integer | 100 | 
| topPanel.subMenu.subPanel.timeOut | REMOVED since version 4.7.0 Sets up the time in Milliseconds before the sub-menu panel disappears | integer | 500 | 
| topPanel.print | Activate the print button in the topPanel | boolean | true | 
| topPanel.annotationMenu | Activate the annotation sub-menu | boolean | true | 
| topPanel.annotationMenu.stickyNote | Activate the sticky note annotation button | boolean | true | 
| topPanel.annotationMenu.freetext | Activate the freetext annotation button | boolean | true | 
| topPanel.annotationMenu.stickyNote.editable | Allow the sticky note to be edited | boolean | true | 
| topPanel.annotationMenu.highlight | Activate the highlight annotation button | boolean | true | 
| topPanel.annotationMenu.highlight.repeat | Activate the highlight annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.arrow | Activate the arrow annotation button | boolean | true | 
| topPanel.annotationMenu.arrow.repeat | Activate the arrow annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.arrow.measure | Activate the arrow measure annotation button | boolean | true | 
| topPanel.annotationMenu.arrow.measure.repeat | Activate the arrow measure annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.polygon | Activate the polygon annotation button | boolean | true | 
| topPanel.annotationMenu.polygon.repeat | Activate the polygon annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.polyline | Activate the polyline annotation button | boolean | true | 
| topPanel.annotationMenu.polyline.repeat | Activate the polyline annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.freehand | Activate the freehand annotation button | boolean | true | 
| topPanel.annotationMenu.freehand.repeat | Activate the freehand annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.highlightText | Activate the text highlight annotation button | boolean | false | 
| topPanel.annotationMenu.highlightText.repeat | Activate the text highlight annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.underlineText | Activate the text underline annotation button | boolean | false | 
| topPanel.annotationMenu.underlineText.repeat | Activate the text underline annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.strikethroughText | Activate the strikethrough text annotation button | boolean | false | 
| topPanel.annotationMenu.strikethroughText.repeat | Activate the strikethrough text annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.circle | Activate the circle annotation button | boolean | true | 
| topPanel.annotationMenu.circle.repeat | Activate the circle annotation button, in repeat mode (does not cancel unless pressed again) | boolean | false | 
| topPanel.annotationMenu.hyperlink | Activate the hyperlink annotation button | boolean | false | 
| topPanel.annotationMenu.hyperlink.repeat | Activate the hyperlink annotation button, in repeat mode (does not cancel unless pressed again) | boolean | true | 
| topPanel.annotationMenu.stamp | Activate the stamp annotation button | boolean | true | 
| topPanel.annotationMenu.hide | Activate the hide annotations button | boolean | true | 
| topPanel.annotationMenu.hideAll | Activate the hide all annotations button (includes redaction) | boolean | false |
| topPanel.annotationMenu.sound | Activate the sound annotation button | boolean | false | 
| topPanel.refresh | Activate the refresh annotations button | boolean | true | 
| topPanel.zoomBox | Activate the boxed zoom button | boolean | true | 
| topPanel.copy.document.text | Activate the copy all text of the document button | boolean | false | 
| topPanel.pageNavigation.first | Activates the go to first page navigation button | boolean | true | 
| topPanel.pageNavigation.previous | Activates the go to previous page navigation button | boolean | true | 
| topPanel.pageNavigation.next | Activates the go to next page navigation button | boolean | true | 
| topPanel.pageNavigation.last | Activates the go to last page navigation button | boolean | true | 
| topPanel.zoom.fullWidth | Activates the zoom (full width of document) button | boolean | true | 
| topPanel.zoom.fullHeight | Activates the zoom (full height of document) button | boolean | true | 
| topPanel.zoom.fullPage | Activates the zoom (full page  of document) button | boolean | true | 
| topPanel.zoom.in | Activates the zoom in button | boolean | true | 
| topPanel.zoom.out | Activates the zoom out button | boolean | true | 
| topPanel.zoom.zone | Activates the zoom by zone button | boolean | true | 
| topPanel.zoom.zoneGlass | Activates the zoom (magnifying glass) button | boolean | false | 
| topPanel.zoom.zoneGlass.value | Sets the default zoom ratio for the magnifying glass | integer | 2 | 
| topPanel.rotation.left | Activates the rotate left button | boolean | true | 
| topPanel.rotation.right | Activates the rotate right button | boolean | true | 
| topPanel.rotation.all | Activates the rotate all pages buttons | boolean | false | 
| topPanel.rotation.reset | Activates the rotate left button | boolean | false | 
| topPanel.rotation.degree | Sets up the amount of rotation applied when pressing the rotation buttons | integer | 90 | 
| topPanel.rotation.add | Activates rotations sub-menu | boolean | true | 
| topPanel.search | Activates the search in the top panel | boolean | true | 
| topPanel.search.default | If true, default search behavior. Otherwise, open in the advanced search panel | boolean | false | 
| topPanel.search.displayResultsInExplorer | If true and topPanel.search.default is true, display search text results in the AdvancedSearchExplorer. | boolean | false | 
| topPanel.search.searchByVisiblePage | If true, the "next result" search button will jump to the next result on the current visible page instead of resuming where you left the search | boolean | true | 
| topPanel.fullscreen | Activates the full screen button in the top panel | boolean | true | 
| topPanel.fullscreen.hideTopPanel | If true, full screen will hide the top panel totally | boolean | false | 
| topPanel.fullscreen.alwaysShowTopPanel | If true, the toppanel will always be visible in fullscreen and won't hide | boolean | false | 

## upload 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| upload.file.openInNewWindow | Uploaded files should open in a new window of ARender | boolean | false | 

## visualization 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| visualization.mode | Visualization mode : Single, BookMode | String | Single | 
| visualization.reload.lower.quality | Reload lower quality images once the higher quality has been fetched (always load the perfect size, or save bandwidth) | boolean | false | 
| visualization.reload.minimum.width.change | Difference between the old image width and the new image width. Reload the image if difference is greater than this value. | float | 0.1 | 
| visualization.reload.minimum.width.change.mobile | Difference between the old image width and the new image width. Reload the image if difference is greater than this value. | float | 200.0 | 
| visualization.video.autoplay | Autoplay videos | boolean | true | 
| visualization.pagechange.mouse | Mousewheel can change a document page | boolean | false | 
| visualization.pagechange.animation | Do animation on page changes (with navigation buttons) | boolean | false | 
| visualization.pagecorner.enabled | Display a corner on the pages border, allowing to change pages | boolean | false | 
| visualization.pagecorner.animation | Animates the page corner | boolean | false | 
| visualization.fullscreen | Activates the full screen visualisation in ARender | boolean | false | 
| visualization.zoom.type | Sets up the default zoom type : Default, FullWidth, FullHeight, In, Out, Custom, FullPage | String | FullWidth | 
| visualization.zoom.value | Default Zoom value, in percent in case of custom zoom | integer | 100 | 
| visualization.zoom.animation | Animate on zoom | boolean | false | 
| visualization.zoom.by.biggest.page | Zoom according to the biggest page (width or height). Otherwise to the first page | boolean | true | 
| visualization.rotation.save.enabled | Allows rotations to be saved as annotation | boolean | false | 
| visualization.zoom.step |  Custom zoom step value | float | 0.1 |
| visualization.guideruler.enabled | Activate the ruler guide for ARender | boolean | false | 
| visualization.guideruler.height | Defines the height in pixel of the ruler guide | integer | 10 | 
| visualization.guideruler.increment | Defines the movement in height in pixel for the ruler guide | integer | 10 | 
| visualization.multiView.enabled | Allows documents to be viewed in multi documents | boolean | true | 
| visualization.multiView.direction | Defines the direction in which the multi view will open documents : horizontal or vertical | String | vertical | 
| visualization.multiView.doComparison | Allows to compare documents on start of ARender, when two documents or more are opened | boolean | false | 
| visualization.multiView.showOnStart | Show the multivew mode on start | boolean | false | 
| visualization.multiView.synchronized | Synchronize the scrolling of the views when in multiview | boolean | true | 
| visualization.multiView.focusOnClick | Force the user to click on the documents instead of mouse hovering to change on which document can be annotated | boolean | false | 
| visualization.multiView.header.timeoutMs | Timeout in milliseconds to auto hide the timer | integer | 5000 | 
| visualization.images.sharpen | Place a css on document images to undo some of the "optimisations" browser do to display images | boolean | false | 
| visualization.images.tolerance | Adapts the images width tolerance in pixel (received versus drawn on screen). | integer | 10 | 
| visualization.images.svg.preview | Enables or disables the SVG previews images | boolean | true | 
| visualization.pages.prefetch | Amount of pages to preload before they become visible | integer | 2 | 
| visualization.image.comparison.default.highlight.color | Setup the default image comparison highlight color. Highlight for the pixels difference | Color, in format #RRGGBB | #FF0000 | 
| visualization.image.comparison.default.lowlight.color | Setup the default image comparison lowlight color. Lowlight for the common pixels | String | none | 
| visualization.image.comparison.default.fuzz | Setup the default image comparison tolerance value. Value between 0 and 100. Value in percentage. | integer | 3 | 
| visualization.image.comparison.enabled | Enable the images comparison | boolean | true | 
| visualization.image.scheduled.timeoutMs | Timeout (in ms) before updating the image while resizing the image | integer | 500 | 
| visualization.maximumConcurrentImageFetching | Maximum number of document images to fetch simultaneously | integer | 8 | 
| visualization.nonVisiblePageTimeout | Cleanup images which where non-visible for a long time (ms) | integer | 120000 | 
| visualization.imageCleanupPeriod | Period at which images are cleaned (ms) | integer | 1500 | 
| visualization.maxImageCacheSize | Maximum number of images to store in the cleanup cache before LRU eviction occurs | integer | 20 | 

## window 
 | property | Description | type | default |
| --------- | --------- | --------- | --------- |
| window.maximize | Maximizes the ARender window | boolean | false | 

