---
title: Sign in
sidebar_position: 2
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 5c4c14a3e87f8e4dcfccc41f56f39df16ea44e2b9f3b2a852125f0956af7630d
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `authentication` service generates a user token for a given scope.

# Example
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