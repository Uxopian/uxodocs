---
title: Credentials
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 470255f113ba86f3f53f61ea1c047b5b492486c4184f4e6de7736192d36d5d65
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

| Key          | Type     | Description                                             |
| ------------ | -------- | ------------------------------------------------------- |
| URL endpoint | `String` | Web services target URL                                 |
| Password     | `String` | Password of the service account used for authentication |
| Scope        | `String` | Scope of the service account used for authentication    |
| Username     | `String` | Username of the service account used for authentication |

<b>Optional settings</b>

| Key                          | Type      | Description                              | Default value |
| ---------------------------- | --------- | ---------------------------------------- | ------------- |
| Overrides authenticated user | `Boolean` | Allows connections to multiple endpoints | `false `      |

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
| Extended properties map      | `String/String map` | List of additional properties to apply <br/> <p> Ex/ myValue.toAdd = true</p>             |
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

| Key                | Type     | Description                                                                  | Default value |
| ------------------ | -------- | ---------------------------------------------------------------------------- | ------------- |
| Accessible schemas | `String` | List of document schemas accessible with this connexion                      | `* `          |
| Connexion URL      | `String` | `http://hostname:port/nuxeo` <br/> <p> Ex/ `http://localhost:8080/nuxeo`</p> |
| Password           | `String` |                                                                              |
| UserName           | `String` |                                                                              |

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
