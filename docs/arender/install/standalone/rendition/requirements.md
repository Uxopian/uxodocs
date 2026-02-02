---
title: "Requirements"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 41244789b1e3d42bd8426122156ca9a27910c8893c2b7fdc94240a42e74ee575
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Architecture

Each Rendition installation should be done on a dedicated server.

## Operating system

| Category | Requirement                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows  | Windows Server 2016 or higher                                                                                                                                                                                               |
| Linux    | Kernel 2.6 or greater, glibc 2.14 or greater, minimal recommended version for Linux distributions (due to our software requirements): RedHat (7 or 8), CentOS (7), Debian (8), Ubuntu (14.04+), Amazon Linux AMI (2016.09+) |

## Minimal hardware

| Category                      | Minimum | Advised                                                                                  |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| Number of rendition server(s) | 1       | 2 (for high availability)                                                                |
| RAM                           | 8GB     | 16GB                                                                                     |
| CPU (vCPU)                    | 4       | 8                                                                                        |
| CPU type                      | 64Bits  | 64Bits                                                                                   |
| Storage                       | 20Go    | The maximum between 20Go and a storage where a full day of temporary files can be stored |

## Port configuration

The ports of the different micro-services need to be free to use and are as follows:

| Service              | Protocols  | Default listening port |
| :------------------- | :--------: | :--------------------: |
| Service broker       | HTTP/HTTPS |                   8761 |
| Distant file storage |    HTTP    |                   8081 |
| Text handler         |    HTTP    |                   8899 |
| Renderer             |    HTTP    |                   9091 |
| Converter            |    HTTP    |                  19999 |

## Software requirement

<Tabs>
<TabItem value="Windows" label="Windows">

| Software                        | Requirement                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Java Runtime                    | JRE 1.8 64 bits Minimum, OpenJDK 11 advised. Oracle JDK are supported, JRE IBM J9 is unsupported.                                                         |
| (Optional) Microsoft Office     | Microsoft Office 2013 and up. Office 365 compatible if the server is connected to an internet connection. We recommend as well to keep Office up to date. |

</TabItem>
<TabItem value="Linux" label="Linux">

| Software                        | Requirement                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Java Runtime                    | JRE 1.8 64 bits Minimum, OpenJDK 11 advised. Oracle JDK are supported, JRE IBM J9 is unsupported. |

</TabItem>
</Tabs>

:::warning
If the JVM used is not **64 bits**, the rendition will now stop its boot and
warn in the logs/console that the version of the JVM used is incorrect.
:::

## Access rights

### For the installation

- The user must have the rights to create the rendition folder.
- The user must have the necessary rights to create a service.

### For the launch

The user that runs the service needs to have access to the files into the Rendition folder and the required third party softwares, as well as execution rights.

## Antivirus configuration

Deactivate the scan of ARender Rendition tmp folder.