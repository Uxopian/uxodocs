---
title: Minimum configuration
date: "2001-03-28T12:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 384d2afda6ca16468113662907aae6a491ac5271acdc86ad473f213e098a56d2
---

:::info
This documentation is based on the `${FD_HOME}` folder, which contains the application configuration files.
:::

# **FlowerDocs Core**

All properties used to configure **FlowerDocs Core** must be added to a `core.properties` file located in the `${FD_HOME}` directory.  
This file is loaded when the JVM is started up, so modifications are only taken into account after the application server has been restarted.

```properties
file.dir=C:\\FlowerDocs\\Files\\
```

# **FlowerDocs GUI**

All properties used to configure **FlowerDocs GUI** must be added to a `core.properties` file located in the `${FD_HOME}` directory.  
This file is loaded when the JVM is started up, so modifications are only taken into account after the application has been restarted.

```properties
ws.url=http://<flower host>:<flower port>/<flower context path>/services
arender.rendition.nodes=http(s)://rendition-host:8761
```
