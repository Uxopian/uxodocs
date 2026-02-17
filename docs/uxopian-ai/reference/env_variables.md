---
title: "Environment Variables"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 1a7df9a6eb8e54d98a761a199ec90a7b91c58cf548af6e9ba10e78edfffb4863
---
# Environment Variables Reference

For Docker and production deployments, override these variables instead of editing YAML files directly. Set them in your `docker-compose.yml`, `.env` file, or container orchestrator.

---

## General

| Variable                 | Description                                | Default    |
| :----------------------- | :----------------------------------------- | :--------- |
| `SPRING_PROFILES_ACTIVE` | Active profile (use `dev` to disable auth). | _empty_    |
| `UXOPIAN_AI_PORT`        | Application server port.                   | `8080`     |
| `APP_BASE_URL`           | Public base URL of the service.            | _empty_    |
| `CONTEXT_PATH`           | Servlet context path (e.g., `/ai`).        | _empty_    |

## Security

| Variable                  | Description                                                        | Default  |
| :------------------------ | :----------------------------------------------------------------- | :------- |
| `APP_SECURITY_SECRET_KEY` | Base64-encoded AES key for encrypting LLM provider API secrets at rest. | _empty_ |

## LLM Providers

| Variable               | Description                    | Default      |
| :--------------------- | :----------------------------- | :----------- |
| `LLM_DEFAULT_PROVIDER` | Default LLM provider.          | `openai`     |
| `LLM_DEFAULT_MODEL`    | Default LLM model name.        | `gpt-5.1`    |
| `LLM_DEFAULT_PROMPT`   | Default base prompt ID.        | `basePrompt` |
| `LLM_CONTEXT_SIZE`     | Sliding window size (messages). | `10`         |
| `LLM_DEBUG`            | Log full LLM requests/responses (sensitive). | `false` |
| `OPENAI_API_KEY`       | API Key for OpenAI.            | _empty_      |
| `ANTHROPIC_API_KEY`    | API Key for Anthropic.         | `none`       |
| `AZURE_OPENAI_API_KEY` | API Key for Azure OpenAI.      | `none`       |
| `GEMINI_API_KEY`       | API Key for Google Gemini.     | `none`       |
| `MISTRAL_API_KEY`      | API Key for Mistral AI.        | `none`       |
| `HUGGINGFACE_API_KEY`  | API Key for HuggingFace.       | `none`       |
| `BEDROCK_AWS_ACCESS_KEY` | AWS access key for Bedrock.  | `none`       |
| `BEDROCK_AWS_SECRET_KEY` | AWS secret key for Bedrock.  | `none`       |

:::note[Dynamic Provider Configuration]
Since v2026.0.0-ft2, LLM API keys are primarily managed via the [dynamic provider configuration](config_files.md#dynamic-provider-configuration) stored in OpenSearch. The individual environment variables above (`OPENAI_API_KEY`, etc.) remain functional for bean initialization and YAML bootstrapping.
:::


## OpenSearch

| Variable                          | Description                                              | Default     |
| :-------------------------------- | :------------------------------------------------------- | :---------- |
| `OPENSEARCH_HOST`                 | Hostname of the OpenSearch instance.                     | `localhost` |
| `OPENSEARCH_PORT`                 | Port of the OpenSearch instance.                         | `9200`      |
| `OPENSEARCH_SCHEME`               | Connection scheme (`http` or `https`).                   | `http`      |
| `OPENSEARCH_USERNAME`             | OpenSearch username (if secure).                         | _empty_     |
| `OPENSEARCH_PASSWORD`             | OpenSearch password (if secure).                         | _empty_     |
| `OPENSEARCH_FORCE_REFRESH_INDEX`  | Force index refresh after writes (dev only, impacts perf). | `false`   |

## Integrations

| Variable             | Description                                     | Default  |
| :------------------- | :---------------------------------------------- | :------- |
| `FD_WS_URL`          | FlowerDocs Core Web Services URL.               | _null_   |
| `RENDITION_BASE_URL` | ARender Rendition Server base URL.              | _null_   |
| `MCP_SSE_URL`        | MCP server SSE endpoint URL.                    | `http://localhost:8081/uxopian/ai/sse` |

## Backup

| Variable              | Description                            | Default      |
| :-------------------- | :------------------------------------- | :----------- |
| `PROMPTS_BACKUP_PATH` | Path to load/store prompt backups.     | `./prompts/` |
| `GOALS_BACKUP_PATH`   | Path to load/store goal backups.       | `./goals/`   |
