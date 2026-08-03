---
title: Favorite preferences
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Manage user favorite components
sidebar_position: 27
date: "2018-04-02T12:20:01+01:59"
content_hash: f50017982833760c15ea55dacda7b837fd9fb709114e312f55880e29b7925f23
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The favorite preferences service allows managing favorite components (documents, folders, tasks, virtual folders) for users.

## Get favorites for current user

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X GET "<CORE_HOST>/rest/preferences/favorites" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Get favorites for specific authorities

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <AUTHORITIES>  user or group identifiers (comma-separated)
curl -X GET "<CORE_HOST>/rest/preferences/favorites/users/<AUTHORITIES>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Add a favorite

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
curl -X PUT "<CORE_HOST>/rest/preferences/favorites" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "documentId",
  "category": "DOCUMENT"
}'
```

  </TabItem>
</Tabs>

## Remove a favorite by reference

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <CATEGORY>   component category (DOCUMENT, FOLDER, TASK, VIRTUAL_FOLDER)
# <ID>         component identifier
curl -X DELETE "<CORE_HOST>/rest/preferences/favorites/reference/<CATEGORY>/<ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Delete favorites by ID

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        favorite identifiers (comma-separated)
curl -X DELETE "<CORE_HOST>/rest/preferences/favorites/<IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>
