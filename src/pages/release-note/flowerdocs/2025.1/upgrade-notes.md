---
title: Upgrade Notes 2025.1
description: Upgrade Notes 2025.1
---

# Customisation and configuration

## Obsolete / replaced configuration properties

- `opensearch.use.alias=false` to force the use of OpenSearch indexes rather than aliases is not appreciated and will be removed in the next major release.

## Added properties

### Login page

- It is now possible to hide the username/password login form so that you can only log in using SSO with the parameter `gui.signin.form.enabled=false`

### ARender 2023.8.1

- The new ARender version incorporates MixPanel, a tool that gives us a better understanding of how ARender is used by our users.
  More details [here](/documentation/config/gui/viewer/product-analytics)
- ARender info notifications are no longer displayed, but can be reactivated by following the [documentation](/documentation/config/gui/viewer/customize#toaster-management).

# Product

## Technical changes

- Improvements to FlowerDocs security have been made by upgrading versions of the libraries
- Serial processing data is cleaned when FlowerDocs is disconnected.

## Changes in behaviour

### Adding documents made easy

- Virtual folders now have a notion of `children` in order to support _Drag and drop_ of documents into them and to display the add document action.
- Adding documents is also made easier by activating _Drag and drop_ on the `+` action in the FlowerDocs main bar. Drag and drop is based on the configuration of the `componentCreationShortcuts` bean, so adding actions via the FlowerDocs JS API is not taken into account.

### Search

- The `&` character was interpreted in FlowerDocs GUI queries as a value separator. This is no longer the case; it has been replaced by the `§` character as it has less impact.

### Performances

- The `USER` tags have been improved to limit LDAP queries.
- Cache management has been improved in the Envelope webservices to enhance performance.

### Indexing / Full-text search

- ZIP documents and emails are now supported when extracting text
- Indexing and de-indexing a document requires the `UPDATE_CONTENT` right.
- When a document is opened, after a search using the `Content` criterion, ARender is opened by launching a search for the value of the criterion.
- The `"` character enclosing a value for the `Content` criterion is used to search strictly for values in its content.

### Login page

- The default values for the configuration of the login page have changed to reflect the needs of our users

## For integrators

- The CLM `update` command no longer requires the `scope.xml` file. In particular, this means that teams can be left untouched while the data model is updated.
- In order to be backward compatible with older data models (Alfresco), special characters are now managed for task attachment identifiers.
- The class `com.sun.jndi.ldap.LdapCtxFactory` has been added to the _whitelist_ used in the DroolsOperationHandler and ScriptOperationHander so that calls to LDAP-related services can be used correctly.
- The `categorySelector` property was previously implicitly mandatory. In order to guarantee the consistency and robustness of searches, this property, essential to the correct operation of forms, is now formally mandatory.
    - The absence of this parameter, which may have gone unnoticed on some older integrations, will now prevent the form from being displayed, with the following error in the console `com.flower.docs.gui.client.FlowerDocsEntryPoint SEVERE: Uncaught exception handled: java.lang.IllegalArgumentException: Only caches for valid categories are available. Not supported null`

## Exploitation

- The `/core/actuator/status` endpoint used to check the status of the FlowerDocs Core application no longer requires authentication.
- OpenSearch indexes are now queried using their aliases instead of their names, in order to facilitate operations. It is possible to revert to the previous behaviour by querying the indexes directly by adding the `opensearch.use.alias=false` property.

# API

## Changes in behaviour

- Deleting a user now deletes their associated data :
    - Favoris
    - Saved searches not shared
    - The username is deleted from searches that have been shared by name.
    - User preferences (buffers, dashlets, etc.)

## Adding methods

- Addition of REST endpoints for purging the GUI cache :
    - purging a scope cache : `DELETE /gui/rest/caches/\{cacheNames\}`
    - purge all covers : `DELETE /gui/rest/caches`
- Added REST endpoint for updating a document with content in a single call : `POST /core/rest/documents/\{id\}/unique`

# GEC Solution

The following configuration documents have been deleted :

- `sol-addDocumentFromFolder`

The following configuration documents have been added :

- `B_DirectionDestinataire`
- `B_ServiceDestinataire`
- `home-page`
- `redirectFromChart`

The following configuration documents have been modified :

- `gui-solution`
- `scope.xml`

# ENV Solution

The following configuration documents have been deleted :

- `sol-addDocumentFromFolder`

The following configuration documents have been added :

- `RouteSolutionWS`

The following configuration documents have been modified :

- `gui-solution`
- `env-common`
- `env-home`
- `env-virtual-folder-conf`
