---
title: Handling a temporary file
description: "Create, modify, delete temporary files"
sidebar_position: 9
date: "2001-04-15T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: d1d80cf002a48ae32072acfe90d88cfa0496762789d9ead51ebf49c637f22145
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `TempFileService` service exposes the following operations:

* `create`: to create a temporary file
* `getContent`: to retrieve a temporary file
* `delete`: to delete a temporary file

# Creating a temporary file

The following examples show how to create a temporary file.

<br/>
CREATE:
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token

curl -X POST "<CORE_HOST>/rest/files/tmp" \
  -H "token: <TOKEN>" \
  -F "file=@/path/to/file"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public DocumentFile create() throws TechnicalException, FunctionalException
{
	DocumentFile file = new DocumentFile();
    file.setId(new Id("MyFile"));
    file.setContent(new DataHandler(new FileDataSource(File.createTempFile("/tmp", ".txt"))));
	return tempFileService.create(file);
}
```

  </TabItem>
</Tabs>

# Recovering a temporary file

The following examples show how to recover a temporary file.

<br/>
GET CONTENT:
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <FILE_ID>    identifier of the temporary file

curl -X GET "<CORE_HOST>/rest/files/tmp/<FILE_ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public DocumentFile get() throws TechnicalException, FunctionalException
{
	Id id = new Id("MyFile");
	return tempFileService.get(id);
}
```

  </TabItem>
</Tabs>

# Deleting a temporary file

The following examples show how to delete a temporary file.

<br/>
DELETE :
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <FILE_ID>    identifier of the temporary file

curl -X DELETE "<CORE_HOST>/rest/files/tmp/<FILE_ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public void delete() throws TechnicalException, FunctionalException
{
	Id id = new Id("MyFile");
	return tempFileService.delete(id);
}
```

  </TabItem>
</Tabs>