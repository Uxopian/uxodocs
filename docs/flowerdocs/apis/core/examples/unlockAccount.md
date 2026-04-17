---
title: Unlock account
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Unlock a locked user account
sidebar_position: 37
date: "2018-05-02T12:20:01+02:00"
content_hash: 6a9f37285d72db09296537c17361b117a9c3aa11d59e725499c4f100271a987b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The unlock account service allows an administrator to unlock a user account that has been locked due to too many failed login attempts.

# Unlock an account

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <USERNAME>   username of the locked account
curl -X POST "<CORE_HOST>/rest/unlock/<USERNAME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>