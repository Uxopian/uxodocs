---
title: Retrieve page content
sidebar_position: 32
description: Recover the HTML code of your pages
date: "2018-04-02T12:20:01+01:58"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: d20981032d0035b6e99682da620741972c549ca6220e6db5d0c0ba8ec65016fd
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The PageService service lets you perform `showPublicPage` and `showPrivatePage` operations on your scope's pages.

* `showPublicPage` retrieves the HTML content of a public page.

* `showPrivatePage` retrieves the HTML content of a private page.

# Examples

The following examples show how to retrieve a public or private page from your scope.


<Tabs>
  <TabItem value="public" label="public">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <SCOPE>      the FlowerDocs scope
# <PATH>       the page to retrieve

curl -X GET "<CORE_HOST>/public/<SCOPE>/pages/<PATH>" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="private" label="private">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <SCOPE>      the FlowerDocs scope
# <PATH>       the page to retrieve

curl -X GET "<CORE_HOST>/private/<SCOPE>/pages/<PATH>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>