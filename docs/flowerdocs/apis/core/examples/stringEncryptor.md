---
title: "Encrypting a character string"
description: "Encrypt your passwords and sensitive data"
date: "2001-03-30T13:20:01+02:00"
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
