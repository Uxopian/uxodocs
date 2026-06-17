---
title: Upgrade Notes 2026.0.0
description: Upgrade Notes 2026.0.0
---

# Upgrade notes 2026.0.0

# Version upgrade

## Upgrading from 2025.x.x

Direct upgrade is supported, you will need to follow the plan :

1. Apply needed modifications after reading this upgrade notes
2. Provision a fresh OpenSearch 3.6.0 cluster alongside the existing OpenSearch 1.x cluster (see [OpenSearch installation](/docs/flowerdocs/install/opensearch/install)).
3. Update core.properties and gui.properties (see [Core](/docs/flowerdocs/install/config/core-config) and [GUI](/docs/flowerdocs/install/config/gui-config) configuration)
4. Update systemd services if use them (see [Launch](/docs/flowerdocs/install/start))
5. Start all applications with their prerequisites

## Upgrading from versions 2.7.x and 2.8.x

Upgrades from versions 2.7 or 2.8 to 2026.0.0 must follow the follow plan:

1. Apply needed modifications after reading all upgrade notes between your version and the 2026.0.0
2. Provision a fresh OpenSearch 3.6.0 cluster alongside the existing OpenSearch 1.x cluster (see [OpenSearch installation](/docs/flowerdocs/install/opensearch/install)).
3. Update core.properties and gui.properties (see [Core](/docs/flowerdocs/install/config/core-config) and [GUI](/docs/flowerdocs/install/config/gui-config) configuration)
4. Update systemd services if use them (see [Launch](/docs/flowerdocs/install/start))
5. Start all applications with their prerequisites

# Prerequisite

See the [Prerequisites](/docs/flowerdocs/install/prerequisites) page for the full requirements.

| Component | 2025.x.x | 2026.0.0 |
| :---- | :---- | :---- |
| Java runtime | JDK 11 LTS | JDK 25 LTS |
| OpenSearch | 1.3.19 | 3.6.0 |
| Redis | 6.2.12 | 8.8 |
| ARender | 2023.x.x | 2026.0.1 |
| Plume | 2.0.3 | 2026.0.0 |
| Operating system locale | UTF-8 was enforced applicatively | UTF-8 (the application now fails to start if `file.encoding` is not UTF-8) |
| FlowerDocs Starter Client base | SpringBoot 2.7.18 | Spring Boot 4.0.6 |

# Architecture

## Removed components

* **SOAP web services :** The `/services` endpoint, all WSDL/XSD descriptors, `flower-docs-ws-api` and `flower-docs-ws-client` modules are removed. Any third-party integration consuming `/services/*.wsdl` must migrate to the [REST API](/docs/flowerdocs/apis/core/intro). This includes **Companion**. Existing versions of Companion does not work with 2026 versions. A new version based on REST API will be released soon.
* **Apache CXF** — the SOAP engine, removed together with the SOAP web services.
* **Zuul :** Replaced by [Spring Cloud Gateway](/docs/flowerdocs/config/gui/plugins), all `zuul.*` properties are no longer read.
* Spring Boot self-executable JAR layout : Spring Boot 4 does not support this feature anymore. The jar must be explicitly launched with `java -jar`. systemd examples in the [documentation](/docs/flowerdocs/install/start) have been updated to reflect this change.
* Deprecated **FlowerDocs.jsp** redirect has been removed.

## Modified components

* **OpenSearch** 1.x → 3.6.0 : a reindex of the data is **mandatory** (see [FlowerDocs 2026 upgrade](/docs/flowerdocs/install/opensearch/os-migrate)). Properties move to `opensearch.*` namespaces (see [Data](#data) and [Configuration](#configuration)).
* **ARender** 2023.x → 2026.0.1
* **Spring stack** — Spring Boot 2.7 → 4, Spring Framework 5.3 → 7, Spring Security 5.7 → 7, Spring Cloud → 5.
* **Jackson** 2 → 3 and **Servlet** `javax` → `jakarta` — both have an impact on Java integrations (see [API › Behaviour changes](#behaviour-changes-1)).
* **AWS SDK** v1 → v2
* **Redis** connection properties move to the `spring.data.redis.*` namespace (see [Configuration](#configuration)).

## Added components

* MixPanel library has been introduced into FlowerDocs GUI. It is enabled by default but can be disabled if needed.

## Deprecated components

* OperationHook has been renamed to RestOperationHandler for naming uniformity. FlowerDocs handle both for the moment. OperationHook will be removed on next major release. We recommend to migrate OperationHook to [RestOperationHandler](/docs/flowerdocs/config/core/operation/handlers/rest-operation-handler)

# Customisation and configuration

## Configuration {#configuration}

The full Core property reference is on the [Core configuration](/docs/flowerdocs/install/config/core-config) page.

### Configuration properties to remove

* All `zuul.*` properties
* JVM Param `-Xverify:none` — removed in JDK 25 and rejected at startup.
* JVM Param `-Dflower.docs.core.addon=classpath:flower-docs-services-drools.xml` — the standalone Drools services add-on file no longer exists

### Replaced configuration properties

| Removed | Replacement |
| :---- | :---- |
| `spring.redis.host` | `spring.data.redis.host` |
| `spring.redis.port` | `spring.data.redis.port` |
| `spring.redis.password` | `spring.data.redis.password` |
| `spring.session.redis.*` | `spring.session.data.redis.*` |
| `es.nodes` | `opensearch.uris` |
| `es.username` | `opensearch.username` |
| `es.password` | `opensearch.password` |
| `ws.url=…/core/services` | `ws.url=…/core/rest` |

*Some other properties may have changed due to the Spring major upgrade.*

## Product

### Technical changes

#### Security

* Improvements to FlowerDocs security have been made by upgrading library versions and internal behaviours. This proactive approach ensures better protection against vulnerabilities.

### Behaviour changes

#### Performance

* Cache management has been improved for user and groups to enhance performance and synchronization with LDAP.
* 2026.0.0 ships explicit pool and timeout settings tuned to better handle workload. Several **defaults changed** versus 2025. Adding timeout avoids hanging thread if resource is not available.

#### Functional

* Creating or updating a component with two tags of the same name is now rejected with the functional error `F00040` (previously the duplicate was silently removed).

#### Exploitation

* `FileEncodingForcer` — replaced by a UTF-8 verification at startup; the application fails fast if the JVM is not running in UTF-8.
* Security headers have been hardened (see [Security headers](/docs/flowerdocs/install/config/core-config#security-headers)). If you need customisation about them, feel free to ask the support team.
* **Production-ready Docker images** : the Docker images have been hardened to be more secure and more configurable.
* CLM CLI commands renamed (space-separated → hyphenated) to uniformize naming: `string encrypt` → `string-encrypt`, `string decrypt` → `string-decrypt`, `dir analyze` → `dir-analyze`, `dir encrypt` → `dir-encrypt`. The directory commands are documented in [directory encryption](/docs/flowerdocs/config/core/securite/files).

### Delete

* **Legacy Camunda `ScriptOperationHandler` class-name remap removed**. The 2025 transitional fallback that silently rewrote `com.flower.docs.bpm.core.operation.ScriptOperationHandler` to `com.flower.docs.core.tsp.operation.script.ScriptOperationHandler` is gone. Update any remaining `handler` tags or they will fail at handler resolution (see [Script handler](/docs/flowerdocs/config/core/operation/handlers/script)).
* Custom cookie serializer for handling SameSite cookie attribute has been deleted as SpringBoot now handles it correctly. You can remove `gui.custom.cookie.serializer.enabled` safely.

## API

### Behaviour changes {#behaviour-changes-1}

* FlowerDocs Starter Client now communicates using REST instead of SOAP with FlowerDocs Core.
* FlowerDocs Starter Client now uses a dedicated `FlowerDocsObjectMapper` instead of the one provided by SpringBoot. It allows us to provide our own Mixins to have a correct communication between all applications in the FlowerDocs ecosystem.
* Lenient date parsing : the JSON date deserializer tries the FlowerDocs format first (`yyyy-MM-dd HH:mm:ss.SSS Z`) and now falls back to ISO-8601 (`yyyy-MM-dd'T'HH:mm:ss.SSSXXX`). This fixes interop with systems that send ISO-8601 dates. Serialization is unchanged, output still FlowerDocs format.
* Jackson 3 (Spring Boot 4) has impacts on Java integrations.
* Jakarta namespace: Java integrations must migrate package imports from `javax.*` to `jakarta.*` (Servlet, JAXB, annotations). This is a Jakarta EE 10 / Spring Boot 4 change, not a FlowerDocs one.
* Swagger 2 → OpenAPI 3 migration with reorganization of endpoints. Response schemas are unchanged.
* REST clients now reject empty or null id lists to prevent trailing-slash 404 errors under Spring Boot. Integrations must filter out empty inputs before calling.
* `POST /rest/files/tmp` and `POST /rest/documents/{id}/files` now declare `consumes = multipart/form-data`. Sending `application/json` returns `415` (was previously accepted incorrectly).
* Spring Boot 4 is stricter about trailing slashes on direct REST calls. Operation-handler, GUI Plugins and other direct calls that previously tolerated a trailing `/` may now fail to match. Drop the trailing slash to make it work.
* **CSV export uses OpenSearch PIT**. Exports are no longer time-limited, handle > 10 000 documents, and the synchronous export option was removed (see [CSV export](/docs/flowerdocs/apis/core/examples/exportSearch)).
* Full text search now supports the `-` character.
* After using the rename endpoint, if the previous file had an extension, it will be restored on the new name.

### Additions

* `POST /core/rest/acl/reference` — added (FD-17803), see [Managing ACLs](/docs/flowerdocs/apis/core/examples/acl); it **replaces** the now-removed `GET /core/rest/acl/{category}/{id}` route.
* `POST /core/rest/reservation/reserve`, `POST /core/rest/reservation/release` and `POST /core/rest/reservation`, which replace the per-category endpoints for more flexibility (see [Reserve components](/docs/flowerdocs/apis/core/examples/reservation)).
* Annotation endpoints now support only JSON. Previously you could provide XML and JSON based on the `Content-Type` / `Accept` HTTP headers.

### Removals

#### Libraries

* `flower-docs-ws-client` and `flower-docs-ws-api`, used for SOAP only.
* `flower-docs-demo-center`, which was only used internally.

#### Endpoints

* All SOAP endpoints. Need to be replaced by their REST alternative.
* `PingRestController` (Java \+ endpoint), should use `/core/actuator/status`.
* Thumbnail endpoints for Task, Folder and VirtualFolder, an undocumented niche feature; only Document thumbnails remain.
* `PUT /core/rest/token` and `POST /core/rest/token`. Use the `/core/rest/token/user` variants instead, which provide the same behaviour.
* `GET /core/rest/acl/{category}/{id}`. Use `POST /core/rest/acl/reference` instead.
* The per-component reservation routes `POST /core/rest/{component}/{ids}/reservation/reserve`, `POST /core/rest/{component}/{ids}/reservation/release` and `GET /core/rest/{component}/{ids}/reservation`. Use the flat `POST /core/rest/reservation/reserve`, `POST /core/rest/reservation/release` and `POST /core/rest/reservation`.
* CSV export endpoints `?async=false` has been removed as we can now handle > 10,000 results, it does not make sense.
* The cross-category search endpoint exposed under the CSV Export has been removed (it should never have existed).

#### Methods

* `ComponentClassDAO.setActive(...)`, `ComponentClassDAO.getAllVersions(...)`

#### Miscellaneous

* Error code `T01789`
* `InternalFeatures.ES_TYPE`

# Data {#data}

## Required data migration

A reindex from OpenSearch 1.x to OpenSearch 3.6.0 is required because the internal engines are not compatible.

A dedicated migration tool ships with this version. See [FlowerDocs 2026 upgrade](/docs/flowerdocs/install/opensearch/os-migrate) for the full procedure.

## Additions

To prepare future evolutions about retention :

* Status `OUT_OF_RETENTION` has been added.
* ComponentData has now `operationalRetentionPeriod`, `legalRetentionPeriod` and `retentionType` attributes.
* New enum RetentionType : Automatic / Manual.

## Removals

* Properties that are no longer used, stored on domain objects coming from a previous FlowerDocs version, have been removed:
  * `Scope.organisationalUnit`
  * `Data.validityCode`
  * `ComponentClass.active`
  * `Workflow.style`
  * `Task.caseId`
  * `Task.processId`
  * `Task.files`

# FlowerDocs GEC

The configuration `gec-creationShortcuts.js` has been modified to drop the trailing slash in REST calls in accordance with Spring Boot 4 specifications which no longer tolerate trailing slashes for endpoints that do not end with one.

The following templates have been modified :

* `BodyTemplate.html`
* `ForInformationMailTemplateConfiguration.html`
* `AssignationMailTemplateConfiguration.html`.

Deployment documentation included in the client package has been updated with new installation prerequisites for this version.

# FlowerDocs e-Process

The following templates have been modified :

* `BodyTemplate.html`
* `EnvAssignationMailTemplate.html`

Two features have been deleted

* The task export. This induced removal of :
  * `env-ExportTask` OperationHandler
  * Properties from `flower-handlers.properties`
    * `export.answer.enable`
    * `export.scope.enable`
    * `export.file.path.enable`



* The external access. This induced removal  of :
  * `SOL_CompteExterne` tag
  * `EnvAccountCreation` process
  * `Associated ACL_ENV_Account` security
  * `ENV_MesEnveloppesExternes` virtual folder class

Deployment documentation included in the client package has been updated with new installation prerequisites for this version.

