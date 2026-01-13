---
title: Launch
date: "2000-03-29T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5536af8e7ee36f81c614d1da8b834da6b47c238fca2aa3638fb5931b3f452f99
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual launch

To manually launch the **FlowerDocs GUI**, **FlowerDocs Core** and applications, simply issue the following commands:

<Tabs>
  <TabItem value="gui" label="GUI">

```bash
./flower-docs-gui-webapp-.jar
```

  </TabItem>
  <TabItem value="arender-hmi" label="ARender HMI">

```bash
./arondor-arender-hmi-spring-boot-.jar
```

  </TabItem>
</Tabs>


# Installation in service

## Linux

FlowerDocs applications can be installed simply as a Linux service `init.d` or `systemd`.

In this section, it is assumed that the JARs `flower-docs-gui-webapp-.jar`, `flower-docs-core-webapp-.jar` and `arondor-arender-hmi-spring-boot-.jar` are placed in the `/opt/flowerdocs` folder. This folder is also used as a configuration directory.

### Service init.d

To install FlowerDocs applications as an `init.d` service, simply create a symbolic link in the `/etc/init.d` directory:

<Tabs>
  <TabItem value="gui" label="GUI">

```bash
chmod +x /opt/flowerdocs/flower-docs-gui-webapp-.jar
ln -s /opt/flowerdocs/flower-docs-gui-webapp-.jar /etc/init.d/gui
```

  </TabItem>
</Tabs>

With this type of service, the user to whom the JAR belongs is used to run the application.
One log file per application is stored in the `/var/log` directory.

So that the service starts automatically when the system is booted:

<Tabs>
  <TabItem value="gui" label="GUI">

```bash
update-rc.d gui defaults
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
  <TabItem value="gui" label="GUI">

````service
[Unit]

```properties
Description=**FlowerDocs GUI**
After=syslog.target
````

[Service]

```properties
User=flowerdocs
ExecStart=/opt/flowerdocs/flower-docs-gui-webapp-.jar
SuccessExitStatus=143
```

[Install]
WantedBy=multi-user.target

````

  </TabItem>
</Tabs>


To have the service started automatically by `systemd`, run the following commands:


<Tabs>
  <TabItem value="gui" label="GUI">

```bash
systemctl enable gui.service
````

  </TabItem>
  <TabItem value="core" label="Core">

```bash
systemctl enable core.service
```

  </TabItem>
  <TabItem value="arender-hmi" label="ARender HMI">

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
  <TabItem value="gui" label="GUI">

```bash
service gui start
```

  </TabItem>
</Tabs>


Other standard commands are also supported: `status`, `stop` or `restart`.
