---
title: Scope management
sidebar_position: 40
description: Recover information, delete from your scopes
date: "2023-06-22T12:00:00+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: dad99634f53ecd9655acc08dd2627203b6886313df7d481f63b5c3e84eb052c6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `ScopeService` service displays the following operations:

* `get`: to retrieve information from a scope

# Scope fetch

The example below shows how to retrieve information from a scope.

<Tabs>
  <TabItem value="update___rest" label="Update - REST">

```bash
# <CORE_HOST>   FlowerDocs Core base URL
# <TOKEN>       authentication token
# <ID_SCOPE>    identifier of scope to be recovered

curl -X GET "<CORE_HOST>/rest/scope/<ID_SCOPE>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="update___java" label="Update - Java">

```java
@Autowired
private ScopeService scopeService;

public List<Scope> get() throws TechnicalException, FunctionalException
{
	List<Id> ids = Lists.newArrayList(new Id("scopeId"));
	return service.get(ids);
}
```

  </TabItem>
</Tabs>