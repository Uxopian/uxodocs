---
title: Managing authentication tokens
description: Generate and validate your tokens
date: "2018-06-21T09:40:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 1ed25f8bf0402d2200a66c55f4c853e43fdd43d91f2337a7cd2785983d7e0f08
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `token` service can be used to generate a token for specific documents, or to extend the life of a token.

# Token generation

The examples below show how to generate user tokens.

## Generate a token with a specific lifetime

The example below shows how to generate a token with a configurable lifetime for the authenticated user.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/token/user?validityTime={validityTime} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
validityTime: token validity in seconds

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private TokenService tokenService;

	public String generateToken(long validityTime) throws FunctionalException, TechnicalException

		return service.generate(validityTime);

```

  </TabItem>
</Tabs>

## Generate a new token

The example below generates a new token for the authenticated user.

<Tabs>
  <TabItem value="rest" label="REST">

```http
PUT {{core}}/rest/token/user HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private TokenService tokenService;

	public String generateToken() throws FunctionalException, TechnicalException

		return service.generate();

```

  </TabItem>
</Tabs>

Token generation endpoints ending with `/token` are deprecated since version 2025.2.0 because they do not return an expiration date.

## Generate a token to access documents

The example below generates a new token for the authenticated user to access a list of specific documents.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/token/document/{ids}?readOnly={readOnly} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
ids: document identifiers for which to generate the token
readOnly: true or false for read-only or non-read-only access

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private TokenService tokenService;

	public String generateForDocuments(List<id> ids, boolean readOnly) throws FunctionalException, TechnicalException

		return service.generateForDocuments(ids, readOnly);

```

  </TabItem>
</Tabs>

# Token validation

The example below shows how to validate a token.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/token/{tokenToValidate} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
tokenToValidate: the token to validate

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="Java">

```Java
@Autowired
	private TokenService tokenService;

	public String validateToken(String token) throws FunctionalException, TechnicalException

		return service.validate(token);

```

  </TabItem>
</Tabs>
