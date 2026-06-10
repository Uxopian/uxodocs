---
title: Upgrade Notes 2025.0
description: Upgrade Notes 2025.0
---

# Upgrade notes 2025.0

# Version upgrade

## From a version greater than or equal to 2.7

No data migration is required.
The FlowerDocs architecture has been simplified by removing some components: Camunda, FlowerDocs Management and OpenSearch Dashboards.
In line with the integration recommendations for ARender, the ARender HMI application is no longer embedded in the FlowerDocs GUI and can be isolated on a dedicated server.

The FlowerDocs \- ARender connector is deployed outside the application, making it easier to update corrective versions.

## From a version prior to 2.6

You will need to upgrade to version 2.7 before upgrading to 2025.0. Previous versions are based on an Elasticsearch 5.2 engine and require data to be migrated to the new OpenSearch engine.
Documentation to follow : [here](/docs/flowerdocs/install/opensearch/os-migrate)

# Architecture

## Removed components

- Camunda
- OpenSearch Dashboards
- FlowerDocs Management
- Mail Editor

## Modified components

- OpenSearch : Upgrade from 1.3.4 to 1.3.19
- ARender : Upgrade from 4.8.x to 2023.4.0
- Java : FlowerDocs Core and GUI must be launched with JDK 11\. JDK version 1.8 is no longer supported.
- FlowerDocs Starter Client : Spring Boot version upgrade from 2.5.14 to 2.7.18
- Plume : Upgrade from 2.0.2 to 2.0.3

## Added components

- The ARender graphical interface is now an application in its own right and is no longer embedded in the FlowerDocs GUI. This additional component must be installed by following the documentation [here](/documentation/install/install-process#arender-hmi)

\{\{% warn %\}\}
Please note that Hazelcast in ARenderHMI with FlowerDocs is not functional and should not be activated.
\{\{% /warn %\}\}

# Customisation and configuration

## Configuration

### Configuration properties to be removed

- The `gui.register.enabled` property has been removed
- The `spring.datasource.url` property has been removed
- The `text.extractor.max.size` property has been removed following the change of text extraction engine
- The `showNodeContent` setting for virtual folders no longer exists. If this property is referenced in your `GUIConfiguration` documents, it should be removed.
- The settings for the `FloatingButtonPresenter` shortcut button and the associated JavaScript API no longer exist. If this type of button is referenced in your `GUIConfiguration` documents, it must be deleted. The existing shortcuts must be added to the `+` button in the FlowerDocs menu bar as in the documentation. [here](/documentation/config/gui/menu/raccourcis/#creation-shortcuts)
- The ARender display configuration properties have been modified following the separation of display calls between documents and versions.
    - The `gui.client.arender.params.doc` property used to define the parameter to be used for document viewing is removed in favour of the new `gui.client.arender.params.current` property. Its default value is `currentId`.
    - The `gui.client.arender.params.version` property is used to view a version via the version tab opened from the history. Its default value is `versionId`.
    - For integrators overloading the `arenderConfig` bean, delete this line: `<property name="documentIdParameter" value="$\{gui.client.arender.params.doc:docId\}" />` and add the following lines:

```
<property name="documentIdParameter" value="${gui.client.arender.params.current:currentId}" />
<property name="versionIdParameter" value="${gui.client.arender.params.version:versionId}" />
```

- The `file` tag in the `scope.xml` file must be deleted, as the Scope object no longer carries a file.
- It is no longer necessary to set the `management.metrics.export.datadog.enabled` property for the FlowerDocs Core application to start up.

### Obsolete / replaced configuration properties

- Following the change of architecture with ARender HMI, the property `arender.rendition.nodes` must no longer be filled in the file `gui.properties` but in `arender-custom-server.properties`.
- In documents of class `OperationHandlerRegistration` which correspond to `ScriptOperationHandler`, the value of the following `OperationHandler` tag is deprecated: `com.flower.docs.bpm.core.operation.ScriptOperationHandler`. The new value to use is `com.flower.docs.core.tsp.operation.script.ScriptOperationHandler`.
- The combination of `ADD_CONTENT` and `DELETE_CONTENT` permissions is deprecated in favour of `UPDATE_CONTENT`.
- The `READ_OBFUSCATION` permission is deprecated. Only the `OBFUSCATE` permission is used.
- The data model associated with Camunda should be deleted as it is no longer in use:
    - Document classes : `BPMNDiagram`, `CMMN`, `DMN`, `EmailServer`
    - Tag classes : `Protocol`, `Host`, `Port`

## Product

### Technical changes

- FontAwesome : Upgrade from 6.1.1 to 6.5.2
- Spring Boot : Upgrade from 2.5.14 to 2.7.18
- Spring : Version upgrade from 5.3.20 to 5.3.37

### Changes in behaviour

#### Redis

- Redis is now mandatory even for development environments.

#### Integration

- The Nashorn JavaScript engine is replaced by GraalJS
    - For the `ScriptOperationHandler` if the `equals` function has been used to compare Strings then the comparison must be replaced by `==`.
    - For `ScriptOperationHandler` functions, if the `Date.now()` function has been used, replace the call with `String.valueOf(new Date().getTime())`.

#### Performances

- The FlowerDocs cache is no longer purged automatically when configuration documents are updated
- Configuration objects (data model, `OperationHandler`, `Script` `GUIConfiguration`, `CSS`) are no longer stored in Redis. A key enabling cache synchronisation between several FlowerDocs applications is stored in Redis in order to improve performance.

#### ARender

- The properties for displaying annotations in ARender are the default. Font colours and sizes may differ from those in previous FlowerDocs versions.
- Modification actions are not displayed when a version is opened
- Rotation annotations are created with a new `acl-rotation` ACL, so that annotation rights are separated from page rotation rights.

### Delete

- The swagger call URL `/core/swagger-ui.html`, the new URL to use is: `/core/swagger-ui/index.html`.
- The `AddDisplayToSearchOperationHandler` OperationHandler

## API

### Changes in behaviour

- The modification and deletion services on a document return an `F01500` exception if the input identifier does not correspond to the current version.
- Text extraction for full-text indexing is now carried out via the ARender rendition, replacing the Apache Tika library.

### Added methods

- The `VersionDAO` interface has a new `getVersion` method. This method can be used to retrieve a specific version of a document
- Add the REST endpoint for retrieving document versions: `/core/rest/documents/\{documentId\}/versions/\{versionId\}`.
- Added REST endpoint for indexing and de-indexing manual content: `/core/rest/documents/\{id\}/files/\{file\}/content/index`.
- Added REST endpoint for renaming files: `/core/rest/documents/\{id\}/files/\{fileId\}/name`.

### Removed methods

- The `ReportingService` service no longer exists
    - The `ReportingService.report` method used to create facts should be replaced by `FactService.create`.
    - The `ReportingService.getFactByObjectId` method for retrieving facts should be replaced by `FactService.get`.
- The following `ScopeService` methods no longer exist: `getRules`, `setRules`, `getAll`.
- The `ScopeDAO.getAll` method no longer exists

### New depreciation

- FlowerDocs SOAP APIs are deprecated.

## Events

### Changes in behaviour

- The `registerForComponentChange` method is no longer called when a version is opened.

# Data

## Scripting requirements and API calls

- The scope must be updated with the `default-scope` scope provided in the `flower-template-2025.0.zip` deliverable in order to update the minimum data model for FlowerDocs to function correctly.
- Unused OpenSearch indexes must be deleted manually:
    - `\{scope\}-flower-docs-content`,
    - `\{scope\}-flower-docs-version`,
    - `\{scope\}-flower-docs-report`
    - `.kibana`

    An example of a call via cURL for the FD scope : `curl -XDELETE "http://localhost:9200/fd-flower-docs-content"`
