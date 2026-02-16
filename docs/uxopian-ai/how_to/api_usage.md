---
title: "Using the REST API"
sidebar_position: 2
---
# Using the REST API

This guide provides practical examples for the most common tasks in **uxopian-ai**: managing conversations, sending requests, orchestrating goals, and accessing admin endpoints.

For details on the security model and authentication headers, see [Security Model (BFF Pattern)](../understanding/security.md).

---

## Prerequisites: Authentication Headers

Uxopian-ai never handles authentication itself — it relies on a **BFF Gateway** to validate credentials and inject identity headers into every request. See [Security Model (BFF Pattern)](../understanding/security.md) for the full architecture.

| Header            | Description                                             | Required |
| :---------------- | :------------------------------------------------------ | :------- |
| `X-User-TenantId` | Isolates data per tenant (organization).                | **Yes**  |
| `X-User-Id`       | Unique identifier for the user.                         | **Yes**  |
| `X-User-Roles`    | Comma-separated list of roles (e.g., `admin,user`).     | No       |
| `X-User-Token`    | Original user token, forwarded to integrations (FlowerDocs, ARender). | No       |

The Gateway authenticates the user (OAuth2, JWT, LDAP...), extracts identity from the session, and enriches the request with these `X-User-*` headers before forwarding it to uxopian-ai. The AI service trusts these headers implicitly — which is why uxopian-ai must **never** be exposed directly to the network.

:::tip[Development Mode]
In development mode (`SPRING_PROFILES_ACTIVE=dev`), the AI service accepts requests without headers and fills in defaults (`User-development` / `Tenant-development`). The examples below include explicit headers so they work in both dev and production environments. See [Development Mode](../understanding/security.md#development-mode) for details.
:::


---

## 1. Creating a Conversation

Conversations are the container for all history and context. They are scoped to the specific `X-User-TenantId` provided in the headers.

- **Endpoint:** `POST /api/v1/conversations`

### Example: Gateway forwarding a creation request

**cURL**

```bash
curl -X POST "http://localhost:8080/api/v1/conversations" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: user-james-bond" \
  -H "X-User-Roles: user"
```

**JavaScript (Node.js / Gateway Logic)**

```javascript
const createConversation = async (tenantId, userId) => {
  const response = await fetch(
    "http://uxopian-ai-service:8080/api/v1/conversations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-TenantId": tenantId,
        "X-User-Id": userId,
      },
    }
  );

  const data = await response.json();
  console.log("New Conversation ID:", data.id);
  return data;
};
```

---

## 2. Sending a Text Request (Non-Streaming)

Send a prompt to the LLM within a conversation. The `X-User-TenantId` ensures the user only accesses conversations they belong to.

- **Endpoint:** `POST /api/v1/requests`
- **Query Parameter:** `conversation` (Required)

### Example: Standard User Query

**cURL**

```bash
curl -X POST "http://localhost:8080/api/v1/requests?conversation=123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: user-james-bond" \
  -d '{
    "inputs": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "value": "How do I reset my password?"
          }
        ]
      }
    ]
  }'
```

---

## 3. Triggering a Goal (Orchestration)

Use the `goal` type to let **uxopian-ai** select the correct prompt based on the payload context.

- **Content Type:** `goal`
- **Payload:** Context data for the filter engine.

### Example: Intelligent Goal Routing

**cURL**

```bash
curl -X POST "http://localhost:8080/api/v1/requests?conversation=123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: user-james-bond" \
  -d '{
    "inputs": [
      {
        "role": "user",
        "content": [
          {
            "type": "goal",
            "value": "analyze_document",
            "payload": {
              "docType": "financial_report",
              "quarter": "Q3"
            }
          }
        ]
      }
    ]
  }'
```

---

## 4. Sending a Streaming Request

For real-time responses (typing effect), use the streaming endpoint.

- **Endpoint:** `POST /api/v1/requests/stream`
- **Response Content-Type:** `text/event-stream`

### Example: Streaming Response

**cURL**

```bash
curl -X POST "http://localhost:8080/api/v1/requests/stream?conversation=123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: user-james-bond" \
  --no-buffer \
  -d '{
    "inputs": [
      {
        "role": "user",
        "content": [{ "type": "text", "value": "Explain quantum physics." }]
      }
    ]
  }'
```

---

## 5. Administrative Operations

To access Admin endpoints, the Gateway must inject the `admin` role in the `X-User-Roles` header.

### Example: Fetching Global Statistics

**cURL**

```bash
curl -X GET "http://localhost:8080/api/v1/admin/stats/global" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: admin-user" \
  -H "X-User-Roles: admin"
```

### Example: Listing LLM Provider Configurations

**cURL**

```bash
curl -X GET "http://localhost:8080/api/v1/admin/llm/provider-conf" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: admin-user" \
  -H "X-User-Roles: admin"
```

### Example: Creating an LLM Provider Configuration

**cURL**

```bash
curl -X POST "http://localhost:8080/api/v1/admin/llm/provider-conf" \
  -H "Content-Type: application/json" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: admin-user" \
  -H "X-User-Roles: admin" \
  -d '{
    "provider": "openai",
    "defaultLlmModelConfName": "gpt5",
    "globalConf": {
      "apiSecret": "sk-your-api-key",
      "temperature": 0.7,
      "maxRetries": 3,
      "timeout": "60s"
    },
    "llModelConfs": [
      {
        "llmModelConfName": "gpt5",
        "modelName": "gpt-5.1",
        "multiModalSupported": true,
        "functionCallSupported": true
      },
      {
        "llmModelConfName": "gpt5-mini",
        "modelName": "gpt-5-mini",
        "temperature": 0.3,
        "multiModalSupported": true,
        "functionCallSupported": true
      }
    ]
  }'
```

For the complete list of LLM provider management endpoints, see [REST API Reference — LLM Providers](../reference/api.md#administration--llm-providers).
