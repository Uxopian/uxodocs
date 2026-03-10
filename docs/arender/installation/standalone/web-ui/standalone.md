---
title: Standalone
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: d645bdbcc2a63ca81febd91c3a27ec1a1a24bde20887691f7a5e70cd82186b1f
---

Below a standalone installation of the ARender Web-UI.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
To install on **IBM FileNet systems**, you can skip this page and directly go to: 
[ARender installation on IBM FileNet](/docs/arender/installation/standalone/web-ui/filenet/filenet-was).
:::

:::warning
Since ARender 2026.0.0, the deployment of ARender UI has changed. Please check the detailed upgrade documentation 
[here](/docs/arender/guides/upgrade/2023.x_to_2026.x/web-ui).
:::

## Prerequisites

### Minimal hardware

| Category                         | Minimum | Advised                                                                                                 |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| Number of Web-UI server(s)       | 1       | The number of rendition server divided by two (example 4 rendition servers, therefore 2 Web-UI servers) |
| RAM                              | 1GB     | 2GB                                                                                                     |
| CPU type                         | 64Bits  | 64Bits

### Software

| Software                        | Requirement                                                                                                                                                                                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Java Runtime                    | JDK 21 64 bits minimum, JDK 25 (LTS) recommended. Eclipse Temurin or OpenJDK distributions are supported.                                                                                                                                                                                                               |
| ARender Rendition up & running  | The Rendition health page should be green, see [the related documentation](/docs/arender/installation/standalone/rendition/verification). If it is not the case, please install the Rendition following [the related documentation](/docs/arender/installation/standalone/rendition/install). |

## Installation

### Download installation files

* Using the username and password beforehand provided (contact arender-sales@arondor.com if you want an access)
* Download the zip file:

[Download ARender Web-UI](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi-spring-boot-package/{{version}}/arondor-arender-hmi-spring-boot-package-{{version}}.zip)

* Extract the zip content in the folder of your choice. (Let's call it *[Web-UI-folder]*)
>The zip file contain web-ui service installation script but also removal and startup scripts

### Start ARender Web-UI

* Open a console and start ARender Web-UI with the command below 

:::tip
java -jar [Web-UI-folder]/arondor-arender-hmi-spring-boot-{{version}}.jar
:::

## Open a browser new window

:::tip
Access to `http://localhost:8080` via a web browser.
:::

![DefaultDocument](pathname:///img/arender/arenderDefaultDocumentV5.png)

:::note
The URL to use should be built like this: `http://{Web-UI-HostName}:{port-Web-UI}/{ARenderContext}`:
- *`{Web-UI-HostName}`*: the host name of the application server
- *`{port-Web-UI}`*: the application server port
:::
  
### No local Rendition up&running

You may have encountered the below error notification.

![DefaultDocument-KO](pathname:///img/arender/arenderDefaultDocumentV5-ko.png)

It may mean that:
* Either the local Rendition is not installed/started
  * In that case please go back to the following documentation [the Rendition installation documentation](/docs/arender/installation/standalone/rendition/install).
* Either the Rendition is installed on another server
  * In that case, please check to the documentation about **arender.server.rendition.hosts** property here: [ARender Web-UI configuration](/docs/arender/installation/standalone/web-ui/configuration).

## Install ARender Web-UI as a service

* Open a console with **Administrator rights**,
* Go to the *[Web-UI-folder]*
* Execute the right installation script like below:

<Tabs>
<TabItem value="win" label="Windows">

```cmd
$> .\ARenderHmiService-install.bat
```

</TabItem>
<TabItem value="lin" label="Linux">

```bash
$> ./ARenderHmiService-install.sh
```

</TabItem>
</Tabs>
    
The service named **ARenderHMIService** should be created and started on port 8080.