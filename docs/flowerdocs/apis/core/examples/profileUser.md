---
title: "Recover users’ profiles"
description: "Search for user profiles"
date: "2018-04-02T12:20:31+01:58"
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

```http
GET {{core}}/rest/profiles/{profiles}/users/{username}?max={max} HTTP/1.1
-- URL parameters --
core: FlowerDocs Core host
profiles: profile (team)
username: identifier to search
max: 1, maximum number of results returned (optional) 
-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private ProfileUserRestController profileUser;
@GetMapping
public List<User> search() throws TechnicalException, FunctionalException

	String[] profiles = {"ALL_USERS"};
	String id = "example";
	int max = 1;
	return profileUser.search(profiles, id, max);

```

  </TabItem>
</Tabs>
