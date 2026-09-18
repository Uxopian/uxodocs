---
title: HTTPS and SSL
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/features/https-ssl
sidebar_position: 13
content_hash: b9a8081023e5efd07bda6670c7e153df18566f55b7ab7940e2ef1f3908095e4e
---

# HTTPS and SSL

ARender supports HTTPS for securing communication between the Web UI and the rendition services. When HTTPS is enabled, all services must use HTTPS. Mixing HTTP and HTTPS across services is not supported. The broker and every client that contacts it (the viewer and the rendition microservices) must be switched to HTTPS together.

## Overview

Enabling HTTPS requires changes on both sides:

1. **Rendition side**: provide a keystore so the broker (`RenditionEngine`) serves HTTPS, and switch the other microservices to advertise the broker's `https://` URL.
2. **Web UI side**: point the rendition host to an `https://` URL and make the viewer JVM **trust** the rendition certificate.

:::note
Only the broker (`RenditionEngine`) terminates TLS. The other rendition microservices keep serving plain HTTP on their local ports (the broker reaches them over loopback); the `https` profile only switches their *outbound* calls to the broker to `https://`.
:::

## Rendition configuration

Each rendition microservice ships with an `application-https.yaml` file inside `secure-mode-properties/`. These files reconfigure internal service URLs and service discovery properties to use HTTPS.

### Step 1: Copy the HTTPS property files

Copy the contents of `secure-mode-properties/modules/` into the corresponding `modules/` directory of your rendition installation. This places one `application-https.yaml` file in each module folder:

| Module             | What the override does                                                  |
| ------------------ | ----------------------------------------------------------------------- |
| RenditionEngine    | Configures the embedded server keystore (PKCS12)                        |
| JNIPdfEngine       | Sets `app.renditionHost` to `https://`                                  |
| PDFBoxEngine       | Sets `app.renditionHost` to `https://`                                  |
| TaskConversion     | Switches both `defaultZone` and `documentServiceHost` to `https://`     |

### Step 2: Configure the keystore

The RenditionEngine `application-https.yaml` expects a PKCS12 keystore. Place your keystore file at the location referenced in the configuration and update the values to match your certificate:

```yaml title="application-https.yaml"
server:
  ssl:
    key-store: keystore.p12
    key-store-password: <your-password>
    key-store-type: pkcs12
    key-alias: tomcat
    key-password: <your-password>
```

Replace `keystore.p12` with an absolute path if the file is not in the working directory. The `key-alias` must match the alias used when the certificate was imported into the keystore.

:::warning The certificate must include a SAN
The certificate's Subject Alternative Name (SAN) must list every hostname and IP that clients use to reach the broker (the host in `arender.server.rendition.hosts` and the broker's discovery hostname). ARender's REST client enforces hostname verification, so a certificate with only a Common Name, or a SAN that does not match the URL, is rejected even after it is trusted.
:::

### Step 3: Activate the HTTPS profile

Start each rendition microservice with the `https` Spring profile so the override files are loaded:

```bash
java -jar <module>.jar --spring.profiles.active=https
```

Or set the environment variable:

```bash
SPRING_PROFILES_ACTIVE=https
```

## Viewer configuration

The viewer must be configured to connect to the rendition backend over HTTPS:

| Property                              | Description                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `arender.server.rendition.hosts`      | Base URL of the rendition engine. Must start with `https://` when SSL is enabled.            |

The viewer's REST client validates the rendition certificate against the **JVM trust store**; there is no ARender property that configures a custom trust store or skips verification. If the certificate is issued by a trusted CA (public, or a corporate CA already present in the trust store), nothing else is required.

If the certificate is **self-signed or issued by a private CA**, make the viewer JVM trust it in one of two ways. The same applies to every rendition microservice, since they also contact the broker.

**Option 1 Import the certificate into the JRE trust store** (every JVM started from that JRE then trusts it):

```bash
keytool -importcert -alias arender-rendition \
  -file rendition.crt \
  -keystore $JAVA_HOME/lib/security/cacerts \
  -storepass changeit -noprompt
```

**Option 2 Use a dedicated trust store via JVM arguments**, without modifying the JRE:

```bash
-Djavax.net.ssl.trustStore=/opt/arender/ssl/truststore.p12
-Djavax.net.ssl.trustStorePassword=changeit
```

If the certificate is not trusted, the viewer logs `Could not fetch performance score for address=https://...` followed by an `SSLHandshakeException`, and documents fail to open.

## Docker deployment

When running with Docker Compose, pass the HTTPS profile and mount the keystore into the rendition containers:

```yaml title="docker-compose.yml"
services:
  rendition-engine:
    environment:
      SPRING_PROFILES_ACTIVE: https
    volumes:
      - ./keystore.p12:/opt/arender/keystore.p12:ro
```

Apply the same pattern to every rendition microservice container (document-converter, document-renderer, document-text-handler, document-file-storage).

On the viewer side, configure the rendition host URL to use `https://` and make each container **trust** the rendition certificate. The simplest way is to mount a trust store and set `JAVA_TOOL_OPTIONS` (the broker also passes it to the microservice JVMs it launches), or import the certificate into the image's `cacerts`:

```yaml
    environment:
      JAVA_TOOL_OPTIONS: "-Djavax.net.ssl.trustStore=/opt/arender/ssl/truststore.p12 -Djavax.net.ssl.trustStorePassword=changeit"
    volumes:
      - ./ssl:/opt/arender/ssl:ro
```

Refer to the [Environment variables](../../installation/environment-variables.md) page for the appropriate prefix for your viewer deployment.

## Generating a self-signed keystore

For development or testing, generate a PKCS12 keystore with `keytool`. The `-ext san=...` is required, otherwise hostname verification rejects the certificate:

```bash
keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 \
  -storetype PKCS12 -keystore keystore.p12 -validity 825 \
  -dname "CN=<broker-host>, O=ARender" \
  -ext "san=dns:<broker-host>,dns:localhost,ip:127.0.0.1" \
  -storepass <password> -keypass <password>

# Export the public certificate (PEM) used to configure trust on the clients:
keytool -exportcert -alias tomcat -keystore keystore.p12 -storetype PKCS12 \
  -storepass <password> -rfc -file rendition.crt
```

For production, use a certificate signed by a trusted CA.
