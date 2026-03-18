---
title: Security
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/security-model
sidebar_position: 8
content_hash: cffa2ca357f87f227bd2d26762f3203597f74ba632a964acbfb9f8862e59e5c9
---

# Security

ARender's viewer (the HMI) uses Spring Security with two mutually exclusive authentication modes: a default pre-authenticated mode for embedded integrations, and an OAuth2/OIDC mode for standalone deployments that need identity provider integration.

## Authentication modes

The authentication mode is controlled by a single property:

```properties
arender.server.oauth2.enabled=false
```

When set to `false` (the default), the viewer uses pre-authenticated security. When set to `true`, it uses OAuth2/OIDC login with JWT resource server support.

### Pre-authenticated mode (default)

In this mode, ARender trusts the identity provided by the calling system. A `RequestParameterAuthenticationFilter` extracts the username from URL parameters and creates a session for it.

The filter looks for a username in this order:

1. A `user` parameter embedded in the `uuid` URL parameter (decoded from the self-contained `DocumentId`)
2. A `user` query parameter on the request URL
3. The same parameters extracted from the HTTP `Referer` header
4. A `user` init parameter from the servlet context
5. The default username "Unknown"

This mode is designed for scenarios where ARender is embedded inside a portal or ECM system that already handles authentication. The external system passes the user identity to ARender through the URL.

Static resources (JS, CSS, SVG, PNG, ICO, GIF files, health endpoints, and GWT resources) are excluded from authentication and served without restriction.

:::warning
Pre-authenticated mode does not perform any credential verification. The `user` parameter value is accepted as-is. This mode should only be used when ARender is behind a trusted reverse proxy or embedded in a system that enforces authentication before requests reach the viewer.
:::

### OAuth2/OIDC mode

When `arender.server.oauth2.enabled=true`, the viewer enables OAuth2 login and JWT-based resource server authentication. This mode supports two authentication flows:

**OAuth2 login flow.** Browser-based users are redirected to the configured identity provider for login. After successful authentication, the viewer receives an OAuth2 token and creates a session.

**JWT bearer token.** API clients can send a JWT token in the `Authorization` header. The viewer validates the token against the configured issuer without requiring a browser-based login. This is useful for programmatic access or embedding ARender in an application that already holds a valid token.

Both flows are active simultaneously when OAuth2 is enabled.

## Configuring OAuth2

OAuth2 configuration uses standard Spring Security OAuth2 Client and Resource Server properties.

### Client registration (for browser login)

```properties
spring.security.oauth2.client.registration.my-provider.client-id=arender-viewer
spring.security.oauth2.client.registration.my-provider.client-secret=your-secret
spring.security.oauth2.client.registration.my-provider.scope=openid,profile,email
spring.security.oauth2.client.provider.my-provider.issuer-uri=https://idp.example.com/realms/your-realm
```

### Resource server (for JWT validation)

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://idp.example.com/realms/your-realm
```

The viewer creates a `JwtDecoder` from the issuer URI automatically. JWT tokens are validated against the provider's published keys.

## Token lifecycle

When OAuth2 is enabled, a `TokenFilter` runs on every non-static request to check token expiration. The filter handles two token types:

- **OAuth2 login tokens**: the filter loads the authorized client and checks the access token's expiration time.
- **JWT bearer tokens**: the filter reads the expiration claim from the JWT directly.

If a token has expired, the filter clears the security context and invalidates the HTTP session, forcing a new authentication.

## Session management with Hazelcast

In a multi-instance deployment with OAuth2, all viewer instances must share session state so that a user authenticated on one instance can be served by another. ARender uses Hazelcast-backed Spring Sessions for this purpose.

Session sharing is controlled by:

```properties
arender.server.session.hazelcast.enabled=true
```

This is enabled by default. When active, the viewer stores HTTP sessions in a Hazelcast distributed map (`spring:session:sessions`) instead of the servlet container's native session store.

In addition to HTTP sessions, OAuth2 authorized client data is stored in a Hazelcast map (`spring:oauth2:oauth2Authorized`) so that token state is shared across instances.

### Cookie configuration

The session cookie is configured with `SameSite=none` and `Secure=true` to support cross-origin embedding (for example, ARender loaded inside an ECM's iframe). Additional JVM-level system properties control cookie behavior:

| System property | Purpose |
|----------------|---------|
| `com.uxopian.arender.session.jvm.route` | Appends a JVM route suffix to the session cookie for sticky sessions |
| `com.uxopian.arender.session.jvm.route.separator` | Separator character between session ID and JVM route |
| `com.uxopian.arender.session.jvm.base64` | Enables Base64 encoding of the session cookie value |

## Security filter chain

The viewer registers a Spring Security `SecurityFilterChain` that enforces authentication on all requests except static assets and health endpoints.

In pre-authenticated mode, the chain:

1. Permits static resources and health/weather endpoints without authentication
2. Requires authentication for all other requests
3. Returns HTTP 403 for unauthenticated requests (no login redirect)
4. Runs the `RequestParameterAuthenticationFilter` to extract user identity

In OAuth2 mode, the chain:

1. Permits the same static resources without authentication
2. Requires authentication for all other requests
3. Redirects unauthenticated browser requests to the OAuth2 provider login page
4. Validates JWT bearer tokens on API requests
5. Runs a `ForwardedHeaderFilter` to support reverse proxy setups (X-Forwarded headers)
6. Runs the `TokenFilter` to check token expiration

Both modes disable CSRF protection, frame options headers, XSS protection headers, and cache control headers. CSRF is disabled because the viewer is typically loaded in cross-origin contexts. Frame options are disabled to allow iframe embedding.

## Related pages

- [Documents and document IDs](./documents-and-ids.md): the DocumentId / DocumentAccessor model
- [Opening documents](../guides/features/opening-documents.md): how the `user` parameter is passed via URL
- [Caching](./caching.md): how Hazelcast is used for session sharing and document caching
- [System architecture](../overview/architecture.md): where the viewer sits in the overall system
