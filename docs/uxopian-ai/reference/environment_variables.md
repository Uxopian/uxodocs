---
title: Environment variables reference
sidebar_label: Environment variables
sidebar_position: 2
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 22c03587d001444092ab23a953dfa5ce436989a7c4bcfce30eff493a28da7d33
---

All environment variables accepted by `uxopian-ai` and `uxopian-gateway`. Variables marked with a default are optional; variables with no default are required when the feature is used.

## uxopian-ai environment variables

### Application

| Variable | Default | Description |
|---|---|---|
| `APP_BASE_URL` | (empty) | Public base URL of the application. Used in generated links. |
| `UXOPIAN_AI_PORT` | `8080` | HTTP port for the application server |
| `CONTEXT_PATH` | (empty) | Servlet context path prefix (e.g., `/ai`) |
| `SPRING_PROFILES_ACTIVE` | (empty) | Active Spring profiles. Set to `dev` to disable authentication. |
| `TOOLS_ENABLED` | `true` | Set to `false` to disable all tool execution |
| `JAVA_OPTS` | (empty) | JVM options (e.g., `-Xmx768m -Xms512m`) |

### OpenSearch

| Variable | Default | Description |
|---|---|---|
| `OPENSEARCH_HOST` | `localhost` | OpenSearch hostname |
| `OPENSEARCH_PORT` | `9200` | OpenSearch port |
| `OPENSEARCH_SCHEME` | `http` | Connection scheme (`http` or `https`) |
| `OPENSEARCH_USERNAME` | (empty) | OpenSearch username (if auth enabled) |
| `OPENSEARCH_PASSWORD` | (empty) | OpenSearch password (if auth enabled) |
| `OPENSEARCH_FORCE_REFRESH_INDEX` | `false` | Force index refresh after each write. Set `true` only for testing. |

### LLM providers

| Variable | Default | Description |
|---|---|---|
| `LLM_DEFAULT_PROVIDER` | `openai` | Default LLM provider identifier |
| `LLM_DEFAULT_MODEL` | `gpt-5.1` | Default model name |
| `LLM_DEFAULT_PROMPT` | `basePrompt` | Default base prompt ID |
| `LLM_CONTEXT_SIZE` | `10` | Number of previous requests included in each LLM call |
| `LLM_DEBUG` | `false` | Enable verbose LLM request/response logging |
| `OPENAI_API_KEY` | (empty) | OpenAI API key |
| `ANTHROPIC_API_KEY` | (empty) | Anthropic API key |
| `AZURE_OPENAI_API_KEY` | (empty) | Azure OpenAI API key |
| `GEMINI_API_KEY` | (empty) | Google Gemini API key |
| `MISTRAL_API_KEY` | (empty) | Mistral AI API key |
| `HUGGINGFACE_API_KEY` | (empty) | HuggingFace API key |
| `NUEXTRACT_API_KEY` | (empty) | NuExtract API key |
| `BEDROCK_AWS_ACCESS_KEY` | (empty) | AWS access key for Bedrock |
| `BEDROCK_AWS_SECRET_KEY` | (empty) | AWS secret key for Bedrock |

### Plugins

| Variable | Default | Description |
|---|---|---|
| `PLUGINS_ROOT_PATH` | `plugins/` | Path to the directory containing plugin JARs |

### Integration connectors

| Variable | Default | Description |
|---|---|---|
| `RENDITION_BASE_URL` | (empty) | ARender DSB base URL. Required if the ARender plugin is deployed. |
| `FD_WS_URL` | (empty) | FlowerDocs core web service URL (e.g. `http://<flowerdocs-endpoint>/core/`). Required if the FlowerDocs plugin is deployed. |

### Prompts and goals

| Variable | Default | Description |
|---|---|---|
| `PROMPTS_BACKUP_PATH` | `./prompts/` | Directory for prompt backup files |
| `GOALS_BACKUP_PATH` | `./goals/` | Directory for goal backup files |

### Security

| Variable | Default | Description |
|---|---|---|
| `app.security.secret-key` | (dev default) | AES/GCM encryption key for stored API secrets. Set a unique value in production. |

### MCP (experimental)

| Variable | Default | Description |
|---|---|---|
| `MCP_SSE_URL` | (empty) | SSE endpoint URL for an external MCP server. MCP is disabled when not set. |

### Hazelcast

| Variable | Default | Description |
|---|---|---|
| `HAZELCAST_KUBERNETES_ENABLED` | `false` | Enable Kubernetes-based Hazelcast discovery |
| `HAZELCAST_KUBERNETES_SERVICE_DNS` | `ai-standalone-headless` | Kubernetes headless service DNS |
| `HAZELCAST_KUBERNETES_NAMESPACE` | `default` | Kubernetes namespace |

## uxopian-gateway environment variables

The gateway is configured primarily via the mounted `gateway-application.yaml` file. Environment variables for the gateway control image selection and are injected by the compose `.env` file:

| Variable | Default | Description |
|---|---|---|
| `REGISTRY` | `artifactory.arondor.cloud:5001` | Docker registry host for Artifactory-based image pull. Not used when switching to Cloudsmith images (see [Registry access](../getting_started/registry_access.md)). |
| `UXOPIAN_VERSION` | `2026.0.0-ft2` | Version tag for `uxopian-gateway` and `uxopian-ai` images |

In the gateway `gateway-application.yaml`, the URIs for backend services are hardcoded Docker Compose service names (e.g., `http://uxopian-ai:8080`).

## OpenSearch environment variables

| Variable | Default | Description |
|---|---|---|
| `OPENSEARCH_VERSION` | `3.0.0` | OpenSearch image version (used in compose `.env`) |
| `DISABLE_SECURITY_PLUGIN` | — | Set to `true` to disable OpenSearch security plugin (development only) |
| `DISABLE_INSTALL_DEMO_CONFIG` | — | Set to `true` to skip demo config installation |
| `discovery.type` | — | Set to `single-node` for single-node deployments |
| `OPENSEARCH_JAVA_OPTS` | — | JVM options for OpenSearch (e.g., `-Xms512m -Xmx512m`) |

## Related pages

- [Configuration file reference](./configuration.md)
- [Plugin system](../understanding/plugin_system.md)
- [LLM providers](../understanding/llm_providers.md)
- [Quickstart with Docker Compose](../getting_started/quickstart.mdx)
- [Managing LLM providers in the admin UI](../admin/managing_llm_providers.md)
- [Managing prompts in the admin UI](../admin/managing_prompts.md)
