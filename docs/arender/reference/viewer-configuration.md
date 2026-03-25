---
viewer: classic
title: Viewer configuration
last_update:
  date: '2026-03-23T10:20:59.293Z'
  author: CI/CD Bot
slug: /reference/viewer-configuration
sidebar_position: 5
content_hash: 0d1cbf071ba66233d6692d6d99f8c0f156b3c89cb543a55f68b1d9af259fefa8
---

# Viewer configuration

The ARender viewer (HMI) has two distinct categories of configuration properties:

| | Client-side | Server-side |
|--|-------------|-------------|
| **What it controls** | UI appearance, toolbar buttons, annotation defaults, zoom, navigation, keyboard shortcuts | Rendition connection, caching, authentication, annotation storage, watermarks |
| **Defaults file** | `arender-default.properties` (inside the HMI JAR) | `arender-server-default.properties` (inside the HMI JAR) |
| **Override file** | `configurations/arender-custom-client.properties` | `configurations/arender-custom-server.properties` |
| **Where it runs** | Sent to the browser (GWT client) | Stays on the Spring Boot server |
| **Can be profile-scoped** | Yes, via [visual profiles](../guides/features/visual-profiles.md) (`?props=profileName`) | No |

For the full precedence hierarchy and file placement, see [Configuration system](../installation/configuration-system.md).

---

## Part 1 — Client-side properties

These properties control the viewer UI. Override them in `configurations/arender-custom-client.properties` or via a [visual profile](../guides/features/visual-profiles.md).

### Global display

| Property | Default | Description |
|----------|---------|-------------|
| `date.format` | `dd/MM/yyyy, HH:mm` | Date format used in annotation metadata |
| `style.sheet` | `css/arender-style.css` | Comma-separated list of CSS files to load |
| `arenderjs.startupScript` | _(empty)_ | URL of a JavaScript file to execute on startup |
| `preference.color.mode` | `LIGHT` | Top-panel color theme. Values: `LEGACY`, `DARK`, `LIGHT`, `CUSTOM`, `DEUTERANOPIA`, `PROTANOPIA`, `TRITANOPIA` |
| `window.maximize` | `false` | Maximizes the ARender window on load |
| `upload.file.openInNewWindow` | `false` | Opens uploaded files in a new ARender window |
| `arender.web.socket.enabled` | `true` | Enables WebSocket for push notifications |
| `arender.pollLastVersion` | `true` | Enables ARender version check |
| `arender.white.labeling` | `false` | Removes any ARender branding from the application |
| `arender.data.analytics.enabled` | `true` | Enables data analytics |
| `startup.loading.label` | `ARender` | Label displayed while the document starts to open |
| `ui.legacy.enabled` | `true` | Enables the legacy GWT UI; set to `false` to use ReactJS components |
| `notifications.duration` | `500` | Duration (ms) of legacy notifications |

---

### About dialog

| Property | Default | Description |
|----------|---------|-------------|
| `about.dialog.enabled` | `true` | Shows the About button |
| `about.dialog.statistics.enable` | `true` | Shows performance statistics in the About dialog |
| `about.dialog.statistics.table.enable` | `true` | Shows the statistics table (also removes graph values when disabled) |
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
| `topPanel.download.buttons.beanNames` | `downloadButton,downloadRootButton,downloadAllSourcesButton,downloadPdfButton,downloadAllButton,downloadWithRedactButton,downloadAnnotationsButton,downloadXFDFAnnotationsButton,downloadFDFAnnotationsButton,downloadWithFDFAnnotationsButton,downloadWithCompareButton` | Buttons in the download sub-menu |
| `topPanel.ellipsis.buttons.beanNames` | `labelAbout, aboutButton` | Buttons in the ellipsis (hamburger) menu |
| `topPanel.search.buttons.beanNames` | `searchBox` | Widgets in the search box area |
| `topPanel.imageProcessing.buttons.vertical.beanNames` | `brightnessSlider,contrastSlider,invertSlider` | Buttons in the image processing sub-menu |
| `topPanel.section.left.buttons.beanNames` | `importMenu,saveDirtyAnnotations,downloadMenu,printButton,plumeMenu,htmlPluginMenu` | Buttons in the left section of the toolbar |
| `topPanel.section.middle.buttons.beanNames` | `addStickyNoteAnnotationButton,annotationCreationOpenCreation,documentBuilderButton,imageProcessingMenu,showAllAnnotationsButton,showAllAnnotationsAndRotationsButton,refreshAnnotation,docLinkDropdown` | Buttons in the middle section of the toolbar |
| `topPanel.section.right.buttons.beanNames` | `firstPageButton,previousPageButton,pageNavigation,nextPageButton,lastPageButton,zoomBox,fullscreenButton,zoomSelectableDropdown,rotateSelectableDropdown,cropBoxButton,selectAllTextDocument,multiViewTools,searchSection` | Buttons in the right section of the toolbar |
| `toolbar.annotation.buttons.beanNames` | `addStrikethroughTextAnnotationButton,addUnderlineTextAnnotationButton,addFreeTextAnnotationButton,addHighlightTextAnnotationButton,addHighlightRectangleAnnotationButton,addHighlightCircleAnnotationButton,addPolygonAnnotationButton,addPolylineAnnotationButton,addFreehandAnnotationButton,addArrowAnnotationButton,addArrowDistanceAnnotationButton,addStampAnnotationButton,addSoundAnnotationButton` | Buttons in the annotation toolbar |

#### Zoom selectable button

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.selectable.button.zoom.enabled` | `true` | Enables the zoom selectable dropdown button |
| `topPanel.selectable.button.zoom.beanNames` | `zoomFullWidth,zoomFullHeight,zoomFullPage,zoomInZone,zoomInZoneGlass` | Widgets in the zoom selectable dropdown |
| `topPanel.selectable.button.zoom.default.beanName` | `zoomFullPage` | Default selected zoom action |

#### Rotate selectable button

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.selectable.button.rotate.enabled` | `true` | Enables the rotate selectable dropdown button |
| `topPanel.selectable.button.rotate.beanNames` | `rotateLeft,rotateRight,rotateAllLeft,rotateAllRight,rotateReset` | Widgets in the rotate selectable dropdown |
| `topPanel.selectable.button.rotate.default.beanName` | `rotateRight` | Default selected rotate action |

#### Document menu

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.documentMenu` | `true` | Enables the document sub-menu |
| `topPanel.importMenu.enabled` | `true` | Enables the import sub-menu |
| `topPanel.downloadMenu.enabled` | `true` | Enables the download sub-menu |
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
| `topPanel.documentMenu.downloadWithRedact` | `true` | Enables download with redactions applied as PDF (shown only to allowed users) |
| `topPanel.documentMenu.download.with.compare` | `true` | Enables download of compared documents side by side |

#### Image processing menu

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.imageProcessMenu.enabled` | `true` | Enables the image processing menu button |
| `topPanel.imageProcessMenu.brightness.enabled` | `true` | Enables the brightness slider |
| `topPanel.imageProcessMenu.contrast.enabled` | `true` | Enables the contrast slider |
| `topPanel.imageProcessMenu.invert.enabled` | `true` | Enables the invert colors slider |
| `topPanel.imageProcessMenu.process.mode` | `ALL_DOCUMENTS` | How image processing is applied. Values: `CURRENT_PAGE`, `ALL_PAGES`, `ALL_DOCUMENTS` |

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
| `topPanel.refresh` | `true` | Enables the refresh-annotations button |
| `topPanel.zoomBox` | `true` | Enables the boxed-zoom button |
| `topPanel.copy.document.text` | `false` | Enables the copy-all-text button |
| `topPanel.subMenu.button.timeOut` | `100` | _(Removed since 4.7.0)_ Milliseconds before a sub-menu button disappears |
| `topPanel.subMenu.subPanel.timeOut` | `500` | _(Removed since 4.7.0)_ Milliseconds before a sub-menu panel disappears |

#### Document linking

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.docLink` | `false` | Enables the document linking dropdown button |
| `topPanel.docLink.activateOnStartup` | `false` | Activates document linking at startup as soon as documents are open |
| `topPanel.docLink.enableZoneSelection` | `false` | If `true`, uses zone-based hyperlink; otherwise uses frame-based hyperlink |
| `topPanel.selectable.button.docLink.beanNames` | `blueText,blueFrame,blueZone` | Widgets in the document linking selectable dropdown |
| `topPanel.selectable.button.docLink.default.beanName` | `blueText` | Default document linking action |

---

### Navigation

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.pageNavigation.first` | `true` | Shows the first-page button |
| `topPanel.pageNavigation.previous` | `true` | Shows the previous-page button |
| `topPanel.pageNavigation.next` | `true` | Shows the next-page button |
| `topPanel.pageNavigation.last` | `true` | Shows the last-page button |

---

### Zoom

| Property | Default | Description |
|----------|---------|-------------|
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
| `visualization.zoom.step` | `0.1` | Zoom step value per zoom-in/zoom-out click |

---

### Rotation

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.rotation.left` | `true` | Rotate-left button |
| `topPanel.rotation.right` | `true` | Rotate-right button |
| `topPanel.rotation.all` | `false` | Rotate-all-pages buttons |
| `topPanel.rotation.reset` | `false` | Reset-rotation button |
| `topPanel.rotation.degree` | `90` | Degrees applied per rotation button press |
| `topPanel.rotation.add` | `true` | Shows the rotation sub-menu |
| `visualization.rotation.save.enabled` | `false` | Saves page rotations as annotations |
| `rotation.ignoreForceReadOnly` | `false` | Rotation annotations ignore the `forceReadOnly` setting |
| `rotation.ignoreForceLocked` | `false` | Rotation annotations ignore the `forceLocked` setting |

---

### Visualization

| Property | Default | Description |
|----------|---------|-------------|
| `visualization.mode` | `Single` | Page display mode. Values: `Single`, `BookMode` |
| `visualization.reload.lower.quality` | `false` | Reloads low-quality images once the full-resolution version is ready |
| `visualization.reload.minimum.width.change` | `0.1` | Minimum width difference ratio to trigger an image reload |
| `visualization.reload.minimum.width.change.mobile` | `200.0` | Minimum width difference (px) to trigger an image reload on mobile |
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
| `visualization.image.scheduled.timeoutMs` | `500` | Timeout (ms) before updating the image while resizing |
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
| `visualization.multiView.allow.scroll.document.change` | `false` | Allows vertical scrolling to change document while in multi-view |

#### Image comparison

| Property | Default | Description |
|----------|---------|-------------|
| `visualization.image.comparison.enabled` | `true` | Enables image comparison |
| `visualization.image.comparison.default.highlight.color` | `#FF0000` | Highlight color for pixel differences |
| `visualization.image.comparison.default.lowlight.color` | `none` | Lowlight color for common pixels |
| `visualization.image.comparison.default.fuzz` | `3` | Tolerance value (0–100) as a percentage |

---

### Document navigator and thumbnails

| Property | Default | Description |
|----------|---------|-------------|
| `documentnavigator.width` | `320` | Navigator panel width in pixels |
| `documentnavigator.search.width` | `400` | Advanced search panel width in pixels |
| `documentnavigator.annotation.width` | `400` | Annotation panel width in pixels |
| `documentnavigator.redact.width` | `400` | Redact panel width in pixels |
| `documentnavigator.ears.hideTimerDelay` | `100` | Milliseconds before the expand/collapse arrow hides |
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
| `thumbexplorer.columns` | `2` | Number of thumbnail columns (1–4). Only applies when `ui.legacy.enabled=false` |

---

### Redact explorer

| Property | Default | Description |
|----------|---------|-------------|
| `redactexplorer.enabled` | `false` | Enables the redact explorer panel |
| `redactexplorer.redact` | `true` | Enables the redact annotation button |
| `redactexplorer.redactZone` | `true` | Enables the redact zone annotation button |
| `redactexplorer.manualInput` | `true` | Enables the manual input button |
| `redactexplorer.rules` | `true` | Enables the rules button |
| `redactexplorer.redactPageContent` | `true` | Enables the redact current page content button |
| `redactexplorer.redactFullPage` | `true` | Enables the redact full current page button |
| `redactexplorer.redact.with.reasons` | `true` | Pre-selects the "With reason" radio button |

---

### Hyperlink explorer

| Property | Default | Description |
|----------|---------|-------------|
| `hyperlinkexplorer.enabled` | `true` | Enables the hyperlink explorer tab |

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

### Layer explorer

| Property | Default | Description |
|----------|---------|-------------|
| `layer.explorer.enabled` | `true` | Enables the layer explorer |
| `layer.explorer.update.pages.timeout` | `500` | Delay (ms) before updating page images after a layer change |

---

### Advanced search panel

| Property | Default | Description |
|----------|---------|-------------|
| `advanced.searchexplorer.enabled` | `true` | Enables the advanced search panel tab |
| `advanced.searchexplorer.min.characterLength` | `0` | Minimum characters required to trigger a search |
| `advanced.searchexplorer.max.characterLength` | `255` | Maximum characters allowed |
| `advanced.searchexplorer.updates.enabled` | `false` | Updates search results when annotations are refreshed |
| `advanced.searchexplorer.search.highlight.enabled` | `false` | Enables the search and highlight button |

---

### Annotation toolbar

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.annotationMenu` | `true` | Shows the annotation creation sub-menu |
| `toolbar.menu.annotation.startup.enabled` | `false` | Shows the annotation toolbar at startup |
| `toolbar.activateBorders` | `true` | Shows border-style options in the annotation toolbar |
| `toolbar.redact.locked` | `false` | Locks redact annotations after saving (cannot be edited) |
| `toolbar.opacity.slider.enabled` | `true` | Shows an opacity slider for supported annotation types |
| `toolbar.securityList.checkOwner` | `true` | Shows the security list only when the annotation belongs to the current user |

#### Rich text formatting

| Property | Default | Description |
|----------|---------|-------------|
| `toolbar.richtext.hasSubscript` | `false` | Subscript formatting in rich-text annotations |
| `toolbar.richtext.hasSuperscript` | `false` | Superscript formatting |
| `toolbar.richtext.hasStrikeThrough` | `false` | Strikethrough formatting |
| `toolbar.richtext.hasRemoveFormat` | `false` | Clear-formatting button |
| `toolbar.richtext.hasBold` | `true` | Bold formatting |
| `toolbar.richtext.hasItalic` | `true` | Italic formatting |
| `toolbar.richtext.hasUnderline` | `true` | Underline formatting |
| `toolbar.richtext.hasFonts` | `true` | Font family selector |
| `toolbar.richtext.hasFontSize` | `true` | Font size selector |
| `toolbar.richtext.hasFontColor` | `true` | Font color selector |

#### Link annotation toolbar

| Property | Default | Description |
|----------|---------|-------------|
| `toolbar.link.hasOpacity` | `true` | Enables opacity for link annotations |
| `toolbar.link.hasColor` | `true` | Enables color for link annotations |
| `toolbar.link.hasStyle` | `true` | Enables style for link annotations |

#### Distance measurement

| Property | Default | Description |
|----------|---------|-------------|
| `toolbar.distance.physical.units` | `in,cm,px` | Base physical units. Values: `pt`, `px`, `in`, `mm`, `cm`, `dm`, `m`, `km`, `ml`, `yd`, `ft` |
| `toolbar.distance.display.units` | `in,cm,px` | Display distance units |
| `toolbar.distance.physical.value.enabled` | `false` | Allows the physical distance ratio value to be changed |
| `toolbar.distance.physical.display.units.sync` | `true` | Syncs physical and display units — changing one changes the other |
| `toolbar.distance.display.units.alter.display.ratio.factor.enabled` | `true` | Changing display units alters the display ratio with the corresponding conversion factor |

#### Annotation type toggles

| Property | Default | Description |
|----------|---------|-------------|
| `topPanel.annotationMenu.stickyNote` | `true` | Sticky note button |
| `topPanel.annotationMenu.stickyNote.editable` | `true` | Allows sticky notes to be edited |
| `topPanel.annotationMenu.freetext` | `true` | Free-text button |
| `topPanel.annotationMenu.highlight` | `true` | Rectangle highlight button |
| `topPanel.annotationMenu.highlight.repeat` | `false` | Repeat mode for rectangle highlights |
| `topPanel.annotationMenu.arrow` | `true` | Arrow button |
| `topPanel.annotationMenu.arrow.repeat` | `false` | Repeat mode for arrows |
| `topPanel.annotationMenu.arrow.measure` | `true` | Arrow distance measurement button |
| `topPanel.annotationMenu.arrow.measure.repeat` | `false` | Repeat mode for arrow distance measurement |
| `topPanel.annotationMenu.polygon` | `true` | Polygon button |
| `topPanel.annotationMenu.polygon.repeat` | `false` | Repeat mode for polygons |
| `topPanel.annotationMenu.polyline` | `true` | Polyline button |
| `topPanel.annotationMenu.polyline.repeat` | `false` | Repeat mode for polylines |
| `topPanel.annotationMenu.freehand` | `true` | Freehand ink button |
| `topPanel.annotationMenu.freehand.repeat` | `false` | Repeat mode for freehand |
| `topPanel.annotationMenu.highlightText` | `false` | Text highlight button |
| `topPanel.annotationMenu.highlightText.repeat` | `false` | Repeat mode for text highlights |
| `topPanel.annotationMenu.underlineText` | `false` | Text underline button |
| `topPanel.annotationMenu.underlineText.repeat` | `false` | Repeat mode for text underline |
| `topPanel.annotationMenu.strikethroughText` | `false` | Text strikethrough button |
| `topPanel.annotationMenu.strikethroughText.repeat` | `false` | Repeat mode for text strikethrough |
| `topPanel.annotationMenu.circle` | `true` | Circle/ellipse button |
| `topPanel.annotationMenu.circle.repeat` | `false` | Repeat mode for circles |
| `topPanel.annotationMenu.stamp` | `true` | Stamp button |
| `topPanel.annotationMenu.sound` | `false` | Sound annotation button |
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
| `annotation.autosave.repeatMode.enabled` | `false` | Triggers auto-save when using annotation creation in repeat mode |
| `annotation.loadingGIF` | `true` | Shows a loading animation during save |
| `annotation.loadExisting` | `true` | Loads existing annotations when the document opens |
| `annotation.displaySaveWarning` | `true` | Warns when navigating away with unsaved annotations |
| `annotation.preferences.update.onEdit.enabled` | `false` | Updates annotation preferences on edit |
| `annotation.use.local.storage` | `false` | Uses local storage for annotation preferences |
| `annotation.forceReadOnly` | `false` | Makes all saved annotations read-only |
| `annotation.forceLocked` | `false` | Locks all saved annotations |
| `annotation.can.hide.redact` | `false` | Allows hiding redact annotations with the regular hide button |
| `annotation.loadPerPage` | `false` | Loads annotations page by page instead of all at once |
| `annotation.searchTextInAnnotations` | `true` | Includes annotation content in text searches |
| `annotation.comment.pictogram.enabled` | `true` | Shows a pictogram on annotations that have comments |
| `annotation.comment.display.target.enabled` | `false` | Displays target icon instead of annotation type icon (except for numbered sticky notes) |
| `annotation.default.stroke.dasharray` | `5.0,2.0` | Default dash pattern for dashed borders |
| `annotation.blendMode` | `false` | Enables blend mode for annotations that support it |
| `annotation.rotation.windmillEffect.enabled` | `false` | Stamp rotation effect in video mode |

#### Annotation info popup

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.info.popup.enabled` | `true` | Enables the info popup for annotations |
| `annotation.info.popup.evenIfEditable` | `false` | Shows the popup even for editable annotations |
| `annotation.info.popup.displayUpdate` | `false` | Displays the last updated time in the popup |
| `annotation.popup.autohide.delay.ms` | `300` | Auto-hide delay (ms) for annotation popups |
| `annotation.popup.default.background.color` | `#F6F6F6` | Fallback popup background color when annotation color is empty |

#### Date display

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.date.display.humanizedDate.enabled` | `false` | Displays humanized dates on comments and sticky notes |
| `annotation.date.display.creationDate` | `true` | If `true`, displays creation date; otherwise displays last modified date |

#### Rich text editing

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.richtext.edition.doubleClick` | `false` | Requires double-click on text to enter edit mode |

#### Sticky note defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.stickyNote.opacity` | `1.0` | Default opacity |
| `annotation.stickyNote.default.color` | `#1865D8` | Background color |
| `annotation.stickyNote.default.font` | `Helvetica` | Font family |
| `annotation.stickyNote.default.fontColor` | `#000000` | Text color |
| `annotation.stickyNote.default.fontSize` | `2` | Font size |
| `annotation.stickyNote.default.bold` | `false` | Bold by default |
| `annotation.stickyNote.default.underline` | `false` | Underline by default |
| `annotation.stickyNote.default.italic` | `false` | Italic by default |
| `annotation.stickyNote.minimum.width` | `250` | Minimum width in pixels |
| `annotation.stickyNote.minimum.height` | `170` | Minimum height in pixels |
| `annotation.stickyNote.size.according.to.zoom` | `true` | Adjusts minimum sizes according to zoom |
| `annotation.stickyNote.content.edition.height.ratio` | `0.7` | Ratio of content edition height relative to sticky note height |
| `annotation.stickyNote.hide.border` | `true` | Hides border options |
| `annotation.stickyNote.hide.details` | `false` | Hides sticky note details |
| `annotation.stickyNote.dotLink.enabled` | `true` | Draws a line between the pin and the note body |
| `annotation.stickyNote.pin.default.size` | `20` | Pin icon size in pixels |
| `annotation.stickyNote.pin.display.mode` | `INITIALS` | Pin display mode. Values: `INITIALS` (creator initials), `INDEX` (sticky note index) |
| `annotation.stickyNote.can.hide.reply.button` | `false` | Hides reply button when sticky note text is empty |
| `annotation.stickyNote.statusList.enabled` | `true` | Enables the status list dropdown |
| `annotation.stickyNote.action.buttons` | `HOVER` | Button label display. Values: `ALWAYS`, `HOVER`, `NEVER` |
| `annotation.stickyNote.show.date` | `true` | Displays the date |
| `annotation.stickyNote.creator.name.initial.only` | `true` | Displays only initials of the creator name |
| `annotation.stickyNote.outline` | `false` | Outlines sticky note in blue and disables edit mode when clicking the icon in the comment explorer |
| `annotation.stickyNote.adapt.font.size.enabled` | `false` | Adapts font size according to the zoom ratio |
| `annotation.stickyNote.reduce.all` | `false` | Reduces all sticky notes at document loading |

#### Rectangle and circle defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.rectangle.opacity` | `0.7` | Rectangle opacity |
| `annotation.rectangle.default.color` | `#EAF39C` | Fill color |
| `annotation.rectangle.default.border.color` | `#EAF39C` | Border color |
| `annotation.rectangle.default.border.width` | `0` | Border width in pixels |
| `annotation.rectangle.minimum.width` | `30` | Minimum width in pixels |
| `annotation.rectangle.minimum.height` | `10` | Minimum height in pixels |
| `annotation.circle.opacity` | `0.7` | Circle opacity |
| `annotation.circle.default.color` | `#EAF39C` | Fill color |
| `annotation.circle.default.border.color` | `#EAF39C` | Border color |
| `annotation.circle.default.border.width` | `0` | Border width in pixels |
| `annotation.circle.minimum.width` | `30` | Minimum width in pixels |
| `annotation.circle.minimum.height` | `10` | Minimum height in pixels |

#### Text highlight and redact defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.highlighttext.opacity` | `0.7` | Highlight annotation opacity |
| `annotation.highlighttext.default.color` | `#EAF39C` | Highlight annotation color |
| `annotation.highlighttext.strike.width.ratio` | `0.1` | Strike width ratio for underline/strikethrough annotations |
| `annotation.redact.default.opacity` | `1.0` | Redact annotation opacity |
| `annotation.redact.default.color` | `#000000` | Redact annotation color |

#### Free-text defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.freetext.opacity` | `0.7` | Opacity |
| `annotation.freetext.default.color` | `#EEEEEE` | Background color |
| `annotation.freetext.default.border.color` | `#FF0000` | Border color |
| `annotation.freetext.default.border.width` | `2` | Border width in pixels |
| `annotation.freetext.default.font.size` | `16` | Font size in pixels |
| `annotation.freetext.default.font.color` | `#000000` | Font color |
| `annotation.freetext.default.font` | `Helvetica` | Font family |
| `annotation.freetext.minimum.width` | `30` | Minimum width in pixels |
| `annotation.freetext.minimum.height` | `10` | Minimum height in pixels |
| `annotation.freetext.adapt.font.size.enabled` | `false` | Scales font size with the current zoom level |
| `annotation.freetext.rotation.enabled` | `false` | Freetext rotates when rotating a page |
| `annotation.freetext.drag.widgets.on.edit` | `true` | Auto-activates draggable widgets in edition mode |

#### Arrow and line defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.arrow.backgroundColor` | `rgb(42, 72, 105)` | Arrow color |
| `annotation.arrow.opacity` | `1.0` | Arrow opacity |
| `annotation.arrow.border.width` | `4.0` | Arrow border width |
| `annotation.arrow.computeDistance` | `false` | Displays the measured distance on the arrow |
| `annotation.arrow.x.defaultDistance` | `12` | Arrow head size in X (pixels) |
| `annotation.arrow.y.defaultDistance` | `12` | Arrow head size in Y (pixels) |
| `annotation.arrow.minimal.head.size` | `-1` | Minimum head size in pixels (-1 disables) |
| `annotation.arrow.head.type` | `OPEN_ARROW` | Arrow head type. Values: `NONE`, `SQUARE`, `CIRCLE`, `DIAMOND`, `OPEN_ARROW`, `CLOSED_ARROW`, `BUTT`, `R_OPEN_ARROW`, `R_CLOSED_ARROW` |
| `annotation.arrow.tail.type` | `NONE` | Arrow tail type. Same values as head type |
| `annotation.arrow.measurement.head.type` | `BUTT` | Measurement arrow head type. Same values as head type |
| `annotation.arrow.measurement.tail.type` | `BUTT` | Measurement arrow tail type. Same values as head type |
| `annotation.arrow.distance.degree.accuracy` | `0.01` | Degree of accuracy for displayed measure (power of ten) |

#### Polygon defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.polygon.opacity` | `0.7` | Polygon opacity |
| `annotation.polygon.backgroundColor` | `rgb(42, 72, 105)` | Fill color |
| `annotation.polygon.width` | `2.0f` | Border width |
| `annotation.polygon.borderColor` | `rgb(42, 72, 105)` | Border color |

#### Polyline defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.polyline.opacity` | `1` | Polyline opacity |
| `annotation.polyline.backgroundColor` | `rgb(42, 72, 105)` | Line color |
| `annotation.polyline.width` | `2.0f` | Line width |

#### Freehand (ink) defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.ink.opacity` | `1` | Freehand opacity |
| `annotation.ink.backgroundColor` | `rgb(42, 72, 105)` | Ink color |
| `annotation.ink.width` | `2.0f` | Stroke width |

#### Hyperlink annotation defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.hyperlink.opacity` | `0.5f` | Hyperlink annotation opacity |
| `annotation.hyperlink.default.color` | `#0000FF` | Hyperlink annotation color |
| `annotation.hyperlink.externe.target.enabled` | `true` | Allows the hyperlink target to be an external document |
| `annotation.hyperlink.target.show.timeout` | `10000` | Time (ms) to display the hyperlink target elements |
| `annotation.hyperlink.use.legacy.creation` | `false` | Legacy creation: target page starts from index 1 instead of 0 |
| `annotation.hyperlink.open.document.tab` | `true` | Opens hyperlinked documents in a new tab |

#### Sound annotation defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.sound.show.controls.at.load` | `false` | Shows media controls at creation |
| `annotation.sound.record.time.limit` | `60000` | Maximum recording time (ms) |

#### Stamp defaults

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.stamp.create.in.browser.orientation` | `false` | Creates stamps in the browser viewport orientation |
| `annotation.stamp.create.relative.to.zoom` | `true` | Scales stamp size with zoom level |
| `annotation.stampCustom.enabled` | `true` | Allows users to create custom stamps |
| `annotation.stampCustom.maxFavorite` | `15` | Maximum saved custom stamps |
| `annotation.stampCustom.min.text.length` | `2` | Minimum text length for custom stamps |

---

### Comment explorer

| Property | Default | Description |
|----------|---------|-------------|
| `annotation.comment.explorer.enabled` | `true` | Enables the comment/annotation explorer panel |
| `annotation.comment.explorer.eastSide.enabled` | `false` | Places the explorer on the right side instead of left |
| `annotation.comment.explorer.openOnEdit` | `false` | Opens the explorer when an annotation is being edited |
| `annotation.comment.explorer.animate.on.expand` | `true` | Animates the explorer when expanding |
| `annotation.comment.explorer.showAtStartup` | `false` | Opens the explorer by default on load |
| `annotation.comment.explorer.showAllAnnotators` | `true` | Shows a list of all annotation authors on the tab |
| `annotation.comment.explorer.showTotalAnnotationsNumber` | `false` | Shows the total annotation count on the tab |
| `annotation.comment.explorer.inline.enabled` | `false` | Displays annotations in a single compact line |
| `annotation.comment.explorer.show.annotation.minimized.on.open` | `false` | Displays annotations minimized by default |
| `annotation.comment.explorer.filterPageAnnotations` | `false` | Also filters annotations in the page view |
| `annotation.comment.explorer.sortByIncrementDate` | `true` | Sorts by increment date; `false` sorts by decrement date |
| `annotation.comment.explorer.show.date` | `true` | Displays the date in the explorer |
| `annotation.comment.explorer.creator.name.initial.only` | `false` | Displays only initials of the creator name |
| `annotation.comment.explorer.show.one.annotation.only` | `false` | Displays only one annotation per page |
| `comment.showAnnotationImage` | `true` | Shows an annotation icon in the explorer |
| `comment.textArea.maxHeight` | `0` | Maximum height (px) of the "Show more" expand area; 0 means unlimited |
| `comment.contextStatusMenu.enabled` | `false` | Enables right-click contextual status menu on comment annotations |
| `comment.multiple.thread.level.enabled` | `false` | Enables multiple comment thread levels |
| `comment.richtext.shortcut.enabled` | `false` | Enter confirms the comment, Shift+Enter inserts a line break |
| `comment.edit.annotation.onselection.enabled` | `true` | Enters edit mode when clicking on a comment zone |
| `filter.comment.currentUser.enabled` | `true` | Enables the button to filter annotations by current user |

---

### Timeline panel (video annotations)

| Property | Default | Description |
|----------|---------|-------------|
| `timeline.panel.annotationBar.showResizeCircleButton` | `true` | Shows the resize button for the annotation bar |
| `timeline.panel.annotationBar.changeVideoCurrentTimeOnDrag.enabled` | `true` | Updates the video timer when dragging annotations |
| `timeline.panel.openIfAnnotated` | `true` | Opens the timeline panel if annotations exist on the video |
| `timeline.panel.openOnEdit` | `true` | Opens the timeline panel when an annotation is being edited |

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
| `image.cropbox.window.position.left.px` | `0` | Left position (px) of the crop-box popup window |
| `image.cropbox.window.position.top.px` | `0` | Top position (px) of the crop-box popup window |
| `image.cropbox.window.position.width.px` | `-1` | Width (px) of the popup; -1 uses screen ratio |
| `image.cropbox.window.position.height.px` | `-1` | Height (px) of the popup; -1 uses screen ratio |
| `image.cropbox.window.screen.ratio` | `3` | Screen ratio for width/height when set to -1 |

---

### Quick contextual menu (text selection)

| Property | Default | Description |
|----------|---------|-------------|
| `quick.contextual.menu.enabled` | `true` | Enables the quick context menu when text is selected |
| `quick.contextual.menu.hasHighlightText` | `true` | Adds text highlight option |
| `quick.contextual.menu.hasStrikeoutText` | `true` | Adds strikethrough option |
| `quick.contextual.menu.hasUnderlineText` | `true` | Adds underline option |
| `quick.contextual.menu.hasHyperlink` | `true` | Adds hyperlink creation option |
| `quick.contextual.menu.hasHyperlinkZone` | `true` | Adds hyperlink area creation option |
| `quick.contextual.menu.hasRedactText` | `true` | Adds redact annotation option |
| `quick.contextual.menu.hasCopyText` | `true` | Adds copy selected text option |

---

### Toaster notifications

| Property | Default | Description |
|----------|---------|-------------|
| `toaster.log.severe.enabled` | `true` | Shows SEVERE-level notifications |
| `toaster.log.warning.enabled` | `true` | Shows WARNING-level notifications |
| `toaster.log.info.enabled` | `true` | Shows INFO-level notifications |
| `toaster.log.config.enabled` | `false` | Shows CONFIG-level notifications |
| `toaster.log.fine.enabled` | `false` | Shows FINE-level notifications |
| `toaster.log.finer.enabled` | `false` | Shows FINER-level notifications |
| `toaster.log.finest.enabled` | `false` | Shows FINEST-level notifications |
| `toaster.log.severe.autoHide` | `false` | SEVERE notifications do not auto-hide |
| `toaster.log.warning.autoHide` | `true` | WARNING notifications auto-hide |
| `toaster.log.info.autoHide` | `true` | INFO notifications auto-hide |
| `toaster.log.config.autoHide` | `true` | CONFIG notifications auto-hide |
| `toaster.log.fine.autoHide` | `true` | FINE notifications auto-hide |
| `toaster.log.finer.autoHide` | `true` | FINER notifications auto-hide |
| `toaster.log.finest.autoHide` | `true` | FINEST notifications auto-hide |
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
| `documentbuilder.width` | `320` | Builder panel width in pixels |
| `documentbuilder.save.action` | `save` | Default save button action |
| `documentbuilder.save.behavior` | `UPDATE_NO_DOCUMENT` | Save behavior. Values: `UPDATE_NO_DOCUMENT`, `CREATE_NEW_FIRST_DOCUMENT`, `UPDATE_FIRST_DOCUMENT`, `UPDATE_ALL_DOCUMENT` |
| `documentbuilder.save.download` | `true` | Enables the local download button |
| `documentbuilder.save.delete` | `false` | Deletes source documents after saving |
| `documentbuilder.save.freeze` | `true` | Shows a frozen title that must be manually removed to confirm the operation |
| `documentbuilder.createDocument.enabled` | `true` | Allows creating new output documents |
| `documentbuilder.addChild.enabled` | `false` | Allows creating child (folder) documents |
| `documentbuilder.deleteSelectedThumbs.enabled` | `true` | Enables right-click deletion of selected thumbnails |
| `documentbuilder.createDocumentFromSelectedThumbs.enabled` | `true` | Enables creating a new document from selected thumbnails |
| `documentbuilder.close.enabled` | `true` | Enables the contextual menu option to close the builder |
| `documentbuilder.populatorPolicy` | `CopyCurrentDocument` | How the builder is populated on open. Values: `CopyCurrentDocument`, `EmptyDocument` |
| `documentbuilder.populatorPolicy.CopyCurrentDocument.flattenNodeHierarchy` | `true` | Flattens child document hierarchy when copying |
| `documentbuilder.button.hideUntilLoaded` | `true` | Hides the builder button until all documents are loaded |
| `documentbuilder.afterDownload` | `hide` | State of the builder after a download. Values: `hide`, `disable`, `nochange` |
| `documentbuilder.custom.select.readOnly` | `false` | Sets the custom options select to read-only mode |

#### Document builder buttons

| Property | Default | Description |
|----------|---------|-------------|
| `documentbuilder.button.legacySave.enabled` | `false` | Enables the legacy save button |
| `documentbuilder.button.download.enabled` | `true` | Enables the download button |
| `documentbuilder.button.download.annotations.enabled` | `false` | Enables the download with annotations button |
| `documentbuilder.button.custom.enabled` | `false` | Enables the custom action button |
| `documentbuilder.button.updateAll.enabled` | `false` | Enables the update all documents button |
| `documentbuilder.button.updateAll.active.when.empty` | `false` | Shows the updateAll button even when documents are empty |
| `documentbuilder.button.createFirst.enabled` | `false` | Enables the create new first document button |
| `documentbuilder.button.updateFirst.enabled` | `false` | Enables the update document button |
| `documentbuilder.button.saveAll.enabled` | `false` | Enables the save all documents button |
| `documentbuilder.button.saveAll.active.when.empty` | `false` | Shows the saveAll button even when documents are empty |
| `documentbuilder.button.refresh.enabled` | `true` | Enables the refresh (reset to original state) button |
| `documentbuilder.button.document.removal.enabled` | `true` | Enables the document removal button |
| `documentbuilder.button.page.removal.enabled` | `true` | Enables the page removal (red cross) button |

#### Document builder contextual menu

| Property | Default | Description |
|----------|---------|-------------|
| `documentbuilder.contextual.menu.download.enabled` | `false` | Enables the local download action |
| `documentbuilder.contextual.menu.download.annotations.enabled` | `false` | Enables the download with annotations action |
| `documentbuilder.contextual.menu.createFirst.enabled` | `false` | Enables the create first document action |
| `documentbuilder.contextual.menu.updateFirst.enabled` | `false` | Enables the update document action |
| `documentbuilder.contextual.menu.delete.enabled` | `false` | Enables the delete document action |

---

### Document scroll

| Property | Default | Description |
|----------|---------|-------------|
| `document.vertical.slider.changeToPage.enabled` | `false` | Step-scrolls instead of jumping to page |
| `document.vertical.slider.new.click.scrollbar.behavior` | `true` | New scrollbar click behavior |
| `document.vertical.slider.use.legacy.scrollbar` | `false` | Uses the browser native scrollbar |
| `document.vertical.slider.use.legacy.scrollbar.limit.pages` | `2` | Page-count threshold for switching to the native scrollbar |
| `document.vertical.slider.update.antirebound.timeout` | `50` | Delay (ms) before updating the scroll preview thumbnail |
| `document.vertical.slider.hide.timeout` | `400` | Delay (ms) before hiding the scroll preview thumbnail |
| `document.progressiveLoading` | `false` | Loads the document layout in parts |
| `document.loading.progress.update` | `true` | Updates the UI during progressive loading |

---

### Keyboard shortcuts

#### General shortcuts

| Property | Default | Description |
|----------|---------|-------------|
| `shortcut.copy.enabled` | `true` | Enables Ctrl+C and Ctrl+X for copying/cutting selected text |
| `shortcut.print.key` | `p` | Print shortcut key |
| `shortcut.print.ctrl` | `true` | Print shortcut uses Ctrl |
| `shortcut.print.shift` | `false` | Print shortcut uses Shift |
| `shortcut.print.alt` | `false` | Print shortcut uses Alt |
| `shortcut.zoomin.key` | `k` | Zoom-in shortcut key |
| `shortcut.zoomin.ctrl` | `true` | Zoom-in shortcut uses Ctrl |
| `shortcut.zoomin.shift` | `false` | Zoom-in shortcut uses Shift |
| `shortcut.zoomin.alt` | `false` | Zoom-in shortcut uses Alt |
| `shortcut.zoomout.key` | `i` | Zoom-out shortcut key |
| `shortcut.zoomout.ctrl` | `true` | Zoom-out shortcut uses Ctrl |
| `shortcut.zoomout.shift` | `false` | Zoom-out shortcut uses Shift |
| `shortcut.zoomout.alt` | `false` | Zoom-out shortcut uses Alt |
| `shortcut.fullscreen.key` | `q` | Full-screen shortcut key |
| `shortcut.fullscreen.ctrl` | `true` | Full-screen shortcut uses Ctrl |
| `shortcut.fullscreen.shift` | `false` | Full-screen shortcut uses Shift |
| `shortcut.fullscreen.alt` | `false` | Full-screen shortcut uses Alt |
| `shortcut.search.key` | `f` | Search shortcut key |
| `shortcut.search.ctrl` | `true` | Search shortcut uses Ctrl |
| `shortcut.search.shift` | `false` | Search shortcut uses Shift |
| `shortcut.search.alt` | `false` | Search shortcut uses Alt |
| `shortcut.save.key` | `s` | Save shortcut key |
| `shortcut.save.ctrl` | `true` | Save shortcut uses Ctrl |
| `shortcut.save.shift` | `false` | Save shortcut uses Shift |
| `shortcut.save.alt` | `false` | Save shortcut uses Alt |
| `shortcut.duplicate.key` | `d` | Duplicate annotation shortcut key |
| `shortcut.duplicate.ctrl` | `true` | Duplicate shortcut uses Ctrl |
| `shortcut.duplicate.shift` | `false` | Duplicate shortcut uses Shift |
| `shortcut.duplicate.alt` | `false` | Duplicate shortcut uses Alt |
| `shortcut.about.key` | `,` | About dialog shortcut key |
| `shortcut.about.ctrl` | `true` | About shortcut uses Ctrl |
| `shortcut.about.shift` | `false` | About shortcut uses Shift |
| `shortcut.about.alt` | `false` | About shortcut uses Alt |
| `shortcut.delthumb.key` | `Delete` | Delete thumbnail shortcut key |
| `shortcut.delthumb.ctrl` | `false` | Delete thumbnail shortcut uses Ctrl |
| `shortcut.delthumb.shift` | `true` | Delete thumbnail shortcut uses Shift |
| `shortcut.delthumb.alt` | `false` | Delete thumbnail shortcut uses Alt |

#### Navigation shortcuts

| Property | Default | Description |
|----------|---------|-------------|
| `shortcut.nextPage.key` | `ArrowRight` | Next page shortcut key |
| `shortcut.nextPage.ctrl` | `false` | Next page shortcut uses Ctrl |
| `shortcut.nextPage.shift` | `false` | Next page shortcut uses Shift |
| `shortcut.nextPage.alt` | `false` | Next page shortcut uses Alt |
| `shortcut.previousPage.key` | `ArrowLeft` | Previous page shortcut key |
| `shortcut.previousPage.ctrl` | `false` | Previous page shortcut uses Ctrl |
| `shortcut.previousPage.shift` | `false` | Previous page shortcut uses Shift |
| `shortcut.previousPage.alt` | `false` | Previous page shortcut uses Alt |
| `shortcut.movePageDown.key` | `ArrowDown` | Move page down shortcut key |
| `shortcut.movePageDown.ctrl` | `false` | Move page down shortcut uses Ctrl |
| `shortcut.movePageDown.shift` | `false` | Move page down shortcut uses Shift |
| `shortcut.movePageDown.alt` | `false` | Move page down shortcut uses Alt |
| `shortcut.movePageUp.key` | `ArrowUp` | Move page up shortcut key |
| `shortcut.movePageUp.ctrl` | `false` | Move page up shortcut uses Ctrl |
| `shortcut.movePageUp.shift` | `false` | Move page up shortcut uses Shift |
| `shortcut.movePageUp.alt` | `false` | Move page up shortcut uses Alt |
| `shortcut.pageDown.key` | `PageDown` | Scroll page down shortcut key |
| `shortcut.pageDown.ctrl` | `false` | Scroll page down shortcut uses Ctrl |
| `shortcut.pageDown.shift` | `false` | Scroll page down shortcut uses Shift |
| `shortcut.pageDown.alt` | `false` | Scroll page down shortcut uses Alt |
| `shortcut.pageUp.key` | `PageUp` | Scroll page up shortcut key |
| `shortcut.pageUp.ctrl` | `false` | Scroll page up shortcut uses Ctrl |
| `shortcut.pageUp.shift` | `false` | Scroll page up shortcut uses Shift |
| `shortcut.pageUp.alt` | `false` | Scroll page up shortcut uses Alt |

#### Annotation creation shortcuts

| Property | Default | Description |
|----------|---------|-------------|
| `shortcut.annotation.stickynote.key` | `1` | Sticky note creation shortcut key |
| `shortcut.annotation.stickynote.enabled` | `true` | Enables Ctrl + key for sticky note creation |
| `shortcut.annotation.freetext.key` | `2` | Free-text creation shortcut key |
| `shortcut.annotation.freetext.enabled` | `true` | Enables Ctrl + key for free-text creation |
| `shortcut.annotation.rectangle.key` | `3` | Rectangle creation shortcut key |
| `shortcut.annotation.rectangle.enabled` | `true` | Enables Ctrl + key for rectangle creation |
| `shortcut.annotation.circle.key` | `4` | Circle creation shortcut key |
| `shortcut.annotation.circle.enabled` | `true` | Enables Ctrl + key for circle creation |
| `shortcut.annotation.polygon.key` | `5` | Polygon creation shortcut key |
| `shortcut.annotation.polygon.enabled` | `true` | Enables Ctrl + key for polygon creation |
| `shortcut.annotation.polyline.key` | `6` | Polyline creation shortcut key |
| `shortcut.annotation.polyline.enabled` | `true` | Enables Ctrl + key for polyline creation |
| `shortcut.annotation.freehand.key` | `7` | Freehand creation shortcut key |
| `shortcut.annotation.freehand.enabled` | `true` | Enables Ctrl + key for freehand creation |
| `shortcut.annotation.arrow.key` | `8` | Arrow creation shortcut key |
| `shortcut.annotation.arrow.enabled` | `true` | Enables Ctrl + key for arrow creation |
| `shortcut.annotation.measure.key` | `9` | Arrow distance creation shortcut key |
| `shortcut.annotation.measure.enabled` | `true` | Enables Ctrl + key for arrow distance creation |
| `shortcut.annotation.stamp.key` | `0` | Stamp creation shortcut key |
| `shortcut.annotation.stamp.enabled` | `true` | Enables Ctrl + key for stamp creation |

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

### Plume integration

| Property | Default | Description |
|----------|---------|-------------|
| `plume.enabled` | `false` | Enables Plume integration with ARender |
| `plume.url` | `/plume` | Plume URL |
| `html.plugin.enabled` | `false` | Enables the HTML plugin to view HTML content directly instead of its rendition |

---

### Bottom panel

| Property | Default | Description |
|----------|---------|-------------|
| `bottomPanel.toggle.document.navigator.enabled` | `false` | Enables the button to toggle the document navigator |

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
| `arender.server.rendition.ignore.document.accessors.with.exceptions` | `false` | Ignores document accessors that throw exceptions |
| `arender.server.rendition.disable.check.document.availability` | `true` | Disables document availability check |
| `arender.server.rendition.search.documents` | `false` | Enables document search in rendition |
| `arender.server.rendition.micro.services.expected.count` | `4` | Expected number of rendition microservices |
| `arender.server.rendition.rest.max.in.memory.size` | `8000000` | Maximum bytes buffered in memory per response (bytes) |
| `arender.server.rendition.rest.max.connections` | `200` | Maximum simultaneous connections to the broker |
| `arender.server.rendition.rest.pending.acquire.timeout` | `120000` | Timeout (ms) for pending connection acquisition |
| `arender.server.rendition.rest.pending.acquire.max.count` | `-1` | Maximum pending acquire requests (-1 for no limit) |
| `arender.server.rendition.rest.max.idle.time` | `-1` | Duration (ms) after which an idle channel is closed (-1 for no limit) |
| `arender.server.rendition.rest.max.life.time` | `-1` | Maximum lifetime (ms) for a channel (-1 for no limit) |
| `arender.server.rendition.rest.read.timeout` | `120000` | Read timeout in milliseconds |
| `arender.server.rendition.rest.write.timeout` | `120000` | Write timeout in milliseconds |

---

### Network and basic settings

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `8080` | HTTP port |
| `spring.config.import` | `optional:file:./configurations/arender-custom-server.properties` | Optional external properties file |
| `arender.server.properties.reference` | `arender-default.properties` | Properties configuration file names used to filter URL parameters |

---

### Servlet configuration

| Property | Default | Description |
|----------|---------|-------------|
| `servlet.composite.cache.duration.ms` | `3600000` | Client-side cache duration for composite resources (ms) |
| `servlet.async.supported` | `true` | Enables async servlet processing |
| `arender.server.servlet.config.downloadServlet.addExtension` | `true` | Adds a file extension based on MIME type when downloading the source file |
| `arender.server.legacy.layout.enabled` | `true` | Enables the legacy blocking get-layout call (tries WebSocket first, then polling) |

---

### Image servlet thread pool

| Property | Default | Description |
|----------|---------|-------------|
| `image.servlet.thread.pool.size` | `200` | Thread pool size for image servlet |
| `image.servlet.thread.pool.isDaemon` | `false` | Whether threads are daemon threads |
| `image.servlet.thread.pool.threadPrefix` | `image-servlet-pool-%d` | Thread name prefix |
| `image.servlet.thread.pool.keepAliveTime` | `0` | Timeout (ms) for idle thread expiration (0 or negative disables) |

---

### Caching and routing

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.cache.strategy` | `ehCacheStrategy` | Cache backend. Values: `ehCacheStrategy`, `hazelCastStrategy` |
| `arender.server.cache.hazelCast.config.path` | _(empty)_ | Path to a custom Hazelcast config file |
| `arender.server.routing.table.type` | `Classic` | Routing table storage. Values: `Classic`, `Redis`, `Hazelcast` |
| `arender.server.routing.table.redis.url` | `redis://localhost:6379` | Redis URL for routing table backup |
| `arender.server.session.hazelcast.enabled` | `true` | Shares HTTP sessions via Hazelcast (required for HA with OAuth2) |
| `time.cached.on.the.fly.altered.documents.in.seconds` | `10` | Seconds a document rendition ID (altered, watermarked) is cached before refresh |

---

### Authentication and security

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.oauth2.enabled` | `false` | Enables OAuth2 login (Spring Boot only) |
| `arender.server.authentication.service.provider` | `defaultAuthenticationServiceProvider` | Authentication provider bean called to verify credentials for redacted content viewing |
| `arender.server.json.load.token.validator` | `noopTokenValidator` | Bean ID of the TokenValidator for JSON reload token validation |
| `arender.documentid.generator.beanName` | `documentIdGenerator` | Document ID generator bean. Values: `documentIdGenerator`, `encryptedDocumentIdGenerator` |
| `arender.documentid.encrypted.ttl.add` | `false` | Adds a TTL to encrypted document IDs |
| `arender.documentid.encrypted.ttl.duration.ms` | `3600000` | TTL duration in milliseconds (default: 1 hour) |
| `default.url.parser.use.locale.for.ids` | `false` | Generates a dedicated document ID per locale |
| `default.url.parser.use.timeZone.for.ids` | `false` | Generates a dedicated document ID per timezone |

---

### URL parsers and annotation accessors

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.url.parsers.beanNames` | `DefaultURLParser,DocumentIdURLParser,FileattachmentURLParser,ExternalBeanURLParser,AlterContentParser,FallbackURLParser` | Comma-separated list of URL parser bean names |
| `arender.server.default.annotation.accessor` | `redactConverterAnnotationAccessor` | Default annotation accessor bean |
| `arender.server.default.annotation.accessor.fallback.beanNames` | `xfdfAnnotationAccessor` | Fallback annotation accessor bean names |
| `arender.server.wrapper.source.annotation.accessor` | `xfdfAnnotationAccessor` | Wrapper source annotation accessor |
| `arender.server.wrapper.source.convert` | `true` | Converts V4 redact annotations to XFDF redact annotation format |

---

### Annotations (server)

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.annotations.can.create` | `true` | Allows annotation creation |
| `arender.server.annotations.text.html.support` | `true` | Allows HTML in text annotations |
| `arender.server.annotations.text.reply.support` | `true` | Allows replies to annotations |
| `arender.server.annotations.text.status.support` | `true` | Allows status on annotations |
| `arender.server.annotations.text.security.support` | `false` | Allows security settings on annotations |
| `arender.server.annotations.text.comment.reply.support` | `true` | Allows replies to comments |
| `arender.server.annotations.default.redact.reasons` | _(empty)_ | Default redact reasons (comma-separated). Must match `availableRedactReasons` list |
| `arender.server.process.annotations.rendition` | `false` | Burns annotations during rendition (required for redact/watermark in images) |
| `arender.server.annotations.xfdf.localstorage.default.path` | `~/ARenderAnnotations/` | Local XFDF storage path for URL-accessed documents |
| `arender.server.migrate.legacy.annotations` | `false` | Migrates legacy annotations to current format |

---

### Display name provider

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.displayName.provider` | _(empty)_ | Bean ID of the display name provider for user names in the viewer |

---

### Watermark

| Property | Default | Description |
|----------|---------|-------------|
| `arender.watermark.activate.on.startup` | `false` | Activates watermarking for all viewed and downloaded documents |
| `arender.watermark.bean.name` | `customWatermark` | Bean name of the watermark to apply |
| `arender.server.watermark.display.provider` | `defaultParameterDisplayWatermarkProvider` | Watermark provider. Values: `defaultParameterDisplayWatermarkProvider` (URL query param), `activableDisplayWatermarkProvider` (property-based activation) |
| `arender.server.watermark.configuration.username.parameter` | `$USERNAME$` | Placeholder replaced by the current user name in watermark content |
| `arender.server.watermark.configuration.date.parameter` | `$TIMESTAMP$` | Placeholder replaced by the current date |
| `arender.server.watermark.configuration.date.format.pattern` | `yyyy/MM/dd HH:mm:ss` | Date format pattern for the watermark date |

---

### Document statistics

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.document.statistics.redis.enabled` | `false` | Pushes document loading time statistics to Redis |
| `arender.server.document.statistics.pushRequestType` | `REPLACE` | Push mode. Values: `REPLACE` (overwrite), `MERGE` (average with existing) |

---

### Performance logger

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.perf.logger.active` | `true` | Activates performance logging |
| `arender.server.perf.logger.use` | `true` | Enables writing the performance log file |
| `arender.server.perf.logger.username.cookie.keys` | `ltpatoken2` | Comma-separated cookie keys to look up for username matching |
| `arender.server.perf.logger.username.fetch` | `false` | Attempts to fetch the username from cookie keys |
| `arender.server.perf.logger.json.method.arguments` | `false` | Activates JSON printing of method arguments |
| `arender.server.perf.logger.useragent.fetch` | `false` | Attempts to fetch the user agent |
| `arender.server.perf.logger.document.id.params.fetch` | `true` | Reverts IDs and exposes docId parameters in performance logs |

#### Performance logger — Elasticsearch push

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.perf.es.use` | `false` | Enables pushing performance logs to Elasticsearch |
| `arender.server.perf.es.host` | `localhost` | Elasticsearch host |
| `arender.server.perf.es.port` | `9200` | Elasticsearch port |
| `arender.server.perf.es.protocol` | `http` | Elasticsearch protocol |
| `arender.server.perf.es.index.name` | `arender-performance` | Elasticsearch index name |
| `arender.server.perf.es.user.name` | _(empty)_ | Elasticsearch username |
| `arender.server.perf.es.user.password` | _(empty)_ | Elasticsearch password |

---

### Labels

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.external.custom.labels.path` | _(empty)_ | Path to external custom label files. Falls back to `<HOME_DIR>/ARenderCustomLabels/`, then `labels/`. Must end with a file separator |

---

### Metrics

#### Global metrics

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.metrics.tags.host` | `arender-hmi` | Host tag for metrics |
| `arender.server.metrics.tags.application` | `arender` | Application tag for metrics |
| `arender.server.metrics.process.enabled` | `false` | Enables process metrics |
| `arender.server.metrics.jvm.enabled` | `false` | Enables JVM metrics |
| `arender.server.metrics.system.enabled` | `false` | Enables system metrics |
| `arender.server.meter.registry.name` | `elastic` | Meter registry to use. Values: `prometheus`, `elastic`, `datadog`, `cloudwatch` |
| `arender.metric.meter.tool` | `COUNTER` | Metric tool for requests. Values: `TIMER`, `COUNTER` |

#### Prometheus export

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.export.prometheus.enabled` | `false` | Enables Prometheus export |
| `arender.server.export.prometheus.descriptions` | `false` | Includes descriptions in Prometheus metrics |
| `arender.server.export.prometheus.frequency.amount` | `5` | Export frequency amount |
| `arender.server.export.prometheus.frequency.unit` | `MINUTES` | Export frequency unit |

#### Elasticsearch export

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.export.elastic.enabled` | `false` | Enables Elasticsearch export |
| `arender.server.export.elastic.host` | `http://localhost:9200` | Elasticsearch host URL |
| `arender.server.export.elastic.index` | `arender-micrometer-metrics` | Index name |
| `arender.server.export.elastic.index-date-format` | `yyyy-MM` | Index date format suffix |
| `arender.server.export.elastic.timestamp-field-name` | `@timestamp` | Timestamp field name |
| `arender.server.export.elastic.auto-create-index` | `true` | Auto-creates the index if it does not exist |
| `arender.server.export.elastic.user-name` | _(empty)_ | Elasticsearch username |
| `arender.server.export.elastic.password` | _(empty)_ | Elasticsearch password |
| `arender.server.export.elastic.frequency.amount` | `5` | Export frequency amount |
| `arender.server.export.elastic.frequency.unit` | `MINUTES` | Export frequency unit |

#### Datadog export

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.export.datadog.enabled` | `false` | Enables Datadog export |
| `arender.server.export.datadog.api-key` | _(empty)_ | Datadog API key |
| `arender.server.export.datadog.application-key` | _(empty)_ | Datadog application key |
| `arender.server.export.datadog.descriptions` | `false` | Includes descriptions |
| `arender.server.export.datadog.host-tag` | `instance` | Host tag name |
| `arender.server.export.datadog.uri` | `https://app.datadoghq.com` | Datadog API URI |
| `arender.server.export.datadog.frequency.amount` | `5` | Export frequency amount |
| `arender.server.export.datadog.frequency.unit` | `MINUTES` | Export frequency unit |

#### CloudWatch export

| Property | Default | Description |
|----------|---------|-------------|
| `arender.server.export.cloudwatch.enabled` | `false` | Enables CloudWatch export |
| `arender.server.export.cloudwatch.namespace` | `arenderHMI` | CloudWatch namespace |
| `arender.server.export.cloudwatch.region` | `eu-west-1` | AWS region |
| `arender.server.export.cloudwatch.frequency.amount` | `5` | Export frequency amount |
| `arender.server.export.cloudwatch.frequency.unit` | `MINUTES` | Export frequency unit |

#### Endpoint metrics

| Property | Default | Description |
|----------|---------|-------------|
| `arender.endpoint.metrics.export.has.document.enabled` | `false` | Exports has-document endpoint metrics |
| `arender.endpoint.metrics.export.bookmarks.enabled` | `false` | Exports bookmarks endpoint metrics |
| `arender.endpoint.metrics.export.document.layout.enabled` | `false` | Exports document layout endpoint metrics |
| `arender.endpoint.metrics.export.document.metadata.enabled` | `false` | Exports document metadata endpoint metrics |
| `arender.endpoint.metrics.export.image.enabled` | `false` | Exports image endpoint metrics |
| `arender.endpoint.metrics.export.page.contents.enabled` | `false` | Exports page contents endpoint metrics |
| `arender.endpoint.metrics.export.search.enabled` | `false` | Exports search endpoint metrics |
| `arender.endpoint.metrics.export.advanced.search.enabled` | `false` | Exports advanced search endpoint metrics |
| `arender.endpoint.metrics.export.load.document.enabled` | `false` | Exports load document endpoint metrics |
| `arender.endpoint.metrics.export.evict.enabled` | `false` | Exports evict endpoint metrics |
| `arender.endpoint.metrics.export.alter.document.enabled` | `false` | Exports alter document endpoint metrics |
| `arender.endpoint.metrics.export.annotation.enabled` | `false` | Exports annotation endpoint metrics |
| `arender.endpoint.metrics.export.compare.enabled` | `false` | Exports compare endpoint metrics |
| `arender.endpoint.metrics.export.named.destination` | `false` | Exports named destination endpoint metrics |
| `arender.endpoint.metrics.export.get.file.chunk.enabled` | `false` | Exports file chunk endpoint metrics |
| `arender.endpoint.metrics.export.weather.enabled` | `false` | Exports weather endpoint metrics |
| `arender.endpoint.metrics.export.readiness.enabled` | `false` | Exports readiness endpoint metrics |
| `arender.endpoint.metrics.export.signature.enabled` | `false` | Exports signature endpoint metrics |
| `arender.endpoint.metrics.export.printable.pdf.enabled` | `false` | Exports printable PDF endpoint metrics |
| `arender.endpoint.metrics.export.opening.time.enabled` | `false` | Exports opening time endpoint metrics |
| `arender.endpoint.metrics.export.url.parsing.enabled` | `false` | Exports URL parsing endpoint metrics |
| `arender.endpoint.metrics.export.document.accessor.enabled` | `false` | Exports document accessor endpoint metrics |
| `arender.endpoint.metrics.export.document.size.enabled` | `false` | Exports document size endpoint metrics |
| `arender.endpoint.metrics.export.whitelist.tags` | `host,mimeType` | Whitelisted tags to export (comma-separated) |
| `arender.system.metrics.export.blacklist.tags` | _(empty)_ | Blacklisted tags from system meters (JVM, process, HTTP, Tomcat) |

---

## Related pages

- [JavaScript API reference](./javascript-api.md)
- [Document builder](../guides/features/document-builder.md)
- [Annotations](../concepts/annotations.md)
- [Docker Compose](../installation/docker-compose.md)
