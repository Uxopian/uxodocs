---
title: Minimum configuration
sidebar_position: 3
date: "2001-03-28T14:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: ec685656c67ff55306986a6eb9be8fed63fb8943e60e71a4e94ca6ca4cb94488
---

:::info
This documentation describes the connectors of Plume. Enable both the FlowerDocs and the SMTP connectors in the `application.properties` file described in the [installation](/docs/flowerdocs/connecteurs/plume/install) section.
:::

The sender of the e-mail is indicated by the `email.from` property, with a default value of `plume@arondor.com`.

## Connectors

### FlowerDocs

The FlowerDocs connector lets you store emails written with Plume in FlowerDocs.
To activate it, add the `flower.enabled=true` property.

In addition, the `flower.url` property must be filled in with the URL of FlowerDocs web services.

```properties
flower.enabled=true
flower.url=http://<host>:<port>/<Core path>/rest
```

### SMTP

The SMTP connector allows you to send an e-mail written in Plume using the SMTP protocol.
To activate this connector, add the property `smtp.enabled=true`

```properties
smtp.enabled=true
smtp.host=smtp.example.com
smtp.username=no-reply@example.com
smtp.password=***
smtp.parameters.ssl.enable=true
```

You can add parameters to the SMTP connector by adding properties `smtp.parameters.<name>=<value>`.

## HMI activation

To activate Plume in ARender, you need to :

- Add the `plume.enabled` property to the profile supplied to ARender

```properties
	gui.client.arender.profile=arender&plume.enabled=true
```

- Set the address of Plume in **FlowerDocs GUI**:

```properties
	gui.client.plume.url=http://<plume-host>:3006/plume
```
