---
title: Release Notes
sidebar_position: 3
description: "First release of the FlowerDocs MCP Server: 26 tools for administration, configuration components and technical documents, per-user authentication, and an independent release train."
date: "2026-07-21T09:00:00+02:00"
---

import FlowerDocsMcpDownload from '@site/src/components/FlowerDocsMcpDownload';

# FlowerDocs MCP Server Release Notes

## 2026.1.0-ft0

### 💡 Overview

The FlowerDocs MCP Server gives access to FlowerDocs configuration, creating tag, document, folder or task classes, adjusting a workflow, updating a GUI configuration directly through XML files, without going through the admin GUI or requiring custom development. An MCP-compatible AI assistant (Claude Desktop, Claude Code, or any other compatible client) acts as the interface for driving this configuration in natural language. This first version covers full administration (tag/document/folder/task classes, virtual folder classes, ACLs, scopes, workflows), technical documents (scripts, GUI configurations, operation handlers, CSS, routes), configuration components (profile tabs and other technical virtual folder / folder instances), and cache visibility.

This is its first release note. The server has its own release train, independent from FlowerDocs. It will move at its own pace, including between two FlowerDocs releases, so you can expect update notes here more frequently than for FlowerDocs itself.

For installation and configuration, see the [MCP Server documentation](../getting-started).

### 🔌 Compatibility

| | |
|---|---|
| Server version | 2026.1.0-ft0 |
| Compatible FlowerDocs versions | 2026.0.0 and later versions of the 2026 line |
| MCP protocol revision | 2025-11-25 (latest; earlier revisions down to 2024-11-05 negotiated for compatibility) |
| Transport | Streamable HTTP (`/mcp`) |
| Authentication | Per-user HTTP headers (encrypted passwords supported) |

### 🔒 Security

Every action runs under the permissions of the FlowerDocs user connected to the assistant. There is no shared service account. An assistant can therefore never do more than that user is already allowed to do in FlowerDocs.

### ✨ Features

#### ⚙️ Administration & configuration

An assistant can create and update tag classes, document classes, folder classes, task classes, virtual folder classes, ACLs, scopes and tag categories, following a discover-then-act pattern: it checks what a given entity type expects (`admin_describe`) before creating or modifying one, rather than guessing the structure. Task classes can also be chained into a real sequential process through a dedicated workflow entity type.

To avoid unpleasant surprises, the server guides the assistant to ask the right questions at creation time: description in French and English, versioning mode, tag categories and tag references to associate, rather than silently applying default values.

All tag types are supported, including CONDITIONAL types, whose proposed values adapt dynamically based on a parent tag.

Tools: `admin_list_types`, `admin_describe`, `admin_create`, `admin_get`, `admin_list`, `admin_update`, `admin_delete`, `list_field_types`, `add_allowed_values`, `add_tag_reference`

#### 📄 Technical documents

The server also manages the technical documents that shape how FlowerDocs looks and behaves: GUI configurations, scripts, operation handlers, CSS and routes, including reading and writing their full file content. This lets an assistant help author or adjust these building blocks directly, rather than editing them by hand.

Tool descriptions are deliberately minimal. To take configuration further we recommend pairing this server with the MCP Server documentation, which describes the expected structure for each type of technical document.

Tools: `technicaldoc_list_types`, `technicaldoc_describe`, `technicaldoc_search`, `technicaldoc_get`, `technicaldoc_get_content`, `technicaldoc_create`, `technicaldoc_update`, `technicaldoc_delete`

#### 🧩 Configuration components

Beyond the classes themselves, the server creates and manages instances of technical virtual folder and folder classes, for example the virtual folder that becomes a profile tab. It can create, read, search, update and delete these instances.

Tools: `configcomponent_create`, `configcomponent_get`, `configcomponent_search`, `configcomponent_update`, `configcomponent_delete`

#### 🗃️ Caches

Cache contents can be listed and purged directly, either for a specific target or entirely. Updating a GUI configuration, script or CSS file automatically purges the corresponding GUI-side caches, so the change appears in the interface without a manual admin purge.

Tools: `cache_list`, `cache_purge_for`, `cache_purge_all`

#### 🏗️ Infrastructure

At startup, the server checks that FlowerDocs Core is reachable and keeps retrying for a configurable window before giving up, so a slow Core start during a coordinated restart won't fail the MCP server outright. Its health endpoint reflects that connectivity, which makes it straightforward to plug into a monitoring or load-balancer check. Requests are validated against the documented schema, and unsupported fields are rejected with a clear error rather than being silently ignored.

### 🐛 Known issues

None known at this release.

<FlowerDocsMcpDownload version="2026.1.0-ft0" />
