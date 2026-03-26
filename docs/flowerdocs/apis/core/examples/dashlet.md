---
title: Dashlet preferences
description: Manage user dashlet preferences
sidebar_position: 25
date: "2018-04-02T12:20:01+01:59"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The dashlet preferences service allows managing dashboard widgets (dashlets) for users.

# Get dashlets for current user

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/preferences/dashlets" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Get dashlets for specific authorities

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <AUTHORITIES>  user or group identifiers (comma-separated)
curl -X GET "<CORE_HOST>/rest/preferences/dashlets/users/<AUTHORITIES>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Create a dashlet

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X POST "<CORE_HOST>/rest/preferences/dashlets" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "My Documents",
  "type": "SEARCH",
  "configuration": {
    "searchId": "mySearchId",
    "maxResults": 10
  }
}'
```

  </TabItem>
</Tabs>

# Update a dashlet

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         dashlet identifier
curl -X POST "<CORE_HOST>/rest/preferences/dashlets/<ID>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "My Updated Documents",
  "type": "SEARCH",
  "configuration": {
    "searchId": "mySearchId",
    "maxResults": 20
  }
}'
```

  </TabItem>
</Tabs>

# Delete dashlets

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        dashlet identifiers (comma-separated)
curl -X DELETE "<CORE_HOST>/rest/preferences/dashlets/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>