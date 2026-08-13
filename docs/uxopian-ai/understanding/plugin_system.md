---
title: Plugin system
sidebar_label: Plugin system
sidebar_position: 10
last_update:
  date: '2026-04-21T08:21:12.539Z'
  author: CI/CD Bot
content_hash: 121de5445a99c591a9f0c967bd42670a6deeb857b22ed9eedbe05df42fe7ba16
---

Uxopian AI extends its capabilities through plugins. A plugin is a shaded JAR placed in the `plugins/` directory. At startup, `IntegrationLoader` scans all JARs in that directory and registers their Spring beans in the application context.

## Why plugins exist

The core `uxopian-ai` image is kept independent of specific enterprise integrations. ARender, FlowerDocs, and custom tools are shipped as separate JARs that are loaded on demand. This allows deploying only the integrations relevant to a given environment.

## How plugins are loaded

```mermaid
flowchart TD
    Start["Application startup"]
    IL["IntegrationLoader<br/>(ClassGraph scan)"]
    JARs["plugins/ directory<br/>*.jar files"]
    S1["1. Register @Service / @Component<br/>internal dependencies"]
    S2["2. Register @HelperService beans<br/>as named expression objects"]
    S3["3. Register @ToolService beans<br/>as LLM-callable tools"]
    Done["Beans available in application context"]

    Start --> IL
    IL --> JARs
    JARs --> S1 --> S2 --> S3 --> Done
```

*Figure: Registration order within each scanned plugin JAR.*

## Plugin directory

The default plugins directory is `plugins/` relative to the working directory. It is configurable via the `plugins.root.path` property (or `PLUGINS_ROOT_PATH` environment variable). In the Docker Compose example, plugin JARs are included in the image and unpacked to the configured path at startup.

## Registration order

Within each JAR, `IntegrationLoader` registers beans in this order:

1. **Internal `@Service`/`@Component` beans**: dependencies of helpers and tools. These are registered first so that helpers and tools can autowire them.
2. **`@HelperService` beans**: registered under the name specified in `@HelperService(name="...")`. This name is how Thymeleaf prompt templates reference the helper.
3. **`@ToolService` beans**: registered and collected by `ToolExecutor` to build the list of LLM-callable methods.

If a bean name conflicts with an already-registered bean, `IntegrationLoader` logs a warning and skips the duplicate.

## Shipped plugins

Starting with 2026.0.0-ft3, each integration is packaged as a single shaded JAR per domain — `connector` and `helper` classes are shaded into the `tool` (or, for integrations without a tool, directly into the helper JAR). The distribution ZIP unpacks one JAR per integration into `plugins/`.

| Plugin | Source module | Content | Tool tag |
|---|---|---|---|
| ARender | `integrations/arender/{connector,helper}` | `RenditionService`, `OcrDocumentParser` interface, `DocumentService` (`@HelperService(name="documentService")`) | — |
| FlowerDocs | `integrations/flowerdocs/{connector,helper,tool}` | FlowerDocs API client, `FlowerDocsServiceHelper`, `DocumentSummarizer`, `TagHelper`, `FlowerDocsSearchService`, `FlowerDocsDocumentService`, `FlowerDocsRedactService` | `flowerdocs` |
| Alfresco | `integrations/alfresco/{connector,helper,tool}` | `AlfrescoWebClient`, `AlfrescoSearchService`, `AlfrescoDocumentService`, `AlfrescoModelService`, `AlfrescoHelper`, `AlfrescoSearchToolService`, `AlfrescoDocumentToolService`, `AlfrescoMetadataToolService` | `alfresco` |
| Files tool | `tools/files` | Generic file utilities tool | `files` |

## Filtering tools by tag

`@ToolService` accepts a `tags` attribute (`String[]`, default `{}`), added in 2026.0.0-ft3. Before 2026.0.0-ft5, the `plugins.tools.enabled-tags` property (env `PLUGINS_TOOLS_ENABLED_TAGS`) was a whitelist `IntegrationLoader` used to decide which `@ToolService` beans to *register* at startup.

**Since 2026.0.0-ft5, that's no longer true: `IntegrationLoader` registers every `@ToolService` bean it finds in every plugin JAR present in `plugins/`, unconditionally — the tag whitelist plays no part in registration anymore.** `plugins.tools.enabled-tags` still exists, but its role changed: it now only seeds the default tool-tag whitelist on the [Application](../admin/managing_applications.md) auto-created the first time a connection provider is used (an empty list there means that default Application gets `allowAllTools: true` instead). Once that Application exists, editing it in the admin UI — not this property — is what actually controls which registered tools a given caller can see.

Practically: **all tool code is loaded and instantiated regardless of this setting**, including Alfresco/FileNet tools, whether or not their tag is listed here. If you need a caller to never see a given tool suite, restrict it on that caller's Application (or a `PLUGINS_ROOT_PATH` without the corresponding plugin JAR at all — the only way to keep the code from loading in the first place).

### Choosing a document management backend

`flowerdocs`, `alfresco`, and `filenet` are three separate tool suites that all expose document search, retrieval, and metadata (and, for FlowerDocs/FileNet, redaction) operations — but for different ECM backends and with incompatible query APIs. Exposing more than one to the same caller is not recommended: the LLM would see overlapping sets of tools for the same operations and may call the wrong one unpredictably.

Pick **exactly one** backend's tools per Application (see [Managing Applications — Permissions](../admin/managing_applications.md#permissions)) — the JARs for all three can coexist in `plugins/`; only the exposed set needs to be scoped down. For a FileNet/ICN deployment, this means the Application the ICN plugin resolves to (by default, one named `FileNet`, auto-created from `FileNetProvider`) should whitelist the `filenet` tag and *not* `flowerdocs`/`alfresco`.

For Spring Boot tests that use classpath component scan, add `@TestPropertySource(properties = "plugins.tools.enabled-tags=...")` and rely on `ToolServiceTagFilter` (a `BeanDefinitionRegistryPostProcessor`, `tests/tools-tests` only) to strip non-matching beans from the registry — this test-only filter is unrelated to (and stricter than) the production `IntegrationLoader` behavior described above.

## Disabling tools globally

To disable tool execution entirely, set `tools.enabled=false` (or `TOOLS_ENABLED=false`). `ToolExecutor` then skips initialization and sends no tool specifications to the LLM. This setting is independent of the tag whitelist: `tools.enabled=false` wins regardless of `enabled-tags`.

## Adding and removing plugins

Drop a shaded JAR into the `plugins/` directory and restart the application. The new plugin's beans are registered on the next startup. To remove a plugin, delete its JAR and restart.

There is no hot-reload. A restart is always required after adding or removing plugins.

## Related pages

- [Write and deploy custom tools](../extending/custom_tools.md)
- [Write custom service helpers](../extending/custom_service_helpers.md)
- [System architecture](./architecture.md)
- [Environment variables reference](../reference/environment_variables.md)
