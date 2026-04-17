---
title: Installation process
sidebar_position: 3
date: "2000-03-29T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 6ad151d0e56c88bfb1340fab2f27f7a251854cea3c7828775d4753bb2cfbd042
---

:::info
This section describes how to install the **FlowerDocs GUI**, **FlowerDocs Core** and **ARender HMI** applications.
:::

In the rest of this page, `${APP_HOME}` corresponds to the folder in which each application will be deployed.

<br/>
 
# **FlowerDocs GUI**

- After completing the downloads mentioned in the prerequisites, place the `flower-docs-gui-webapp-{{version}}.jar` application in the `${APP_HOME}` folder.
- Add the `gui.properties` configuration file to `${APP_HOME}`.

# **ARender HMI**

- After completing the downloads mentioned in the prerequisites, place the `arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar` application in the `${APP_HOME}` folder.
- Create the folders `${APP_HOME}/configurations` and `${APP_HOME}/lib`.
- Add the `arender-custom-server.properties` configuration file to `${APP_HOME}/configurations`.
- Add ARender FlowerDocs connector `flower-docs-arender-hmi-{{version}}.jar` to `${APP_HOME}/lib`.

For high availability, it is necessary to activate session affinity on each HMI.

Please note that Hazelcast in ARenderHMI with FlowerDocs is not functional and should not be activated.

# **FlowerDocs Core**

- After completing the downloads mentioned in the prerequisites, place the `flower-docs-core-webapp-{{version}}.jar` application in the `${APP_HOME}` folder.
- Add the `core.properties` configuration file to `${APP_HOME}`.
