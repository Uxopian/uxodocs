---
title: Migrate configuration from 4.x to 4.7
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 44fe30daca7143cb44998ea729a7b78de522bdd3e432da57df910240ac26ee54
---

Version 4.7 brings a lot of visual modification that involves configuration changes in beans, but also properties in arender.properties as well as CSS. This page aims to show how to properly adapt the old configurations to the new one.

Since 4.7.2, the configurations made before 4.7 are retro-compatible. However, it is advisable to make the modifications to the new configuration standard.

## The Toppanel

### New organization of the Toppanel

The Toppanel is organized into several sections to organize the different buttons. Here are the different sections listed in their default order:

- File And annotation : Contains all buttons related to download, print and annotations
- File (Contained in the first section) : Contains all buttons related to download and print
- Annotation (Contained in the first section) : Contains all buttons related to annotations
- Modification : Contains rotations, brightness and contrasts buttons
- Navigation : Contains all buttons related to the document navigation
- Zoom : Contains all buttons related to the zoom.
- MultiView tools : Contains all buttons related to multiview
- Plugin : Contains all buttons for Plume and HTML plugins
- Right : Contains all buttons needed to be to the right like the ellipsis

![image](/img/arender/toppanel/toppanel-sections-description.png)

This organization can be modified as in previous versions. Here is a list of the different properties used to manipulate the arrangement of the different elements of the Toppanel:

- topPanel.widgets.beanNames
- topPanel.upload.buttons.beanNames
- topPanel.download.buttons.beanNames
- topPanel.section.file.buttons.beanNames
- topPanel.section.file.annotation.buttons.beanNames
- topPanel.section.modification.buttons.beanNames
- topPanel.ellipsis.buttons.beanNames
- topPanel.section.plugin.buttons.beanNames
- topPanel.search.buttons.beanNames
- topPanel.navigation.buttons.beanNames
- topPanel.zoom.buttons.beanNames
- topPanel.rotation.buttons.beanNames
- topPanel.annotation.buttons.beanNames
- topPanel.imageProcessing.buttons.vertical.beanNames
- topPanel.section.right.buttons.beanNames

#### Special cases

The _File and Annotation_ section is a section that will simply serve as a container for the _File_ and _Annotation_ sections in order to have them side by side.

The _Right_ section is the section which will always be the furthest to the right and which will contain the _Ellipsis_ button (Burger menu).

### Buttons, activable buttons and sub-menu items

#### The annotation buttons

The annotation buttons are located directly in the toppanel in the Annotation section. The _repeat_ mode can be activated with a double-click if the property associated with the annotation is activated.
It is still possible to have the _repeat_ mode on a button with a single click.

To have this behavior, you must replace the buttonHandler property. Annotations with a repeat function will have bean references for normal mode and repeat mode.

Here is an example of a _buttonHandler_ property that activates repeat mode when the button is clicked:

```cfg
<property name="buttonHandler">
	<ref bean="highlightCircleCreationRepeatableAction" />
</property>
```

Bean references for button actions can be found in the file named events-configuration.xml.

##### Example of a standard annotation button

```cfg
<bean id="addHighlightCircleAnnotationButton"
    class="com.arondor.viewer.client.toppanel.presenter.ActivableButtonPresenter">
    <constructor-arg value="addHighlightCircleAnnotationButton" />
    <property name="name" value="Circle" />
    <property name="supportDoubleClick" value="${topPanel.annotationMenu.circle.repeat}" />
    <property name="enabled" value="${topPanel.annotationMenu.circle}" />
    <property name="className" value="standardButton icon-add-circle toppanelButton" />
    <property name="buttonGroup" value="topPanel" />
    <property name="buttonTitle">
        <ref bean="labels#addCircleAnnotation" />
    </property>
    <property name="visibilityForTopPanel">
        <ref bean="topPanelVisibilityMode" />
    </property>
    <property name="doubleClickButtonHandler">
        <ref bean="highlightCircleCreationRepeatableAction" />
    </property>
    <property name="inactiveButtonHandler">
        <ref bean="quitAnnotationCreationAction" />
    </property>
    <property name="buttonHandler">
        <ref bean="highlightCircleCreationAction" />
    </property>
</bean>
```

##### Example of annotation button activating repeat mode with one-click

```cfg
 <bean id="addHighlightCircleAnnotationRepeatButton"
    class="com.arondor.viewer.client.toppanel.presenter.ActivableButtonPresenter">
    <constructor-arg value="addHighlightCircleAnnotationRepeatButton" />
    <property name="enabled" value="${topPanel.annotationMenu.circle.repeat}" />
    <property name="active" value="false" />
    <property name="className" value="standardButton icon-add-circle toppanelButton" />
    <property name="buttonGroup" value="topPanel" />
    <property name="buttonTitle">
        <ref bean="labels#addCircleAnnotation" />
    </property>
    <property name="visibilityForTopPanel">
        <ref bean="topPanelVisibilityMode" />
    </property>
    <property name="buttonHandler">
        <ref bean="highlightCircleCreationRepeatableAction" />
    </property>
</bean>
```

#### Activate a button with a keyboard shortcut

Buttons can have a keyboard shortcut to activate the action that is usually done on click. The different types of shortcut available are of the form:

- &#123;Specific key&#125; + &#123;Key&#125;
- &#123;Specific key&#125; + &#123;Specific key&#125; + &#123;Key&#125;
- &#123;Specific key&#125; + &#123;Specific key&#125; + &#123;Specific key&#125; + &#123;Key&#125;

Where &#123;Key&#125; corresponding to a alphabetic or numeric key on the keyboard and &#123;Specific key&#125; can be ALT, SHIFT, or CTRL.

For buttons (Using the ButtonPresenter class) and activable buttons (Using the ActivableButtonPresenter class), add the following property in the desired bean:

```cfg
<property name="shortcut">
    <bean
        class="com.arondor.viewer.client.documentcontent.shortcuts.KeyboardShortCut"
        scope="prototype">
        <property name="ctrl" value="true" />
        <property name="key" value="KEY_TO_USE" />
        <property name="enabled" value="IS_ENABLED" />
    </bean>
</property>
```

Property to add in the _shortcut_ bean to activate the CTRL key:

```cfg
<property name="ctrl" value="true" />
```

Property to add in the _shortcut_ bean to activate the SHIFT key:

```cfg
<property name="shift" value="true" />
```

Property to add in the _shortcut_ bean to activate the ALT key:

```cfg
<property name="alt" value="true" />
```

#### Conversion between button and sub-menu item:

The buttons found in the submenus and the buttons found in the toppanel now use different classes. This will also result in differences in the definition of the bean.

##### Example of button, activable button and sub-menu item

The following examples show a fully constructed bean for the three shapes mentioned. The action that is triggered by each is the printing of the document.

A button is a simple button that will return to the initial visual state after clicking on it. An activable button is a button that will stay at an active visual state on click and then will go back to the default visual state after clicking on it again.

###### Sub menu item

```cfg
<bean id="printButton"
    class="com.arondor.viewer.client.widgets.DropdownMenuItem">
    <constructor-arg value="printButton"/>
    <property name="enabled" value="#{ !${isMobile} and ${topPanel.print}}"/>
    <property name="className" value="standardButton icon-print toppanelButton" />
    <property name="buttonTitle">
        <ref bean="labels#printDocument" />
    </property>
    <property name="shortCut" value="CTRL + ${shortCut.print.key}" />
    <property name="buttonHandler">
        <bean
            class="com.arondor.viewer.client.toppanel.behavior.document.DocumentPrintHandler">
            <constructor-arg>
                <bean
                    class="com.arondor.viewer.client.events.print.ShowPrintDialogBoxEvent" />
            </constructor-arg>
        </bean>
    </property>
</bean>
```

###### Button

```cfg
<bean id="printButton"
    class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
    <constructor-arg value="printButton"/>
    <property name="enabled" value="#{ !${isMobile} and ${topPanel.print}}"/>
    <property name="className" value="standardButton icon-print toppanelButton" />
    <property name="buttonTitle">
        <ref bean="labels#printDocument" />
    </property>
    <property name="buttonHandler">
        <bean
            class="com.arondor.viewer.client.toppanel.behavior.document.DocumentPrintHandler">
            <constructor-arg>
                <bean
                    class="com.arondor.viewer.client.events.print.ShowPrintDialogBoxEvent" />
            </constructor-arg>
        </bean>
    </property>
</bean>
```

###### Activable button

```cfg
<bean id="printButton"
    class="com.arondor.viewer.client.widgets.ActivableButtonPresenter">
    <constructor-arg value="printButton"/>
    <property name="enabled" value="#{ !${isMobile} and ${topPanel.print}}"/>
    <property name="className" value="standardButton icon-print toppanelButton" />
    <property name="buttonTitle">
        <ref bean="labels#printDocument" />
    </property>
    <property name="buttonHandler">
        <bean
            class="com.arondor.viewer.client.toppanel.behavior.document.DocumentPrintHandler">
            <constructor-arg>
                <bean
                    class="com.arondor.viewer.client.events.print.ShowPrintDialogBoxEvent" />
            </constructor-arg>
        </bean>
    </property>
</bean>
```

We see that the beans are similar here. But activable buttons (Using the ActivableButtonPresenter class) can accept the following properties:

- name
- buttonGroup
- inactiveButtonHandler
- supportShortCut
- shortcut

For buttons (Using the ButtonPresenter class) only the following properties can be added:

- name
- supportShortCut
- shortcut

The previous properties cannot be used by submenu items (Using the DropdownMenuItem class).

#### Putting the research directly in the toppanel

The search button corresponds to the bean with the id _searchSection_. This bean must then be deleted from the list of beans to be instantiated.

Location of the use of the id:
![image](/img/arender/toppanel/toppanel-search-1.png)

```cfg
topPanel.section.right.buttons.beanNames=documentBuilderButton,fullscreenButton,searchSection,moreButton
```

Removing the id by redefining the property:
![image](/img/arender/toppanel/toppanel-search-3.png)

```cfg
topPanel.section.right.buttons.beanNames=documentBuilderButton,fullscreenButton,moreButton
```

Then, you will have to redefine a property with the bean id _searchBox_:
![image](/img/arender/toppanel/toppanel-search-2.png)

```cfg
topPanel.section.right.buttons.beanNames=searchBox,documentBuilderButton,fullscreenButton,moreButton
```

## Class name changes

If you are using 4.7.0 or 4.7.1, then some classes have changed package. Please replace them.

| Old Package name                                                      | New Package Name                                                 |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| com.arondor.viewer.client.toppanel.presenter.SliderPanelPresenter     | com.arondor.viewer.client.annotation.slider.SliderPanelPresenter |
| com.arondor.viewer.client.toppanel.presenter.ActivableButtonPresenter | com.arondor.viewer.client.widgets.ActivableButtonPresenter       |
| com.arondor.viewer.client.toppanel.presenter.DialogBoxPushButton      | com.arondor.viewer.client.widgets.DialogBoxPushButton            |
| com.arondor.viewer.client.toppanel.presenter.SimpleTopPanelSubMenu    | com.arondor.viewer.client.widgets.SimpleTopPanelSubMenu          |
| com.arondor.viewer.client.toppanel.presenter.TopPanelSubMenu          | com.arondor.viewer.client.widgets.TopPanelSubMenu                |

These class changes are only valid for 4.7.0 and 4.7.1. Since version 4.7.2, the old package names have been added again in order to have better retro-compatibility.

## Bean changes

The bean with the id _annotationMenu_ has changed class. The new class is _com.arondor.viewer.client.toppanel.presenter.SimpleButtonSetPresenter_.

The arrow head or tail selection buttons have been changed. Their class is now _com.arondor.viewer.client.widgets.DropdownMenuItem_

The _imageResource_ property can no longer be used in bean definitions.

## Bean deletion (4.7.0 and 4.7.1)

List of bean ids removed for version 4.7.0 and 4.7.1:

- documentMenu
- imageProcessingVerticalSubMenu
- addHighlightRectangleAnnotationRepeatButton
- addHighlightCircleAnnotationRepeatButton
- addArrowAnnotationRepeatButton
- addHighlightTextAnnotationRepeatButton
- addUnderlineTextAnnotationRepeatButton
- addStrikethroughTextAnnotationRepeatButton
- addPolygonAnnotationRepeatButton
- addPolylineAnnotationRepeatButton
- addFreehandAnnotationRepeatButton
- logo

These beans have been added in version 4.7.2 for better retro-compatibility. These beans are in the file _toppanel-configuration-legacy.xml_.

## CSS modifications

### Icon font

The toppanel icons have been changed. Icons are made with custom font.

### Added color variables

The background, icon and hover colors in the toppanel can be changed between light color and dark color with a property:

```cfg
preference.color.mode=DARK
```

The DARK value will be for the dark color by default, the LIGHT value will be for the light color and the CUSTOM value allows to use custom colors redefined in a css for the css class named _.custom-theme_ . By default, the CUSTOM value will match the colors defined for the DARK value.

#### DARK

#### LIGHT

These color variables are not functional for Internet Explorer.

### List of css modifications

#### Plume Plugin :

| Bean id        | Old CSS class | New CSS class                                                    |
| -------------- | ------------- | ---------------------------------------------------------------- |
| plumeMenu      | none          | standardButton icon-plugin-plume toppanelButton                  |
| plumeButton    | none          | standardButton icon-plugin-plume toppanelButton                  |
| replyButton    | none          | standardButton icon-reply toppanelButton                         |
| replyAllButton | none          | standardButton dropdown-MenuButton icon-open-file toppanelButton |
| forwardButton  | none          | standardButton icon-forward toppanelButton                       |

#### HTML Plugin :

| Bean id         | Old CSS class | New CSS class                                  |
| --------------- | ------------- | ---------------------------------------------- |
| htmlPluginMenu  | none          | standardButton icon-plugin-html toppanelButton |
| viewHtmlButton  | none          | standardButton icon-plugin-html toppanelButton |
| closeHtmlButton | none          | standardButton icon-close toppanelButton       |

#### Annotations :

| Bean id                               | Old CSS class                                | New CSS class                                          |
| ------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| annotationMenu                        | standardButton annotationManagerButton       | fullHeight annotationMenu                              |
| showAllAnnotationsButton              | standardButton hideAnnotationButton          | standardButton icon-hide toppanelButton                |
| showAllAnnotationsAndRotationsButton  | standardButton showAnnotationButton          | standardButton icon-hide toppanelButton                |
| addStickyNoteAnnotationButton         | standardButton addAnnotationButton           | standardButton icon-add-sticky toppanelButton          |
| addHighlightRectangleAnnotationButton | standardButton rectangleAnnotationButton     | standardButton icon-highlight-area toppanelButton      |
| addFreeTextAnnotationButton           | standardButton freetextAnnotationButton      | standardButton icon-add-free-text toppanelButton       |
| addHighlightTextAnnotationButton      | standardButton highlightAnnotationButton     | standardButton icon-highlight                          |
| addUnderlineTextAnnotationButton      | standardButton underlineAnnotationButton     | standardButton icon-underline                          |
| addStrikethroughTextAnnotationButton  | standardButton strikethroughAnnotationButton | standardButton icon-strikethrough                      |
| addHighlightCircleAnnotationButton    | standardButton circleAnnotationButton        | standardButton icon-add-circle toppanelButton          |
| addObfuscateAnnotationButton          | standardButton obfuscateButton               | standardButton icon-redact-text                        |
| addObfuscateZoneAnnotationButton      | standardButton obfuscateZoneButton           | standardButton icon-redact-area                        |
| addArrowAnnotationButton              | standardButton arrowAnnotationButton         | standardButton icon-add-arrow toppanelButton           |
| addPolygonAnnotationButton            | standardButton polygonAnnotationButton       | standardButton icon-add-polygon toppanelButton         |
| addPolylineAnnotationButton           | standardButton polylineAnnotationButton      | standardButton icon-add-multiline toppanelButton       |
| addFreehandAnnotationButton           | standardButton freehandAnnotationButton      | standardButton icon-add-hand-draw toppanelButton       |
| addStampAnnotationButton              | standardButton stampAnnotationButton         | standardButton icon-add-stamp toppanelButton           |
| saveDirtyAnnotations                  | standardButton saveAnnotationsButton         | standardButton icon-save toppanelButton                |
| refreshAnnotation                     | standardButton refreshAnnotationButton       | standardButton icon-refresh-annotations toppanelButton |
| changeLineHead                        | standardButton changeHeadStyleButton         | standardButton icon-head-solid-arrow                   |
| changeLineHeadSquare                  | standardButton squareStyleButton             | standardButton icon-head-square                        |
| changeLineHeadCircle                  | standardButton circleStyleButton             | standardButton icon-head-circle                        |
| changeLineHeadButt                    | standardButton buttStyleButton               | standardButton icon-head-line                          |
| changeLineHeadDiamond                 | standardButton diamondStyleButton            | standardButton icon-head-diamond                       |
| changeLineHeadOpenArrow               | standardButton openArrowStyleButton          | standardButton icon-head-outline-arrow                 |
| changeLineHeadROpenArrow              | standardButton rOpenArrowStyleButton         | standardButton icon-head-outline-arrow-invert          |
| changeLineHeadClosedArrow             | standardButton closedArrowStyleButton        | standardButton icon-head-solid-arrow                   |
| changeLineHeadRClosedArrow            | standardButton rClosedArrowStyleButton       | standardButton icon-head-solid-arrow-invert            |
| changeLineHeadNone                    | standardButton noneStyleButton               | standardButton icon-arrow-none                         |
| changeLineTail                        | standardButton changeTailStyleButton         | standardButton icon-tail-solid-arrow                   |
| changeLineTailSquare                  | standardButton squareStyleButton             | standardButton icon-tail-square                        |
| changeLineTailCircle                  | standardButton circleStyleButton             | standardButton icon-tail-circle                        |
| changeLineTailButt                    | standardButton buttStyleButton               | standardButton icon-tail-line                          |
| changeLineTailDiamond                 | standardButton diamondStyleButton            | standardButton icon-tail-diamond                       |
| changeLineTailOpenArrow               | standardButton openArrowStyleButton          | standardButton icon-tail-outline-arrow                 |
| changeLineTailROpenArrow              | standardButton rOpenArrowStyleButton         | standardButton icon-tail-outline-arrow-invert          |
| changeLineTailClosedArrow             | standardButton closedArrowStyleButton        | standardButton icon-tail-solid-arrow                   |
| changeLineTailRClosedArrow            | standardButton rClosedArrowStyleButton       | standardButton icon-tail-solid-arrow-invert            |
| changeLineTailNone                    | standardButton noneStyleButton               | standardButton icon-arrow-none                         |

| Bean id                              | Old property name | Old CSS class                       | New property name | New CSS class                                          |
| ------------------------------------ | ----------------- | ----------------------------------- | ----------------- | ------------------------------------------------------ |
| showAllAnnotationsButton             | inactiveClassName | standardButton hideAnnotationButton | activeClassName   | standardButton icon-show toppanelButton showAnnotation |
| showAllAnnotationsButton             | className         | standardButton showAnnotationButton | className         | standardButton icon-hide toppanelButton                |
| showAllAnnotationsAndRotationsButton | inactiveClassName | standardButton showAnnotationButton | activeClassName   | standardButton icon-show toppanelButton showAnnotation |
| showAllAnnotationsAndRotationsButton | className         | standardButton showAnnotationButton | className         | standardButton icon-show toppanelButton showAnnotation |

#### Contextual menu :

| Bean id                                 | Old CSS class                                        | New CSS class                                                  |
| --------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| stampAction                             | standardButton stampAnnotationContextualMenu         | standardButton icon-add-stamp contextualMenu                   |
| freetextAction                          | standardButton freetextAnnotationContextualMenu      | standardButton icon-add-free-text contextualMenu               |
| printAction                             | standardButton printContextualMenu                   | standardButton icon-print contextualMenu                       |
| printAllAction                          | standardButton printContextualMenu                   | standardButton icon-print contextualMenu                       |
| rotateLeftAction                        | standardButton turnLeftContextualMenu                | standardButton icon-turn-page-left contextualMenu              |
| rotateRightAction                       | standardButton turnRightContextualMenu               | standardButton icon-turn-page-right contextualMenu             |
| stickyNoteAction                        | standardButton addAnnotationContextualMenu           | standardButton icon-add-sticky contextualMenu                  |
| hyperlinkAction                         | standardButton hyperlinkAnnotationContextualMenu     | standardButton icon-hyperlinks contextualMenu                  |
| cropBoxImageAction                      | standardButton cropBoxImageContextualMenu            | standardButton cropBoxImageContextualMenu contextualMenu       |
| highlightTextAction                     | standardButton highlightAnnotationContextualMenu     | standardButton icon-highlight contextualMenu                   |
| deleteHighLightTextAction               | standardButton removeContextualMenu                  | standardButton icon-delete contextualMenu                      |
| strikeoutTextAction                     | standardButton strikethroughAnnotationContextualMenu | standardButton icon-strikethrough contextualMenu               |
| underlineTextAction                     | standardButton underlineAnnotationContextualMenu     | standardButton icon-underline contextualMenu                   |
| highlightAction                         | standardButton rectangleAnnotationContextualMenu     | standardButton icon-highlight-area contextualMenu              |
| highlightCircleAction                   | standardButton circleAnnotationContextualMenu        | standardButton icon-add-circle contextualMenu                  |
| arrowAction                             | standardButton arrowAnnotationContextualMenu         | standardButton icon-add-arrow contextualMenu                   |
| closeMultiViewAction                    | standardButton clearContextualMenu                   | standardButton icon-close contextualMenu                       |
| addPolygonAction                        | standardButton polygonAnnotationContextualMenu       | standardButton icon-add-polygon contextualMenu                 |
| addPolylineAction                       | standardButton polylineAnnotationContextualMenu      | standardButton icon-add-multiline contextualMenu               |
| addFreehandAction                       | standardButton freehandAnnotationContextualMenu      | standardButton icon-add-hand-draw contextualMenu               |
| anchorAnnotationAction                  | standardButton anchorAnnotationContextualMenu        | standardButton icon-anchor contextualMenu                      |
| copyAction                              | none                                                 | standardButton icon-copy contextualMenu                        |
| downloadContextualMenuAction            | pictreeButton saveDocumentButton                     | pictreeButton saveDocumentButton contextualMenu                |
| downloadAnnotationsContextualMenuAction | pictreeButton saveDocumentWithAnnotationsButton      | pictreeButton saveDocumentWithAnnotationsButton contextualMenu |
| createFirstContextualMenuAction         | pictreeButton saveDocumentCreateFirstButton          | pictreeButton saveDocumentCreateFirstButton contextualMenu     |
| updateFirstContextualMenuAction         | pictreeButton saveDocumentUpdateFirstButton          | pictreeButton saveDocumentUpdateFirstButton contextualMenu     |
| deleteDocumentContextualMenuAction      | pictreeButton deleteDocumentButton                   | pictreeButton deleteDocumentButton contextualMenu              |

#### Toppanel :

| Bean id                          | Old CSS class                                     | New CSS class                                              |
| -------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| documentBuilderButton            | standardButton selectiveCopyButton                | standardButton icon-docbuilder                             |
| firstPageButton                  | standardButton firstPageButton                    | standardButton icon-go-to-first-page noPadding             |
| previousPageButton               | standardButton prevButton                         | standardButton icon-go-to-previous-page noPadding          |
| nextPageButton                   | standardButton nextButton                         | standardButton icon-go-to-next-page noPadding              |
| lastPageButton                   | standardButton lastPageButton                     | standardButton icon-go-to-last-page noPadding              |
| previousDocumentButton           | standardButton prevButton                         | standardButton icon-go-to-previous-page noPadding          |
| nextDocumentButton               | standardButton nextButton                         | standardButton icon-go-to-next-page noPadding              |
| fullscreenButton                 | standardButton fullScreenButton                   | standardButton icon-full-screen toppanelButton             |
| printButton                      | standardButton printButton                        | standardButton icon-print toppanelButton                   |
| printAllButton                   | standardButton printButton                        | standardButton icon-print toppanelButton                   |
| uploadButton                     | standardButton fileUploadButton                   | standardButton icon-open-file toppanelButton               |
| uploadURLButton                  | standardButton urlUploadButton                    | standardButton icon-open-url toppanelButton                |
| uploadXFDFButton                 | standardButton xfdfUploadButton                   | standardButton icon-open-file toppanelButton               |
| downloadButton                   | standardButton downloadButton                     | standardButton icon-download toppanelButton                |
| downloadRootButton               | standardButton downloadRootButton                 | standardButton icon-export-zip toppanelButton              |
| downloadXFDFAnnotationsButton    | standardButton downloadXFDFAnnotationsButton      | standardButton icon-export-with-annotations toppanelButton |
| downloadAnnotationsCSVButton     | standardButton downloadAnnotationAsCSVButton      | standardButton icon-export-with-annotations toppanelButton |
| downloadPdfButton                | standardButton downloadPDFButton                  | standardButton icon-export-pdf toppanelButton              |
| downloadAllButton                | standardButton downloadAllButton                  | standardButton icon-export-pdf toppanelButton              |
| downloadAllSourcesButton         | standardButton downloadAllSourcesButton           | standardButton icon-export-zip toppanelButton              |
| downloadAnnotationsButton        | standardButton downloadAnnotationButton           | standardButton icon-export-with-annotations toppanelButton |
| downloadWithFDFAnnotationsButton | standardButton downloadWithFDFAnnotationButton    | standardButton icon-export-with-annotations toppanelButton |
| downloadFDFAnnotationsButton     | standardButton downloadFDFAnnotationButton        | standardButton icon-export-with-annotations toppanelButton |
| downloadWithCompareButton        | standardButton downloadCompareButton              | standardButton icon-download-comparison                    |
| rotateLeft                       | standardButton turnLeftButton                     | standardButton icon-turn-page-left toppanelButton          |
| rotateAllLeft                    | standardButton turnAllLeftButton                  | standardButton icon-turn-all-pages-left                    |
| rotateAllRight                   | standardButton turnAllRightButton                 | standardButton icon-turn-all-pages-right                   |
| rotateRight                      | standardButton turnRightButton                    | standardButton icon-turn-page-right toppanelButton         |
| rotateReset                      | standardButton resetRotationButton                | standardButton icon-reset-rotation                         |
| zoomFullWidth                    | standardButton zoomFullWidthButton                | standardButton icon-fit-to-width-size toppanelButton       |
| zoomFullHeight                   | standardButton zoomFullHeightButton               | standardButton icon-fit-to-height-size toppanelButton      |
| zoomFullPage                     | standardButton zoomFullPageButton                 | standardButton icon-fit-to-page toppanelButton             |
| zoomIn                           | standardButton zoomInButton                       | standardButton icon-minus                                  |
| zoomInZone                       | standardButton zoomInZoneButton                   | standardButton icon-zoom-in-area toppanelButton            |
| zoomInZoneGlass                  | standardButton zoomInZoneGlassButton              | standardButton icon-zoom-in-area-new-window toppanelButton |
| zoomOut                          | standardButton zoomOutButton                      | standardButton icon-plus                                   |
| cropBoxButton                    | standardButton cropBoxImage                       | standardButton icon-screenshot                             |
| previousButton                   | standardButton prevButton                         | standardButton icon-go-to-previous-page                    |
| synchronizeScrollButton          | standardButton synchronizeDocumentScrollingButton | standardButton icon-sync-scroll                            |
| nextButton                       | standardButton nextButton                         | standardButton icon-go-to-next-page                        |
| moreButton                       | standardButton showMoreButton                     | standardButton icon-ellipsis                               |
| menuButton                       | none e                                            | standardButton icon-list-view                              |

### List of CSS removed

- topPanelSubMenu:BEFORE
- topPanelActivableButton
- topPanelActivatedButton
