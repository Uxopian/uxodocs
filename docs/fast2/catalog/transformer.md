---
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 695ad66aa57183cc167ea072ce8b7282d73b1f68ea11755ddc48964b95ab196e
---
## AlterDocumentContent <small> - Create, embed, delete or update document content </small> {#AlterDocumentContent data-toc-label="AlterDocumentContent"}

Use this task to remove existing content of a processed document, add content to this document based on a dynamically resolved path, of even more.

<b>Mandatory settings</b>

| Key          | Type    | Description                                                                                                                                                                                                                                                                                        |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content path | Pattern | The path of the content. Leave this value empty and check 'delete content' to delete the content. This value will be resolved by Fast2 prior to the task execution. Wildcard characters are supported. <br/> <p> Ex/ `${absolutePath}/myFile.txt`<br />`**/myFile.txt`<br />`${pattern}/*.txt`</p> |

<b>Optional settings</b>

| Key                       | Type          | Description                                                                                                                                                                                                           |
| ------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Check if file exists      | `Boolean`     | Check if the content referenced by the path is existing and accessible. If not, an exception is thrown. <br />If a wildcard is used as content path, the new content path will be skipped if this option is disabled. |
| Files to exclude          | `String list` | List here all patterns for files you wish to exclude. One line per match. <br/> <p> Ex/ <br />`**/*.xml`<br />`**/folder/to/exclude/`<br />`*.json` to ignore all JSON files</p>                                      |
| Add content as annotation | `Boolean`     | Check this option to add the content as annotation for document. If disabled, the content will be added as regular content to the document.                                                                           |
| Delete in-place content   | `Boolean`     | Override existing content with the new one, or remove the content attached to the document                                                                                                                            |

## AlterDocumentFolder <small> - Change document folders classification </small> {#AlterDocumentFolder data-toc-label="AlterDocumentFolder"}

<b>Optional settings</b>

| Key                                | Type                 | Description                                                 | Default value |
| ---------------------------------- | -------------------- | ----------------------------------------------------------- | ------------- |
| Clear existing folders             | `Boolean`            | Delete all existing folders                                 | `false `      |
| Create folders                     | `Boolean`            | Set the permission to create new folders                    | `true `       |
| Append as child to existing folder | `Boolean`            | Add as a child of an already existing folder the new folder | `false `      |
| Target folder class name           | Pattern              | The symbolic name of your new folder, i.e. the path         |
| Folder name to create              | Pattern              | Leave empty to not create folder                            |
| Property map                       | `String/Pattern map` | <br/> <p> Ex/ targetProperty = `${variableName}`</p>          |

## AlterDocumentProperties <small> - Alter multiple document properties </small> {#AlterDocumentProperties data-toc-label="AlterDocumentProperties"}

Dive into the punnet to go and modify one or more properties carried by the document

<b>Mandatory settings</b>

| Key          | Type                 | Description                                                                                                     |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| Property map | `String/Pattern map` | List of the properties to modify. One line per property <br/> <p> Ex/ targetProperty = documentStringGetter</p> |

## AlterPunnetProperty <small> - Create or update a punnet metadata </small> {#AlterPunnetProperty data-toc-label="AlterPunnetProperty"}

Dive at the punnet level to add (or udpate) one or more properties carried by the punnet itself

<b>Mandatory settings</b>

| Key             | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| Source metadata | Pattern | This field will be resolved by Fast2 prior to the task execution |

<b>Optional settings</b>

| Key             | Type     | Description                                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------- |
| Target property | `String` | Name of the porperty to change. If not set or empty, Fast2 will skip the document |

## ApplyDroolsTask <small> - Rules from Excel file </small> {#ApplyDroolsTask data-toc-label="ApplyDroolsTask"}

Apply functional and/or technical rules from an Excel file. Mainly used for mapping properties during complex migrations but can be used for simple data transformations.

<b>Mandatory settings</b>

| Key             | Type          | Description                                                               |
| --------------- | ------------- | ------------------------------------------------------------------------- |
| Worksheets name | `String list` | Apply the content of the mentioned sheet. Take the first sheet if not set |
| Excel file path | `String`      | Path to the Excel worksheet <br/> <p> Ex/ ../rules/example.xls</p>        |

<b>Optional settings</b>

| Key                           | Type      | Description                                                                                     | Default value |
| ----------------------------- | --------- | ----------------------------------------------------------------------------------------------- | ------------- |
| Static cache                  | `Boolean` | Use a static cache for rules file. If false, the Excel file will be refreshed for each campaign | `true `       |
| worksheet                     | `String`  |                                                                                                 |
| Worksheets character encoding | `String`  | Inform Fast2 of character encoding used by the worksheet                                        | `Cp1252 `     |

## CSVKeyValueParser <small> - CSV parser </small> {#CSVKeyValueParser data-toc-label="CSVKeyValueParser"}

Parse a CSV content and put parsed values as document data

<b>Mandatory settings</b>

| Key                       | Type     | Description                            |
| ------------------------- | -------- | -------------------------------------- |
| Document Id property name | `String` | Property name where the Id is based on |

<b>Optional settings</b>

| Key                      | Type     | Description                              | Default value                      |
| ------------------------ | -------- | ---------------------------------------- | ---------------------------------- |
| Regex to parse each line | `String` | The regex used for parsing each document | `^\"?([^\"]*)\"?;\"?([^\"]*)\"?$ ` |

## CSVQueryTask <small> - CSV Mapping: fetch data from a CSV file </small> {#CSVQueryTask data-toc-label="CSVQueryTask"}

Fetch data from CSV using a key and and extra data from the CSV columns.

<b>Optional settings</b>

| Key                           | Type          | Description                                                              | Default value         |
| ----------------------------- | ------------- | ------------------------------------------------------------------------ | --------------------- |
| Data name to report results   | `String`      | Name of the property where the result status is stored inside the punnet | `CsvQueryTaskStatus ` |
| Check result unicity          | `Boolean`     | If it's not, populate first found result                                 | `false `              |
| Definition of the CSV to read | CsvDescriptor |                                                                          |
| Skip exception                | `Boolean`     | Silent fail instead of throwing exceptions                               | `false `              |

## ContentURLResolver <small> - Build absolute URL for content </small> {#ContentURLResolver data-toc-label="ContentURLResolver"}

Simple Content URL renaming task : if target property (a list of string) is set, try to find the first path in this list which exists, converting this path to a fully-defined path including intermediary paths, corresponding documentId, extension, .... Otherwise, use Content URL included in Punnet as a wildcarded path (e.g. C:/input/_/_.xml), and resolve to a fully-defined path.

<b>Mandatory settings</b>

| Key           | Type     | Description                                                                                  |
| ------------- | -------- | -------------------------------------------------------------------------------------------- |
| Source folder | `String` | Path of the parent folder, which will be the common part for all target paths in target list |

<b>Optional settings</b>

| Key                                       | Type          | Description                                                                                                                                                                                | Default value |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| New mime type                             | `String`      | New mime type to set at the end of the new content path                                                                                                                                    |
| Extension to use                          | `String`      | Wildcards accepted                                                                                                                                                                         | `* `          |
| Process annotation contents               | `Boolean`     | If annotations are asked to be migrated, you can filter here to process their content(s) or only their metadata                                                                            | `false `      |
| Scan recursive content                    | `Boolean`     | Only convert terminal contents and not container ones                                                                                                                                      | `false `      |
| Mime type blacklist                       | `String`      | Restrict action on content with this mimetype                                                                                                                                              |
| Supported mime-types                      | `String list` | Specify the list of all mime-types of documents which Fast2 will convert                                                                                                                   |
| List of paths to resolve                  | `String list` | Regex wildcards accepted                                                                                                                                                                   |
| Throw conversion exceptions               | `Boolean`     | If Fast2 performs document conversion, it can either fail silently or pop an error when the action has not been properly completed                                                         | `true `       |
| Exception on multi-page content           | `Boolean`     | Ask Fast2 to throw a task exception when running into multi-page contents                                                                                                                  | `false `      |
| Mime-type : Check document before content | `Boolean`     | You can assume the file extension is accurate, or ask Fast2 to check the content encoding to identify more precisely the document mime-type. By default, Fast2 will check at content level | `false `      |
| findMimeType                              | `Boolean`     |                                                                                                                                                                                            |
| Process all contents                      | `Boolean`     | Fast2 will either only focus on the first encountered content, or process them all                                                                                                         | `true `       |

## ConvertAndSaveIS <small> - Convert FileNet Image Services annotations </small> {#ConvertAndSaveIS data-toc-label="ConvertAndSaveIS"}

This task is used to perform the IS annotation conversion and its save into a target referential

<b>Mandatory settings</b>

| Key                  | Type                           | Description                                             |
| -------------------- | ------------------------------ | ------------------------------------------------------- |
| Annotation converter | FileNetXFDFAnnotationConverter | The FileNet XFDF module used to convert the annotations |
| IS annotation parser | ParseISAnnotation              | Specific module to parse the Image Services annotations |

<b>Optional settings</b>

| Key                                      | Type               | Description                                                                                                            | Default value                 |
| ---------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Status for all annotation converted      | `String`           | Value when all annotation have been converted                                                                          | `2 `                          |
| Status for some annotations in exception | `String`           | Value when some annotation are in exception                                                                            | `8 `                          |
| Property name result                     | `String`           | Keep the conversion result                                                                                             | `AnnotationConversionStatut ` |
| Skip conversion error                    | `Boolean`          | Either Fast2 will throw an exception if an error occured during the conversion, or it will skip to the next annotation | `false `                      |
| Convert annotation to XFDF               | `Boolean`          | Either Fast2 converts during annotation process, or leave the annotation to its original format                        | `true `                       |
| Annotation accessor                      | AnnotationAccessor | Choose annotation accessor to save annotations                                                                         |
| Document layout DPI                      | `Float`            | Set here the layout DPI for the document                                                                               | `72.0 `                       |
| Status for no-conversion annotation      | `String`           | Value when no annotation has been converted                                                                            | `9 `                          |

## ConvertDateProperties <small> - Convert multiple document/folder date properties </small> {#ConvertDateProperties data-toc-label="ConvertDateProperties"}

Easily convert date properties from one format to another.

<b>Mandatory settings</b>

| Key                | Type           | Description                                                             |
| ------------------ | -------------- | ----------------------------------------------------------------------- |
| Properties names   | `List<String>` | Names of the properties to convert. One line per property               |
| Input date format  | `String`       | Original date format of the properties to convert (Ex: yyyy-MM-dd)      |
| Output date format | `String`       | Desired date format of the properties after conversion (Ex: dd/MM/yyyy) |
| Input locale       | `String`       | Locale of the input date format (Ex: en-US, fr-FR, de-DE)               |
| Output locale      | `String`       | Locale of the output date format (Ex: en-GB, es-ES, pt-BR)              |

## DeleteContent <small> - Delete local content </small> {#DeleteContent data-toc-label="DeleteContent"}

Delete the content of your document within your file system. It will retrieve the files targeted by the URL of all the document contents in your punnet

<b>Optional settings</b>

| Key                                  | Type      | Description                                                                                                                                                                   | Default value |
| ------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Delay between two deletion attempt   | `Integer` | Delay in milliseconds                                                                                                                                                         | `1000 `       |
| File path to delete                  | `String`  | Used as prefix to select files to delete. This field can be see as a whitelist of the contents to delete. If empty, all accessible contents will be deleted from the machine. |
| Exception when deletion failed       | `Boolean` | Thrown an exception if the file has been found but the delete operation failed.                                                                                               | `true `       |
| Maximum number of tries for deletion | `Integer` | Thrown an exception if the file has not been deleted after this number of tries                                                                                               | `10 `         |
| Delete content entry                 | `Boolean` | Erase the URL entry from the document, in the punnet.                                                                                                                         | `true `       |
| Exception when file does not exist   | `Boolean` | Throw an exception if file does not exist. Otherwise, silent fail                                                                                                             | `true `       |

## EmbeddedDbQuery <small> - Query the embedded OpenSearch database </small> {#EmbeddedDbQuery data-toc-label="EmbeddedDbQuery"}

Provide a campaign name, task name, and unique ID field to find a single punnet in the embedded OpenSearch database.

<b>Mandatory settings</b>

| Key | Type                             | Description |
| --- | -------------------------------- | ----------- |
| Embedded Db connection provider | [EmbeddedDbConnectionProvider](credentials.md#EmbeddedDbConnectionProvider) | |
| Campaign prefix | `String` | Generally Map name, but can be changed, so the part that comes before _Run# |
| Fields for OpenSearch query | `String/Pattern map` | Fields used to construct OpenSearch query. Recommended to include at least the following 3: campaign.keyword, stepName.keyword, punnet.documents.documentId.keyword (or similar unique ID). The query should only return one punnet. |
| Data to enrich current punnet | `String/Pattern map` | List of data coming from the OpenSearch fetched punnet to add to the current punnet. Give a literal name such as edb-hash and an expression to fill the value like `${hash}` or `${property('file:content:digest')}` for properties with colons in the name. |

## FileNet35ExtraSearchTask <small> - File Net search </small> {#FileNet35ExtraSearchTask data-toc-label="FileNet35ExtraSearchTask"}

Find your documents inside your File Net 3.5 instance.

<b>Optional settings</b>

| Key | Type                             | Description |
| --- | -------------------------------- | ----------- |
|     | FileNet35ExtraSearchTaskSettings |             |

## JSTransform <small> - JavaScript evaluation task </small> {#JSTransform data-toc-label="JSTransform"}

This task serves the purpose of modifying a punnet based on instructions embedded into a JavaScript snippet. The latter can be either directly pasted as task parameter, or read from a given path. If both these ways are used, the task will only consider the script pasted in.

:::info

The core engine responsible for executing JavaScript transformations has been upgraded from Fast2 2025.4.1, replacing the legacy **Nashorn** engine with the modern and high-performance **GraalVM JS**.
The new engine is configured to be **fully backward-compatible**. All existing JavaScript transformation scripts written for Nashorn will continue to function seamlessly without requiring any modifications.

:::

<b>Mandatory settings</b>

| Key                        | Type     | Description                                                                                                                                                |
| -------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Script or script file path | `String` | Javascript source or path to JavaScript file with preloaded script. Ex: C:/fast2/script.js OR punnet.getDataSet().addData(\"data\",\"String\", \"value\"); |

<b>Optional settings</b>

| Key                           | Type     | Description                                                                                                                         | Default value |
| ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| (Deprecated) Script file path | `String` | Path to JavaScript file with preloaded script. Deprecated: use script property instead.                                             |
| Script engine                 | `String` | Script engine to use for the JS execution. Use 'nashorn' for JDK8. Other options are available, such as js, javascript, ecmascript. | `nashorn `    |

## MailDeleter <small> - Remove mails </small> {#MailDeleter data-toc-label="MailDeleter"}

This class allow you to connect to your mail box and select mails to delete. You can search among your mails by term or properties

<b>Optional settings</b>

| Key                           | Type                                              | Description                                                           | Default value    |
| ----------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- | ---------------- |
| Mail connection provider      | [MailBoxProvider](credentials.md#MailBoxProvider) |                                                                       |
| Maximum connection ttl        | `Long`                                            | Time in milliseconds                                                  | `60 `            |
| Search term type              | `String`                                          |                                                                       | `Message-Id `    |
| Pattern to evaluate property  | `String`                                          |                                                                       | `${Message-Id} ` |
| Exception when mail not found | `Boolean`                                         | Throw an exception when the mail is not found. Otherwise, silent fail | `true `          |
| Save message changes          | `Boolean`                                         |                                                                       | `true `          |

## RenameDocumentProperties <small> - Rename multiple document properties </small> {#RenameDocumentProperties data-toc-label="RenameDocumentProperties"}

Dive into the punnet to rename one or more properties carried by the document.

<b>Mandatory settings</b>

| Key          | Type                | Description                                                                                                     |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Property map | `String/String map` | List of the properties to rename. One line per property <br/> <p> Ex/ targetProperty = documentStringGetter</p> |

<b>Optional settings</b>

| Key                                     | Type      | Description                                                                 | Default value |
| --------------------------------------- | --------- | --------------------------------------------------------------------------- | ------------- |
| Exception when property rename conflict | `Boolean` | Throws an exception if the target property exists, otherwise fails silently | `true `       |

## UpdateSharedObject <small> - Update a shared object value from its name </small> {#UpdateSharedObject data-toc-label="UpdateSharedObject"}

Use this task to change a system-wide configuration setting at runtime. Mainly used for dynamic campaign variables built as a shared object in Fast2. Be careful: only works with shared object set with Global scope

<b>Mandatory settings</b>

| Key                          | Type     | Description                                                                                                                                                                                                                                                                                          |
| ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared object new value      | `String` | Can be almost any type of variable (String, int...) except object and tasks of the Fast2 catalog. You can also access to any custom document data value from the pattern using `${variableName}`. Already known variables : base, campaign, taskFlowMap, step, punnetTraceId, punnetId and documentId. |
| Shared object name to update | `String` | Name of the object to update. The shared object will be automatically created if does not already exists.                                                                                                                                                                                            |

<b>Optional settings</b>

| Key                  | Type      | Description                                 | Default value |
| -------------------- | --------- | ------------------------------------------- | ------------- |
| Number of executions | `Integer` | Means the number of executions per campaign | `1 `          |

## XSLTransform <small> - Apply a XSL transformation on XML Punnets </small> {#XSLTransform data-toc-label="XSLTransform"}

With pretty much straight-forward task you can fine-tune any punnet or document metadata, or even the content targetted by the migration. Build your custom XSL file, and ask Fast2 to apply the changes onto the migration-related data

<b>Mandatory settings</b>

| Key           | Type     | Description                                                                                                                                       |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| XSL file path | `String` | Specify here the absolute path of the XSL file, as well as the name and the extension of the file. This file can be located on a separate machine |

<b>Optional settings</b>

| Key                    | Type     | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| XSL Stylesheet content | `String` | Enter here your xsl:stylesheet content |
