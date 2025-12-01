---
title: Content storage
description: Manage document content storage
date: '2003-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: b85c294f1ad13ea67faaed9d53a19eb44fab88c4ad46e4bbc149bafa1251f634
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The OpenSearch connector provides two types of storage for document content (or files).

## File system

This connector enables files to be stored on a file system considered local by the JVM (local, NFS, etc.).
The directory used can be configured: 

<Tabs>
  <TabItem value="linux" label="Linux">

```yaml
file.dir=/opt/FlowerDocs/Files/
```

  </TabItem>
</Tabs>
 


## Amazon S3

The Amazon S3 connector stores document content in an S3 bucket.
To use this connector, the following configuration is required:

```properties
core.services.file.dao=s3
s3.region=<region AWS>
```

__Amazon S3 client configuration__

| Property                     | Default value|Description                                                                         |
|-------------------------------|-------------------------------------------------------------------------------------|-------------------|
| s3.max.connections            |100 | Maximum number of open HTTP connections                                                     |       
| s3.max.error.retry            | 2 | Maximum number of retries for replayable requests (error 5xx)                 |
| s3.socket.timeout             | 100000|  Waiting time (in ms) for data to be transferred                             |


By default, the file containing the access and secret key pair must be located in the ``${USER_HOME}/.aws/credentials`` folder, and the ``default`` profile used. 

Another key file or profile can be used using the following parameters: 

```properties
s3.profile=<profile name>
s3.configFilePath=<path to directory>/<file with key>
```

AWS instance roles can be used by adding the following property: 

```properties
s3.instanceProfile=true
```

A single bucket can be used for all FlowerDocs scopes with the following configuration: 

```properties
s3.bucket.scoped=false
s3.bucketName=<bucket name>
```

	
