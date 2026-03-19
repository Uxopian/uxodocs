---
title: REST annotation storage
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/annotations/annotation-storage-rest
sidebar_position: 3
content_hash: 2e6b8ca6a3451cbefe9c310574ca7f0c5d07a84ab00ab6abc37d99e6eb77e087
---

# REST annotation storage

The REST annotation connector delegates all annotation operations to an external HTTP service. ARender acts as a client: it calls the remote service for every read, create, update, and delete operation, and the external service is responsible for persisting the data. This allows annotations to be managed by your own backend without coupling it to ARender's internal storage model.

## When to use this guide

Use this guide when you need to integrate ARender annotations into an existing backend system, when you want to apply custom business logic (access control, audit logging, workflow triggers) during annotation operations, or when you are deploying ARender in a multi-instance setup and want a single authoritative annotation store that is not a relational database.

For simpler deployments with no existing backend, [XFDF file storage](./annotation-storage-xfdf.md) or [JDBC storage](./annotation-storage-jdbc.md) require less infrastructure.

## How it works

The `RestAnnotationAccessor` bean implements the `AnnotationAccessor` interface and translates each annotation operation into an HTTP call to a configurable base URL. All annotation data is serialized as JSON using Jackson. The document identifier is appended to every request as the `uuid` query parameter.

```
ARender UI ──► RestAnnotationAccessor ──► HTTP ──► Your annotation service
```

ARender does not interpret the annotation data at the HTTP layer; it sends and receives the same `AnnotationList` JSON structure for all operations.

## REST API contract

Your annotation service must implement the following four endpoints. The base path shown below is the one configured in `annotationServiceURI` (for example, `http://annotation-service:7777/annotation/`).

| Method | Path | Query parameter | Request body | Response body | Description |
|--------|------|-----------------|--------------|---------------|-------------|
| `GET` | `{base}` | `uuid=<documentId>` | — | `AnnotationList` JSON | Return all annotations for the document |
| `PUT` | `{base}` | `uuid=<documentId>` | `AnnotationList` JSON | — | Create (add) annotations |
| `POST` | `{base}` | `uuid=<documentId>` | `AnnotationList` JSON | — | Update (replace) annotations |
| `PUT` | `{base}/delete` | `uuid=<documentId>` | `AnnotationList` JSON | — | Delete the listed annotations |

The `uuid` value is the ARender document identifier string, URL-encoded when it contains special characters.

### AnnotationList JSON structure

All request and response bodies use the same wrapper object:

```json
{
  "annotations": [
    {
      "@class": "com.arondor.viewer.annotation.api.SquareAnnotation",
      "id": "annot-1",
      "name": "annot-1",
      "page": 0,
      "rect": { "x1": 100, "y1": 200, "x2": 300, "y2": 400 },
      "color": "#ff0000",
      "title": "alice",
      "date": "D:20240315120000"
    }
  ]
}
```

The `@class` field carries the fully qualified Java class name of each annotation type and is required for correct deserialization on the ARender side. Your service must preserve and return this field verbatim.

:::note
ARender sends the `uuid` query parameter URL-encoded when the document identifier contains slashes or other reserved characters. Your service must decode it before using it as a storage key. The `RestAnnotationAccessor` uses Spring's `UriComponentsBuilder` to build the URL, so the encoding follows RFC 3986.
:::

## Reference annotation service

ARender ships a ready-made standalone Spring Boot service (`rest-document-server`) that implements the four endpoints above. It stores annotations as JSON files on the local filesystem under `./ARenderAnnotations/`. This service is suitable for development and for deployments where you want REST-based storage without writing your own backend.

The reference service listens on port `7777` by default. You can run it as a standalone JAR:

```bash
java -jar arondor-arender-rest-document-server.jar
```

To change the port, set `server.port` in its `application.properties`.

## Configuration

### Spring Boot (Docker or standalone)

Set the following properties in `application.properties` or as environment variables on the UI container:

```properties title="application.properties"
# Base URL of the annotation service (trailing slash required)
annotation.rest.backend.uri=http://annotation-service:7777/annotation/

# Point the annotation accessor at the REST connector bean
arender.server.wrapper.source.annotation.accessor=saasAnnotationAccessor
```

Environment variable equivalents:

```
ARENDERSRV_ANNOTATION_REST_BACKEND_URI=http://annotation-service:7777/annotation/
ARENDERSRV_ARENDER_SERVER_WRAPPER_SOURCE_ANNOTATION_ACCESSOR=saasAnnotationAccessor
```

The `saasAnnotationAccessor` bean is provided by the REST annotation connector JAR. It must be present on the classpath (see [Prerequisites](#prerequisites)).

### Spring XML (legacy WAR deployment)

Declare a `RestAnnotationAccessor` bean in `arender-editor-specific-integration.xml`:

```xml title="arender-editor-specific-integration.xml"
<bean id="myRestAnnotationAccessor"
      class="com.arondor.arender.annotation.rest.RestAnnotationAccessor"
      scope="prototype">
    <property name="annotationServiceURI" value="${annotation.rest.backend.uri}"/>
    <property name="annotationCreationPolicy" ref="annotationCreationPolicy"/>
</bean>
```

Then point the wrapper accessor at it in `arender-server-custom.properties`:

```properties title="arender-server-custom.properties"
annotation.rest.backend.uri=http://annotation-service:7777/annotation/
arender.server.wrapper.source.annotation.accessor=myRestAnnotationAccessor
```

## Prerequisites

- ARender UI deployed and able to reach the service broker
- A running annotation service that implements the [REST API contract](#rest-api-contract)
- The `rest-annotations` connector JAR included in your UI package. The `saas-hmi-war` package bundles this JAR. For other packages, add the JAR to the classpath manually.

## Configuration properties reference

| Property | Description | Example |
|----------|-------------|---------|
| `annotation.rest.backend.uri` | Base URL of the external annotation service. Must end with a trailing slash. | `http://annotation-service:7777/annotation/` |
| `arender.server.wrapper.source.annotation.accessor` | Spring bean name of the annotation accessor to use | `saasAnnotationAccessor` |
| `arender.server.annotations.can.create` | Whether users can create new annotations | `true` |
| `arender.server.annotations.text.html.support` | Whether text annotations allow HTML content styling | `true` |
| `arender.server.annotations.text.reply.support` | Whether users can reply to text annotations | `true` |
| `arender.server.annotations.text.status.support` | Whether text annotations support status tracking | `true` |
| `arender.server.annotations.text.comment.reply.support` | Whether comment threads support replies | `true` |
| `arender.server.annotations.text.security.support` | Whether annotations can have security classification levels | `false` |

## Docker Compose example

```yaml title="docker-compose.yml"
services:
  arender-ui:
    image: arender-ui:2026.0.0
    environment:
      ARENDERSRV_ANNOTATION_REST_BACKEND_URI: http://annotation-service:7777/annotation/
      ARENDERSRV_ARENDER_SERVER_WRAPPER_SOURCE_ANNOTATION_ACCESSOR: saasAnnotationAccessor

  annotation-service:
    image: arender-rest-document-server:2026.0.0
    ports:
      - "7777:7777"
    volumes:
      - annotations-data:/app/ARenderAnnotations/

volumes:
  annotations-data:
```

## Troubleshooting

**HTTP connection refused at startup**: confirm that the annotation service is reachable from the UI container. Check `annotation.rest.backend.uri` for typos, and verify that the service is listening on the expected port.

**Annotations do not load**: enable debug logging on `com.arondor.arender.annotation.rest` to trace the exact URL and response body. Verify that your service returns a valid `AnnotationList` JSON body (not an empty body) for documents that have no annotations. It should return `{"annotations":[]}`.

**Annotations are created but then lost**: the `PUT` (create) endpoint receives the incremental list of new annotations, not the full annotation set. Your service must merge incoming annotations with existing ones, not overwrite the entire set.

**`@class` field missing after round-trip**: your service must preserve the `@class` field on each annotation object. If your service strips unknown fields during deserialization, configure it to retain them.

## Related pages

- [Annotations concept](../../concepts/annotations.md)
- [XFDF file annotation storage](./annotation-storage-xfdf.md)
- [JDBC annotation storage](./annotation-storage-jdbc.md)
- [Redaction guide](../features/redaction.md)
