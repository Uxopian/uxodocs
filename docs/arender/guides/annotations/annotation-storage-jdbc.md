---
title: JDBC annotation storage
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/annotations/annotation-storage-jdbc
sidebar_position: 1
content_hash: 88d125c254293ce0a7f5b6bb8ad02d286699bc302dd1db145ea16ebc3548edf6
---

# JDBC annotation storage

By default, ARender stores annotations as XFDF files on the local filesystem. The JDBC connector replaces that storage backend with a SQL database. Annotations are serialized as XFDF and stored in a single table, one row per document.

## When to use this guide

Use this guide when you need annotations to be stored in a shared relational database, for example to support multiple UI instances reading and writing the same annotation set, or to integrate with an existing database-backed content management environment.

## Prerequisites

- ARender UI deployed and able to reach the service broker
- A supported SQL database: SQL Server or HSQLDB (SQLite is used in tests only and is not recommended for production)
- JDBC driver JAR available on the classpath or in the application server
- The `jdbc-annotations` connector JAR included in your UI package (it is bundled in the `jdbc-hmi-war` package)

## Database schema

Create one table before starting ARender. The table stores the full XFDF content of all annotations for each document as a BLOB.

**Standard schema (recommended)**

```sql
CREATE TABLE ANNOTATIONS (
    ANNO_ID    varchar(max) NULL,
    DOC_ID     varchar(max) NULL,
    CONTENT    blob         NULL
)
```

For SQL Server, use `varchar(max)` and `varbinary(max)` for the CONTENT column. For HSQLDB, use `varchar(20000)` and `BLOB`.

**Versioned schema (optional)**

A versioned variant tracks annotation history per document and user. Use the table name `VANNOTATIONS`:

```sql
CREATE TABLE VANNOTATIONS (
    ANNO_ID       varchar(max) NULL,
    DOC_ID        varchar(max) NULL,
    USER_ID       varchar(max) NULL,
    VERSION       numeric      NULL,
    CONTENTSTRING varchar(max) NULL
)
```

The versioned accessor is available but its class (`VersionnedDocumentAnnotationAccessorJDBC`) is not the default. Use the standard schema unless you have a specific versioning requirement.

## Configuration

### Spring Boot (Docker or standalone)

Set the following properties in your `application.properties` or as environment variables on the UI container:

```properties
# JDBC driver class name
# SQL Server: com.microsoft.sqlserver.jdbc.SQLServerDriver
# HSQLDB: org.hsqldb.jdbc.JDBCDriver
arender.server.jdbc.driver.class.name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JDBC connection URL
# SQL Server example:
arender.server.jdbc.url=jdbc:sqlserver://db.example.com:1433;databaseName=ARenderDB

# Credentials
arender.server.jdbc.login=arender_user
arender.server.jdbc.password=secret
```

Environment variable equivalents (using the `ARENDERSRV_` prefix for the UI container):

```
ARENDERSRV_ARENDER_SERVER_JDBC_DRIVER_CLASS_NAME=com.microsoft.sqlserver.jdbc.SQLServerDriver
ARENDERSRV_ARENDER_SERVER_JDBC_URL=jdbc:sqlserver://db.example.com:1433;databaseName=ARenderDB
ARENDERSRV_ARENDER_SERVER_JDBC_LOGIN=arender_user
ARENDERSRV_ARENDER_SERVER_JDBC_PASSWORD=secret
```

### Spring XML (legacy WAR deployment)

In `arender-server-custom-jdbc.properties`, override the same three properties. The `arender-editor-specific-integration.xml` file in the JDBC package wires the `JDBCAnnotationContentAccessor` bean to the data source. No additional XML changes are required for the default setup.

If you use a JNDI data source defined in the application server, declare it in `arender-jndi-context.xml`:

```xml
<jee:jndi-lookup id="dataSourceReferenceJNDI"
                 jndi-name="jdbc/dataSourceReference"
                 expected-type="javax.sql.DataSource"
                 default-ref="fallBackDataSourceReference"/>
```

The `fallBackDataSourceReference` bean falls back to the `arender.server.jdbc.*` properties if the JNDI lookup fails.

## Configuration properties reference

| Property | Description | Example |
|----------|-------------|---------|
| `arender.server.jdbc.driver.class.name` | Fully qualified JDBC driver class | `com.microsoft.sqlserver.jdbc.SQLServerDriver` |
| `arender.server.jdbc.url` | JDBC connection URL | `jdbc:sqlserver://host:1433;databaseName=DB` |
| `arender.server.jdbc.login` | Database user name | `arender_user` |
| `arender.server.jdbc.password` | Database password | `secret` |

## JDBCAnnotationContentAccessor options

The `JDBCAnnotationContentAccessor` bean has additional optional properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tableName` | String | `ANNOTATIONS` | Name of the annotations table |
| `caseSensitive` | boolean | `true` | Whether document ID matching is case-sensitive |
| `reverseDocumentId` | boolean | `false` | Extract a specific parameter from the document ID as the storage key instead of the full ID string |
| `useDocumentIdArgument` | String | `documentId` | When `reverseDocumentId` is true, the parameter name to extract from the document ID |
| `useThreadSafeMode` | boolean | `false` | Use a synchronized, thread-safe accessor for concurrent write scenarios |

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

**Annotations do not load after migration**: check that the `DOC_ID` values in the database match the document ID format ARender uses. Enable debug logging on `com.arondor.viewer.jdbc` to trace the exact ID string being queried.

**Connection failures at startup**: verify the JDBC URL format for your database, confirm the driver JAR is on the classpath, and check that the database user has SELECT, INSERT, and UPDATE permissions on the `ANNOTATIONS` table.

**Concurrent write conflicts**: set `useThreadSafeMode=true` on the `JDBCAnnotationContentAccessor` bean if multiple requests modify annotations for the same document simultaneously.

## Related pages

- [Annotations concept](../../concepts/annotations.md)
- [Redaction guide](../features/redaction.md)
