---
title: REST
sidebar_position: 4
description: To consume REST web services.
date: "2004-03-29T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 82d2250ec2143e52fe4d8f5b1a2b0860c9f06588a0bdf85950e8be1171ae3721
---

## Base URL

All REST endpoints are served under:

```
{host.core}/rest/
```

## Authentication

Every request must include a `token` header. Obtain a token by authenticating via:

```http
POST {host.core}/rest/authentication HTTP/1.1
Content-Type: application/json
```

See the [authentication example](./authenticate) for details.

## Common patterns

The REST API follows a consistent CRUD pattern across all resource types:

| Operation | HTTP method | URL pattern |
|-----------|-------------|-------------|
| Retrieve | `GET` | `/rest/{resource}/{ids}` |
| Create | `POST` | `/rest/{resource}` |
| Update | `POST` | `/rest/{resource}/{ids}` |
| Delete | `DELETE` | `/rest/{resource}/{ids}` |

Where `{ids}` is one or more identifiers separated by commas.

## Content type

All request and response bodies use `application/json`, except for file upload endpoints which use `multipart/form-data`.

## Batch operations

Most endpoints accept arrays, allowing you to create, update, or delete multiple items in a single request.

## Important note on updates

:::warning
REST updates operate on a **cancel and replace** basis: unset fields will be cleared. You must send the entire object, not just the fields to modify. It is recommended to first retrieve the resource, make changes, and then call the update endpoint.
:::

## Swagger documentation

Documentation for this API is provided through _Swagger_ exhibited by **FlowerDocs Core** under the path `{host.core}/swagger-ui/index.html`.
You can also find the _Swagger_ in our online demo environment [here](https://www.demo.flowerdocs.cloud/flower-docs-ws/swagger-ui/index.html).

