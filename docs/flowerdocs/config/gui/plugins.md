---
title: Plugins
description: Integrate customized WEB applications within the GUI.
date: '2012-04-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 56e853c6a807c5753d8a27ab975fd81e80fc6c05e6a7c1ccffaae90a7a8b4ddc
---


# What is a GUI plugin? 

A plugin can be used to redirect an HTTP stream received by **FlowerDocs GUI** to another URL. To achieve this, **FlowerDocs GUI** includes a `reverse proxy` module based on Netflix's Zuul open source product. A plugin is exposed under the `/plugins/` path according to the routes defined.

A GUI plugin is configured using two types of information: 

* The path of the requests to be intercepted (`Path`)
* The URL to which intercepted requests are redirected (`URL`)

<br/>
To access a route defined by a plugin, the client must be authenticated to the GUI.


# Defining a plugin

A GUI plugin can be configured for a specific scope or for all the scopes of a FlowerDocs instance.

## Scope-specific plugin

A plugin can be configured through a `Route` class document with `Path` and `URL` tags.

The configuration of these plugins is described in the _Administration > Configuration > Plugins_ section of the administration console. 

By defining a plugin with the `/my-route/**` path  and the `https://flowerdocs.com/my-plugin` for scope `&lt;scope&gt;`, request is executed on `/plugins/&lt;scope&gt;/my-route/test` and redirected to `https://flowerdocs.com/my-plugin/test` URL.


## Global plugin

A global plugin can be accessed from any scope. It must be configured through the `gui.properties` property file.
To define a new global plugin, it is necessary to define the corresponding route as: 

```properties
zuul.routes.<plugin-id>.path=<plugin path>
zuul.routes.<plugin-id>.url=<external plugin URL>
```

<br/>

**Example:** Defining a plugin named *myplugin*

```properties
zuul.routes.myplugin.path=/plugins/sample/**
zuul.routes.myplugin.url=http://localhost:3006/sample
```
With this example, requests issued on `&lt;gui&gt;/plugins/sample` are redirected to `http://localhost:3006/sample`.

<br/>


*The timeout on plugins can be configured using the `zuul.host.connect-timeout-millis` and `zuul.host.socket-timeout-millis` properties.*
# Default plugins

By default, several plugins are added to consume FlowerDocs resources. They are listed in the table below.

| Path | Target URL | Description |
|--------|-----------|-------------|
|`/plugins/plume`|`${gui.client.plume.url}`|Redirects to plume|
|`/plugins/rest`|`${core}/rest`|Redirects to REST services exposed by **FlowerDocs Core**|
|`/plugins/external`|`${core}/external`|Redirects to plugins exposed by **FlowerDocs Core**|

# Security

To access a plugin via **FlowerDocs GUI**, the client making the request must be authenticated (via the `SESSION`cookie). This authentication is transmitted to the plugin in the form of an HTTP header `token` whose value is the token of the user making the request.

With the Spring MVC framework, this token can be retrieved by adding the following parameter to the input method: `@RequestHeader("token") String token`.
