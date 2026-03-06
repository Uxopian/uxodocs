---
sidebar_position: 1
title: "Overview"
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
icon: mdi-database-arrow-right-outline
content_hash: 769b17a31201f16f00291086ddd5c4b31e45dcf132d2d867e8c840d17b852e3e
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the ARender migration documentation, where we will guide you through the process of upgrading from Version 4 
to Version 2023 of ARender.

The primary focus of this update is on the UI aspect, transitioning from a WAR deployment in Version 4 to a Spring Boot 
deployment in Version 2023. Note that for the Rendition aspect, the installation process remains the same for both Versions
4 and 2023.

## Introduction
Version 2023 of ARender represents a significant step in the evolution of our product's UI component, incorporating Spring 
Boot to enhance stability, performance, and deployment flexibility. This documentation is designed to guide you through 
the process of migrating the UI component from Version 4 to Version 2023, with an emphasis on the necessary changes for 
Spring Boot deployment.

## Prerequisites
Before starting the migration of ARender's UI component, ensure you meet the following prerequisites:

* Basic knowledge of Spring Boot.
* The ARender UI version 2023 binary should be downloaded and ready to deploy. You can download it [here](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/{{version}}/arondor-arender-hmi-spring-boot-package-{{version}}.zip).
* The ARender Rendition version 2023 binary should be downloaded and ready to install. You can download it [here](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/{{version}}/rendition-engine-installer-{{version}}-rendition.jar).
* Specific configurations from your ARender deployment in Version 4.

## Migrating from Version 4 to Version 2023 of ARender

### Migrating ARender Rendition
Before installing ARender Rendition Version 2023, you need to perform the following steps to migrate your current Version 4
installation to Version 2023:

* **Stop and Remove the Rendition Service**

<Tabs>
<TabItem value="win" label="Windows">

```powershell
$> sc stop ARenderRenditionService
$> .\removeService.bat
```

</TabItem>
<TabItem value="lin" label="Linux">

If **systemd** is the system initialisation component:

```bash
$> systemctl stop ARenderRenditionEngineService.service
$> ./removeService.sh
```

If **initd** is the system initialisation component:

```bash
$> service ARenderRenditionEngineService stop
$> ./removeService.sh
```

</TabItem>
</Tabs>


* **Install Rendition Version 2023**: Follow the detailed installation instructions in the official documentation, 
  available [here](/docs/arender/installation/standalone/rendition/install). This documentation will guide you 
  through the Version 2023 installation process.

* **Transfer Properties**: Once ARender Rendition Version 2023 is installed, you will need to transfer the properties and 
  configurations from your current Version 4 installation to the new one. To do this, refer to the list of property 
  changes listed [here](/docs/arender/guides/upgrade/4.8_to_2023.0/rendition). Ensure that all necessary 
  configurations are correctly migrated to Version 2023.

* **Configure ARender Rendition Version 2023**: After transferring the properties, you can configure ARender Rendition 
  Version 2023 according to your specific needs using the documentation 
  [here](/docs/arender/installation/standalone/rendition/configuration).

### Migrating ARender UI Version 4 to Version 2023

:::warning[No change for IBM FileNet installation]

Please note that this documentation is not intended for configuring ARender within IBM FileNet. No changes are required
for IBM FileNet configuration when transitioning from Version 4 to Version 2023 of ARender.

:::

Before installing ARender UI Version 2023, you need to perform the following steps to migrate your current Version 4 
installation to Version 2023:

* **Stop the Application Server Service**: Ensure you stop the service of your current application server where ARender 
  UI Version 4 is deployed. This will ensure a smooth transition to Version 2023.

* **Install ARender WEB-UI Version 2023**: Follow the detailed installation instructions for ARender UI Version 2023 in the 
  official documentation, available [here](/docs/arender/installation/standalone/web-ui/standalone). 
  This documentation will guide you through the Version 2023 installation process.

* **Transfer Properties**: Once ARender UI Version 2023 is installed, you will need to transfer the properties and 
  configurations from your current Version 4 installation to the new one. To do this, refer to the list of property 
  changes listed [here](/docs/arender/guides/upgrade/4.8_to_2023.0/web-ui) to ensure that all necessary 
  configurations are correctly migrated to Version 2023.

* **Configuring ARender UI Version 2023**: After transferring the properties, you can customize ARender UI Version 2023 
  according to your specific requirements by following the documentation available
  [here](/docs/arender/installation/standalone/web-ui/configuration).
