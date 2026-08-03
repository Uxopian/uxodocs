---
title: Encrypting a character string
sidebar_position: 5
description: Encrypt your passwords and sensitive data
date: "2001-03-30T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 355e0e98d22e15c9473f622240bde1c23110141590301cac338bcca286c83ef1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Encryption` service displays the encryption operation of `character strings`.


## Data Encryption

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
