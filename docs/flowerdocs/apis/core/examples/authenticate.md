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
