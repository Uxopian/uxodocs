---
sidebar_position: 2
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f46fcfe8ff94f84b5397f4d97e41a6d12e144c4acfe25f1fbd8d442d16857d85
---

# Content sources

## AWSContentSource <small> - Extract content from AWS S3 bucket </small> {#AWSContentSource data-toc-label="AWSContentSource"}

<b>Mandatory settings</b>

| Key                    | Type                                                       | Description                                                                     |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| AWS access credentials | [AWSConnectionProvider](credentials#AWSConnectionProvider) | Credentials of the user (must have been granted AmazonS3FullAccess permission). |

<b>Optional settings</b>

| Key                                    | Type      | Description                                                                                                                                                                                                                         | Default value |
| -------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| ARN key for getAwsPrefixKMS encryption | `String`  |                                                                                                                                                                                                                                     |
| Bucket name                            | `String`  | Name of the S3 bucket where the content is stored.                                                                                                                                                                                  | `${bucket} `  |
| Content path (S3 object key)           | `String`  | Path leading to S3 object corresponding to the content you intend to extract from the bucket. To use this options, you must enable the content extraction option. <br/> <p> Ex/ `${contentPath}`</p>                                |
| Extract contents                       | `Boolean` | All existing contents of documents will be replaced by the newly found contents, retrieved from the S3 bucket. If the S3 objects are parsed as punnets, then the contents will be attached based on the 'Content path' input field. |
| Process s3 objects as punnets          | `Boolean` |                                                                                                                                                                                                                                     |

## AlfrescoContentExtractor <small> - Alfresco content extractor using CMIS technology </small> {#AlfrescoContentExtractor data-toc-label="AlfrescoContentExtractor"}

This alfresco extractor will use the CMIS technology to fetch your document content from a given Alfresco repository

<b>Mandatory settings</b>

| Key                          | Type                                                                         | Description              |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------ |
| Alfresco connection provider | [AlfrescoCMISConnectionProvider](credentials#AlfrescoCMISConnectionProvider) | CMIS version must be 1.1 |

<b>Optional settings</b>

| Key                      | Type           | Description | Default value |
| ------------------------ | -------------- | ----------- | ------------- |
| Property Helper          | PropertyHelper |             |
| Extract document content | `Boolean`      |             | `true `       |

## AlfrescoRestContentExtractor <small> - Alfresco content extractor using Alfresco REST protocol </small> {#AlfrescoRestContentExtractor data-toc-label="AlfrescoRestContentExtractor"}

This task relies on the Alfresco public REST API (with v1.0.4 of the Alfresco REST client) to retrieve documents and metadata into a given Alfresco instance

<b>Mandatory settings</b>

| Key                          | Type                                                                         | Description |
| ---------------------------- | ---------------------------------------------------------------------------- | ----------- |
| Alfresco connection provider | [AlfrescoRESTConnectionProvider](credentials#AlfrescoRESTConnectionProvider) |             |

<b>Optional settings</b>

| Key                              | Type      | Description                                                                                                                                                                                                                                                                              | Default value               |
| -------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Date format                      | `String`  |                                                                                                                                                                                                                                                                                          | `E MMM dd HH:mm:ss Z YYYY ` |
| CMIS query                       | `String`  | CMIS SQL query, pattern resolvable, to fetch document based on alternative data. Using this feature will create new docs in the punnet with corresponding ID of documents. Consider following this task with a secondary AlfrescoRestContentExtractor task to extract data and contents. |
| Extract content                  | `Boolean` |                                                                                                                                                                                                                                                                                          |
| Extract all versions             | `Boolean` | Extract the superseded versions of the documents matching the query                                                                                                                                                                                                                      |
| Extract parent site              | `Boolean` | If the document is not stored in an Alfresco site, nothing will happen. Otherwise, the site details will be attached to the punnet dataset.                                                                                                                                              |
| Map permissions                  | `Boolean` | Map permissions to either the document, folder or site.                                                                                                                                                                                                                                  |
| Map parent folder                | `Boolean` | Map direct parent folder info onto the related document.                                                                                                                                                                                                                                 |
| Extract folders as tree          | `Boolean` | Extract folders as tree, with all parent folders. This option must be selected if you wish to map permissions of parent folders.                                                                                                                                                         |
| Extract users as email addresses | `Boolean` |                                                                                                                                                                                                                                                                                          |

## AlfrescoRestSiteExtractor <small> - Alfresco Site extractor using Alfresco REST protocol </small> {#AlfrescoRestSiteExtractor data-toc-label="AlfrescoRestSiteExtractor"}

This task relies on the Alfresco public REST API (with v1.0.4 of the Alfresco REST client) to retrieve sites into a given Alfresco instance.

<b>Mandatory settings</b>

| Key                          | Type                                                                         | Description                                    | Default value    |
| ---------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------- | ---------------- |
| Alfresco connection provider | [AlfrescoRESTConnectionProvider](credentials#AlfrescoRESTConnectionProvider) |                                                |                  |
| AFTS query                   | `String`                                                                     | Query used to retrieve all sites from Alfresco | TYPE:\"st:site\" |

## CMContentExtractor <small> - Basic content extractor from Content Manager </small> {#CMContentExtractor data-toc-label="CMContentExtractor"}

This class is dedicated to the extraction of content for the Content Manager solution. You'll have the possiblity to extract annotations, custom properties or even logs.

<b>Mandatory settings</b>

| Key                    | Type                                                     | Description |
| ---------------------- | -------------------------------------------------------- | ----------- |
| CM connection provider | [CMConnectionProvider](credentials#CMConnectionProvider) |             |

<b>Optional settings</b>

| Key                                                  | Type      | Description | Default value |
| ---------------------------------------------------- | --------- | ----------- | ------------- |
| Extact history logs                                  | `Boolean` |             | `true `       |
| Extract standard system properties                   | `Boolean` |             | `true `       |
| Extract advanced system properties from DKDDO object | `Boolean` |             | `true `       |
| Extract document annotation                          | `Boolean` |             | `false `      |
| Extract note logs                                    | `Boolean` |             | `false `      |
| Extract custom properties                            | `Boolean` |             | `true `       |
| Extract note logs as annotations                     | `Boolean` |             | `false `      |
| Extract document content                             | `Boolean` |             | `true `       |

## CMODContentExtractor <small> - Basic CMOD content extractor </small> {#CMODContentExtractor data-toc-label="CMODContentExtractor"}

<b>Mandatory settings</b>

| Key                      | Type                                                         | Description |
| ------------------------ | ------------------------------------------------------------ | ----------- |
| CMOD Connection Settings | [CMODConnectionProvider](credentials#CMODConnectionProvider) |             |

<b>Optional settings</b>

| Key                             | Type      | Description | Default value    |
| ------------------------------- | --------- | ----------- | ---------------- |
| Pattern to store resource files | `String`  |             | `${resourceId} ` |
| Export attached CMOD resources  | `Boolean` |             | `true `          |

## DctmContentExtractor <small> - Extract document-related details from Documentum </small> {#DctmContentExtractor data-toc-label="DctmContentExtractor"}

This Documentum connector is designed for extraction of document versions, metadata, folders and content (only the 1st content of a document) from a Documentum repository. Multiversion documents will be retrieved from the shared 'i_chronicle_id'. Since Documentum architecture involves particular port and access management, a worker should be started on the same server where Documentum is running; <br/><br/>Make sure to check the basic requirements at <a href="https://www.fast2.tech/documentation/setup-with-environment/documentum/">the setup for Documentum</a> on the official Fast2 documentation.

<b>Optional settings</b>

| Key                                            | Type                                                         | Description                                                                                                                                                                      | Default value |
| ---------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Connexion information to Documentum Repository | [DctmConnectionProvider](credentials#DctmConnectionProvider) |                                                                                                                                                                                  |
| Extract folders                                | `Boolean`                                                    |                                                                                                                                                                                  | `true `       |
| Map empty or unset properties                  | `Boolean`                                                    | Attach Documentum metadata onto document dataset even if the value is missing or unset.                                                                                          |
| Extract renditions                             | `Boolean`                                                    | Check this option to extract renditions of each document. They will be attached as side-contents in the document, with properties populated from original renditions properties. |
| Whitelist for metadata to extract              | `String`                                                     | All values need to be separated by comma `,`.                                                                                                                                    |
| Extract metadata                               | `Boolean`                                                    |                                                                                                                                                                                  | `true `       |
| Continue on fail                               | `Boolean`                                                    | If `true`, any error which occurs during extraction of either metadata, content or folders will trigger an exception. Otherwise, the error will be found in the logs.            |
| Extract content                                | `Boolean`                                                    |                                                                                                                                                                                  | `true `       |
| Extract all versions                           | `Boolean`                                                    |                                                                                                                                                                                  |

## FileNet35ContentSource <small> - Extract content from FileNet 3.5 </small> {#FileNet35ContentSource data-toc-label="FileNet35ContentSource"}

Use this task to retrieve content of documents to extract from a given FileNet instance. This task needs to be preceeded by a FileNet35Source task.

<b>Mandatory settings</b>

| Key                             | Type                                                                   | Description                                   |
| ------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| FileNet 3.5 connection provider | [FileNet35ConnectionProvider](credentials#FileNet35ConnectionProvider) | Connection parameters to the FileNet instance |

<b>Optional settings</b>

| Key                                      | Type      | Description                                        | Default value |
| ---------------------------------------- | --------- | -------------------------------------------------- | ------------- |
| Ignore documents with zero-sized content | `Boolean` | Document without any content will not be processed | `false `      |

## FileNetContentExtractor <small> - Extract document content from FileNet P8 </small> {#FileNetContentExtractor data-toc-label="FileNetContentExtractor"}

This task is not a real source task. The documents to be extracted are identified by an BlankSource task generating a set of 'empty' Punnets, i.e. containing only documents each bearing a document number (documentId) to extract.

<b>Mandatory settings</b>

| Key                         | Type                                                               | Description                                   |
| --------------------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| FileNet connection provider | [FileNetConnectionProvider](credentials#FileNetConnectionProvider) | Connection parameters to the FileNet instance |

<b>Optional settings</b>

| Key                                          | Type                                  | Description                                                                                                                                               | Default value |
| -------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Property Helper to use                       | [PropertyHelper](tool#PropertyHelper) |                                                                                                                                                           |
| Extract object type properties               | `Boolean`                             | The FileNet P8 metadata of the document which are Object type will be saved at the punnet level                                                           | `false `      |
| Compound parent data for children references | `String`                              | Name of the parent document property under which the children properties will be stored.                                                                  |
| Object store name                            | `String`                              | Name of the repository to extract from                                                                                                                    |
| Compound children data to record             | `String`                              | Name of the child property to store in the parent. Consider setting parent data name as well.                                                             |
| Extract FileNet system properties            | `Boolean`                             | Save the FileNet system properties as document metadata                                                                                                   | `false `      |
| Default mimetype                             | `String`                              | Default mimetype to set if the one from FileNet is empty                                                                                                  |
| Skip annotation exceptions                   | `Boolean`                             | Extract documents even if related annotations are in exception like null content                                                                          | `false `      |
| Extract FileNet security                     | `Boolean`                             | The security of the document will be saved at the punnet level                                                                                            | `false `      |
| SQL fetch query                              | `String`                              | Use this SQL to fetch documents based on your criteria. <br/> <p> Ex/ SELECT [Id],[DocumentTitle] FROM Document WHERE [Property] = `'${myCriterion}'`</p> |
| Extract folders absolute path                | `Boolean`                             | The absolute path of the folder inside the FileNet instance will be extracted during the process                                                          | `false `      |
| Extract content                              | `Boolean`                             | The document content will be extracted during the process                                                                                                 | `true `       |
| Extract all versions                         | `Boolean`                             | Extract the superseded versions of the documents matching the query                                                                                       |
| Extract annotations                          | `Boolean`                             | All annotations owned by the document will be extracted                                                                                                   | `true `       |

## FlowerContentExtractor <small> - </small> {#FlowerContentExtractor data-toc-label="FlowerContentExtractor"}

<b>Mandatory settings</b>

| Key                                                                  | Type     | Description |
| -------------------------------------------------------------------- | -------- | ----------- |
| Flower component category (DOCUMENT, TASK, FOLDER or VIRTUAL_FOLDER) | `String` |             |

<b>Optional settings</b>

| Key                           | Type                                                                     | Description | Default value |
| ----------------------------- | ------------------------------------------------------------------------ | ----------- | ------------- |
| Extract document annotations  | `Boolean`                                                                |             | `false `      |
| Extract component facts       | `Boolean`                                                                |             | `false `      |
|                               | [FlowerDocsConnectionProvider](credentials#FlowerDocsConnectionProvider) |             |
| Extract document file content | `Boolean`                                                                |             | `false `      |

## IDMISContentExtractor <small> - ImageServices WAL JNI-bridged Extractor </small> {#IDMISContentExtractor data-toc-label="IDMISContentExtractor"}

This task extracts documents from the Panagon Image Services ECM (indexes, optional content and annotations). One punnet of one document for each ECM document. However, it's not a real source task. The documents to be extracted are identified by a [BlankSource](#BlankSource) task generating a set of empty Punnets, i.e. containing only documents each bearing a document number (documentId) to extract.

<b>Mandatory settings</b>

| Key                     | Type     | Description                                               |
| ----------------------- | -------- | --------------------------------------------------------- |
| Password                | `String` | Password of the aforementioned username                   |
| Connection organization | `String` | Organization name for the connection                      |
| Connection domain       | `String` | Domain name of the connection                             |
| Username                | `String` | Login with scope to access the docbase with proper rights |

<b>Optional settings</b>

| Key                               | Type              | Description                                                                                                                                                                                                                                                                                                                                | Default value      |
| --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Annotations in ARender format     | `Boolean`         | Convert annotations to ARender format                                                                                                                                                                                                                                                                                                      | `false `           |
| Annotation converter              | ParseISAnnotation | Specific converter from IS format. Allow to resize the extracted annotations                                                                                                                                                                                                                                                               |
| Annotations in raw format         | `Boolean`         | Save annotation contents in raw format inside the punnet                                                                                                                                                                                                                                                                                   | `false `           |
| Version of libIDMIS               | `String`          | This task is based on the WAL library and on the specific Fast2 library 'libIDMIS.dll'. This library must be in a directory of the Windows PATH. In the wrapper.conf or hmi-wrapper.conf file, activate the use of this library: wrapper.java.library.path.increment = ../libIDMIS/w32For the moment, only 32-bit libraries are configured | `libIDMIS-1.0.15 ` |
| Test scenarios                    | `Boolean`         | Empty testing stub instead of libIDMIS                                                                                                                                                                                                                                                                                                     | `false `           |
| Connection terminal               | `String`          | Terminal name for the connection                                                                                                                                                                                                                                                                                                           |
| Use opacity for annotations       | `Boolean`         |                                                                                                                                                                                                                                                                                                                                            | `false `           |
| Unrecognized annotation file path | `String`          | Path of the alternative annotation xml file for unrecognized annotation. If not specified the punnet will go in exception                                                                                                                                                                                                                  |
| Extract document content          | `Boolean`         | The document will be extracted with its content                                                                                                                                                                                                                                                                                            | `true `            |
| Extract document annotation       | `Boolean`         | The associated annotations will be extracted                                                                                                                                                                                                                                                                                               | `true `            |

## MDOParserExternalContent <small> - Parse FWTF (Fixed Width Text File) with external content to a punnet description </small> {#MDOParserExternalContent data-toc-label="MDOParserExternalContent"}

An MDO file is a flat file defined such as: each line corresponds to a document and each line contains information about the document
The extraction of information from each line is based on a CSV configuration file, which provides the name of the metadata to be inserted into the punnet document, as well as its characteristics.

It consists of the following columns, separated by a comma:

- Field: name of the metadata to add \n
- Length: length of the metadata. If the value is greater than this length, then it will be truncated. If the value is lower, it will be completed by spaces on the right \n
- Offset: position in MDO file \n
- Mandatory: Y / N \n
- Occurs: number of occurrences allowed for the field. The successive values ​​of the field will then be added to the values ​​of the metadata (respecting the Length parameter for each one) \n
- Type: Type of metadata to add to the punnet document \n

The MDOParserExternalContent task is used to retrieve external content for each document. To do this, the name of the column defining the content path is specified in the task settings.

<b>Mandatory settings</b>

| Key                                | Type     | Description                                                              |
| ---------------------------------- | -------- | ------------------------------------------------------------------------ |
| MDO format specification file path | `String` | CSV configuration absolute file path containing MDO format specification |

<b>Optional settings</b>

| Key                                         | Type        | Description                                                                                                                                                                                     | Default value |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| File scanner                                | FileScanner | Recovers your files                                                                                                                                                                             |
| Date format                                 | `String`    | Date format used in MDO file. Must be the same for each line of the document                                                                                                                    | `yyyy-MM-dd ` |
| Property name containing path content       | `String`    | Name of the field in the configuration file that contains the path to the content. If not filled, the content will not be saved in the punnet                                                   |
| Create one punnet for each document of FWTF | `Boolean`   | If true then a punnet with one document will be created for each entry in the MDO file. Otherwise, one punnet will be created containing as many documents as there are entries in the MDO file | `false `      |
| Dataline property name                      | `String`    | Name of the metadata that will contain the MDO line read. If not specified, the line read will not be saved in the punnet                                                                       |
| contentLocationAbsolute                     | `Boolean`   |                                                                                                                                                                                                 |
| Last punnet property name                   | `String`    | Data name indicating which punnet is the last of document in punnet. If null, data isn't added in punnet. For multipunnet case only                                                             |

## MDOParserInternalContent <small> - FWTF (Fixed Width Text File) parser with internal content </small> {#MDOParserInternalContent data-toc-label="MDOParserInternalContent"}

Like the MDOParserExternalContent task, the MDOParserExternalContent source allows you to parse each line of the MDO file in Punnet. The difference between these two tasks is that the content is stored inside the MDO itself. The start and end of the content is defined by a tag specified in the task settings

<b>Mandatory settings</b>

| Key                                | Type     | Description                                                              |
| ---------------------------------- | -------- | ------------------------------------------------------------------------ |
| MDO format specification file path | `String` | CSV configuration absolute file path containing MDO format specification |

<b>Optional settings</b>

| Key                                         | Type        | Description                                                                                                                                                                                     | Default value |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| File scanner                                | FileScanner | Recovers your files                                                                                                                                                                             |
| Date format                                 | `String`    | Date format used in MDO file. Must be the same for each line of the document                                                                                                                    | `yyyy-MM-dd ` |
| End tag                                     | `String`    | End tag property name signifying the end of the content                                                                                                                                         |
| Create one punnet for each document of FWTF | `Boolean`   | If true then a punnet with one document will be created for each entry in the MDO file. Otherwise, one punnet will be created containing as many documents as there are entries in the MDO file | `false `      |
| Dataline property name                      | `String`    | Name of the metadata that will contain the MDO line read. If not specified, the line read will not be saved in the punnet                                                                       |
| Last punnet property name                   | `String`    | Data name indicating which punnet is the last of document in punnet. If null, data isn't added in punnet. For multipunnet case only                                                             |
| Original text content property name         | `String`    | Data name containing original text content. If null, data isn't added in the punnet                                                                                                             |

## OpenTextContentSource <small> - OpenText content extractor using OpenText REST protocol </small> {#OpenTextContentSource data-toc-label="OpenTextContentSource"}

<b>Mandatory settings</b>

| Key                  | Type                                                   | Description |
| -------------------- | ------------------------------------------------------ | ----------- |
| OpenText credentials | [OpenTextCredentials](credentials#OpenTextCredentials) |             |
| OpenText client      | OpenTextRestClient                                     |             |

<b>Optional settings</b>

| Key                         | Type      | Description                                                         | Default value |
| --------------------------- | --------- | ------------------------------------------------------------------- | ------------- |
| Extract all versions        | `Boolean` | Extract the superseded versions of the documents matching the query |
| Extract document metadata   | `Boolean` | Save metadata as document metadata                                  | `false `      |
| Extract document categories | `Boolean` | Save categories as document metadata                                | `false `      |
| Extract content             | `Boolean` | The document content will be extracted during the process           | `true `       |
| Ticket period               | `Integer` | Time in seconds between two ticket creation                         | `60 `         |

## SQLContentExtractor <small> - Extract document content from SQL </small> {#SQLContentExtractor data-toc-label="SQLContentExtractor"}

Extract clob and blob object-types. Classic types like varchar are extraced as well

<b>Mandatory settings</b>

| Key                     | Type                                                       | Description                                                                |
| ----------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| SQL connection provider | [SQLQueryGenericCaller](credentials#SQLQueryGenericCaller) |                                                                            |
| SQL query               | Pattern                                                    | Select precisely documents you want to extract through a classic SQL query |

<b>Optional settings</b>

| Key                     | Type                | Description                                    |
| ----------------------- | ------------------- | ---------------------------------------------- |
| SQL mapping for content | `String/String map` | Mapping of SQL properties to document content. |
