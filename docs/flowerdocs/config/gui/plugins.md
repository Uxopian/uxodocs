---
title: Plugins
sidebar_position: 14
description: Integrate customized WEB applications within the GUI.
date: "2012-04-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 906b422d2728f0960ca94c4d30ac894e25bf543d00dbdc82b9140b6148b4d3ca
---

## What is a GUI plugin?

A plugin can be used to redirect an HTTP stream received by FlowerDocs GUI to another URL. To achieve this, FlowerDocs GUI includes a `reverse proxy` module based on Spring Cloud Gateway. A plugin is exposed under the `/plugins/` path according to the routes defined.

A GUI plugin is configured using two types of information:

- The path of the requests to be intercepted (`Path`)
- The URL to which intercepted requests are redirected (`URL`)

<br/>
To access a route defined by a plugin, the client must be authenticated to the GUI.

## Defining a plugin

A GUI plugin can be configured for a specific scope or for all the scopes of a FlowerDocs instance.

### Scope-specific plugin

A plugin can be configured through a `Route` class document with `Path` and `URL` tags.

The configuration of these plugins is described in the _Administration > Configuration > Plugins_ section of the administration console.

By defining a plugin with the `/my-route/**` path and the `https://flowerdocs.com/my-plugin` for scope `<scope>`, request is executed on `/plugins/<scope>/my-route/test` and redirected to `https://flowerdocs.com/my-plugin/test` URL.

### Timeouts

The timeout on plugin calls is configured in the `gui.properties` file (values in milliseconds):

```properties
spring.cloud.gateway.httpclient.connect-timeout=60000
spring.cloud.gateway.httpclient.response-timeout=120000
```

## Default plugins

By default, several plugins are added to consume FlowerDocs resources. They are listed in the table below.

| Path                | Target URL                | Description                                               |
| ------------------- | ------------------------- | --------------------------------------------------------- |
| `/plugins/plume`    | `${gui.client.plume.url}` | Redirects to plume                                        |
| `/plugins/rest`     | `${core}/rest`            | Redirects to REST services exposed by FlowerDocs Core |
| `/plugins/arender`  | `${gui.client.arender.url}` | Redirects to ARender HMI                                |

## Security

To access a plugin via FlowerDocs GUI, the client making the request must be authenticated (via the `SESSION`cookie). This authentication is transmitted to the plugin in the form of an HTTP header `token` whose value is the token of the user making the request.
