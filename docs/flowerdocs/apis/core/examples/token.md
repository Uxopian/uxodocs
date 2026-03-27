---
title: Managing authentication tokens
sidebar_position: 39
description: Generate and validate your tokens
date: "2018-06-21T09:40:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 1d3a7f4b375d5c46e3cc75dcbbba52f8c6b6891d70398c5dcad2e2ba7f2e7612
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

```bash
# <CORE_HOST>       FlowerDocs Core base URL
# <TOKEN>           authentication token
# <VALIDITY_TIME>   token validity in seconds

curl -X POST "<CORE_HOST>/rest/token/user?validityTime=<VALIDITY_TIME>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TokenService tokenService;

public String generateToken(long validityTime) throws FunctionalException, TechnicalException
{
	return service.generate(validityTime);
}
```

  </TabItem>
</Tabs>

## Generate a new token

The example below generates a new token for the authenticated user.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X PUT "<CORE_HOST>/rest/token/user" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TokenService tokenService;

public String generateToken() throws FunctionalException, TechnicalException
{
	return service.generate();
}
```

  </TabItem>
</Tabs>

:::warning
Token generation endpoints ending with `/token` are deprecated since version 2025.2.0 because they do not return an expiration date.
:::

## Generate a token to access documents

The example below generates a new token for the authenticated user to access a list of specific documents.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>      FlowerDocs Core base URL
# <TOKEN>          authentication token
# <DOCUMENT_IDS>   document identifiers for which to generate the token
# <READ_ONLY>      true or false for read-only or non-read-only access

curl -X POST "<CORE_HOST>/rest/token/document/<DOCUMENT_IDS>?readOnly=<READ_ONLY>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TokenService tokenService;

public String generateForDocuments(List<id> ids, boolean readOnly) throws FunctionalException, TechnicalException
{
	return service.generateForDocuments(ids, readOnly);
}
```

  </TabItem>
</Tabs>


# Token validation

The example below shows how to validate a token.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>            FlowerDocs Core base URL
# <TOKEN>                authentication token
# <TOKEN_TO_VALIDATE>    the token to validate

curl -X POST "<CORE_HOST>/rest/token/<TOKEN_TO_VALIDATE>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
@Autowired
private TokenService tokenService;

public String validateToken(String token) throws FunctionalException, TechnicalException
{
	return service.validate(token);
}
```

  </TabItem>
</Tabs>