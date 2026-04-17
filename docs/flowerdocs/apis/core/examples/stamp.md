---
title: Stamp preferences
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Manage user stamp preferences
sidebar_position: 30
date: "2018-04-02T12:20:01+01:59"
content_hash: 3af087f417efcbdf3ca222dfa727254a315f2d9a9f8ab515892d17e7345d554a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The stamp preferences service allows managing stamps (signature images or annotations) for users.

# Get stamps for current user

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/preferences/stamps" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Get stamps for specific authorities

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <AUTHORITIES>  user or group identifiers (comma-separated)
curl -X GET "<CORE_HOST>/rest/preferences/stamps/users/<AUTHORITIES>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Create a stamp

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/preferences/stamps" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "My Signature",
  "type": "SIGNATURE",
  "content": "base64-encoded-image-data"
}'
```

  </TabItem>
</Tabs>

# Update a stamp

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         stamp identifier
curl -X POST "<CORE_HOST>/rest/preferences/stamps/<ID>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "My Updated Signature",
  "type": "SIGNATURE",
  "content": "base64-encoded-image-data"
}'
```

  </TabItem>
</Tabs>

# Delete stamps

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        stamp identifiers (comma-separated)
curl -X DELETE "<CORE_HOST>/rest/preferences/stamps/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>