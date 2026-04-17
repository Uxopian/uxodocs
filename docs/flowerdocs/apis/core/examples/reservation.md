---
title: Reserve components
sidebar_position: 4
description: Reserve your components
date: "2001-03-30T13:10:02+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 4771af128eda1b42f1777b513801c3f5cdae3f767621acd0b8e59e4b7fe24931
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Reservation` service exhibits all the operations available around various components reservation.


# Component reservation

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/reservation/reserve" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "category": "DOCUMENT",
    "id": "componentId"
  }
]'
```

  </TabItem>
</Tabs>

# Component release

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/reservation/release" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "category": "DOCUMENT",
    "id": "componentId"
  }
]'
```

  </TabItem>
</Tabs>

# Reservation recovery

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/reservation" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "category": "DOCUMENT",
    "id": "componentId"
  }
]'
```

  </TabItem>
</Tabs>
