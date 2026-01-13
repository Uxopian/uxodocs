---
title: Encrypting a character string
description: Encrypt your passwords and sensitive data
date: "2001-03-30T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f302d161e62be40800509a5e808ff52a5f64274c7e081286cd2890a73fe6bacb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Encryption` service displays the encryption operation of `character strings`.

# Data Encryption

The examples below show how to secure a character string using the `post` operation.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/encrypt/ HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
message: character string to be encrypted, enclosed in double quotes

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private StringEncryptor encryptor;

@PostMapping
public String encrypt()

	return encryptor.encrypt("password");

```

  </TabItem>
</Tabs>
