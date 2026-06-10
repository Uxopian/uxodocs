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

FlowerDocs applications can be installed simply as a Linux service `init.d` or `systemd`.

In this section, it is assumed that the JARs `flower-docs-gui-webapp-{{version}}.jar`, `flower-docs-core-webapp-{{version}}.jar` and `arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar` are placed in the `/opt/flowerdocs` folder. This folder is also used as a configuration directory.

### Service init.d

To install FlowerDocs applications as an `init.d`  service, simply create a symbolic link in the `/etc/init.d` directory: 

<Tabs>
<TabItem value="GUI" label="GUI">

```bash
chmod +x /opt/flowerdocs/flower-docs-gui-webapp-{{version}}.jar
ln -s /opt/flowerdocs/flower-docs-gui-webapp-{{version}}.jar /etc/init.d/gui
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
chmod +x /opt/flowerdocs/flower-docs-core-webapp-{{version}}.jar
ln -s /opt/flowerdocs/flower-docs-core-webapp-{{version}}.jar /etc/init.d/core
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
chmod +x /opt/flowerdocs/arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar
ln -s /opt/flowerdocs/arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar /etc/init.d/arender-hmi
```

</TabItem>
</Tabs>

With this type of service, the user to whom the JAR belongs is used to run the application. 
One log file per application is stored in the `/var/log` directory.

So that the service starts automatically when the system is booted: 

<Tabs>
<TabItem value="GUI" label="GUI">

```bash
update-rc.d gui defaults
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
update-rc.d core defaults
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
update-rc.d arender-hmi defaults
```

</TabItem>
</Tabs> 

If the service is not found, it may be necessary to run the following command:

```bash
systemctl daemon-reload
```

### Service systemd

To install FlowerDocs applications as a `systemd` service, the `gui.service`, `core.service` and `arender-hmi.service` scripts must be created in the `/etc/systemd/system` directory such as :

<Tabs>
<TabItem value="GUI" label="GUI">

```service
[Unit]
Description=FlowerDocs GUI
After=syslog.target

[Service]
User=flowerdocs
ExecStart=/usr/bin/java -jar /opt/flowerdocs/flower-docs-gui-webapp-{{version}}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="Core" label="Core">

```service
[Unit]
Description=FlowerDocs Core
After=syslog.target

[Service]
User=flowerdocs
ExecStart=/usr/bin/java -jar /opt/flowerdocs/flower-docs-core-webapp-{{version}}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```service
[Unit]
Description=ARender HMI
After=syslog.target

[Service]
User=flowerdocs
WorkingDirectory=/opt/ARender
ExecStart=/usr/bin/java -jar /opt/flowerdocs/arondor-arender-hmi-spring-boot-{{arenderVersion}}.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs> 

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

### JVM configuration

To configure the JVM of the application launched by the Linux service, you need to add a configuration file in the same directory as the JAR. 
This configuration file must have the same name as the JAR, with the extension `conf`.

### Commands

To start the services, simply issue the commands: 

<Tabs>
<TabItem value="GUI" label="GUI">

```bash
service gui start
```

</TabItem>
<TabItem value="Core" label="Core">

```bash
service core start
```

</TabItem>
<TabItem value="ARender HMI" label="ARender HMI">

```bash
service arender-hmi start
```

</TabItem>
</Tabs> 

Other standard commands are also supported: `status`, `stop` or `restart`.