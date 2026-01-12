---
title: Retrieve page content
description: Recover the HTML code of your pages
date: "2018-04-02T12:20:01+01:58"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 96637406dde83850f4d655d1ebf915e6986dd03c2e24b388ed7bf0541d4c8dc3
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
