---
title: Handling a temporary file
description: "Create, modify, delete temporary files"
date: "2001-04-15T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 06aa1fe08699e78dccefc4208f0c23dba8ef5f95d01a2b8b986b7729340988ee
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `TempFileService` service exposes the following operations:

- `create`: to create a temporary file
- `getContent`: to retrieve a temporary file
- `delete`: to delete a temporary file

# Creating a temporary file

The following examples show how to create a temporary file.

<br/>
CREATE:
<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/files/tmp HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
file: temporary file to create

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public DocumentFile create() throws TechnicalException, FunctionalException

	DocumentFile file = new DocumentFile();
    file.setId(new Id("MyFile"));
    file.setContent(new DataHandler(new FileDataSource(File.createTempFile("/tmp", ".txt"))));
	return tempFileService.create(file);

```

  </TabItem>
</Tabs>

# Recovering a temporary file

The following examples show how to recover a temporary file.

<br/>
GET CONTENT:
<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/files/tmp/{id} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: id of the temporary file

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public DocumentFile get() throws TechnicalException, FunctionalException

	Id id = new Id("MyFile");
	return tempFileService.get(id);

```

  </TabItem>
</Tabs>

# Deleting a temporary file

The following examples show how to delete a temporary file.

<br/>
DELETE :
<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/files/tmp/{id} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: id of the temporary file

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private TempFileService tempFileService;

public void delete() throws TechnicalException, FunctionalException

	Id id = new Id("MyFile");
	return tempFileService.delete(id);

```

  </TabItem>
</Tabs>
