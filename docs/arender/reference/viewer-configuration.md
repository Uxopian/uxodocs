---
title: Viewer configuration
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/viewer-configuration
sidebar_position: 5
content_hash: 4a3ca5f6f5a6e16729b497cc42f4cd4472cdf5b490752c1e038bf78888518adc
---

# Viewer configuration

The ARender viewer (HMI) has two distinct categories of configuration properties:

| | Client-side | Server-side |
|--|-------------|-------------|
| **What it controls** | UI appearance, toolbar buttons, annotation defaults, zoom, navigation, keyboard shortcuts | Rendition connection, caching, authentication, annotation storage, watermarks |
| **Defaults file** | `arender-default.properties` (inside the HMI JAR) | `arender-server-default.properties` (inside the HMI JAR) |
| **Override file** | `configurations/arender-custom-client.properties` | `configurations/arender-custom-server.properties` |
| **Where it runs** | Sent to the browser (GWT client) | Stays on the Spring Boot server |
| **Can be profile-scoped** | Yes, via [visual profiles](/docs/arender/guides/features/visual-profiles) (`?props=profileName`) | No |

For the full precedence hierarchy and file placement, see [Configuration system](/docs/arender/deployment/configuration-system).

---

## Part 1 — Client-side properties

These properties control the viewer UI. Override them in `configurations/arender-custom-client.properties` or via a [visual profile](/docs/arender/guides/features/visual-profiles).

### Global display

| Property | Default | Description |
|----------|---------|-------------|
| `date.format` | `dd/MM/yyyy, HH:mm` | Date format used in annotation metadata |
| `style.sheet` | `css/arender-style.min.css` | Comma-separated list of CSS files to load |
| `arenderjs.startupScript` | _(empty)_ | URL of a JavaScript file to execute on startup via `ARenderJSAPICallStartupScript` |
| `preference.color.mode` | `LIGHT` | Top-panel color theme. Values: `LEGACY`, `DARK`, `LIGHT`, `CUSTOM`, `DEUTERANOPIA`, `PROTANOPIA`, `TRITANOPIA` |
| `window.maximize` | `false` | Maximizes the ARender window on load |
| `upload.file.openInNewWindow` | `false` | Opens uploaded files in a new ARender window |
| `arender.web.socket.enabled` | `true` | Enables WebSocket for push notifications |

---

### About dialog

| Property | Default | Description |
|----------|---------|-------------|
| `about.dialog.enabled` | `true` | Shows the About button |
| `about.dialog.statistics.enable` | `true` | Shows performance statistics in the About dialog |
| `about.dialog.statistics.table.enable` | `true` | Shows the statistics table |
| `about.dialog.statistics.charts.enable` | `false` | Enables Google Charts in statistics (requires external network access) |
| `about.dialog.show.current.version` | `true` | Displays the ARender version |
| `about.dialog.show.current.user` | `true` | Displays the current user name |

---

### Top panel (toolbar)

#### Layout

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.widgets.beanNames` | `topPanelLeftSection,topPanelMiddleSection,topPanelRightSection` | Ordered list of widget sections shown in the toolbar |
| `topPanel.upload.buttons.beanNames` | `uploadButton,uploadURLButton,uploadXFDFButton` | Buttons in the document upload sub-menu |

#### Document menu

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.documentMenu` | `true` | Enables the document sub-menu |
| `topPanel.documentMenu.upload` | `true` | Enables the file upload button |
| `topPanel.documentMenu.url` | `true` | Enables the open-by-URL button |
| `topPanel.documentMenu.url.open.using.enter` | `true` | Confirms the URL input with Enter |
| `topPanel.documentMenu.xfdfUpload` | `false` | Enables the XFDF annotations upload button |
| `topPanel.documentMenu.download` | `true` | Enables the download button |
| `topPanel.documentMenu.download.root` | `true` | Enables download of the root composite document |
| `topPanel.documentMenu.download.behavior` | `DOWNLOAD_NON_PDF` | Default download behavior. Values: `DOWNLOAD_SOURCE`, `DOWNLOAD_NON_PDF` |
| `topPanel.documentMenu.downloadPDF` | `true` | Enables download as PDF |
| `topPanel.documentMenu.downloadAllSources` | `true` | Enables download of all source documents as ZIP |
| `topPanel.documentMenu.downloadAll` | `true` | Enables download of all documents as a single PDF |
| `topPanel.documentMenu.downloadAnnotation` | `true` | Enables download with annotations burned in |
| `topPanel.documentMenu.downloadWithFDFAnnotation` | `false` | Enables download with FDF annotations |
| `topPanel.documentMenu.downloadXFDFAnnotations` | `false` | Enables download of XFDF annotations file |
| `topPanel.documentMenu.downloadFDFAnnotations` | `false` | Enables download of FDF annotations file |

#### Other toolbar buttons

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.print` | `true` | Enables the print button |
| `topPanel.search` | `true` | Enables the search box in the toolbar |
| `topPanel.search.default` | `false` | If `false`, opens the advanced search panel instead of inline search |
| `topPanel.search.displayResultsInExplorer` | `false` | Displays search results in the advanced search explorer |
| `topPanel.search.searchByVisiblePage` | `true` | "Next result" jumps to the next match on the visible page |
| `topPanel.fullscreen` | `true` | Enables the full-screen button |
| `topPanel.fullscreen.hideTopPanel` | `false` | Hides the top panel when entering full screen |
| `topPanel.fullscreen.alwaysShowTopPanel` | `false` | Keeps the top panel always visible in full screen |
| `topPanel.cropbox.enabled` | `false` | Enables the crop-box button |
| `topPanel.lineHeadTailMenu` | `true` | Shows the line head/tail options menu |
| `topPanel.obfuscate` | `false` | Enables the redact (obfuscate) button |
| `topPanel.refresh` | `true` | Enables the refresh-annotations button |
| `topPanel.zoomBox` | `true` | Enables the boxed-zoom button |
| `topPanel.subMenu.button.timeOut` | `100` | Milliseconds before a sub-menu button disappears |
| `topPanel.subMenu.subPanel.timeOut` | `500` | Milliseconds before a sub-menu panel disappears |

---

### Navigation

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.navigation.buttons.beanNames` | `firstPageButton,previousPageButton,pageNavigation,nextPageButton,lastPageButton` | Navigation button order |
| `topPanel.pageNavigation.first` | `true` | Shows the first-page button |
| `topPanel.pageNavigation.previous` | `true` | Shows the previous-page button |
| `topPanel.pageNavigation.next` | `true` | Shows the next-page button |
| `topPanel.pageNavigation.last` | `true` | Shows the last-page button |

---

### Zoom

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.zoom.buttons.beanNames` | `zoomOut,zoomBox,zoomIn,...` | Zoom button order |
| `topPanel.zoom.fullWidth` | `true` | Fit-to-width button |
| `topPanel.zoom.fullHeight` | `true` | Fit-to-height button |
| `topPanel.zoom.fullPage` | `true` | Fit-full-page button |
| `topPanel.zoom.in` | `true` | Zoom-in button |
| `topPanel.zoom.out` | `true` | Zoom-out button |
| `topPanel.zoom.zone` | `true` | Zoom-to-zone button |
| `topPanel.zoom.zoneGlass` | `false` | Magnifying glass button |
| `topPanel.zoom.zoneGlass.value` | `2` | Default magnification ratio for the glass |
| `visualization.zoom.type` | `FullWidth` | Default zoom mode on load. Values: `Default`, `FullWidth`, `FullHeight`, `In`, `Out`, `Custom`, `FullPage` |
| `visualization.zoom.value` | `100` | Default zoom percentage when `type` is `Custom` |
| `visualization.zoom.animation` | `false` | Animates zoom changes |
| `visualization.zoom.by.biggest.page` | `true` | Bases automatic zoom on the largest page; otherwise uses the first page |

---

### Rotation

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.rotation.buttons.beanNames` | `rotateAllLeft,rotateLeft,rotateRight,rotateAllRight,rotateReset` | Rotation button order |
| `topPanel.rotation.left` | `true` | Rotate-left button |
| `topPanel.rotation.right` | `true` | Rotate-right button |
| `topPanel.rotation.all` | `false` | Rotate-all-pages buttons |
| `topPanel.rotation.reset` | `false` | Reset-rotation button |
| `topPanel.rotation.degree` | `90` | Degrees applied per rotation button press |
| `topPanel.rotation.add` | `true` | Shows the rotation sub-menu |
| `visualization.rotation.save.enabled` | `false` | Saves page rotations as annotations |

---

### Visualization

| Property | Default | Description |
|----------|---------|-------------|
| `visualization.mode` | `Single` | Page display mode. Values: `Single`, `BookMode` |
| `visualization.reload.lower.quality` | `false` | Reloads low-quality images once the full-resolution version is ready |
| `visualization.video.autoplay` | `true` | Auto-plays videos |
| `visualization.pagechange.mouse` | `false` | Mouse-wheel scrolling changes pages |
| `visualization.pagechange.animation` | `false` | Animates page transitions |
| `visualization.pagecorner.enabled` | `false` | Shows a corner click zone for page changes |
| `visualization.pagecorner.animation` | `false` | Animates the page-corner effect |
| `visualization.fullscreen` | `false` | Starts in full-screen mode |
| `visualization.images.sharpen` | `false` | Applies a CSS sharpening filter to document images |
| `visualization.images.tolerance` | `10` | Pixel tolerance when comparing requested vs rendered image width |
| `visualization.images.svg.preview` | `true` | Enables SVG preview images |
| `visualization.pages.prefetch` | `2` | Number of pages to preload before they become visible |
| `mousewheel.speed.factor` | `1.0` | Mouse-wheel scroll velocity multiplier |
| `visualization.guideruler.enabled` | `false` | Enables the horizontal guide ruler |
| `visualization.guideruler.height` | `10` | Guide ruler height in pixels |
| `visualization.guideruler.increment` | `10` | Movement increment in pixels for the guide ruler |

#### Performance

| Property | Default | Description |
|----------|---------|-------------|
| `visualization.maximumConcurrentImageFetching` | `8` | Maximum simultaneous image requests |
| `visualization.nonVisiblePageTimeout` | `120000` | Time (ms) before off-screen images are evicted |
| `visualization.imageCleanupPeriod` | `1500` | Period (ms) between cleanup runs |
| `visualization.maxImageCacheSize` | `20` | Maximum images in the LRU cache before eviction |

#### Multi-view and comparison

| Property | Default | Description |
|----------|---------|-------------|
| `visualization.multiView.enabled` | `true` | Enables multi-view (split-pane) mode |
| `visualization.multiView.direction` | `vertical` | Split direction. Values: `horizontal`, `vertical` |
| `visualization.multiView.doComparison` | `false` | Automatically compares documents when two are opened |
| `visualization.multiView.showOnStart` | `false` | Shows multi-view on startup |
| `visualization.multiView.synchronized` | `true` | Synchronizes scrolling between panes |
| `visualization.multiView.focusOnClick` | `false` | Requires a click to activate a pane instead of hover |
| `visualization.multiView.header.timeoutMs` | `5000` | Milliseconds before the multi-view header auto-hides |

---

### Document navigator and thumbnails

| Property | Default | Description |
|----------|---------|-------------|
| `documentnavigator.width` | `255` | Navigator panel width in pixels |
| `documentnavigator.ears.hideTimerDelay` | `500` | Milliseconds before the expand/collapse arrow hides |
| `documentnavigator.initialWidth` | `Default` | Initial navigator state. Values: `Default`, `Reduced`, `Expanded` |
| `documentnavigator.expand.reduce.ratio` | `70` | Percentage of the screen used when `Expanded` |
| `thumbexplorer.enabled` | `true` | Enables the thumbnail explorer tab |
| `thumbexplorer.indentation` | `20` | Indentation in pixels for child documents |
| `thumbexplorer.maxLevelToLoad` | `10` | Maximum nesting depth for child documents |
| `thumbexplorer.thumb.margin` | `5` | Margin between thumbnails in pixels |
| `thumbexplorer.thumb.width` | `100` | Thumbnail width in pixels |
| `thumbexplorer.thumb.grow.min` | `300` | Minimum panel width (px) for thumbnail growth |
| `thumbexplorer.thumb.grow.increment` | `10` | Growth increment in pixels |
| `thumbexplorer.thumb.grow.ratio` | `1` | Growth ratio relative to the panel size |
| `thumbexplorer.title.allowHTML` | `false` | Allows HTML in thumbnail titles |
| `thumbexplorer.metadata` | `true` | Shows document metadata in thumbnail tooltips |
| `thumbexplorer.layout.loading.delay` | `5` | Delay (ms) before loading thumbnail layouts |
| `thumbexplorer.contextualMenu.createPageAnchor` | `true` | Enables page anchor creation from the thumbnail context menu |

---

### Bookmarks panel

| Property | Default | Description |
|----------|---------|-------------|
| `bookmarkexplorer.enabled` | `true` | Enables the bookmarks/outline tab |
| `bookmarkexplorer.showAtStartup` | `false` | Opens the bookmark panel by default |
| `bookmarkexplorer.draggable` | `false` | Makes bookmarks draggable |
| `bookmarkexplorer.add.bookmark.enabled` | `true` | Allows users to create bookmarks |
| `bookmarkexplorer.delete.bookmark.enabled` | `true` | Allows users to delete bookmarks |
| `bookmarkexplorer.animation.enabled` | `false` | Animates bookmark expand/collapse |

---

### Advanced search panel

| Property | Default | Description |
|----------|---------|-------------|
| `advanced.searchexplorer.enabled` | `true` | Enables the advanced search panel tab |
| `advanced.searchexplorer.min.characterLength` | `0` | Minimum characters required to trigger a search |
| `advanced.searchexplorer.max.characterLength` | `255` | Maximum characters allowed |
| `advanced.searchexplorer.tooltipOnHover.enabled` | `true` | Shows search result tooltips on hover |
| `advanced.searchexplorer.caseSensitive.tooltip.enabled` | `false` | Shows a case-sensitive toggle tooltip |
| `advanced.searchexplorer.accentSensitive.tooltip.enabled` | `false` | Shows an accent-sensitive toggle tooltip |
| `advanced.searchexplorer.regex.tooltip.enabled` | `true` | Shows a regex toggle tooltip |
| `advanced.searchexplorer.updates.enabled` | `false` | Updates search results when annotations are refreshed |

---

### Annotation toolbar

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.annotationMenu` | `true` | Shows the annotation creation sub-menu |
| `topPanel.annotation.buttons.beanNames` | _(all buttons)_ | Ordered list of annotation tool buttons |
| `toolbar.activateBorders` | `true` | Shows border-style options in the annotation toolbar |
| `toolbar.redact.locked` | `false` | Locks redact annotations after saving (cannot be edited) |
| `toolbar.opacity.slider.enabled` | `true` | Shows an opacity slider for supported annotation types |
| `toolbar.richtext.hasSubscript` | `false` | Subscript formatting in rich-text annotations |
| `toolbar.richtext.hasSuperscript` | `false` | Superscript formatting |
| `toolbar.richtext.hasStrikeThrough` | `false` | Strikethrough formatting |
| `toolbar.richtext.hasRemoveFormat` | `false` | Clear-formatting button |

#### Annotation type toggles

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.annotationMenu.stickyNote` | `true` | Sticky note button |
| `topPanel.annotationMenu.stickyNote.editable` | `true` | Allows sticky notes to be edited |
| `topPanel.annotationMenu.freetext` | `true` | Free-text button |
| `topPanel.annotationMenu.highlight` | `true` | Rectangle highlight button |
| `topPanel.annotationMenu.highlight.repeat` | `false` | Repeat mode for rectangle highlights |
| `topPanel.annotationMenu.arrow` | `true` | Arrow button |
| `topPanel.annotationMenu.polygon` | `true` | Polygon button |
| `topPanel.annotationMenu.polyline` | `true` | Polyline button |
| `topPanel.annotationMenu.freehand` | `true` | Freehand ink button |
| `topPanel.annotationMenu.highlightText` | `false` | Text highlight button |
| `topPanel.annotationMenu.underlineText` | `false` | Text underline button |
| `topPanel.annotationMenu.strikethroughText` | `false` | Text strikethrough button |
| `topPanel.annotationMenu.circle` | `true` | Circle/ellipse button |
| `topPanel.annotationMenu.stamp` | `true` | Stamp button |
| `topPanel.annotationMenu.hide` | `true` | Hide/show annotations button |
| `topPanel.annotationMenu.hideAll` | `false` | Hide all annotations (including redact) |

---

### Annotation behavior

#### General

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.autosave` | `false` | Saves annotations automatically after each edit |
| `annotation.autorefresh` | `true` | Reloads annotations from the server after saving |
| `annotation.autosave.timerDelay` | `1000` | Delay (ms) before auto-save fires |
| `annotation.loadingGIF` | `true` | Shows a loading animation during save |
| `annotation.loadExisting` | `true` | Loads existing annotations when the document opens |
| `annotation.displaySaveWarning` | `true` | Warns when navigating away with unsaved annotations |
| `annotation.forceReadOnly` | `false` | Makes all saved annotations read-only |
| `annotation.forceLocked` | `false` | Locks all saved annotations |
| `annotation.can.hide.redact` | `false` | Allows hiding redact annotations with the regular hide button |
| `annotation.loadPerPage` | `false` | Loads annotations page by page instead of all at once |
| `annotation.searchTextInAnnotations` | `true` | Includes annotation content in text searches |
| `annotation.comment.pictogram.enabled` | `true` | Shows a pictogram on annotations that have comments |
| `annotation.default.stroke.dasharray` | `5.0,2.0` | Default dash pattern for dashed borders |

#### Sticky note defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.stickyNote.opacity` | `1.0` | Default opacity |
| `annotation.stickyNote.default.color` | `#F3F001` | Background color |
| `annotation.stickyNote.default.font` | `Helvetica` | Font family |
| `annotation.stickyNote.default.fontColor` | `#000000` | Text color |
| `annotation.stickyNote.default.fontSize` | `2` | Font size |
| `annotation.stickyNote.minimum.width` | `140` | Minimum width in pixels |
| `annotation.stickyNote.minimum.height` | `70` | Minimum height in pixels |
| `annotation.stickyNote.dotLink.enabled` | `true` | Draws a line between the pin and the note body |
| `annotation.stickyNote.pin.default.size` | `20` | Pin icon size in pixels |

#### Rectangle and circle defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.rectangle.opacity` | `0.7` | Rectangle opacity |
| `annotation.rectangle.default.color` | `#EAF39C` | Fill color |
| `annotation.rectangle.default.border.color` | `#EAF39C` | Border color |
| `annotation.rectangle.default.border.width` | `0` | Border width in pixels |
| `annotation.circle.opacity` | `0.7` | Circle opacity |
| `annotation.circle.default.color` | `#EAF39C` | Fill color |
| `annotation.circle.default.border.color` | `#EAF39C` | Border color |

#### Free-text defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.freetext.opacity` | `0.7` | Opacity |
| `annotation.freetext.default.color` | `#EEEEEE` | Background color |
| `annotation.freetext.default.border.color` | `#FF0000` | Border color |
| `annotation.freetext.default.border.width` | `2` | Border width in pixels |
| `annotation.freetext.default.font.size` | `16` | Font size in pixels |
| `annotation.freetext.adapt.font.size.enabled` | `false` | Scales font size with the current zoom level |

#### Arrow and line defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.arrow.backgroundColor` | `rgb(42, 72, 105)` | Arrow color |
| `annotation.arrow.computeDistance` | `false` | Displays the measured distance on the arrow |
| `annotation.arrow.x.defaultDistance` | `12` | Arrow head size in X (pixels) |
| `annotation.arrow.y.defaultDistance` | `12` | Arrow head size in Y (pixels) |

#### Stamp

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.stamp.create.in.browser.orientation` | `false` | Creates stamps in the browser viewport orientation |
| `annotation.stamp.create.relative.to.zoom` | `true` | Scales stamp size with zoom level |
| `annotation.stampCustom.enabled` | `true` | Allows users to create custom stamps |
| `annotation.stampCustom.maxFavorite` | `15` | Maximum saved custom stamps |

---

### Comment explorer

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.comment.explorer.enabled` | `true` | Enables the comment/annotation explorer panel |
| `annotation.comment.explorer.eastSide.enabled` | `false` | Places the explorer on the right side instead of left |
| `annotation.comment.explorer.openOnEdit` | `false` | Opens the explorer when an annotation is being edited |
| `annotation.comment.explorer.showAtStartup` | `false` | Opens the explorer by default on load |
| `annotation.comment.explorer.showAllAnnotators` | `true` | Shows a list of all annotation authors on the tab |
| `annotation.comment.explorer.showTotalAnnotationsNumber` | `false` | Shows the total annotation count on the tab |
| `annotation.comment.explorer.inline.enabled` | `false` | Displays annotations in a single compact line |
| `comment.showAnnotationImage` | `true` | Shows an annotation icon in the explorer |
| `comment.textArea.maxHeight` | `0` | Maximum height (px) of the "Show more" expand area; 0 means unlimited |
| `comment.richtext.shortcut.enabled` | `false` | Enter confirms the comment, Shift+Enter inserts a line break |

---

### Contextual (right-click) menu

| Property | Default | Description |
|----------|---------|-------------|
| `contextualMenu.enabled` | `true` | Enables the right-click context menu |
| `contextualMenu.icons.enabled` | `true` | Shows icons in the context menu |
| `contextualMenu.hasPrint` | `false` | Adds a print option |
| `contextualMenu.hasPrintAll` | `false` | Adds a print-all option |
| `contextualMenu.hasStickyNote` | `true` | Adds create sticky note |
| `contextualMenu.hasHighlight` | `true` | Adds create rectangle highlight |
| `contextualMenu.hasHighlightText` | `true` | Adds create text highlight |
| `contextualMenu.hasStrikeoutText` | `true` | Adds create strikethrough |
| `contextualMenu.hasUnderlineText` | `true` | Adds create underline |
| `contextualMenu.hasCircle` | `true` | Adds create circle |
| `contextualMenu.hasArrow` | `true` | Adds create arrow |
| `contextualMenu.hasPolygon` | `false` | Adds create polygon |
| `contextualMenu.hasPolyline` | `false` | Adds create polyline |
| `contextualMenu.hasFreehand` | `false` | Adds create freehand |
| `contextualMenu.hasFreetext` | `false` | Adds create free-text |
| `contextualMenu.hasStamp` | `false` | Adds create stamp |
| `contextualMenu.hasPageRotation` | `false` | Adds rotate page |
| `contextualMenu.hasMultiView` | `false` | Adds open in multi-view |
| `contextualMenu.hasAnchor` | `true` | Adds create page anchor |
| `contextualMenu.hasCropBoxImage` | `false` | Adds crop-box image capture |
| `contextualMenu.hasShowGuideRuler` | `false` | Adds show guide ruler |
| `contextualMenu.hasHideGuideRuler` | `false` | Adds hide guide ruler |

#### Crop box

| Property | Default | Description |
|----------|---------|-------------|
| `image.cropbox.target.dpi` | `150` | DPI of crop-box captured images (base is 72) |
| `image.cropbox.include.annotations` | `true` | Includes annotations in the crop-box image |
| `image.cropbox.can.expand` | `true` | Allows expanding images beyond their natural size |

---

### Toaster notifications

| Property | Default | Description |
|----------|---------|-------------|
| `toaster.log.severe.enabled` | `true` | Shows SEVERE-level notifications |
| `toaster.log.warning.enabled` | `true` | Shows WARNING-level notifications |
| `toaster.log.info.enabled` | `true` | Shows INFO-level notifications |
| `toaster.log.config.enabled` | `false` | Shows CONFIG-level notifications |
| `toaster.log.fine.enabled` | `false` | Shows FINE-level notifications |
| `toaster.log.severe.autoHide` | `false` | SEVERE notifications do not auto-hide |
| `toaster.log.warning.autoHide` | `true` | WARNING notifications auto-hide |
| `toaster.log.info.autoHide` | `true` | INFO notifications auto-hide |
| `toaster.toast.timeout` | `2000` | Auto-hide delay in milliseconds |
| `toaster.toast.newestOnTop` | `true` | Newest notifications appear at the top |

---

### Print

| Property | Default | Description |
|----------|---------|-------------|
| `print.renditionWidth` | `1200` | Image width in pixels for print-as-images mode |
| `print.imageStyle` | `width:800px;` | CSS style applied to printed images |
| `print.includeAnnotationsByDefault` | `false` | Pre-checks "print with annotations" in the dialog |
| `print.forcePrintAnnotations` | `false` | Forces annotation printing (checkbox cannot be unchecked) |
| `print.waterMarkActive` | `false` | Applies a watermark in the print dialog |
| `print.usePDFPrint` | `true` | Prints via PDF (smaller download) instead of a set of images |
| `print.allDocumentsByDefault` | `false` | Pre-selects all open documents for printing |

---

### Document builder

| Property | Default | Description |
|----------|---------|-------------|
| `documentbuilder.enabled` | `false` | Enables the document builder feature |
| `documentbuilder.button.visible` | `true` | Shows the document builder button when enabled |
| `documentbuilder.activateOnStartup` | `false` | Opens the builder automatically when documents are ready |
| `documentbuilder.hideDocumentNavigator` | `true` | Hides the navigator when the builder is open |
| `documentbuilder.displaySaveWarning` | `true` | Warns before leaving ARender with unsaved builder documents |
| `documentbuilder.thumbs.draggable` | `true` | Makes builder thumbnails draggable |
| `documentbuilder.width` | `280` | Builder panel width in pixels |
| `documentbuilder.save.behavior` | `UPDATE_NO_DOCUMENT` | Save behavior. Values: `UPDATE_NO_DOCUMENT`, `CREATE_NEW_FIRST_DOCUMENT`, `UPDATE_FIRST_DOCUMENT`, `UPDATE_ALL_DOCUMENT` |
| `documentbuilder.save.download` | `true` | Enables the local download button |
| `documentbuilder.save.delete` | `false` | Deletes source documents after saving |
| `documentbuilder.save.freeze` | `true` | Freezes the builder after saving |
| `documentbuilder.createDocument.enabled` | `true` | Allows creating new output documents |
| `documentbuilder.addChild.enabled` | `false` | Allows creating child (folder) documents |
| `documentbuilder.populatorPolicy` | `CopyCurrentDocument` | How the builder is populated on open. Values: `CopyCurrentDocument`, `EmptyDocument` |
| `documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy` | `true` | Flattens child document hierarchy when copying |
| `documentbuilder.button.hideUntilLoaded` | `true` | Hides the builder button until all documents are loaded |
| `documentbuilder.afterDownload` | `hide` | State of the builder after a download. Values: `hide`, `disable`, `nochange` |

---

### Document scroll

| Property | Default | Description |
|----------|---------|-------------|
| `document.vertical.slider.changeToPage.enabled` | `false` | Step-scrolls instead of jumping to page |
| `document.vertical.slider.new.click.scrollbar.behavior` | `true` | New scrollbar click behavior |
| `document.vertical.slider.use.legacy.scrollbar` | `false` | Uses the browser native scrollbar |
| `document.vertical.slider.use.legacy.scrollbar.limit.pages` | `0` | Page-count threshold for switching to the native scrollbar |
| `document.progressiveLoading` | `false` | Loads the document layout in parts |
| `document.loading.progress.update` | `true` | Updates the UI during progressive loading |

---

### Keyboard shortcuts

| Property | Default | Description |
|----------|---------|-------------|
| `shortCut.copy.enabled` | `true` | Enables Ctrl+C for copying selected text |
| `shortCut.cut.enabled` | `true` | Enables Ctrl+X |
| `shortCut.print.enabled` | `true` | Enables the print keyboard shortcut |
| `shortCut.print.key` | `p` | Key used for the print shortcut (with Ctrl) |

---

### Hyperlinks

| Property | Default | Description |
|----------|---------|-------------|
| `hyperlinks.loadInARender` | `false` | Opens hyperlinks inside ARender instead of a new browser tab |
| `hyperlinks.loadFromPDF` | `true` | Loads hyperlinks embedded in the PDF file |
| `hyperlinks.displayFrame` | `true` | Shows a blue border around hyperlink areas |
| `hyperlinks.load.internal` | `true` | Loads intra-document hyperlinks |
| `hyperlinks.load.external` | `true` | Loads external (URL) hyperlinks |

---

### Text selection

| Property | Default | Description |
|----------|---------|-------------|
| `text.selection.use.legacy` | `true` | Legacy mode selects character by character; set to `false` for word-by-word selection |

---

### Error handling

| Property | Default | Description |
|----------|---------|-------------|
| `error.warninDelay` | `10` | Seconds before showing a "document may be slow" warning |
| `error.hasDownloadButton` | `true` | Shows a download link in the error panel |
| `error.hideErrorStack` | `true` | Hides stack traces from the error panel (recommended for production) |

---

---

## Part 2 — Server-side properties

These properties control the Spring Boot backend. Override them in `configurations/arender-custom-server.properties`. They are **not** affected by visual profiles.

### Rendition connection

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.rendition.hosts` | `http://localhost:8761/` | Comma-separated list of broker URLs |
| `arender.server.rendition.weather.polling.interval` | `1000` | Polling interval (ms) for the weather score |
| `arender.server.rendition.weather.distribution.strategy` | `WEIGHTED_DISTRIBUTION` | Load-balancing strategy. Values: `BEST_TARGET`, `WEIGHTED_DISTRIBUTION`, `ROUND_ROBIN`, `RANDOM` |
| `arender.server.rendition.max.tries` | `2` | Retry attempts on failure |
| `arender.server.rendition.rest.max.connections` | `200` | Maximum simultaneous connections to the broker |
| `arender.server.rendition.rest.read.timeout` | `120000` | Read timeout in milliseconds |
| `arender.server.rendition.rest.write.timeout` | `120000` | Write timeout in milliseconds |
| `arender.server.rendition.rest.pending.acquire.timeout` | `120000` | Timeout (ms) for pending connection acquisition |
| `arender.server.rendition.rest.max.in.memory.size` | `8000000` | Maximum bytes buffered in memory per response (bytes) |

### Network and basic settings

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `8080` | HTTP port |
| `spring.config.import` | `optional:file:./configurations/arender-custom-server.properties` | Optional external properties file |

### Servlet cache

| Property | Default | Description |
|----------|---------|-------------|
| `servlet.composite.cache.duration.ms` | `3600000` | Client-side cache duration for composite resources (ms) |
| `servlet.async.supported` | `true` | Enable async servlet processing |

### Caching

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.cache.strategy` | `ehCacheStrategy` | Cache backend. Values: `ehCacheStrategy`, `hazelCastStrategy` |
| `arender.server.cache.hazelCast.config.path` | _(empty)_ | Path to a custom Hazelcast config file |
| `arender.server.routing.table.type` | `Classic` | Routing table storage. Values: `Classic`, `Redis`, `Hazelcast` |
| `arender.server.session.hazelcast.enabled` | `true` | Shares HTTP sessions via Hazelcast (required for HA with OAuth2) |

### Authentication and security

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.oauth2.enabled` | `false` | Enables OAuth2 login (Spring Boot only) |
| `arender.documentid.generator.beanName` | `documentIdGenerator` | Document ID generator bean. Values: `documentIdGenerator`, `encryptedDocumentIdGenerator` |
| `arender.documentid.encrypted.ttl.add` | `false` | Adds a TTL to encrypted document IDs |
| `arender.documentid.encrypted.ttl.duration.ms` | `3600000` | TTL duration in milliseconds (default: 1 hour) |

### Annotations (server)

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.annotations.can.create` | `true` | Allows annotation creation |
| `arender.server.annotations.text.html.support` | `true` | Allows HTML in text annotations |
| `arender.server.annotations.text.reply.support` | `true` | Allows replies to annotations |
| `arender.server.annotations.text.status.support` | `true` | Allows status on annotations |
| `arender.server.process.annotations.rendition` | `false` | Burns annotations during rendition (required for redact/watermark in images) |
| `arender.server.annotations.xfdf.localstorage.default.path` | `~/ARenderAnnotations/` | Local XFDF storage path for URL-accessed documents |

### Watermark

| Property | Default | Description |
|----------|---------|-------------|
| `arender.watermark.activate.on.startup` | `false` | Activates watermarking for all viewed and downloaded documents |
| `arender.watermark.bean.name` | `customWatermark` | Bean name of the watermark to apply |
| `arender.server.watermark.configuration.username.parameter` | `$USERNAME$` | Placeholder replaced by the current user name in watermark content |
| `arender.server.watermark.configuration.date.parameter` | `$TIMESTAMP$` | Placeholder replaced by the current date |

---

## Related pages

- [JavaScript API reference](/docs/arender/reference/javascript-api)
- [Document builder](/docs/arender/concepts/document-builder)
- [Annotations](/docs/arender/concepts/annotations)
- [Docker Compose deployment](/docs/arender/deployment/docker-compose)
