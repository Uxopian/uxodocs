---
sidebar_position: 3
title: Credentials
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: fd5f90f9fe24de0ba238fa8abb4843a90ab28b3b7926b5fdd58df16c4dafc42a
---

## AWSConnectionProvider <small> - AWS S3 user credentials </small> {#AWSConnectionProvider data-toc-label="AWSConnectionProvider"}

With an access key id and the secret access key, you have the option to connect to an AWS S3 instance by specifying the region concerned. However, to perform this king of connection, Fast2 required the permission : AmazonS3FullAccess

<b>Mandatory settings</b>

| Key               | Type     | Description                                                  |
| ----------------- | -------- | ------------------------------------------------------------ |
| Access key Id     | `String` | This field is mandatory unless 'Use Instance Profile' is set |
| Secret access key | `String` | This field is mandatory unless 'Use Instance Profile' is set |
| AWS Region        | `String` |                                                              |

<b>Optional settings</b>

| Key                                                 | Type                | Description                                                                                           | Default value |
| --------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| AWS URL endpoint                                    | `String`            | Service endpoint & signing region                                                                     |
| Use settings for Snowball                           | `Boolean`           | Snowball S3 endpoint requires specific S3Client settings                                              | `false `      |
| Use Instance Profile instead of Access Key & Secret | `Boolean`           | From your local variable, Fast2 will retrieve your connection information                             | `false `      |
| Role ARN name                                       | `String`            |                                                                                                       |
| sessionName                                         | `String`            |                                                                                                       |
| AWS extra Client Configuration                      | ClientConfiguration | Use this AWS class to fine-tune connection details to S3, such as timeouts, connection pool size, ... |

## AlfrescoCMISConnectionProvider <small> - CMIS connection provider </small> {#AlfrescoCMISConnectionProvider data-toc-label="AlfrescoCMISConnectionProvider"}

From a URI and giving a username with password, this class allow you to access any Alfresco instance

<b>Mandatory settings</b>

| Key                         | Type     | Description |
| --------------------------- | -------- | ----------- |
| Password                    | `String` |             |
| Username                    | `String` |             |
| URI for connection settings | `String` |             |

## AlfrescoRESTConnectionProvider <small> - </small> {#AlfrescoRESTConnectionProvider data-toc-label="AlfrescoRESTConnectionProvider"}

<b>Mandatory settings</b>

| Key                        | Type     | Description |
| -------------------------- | -------- | ----------- |
| Password                   | `String` |             |
| URL to connect to Alfresco | `String` |             |
| Username                   | `String` |             |

## AzureConnectionProvider <small> - Azure Blob Storage connection credentials </small> {#AzureConnectionProvider data-toc-label="AzureConnectionProvider"}

Connection to Azure Blob Storage can be established using either a connection string or account name with account key. The connection string is the recommended approach as it contains all necessary authentication information.

<b>Optional settings</b>

| Key               | Type     | Description                                                                                                                                                                                                                                   | Default value       |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Connection string | `String` | Azure Storage connection string. Mandatory unless 'Account Name' and 'Account Key' are provided. <br/> <p> Ex/ `DefaultEndpointsProtocol=https;AccountName=mystorageaccount;AccountKey=mykey;EndpointSuffix=core.windows.net`</p>            |                     |
| Account name      | `String` | Azure Storage account name. Mandatory if connection string is not provided.                                                                                                                                                                   |                     |
| Account key       | `String` | Azure Storage account key. Mandatory if connection string is not provided.                                                                                                                                                                    |                     |
| Endpoint suffix   | `String` | Azure Storage endpoint suffix. <br/> <p> Ex/ `core.windows.net`, `core.cloudapi.de`</p>                                                                                                                                                     | `core.windows.net ` |

## CMConnectionProvider <small> - Connection provider for Content Manager solution </small> {#CMConnectionProvider data-toc-label="CMConnectionProvider"}

The CM connection provider will help you to manage a pool of connections. For performance reasons, it is sometimes desirable to limit the number of connections created by the pool.The connection pool will allow you to specify the maximum number of connections that should exist at one time, whether in use or in the pool.Once this maximum value is reached, an error may be thrown or you may optionally wait for an existing connection to be freed

<b>Mandatory settings</b>

| Key      | Type     | Description                                               | Default value |
| -------- | -------- | --------------------------------------------------------- | ------------- |
| Password | `String` | Password of the aforementioned username                   |
| Username | `String` | Login with scope to access the docbase with proper rights | `icmadmin `   |

<b>Optional settings</b>

| Key                       | Type      | Description                                                     | Default value |
| ------------------------- | --------- | --------------------------------------------------------------- | ------------- |
| Data source type          | `String`  |                                                                 | `ICM `        |
| Connection pool size      | `Integer` | Maximum number of connections to be created                     | `64 `         |
| Server name               | `String`  | Name of the server involved in the migration                    | `ICMNLSDB `   |
| Connection free pool size | `Integer` | Maximum number of connections that may be held in the free pool | `5 `          |
| Internal connection       | `Integer` | Maximum number of connections for internal side                 | `64 `         |
| Connection duration       | `Long`    | Length of time to kill a free connection in milliseconds        | `100000 `     |

## CMODConnectionProvider <small> - CMOD connection provider </small> {#CMODConnectionProvider data-toc-label="CMODConnectionProvider"}

With a username / password and an IP address, this class allow you to connect at your CMOD instance.To optimize connections between Fast2 and CMOD you can use a single connection

<b>Mandatory settings</b>

| Key               | Type     | Description | Default value    |
| ----------------- | -------- | ----------- | ---------------- |
| Server IP address | `String` |             | `192.168.0.189 ` |
| Password          | `String` |             |
| Username          | `String` |             | `admin `         |

<b>Optional settings</b>

| Key                  | Type      | Description                                             | Default value |
| -------------------- | --------- | ------------------------------------------------------- | ------------- |
| Port number          | `Integer` |                                                         | `1445 `       |
| Singleton connection | `Boolean` | Optimization of the connection in case of regular calls | `false `      |

## DctmConnectionProvider <small> - Documentum connection provider </small> {#DctmConnectionProvider data-toc-label="DctmConnectionProvider"}

Module used by Fast2 to establish to communication with the destination Documentum instance.

<b>Mandatory settings</b>

| Key          | Type     | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| Docbase name | `String` | Name of the docbase involved in the migration.             |
| Password     | `String` | Password of the aforementioned username.                   |
| Username     | `String` | Login with scope to access the docbase with proper rights. |

## DctmSshClient <small> - Documentum SSH client" </small> {#DctmSshClient data-toc-label="DctmSshClient"}

Module used by Fast2 to establish the connection with the destination Documentum server.

:::warning

    Using this feature may significantly degrade performance. To use this option, the Client must be set on all Documentum tasks.
:::

<b>Mandatory settings</b>

| Key          | Type     | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| Username | `String` | Documentum machine username |
| Password | `String` | Documentum machine password |
| IP | `String` | Documentum machine IP |


## EmbeddedDbConnectionProvider <small> - OpenSearch connection provider </small> {#EmbeddedDbConnectionProvider data-toc-label="EmbeddedDbConnectionProvider"}

Module used by Fast2 to connect to its own database.

<b>Mandatory settings</b>

| Key               | Type     | Description                        | Default value             |
| ----------------- | -------- | ---------------------------------- | ------------------------- |
| Database endPoint | `String` | The endpoint of the Fast2 database | `"http://localhost:1790 ` |

## FileNet35ConnectionProvider <small> - Connection provider for FileNet 3.5 solution </small> {#FileNet35ConnectionProvider data-toc-label="FileNet35ConnectionProvider"}

This task is used to provide connection information to connect specifically to the FileNet P8 3.5 ECM.

<b>Mandatory settings</b>

| Key      | Type     | Description                                               |
| -------- | -------- | --------------------------------------------------------- |
| Password | `String` | Password of the aforementioned username                   |
| Username | `String` | Login with scope to access the docbase with proper rights |

<b>Optional settings</b>

| Key                 | Type                                                | Description                                                |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| WCM Config resource | `String`                                            |                                                            |
| Object store name   | `String`                                            | Name of the docbase involved in the migration              |
| URL settings        | [WcmApiConfigSettings](helper#WcmApiConfigSettings) | Class used for setting multiple URLs (download, upload...) |

## FileNetConnectionProvider <small> - Connection provider for FileNet P8 solution </small> {#FileNetConnectionProvider data-toc-label="FileNetConnectionProvider"}

Using this class allows you to provide connection information to specifically connect to your FileNet P8 5.x ECM

<b>Mandatory settings</b>

| Key         | Type     | Description                                                                                                    |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| Password    | `String` | Password of the aforementioned username                                                                        |
| URI address | `String` | URI to determine which FileNet instance to connect to <br/> <p> Ex/ `http://<ip>:<port>/wsi/FNCEWS40MTOM/`</p> |
| Username    | `String` | Login with scope to access the docbase with proper rights                                                      |

<b>Optional settings</b>

| Key                                      | Type      | Description                                                                                        | Default value |
| ---------------------------------------- | --------- | -------------------------------------------------------------------------------------------------- | ------------- |
| JAAS coonfiguration stanza property name | `String`  | Property containing JAAS coonfiguration. If null, the default JAAS stanza name is set to FileNetP8 |
| Singleton connection                     | `Boolean` | Reuse the same connection to optimize calls                                                        | `false `      |
| Initial naming factory                   | `String`  |                                                                                                    |

## FlowerDocsConnectionProvider <small> - Connection module for FlowerDocs ECM </small> {#FlowerDocsConnectionProvider data-toc-label="FlowerDocsConnectionProvider"}

Module responsible for authentication of Fast2 for FlowerDocs

<b>Mandatory settings</b>

| Key          | Type     | Description                                                                                                      |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| URL endpoint | `String` | Web services target URL. For example : https://www.demo.flowerdocs.cloud/flower-docs-ws/services                 |
| Password     | `String` | Password of the service account used for authentication                                                          |
| Scope        | `String` | Scope of the service account used for authentication                                                             |
| Username     | `String` | Username of the service account used for authentication                                                          |

<b>Optional settings</b>

| Key                          | Type      | Description                              | Default value |
| ---------------------------- | --------- | ---------------------------------------- | ------------- |
| Overrides authenticated user | `Boolean` | Allows connections to multiple endpoints | `false `      |

## GenericRestClient <small> - Generic REST client connection </small> {#GenericRestClient data-toc-label="GenericRestClient"}

Allows Fast2 to connect to any REST API.

 <b>Mandatory settings</b>

| Key      | Type     | Description |
| -------- | -------- | ----------- |
| Endpoint | `Pattern` | Complete URI address of the endpoint |
| Method   | `String` | HTTP method to use <br/> <p> Ex/ GET, POST, PUT, DELETE</p>|

<b>Optional settings</b>

| Key      | Type     | Description | Example | Default value |
| -------- | -------- | ----------- | ------------- | ------------- |
| Header  | `String/Pattern map` | Parameters of the header | | |
| Query parameters | `String/Pattern map` | | | |
| Body content type in request | `String` | | application/json | |
| Proxy host | `String` | | | |
| Proxy port | `Integer` | | | |
| Proxy username | `String` | | | |
| Proxy password | `String` | | | |
| Socket timeout | `Integer` | Timeout to receive data (in ms) | | 60000 |
| Request timeout | `Integer` | Timeout until a connection with the server is established (in ms) | | 30000 |
| Total number of connections | `Integer` | Set the maximum number of total open connections | 2048 | |
| Max connections per route | `Integer` | Set the maximum number of concurrent connections per route | | 2048 |
| Form field body | `String/Pattern map` | Field used to send structured data in Key/Value pairs. Required for content types: multipart/form-data, and application/x-www-form-urlencoded. FILE UPLOADS (Multipart) : To include files within a form, enter the absolute or relative file path as the value and add '_file' at the end of the corresponding key. | | |
| Raw body | `Pattern` | Field used when the request body is a single content. Required for: text/plain, application/xml, and all single binary file uploads (e.g., image/*, application/pdf). FILE UPLOADS : Enter the file path and check the file path option. Otherwise, enter the literal content (text or XML string). | | |
| File Path | `Boolean` | Indicates if the raw body contains a file path | | `false ` |

## MailBoxProvider <small> - Mail box connection </small> {#MailBoxProvider data-toc-label="MailBoxProvider"}

This class is used to access any mailbox from some connection information.

<b>Mandatory settings</b>

| Key              | Type     | Description                                                                                   |
| ---------------- | -------- | --------------------------------------------------------------------------------------------- |
| Protocol         | `String` | Protocol used to establish the connection <br/> <p> Ex/ imap</p>                              |
| Password         | `String` | Password of the aforementioned username                                                       |
| Host address     | `String` | Exact address of the mail server where to retrieve the mails <br/> <p> Ex/ imap.gmail.com</p> |
| Root folder name | `String` | Name of the root folder to extract mails                                                      |
| Username         | `String` | Login with scope to access the docbase with proper rights                                     |

<b>Optional settings</b>

| Key                          | Type                | Description                                                                               | Default value |
| ---------------------------- | ------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| Session debugging            | `Boolean`           | Keep logs written for the connection into stdout                                          | `false `      |
| Number of retries            | `Integer`           | Maximum number of times to retry the connection in case of failure                        | `0 `          |
| Read and write permissions   | `Boolean`           | Open mail session with read and write permissions. If false, the session is only readable | `false `      |
| Extended properties map      | `String/String map` | Additional Jakarta Mail session properties, applied on top of the worker's JVM system properties (so an entry here overrides a `-D` flag). This is where mail-session tuning belongs — notably the IMAP fetch size when extraction is slow, see [Performance tuning](../advanced/performance-tuning.md). <br/> <p> Ex/ `mail.imaps.fetchsize = 1048576`</p> |
| Time between two connections | `Integer`           | Time in milliseconds between each connection attempt                                      | `1000 `       |

## MailSenderProvider <small> - Email connection provider </small> {#MailSenderProvider data-toc-label="MailSenderProvider"}

This module will grant Fast2 access to send emails on behalf of a given user

<b>Mandatory settings</b>

| Key        | Type                | Description                                                                                                                                                                                                                                                                              |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password   | `String`            | The password of the aforementioned user                                                                                                                                                                                                                                                  |
| Properties | `String/String map` | It is expected that the client supplies values for the properties listed in Appendix A of the JavaMail spec. Please provide<br/>-mail.store.protocol,<br/>-mail.transport.protocol,<br/>-mail.host,<br/>-mail.user, and<br/>-mail.from as the defaults are unlikely to work in all cases |
| Username   | `String`            | The username with proper rights to access the email client server                                                                                                                                                                                                                        |

<b>Optional settings</b>

| Key   | Type      | Description                                                                                                                                                                                                                                                              |
| ----- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Debug | `Boolean` | Set the debug setting for this Session. Since the debug setting can be turned on only after the Session has been created, to turn on debugging in the Session constructor, set the property `mail.debug` in the Properties object passed in to the constructor to `true` |

## MFilesConnectionProvider <small> - Connection settings for MFiles </small> {#MFilesConnectionProvider data-toc-label="MFilesConnectionProvider"}

Credentials to connect to M-Files remote system via its REST API.

<b>Mandatory settings</b>

| Key                   | Type     | Description                                   | Default value          |
| --------------------- | -------- | --------------------------------------------- | ---------------------- |
| M-Files REST endpoint | `String` |                                               | http://ip.address/REST |
| Login                 | `String` |                                               |                        |
| Password              | `String` |                                               |                        |
| Vault GUID            | `String` | ex : `{15c876e7-8462-4a35-83d6-c8c21694eed6}` |                        |

## MobiusConnectionProvider <small> - Mobius connection provider </small> {#MobiusConnectionProvider data-toc-label="MobiusConnectionProvider"}

> ⚠️ **Deleted**: The `MobiusConnectionProvider` module is deleted and no longer available in Fast2 from v2025.0.0.

This Mobius connection module is required for Fast2 to successfully establish the connection with your Mobius instance in order to properly migrate metadata and contents.

<b>Mandatory settings</b>

| Key               | Type     | Description                                                            |
| ----------------- | -------- | ---------------------------------------------------------------------- |
| Repository ID     | `String` | The Universally unique identifier (UUID) of the destination repository |
| Mobius Server URL | `String` |                                                                        |

<b>Optional settings</b>

| Key                        | Type     | Description                                                 |
| -------------------------- | -------- | ----------------------------------------------------------- |
| Authentication REST Header | `String` | The value of the 'Authorization' header of the REST request |

## NuxeoConnectionProvider <small> - Connection settings for Nuxeo </small> {#NuxeoConnectionProvider data-toc-label="NuxeoConnectionProvider"}

<b>Mandatory settings</b>

| Key                | Type     | Description                                                              | Default value | Example |
| ------------------ | -------- | ------------------------------------------------------------------------ | ------------- | ------- |
| URL endpoint      | `String` | `http://hostname:port/nuxeo` | | `http://localhost:8080/nuxeo` |
| Password           | `String` | | | |
| UserName           | `String` | | | |

<b>Optional settings</b>

| Key                | Type     | Description                                                              | Default value | Example |
| ------------------ | -------- | ------------------------------------------------------------------------ | ------------- | ------- |
| Accessible schemas | `String` | List of document schemas accessible with this connexion | `* ` | |                                                              |

## OpenTextCredentials <small> - OpenText user credentials </small> {#OpenTextCredentials data-toc-label="OpenTextCredentials"}

<b>Mandatory settings</b>

| Key      | Type     | Description |
| -------- | -------- | ----------- |
| Password | `String` |             |
| Username | `String` |             |

## SQLQueryGenericCaller <small> - Generic query caller </small> {#SQLQueryGenericCaller data-toc-label="SQLQueryGenericCaller"}

This modules is responsible of establishing the connection between Fast2 and the designated database

<b>Mandatory settings</b>

| Key                   | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connection definition | `String` | Use a standard jdbc:// syntax. If a driver is needed, the JAR file has to be added to the worker-libs/ folder. Make sure to pick up a version compatible with the JDK used by Fast2. If clear credentials is a problem, please use below fields username and password <br/> <p> Ex/ <br />`jdbc:sqlite:C:/sqlite/mydatabase.db;`<br />`jdbc:sqlserver://localhost:<port>;user=...;password=...;`<br />`jdbc:mysql://<ip-address>:3306/<db-name>?user=...&password=...`</p> |

<b>Optional settings</b>

| Key                      | Type      | Description                                                                                        |
| ------------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| Password                 | `String`  | Password used by connectionString and fully encrypted for security reasons                         |
| Driver class             | `String`  | Optional driver class to load before connection. Leave empty to load none                          |
| Throw error if no result | `Boolean` | Throw exception when SQLQueryColumnCaller finds no result.                                         |
| Skip exceptions          | `Boolean` | Fast2 will either throw an error if the statement has not properly been executed, or fail silently |
| User                     | `String`  | Username used by connectionString                                                                  |
