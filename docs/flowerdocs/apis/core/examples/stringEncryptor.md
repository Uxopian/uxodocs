---
title: Encrypting a character string
sidebar_position: 5
description: Encrypt your passwords and sensitive data
date: "2001-03-30T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: c8f68dc80b6975c330eff0bfc1a48f85e53bfc1b4c2cab1396d10c98d741674b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Encryption` service displays the encryption operation of `character strings`.


# Data Encryption

The examples below show how to secure a character string using the `post` operation.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <MESSAGE>    character string to be encrypted, enclosed in double quotes

curl -X POST "<CORE_HOST>/rest/encrypt/" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '"<MESSAGE>"'
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private StringEncryptor encryptor;

@PostMapping
public String encrypt()
{
	return encryptor.encrypt("password");
}
```

  </TabItem>
</Tabs>