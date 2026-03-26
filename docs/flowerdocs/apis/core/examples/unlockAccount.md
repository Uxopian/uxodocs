---
title: Unlock account
description: Unlock a locked user account
sidebar_position: 37
date: "2018-05-02T12:20:01+02:00"
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