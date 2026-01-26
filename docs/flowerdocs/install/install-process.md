---
title: Installation process
sidebar_position: 3
date: "2000-03-29T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 096a5378d335c78edd5425669553c21392b26823843b57686b1d4943dc8b3165
---

:::info
This section describes how to install the **FlowerDocs GUI**, **FlowerDocs Core** and applications.
:::

In the rest of this page, `${APP_HOME}` corresponds to the folder in which each application will be deployed.

<br/>
 
# **FlowerDocs GUI**

- After completing the downloads mentioned in the prerequisites, place the `flower-docs-gui-webapp-.jar` application in the `${APP_HOME}` folder.
- Add `application.properties` file with the following properties:

```javascript
spring.task.execution.pool.core-size=16
spring.task.execution.pool.max-size=16
spring.task.execution.thread-name-prefix=flowerdocs-async-
```

- Add the `gui.properties` configuration file to `${APP_HOME}`.

#

- After completing the downloads mentioned in the prerequisites, place the `arondor-arender-hmi-spring-boot-.jar` application in the `${APP_HOME}` folder.
- Create the folders `${APP_HOME}/configurations` and `${APP_HOME}/lib`.
- Add the `arender-custom-server.properties` configuration file to `${APP_HOME}/configurations`.
- Add ARender FlowerDocs connector `flower-docs-arender-hmi-.jar` to `${APP_HOME}/lib`.

For high availability, it is necessary to activate session affinity on each HMI.

Please note that Hazelcast in ARenderHMI with FlowerDocs is not functional and should not be activated.

# **FlowerDocs Core**

- After completing the downloads mentioned in the prerequisites, place the `flower-docs-core-webapp-.jar` application in the `${APP_HOME}` folder.
- Add the `core.properties` configuration file to `${APP_HOME}`.
