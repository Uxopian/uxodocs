---
sidebar_position: 6
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: 426d771b5e9a2259996589fa02703f7cb17766398c4d608a5d7dc224cee73000
---

# Helper

## DctmConfiguration <small> - Module for customized Documentum configuration </small> {#DctmConfiguration data-toc-label="DctmConfiguration"}

<b>Optional settings</b>

| Key                             | Type      | Description                                                                                                                        | Default value                               |
| ------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Document ACL                    | `String`  | Default ACL to set for the document. Can be overrided by adding a value 'acl_name' as document metadata.                           |
| Annotations user                | `String`  | Default user in charge of retrieving the annotations. If not set, an error will be thrown.                                         | `dmadmin `                                  |
| Retrieve mime-type from content | `Boolean` | Ask Fast2 to get the document mime-type from the content encoding, instead of using 'DfClientX' provided by the Documentum client. | `true `                                     |
| Annotation ACL                  | `String`  | This ACL should have write access.                                                                                                 | `ar_company_wide `                          |
| Date format                     | `String`  | Date format which the documents will have to match in order to properly be loaded into Documentum.                                 | `dd/MM/yyyy `                               |
| Annotation path                 | `String`  | Path to the folder where the annotations will be retrieved by Fast2. If not set, an error will be thrown.                          | `/System/Applications/ARender/Annotations ` |

## WcmApiConfigSettings <small> - URL configuration </small> {#WcmApiConfigSettings data-toc-label="WcmApiConfigSettings"}

This class allows to configure several elements associated with a URL.

<b>Optional settings</b>

| Key                                   | Type     | Description |
| ------------------------------------- | -------- | ----------- |
| Download URL                          | `String` |             |
| Upload URL                            | `String` |             |
| Credentials portection for user token | `String` |             |
| Remote URL                            | `String` |             |
| Credentials protection                | `String` |             |
