---
title: Migration from GWT
sidebar_position: 7
---

# Migration from GWT

This page maps GWT viewer concepts to their React UI equivalents. Use it as a reference when evaluating or planning a migration. Features marked "Not yet available" are on the React UI roadmap.

## Concept mapping

| GWT viewer | React UI | Notes |
|------------|----------|-------|
| Standalone application (`arender-ui-springboot`) | npm package embedded as Web Component | See [Getting started](./getting-started.md) |
| `<iframe>` embed | `<arender-element>` Web Component | See [Web Component](./web-component.md) |
| `window.arender.jsapi` | `window.ARender` / `element.ARender` | See [Web Component — JavaScript API](./web-component.md#javascript-api) |
| `.properties` files | HTML attributes, JavaScript API | See [Configuration](./configuration.md) |
| Connector JARs (bundled in viewer) | Provider microservices (separate containers) | See [Connector providers](./connector-providers.md) |
| Visual profiles | Not yet available | — |
| Plugins | Not yet available | — |
| XML bean configuration | Not applicable | React UI has no Spring context in the frontend |
| `ARender.html` customization | CSS variables | Light DOM, standard CSS applies |
| `arender-custom-js.js` | `window.ARender` API | — |
| `/arendergwt/` servlet endpoints | Broker REST API directly | No viewer-side servlet layer |
| Server-side annotation storage config | Same (backend is shared) | XFDF, JDBC, or REST storage |
| Rendition properties | Same (backend is shared) | Broker and rendition services are unchanged |

## What stays the same

The entire backend stack is shared between both viewers:

- **Service broker** — same image, same configuration
- **Document converter, renderer, text handler** — unchanged
- **Annotation storage** — XFDF files, JDBC, or REST, configured on the backend
- **Rendition properties** — all document processing settings
- **Licensing** — same license file

You do not need to change your backend deployment when switching viewers.

## What changes

- **Delivery model:** The GWT viewer is a standalone Spring Boot application; the React UI is an npm package embedded in your application
- **Embedding:** `<iframe>` pointing to the viewer URL becomes `<arender-element>` in the host page DOM
- **JavaScript API:** `arender.jsapi.*` namespace becomes `window.ARender.*` (2 methods: `openDocument`, `openDocumentByUrl`)
- **Configuration:** `.properties` files become HTML attributes and JavaScript calls
- **Connector model:** Java JARs in the viewer classpath become standalone provider microservices
- **Network:** The host application must proxy or allow cross-origin requests to the broker (see [CORS and reverse proxy](./configuration.md#cors-and-reverse-proxy))

## Migration checklist

1. Install the `arender-ui` npm package (or a framework wrapper) in your host application
2. Replace `<iframe>` embeds with `<arender-element>` Web Component
3. Set up a reverse proxy or CORS configuration for the broker API routes
4. Update JavaScript integrations to use the `window.ARender` / `element.ARender` API
5. If using repository connectors (Alfresco, FileNet), deploy the corresponding provider microservice and register it in the broker
6. Test core workflows: viewing, annotation, search, redaction
7. Verify features you depend on are available in the React UI (see [feature comparison](./index.md#feature-comparison))
