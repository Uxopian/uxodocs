---
title: Upgrade Notes 2025.2.0
description: Upgrade Notes 2025.2.0
---

# Customisation and configuration

## Obsolete / replaced configuration properties

- The recursive group resolution configuration is now hidden in the `LDAPConfiguration` document class as it is not functional. The only way to enable this functionality is to use the `user.groups.resolve-recursively` property in the `core.properties` file.

## Added properties

- Following the ARender 2023.12.0 version upgrade, there has been a change in the way the `application.properties` file is managed: some FlowerDocs properties can no longer be supplied in the connector. It is now necessary to add this file when installing the application. [ARender HMI](/flowerdocs/documentation/install/install-process#arender-hmi)

## Technical changes

- ARender version upgrade: 2023.12.0.
- A new library, `flower-docs-ws-rest-client`, has been integrated to facilitate interactions with FlowerDocs REST services. It is now possible to replace SOAP-based communication with REST communication for `OperationHook`, FlowerDocs plugins and any other integration that relies on `flower-docs-starter-client` by setting the `rest.client.enabled=true` property.
  SOAP services are currently deprecated. In the next major release, REST mode will be the only option available. We therefore strongly recommend that you migrate to using REST now.
- FlowerDocs now integrates the Spring framework libraries maintained by HeroDevs as part of their commercial library support programme in order to correct existing vulnerabilities in the Spring framework that are no longer supported by OpenSource.
- Improvements to the security of FlowerDocs have been made by upgrading library versions.

# API

## Changes in behaviour

- The Swagger page has been reorganised to make it more logical. Endpoints for internal use are no longer displayed.

## Adding methods

- Added REST endpoints for handling annotations. They allow the use of `Annotation` objects rather than using an `XFDF` object. :
    - for annotation retrieval if the HTTP header `accept` has the value `application/json` :  
      `GET /core/rest/documents/\{documentid\}/annotations`
    - for creating annotations if the HTTP header `contentType` has the value `application/json`.  
      POST /core/rest/documents/\{documentid\}/annotations`
    - for annotation updates if the HTTP header `contentType` has the value `application/json`.  
      POST /core/rest/documents/\{documentid\}/annotations/\{annotationsIds\}`
- Add REST endpoints for handling reservations by providing a list of component references in the request body
    - Retrieving reservations : `POST /core/rest/reservation`
    - Reserving components : `POST /core/rest/reservation/reserve`
    - Deleting a reservation : `POST /core/rest/reservation/release`
- Addition of REST endpoints for token generation. These are used to retrieve a `Token` object bearing the expiry date.
    - Generation : `PUT /core/rest/token/user`
    - Generation with a validity period : `POST /core/rest/token/user`

:::warning
For use via the FlowerDocs Java APIs, all the above methods are only implemented for REST services. Calling these methods with SOAP services will result in an exception being thrown.
:::

## New depreciation

- REST endpoints for annotation manipulation using an `XFDF` object are deprecated in favour of endpoints using the `Annotation` objects mentioned above.
    - for retrieving annotations if the HTTP header `accept` is absent or has the value `application/xml` :  
      `GET /core/rest/documents/\{documentid\}/annotations`
    - for creating annotations if the HTTP header `contentType` is absent or has the value `application/xml`  
      `POST /core/rest/documents/\{documentid\}/annotations`
    - for updating annotations if the HTTP header `contentType` is absent or has the value `application/xml`  
      `POST /core/rest/documents/\{documentid\}/annotations/\{annotationsIds\}`  

- REST endpoints for reservation manipulation using the category and component identifiers in the call path are deprecated in favour of the endpoints using component references in the request body mentioned above.
    - Retrieving reservations : `POST /core/rest/\{category\}/\{ids\}/reservation`
    - Reserving components : `POST /core/rest/\{category\}/\{ids\}/reservation/reserve`
    - Deleting a reservation : `POST /core/rest/\{category\}/\{ids\}/reservation/release`
- The REST endpoints for generating tokens returning a character string have been deprecated in favour of the endpoints returning a `Token` object containing the expiry date mentioned above.
    - Generation : `PUT /core/rest/token`
    - Generation avec une durée de validité : `POST /core/rest/token`

:::info
The documentation has been updated so that it does not contain any inappropriate calls to allow integration in line with FlowerDocs best practice.
:::
