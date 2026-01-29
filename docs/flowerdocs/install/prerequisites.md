---
title: Prerequisites
sidebar_position: 2
date: "2000-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: b486597f9b5b3a1cc9e2e3a1c19f1471a89c6842956f89dc4a74d95be3f577d3
---

:::info
This section describes the prerequisites for the **FlowerDocs GUI**, **FlowerDocs Core** and applications.
:::

# Prerequisites

Be careful to harmonise the date/time configuration on the various servers making up the target architecture by using the same timezone (FlowerDocs servers but also all third-party components). Date gap can cause problems when FlowerDocs checks the validity of a token (SSO, Web Services, etc.).

FlowerDocs must only be used in HTTPS.

## Operating system

### Linux

Installing a FlowerDocs platform requires Linux servers. FlowerDocs is supported and qualified on the Amazon Linux 2023 system.

\*Any other Linux system is deemed to be functional if it can install the required version of Java.

## Application components

Java Runtime 11 must be installed to run FlowerDocs.

This documentation does not cover the installation of the ARender rendition server (version 2023.15.0). It must therefore be installed beforehand and be accessible via HTTP or HTTPS protocol from **FlowerDocs GUI**, **FlowerDocs Core** and (version 2023.15.0).

### OpenSearch and Redis

You need to install OpenSearch and Redis, which are prerequisites for FlowerDocs to work properly.
OpenSearch and Redis versions corresponding to FlowerDocs versions are indicated at the beginning of the release notes.

## Sizing

The architecture depends on the estimated load, but it is recommended to have at least :

| Component                    | vCPU | RAM  | Note                                                                                                |
| ---------------------------- | ---- | ---- | --------------------------------------------------------------------------------------------------- |
| **FlowerDocs**               | 2    | 4 Go | The **FlowerDocs GUI**, **FlowerDocs Core** and applications must be installed on separate servers. |
| **ARender Rendition Server** | 4    | 8 Go | Rendition server sizing is strongly linked to the typology and number of documents viewed.          |

The sizing of a FlowerDocs platform needs to be carefully considered in order to achieve the best possible performance.
The most important factors are the number of concurrent users and the number of documents viewed.

We recommend isolating each component on separate machines:

- **FlowerDocs Core**
- **FlowerDocs GUI**
-
- ARender Rendition
- Redis
- OpenSearch

## Encoding

It is necessary to use UTF-8 encoding on component installation servers, to ensure proper handling of accented letters and other characters in the application.

# Applications

The FlowerDocs platform requires the installation of the following executable JARs:

- `flower-docs-gui-webapp-2025.3.0.jar`
- `flower-docs-core-webapp-2025.3.0.jar`
- `arondor-arender-hmi-spring-boot-2023.15.0.jar`

These applications can be configured by property files located in the same directory as the application.

<br/>

Applications can be configured via the following files:

| Application         | Configuration file name            |
| ------------------- | ---------------------------------- |
| **FlowerDocs Core** | `core.properties`                  |
| **FlowerDocs GUI**  | `gui.properties`                   |
|                     | `arender-custom-server.properties` |

The FlowerDocs ARender connector `flower-docs-arender-hmi-2025.3.0.jar` is also required for the application to be able to retrieve documents stored in FlowerDocs.

:::info
The necessary configuration is described on the dedicated page [here](/docs/flowerdocs/install/config/arender-hmi-config).
:::

# Verification of downloaded application integrity

After downloading the application, check the integrity of the executable before installing it. It is important to check that it has not been altered (corrupted or fraudulently modified `.jar` file).
<br/><br/>

To do this, you need to calculate the file's hash using the `SHA-256` hash function, so that you can verify it.

- Use the command: `sha256sum {fileName}`.
- Then retrieve the result of the command, which corresponds to the file's fingerprint.
- Check that the fingerprint of each downloaded file is equal to the content of the corresponding `.sha256` file.

# Download

<br/>
:::info
Would you like to download another version? Go to [old releases](../../../releases).
:::
