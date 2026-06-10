---
title: GUI configuration
sidebar_position: 1
date: "2000-03-30T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 7955344c60611e5a8b9352df2c2e49f69cb59558fead0af3a6c15f2b9f7bca5b
---

This section describes the various FlowerDocs GUI configurations to be defined in the application's `gui.properties` file.

# General

| Property                    | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| system.admin.username       | System admin username                                            |
| system.admin.password       | System account password, can be encrypted with a secret          |
| token.key                   | Token shared between **FlowerDocs Core**, **FlowerDocs GUI** and **ARender HMI**|
| secret                      | Secret used to encode password _(optional)_                      |
| gui.context                 | Application context                                              |
| gui.password.change.enabled | Enables password modification on login page                      |
| gui.client.arender.url      | ARender HMI URL                                                  |
| scope.edit                  | Allow to select the target scope on the login page               |
| gui.session.timeout         | User session validity time in seconds                            |
| ws.url                      | **FlowerDocs Core** REST URL (e.g. `http://localhost:8081/core/rest`) |

# Logging

| Property           | Description                                 |
| ------------------ | ------------------------------------------- |
| logging.file.name  | Log file path and name                      |
| logging.level.root | Log level: `WARN`, `ERROR`, `INFO`, `DEBUG` |

# Redis

| Property    | Description                                       |
| ----------- | ------------------------------------------------- |
| redis.nodes | Addresses of the various Redis separated by a `,` |

It is not recommended to modify Arender properties by setting parameters in the `gui.properties` file. Properties that are not defined in the documentation are not qualified by FlowerDocs: the correct operation of the application is therefore not guaranteed with these modifications.
