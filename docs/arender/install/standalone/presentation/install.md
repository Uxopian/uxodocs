---
title: "Installation"
last_update:
  date: '2026-02-02T12:23:28.934Z'
  author: CI/CD Bot
content_hash: b20f2dd65b8437ad0cd876806aff48748f9eff2eaf478b536c9595047e87574c
---

Below a standalone installation of the ARender HMI. For installation on ECM systems, you can skip this page.

## Prerequisites

The only requirement: a valid JDK or JRE (see [Requirement](requirements.md)). Here we will use Apache Tomcat 9.0.21

* Download the last version of ARender HMI : [ARender HMI VERSION ↓](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi/VERSION/arondor-arender-hmi-VERSION.war)

## Deploy ARender HMI

### Move ARender WAR file

Move the WAR to the **webapps** folder of the tomcat application server in order to have the below structure

* Tomcat 9.0
    * bin
    * ...
    * webapps
        * arondor-arender-hmi-VERSION

### Start the application server

Start the application server using the **startup.bat** script located in the *bin* folder of Tomcat.

### Open a browser new window

:::note
Access to [http://localhost:8080/arondor-arender-hmi-VERSION/](http://localhost:8080/arondor-arender-hmi-VERSION/) via a web browser.
:::

![DefaultDocument](/img/arender/arenderDefaultDocument.png)

:::note
The URL to use should be built like this: `http://{hmiHostName}:{portHMI}/{ARenderContext}/`:

- `{hmiHostName}`: the host name of the application server
- `{portHMI}`: the application server port
- `{ARenderContext}`: the root context of the HMI in the application server

:::