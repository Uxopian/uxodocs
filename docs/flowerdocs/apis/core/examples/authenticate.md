---
title: Sign in
date: "2001-03-28T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: f66054047b5202b28bfb43f334421f1e4323a9313360053beb7a805be68d7fbf
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
