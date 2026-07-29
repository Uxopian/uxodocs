---
title: Documentation MCP
sidebar_position: 3
date: "2026-07-29T21:30:00+02:00"
description: "Pair the FlowerDocs MCP server with the uxodocs documentation MCP so the assistant writes configurations that are actually correct."
---

# Pair the MCP server with the documentation

The FlowerDocs MCP server lets an assistant **act** on your instance: create a tag class, write a GUI configuration, deploy a script. It does not teach the assistant **how FlowerDocs is configured**.

That knowledge lives in this documentation. Expose it as a second, read-only MCP server, and the assistant uses both in the same conversation: it reads the page, then applies the configuration.

:::tip Recommended setup
Two MCP servers: **`flowerdocs`** (holds your credentials, performs the changes) and **`uxodocs`** (read-only, provides the knowledge).
:::

## Why it is a real gain

`technicaldoc_describe` returns a **field schema**, not a grammar. For a GUI configuration it says there is a `fileContent` field holding XML. It does not say which beans, which attributes, or which values FlowerDocs expects inside.

Without the documentation, the assistant fills that gap from memory. FlowerDocs configuration is a product-specific format that no model knows, so the result is plausible and wrong: invented bean names, an `ExecutionPhase` that does not exist, a script calling an API that was never shipped. The tool call succeeds, and the configuration does nothing.

With the documentation MCP, it reads the reference page instead of guessing, and a configuration rejected by Core leads to a correction rather than a blind retry.

## How it works

Asking *"create a search form for invoices with the InvoiceNumber and InvoiceDate fields"* triggers three steps:

1. `technicaldoc_describe("gui_configuration")` on **flowerdocs**: the assistant learns which fields the document takes.
2. A read of the search form reference on **uxodocs**: it learns the XML structure.
3. `technicaldoc_create(...)` on **flowerdocs**: the document is created with content that matches the reference, and the GUI cache is purged so the form appears immediately.

The same pattern applies to scripts, operation handlers, CSS, routes and templates.

## Set it up with GitMCP

[GitMCP](https://gitmcp.io) serves a public GitHub repository as a read-only MCP server. This documentation lives in the public [Uxopian/uxodocs](https://github.com/Uxopian/uxodocs) repository, so a single URL exposes it:

```
https://gitmcp.io/Uxopian/uxodocs
```

The **uxodocs** entry sits next to **flowerdocs** in the same client configuration file, which [Getting Started](./getting-started.md#connect-your-ai-client) shows in full for Claude Desktop, Claude Code and Cursor.

Nothing to install, no credentials to manage since the repository is public, and it always serves the current documentation.
