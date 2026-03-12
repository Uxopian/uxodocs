---
sidebar_position: 1
title: "Overview"
last_update:
  date: '2026-03-09T13:58:30.248Z'
  author: CI/CD Bot
icon: mdi-database-arrow-right-outline
content_hash: dd37c2e1e781d102ca33fdf47c29ecff18f2441f2a64883da53b196d6c35d409
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Welcome to the ARender migration documentation, where we will guide you through the process of upgrading from Version 2023 
to Version 2026 of ARender.


## Introduction
The 2026 version of ARender will introduce significant changes aimed at modernizing the technical stack and improving maintainability and scalability.
These changes mainly include an upgrade from Spring Boot 2 to Spring Boot 4, a migration of the Java Development Kit from JDK 8 to JDK 25, the removal of
WAR-based packaging, and the addition of connector support exposed as a web service.

### JDK Requirements

ARender 2026 is compiled with **JDK 17** due to GWT (Google Web Toolkit) compilation constraints. However, ARender is fully qualified and tested at runtime with **JDK 25**.

**JDK 25 is the recommended JDK for deploying ARender in production.**

## Prerequisites
Before starting the migration of ARender's UI component, ensure you meet the following prerequisites:

* Basic knowledge of Spring Boot.
* The ARender UI version 2026 binary should be downloaded and ready to deploy. You can download it [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-spring-boot-package/{{version}}/arondor-arender-hmi-spring-boot-package-{{version}}.zip).
* The ARender Rendition version 2026 binary should be downloaded and ready to install. You can download it [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/micro/services/rendition-engine-installer/{{version}}/rendition-engine-installer-{{version}}-rendition.jar).
* Specific configurations from your ARender deployment in Version 2023.

## Migrating from Version 2023 to Version 2026 of ARender

### Migrating ARender Rendition
Before installing ARender Rendition Version 2026, you need to perform the following steps to migrate your current Version 2023
installation to Version 2026:

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


* **Install Rendition Version 2026**: Follow the detailed installation instructions in the official documentation, 
  available [here](/docs/arender/installation/standalone/rendition/install). This documentation will guide you 
  through the Version 2026 installation process.

* **Transfer Properties**: Once ARender Rendition Version 2026 is installed, you will need to transfer the properties and 
  configurations from your current Version 2023 installation to the new one. To do this, refer to the list of property 
  changes listed [here](/docs/arender/guides/upgrade/2023.x_to_2026.x/rendition). Ensure that all necessary 
  configurations are correctly migrated to Version 2026.

* **Configure ARender Rendition Version 2026**: After transferring the properties, you can configure ARender Rendition 
  Version 2026 according to your specific needs using the documentation 
  [here](/docs/arender/installation/standalone/rendition/configuration).

### Migrating ARender UI Version 2023 to Version 2026

Before installing ARender UI Version 2026, you need to perform the following steps to migrate your current Version 2023 
installation to Version 2026:

* **Stop the Application Server Service**: Ensure you stop the service of your current application server where ARender 
  UI Version 2023 is deployed. This will ensure a smooth transition to Version 2026.

* **Install ARender WEB-UI Version 2026**: Follow the detailed installation instructions for ARender UI Version 2026 in the 
  official documentation, available [here](/docs/arender/installation/standalone/web-ui/standalone). 
  This documentation will guide you through the Version 2026 installation process.

* **Transfer Properties**: Once ARender UI Version 2026 is installed, you will need to transfer the properties and 
  configurations from your current Version 2023 installation to the new one. To do this, refer to the list of property 
  changes listed [here](/docs/arender/guides/upgrade/2023.x_to_2026.x/web-ui) to ensure that all necessary 
  configurations are correctly migrated to Version 2026.

* **Configuring ARender UI Version 2026**: After transferring the properties, you can customize ARender UI Version 2026 
  according to your specific requirements by following the documentation available
  [here](/docs/arender/installation/standalone/web-ui/configuration).
