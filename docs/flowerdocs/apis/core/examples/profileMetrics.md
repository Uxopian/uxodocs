---
title: Profile metrics
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Retrieve and manage login metrics per profile
sidebar_position: 29
date: "2018-04-02T12:20:01+01:59"
content_hash: 09f28e0ce059a9f1273cda56e283b322f1ca1c3189258bfd87a1c3d8a5b38061
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The profile metrics service allows tracking login history and user activity per profile.

# Get login history

Retrieve the login history for a specific profile within a date range.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <PROFILE>    profile name
# <START>      start date (epoch milliseconds)
# <END>        end date (epoch milliseconds)
curl -X GET "<CORE_HOST>/rest/metrics/profiles/<PROFILE>?start=<START>&end=<END>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Count unique users

Retrieve the count of unique users who logged in for a specific profile within a date range.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <PROFILE>    profile name
# <START>      start date (epoch milliseconds)
# <END>        end date (epoch milliseconds)
curl -X GET "<CORE_HOST>/rest/metrics/profiles/<PROFILE>/count?start=<START>&end=<END>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Store login record

Record a login event for metrics tracking.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/metrics/profiles" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Clear history

Delete login history records within a date range.

:::warning
This operation permanently deletes login history records. This action cannot be undone.
:::

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <START>      start date (epoch milliseconds)
# <END>        end date (epoch milliseconds)
curl -X DELETE "<CORE_HOST>/rest/metrics/profiles?start=<START>&end=<END>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>