---
title: Retrieve page content
description: Recover the HTML code of your pages
date: "2018-04-02T12:20:01+01:58"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 2b8e1cda48ad213ed3727fa89ce6a2eaa099a28bf2857130d19056f85c60bb8a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The PageService service lets you perform `showPublicPage` and `showPrivatePage` operations on your scope's pages.

- `showPublicPage` retrieves the HTML content of a public page.

- `showPrivatePage` retrieves the HTML content of a private page.

# Examples

The following examples show how to retrieve a public or private page from your scope.

<Tabs>
  <TabItem value="public" label="public">

```http
GET {{core}}/rest/public/{scope}/pages/{path} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
scope: the FlowerDocs scope
path: the page to retrieve

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="private" label="private">

```http
GET {{core}}/rest/private/{scope}/pages/{path} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
scope: the FlowerDocs scope
path: the page to retrieve

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
</Tabs>
