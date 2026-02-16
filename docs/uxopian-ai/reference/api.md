---
title: "REST API"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: b4a8924a383e974dd9408906d6c97668bf43b6e3b3818dc6ca83696875eb9e89
---
# REST API Reference

All interactions with uxopian-ai go through its REST API. This page provides a complete overview of the endpoints and how to access the interactive documentation.

For practical usage examples with cURL and JavaScript, see [Using the REST API](../how_to/api_usage.md).

---

## Interactive Documentation (Swagger UI)

The service exposes a full **OpenAPI 3.1.0** specification. We highly recommend using the built-in Swagger UI for exploring the API, inspecting schemas, and testing requests in real-time.

### Accessing Swagger UI

Depending on your environment, the Swagger UI is available at:

- **Local / Docker**: `http://localhost:8080/swagger-ui.html` (Default port is 8080)

**Note:** If a custom `CONTEXT_PATH` is configured in `application.yml`, append it to the base URL (e.g., `http://localhost:8080/ai/swagger-ui.html`).

:::tip[Public Access]
The Swagger UI is publicly accessible (no authentication required). Endpoints are organized by tags prefixed with `Admin -` for admin operations, making it easy to explore the full API surface.
:::


---

## Authentication

The API expects authentication via headers injected by your Gateway or BFF. See [Security Model](../understanding/security.md) for the full explanation.

| Header            | Required | Description                          |
| :---------------- | :------- | :----------------------------------- |
| `X-User-TenantId` | Yes      | Tenant isolation key.                |
| `X-User-Id`       | Yes      | Unique User ID.                      |
| `X-User-Roles`    | No       | Comma-separated roles (e.g., `admin`). |
| `X-User-Token`    | No       | Original user token for downstream context. |

---

## API Endpoints

### Conversations

Manage the lifecycle of chat sessions.

| Method   | Endpoint                        | Description                              |
| :------- | :------------------------------ | :--------------------------------------- |
| `POST`   | `/api/v1/conversations`         | Create a new conversation.               |
| `GET`    | `/api/v1/conversations`         | List user conversations (paginated).     |
| `GET`    | `/api/v1/conversations/{id}`    | Retrieve full details of a conversation. |
| `DELETE` | `/api/v1/conversations/{id}`    | Delete a conversation.                   |

### Requests (Chat)

Send messages and interact with the LLM.

| Method | Endpoint                     | Description                                                       |
| :----- | :--------------------------- | :---------------------------------------------------------------- |
| `POST` | `/api/v1/requests`           | Send a message and get a synchronous response.                    |
| `POST` | `/api/v1/requests/stream`    | Send a message and receive the response as an SSE stream.         |
| `POST` | `/api/v1/requests/retry`     | Regenerate the last answer.                                       |

**Query Parameters:**

- `conversation` (Required) — The conversation ID.
- `provider` (Optional) — Override the LLM provider for this request.
- `model` (Optional) — Override the LLM model for this request.

### Administration — Prompts

Endpoints restricted to users with the `admin` role.

| Method   | Endpoint                      | Description                       |
| :------- | :---------------------------- | :-------------------------------- |
| `POST`   | `/api/v1/admin/prompts`       | Create a new prompt.              |
| `PUT`    | `/api/v1/admin/prompts`       | Update an existing prompt.        |
| `GET`    | `/api/v1/admin/prompts/{id}`  | Get a specific prompt by ID.      |
| `DELETE` | `/api/v1/admin/prompts/{id}`  | Delete a prompt.                  |

### Administration — Goals

| Method   | Endpoint                     | Description                      |
| :------- | :--------------------------- | :------------------------------- |
| `POST`   | `/api/v1/admin/goals`        | Create a new goal.               |
| `PUT`    | `/api/v1/admin/goals`        | Update an existing goal.         |
| `GET`    | `/api/v1/admin/goals`        | Get all goals.                   |
| `DELETE` | `/api/v1/admin/goals/{id}`   | Delete a goal.                   |

### Administration — LLM Providers {#administration--llm-providers}

Manage LLM provider configurations at runtime. See [LLM Provider Management](../admin/llm_providers.md) for the full UI guide.

| Method   | Endpoint                                  | Description                                           |
| :------- | :---------------------------------------- | :---------------------------------------------------- |
| `GET`    | `/api/v1/admin/llm/providers`             | List all registered provider types (bean names).      |
| `GET`    | `/api/v1/admin/llm/provider-conf`         | List all provider configurations for the tenant.      |
| `GET`    | `/api/v1/admin/llm/provider-conf/{id}`    | Get a specific provider configuration by ID.          |
| `POST`   | `/api/v1/admin/llm/provider-conf`         | Create a new provider configuration.                  |
| `PUT`    | `/api/v1/admin/llm/provider-conf/{id}`    | Update an existing provider configuration.            |
| `DELETE` | `/api/v1/admin/llm/provider-conf/{id}`    | Delete a provider configuration.                      |

### Administration — Statistics {#administration--statistics}

All statistics endpoints accept an optional `interval` query parameter to control time-series granularity. Supported values: `HOUR`, `DAY`, `WEEK`, `MONTH`, `YEAR`. Default: `DAY`.

| Method | Endpoint                                        | Description                                           |
| :----- | :---------------------------------------------- | :---------------------------------------------------- |
| `GET`  | `/api/v1/admin/stats/global`                    | Aggregate counters (total requests, tokens, time saved). |
| `GET`  | `/api/v1/admin/stats/timeseries?interval=DAY`   | Time-series activity data (requests, tokens over time). |
| `GET`  | `/api/v1/admin/stats/llm-distribution`          | Model usage distribution breakdown.                   |
| `GET`  | `/api/v1/admin/stats/top-prompts-time-saved`    | Top prompts ranked by estimated time saved.           |
| `GET`  | `/api/v1/admin/stats/feature-adoption`          | Advanced feature adoption rates (multi-modal, function calling). |
