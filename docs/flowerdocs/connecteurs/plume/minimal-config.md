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
This documentation describes the various connectors available for Plume. At the very least, you need to enable one.
The properties below are provided like any other Plume property, as described in the [installation](/docs/flowerdocs/connecteurs/plume/install) section: in an `application.properties` file placed in the directory Plume is started from or in its `config` subdirectory, as JVM properties or as environment variables.
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

| Property                  | Default | Description                                                                                  |
| ------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `smtp.enabled`            | `false` | Activates the SMTP connector                                                                 |
| `smtp.host`               |         | Host name of the SMTP server. Mandatory when the connector is activated                      |
| `smtp.port`               | `465`   | Port of the SMTP server                                                                      |
| `smtp.username`           |         | User name used to authenticate on the SMTP server                                            |
| `smtp.password`           |         | Password used to authenticate on the SMTP server                                             |
| `smtp.auth`               | `true`  | Authenticates on the SMTP server with `smtp.username` and `smtp.password`                    |
| `smtp.debug`              | `false` | Writes the SMTP exchanges to the standard output                                             |
| `smtp.parameters.<name>`  |         | Additional mail session parameter, passed as `mail.smtp.<name>`                              |

`smtp.host` has no default value: if `smtp.enabled=true` and `smtp.host` is not set, Plume refuses to start with the following message:

```
The SMTP connector is enabled (smtp.enabled=true) but no mail server is configured: set the 'smtp.host' property, or disable the connector.
```

If `smtp.auth=true` and `smtp.username` is not set, a warning is logged at startup.

The transport security depends on the port of the SMTP server, and the two modes below cannot be combined:

- Implicit TLS, usually on port `465`: set `smtp.parameters.ssl.enable=true`

    ```properties
    smtp.enabled=true
    smtp.host=smtp.example.com
    smtp.port=465
    smtp.username=no-reply@example.com
    smtp.password=***
    smtp.parameters.ssl.enable=true
    ```

- STARTTLS, usually on port `587`: set `smtp.parameters.starttls.enable=true`

    ```properties
    smtp.enabled=true
    smtp.host=smtp.example.com
    smtp.port=587
    smtp.username=no-reply@example.com
    smtp.password=***
    smtp.parameters.starttls.enable=true
    ```

:::warning
Without any of these parameters, the connection is not encrypted. On a port that expects implicit TLS, such as the default port `465`, sending an e-mail then hangs.
:::

You can add other parameters to the SMTP connector by adding properties `smtp.parameters.<name>=<value>`: each one is passed to the mail session as `mail.smtp.<name>`.

At startup, Plume logs the SMTP configuration it actually applies: host, port, user name, authentication, debug mode and additional parameters, with the password masked.

## HMI activation

To activate Plume in ARender, you need to :

- Add the `plume.enabled` property to the profile supplied to ARender

```properties
	gui.client.arender.profile=arender&plume.enabled=true
```

- Configure Plume as a **FlowerDocs GUI** plugin:

```properties
	plugins.routes.plume.path=/plume/**
	plugins.routes.plume.url=http://<plume-host>:3006/plume
```

Plume listens on port `3006` by default, under the `/plume` path. To use another port, set the `port` property when starting Plume.

For more information on the use of **FlowerDocs GUI** plug-ins, see the documentation [here](/docs/flowerdocs/config/gui/plugins).
