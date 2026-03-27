---
title: Recover users' profiles
description: Search for user profiles
sidebar_position: 33
date: "2018-04-02T12:20:31+01:58"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: eb65d520257ebcb12f98d0bbbb868c45f0af4da1d049fd2354474b1a5e4d4e13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `ProfileUserRestController` service displays the following operations:
* `search`: to search for user profiles
# Search user profile
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