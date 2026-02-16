---
title: Web-UI changes
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 174ecf234238861da9f3a0dad247c194cb6fa3b5f7e3a61754f0af19a41e6fde
---

## Properties

### Client properties changes (arender.properties)

#### Deleted properties

| Version 4                                               | Description                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| topPanel.logo                                           | Show the top panel logo                                                        |
| topPanel.logo.url                                       | Define the top panel logo URL                                                  |
| topPanel.logo.width                                     | The top panel logo width (in pixel)                                            |
| topPanel.logo.height                                    | The top panel logo height (in pixel)                                           |
| topPanel.logo.margin.left                               | The top panel logo margin left (in pixel)                                      |
| topPanel.section.file.annotation.buttons.beanNames      | The list of widgets to define (XML bean names) for the file/annotation section |
| topPanel.section.modification.buttons.beanNames         | The list of widgets to define (XML bean names) for the modification section    |
| topPanel.section.plugin.buttons.beanNames               | The list of widgets to define (XML bean names) for the plugins                 |
| topPanel.navigation.buttons.beanNames                   | The list of widgets to define (XML bean names) for the navigation section      |
| topPanel.zoom.buttons.beanNames                         | The list of widgets to define (XML bean names) for the zoom section            |
| topPanel.rotation.buttons.beanNames                     | The list of widgets to define (XML bean names) for the rotation section        |
| topPanel.imageProcessMenu.processBrightness             | Sets up slider to handle brightness                                            |
| topPanel.imageProcessMenu.processContrast               | Sets up slider to handle contrast                                              |
| topPanel.imageProcessMenu.maxBrightness                 | Sets up the max value of the brightness slider                                 |
| topPanel.imageProcessMenu.maxContrast                   | Sets up the max value of the contrast slider                                   |
| topPanel.imageProcessMenu.defaultBrightness             | Sets up the default value of the brightness slider                             |
| topPanel.imageProcessMenu.defaultContrast               | Sets up the default value of the contrast slider                               |
| advanced.searchexplorer.tooltipOnHover.enabled          | Enables tooltip on hover                                                       |
| advanced.searchexplorer.caseSensitive.tooltip.enabled   | Enables case sensitive tooltip                                                 |
| advanced.searchexplorer.accentSensitive.tooltip.enabled | Enables accent sensitive tooltip                                               |
| annotationexplorer.enabled                              | Enables the legacy annotation explorer                                         |
| annotation.richtext.edition.doubleClick.time            | Setup default double click time in milliseconds (ms)                           |
| filter.comment.showTabImage                             | Allows to filter the annotation in the comment explorer                        |
| filter.comment.showTabLabel                             | Shows a label instead of icons for filtering                                   |
| filter.comment.showSwitchFilter                         | Shows the switch filter for solved/unresolved requests                         |
| annotationExplorer.showStickyNoteReplies                | Legacy annotation explorer, show the sticky notes replies                      |
| annotationExplorer.showStickyNoteLabel                  | Legacy annotation explorer, show the sticky notes labels                       |
| annotationExplorer.adaptativeWidth.enabled              | Legacy annotation explorer, adapts the width of the panel accordingly          |

#### Renamed properties

| Version 4                               | Version 2023                                                                                | Description                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| topPanel.section.file.buttons.beanNames | topPanel.section.left.buttons.beanNames                                                     | The list of widgets to define (XML bean names) for the left section of the toppanel                               |
| topPanel.annotation.buttons.beanNames   | toolbar.annotation.buttons.beanNames                                                        | The list of widgets to define (XML bean names) for the annotation toolbar                                         |
| topPanel.obfuscate                      | redactexplorer.redact                                                                       | Activate the redact text annotation button ([documentation](/docs/arender/features/redact)                        |
| topPanel.obfuscateZone                  | redactexplorer.redactZone                                                                   | Activate the redact annotation zone button ([documentation](/docs/arender/features/redact)                        |
| toolbar.lockedObfuscate                 | toolbar.redact.locked                                                                       | All redact annotations will become locked once saved, and can no longer be edited                                 |
| annotation.canHideObfuscate             | annotation.can.hide.redact                                                                  | All redact annotations can be hidden using the regular hide annotations button                                    |
| topPanel.imageProcessMenu               | topPanel.imageProcessMenu.brightness.enabled and topPanel.imageProcessMenu.contrast.enabled | Activate the brightness slider / Activate the contrast slider ([documentation](/docs/arender/features/processing) |

### Server properties changes (arender-server-custom-vanilla.properties)

#### Deleted properties

| Version 4                        | Description             |
| -------------------------------- | ----------------------- |
| arender.rest.b64.encoding        | REST API configurations |
| arender.rest.serialization.model | REST API configurations |

#### Modified properties

| Version 4                                  | Changes                                                                                                                                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arender.server.default.annotation.accessor | Value changed from _xfdfAnnotationAccessor_ to _redactConverterAnnotationAccessor_ to facilitate conversion from V4 to V2023 redact annotation model. The _xfdfAnnotationAccessor_ value is now found at the _arender.server.wrapper.source.annotation.accessor_ property |

## Beans

### UI configurations (arender-hmi-configuration.xml)

#### Deleted beans

| Version 4 bean id      |
| ---------------------- |
| sorterCommentPresenter |
| annotationExplorer     |

#### Modified beans

| Version 4 bean id | Changes                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| shortcutManager   | This bean has no longer the shortcut value. To change the value, use the property according to the wanted shortcut. For example:shortCut.print.key |

### Events configurations (events-configuration.xml)

#### Renamed beans

| Version 4 bean id           | Changes                                             |
| --------------------------- | --------------------------------------------------- |
| obfuscateCreationAction     | It has been renamed to **redactCreationAction**     |
| obfuscateZoneCreationAction | It has been renamed to **redactZoneCreationAction** |

### Toppanel annotation configurations (toppanel-annotations-configuration.xml)

#### Modified beans

| Version 4 bean id                | Changes                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| addObfuscateAnnotationButton     | This bean has been replaced by **addRedactAnnotationButton**. It is in arender-hmi-configuration.xml     |
| addObfuscateZoneAnnotationButton | This bean has been replaced by **addRedactZoneAnnotationButton**. It is in arender-hmi-configuration.xml |

### Toppanel configurations (toppanel-configuration.xml)

#### Modified beans

| Version 4 bean id                                                                      | Changes                                                                                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| separatorHorizontal, separatorVertical, obfuscationSeparator, printSeparatorHorizontal | They have been deleted. rotationSeparatorVertical and annotationSeparatorVertical have been added. It is still possible to add your own seperators |
| fileAndAnnotationSection                                                               | It has been replaced by the bean **topPanelLeftSection**. The toppanel is now separate in three sections. This is the left section.                |

## Classes

### Modified classes

| Class V4                  | Class actuel        | ArtifactId of the dependency in V4 | ArtifactId of the current dependency |
| ------------------------- | ------------------- | ---------------------------------- | ------------------------------------ |
| DocumentServiceRestClient | RenditionRestClient | arondor-arender-client-javarmi     | arender-rendition-rest-client        |

### Deleted classes

| Class V4                       |
| ------------------------------ |
| DocumentAccessorHasContentSize |
