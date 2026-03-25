---
title: HTTPS and SSL
slug: /guides/features/https-ssl
sidebar_position: 13
---

# HTTPS and SSL

ARender supports HTTPS for securing communication between the Web UI and the rendition services. When HTTPS is enabled, all services must use HTTPS -- mixing HTTP and HTTPS across services is not supported.

## Overview

Enabling HTTPS requires changes on both sides:

1. **Rendition side**: activate the `https` Spring profile so each microservice binds to HTTPS and advertises its HTTPS URL.
2. **Web UI side**: point the rendition host to an `https://` URL and enable the custom SSL REST client.

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
| `arender.rest.ssl.custom.use`         | Set to `true` to enable the custom SSL context on the REST client that contacts rendition.   |

When `arender.rest.ssl.custom.use=true`, the viewer REST client trusts the certificate presented by the rendition services. If your certificate is self-signed or issued by a private CA, you may also need to add the CA certificate to the JVM trust store:

```bash
keytool -importcert -alias arender-rendition \
  -file ca-cert.pem \
  -keystore $JAVA_HOME/lib/security/cacerts \
  -storepass changeit -noprompt
```

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

On the viewer side, configure the rendition host URL to use `https://` and enable the custom SSL REST client. Refer to the [Environment variables](../../installation/environment-variables.md) page for the appropriate prefix for your viewer deployment.

## Generating a self-signed keystore

For development or testing, generate a PKCS12 keystore with `keytool`:

```bash
keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 \
  -storetype PKCS12 -keystore keystore.p12 \
  -validity 365 -storepass <password>
```

For production, use a certificate signed by a trusted CA.
