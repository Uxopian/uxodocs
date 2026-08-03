---
title: Installation
sidebar_position: 2
date: "2026-07-21T09:00:00+02:00"
---

## Installation

The MCP server is a standalone Spring Boot service. It ships as a JAR and a Docker image. Whichever you use, the configuration keys are the same.

### Get the server

- **JAR**: the latest `flower-docs-mcp-server.jar`, available from the [release notes](./release-notes.md).
- **Docker**: the delivered `flower-docs-mcp-server` image (exposes port `8086`, with a built-in `HEALTHCHECK`).

### Configure it

Drop an `application.properties` **next to the JAR**.

```properties
ws.url=http://localhost:8081/core/rest
gui.url=http://localhost:8080/gui/rest
secret=<your-secret-key>
mcp.access.key=<your-mcp-access-key>
```

| Property | Default | Description |
|----------|---------|-------------|
| `ws.url` | `http://localhost:8081/core/rest` | FlowerDocs Core REST endpoint |
| `gui.url` | `http://localhost:8080/gui/rest` | FlowerDocs GUI REST base. The MCP purges GUI-side caches after a configuration/script/CSS update so the change appears without a manual admin purge. Set empty to disable |
| `secret` | *(required)* | Key that decrypts the `ENC(...)` values (the access key and passwords) |
| `mcp.access.key` | *(required)* | Shared access key that gates every request (see [Authentication](#authentication)) |

Any property can also be set via an environment variable (`WS_URL=...`, `MCP_ACCESS_KEY=...`) or a command-line argument (`--ws.url=...`).

### Start it

```bash
java -jar flower-docs-mcp-server.jar
```

The MCP endpoint is then available at `http://localhost:8086/flowerdocs-mcp/mcp`.

### Health check

`GET /flowerdocs-mcp/actuator/status` returns a bare `UP` / `DOWN` (no health details). It reports **DOWN** when FlowerDocs Core or GUI is unreachable, by probing their own `/actuator/status`. Use it for the container healthcheck and load-balancer / monitoring probes:

```bash
curl http://localhost:8086/flowerdocs-mcp/actuator/status   # UP when core and gui are reachable
```

### Authentication

Each client authenticates via HTTP headers. There is no shared service account; every user provides their own credentials.

#### Required headers

| Header | Description |
|--------|-------------|
| `X-FlowerDocs-Access-Key` | Shared MCP access key, required on **every** request; **must** be `ENC(...)` |
| `X-FlowerDocs-User` | FlowerDocs username |
| `X-FlowerDocs-Password` | FlowerDocs password, which **must** be `ENC(...)` (plaintext is rejected) |
| `X-FlowerDocs-Scope` | FlowerDocs scope / tenant ID (e.g. `FD`) |

#### Shared access key

The access key is a **second factor that gates the whole server**, independent of who the user is. Even a valid FlowerDocs user cannot reach the MCP without it. Exposing the endpoint does not, on its own, grant access to your FlowerDocs data.

It is a single shared value. You configure it server-side as `mcp.access.key` and give it to the clients you trust. To rotate it, change the property and update those clients.

Every request to the MCP endpoint and to `/encrypt` must carry the `X-FlowerDocs-Access-Key` header. It **must** be `ENC(...)`; plaintext is rejected, the same policy as passwords. So the key is never stored in clear in a client's configuration. The server decrypts the header and compares it to its configured key in constant time. A mismatch returns `403`. The server also refuses to start unless both `secret` and `mcp.access.key` are set, so a deployment can never come up unprotected.

#### Encrypted passwords

Passwords must be sent as `ENC(...)`. An `ENC(...)` value can only be decrypted by the key that produced it, so the MCP's `secret` must match whatever encrypted the value.

#### Producing `ENC(...)` values

Once the server is up, use its own `/encrypt` endpoint. It holds the same `secret` and returns a value already wrapped as `ENC(...)`:

```bash
curl -X POST http://localhost:8086/flowerdocs-mcp/encrypt \
  -H "X-FlowerDocs-Access-Key: ENC(yourEncryptedAccessKey)" \
  -H "Content-Type: text/plain" \
  -d "yourPassword"
# -> ENC(Nhbs45YyYLhmY44udE2fAitLoJywdoSm)
```

A Swagger UI is served at `/flowerdocs-mcp/swagger-ui/index.html`: enter the access key and the value to encrypt, and copy the `ENC(...)` result.

:::warning Bootstrapping the access key
`/encrypt` is itself gated by the access key, so you cannot use it to encrypt the access key the first time. Produce that first `ENC(...)` value out-of-band. See [Encrypting a character string](../../apis/core/examples/stringEncryptor.md) or the [CLM documentation](../../install/clm/clm.md).
:::
