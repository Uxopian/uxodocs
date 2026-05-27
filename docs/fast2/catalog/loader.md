---
sidebar_position: 8
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: 326e29429843883af6bf64fac575f604b5828e1fd72d91c48b0231a5d0bb86ff
---

# Injectors

## AlfrescoBulkImporter <small> - Perform a bulk import on Alfresco </small> {#AlfrescoBulkImporter data-toc-label="AlfrescoBulkImporter"}

Load documents and metadata into Alfresco without changing the current tree structure of those same documents. The good performances of such injection are restrained with the complexity of the tree-view setup

<b>Mandatory settings</b>

| Key                          | Type                       | Description                                                                                                  |
| ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Source directory             | `String`                   | Path to the folder to migrate into Alfresco                                                                  |
| Target path                  | `String`                   | Path where the folder will be stored into Alfresco                                                           |
| Alfresco connection provider | AlfrescoConnectionProvider | This modules is responsible of the two-way communication between Fast2 and the designated Alfresco instance. |
| Target NodeRef               | `String`                   | NodeRef of the parent where the folder will be stored into Alfresco                                          |

<b>Optional settings</b>

| Key               | Type      | Description                                                                                          | Default value |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| Clean destination | `Boolean` | Replace all existing content or metadata present in the destination folder before injection          | `false `      |
| Disable rules     | `Boolean` | Disable rules for injection to prevent Alfresco to run checks on each document                       | `false `      |
| Add metadata      | `Boolean` | Load document content and its metadata. All metadata might not me compatible with Alfresco standards | `false `      |
| Number of threads | `Integer` | Number of threads to allocate for the bulk import                                                    | `1 `          |
| Timeout           | `Integer` | Time to wait before closing the session. Of not set, the value will be set to 300'000                |
| Copy files        | `Boolean` | Leave all documents in the source folder                                                             | `false `      |
| Batch size        | `Integer` | Size of the batch to build for upload                                                                | `0 `          |

## AlfrescoInjector <small> - Injection into Alfresco ECM using CMIS protocol </small> {#AlfrescoInjector data-toc-label="AlfrescoInjector"}

This task can be used to inject documents into Alfresco, using the CMIS protocol on top of HTTP. We rely on v1.0 of the opencmis module made available by Alfresco.

<b>Mandatory settings</b>

| Key                          | Type                                                                         | Description                                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Alfresco connection provider | [AlfrescoCMISConnectionProvider](credentials#AlfrescoCMISConnectionProvider) | This modules is responsible of the two-way communication between Fast2 and the designated Alfresco instance |

<b>Optional settings</b>

| Key                      | Type           | Description                                                                                        | Default value    |
| ------------------------ | -------------- | -------------------------------------------------------------------------------------------------- | ---------------- |
| Alfresco ID key          | `String`       | Document metadata key with the Alfresco ID of the injected document.                               | `alfDocumentId ` |
| Property Helper          | PropertyHelper |                                                                                                    |
| Properties regex         | `String`       | Regex pattern to filter the properties to inject with the document.                                | `(cmis:.*) `     |
| Hash content column name | `String`       | Hash content column name to version a document only when the content is different (but same index) |
| Destination folder       | `String`       | Folder where the documents will be loaded into                                                     |
| SQL update query         | `String`       | CMIS SQL update query to select the document to update.                                            |
| Overwrite 'can create'   | `Boolean`      | Ask Fast2 to create destination folder(s) if they do not already exist                             | `true `          |
| Hash index column name   | `String`       | Hash index column name to version a document only when the content is different (but same index)   |
| Force update             | `Boolean`      | Throw an error if the document did not exist prior to the loading call                             |
| Prevent duplicate        | `Boolean`      | Fast2 will throw an error if the document has already been injected                                |

## AlfrescoRestInjector <small> - Alfresco injector using Alfresco REST protocol </small> {#AlfrescoRestInjector data-toc-label="AlfrescoRestInjector"}

This task relies on the Alfresco public REST API (with v1.0.4 of the Alfresco REST client) to load documents and metadata into a given Alfresco instance. <br /><br />To force the type of resource to create in the destination system, use the `nodeType` data into the document dataset. Default value is `cm:content`.

<b>Mandatory settings</b>

| Key                          | Type                                                                         | Description |
| ---------------------------- | ---------------------------------------------------------------------------- | ----------- |
| Alfresco connection provider | [AlfrescoRESTConnectionProvider](credentials#AlfrescoRESTConnectionProvider) |             |

<b>Optional settings</b>

| Key                                                 | Type      | Description                                                                                                                                                                                                                                                                                                                                                | Default value |
| --------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Root folder name to inject in a specific repository | `String`  | '-my-', '-shared-', '-root-' are equivalent                                                                                                                                                                                                                                                                                                                | `-my- `       |
| Alfresco destination path                           | `String`  | The path of the folder where the documents will be saved in Alfresco. This field supports patterns (based on punnet, document and campaign metadata). <br />If this path starts with Alfresco nodeRef prefix 'workspace://SpacesStore/', the document will be injected into the corresponding folder. However, such folder needs to be created beforehand. |
| Regex pattern filter for document properties        | `String`  |                                                                                                                                                                                                                                                                                                                                                            | `(cm:.*) `    |
| Safe update                                         | `Boolean` | If the document does not already exist, the first version will create the document. Later versions will be incremented on top of the existing version based on the data 'cm:versionLabel' property.                                                                                                                                                        |
| Auto rename feature                                 | `Boolean` | Triggers the Alfresco auto-rename feature, to prevent Alfresco to throw a 'duplicate document' error.                                                                                                                                                                                                                                                      | `false `      |
| Pivot metadata for multiversion                     | Pattern   | If all documents of the punnet have the same value for this metadata, they will be considered as being the different versions of a same document in Alfresco.                                                                                                                                                                                              |
| Overwrite documents when they already exist         | `Boolean` | Triggers the Alfresco overwrite feature, where the incoming document will replace an existing document having the same key.                                                                                                                                                                                                                                | `false `      |
| Alfresco ID for update                              | `String`  | Specify here the Alfresco UUID of the document to update. The value will be resolved by Fast2, syntax `${...}` is supported. This value can start with 'workspace://SpacesStore/' <br/> <p> Ex/ `${property('alfcmis:nodeRef')}`</p>                                                                                                                       |

## AwsInjector <small> - Injector into AWS S3 buckets </small> {#AwsInjector data-toc-label="AwsInjector"}

Fast2 proposes this task to load your documents, metadata and more within designated S3 buckets. Both client- and server-side encryption are supported (v1.6 of AWS encyption SDK). This loader relies on v1.11.848 of AWS Java SDK. The uploaded file will be title according to the `name` metadata of the processed document.

<b>Mandatory settings</b>

| Key                | Type                                                       | Description                                                     | Default value    |
| ------------------ | ---------------------------------------------------------- | --------------------------------------------------------------- | ---------------- |
| Destination bucket | `String`                                                   | The name of the bucket where the documents will be migrated to. | `fast2-default ` |
| AWS credentials    | [AWSConnectionProvider](credentials#AWSConnectionProvider) | Must have granted AmazonS3FullAccess permission                 |

<b>Optional settings</b>

| Key                   | Type      | Description                                                                                                                                                                 | Default value |
| --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Encryption key        | `String`  | Key used for server-side encryption. <br/> <p> Ex/ 01234567-abcd-efgh-ijkl-0123456789ab</p>                                                                                 |
| Destination folder    | `String`  | The parent folder of the documents to inject. This field supports pattern (using punnet, document or campaign metadata). Leave empty for storing at the root of the bucket. |
| Dry run               | `Boolean` | Simulates an injection, performs document integrity controls, but does not load the document into AWS S3                                                                    | `false `      |
| Destination file name | `String`  | Metadata for the file name once injected into the S3 bucket. Pattern syntax is supported.                                                                                   | `${name} `    |
| Encryption context    | `String`  | Context used for server-side encryption. This context is a JSON map. <br/> <p> Ex/ `{\"testKey\":\"testValue\"}`</p>                                                        |
| ARN key               | `String`  | Key used for client-side encryption, before loading the document into S3. <br/> <p> Ex/ arn:aws:kms::111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab</p>    |
| Update only           | `Boolean` | Only changing metadata, content is left as is                                                                                                                               | `false `      |

## AzureBlobInjector <small> - Injector into Azure Blob Storage containers </small> {#AzureBlobInjector data-toc-label="AzureBlobInjector"}

Fast2 proposes this task to load your documents, metadata and more within designated Azure Blob Storage containers. This loader relies on Azure Storage Blob SDK v12.25.0. The uploaded file will be titled according to the `name` metadata of the processed document.

<b>Mandatory settings</b>

| Key                            | Type                                                            | Description                                                                                                                                                          | Default value    |
| ------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Azure Blob Storage credentials | [AzureConnectionProvider](credentials#AzureConnectionProvider) | Must have appropriate permissions to create containers and upload blobs.                                                                                             |                  |
| Destination container          | `String`                                                        | The name of the container where the documents will be migrated to. This field supports pattern resolution (using punnet, document or campaign metadata). <br/> <p> Ex/ `${documentType}`</p> | `fast2-default ` |

<b>Optional settings</b>

| Key                | Type      | Description                                                                                                                                                                                                                  | Default value |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Dry run            | `Boolean` | Simulates an injection, performs document integrity controls, but does not load the document into Azure Blob Storage.                                                                                                        | `false `      |
| Destination folder | `String`  | The parent folder of the documents to inject. Supports pattern resolution. Leave empty for storing at the root of the container. If the document has the `azure_destination_folder` metadata, that value takes priority.    |               |
| Destination name   | `String`  | The name/path of the blob file to inject. Supports pattern resolution. Leave empty to use the document's `name` metadata. If the document has the `azure_destination_name` metadata, that value takes priority. <br/> <p> Ex/ `${documentType}_${documentId}`</p> | |

## CSVWriter <small> - CSV file writer </small> {#CSVWriter data-toc-label="CSVWriter"}

Use this task to write punnet and document related data into a CSV. You can specify the name of such file as well as the path where your want Fast2 to create and populate it.

<b>Mandatory settings</b>

| Key                               | Type     | Description                                                                  |
| --------------------------------- | -------- | ---------------------------------------------------------------------------- |
| Path for (local) output CSV files | `String` | Using a pattern for this field will trigger a resolution by Fast2 at runtime |

<b>Optional settings</b>

| Key                            | Type          | Description                                                                                                                                                                                                                                                              | Default value |
| ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Close output file at each line | `Boolean`     | Close CSV file after each punnet processed. This option can come useful to prevent too many files opened errors when each punnet created a dedicated CSV file.                                                                                                           |
| New column headers             | `String list` | The new column names to use for the document metadata. If no set, the column headers will be populated from the names of the document metadata. By default, the data 'punnetId' and 'documentId' will be appended to the existing data.                                  |
| Upload punnet data             | `Boolean`     | For each document add the punnet data to wich it was attached to                                                                                                                                                                                                         | `true `       |
| CSV separator                  | `String`      | The separator used between columns in the resulting CSV file.                                                                                                                                                                                                            | `, `          |
| Write all in the same CSV file | `Boolean`     | Merge metadata of all punnets in a single output CSV file. The missing columns headers will be added on the fly, although it is wiser to list them all in the 'New column headers' field. If set to false, any existing CSV file with the same name will be overwritten. | `true `       |
| Protect with double quote      | `Boolean`     | This option will surround every value with double quotes. Such use will be mostly relevant when dealing with multivalued metadata.                                                                                                                                       | `true `       |
| Add Folder Metadata            | `Boolean`     | For each document add its folder metadata on the same CSV line. Only the first level of folders will be stored into the CSV file. If a document is attached to more than one folder, its line will be cloned in the CSV file, to display one folder per line.            | `false `      |

:::note

CSVWriter folders behavior and limitations (v2025.5.0):

- Single level of depth: only the direct parent folders of documents are considered.
- Single combination per CSV line: one row per unique document/folder combination; documents without a folder appear with blank folder columns.

:::

## DctmInjector <small> - Injection into Documentum </small> {#DctmInjector data-toc-label="DctmInjector"}

Use this task to inject into Documentum ECM system. Fast2 embeds v6.7 of Documentum modules to take the most out of of this injection phase.

<b>Mandatory settings</b>

| Key         | Type                                                            | Description                                                                        |
| ----------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Credentials | [DctmConnectionProvider](credentials.md#DctmConnectionProvider) | Connection module establishing the communication with a given Documentum instance. |

<b>Optional settings</b>

| Key                      | Type                                             | Description                                                                                                                                          |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentum configuration | [DctmConfiguration](helper.md#DctmConfiguration) | Customize here the Documentum details related to the instance you are planning to inject documents into. For more, refer to the appropriate section. |
| SSH client | [DctmSshClient](credentials.md#DctmSshClient) | SSH client used to establish the connection with the Documentum server |

## FileNet35Injector <small> - Injector for FileNet P8 3.5 </small> {#FileNet35Injector data-toc-label="FileNet35Injector"}

Use this task to inject documents and data into a FileNet P8 3.5

<b>Mandatory settings</b>

| Key                             | Type                                                                   | Description                                                                            |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| The FileNet connection provider | [FileNet35ConnectionProvider](credentials#FileNet35ConnectionProvider) | Module to establish the connection with the destination FileNet infrastructure         |
| ObjectStore name                | `String`                                                               | Name of the destination object-store where the documents and metadata will be injected |

<b>Optional settings</b>

| Key                                            | Type      | Description                                                                                                                                     | Default value        |
| ---------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Try using 'DocumentTitle' property             | `Boolean` | When filing a document in a folder, try to use the FileNet DocumentTitle property for the RelationShip name                                     |
| Process multi-pages content as multi-content   | `Boolean` | Treat the content of multi-pages document as multi-content document in FileNet.                                                                 |
| Dry run                                        | `Boolean` | Needs to set 'UpdatingBatch on documents' to `true`                                                                                             |
| WHERE clause for folder case                   | `String`  | where clause to define for case research                                                                                                        |
| Restrain search results to documents           | `Boolean` | Force Document search to limit to the class name provided on the document                                                                       |
| Only process 1st content                       | `Boolean` | Relevant for multi-content documents                                                                                                            |
| Restrain search results to folders             | `Boolean` | Force folder search to limit to the class name provided on the folder                                                                           |
| Skip content injection                         | `Boolean` | Skip document content injection, only load the metadata and/or annotations of the processed document                                            |
| Skip document unfiling                         | `Boolean` | Force to skip Document unfiling to existing folders before linking it to the provided folders ; new linkages will be added to the existing ones |
| Clear in-place annotations                     | `Boolean` | If source document contains annotations, cleanup existing ones in P8                                                                            |
| Restrain search results to case                | `Boolean` | Force case search to limit to the class name provided on the case                                                                               |
| Synchronous folder creation                    | `Boolean` | Enforce synchronous folder creation, to make them more thread-safe                                                                              | `true `              |
| Metadata carrying document UUID                | `String`  | Leave empty to disable updating                                                                                                                 | `fileNetDocumentId ` |
| Variable name of annotation ID                 | `String`  | Variable name of annotation id used to replace it by generated FileNet annotation id                                                            | `${annotationId} `   |
| Force deletion                                 | `Boolean` | If no matching document can be found, an error is thrown                                                                                        |
| WHERE clause for folder research               | `String`  | Fast2 will update all folders matching the following WHERE statement                                                                            |
| Associate annotation FileNet ID to its content | `Boolean` | Update annotation content with its generated FileNet id according to annotation id variable                                                     |
| Delete in-place version                        | `Boolean` | Delete the last document version after checkin a new one                                                                                        |
| Update system properties                       | `Boolean` | It can only be used for either document creation or update (when a new version is created)                                                      |
| Default MimeType                               | `String`  | Mime-type to set when none has been found                                                                                                       |
| Fields to update                               | `String`  | Default query to select fields to update                                                                                                        | `* `                 |
| Post-commit delta                              | `Integer` | Add a post-commit time, may be usefull to let FileNet perform asynchronous handling of document injection                                       | `0 `                 |
| Limit CE connection life-time                  | `Long`    | Limit CE Session life-time : at end of TTL, the Session will be replaced by a brand new one                                                     | `Long.MAX_VALUE `    |
| Force to perform update                        | `Boolean` | In case the document did not exist, an error is thrown                                                                                          |
| WHERE clause for update                        | `String`  | Fast2 will update all documents matching the following WHERE statement <br/> <p> Ex/ [Id]=`${myFileNetDocumentId}`)</p>                         |

## FileNetInjector <small> - Injector for FileNet </small> {#FileNetInjector data-toc-label="FileNetInjector"}

Use this task to inject documents and data into a FileNet. If all documents have the same UUID for the VersionSeries data provided in the task configuration, then the FileNet versionable object will be created based on the 'MajorVersionNumber' and 'MinorVersionNumber' properties. 'Custom objects' and 'Referential Containment Relationship' are supported. If a document is injected with a folder having a FileNet compatible ID, then the folder will be created with this UUID, if not existing already.

<b>Mandatory settings</b>

| Key                             | Type                                                               | Description                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| The FileNet connection provider | [FileNetConnectionProvider](credentials#FileNetConnectionProvider) | The module establishing the connection to the remote FileNet instance. For more configuration about this object, refer to appropriate section. |
| ObjectStore name                | `String`                                                           | Name of the destination object-store where the documents and metadata will be injected                                                         |

<b>Optional settings</b>

| Key                                            | Type                                  | Description                                                                                                                                                                                                                                                                  | Default value        |
| ---------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Property Helper                                | [PropertyHelper](tool#PropertyHelper) |                                                                                                                                                                                                                                                                              |
| Try using 'DocumentTitle' property             | `Boolean`                             | When filing a document into a folder, try to use the FileNet 'DocumentTitle' for the RelationShip name                                                                                                                                                                       |
| Process multi-pages content as multi-content   | `Boolean`                             | Treat the content of multi-pages document as multi-content document in FileNet                                                                                                                                                                                               |
| Keep original VersionSeries ID                 | `Boolean`                             | If true, Fast2 will create the multiversion documents with the VersionSeries ID specified in the 'VersionSeries metadata' configuration field.                                                                                                                               |
| Dry run                                        | `Boolean`                             | Do not perform anything, just prepare UpdatingBatch and drop when finished. It implies to activate 'Use UpdatingBatch on documents'.                                                                                                                                         |
| Restrain search results to documents           | `Boolean`                             | Force Document search to limit to the class name provided on the document                                                                                                                                                                                                    |
| Metadata carrying parent folder UUID           | `String`                              | Name of the metadata where Fast2 will store the UUID of the parent folder of the document injected into FileNet P8. Leave empty to disable updating                                                                                                                          |
| Only process 1st content                       | `Boolean`                             | When a document has multiple contents, its forces to process the first one only. The others are then skipped                                                                                                                                                                 |
| Inject FileNet security                        | `Boolean`                             | Document dataset must have data 'security'. Syntax must be an array of concatenated Strings as so : `gType=<String>/gName=<String>/mask=<Integer>/depth=<Integer>/aType=<String>` where `<Integer>` and `<String>` values are replaced by the corresponding business values. |
| Accept unset properties                        | `Boolean`                             | Allow registration of blank metadata in FileNet                                                                                                                                                                                                                              |
| Skip content injection                         | `Boolean`                             | Skip document content injection, only load the metadata and/or annotations of the processed document                                                                                                                                                                         |
| Name of ID property                            | `String`                              | Name of the document property, found in the document dataset, which will be used to force Id at document creation. Leave blank to disable this feature                                                                                                                       |
| Throw exception if document already exists     | `Boolean`                             | An exception is thrown in case an older document has been found. To properly use this options, 'Prevent document overwriting' requires to be `true`                                                                                                                          |
| Skip document unfiling                         | `Boolean`                             | Force to skip Document unfiling to existing folders before linking it to the provided folders. New linkages will be added to the existing ones                                                                                                                               |
| Auto-classiify at checking                     | `Boolean`                             | Enable the FileNet Auto-Classify feature when the document is at checking stage                                                                                                                                                                                              |
| Clear in-place annotations                     | `Boolean`                             | If source document contains annotations, clean up existing ones in P8                                                                                                                                                                                                        |
| Synchronous folder creation                    | `Boolean`                             | Enforce synchronous folder creation, to make them more thread-safe                                                                                                                                                                                                           | `true `              |
| Safe update of document                        | `Boolean`                             | Try updating a document. If no older version of the document can be found, create it                                                                                                                                                                                         |
| Metadata carrying document UUID                | `String`                              | Name of the metadata where Fast2 will store the UUID of the document injected into FileNet P8. Leave empty to disable updating                                                                                                                                               | `fileNetDocumentId ` |
| Use UpdatingBatch of folders                   | `Boolean`                             | Use FileNet UpdatingBatch also for folders creation, which may not be thread-safe                                                                                                                                                                                            |
| Variable name of annotation ID                 | `String`                              | Variable name of annotation id used to replace it by generated FileNet annotation id                                                                                                                                                                                         | `${annotationId} `   |
| Force deletion                                 | `Boolean`                             | Force document delete action. If no matching document can be found, an error is thrown                                                                                                                                                                                       |
| Associate annotation FileNet ID to its content | `Boolean`                             | Update annotation content with its generated FileNet id according to annotation id variable                                                                                                                                                                                  |
| Delete in-place version                        | `Boolean`                             | Delete the last document version after checkin a new one                                                                                                                                                                                                                     |
| Update system properties                       | `Boolean`                             | It can only be used for either document creation or update (when a new version is created)                                                                                                                                                                                   |
| Use UpdatingBatch on documents                 | `Boolean`                             | Run the 'UpdatingBatch' feature of FileNet, at each punnet being processed.                                                                                                                                                                                                  |
| Default MimeType                               | `String`                              | The mime-type to set when no MimeType has been provided neither in document nor its content                                                                                                                                                                                  |
| Limit CE connection life-time                  | `Long`                                | At end of TTL, the connection will be replaced by a brand new one. Default value is Long.MAX_VALUE                                                                                                                                                                                                         | `9223372036854775807` |
| Fields to update                               | `String`                              | Default query to select fields to update                                                                                                                                                                                                                                     | `* `                 |
| VersionSeries metadata                         | `String`                              | Name of the VersionSeries property common to all documents in punnet. If all documents have the same value, they will be considered as one same multiversioned document in FileNet.                                                                                          | `VersionSeries `     |
| Post-commit delta                              | `Integer`                             | Time to wait after a commit instruction, may be useful to let FileNet perform asynchronous handling of document injection                                                                                                                                                    | `0 `                 |
| Force folder creation                          | `Boolean`                             | Overwrite folder canCreate property : create folders when they do not exist                                                                                                                                                                                                  |
| Prevent document overwriting                   | `Boolean`                             | Check if the document already exists before creating it using `WHERE` clause. You can throw an exception in case an older document can be found (see _Throw exception if document already exists_). If false, create all documents without control                           |
| Force to perform update                        | `Boolean`                             | Force document Update action. In case the document did not exist, an error is thrown                                                                                                                                                                                         |
| WHERE clause for update                        | `String`                              | The criteria which the documents to update will have to match <br/> <p> Ex/ [Id]=`${myFileNetDocumentId}`</p>   

## FlowerDocsIndexPlainText <small> - Push input for plain-text search indexing in FlowerDocs </small> {#FlowerDocsIndexPlainText data-toc-label="FlowerDocsIndexPlainText"}

<b>Mandatory settings</b>

| Key      | Type    | Description |
| - | - | - |
| FlowerDocs REST endpoint | `String` |  |
| Username | `String` |  |
| Password | `String` |  |
| Scope | `String` |  |
| Text for indexing | Pattern |  |

<b>Optional settings</b>

| Key      | Type    | Description |
| - | - | - |
| FlowerDocs document ID | Pattern |  |                                                                                                                                                             |

## FlowerInjector <small> - Fast2 injector module for FlowerDocs </small> {#FlowerInjector data-toc-label="FlowerInjector"}

Allows to load a component (document, task, folder or virtual folder) into Flower. Can load facts, document content and annotations

<b>Mandatory settings</b>

| Key                            | Type                                                                     | Description                                                                   |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| FlowerDocs connection provider | [FlowerDocsConnectionProvider](credentials#FlowerDocsConnectionProvider) |                                                                               |
| Component category             | `String`                                                                 | FlowerDocs component category can be DOCUMENT, TASK, FOLDER or VIRTUAL_FOLDER |

<b>Optional settings</b>

| Key                        | Type      | Description             | Default value |
| -------------------------- | --------- | ----------------------- | ------------- |
|                            | Component |                         |
| Load document annotations  | `Boolean` |                         | `false `      |
| Load document file content | `Boolean` |                         | `false `      |
| Load component facts       | `Boolean` |                         | `false `      |
| Mode update                | `Boolean` | Does not update content | `false `      |

## MailSender <small> - Email sender task </small> {#MailSender data-toc-label="MailSender"}

This task will send custom built emails to specific people or mailing list of your choice.

<b>Mandatory settings</b>

| Key            | Type                                                 | Description                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Email provider | [MailSenderProvider](credentials#MailSenderProvider) | The Fast2 module establishing the connection to the email server, from the account of a given user. For more about the configuration of the object, please refer to the appropriate section |

<b>Optional settings</b>

| Key                   | Type          | Description                                                                                                                                  |
| --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Email subject         | `String`      | The subject/object of the email to send.                                                                                                     |
| Sender address        | `String`      | The value of this field can be resolved by Fast2 (ie you can use dynamic values)                                                             |
| Recipient address(es) | `String list` | The value of this field can be resolved by Fast2 (ie you can use dynamic values)                                                             |
| Multi-line content    | `String list` | The content of the email. It can be composed with different paragraphs, please note Fast2 is not responsible for the text formatting though. |

## MFilesInjector <small> - Module to inject into M-Files via its public REST API. Java 11 is required for this module. </small> {#MFilesInjector data-toc-label="MFilesInjector"}

Module to inject into M-Files via its public REST API. Java 11 is required for this module.

<b>Mandatory settings</b>

| Key                         | Type                       | Description                                                       |
| --------------------------- | -------------------------- | ----------------------------------------------------------------- |
| M-Files connection provider | `MFilesConnectionProvider` | Credentials to connect to M-Files remote system via its REST API. |

## MobiusInjector <small> - Inject documents into your ASG Mobius system </small> {#MobiusInjector data-toc-label="MobiusInjector"}

> ⚠️ **Deleted**: The `MobiusInjector` task is deleted and no longer available in Fast2 from v2025.0.0.

This task will upload documents and metadata onto Mobius, from version 8 up to version 11. Based on the `className` and `section` properties, specify exactly where you'd like your documents to be stored.

<b>Mandatory settings</b>

| Key                        | Type                                                             | Description                                                                                   |
| -------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Mobius connection provider | [MobiusConnectionProvider](credentials#MobiusConnectionProvider) | The Fast2 module required to establish the communication with the destination Mobius instance |

<b>Optional settings</b>

| Key                              | Type          | Description                                                                                                                            |
| -------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Properties to inject into Mobius | `String list` | List of names of the properties which will be added to the topic of the document. These properties have to be attached to the document |

## MultiUpdateSQLQueryTask <small> - Update a database with several document data </small> {#MultiUpdateSQLQueryTask data-toc-label="MultiUpdateSQLQueryTask"}

<b>Mandatory settings</b>

| Key          | Type                                                       | Description                                                                                          |
| ------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| WHERE clause | `String`                                                   | All matching rows will be updated. This field will be resolved by Fast2 before the task is executed  |
| Query caller | [SQLQueryGenericCaller](credentials#SQLQueryGenericCaller) | This modules is responsible of establishing the connection between Fast2 and the designated database |
| Table name   | `String`                                                   | The table of the row to update                                                                       |

<b>Optional settings</b>

| Key            | Type          | Description                                                                                                    | Default value |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------------- | ------------- |
| Skip exception | `Boolean`     | Fast2 will either throw an error if no update action has been executed, or proceed to next document            | `true `       |
| Data to update | `String list` | The list of all key-values pairs to update the given rows with <br/> <p> Ex/ targetColumnName/documentData</p> |

## NuxeoInjector <small> - Nuxeo injector using Nuxeo REST API </small> {#NuxeoInjector data-toc-label="NuxeoInjector"}

This task load documents and metadata into a given Nuxeo instance using the Nuxeo REST API. If the document does not have any folder property, he will be injected in the workspace root folder. The documents **have to be in the correct version order** before entering the Nuxeo task. For Nuxeo to identify the versions as different, either the 'name' or the 'dc:description' data needs to be different.

<b>Mandatory settings</b>

| Key                       | Type                                                           | Description |
| ------------------------- | -------------------------------------------------------------- | ----------- |
| Nuxeo connection provider | [NuxeoConnectionProvider](credentials#NuxeoConnectionProvider) |             |

<b>Optional settings</b>

| Key                                        | Type          | Description                                                                                                                                                                                                          | Default value |
| ------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Attach punnet data                         | `Boolean`     | Check this option to map the punnet data to Nuxeo properties                                                                                                                                                         | `true `       |
| Blacklist                                  | `String list` | List of metadata (either on punnet or document) not to map to the Nuxeo documents.                                                                                                                                   |
| Attach document data                       | `Boolean`     | Check this option to map the document data to Nuxeo properties                                                                                                                                                       | `true `       |
| Injection path                             | `String`      | Default path to inject your documents                                                                                                                                                                                | `/ `          |
| Attach folders                             | `Boolean`     | Check this option to upload the documents into a specified folder architecture based on the details embedded in the document                                                                                         | `true `       |
| Delete annotations when they already exist | `Boolean`     |                                                                                                                                                                                                                      | `true `       |
| Replace document if already present        | `Boolean`     | Check this option to replace all versions of a document in Nuxeo, based on the data `documentId`. This feature acts like a replacement. If the document did not already exist, then it will be created from scratch. |
| Attach content                             | `Boolean`     |                                                                                                                                                                                                                      | `true `       |

## OpenTextInjector <small> - OpenText Content Server injector based on custom Rest API </small> {#OpenTextInjector data-toc-label="OpenTextInjector"}

<b>Mandatory settings</b>

| Key                          | Type                                                   | Description                                                                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attribute file path          | `String`                                               | OpenText category must be associated with their ids within the file. Fast2 will automatically translate the data name to the correct id specified by the file <br/> <p> Ex/ ../config/attributes.properties</p> |
| OpenText credentials         | [OpenTextCredentials](credentials#OpenTextCredentials) |                                                                                                                                                                                                                 |
| Expected folder architecture | `String list`                                          |                                                                                                                                                                                                                 |
| OpenText client              | OpenTextRestClient                                     |                                                                                                                                                                                                                 |

<b>Optional settings</b>

| Key                                      | Type          | Description                                                                                                                                                                                                                                                                        | Default value |
| ---------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| List of properties not to inject         | `String list` | These properties will be excluded                                                                                                                                                                                                                                                  |
| NodeId of the webReport parameter to use | `String`      | Opentext webReports allow users to build search request with specific parameters                                                                                                                                                                                                   |
| List of properties to inject             | `String list` | If empty the whole dataSet will be injected                                                                                                                                                                                                                                        |
| Version document if data exists          | `String`      | Fast2 will check if the data filled in this field for carrying the version and the 'nodeId' data are available at document level. If so, the document will be injected within OpenText and its version increased by one. A new data 'createdVersion' will be added to the document |
| Ticket period                            | `Integer`     | Time in seconds between two ticket creation                                                                                                                                                                                                                                        | `60 `         |

## SQLQueryTask <small> - Add data to documents in database </small> {#SQLQueryTask data-toc-label="SQLQueryTask"}

Simple task to query a SQL database and fill each Document data with results

<b>Mandatory settings</b>

| Key                | Type                 | Description                                                                                                                      |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Key of target data | `String`             | The name of the data where the value must be added                                                                               |
| Query caller       | SQLQueryColumnCaller | This modules is responsible of establishing the connection between Fast2 and the designated database                             |
| Key of source data | `String`             | The name of the data to update the documents with. If the data is not retrieved from the document, Fast2 will skip this document |

<b>Optional settings</b>

| Key               | Type      | Description                              | Default value |
| ----------------- | --------- | ---------------------------------------- | ------------- |
| Reset target data | `Boolean` | Clean content when target already exists | `true `       |

## SQLStatementTask <small> - Insert or updated database </small> {#SQLStatementTask data-toc-label="SQLStatementTask"}

With this task, you will be able to perform any SQL instruction (such as insertions and updates) on any given table of the specified database

<b>Mandatory settings</b>

| Key           | Type                                                       | Description                                                                                                                                                                                                                     |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQL statement | `String`                                                   | The statement you want Fast2 to run on the database. The syntax needs to match SQL standards. Use a ? to reference your annotation <br/> <p> Ex/ INSERT INTO table_name (doc_id, annotation) VALUES (`'${documentId}'`, ?);</p> |
| Query caller  | [SQLQueryGenericCaller](credentials#SQLQueryGenericCaller) | This modules is responsible of establishing the connection between Fast2 and the designated database                                                                                                                            |

<b>Optional settings</b>

| Key                | Type      | Description                                                                                        |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| Inject annotations | `Boolean` | Fast2 will either throw an error if the statement has not properly been executed, or fail silently |
| Skip exceptions    | `Boolean` |                                                                                                    |

## UpdateSQLQueryTask <small> - Update SQL database </small> {#UpdateSQLQueryTask data-toc-label="UpdateSQLQueryTask"}

This task will perform update instructions base on document data onto a given SQL database

<b>Mandatory settings</b>

| Key                     | Type                                                       | Description                                                                         |
| ----------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| SQL connection provider | [SQLQueryGenericCaller](credentials#SQLQueryGenericCaller) | The module establishing the communication between Fast2 and the designated database |
| Name of the new column  | `String`                                                   | The name of the column which will be added to the row with the value to update      |
| Table name              | `String`                                                   | The name of the SQL table on which all update statements will be performed          |

<b>Optional settings</b>

| Key                        | Type      | Description                                                                                                                               | Default value |
| -------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| WHERE clause               | `String`  | All matching rows will be updated. This field will be resolved by Fast2. Leave empty to target all rows.                                  |
| Ignore when no row updated | `Boolean` | Skip exception when no database row has been updated                                                                                      | `true `       |
| Value to update            | `String`  | Name (= key) of the document metadata whose value will be inserted into the row. If none is found in the document, this latter is skipped |
