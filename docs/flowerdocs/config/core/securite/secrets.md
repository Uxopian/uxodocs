---
title: Secrets
sidebar_position: 5
description: To keep secrets secret
date: "2019-06-03T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 4fe83cbab1485bbc0e7783cdb50e9babc10d73fe84478d9765077a5b9322fd61
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

It is not advisable to store passwords in clear text in configuration files. To avoid storing secrets in clear text in the `core.properties` and `gui.properties` files, FlowerDocs provides a secret encryption mechanism.

<br/>

To indicate to FlowerDocs that a property value is encrypted, it must be defined as `ENC(<encrypted value>)`. An encrypted property is decrypted at application startup using its main secret (`secret`). In this way, a different cipher can be defined for each application.

_The application cannot be started if a property, indicated as encrypted, cannot be decrypted._

<br/>

Property encryption can be achieved in several ways, starting with a master secret:

<Tabs>
  <TabItem value="curl" label="Curl">

```curl
curl -X POST \
  <core>/rest/encrypt \
  -H 'token: <token>' \
  -d {{toEncrypt}}
```

  </TabItem>
</Tabs>


:::info
With this method, we recommend setting the properties `token.key` and `system.admin.password` as a minimum.

This recommendation also applies to components developed around the FlowerDocs ecosystem: GUI plugins and operation handlers.
:::

The secret for each application can be defined in different ways:

- as an environment variable: the name is `secret` and the value is `,<secret>`, the machine must be rebooted to take effect
- as a property of the JVM by adding: `--secret=<secret>` when running the application
- in the `core.properties` and `gui.properties` files (_not recommended_)

The secret declared in system variables takes precedence over the one defined in the properties file.
