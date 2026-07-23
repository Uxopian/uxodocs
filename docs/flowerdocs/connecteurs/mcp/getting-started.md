---
title: Getting Started
sidebar_position: 1
date: "2026-07-21T09:00:00+02:00"
---

# FlowerDocs MCP Server

The FlowerDocs MCP server exposes FlowerDocs **administration and configuration management** as tools that an AI assistant can call, using the [Model Context Protocol](https://modelcontextprotocol.io). Connect any MCP-compatible assistant (Claude Desktop, Claude Code, Cursor, VS Code, and others) and drive FlowerDocs in natural language: create tag classes, edit GUI configurations, manage scripts and operation handlers, purge caches, and more.

It runs as a standalone service alongside your FlowerDocs Core and GUI, and speaks the Model Context Protocol over the Streamable HTTP transport.

:::info It is an administration tool
Every tool runs under real FlowerDocs user credentials, and the whole server is gated by a shared access key. It is meant for administrators and integrators. See [Authentication](../install#authentication). Do not expose it openly on the internet.
:::

## Prerequisites

- **Java 25**
- Running **FlowerDocs Core** and **FlowerDocs GUI** instances.
- **FlowerDocs user credentials**: the MCP always authenticates; there is no anonymous access.
- The **MCP access key** for your deployment (ask your administrator).

## Connect your AI client

Once the server is running (see [Installation](../install)), the MCP endpoint is available at `http://localhost:8086/flowerdocs-mcp/mcp`. Point your client at it and add the required headers.

### Claude Desktop

Edit `claude_desktop_config.json` (**Windows**: `%APPDATA%\Claude\`, **Mac**: `~/Library/Application Support/Claude/`):

```json
{
  "mcpServers": {
    "flowerdocs": {
      "command": "mcp-remote",
      "args": [
        "http://localhost:8086/flowerdocs-mcp/mcp",
        "--header", "X-FlowerDocs-Access-Key: ENC(yourEncryptedAccessKey)",
        "--header", "X-FlowerDocs-User: yourUsername",
        "--header", "X-FlowerDocs-Password: ENC(yourEncryptedPassword)",
        "--header", "X-FlowerDocs-Scope: FD"
      ]
    }
  }
}
```

`mcp-remote` bridges URL-based MCP servers for Claude Desktop; install it with `npm install -g mcp-remote`. Restart Claude Desktop; **flowerdocs** appears as a connected server.

### Claude Code

Add to `.mcp.json` in your project (or `~/.claude/.mcp.json`):

```json
{
  "mcpServers": {
    "flowerdocs": {
      "type": "url",
      "url": "http://localhost:8086/flowerdocs-mcp/mcp",
      "headers": {
        "X-FlowerDocs-Access-Key": "ENC(yourEncryptedAccessKey)",
        "X-FlowerDocs-User": "yourUsername",
        "X-FlowerDocs-Password": "ENC(yourEncryptedPassword)",
        "X-FlowerDocs-Scope": "FD"
      }
    }
  }
}
```

Launch Claude Code; the server connects automatically.

### Other MCP clients

Any MCP-compatible client works, since the server speaks the standard Streamable HTTP transport. Point the client at the same URL and pass the same four headers. For example, in Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "flowerdocs": {
      "url": "http://localhost:8086/flowerdocs-mcp/mcp",
      "headers": {
        "X-FlowerDocs-Access-Key": "ENC(yourEncryptedAccessKey)",
        "X-FlowerDocs-User": "yourUsername",
        "X-FlowerDocs-Password": "ENC(yourEncryptedPassword)",
        "X-FlowerDocs-Scope": "FD"
      }
    }
  }
}
```

The same applies to other MCP-capable assistants (VS Code, Cline, and similar). To browse and call the tools interactively without an assistant, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), selecting the **Streamable HTTP** transport and the URL above.

## Try it out

Once connected, ask your assistant:

> List all the admin entity types available.

> Show me all tag classes defined in the FD scope.

> Create a tag class called "InvoiceAmount" of type INT, make it searchable.

> Show me the XML content of the GUI configuration "search-form-invoice".

> Update the script "validate-invoice" to add a check on the InvoiceAmount tag.

## What the assistant can do

The tools are grouped into families:

| Family | Purpose |
|--------|---------|
| **Admin entities** | Generic CRUD over tag classes, component classes, ACLs, tag categories, workflows |
| **Team configuration** | Update a scope's team settings, such as profile tabs |
| **Class helpers** | Field-type discovery, appending allowed values / tag references |
| **Technical documents** | GUI configurations, scripts, operation handlers, CSS, routes, templates, pages |
| **Cache** | List and purge Core caches after bulk configuration changes |
| **Config components** | Instances of technical virtual-folder / folder classes (e.g. profile tabs) |

Each tool is advertised with `readOnly` / `destructive` hints, so a client such as Claude Desktop groups read-only tools apart from a **Write / delete tools** group and can ask for confirmation before running the destructive ones.

## Pair it with the documentation

Tool descriptions are intentionally minimal to keep the token budget small. For the assistant to produce correct XML, script APIs or operation-handler configurations, give it access to this FlowerDocs documentation through a companion MCP server (a filesystem or GitHub MCP pointed at the docs). The assistant then combines both: it discovers a field schema with `technicaldoc_describe`, reads the matching documentation page, and writes the document with `technicaldoc_create`.
