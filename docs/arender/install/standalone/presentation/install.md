---
title: "Installation"
sidebar_position: 4
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: 5de059461816db0e4adbd35424261d8fdf203aea72a79c2f513fb37bddc28f7a
---

Below a standalone installation of the ARender HMI. For installation on ECM systems, you can skip this page.

## Prerequisites

The only requirement: a valid JDK or JRE (see [Requirement](requirements.md)). Here we will use Apache Tomcat 9.0.21

* Download the last version of ARender HMI : [ARender HMI 4.8.21 ↓](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi/4.8.21/arondor-arender-hmi-4.8.21.war)

## Deploy ARender HMI

### Move ARender WAR file

Move the WAR to the **webapps** folder of the tomcat application server in order to have the below structure

* Tomcat 9.0
    * bin
    * ...
    * webapps
        * arondor-arender-hmi-4.8.21

### Start the application server

Start the application server using the **startup.bat** script located in the *bin* folder of Tomcat.

### Open a browser new window

:::note
Access to [http://localhost:8080/arondor-arender-hmi-4.8.21/](http://localhost:8080/arondor-arender-hmi-4.8.21/) via a web browser.
:::

![DefaultDocument](pathname:///img/arender/arenderDefaultDocument.png)

:::note
The URL to use should be built like this: `http://{hmiHostName}:{portHMI}/{ARenderContext}/`:

- `{hmiHostName}`: the host name of the application server
- `{portHMI}`: the application server port
- `{ARenderContext}`: the root context of the HMI in the application server

:::