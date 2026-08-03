---
title: Sign in
sidebar_position: 2
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 01da59ac2f0ff6aefdf84f9c2f453325d3214894b1e6941c2b542fef31d17fb3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `authentication` service generates a user token for a given scope.

## Example
The example below shows how to generate a user token.
<Tabs>
  <TabItem value="authentication___rest" label="Authentication - REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL

curl -X POST "<CORE_HOST>/rest/authentication" \
  -H "Content-Type: application/json" \
  -d '{
  "password": "pwd",
  "scope": "TEST",
  "user": "user"
}'
```

  </TabItem>
  <TabItem value="authentication___java" label="Authentication - Java">

```java
@Autowired
private Authenticator authenticator;

public void authenticateToScope(String scopeId) throws TechnicalException, FunctionalException
{
    authenticator.authenticate(scopeId);
}
```

  </TabItem>
</Tabs>
