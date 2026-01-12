---
title: Scope management
description: "Recover information, delete from your scopes"
date: "2023-06-22T12:00:00+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 54fb2e279f09bad8d99b797497a673ec0356cedbddb41346a71dda98954a937a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `ScopeService` service displays the following operations:

- `get`: to retrieve information from a scope

# Scope fetch

The example below shows how to retrieve information from a scope.

<Tabs>
  <TabItem value="update-rest" label="Update - REST">

```http
GET {{core}}/rest/scope/{idScope} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
idScope: Identifier of scope to be recovered

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="update-java" label="Update - Java">

```Java
@Autowired
    private ScopeService scopeService;

    public List<Scope> get() throws TechnicalException, FunctionalException

		List<Id> ids = Lists.newArrayList(new Id("scopeId"));
		return service.get(ids);

```

  </TabItem>
</Tabs>
