---
title: Launch
sidebar_position: 4
date: "2000-03-29T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: d2b6767d41c337a7fa02325fbafed8dd0991a42d738c197e99991a9d4000593f
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual launch

To manually launch the FlowerDocs GUI, FlowerDocs Core and ARender HMI applications, simply issue the following commands:

<Tabs>
<TabItem value="GUI" label="GUI">

```bash
java -jar flower-docs-gui-webapp-{{version}}.jar
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
java -jar flower-docs-core-webapp-{{version}}.jar
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
java -jar arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar
```

</TabItem>
</Tabs> 

# Installation in service

## Linux

FlowerDocs applications are installed as a Linux `systemd` service. Only `systemd`-based services are tested and supported.

In this section, it is assumed that the JARs `flower-docs-gui-webapp-{{version}}.jar`, `flower-docs-core-webapp-{{version}}.jar` and `arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar` are placed in the `/opt/flowerdocs` folder. This folder is also used as a configuration directory.

### Service systemd

To install FlowerDocs applications as a `systemd` service, the `gui.service`, `core.service` and `arender-hmi.service` scripts must be created in the `/etc/systemd/system` directory such as :

<Tabs>
<TabItem value="GUI" label="GUI">

```service
[Unit]
Description=flowerdocs-gui

[Service]
WorkingDirectory=/opt/flowerdocs
EnvironmentFile=-/opt/flowerdocs/flower-docs-gui-webapp-{{version}}.conf
ExecStart=/bin/bash -c 'exec java ${JAVA_OPTS} -jar /opt/flowerdocs/flower-docs-gui-webapp-{{version}}.jar ${RUN_ARGS}'
User=flowerdocs
Restart=always

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="Core" label="Core">

```service
[Unit]
Description=flowerdocs-core

[Service]
WorkingDirectory=/opt/flowerdocs
EnvironmentFile=-/opt/flowerdocs/flower-docs-core-webapp-{{version}}.conf
ExecStart=/bin/bash -c 'exec java ${JAVA_OPTS} -jar /opt/flowerdocs/flower-docs-core-webapp-{{version}}.jar ${RUN_ARGS}'
User=flowerdocs
Restart=always

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```service
[Unit]
Description=ARender HMI service

[Service]
User=flowerdocs
WorkingDirectory=/opt/ARender
ExecStart=java -jar /opt/ARender/arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs> 

### Environment file

The `JAVA_OPTS` (JVM options) and `RUN_ARGS` (application arguments) variables referenced in the unit files are defined in the `EnvironmentFile`. This file is placed in the same directory as the JAR, with the same name as the JAR and the `.conf` extension (for example `flower-docs-core-webapp-{{version}}.conf`).

:::warning
For the **FlowerDocs GUI**, the `--add-opens java.base/java.lang=ALL-UNNAMED` JVM option is required.
:::

<Tabs>
<TabItem value="GUI" label="GUI">

```properties
JAVA_OPTS="-Xmx2g --add-opens java.base/java.lang=ALL-UNNAMED"
RUN_ARGS=""
```

</TabItem>
<TabItem value="Core" label="Core">

```properties
JAVA_OPTS="-Xmx2g"
RUN_ARGS=""
```

</TabItem>
</Tabs> 

:::info
`RUN_ARGS` can hold additional application arguments (left empty here). Set `-Xmx` according to the RAM allocated to the component (see [Prerequisites](/docs/flowerdocs/install/prerequisites)).
:::

### Boot start

After creating or modifying the unit files, reload the `systemd` configuration:

```bash
systemctl daemon-reload
```

To have the service started automatically by `systemd`, run the following commands:


<Tabs>
<TabItem value="GUI" label="GUI">

```bash
systemctl enable gui.service
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
systemctl enable core.service
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
systemctl enable arender-hmi.service
```

</TabItem>
</Tabs> 

### Commands

To start the services, simply issue the commands: 

<Tabs>
<TabItem value="GUI" label="GUI">

```bash
systemctl start gui.service
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
systemctl start core.service
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
systemctl start arender-hmi.service
```

</TabItem>
</Tabs> 

Other standard commands are also supported: `status`, `stop` or `restart`.
