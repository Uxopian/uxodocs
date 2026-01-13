---
title: Sign in
date: "2001-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 16298101fa0670e88b5e84623a3dc90c7a215924fc55ec8f147a2a3a0cc4ba73
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `authentication` service generates a user token for a given scope.

# Example

The example below shows how to generate a user token.
<Tabs>
<TabItem value="authentication-rest" label="Authentication - REST">

```http
POST {{core}}/rest/authentication HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host

-- Headers --
Content-Type: application/json

-- Body (json) --

    "password": "pwd",
    "scope”: "TEST",
    "user": "user"

```

  </TabItem>
  <TabItem value="authentication-java" label="Authentication - Java">

```Java
@Autowired
    private Authenticator authenticator;

    public void authenticateToScope(String scopeId) throws TechnicalException, FunctionalException

        authenticator.authenticate(scopeId);

```

  </TabItem>
</Tabs>
