---
title: Authentication and gateway
sidebar_label: Authentication
sidebar_position: 2
last_update:
  date: '2026-03-26T16:37:56.929Z'
  author: CI/CD Bot
content_hash: a2652454edf48c137469828ae80a8f10456a4898b6b3a3ef4562e74ebeb0f738
---

Authentication in Uxopian AI is handled entirely by `uxopian-gateway`. The backend (`uxopian-ai`) does not perform authentication itself. It receives identity information through HTTP headers that the gateway injects after a successful authentication check.

## Authentication flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant GW as uxopian-gateway
    participant AP as AuthProvider
    participant AI as uxopian-ai
    participant AF as AuthFilter

    B->>GW: Request with credentials (JWT / header)
    GW->>AP: authenticate(request)
    AP-->>GW: AuthenticatedUser (userId, tenantId, roles, token)
    GW->>AI: Forward request with X-User-Id, X-User-TenantId,<br/>X-User-Roles, X-User-Token headers
    AI->>AF: Filter runs on every request
    AF->>AF: Build AuthenticatedUser from headers,<br/>open AiContext scope
    AF-->>AI: Request proceeds with AiContext active
```

*Figure: Authentication flow from browser through gateway to uxopian-ai.*

## The AuthProvider interface

The gateway authenticates every request by calling an `AuthProvider`. An `AuthProvider` inspects the request and returns an `AuthenticatedUser` carrying `userId`, `roles`, `tenantId`, and the original token. If authentication fails, the request is rejected at the gateway.

Three built-in providers are included:

| Provider | When to use |
|---|---|
| `DevProvider` | Local development only. Since 2026.0.0-ft5, always returns a **fixed** identity (`dev`, tenant `dev`, role `ADMIN`) — it no longer reads any client-supplied header, so it can never be used to forge an arbitrary user or tenant (previously it trusted `X-User-Id`/`X-User-Roles`/`X-User-Tenant` with no validation). |
| `FlowerDocsProvider` | FlowerDocs deployments. Validates FlowerDocs JWTs from `Authorization: Bearer` or `SESSION` cookie. Caches sessions in Hazelcast. |
| `Fast2Provider` | Fast2 deployments. Validates Fast2 JWT tokens from `Authorization: Bearer`. |

The active provider is set per route in `gateway-application.yaml`:

```yaml
app:
  routes:
    - id: uxopian-ai
      uri: http://uxopian-ai:8080
      path: /**
      provider: DevProvider
```

## Identity headers

After authentication, the gateway forwards four headers to `uxopian-ai`:

| Header | Content |
|---|---|
| `X-User-Id` | Unique user identifier |
| `X-User-TenantId` | Tenant identifier — drives all data isolation |
| `X-User-Roles` | Comma-separated list of user roles |
| `X-User-Token` | Original credential token (forwarded for integrations that call back into the source system) |

Since 2026.0.0-ft5, `AuthFilter` also reads an optional **`X-Application-Id`** header — not an identity header, but a caller-supplied selector that forces which [Application](../admin/managing_applications.md) (`ApplicationConf`) the request resolves to, overriding the default that is otherwise derived from the connection provider.

## Gateway-signed request authentication

The identity headers above are, by themselves, just headers: anything able to reach `uxopian-ai` directly (bypassing the gateway) could set `X-User-Id`/`X-User-TenantId`/`X-User-Roles` to impersonate any user. Since 2026.0.0-ft5, the gateway can close that gap by **signing** every request it forwards with a short-lived HS256 JWT, carried in a new `X-Gateway-Auth` header, which `uxopian-ai` verifies before trusting the identity headers alongside it.

The assertion carries `sub` (user id), `tenantId`, `roles`, and `provider` as claims, with a default 30-second lifetime. Both sides share one secret — the gateway signs with `internal-auth.jwt.secret`, `uxopian-ai` verifies with the same key under the identical property name — and verification is inactive on either side until its secret is set, so a non-signing deployment keeps working exactly as before. The official Helm charts make the secret **mandatory** on the `uxopian-ai` side (the chart fails to render without it). See [Configuration — gateway-signed request authentication](../reference/configuration.md#gateway-signed-request-authentication) for every key and the exact rotation procedure.

## AuthFilter in uxopian-ai

`AuthFilter` (`OncePerRequestFilter`) reads these headers on every incoming request. It builds an `AuthenticatedUser` and opens an `AiResourceContext` scope using `AiContext.builder().withUser(authUser).open()`. All downstream services read tenant identity from `AiContext` rather than receiving it as parameters.

If `X-User-TenantId` is absent and the `dev` profile is not active, the request proceeds without a security context. Operations that require tenant data will fail because no tenant is resolvable.

## Dev profile

When `SPRING_PROFILES_ACTIVE=dev` is set on `uxopian-ai`, `AuthFilter` injects fallback defaults when headers are missing:

- `userId` defaults to `User-development`
- `tenantId` defaults to `Tenant-development`

This means any request reaches the backend without authentication. Never use the `dev` profile in a production or publicly accessible environment.

In the Docker Compose quickstart, the gateway uses `DevProvider`, which reads identity from request headers. Combined with the `dev` profile on `uxopian-ai`, this allows browser testing without any credentials.

## Public routes

Some paths bypass authentication in the gateway. The default gateway configuration marks the following as public:

- `/assets/**`: static web component bundles
- `/actuator/health`: health check endpoint
- `/v3/**` and `/swagger-ui/**`: API documentation
- `/ws/**`: WebSocket endpoint for streaming

Admin API routes (`/api/v1/admin/**`) can be restricted by role using the `roles` field in the gateway security configuration.

## Custom auth providers

A custom `AuthProvider` can be implemented in the gateway by writing a Spring bean that implements the `AuthProvider` interface (returns `Mono<AuthenticatedUser>`). The gateway configuration references the provider by its Spring bean name.

## Related pages

- [System architecture](./architecture.md)
- [Multi-tenancy](./multi_tenancy.md)
- [Quickstart with Docker Compose](../getting_started/quickstart.mdx)
