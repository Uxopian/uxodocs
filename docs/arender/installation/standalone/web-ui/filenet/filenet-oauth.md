---
title: Installation ARender Spring Boot with OAuth2
sidebar_position: 2
description: Deployment guide for IBM Filenet with ARender Spring Boot and OAuth2
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 1b07cae9a886bd6319f505a7c4b4b58bf2967ae97984567a70d92383581b1ec9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

With the transition from traditional Websphere-based deployments to Spring Boot, the application now leverages OAuth2 for authentication. Previously, WebSphere only managed user authentication via JAAS, which integrated seamlessly with FileNet's Java API.
The modernization effort aims to enhance security with modern OAuth2 identity providers, and maintain the same capabilities for interacting with FileNet Content Manager.


The key challenge addressed here is ensuring OAuth2 tokens can be validated on the FileNet side when using FileNet Java API for
operations such as document retrieval or metadata access.

## Current Architecture (Spring Boot with OAuth2)

The application is now packaged as a standalone JAR file using Spring Boot, enabling easier deployment and upgrade.
Connector library can be loaded dynamically from the application's classpath as external dependencies, improving flexibility for upgrades and maintenance.

## Configuration

Requirements:

- OAuth2 Identity Provider
- ARender Web-UI Spring Boot (JAR / ZIP package)
- FileNet connector
- FileNet LoginModule
- Artifactory access

### Standalone

ARender installation is as simple as:

1. Download **arondor-arender-hmi-spring-boot-package-{{version}}.zip**
2. Unzip it into a folder
3. Download **arondor-arender-filenet-ce--jar-with-dependencies.jar**
4. Copy the connector into the **lib/** folder of the step 2
5. Edit the **arender-custom-server.properties** in the **configurations/** folder and add the following properties:

```properties
# Enable OAuth2
arender.server.oauth2.enabled=true
# Set authentication method to use for FileNet
arender.server.filenet.authentication.method=oauth2ObjectStoreProvider
arender.server.filenet.ce.url=http://localhost:9080/wsi/FNCEWS40MTOM/
```

6. Create a **application.yml** file in the root of the installation folder and edit the file like below.

Note: This is example with Keycloak

```yml
# Here we are changing the port of the ARender application since Keycloak server is already running in port 8080.
server:
  port: 8082

# Here we are using Keycloak for the authentication
keycloak:
  base-url: http://localhost:8080/auth
  realm: myrealm
  realm-url: ${keycloak.base-url}/realms/${keycloak.realm}

# Here we are configuring the Spring Security OAuth2 accordingly to our Keycloak setup
spring:
  security:
    oauth2:
      client:
        registration:
          arender:
            client-id: arender-client
            client-name: ARender
            client-secret: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            provider: keycloak
            authorization-grant-type: authorization_code
            scope: openid
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
        provider:
          keycloak:
            authorization-uri: ${keycloak.realm-url}/protocol/openid-connect/auth
            jwk-set-uri: ${keycloak.realm-url}/protocol/openid-connect/certs
            token-uri: ${keycloak.realm-url}/protocol/openid-connect/token
            user-name-attribute: preferred_username
      resourceserver:
        jwt:
          issuer-uri: ${keycloak.realm-url}
```

Now that we have setup the ARender application we can then:

- Start the Keycloak server
- Start the ARender application.

<Tabs>
<TabItem value="linux" label="Linux">
```bash
./ARenderConsole.sh
```
</TabItem>

<TabItem value="windows" label="Windows">
```bash
Run ARenderConsole.bat
```
</TabItem>
</Tabs>

There are also some scripts for the service mode aswell.
