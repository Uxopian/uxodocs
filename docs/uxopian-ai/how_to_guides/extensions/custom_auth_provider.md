---
title: Adding a Custom Gateway Authentication Provider
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 0b5ff1a23d2dcbd45fcdac180e11747086b609611127ea4c71feaf0af2b92a38
---

# Adding a Custom Gateway Authentication Provider

The **Uxopian-ai Gateway (BFF)** acts as the security entry point for the platform. It is responsible for authenticating incoming requests and establishing a security context (Tenant ID, User ID, Roles) before forwarding traffic to the core AI service.

To integrate with your organization's specific authentication mechanism (e.g., OAuth2 introspection, LDAP, Custom Headers, or JWT validation), you must implement a custom **Auth Provider**.

## Overview

The Gateway acts as a proxy. Your custom provider intercepts the `ServerHttpRequest`, validates the credentials, and returns an `AuthenticatedUser` object. The Gateway then injects these details as secure headers (`X-User-Tenant`, `X-User-Id`) when calling the backend.

---

## Prerequisites

- **Java 21+**: The Gateway service requires Java 21 or higher.
- **Maven Settings**: Your `.m2/settings.xml` must be configured to access Uxopian-ai artifacts.

---

## Step 1: Project Configuration

Create a new Maven module. Unlike LLM connectors, this module relies on the `gateway` parent.

**`pom.xml` Setup:**

You must include the `maven-shade-plugin` configured to exclude Spring Boot starters to avoid conflicts, as this JAR will be loaded dynamically by the main application.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0)"
         xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
         xsi:schemaLocation="[http://maven.apache.org/POM/4.0.0](http://maven.apache.org/POM/4.0.0) [http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.uxopian.ai.gateway</groupId>
        <artifactId>gateway</artifactId>
        <version>2025.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>my-custom-auth-provider</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.uxopian.ai.gateway</groupId>
            <artifactId>model</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>io.projectreactor</groupId>
            <artifactId>reactor-test</artifactId>
            <scope>test</scope>
            <version>${reactor.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.5.2</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <filters>
                                <filter>
                                    <artifact>*:*</artifact>
                                    <excludes>
                                        <exclude>META-INF/*.SF</exclude>
                                        <exclude>META-INF/*.DSA</exclude>
                                        <exclude>META-INF/*.RSA</exclude>
                                    </excludes>
                                </filter>
                            </filters>
                            <artifactSet>
                                <excludes>
                                    <exclude>org.springframework.boot:*</exclude>
                                    <exclude>org.springframework:*</exclude>
                                </excludes>
                            </artifactSet>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## Step 2: Implement the Provider

You must create a class that implements `com.uxopian.ai.bff.gateway.model.provider.AuthProvider`.

The Gateway uses **Spring WebFlux** (Reactive Stack), so your implementation must return a `Mono<AuthenticatedUser>`.

**Crucial:** You must annotate this class with `@Service("YourProviderName")`. This name maps directly to the configuration in `application.yml`.

**Example: `DevProvider.java`**
_This example demonstrates extracting identity from raw headers (useful for development or behind trusted proxies)._

```java
package com.uxopian.ai.bff.gateway.development.provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.uxopian.ai.bff.gateway.model.provider.AuthProvider;
import com.uxopian.ai.bff.gateway.model.user.AuthenticatedUser;
import reactor.core.publisher.Mono;

@Service("DevProvider") // <--- This Name is CRITICAL
public class DevProvider implements AuthProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(DevProvider.class);
    private static final String HEADER_USER_ID = "X-User-Id";
    private static final String HEADER_USER_ROLES = "X-User-Roles";
    private static final String HEADER_TENANT_ID = "X-User-Tenant";

    @Override
    public Mono<AuthenticatedUser> authenticate(ServerHttpRequest request) {

        // 1. Extract credentials or headers from the request
        String userId = request.getHeaders().getFirst(HEADER_USER_ID);
        String rolesRaw = request.getHeaders().getFirst(HEADER_USER_ROLES);
        String tenantId = request.getHeaders().getFirst(HEADER_TENANT_ID);

        // 2. Validate (Simplified for example)
        if (!StringUtils.hasText(userId)) {
            LOGGER.warn("DevProvider: Header '{}' is missing.", HEADER_USER_ID);
            // Return empty user or throw exception depending on security requirements
            return Mono.just(new AuthenticatedUser());
        }

        LOGGER.info("Authenticating user '{}'", userId);

        // 3. Construct the AuthenticatedUser object
        AuthenticatedUser user = new AuthenticatedUser();
        user.setId(userId);
        user.setToken("dev-dummy-token"); // Set the token to be passed downstream

        if (StringUtils.hasText(tenantId)) {
            user.setTenantId(tenantId);
        }

        if (StringUtils.hasText(rolesRaw)) {
            String[] roles = rolesRaw.split(",");
            for (String role : roles) {
                user.addRole(role.trim());
            }
        }

        // 4. Return as a Reactive Mono
        return Mono.just(user);
    }
}
```

---

## Step 3: Gateway Configuration

Once your code is ready, you must configure the Gateway to use this specific provider for the AI service route.

In your `gateway-service` configuration (e.g., `application.yml`), locate the `routes` section. Update the `provider` field to match your `@Service` annotation.

```yaml
app:
    gateway:
        provider-header: X-Provider-ID
    routes:
        - id: uxopian-ai
          uri: http://uxopian-ai-standalone:8080 # The internal address of the Core Service
          prefix: /uxopian-ai/
          path: /uxopian-ai/**
          rewritePath: /uxopian-ai/?(?<segment>.*), /uxopian-ai/${segment}

          # MAPPING HAPPENS HERE:
          provider: DevProvider # Must match @Service("DevProvider")

          # Public/Private Path Security Rules
          security:
              - path: /.well-known/**
                public: true
              - path: /swagger-ui/**
                public: true
              - path: /api/v1/admin/**
                # roles: [ "ADMIN" ] # Uncomment to enforce role checks
                public: true
```

---

## Step 4: Deployment

The Gateway loads providers from a plugin directory defined by `auth.provider.path` (default: `provider/`).

### Docker Deployment

You must use the **Gateway Service** base image (different from the core AI image).

**Dockerfile Example:**

```dockerfile
# Start from the Gateway Service image
FROM artifactory.arondor.cloud:5001/uxopian-ai/gateway-service:2025.0.0

# Copy your custom Auth Provider Fat JAR into the provider directory
COPY ./target/my-custom-auth-provider-1.0-SNAPSHOT.jar /app/provider/
```

### Verification

1.  **Restart** the Gateway container.
2.  **Monitor Logs:** Ensure the service starts without errors regarding missing beans.
3.  **Test:** Send a request to the Gateway URL (e.g., `https://gateway/uxopian-ai/api/v1/users/details`) with the headers required by your logic.
4.  **Confirm:** Check that the Core Service receives the request with the injected `X-User-Tenant` and `X-User-Id` headers.
