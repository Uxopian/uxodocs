---
title: Web components
sidebar_label: Web components
sidebar_position: 9
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: e518584a6b106f65728f53b667d0f9a98f50d6e631861c7126e06dfc4c99de6d
---

Uxopian AI ships standard HTML custom elements: `<chat-element>` and `<admin-element>`, plus the `quick-prompt-element` / `qp-toggle-button` pair introduced in 2026.0.0-ft4. They are built with React 19 and wrapped using `@r2wc/react-to-web-component`. They are self-contained and require no build step on the consuming application side.

## How the bundle is served

```mermaid
flowchart LR
    AI["uxopian-ai<br/>(Spring Boot)"]
    GW["uxopian-gateway"]
    Endpoints["/api/web-components/<br/>chat/script, chat/style<br/>admin/script, admin/style"]
    Browser["Browser / Host App"]

    AI -->|"Serves via WebComponentController"| Endpoints
    GW -->|"Forwards to uxopian-ai"| Endpoints
    Browser -->|"<script> + <link>"| Endpoints
```

*Figure: The browser loads web component bundles from the gateway, which forwards to the WebComponentController in uxopian-ai.*

The web component bundles are compiled and embedded in the `uxopian-ai` image. They are served by `WebComponentController` under `/api/web-components/`. The gateway forwards these paths as public (no authentication required for static assets).

The served endpoints are:

| Asset | Endpoint |
|---|---|
| Chat JavaScript | `/api/web-components/chat/script` |
| Chat CSS | `/api/web-components/chat/style` |
| Admin JavaScript | `/api/web-components/admin/script` |
| Admin CSS | `/api/web-components/admin/style` |
| Quick Prompt JavaScript | `/api/web-components/quick-prompt/script` |
| Quick Prompt CSS | `/api/web-components/quick-prompt/style` |

To load the chat component, add these tags to the host application:

```html
<link rel="stylesheet" href="https://your-gateway/api/web-components/chat/style" />
<script src="https://your-gateway/api/web-components/chat/script"></script>
```

## chat-element

The chat interface custom element. Registered as `<chat-element>`. Accepts these attributes:

| Attribute | Type | Description |
|---|---|---|
| `endpoint` | string | Base URL for the uxopian-ai REST API (e.g., `https://gateway-host/api/v1`) |
| `wsendpoint` | string | WebSocket base URL (e.g., `wss://gateway-host/ws`) |
| `conversationid` | string | Conversation ID to open (for `openChat`) |
| `request` | string | JSON-serialized `Request` object (for `createChat`) |
| `promptid` | string | Prompt ID to pre-load when creating a new conversation |

## admin-element

The admin interface custom element. Registered as `<admin-element>`. Uses React Router internally with these routes:

| Route | Content |
|---|---|
| `/` | Dashboard |
| `/prompts` | Prompt list |
| `/prompts/:id` | Prompt detail and editor |
| `/llm-providers` | LLM provider list |
| `/llm-providers/:id` | LLM provider configuration |
| `/users` | User list with conversation statistics |
| `/users/:id` | User detail |
| `/statistics` | Usage statistics and charts |

## quick-prompt-element

The context-aware [Quick Prompt](./quick_prompt.md) panel, registered as `quick-prompt-element`, with a companion `qp-toggle-button`. Introduced in 2026.0.0-ft4 and served from its own bundle (`/api/web-components/quick-prompt/script` + `/style`).

Unlike the chat and admin elements, Quick Prompt is driven through a JavaScript **integration handle** rather than HTML attributes. The bundle exposes:

| Global | Purpose |
|---|---|
| `window.createQuickPromptIntegration({ endpoint, target?, onClose? })` | Creates the panel and returns the integration handle (`setTenant`, `setUser`, `setRoutes`, `setDocument`, `setTask`, `setFolder`, `setInjected`, `setCallbacks`, `getContext`, `destroy`) |
| `window.createQuickPrompt({ endpoint, target?, onClose? })` | Lower-level helper that only mounts the element |
| `window.uxopian.mapComponent(obj, fields)` | Helper to remap a host object's fields onto the Quick Prompt context shape |

See [Embed Quick Prompt](../how_to/embed_quick_prompt.mdx) for the full integration workflow.

## Global window API

The chat bundle exposes these functions on the `window` object:

### `window.openChat(params)`

Reopens an existing conversation.

```javascript
window.openChat({
  endpoint: 'https://gateway/api/v1',
  wsEndpoint: 'wss://gateway/ws',
  conversationId: 'existing-conv-id'
});
```

### `window.createChat(params)`

Creates a new conversation, optionally with an initial request.

```javascript
window.createChat({
  endpoint: 'https://gateway/api/v1',
  wsEndpoint: 'wss://gateway/ws',
  promptId: 'arenderContext',         // optional: pre-load a prompt
  request: requestObject              // optional: send an initial request
});
```

### `window.connectWebSocket(wsEndpoint, userId)`

Opens a WebSocket connection to the streaming endpoint. Returns a cleanup function.

```javascript
const disconnect = window.connectWebSocket('wss://gateway/ws', 'user-123');
// later:
disconnect();
```

## Builder classes

Three fluent builder classes are exposed on `window` for constructing request payloads:

### `RequestBuilder`

```javascript
const request = new window.RequestBuilder()
  .addInput(inputObject)
  .build();
```

### `InputBuilder`

```javascript
const input = new window.InputBuilder()
  .role('USER')
  .addContent(contentObject)
  .build();
```

### `ContentBuilder`

```javascript
const content = new window.ContentBuilder()
  .type('prompt')
  .value('arenderContext')
  .payload({ documentId: 'doc-123' })
  .build();

const textContent = new window.ContentBuilder()
  .type('text')
  .value('Summarize this document.')
  .build();
```

Content types: `text`, `prompt`, `goal`, `image`.

## Related pages

- [Embed in a web application](../how_to/embed_in_web_application.md)
- [Quick Prompt](./quick_prompt.md)
- [Embed Quick Prompt](../how_to/embed_quick_prompt.mdx)
- [Admin panel overview](../admin/admin_panel_overview.md)
- [Conversations and requests](./conversations_and_requests.md)
- [Integrate with ARender](../how_to/integrate_with_arender.mdx)
