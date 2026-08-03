---
title: Recover users' profiles
description: Search for user profiles
sidebar_position: 33
date: "2018-04-02T12:20:31+01:58"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: b6c9676958c2f4cf7ac8c973a4c2abec41ac724a08498d66c18b1228c414cd9c
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `ProfileUserRestController` service displays the following operations:
* `search`: to search for user profiles
## Search user profile
The example below shows how to perform a user profile search.
<br/>
SEARCH:
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>   FlowerDocs Core base URL
# <TOKEN>       authentication token
# <PROFILES>    profile (team)
# <USERNAME>    identifier to search
# <MAX>         maximum number of results returned (optional)

curl -X GET "<CORE_HOST>/rest/profiles/<PROFILES>/users/<USERNAME>?max=<MAX>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private ProfileUserRestController profileUser;
@GetMapping
public List<User> search() throws TechnicalException, FunctionalException
{
	String[] profiles = {"ALL_USERS"};
	String id = "example";
	int max = 1;
	return profileUser.search(profiles, id, max);
}
```

  </TabItem>
</Tabs>
