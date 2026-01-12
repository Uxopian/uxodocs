---
title: Minimum configuration
date: "2001-03-28T12:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 93078cc327e30c8c9d25606a3be5f11b5b3e6edba179c835263f026a42ee842a
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
