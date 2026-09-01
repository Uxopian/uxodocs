---
viewer: classic
title: JDBC annotation storage
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/annotations/annotation-storage-jdbc
sidebar_position: 2
content_hash: 4016412122583257fc737f3a1f7870b0bb42ba0b517adc9ac1e4721dc7aa211b
---

# JDBC annotation storage

By default, ARender stores annotations as XFDF files on the local filesystem. The JDBC connector replaces that storage backend with a SQL database. Annotations are serialized as XFDF and stored in a single table, one row per document.

## When to use this guide

Use this guide when you need annotations to be stored in a shared relational database, for example to support multiple UI instances reading and writing the same annotation set, or to integrate with an existing database-backed content management environment.

## Prerequisites

- ARender UI deployed and able to reach the Document Service Broker
- A supported SQL database: SQL Server or HSQLDB (SQLite is used in tests only and is not recommended for production)
- JDBC driver JAR available on the classpath or in the application server
- The `jdbc-annotations` module on the classpath

## Database schema

Create one table before starting ARender. The table stores the full XFDF content of all annotations for each document as a BLOB.

**Standard schema (recommended)**

```sql title="schema.sql"
CREATE TABLE ANNOTATIONS (
    ANNO_ID    varchar(max) NULL,
    DOC_ID     varchar(max) NULL,
    CONTENT    blob         NULL
)
```

For SQL Server, use `varchar(max)` and `varbinary(max)` for the CONTENT column. For HSQLDB, use `varchar(20000)` and `BLOB`.

The standard accessor reads and writes `DOC_ID` and `CONTENT` only. `ANNO_ID` is part of the schema but is never populated — expect it to stay `NULL`.

Each document occupies **a single row** holding the XFDF payload for all of its annotations. Saving an annotation updates that row when it exists and inserts one otherwise, so adding an annotation to an already-annotated document does not create a new row. When verifying storage, compare the content of the row rather than counting rows.

**Versioned schema (optional)**

A versioned variant tracks annotation history per document and user. Use the table name `VANNOTATIONS`:

```sql title="schema.sql"
CREATE TABLE VANNOTATIONS (
    ANNO_ID       varchar(max) NULL,
    DOC_ID        varchar(max) NULL,
    USER_ID       varchar(max) NULL,
    VERSION       numeric      NULL,
    CONTENTSTRING varchar(max) NULL
)
```

The versioned accessor is available but its class (`VersionnedDocumentAnnotationAccessorJDBC`) is not the default. Use the standard schema unless you have a specific versioning requirement.

## Configuration properties reference

| Property | Description | Example |
|----------|-------------|---------|
| `arender.server.jdbc.driver.class.name` | Fully qualified JDBC driver class | `com.microsoft.sqlserver.jdbc.SQLServerDriver` |
| `arender.server.jdbc.url` | JDBC connection URL | `jdbc:sqlserver://host:1433;databaseName=DB` |
| `arender.server.jdbc.login` | Database user name | `arender_user` |
| `arender.server.jdbc.password` | Database password | `secret` |

These properties are only read if your `DataSource` bean references them through `${...}` placeholders. A bean declared with literal connection values ignores them entirely, in which case the connection details live in the bean definition and these properties can be omitted.

## Activating the JDBC accessor

Declaring the accessor bean is not enough on its own. ARender picks its annotation backend through a dedicated property, and its default value points at the file-based accessor. Until that property names your JDBC bean, the bean is created but never called: annotations keep going to the default storage.

Set the property to the bean id of your accessor definition:

```properties
arender.server.wrapper.source.annotation.accessor=jdbcAnnotationAccessor
```

The value is a Spring bean id from your own configuration — `jdbcAnnotationAccessor` above is an example, not a reserved name. The default is `xfdfAnnotationAccessor`, which stores annotations as XFDF files on the local filesystem.

Restart ARender after changing this property.

:::caution
If this property keeps its default value, the JDBC bean is silently unused: no exception is raised, nothing is logged, and the save operation still reports success to the user. Always confirm the setup by checking that a row appears in the `ANNOTATIONS` table after saving an annotation.
:::

The same property selects every other annotation backend. See [IBM FileNet integration](../integration/filenet.md) for an example where it points at a FileNet-native accessor, and [Viewer configuration](../../reference/viewer-configuration.md#url-parsers-and-annotation-accessors) for the full list of annotation accessor properties.

## JDBCAnnotationContentAccessor options

The `JDBCAnnotationContentAccessor` bean has additional optional properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tableName` | String | `ANNOTATIONS` | Name of the annotations table |
| `caseSensitive` | boolean | `true` | Whether document ID matching is case-sensitive |
| `reverseDocumentId` | boolean | `false` | Extract a specific parameter from the document ID as the storage key instead of the full ID string |
| `useDocumentIdArgument` | String | `documentId` | When `reverseDocumentId` is true, the parameter name to extract from the document ID |
| `useThreadSafeMode` | boolean | `false` | Use a synchronized, thread-safe accessor for concurrent write scenarios |

### Choosing what `DOC_ID` contains

By default `DOC_ID` stores ARender's internal document identifier, not your business identifier. That identifier is derived from the whole set of URL parameters used to open the document, and is prefixed with `b64_` followed by their base64 encoding. Two consequences are worth anticipating:

- A query filtering on your own document identifier returns nothing, because the stored value does not contain it in plain form.
- Parameters unrelated to document identity take part in the identifier. `device`, which ARender appends automatically, is one of them — so the same document opened from a desktop and from a mobile client produces two different `DOC_ID` values, and annotations are not shared between them.

Setting `reverseDocumentId` to `true` stores a business identifier instead. `useDocumentIdArgument` names the URL parameter to extract from the document identifier:

```xml
<property name="reverseDocumentId" value="true"/>
<property name="useDocumentIdArgument" value="docId"/>
```

The parameter name depends on the URL parser that opened the document — for example `docId` when the document is opened through a custom bean whose URL carries that parameter, or `id` when the FileNet connector builds the identifier itself. If the name matches no parameter of the document identifier, the save fails, so validate the setting on one document before rolling it out.

:::note
Use this option from the start when possible. Switching it on an existing installation changes the storage key, and rows written under the previous scheme are no longer matched.
:::

## Migration from file-based storage

The default file-based storage writes one XFDF file per document under `~/ARenderAnnotations/`. Migrating to JDBC requires:

1. Create the `ANNOTATIONS` table in your target database.
2. Configure the JDBC connection properties.
3. For each existing XFDF file, insert a row into the `ANNOTATIONS` table:
   - Set `DOC_ID` to the document identifier string used by ARender (the filename or external document ID).
   - Set `CONTENT` to the XFDF file content.
4. Verify the migration by opening a document in ARender and confirming annotations load correctly.

There is no automatic migration tool. The mapping between file names and document IDs depends on your connector configuration.

:::caution
Once you switch to JDBC storage, file-based annotations are no longer read. The two backends are not synchronized.
:::

## Troubleshooting

**Nothing is written to the database, and no log appears**: this is the expected symptom when the accessor was never activated. Check `arender.server.wrapper.source.annotation.accessor` first — see [Activating the JDBC accessor](#activating-the-jdbc-accessor).

**Annotations do not load after migration**: check that the `DOC_ID` values in the database match the document ID format ARender uses — see [Choosing what `DOC_ID` contains](#choosing-what-doc_id-contains). Enable debug logging on `com.arondor.viewer.jdbc` to trace the exact ID string being queried.

:::caution
Debug logging on `com.arondor.viewer.jdbc` is not always effective. The JDBC accessor logs through the log4j 1.x API, and some connector packages ship a log4j implementation that takes precedence over the bridge to the application log framework — the IBM FileNet CE connector is one of them. When that happens, `DEBUG` and `INFO` lines from the accessor never reach the log file even though the code runs normally, while `ERROR` lines still appear. A `log4j:WARN No appenders could be found` message at startup is the tell-tale sign. In that situation, verify storage by querying the database rather than by reading the logs.
:::

**Connection failures at startup**: verify the JDBC URL format for your database, confirm the driver JAR is on the classpath, and check that the database user has SELECT, INSERT, and UPDATE permissions on the `ANNOTATIONS` table.

**Concurrent write conflicts**: set `useThreadSafeMode=true` on the `JDBCAnnotationContentAccessor` bean if multiple requests modify annotations for the same document simultaneously.

## Related pages

- [Annotations concept](../../concepts/annotations.md)
- [XFDF annotation storage](./annotation-storage-xfdf.md)
- [Viewer configuration — URL parsers and annotation accessors](../../reference/viewer-configuration.md#url-parsers-and-annotation-accessors)
