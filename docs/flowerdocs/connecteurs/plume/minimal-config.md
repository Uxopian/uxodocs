---
title: Minimum configuration
sidebar_position: 3
date: "2001-03-28T14:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 9e14904fbd7cc531368dad5a35f35a5629d1803f9b9bfc263a15a23370dcd67f
---

:::info
This documentation describes the various connectors available for Plume. At the very least, you need to define one in the `plume.properties` file in the `plume.config.dir` folder entered in the previous section.
:::

The sender of the e-mail is indicated by the `email.from` property, with a default value of `plume@arondor.com`.

# Connectors

## FlowerDocs

The FlowerDocs connector lets you store emails written with Plume in FlowerDocs.
To activate it, add the `flower.enabled=true` property.

In addition, the `flower.url` property must be filled in with the URL of FlowerDocs web services.

```properties
flower.enabled=true
flower.url=http://&lt;host&gt;:&lt;port&gt;/<Core path>/services
```

## SMTP

The SMTP connector allows you to send an e-mail written in Plume using the SMTP protocol.
To activate this connector, add the property `smtp.enabled=true`

```properties
smtp.enabled=true
smtp.host=SSL0.OVH.NET
smtp.username=no-reply@flowerdocs.com
smtp.password=***
smtp.parameters.socketFactory.port=465
smtp.parameters.socketFactory.class=javax.net.ssl.SSLSocketFactory
smtp.parameters.starttls.enable=true
```

You can add parameters to the SMTP connector by adding properties `smtp.parameters.&lt;name&gt;=&lt;value&gt;`.

# HMI activation

To activate Plume in ARender, you need to :

- Add the `plume.enabled` property to the profile supplied to ARender

```properties
	gui.client.arender.profile=arender&plume.enabled=true
```

- Configure Plume as a **FlowerDocs GUI** plugin:

```properties
	plugins.routes.plume.path=/plume/**
	plugins.routes.plume.url=http://localhost:8080/plume
```

For more information on the use of **FlowerDocs GUI** plug-ins, see the documentation [here](/docs/flowerdocs/config/gui/plugins).
