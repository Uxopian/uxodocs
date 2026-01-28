---
title: Common Operational Tasks
sidebar_position: 2
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
content_hash: 5c73deb682894b4355eb8f920535f85619e61283173433459f3bf60aea4274fb
---

# 📘 User Guide: Integration & Common Operations

This guide provides practical examples for the most common tasks in **uxopian-ai**: managing conversations, orchestrating goals, and sending requests.

> **⚠️ Architecture Note:** > **uxopian-ai** is a backend microservice designed to run behind a **BFF (Backend for Frontend)** or **API Gateway**. It should **never** be exposed directly to the public internet.
>
> The examples below assume you are either:
>
> 1.  Developing a Gateway that forwards requests to `uxopian-ai`.
> 2.  Testing locally in a secure environment (e.g., via VPN or local network).

---

## 🔑 Prerequisites: Authentication & Context

**uxopian-ai** does not handle user login directly. Instead, it relies on your Gateway to authenticate the user and **inject identity headers** into the request before it reaches the service.

### 1\. Production Mode (Gateway Injection)

When deploying in production, your Gateway must pass the following headers:

| Header Name       | Description                                             | Required |
| :---------------- | :------------------------------------------------------ | :------- |
| `X-User-TenantId` | Isolates data per tenant (organization).                | **Yes**  |
| `X-User-Id`       | Unique identifier for the user.                         | **Yes**  |
| `X-User-Roles`    | Comma-separated list of roles (e.g., `admin,user`).     | No       |
| `X-User-Token`    | Original user token (if needed for downstream context). | No       |

### 2\. Development Mode

If the application is started with the `dev` profile (`spring.profiles.active=dev`), `uxopian-ai` will inject default credentials if headers are missing:

- **Default Tenant:** `Tenant-development`
- **Default User:** `User-development`

---

## 💬 1. Creating a Conversation

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
    const response = await fetch("http://uxopian-ai-service:8080/api/v1/conversations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // The Gateway injects these headers
            "X-User-TenantId": tenantId,
            "X-User-Id": userId,
        },
    });

    const data = await response.json();
    console.log("New Conversation ID:", data.id);
    return data;
};
```

---

## 📨 2. Sending a Text Request (Non-Streaming)

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

## 🎯 3. Triggering a Goal (Orchestration)

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

## 🌊 4. Sending a Streaming Request

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

## 👮 5. Administrative Operations

To access Admin endpoints, the Gateway must inject the `admin` role in the `X-User-Roles` header.

- **Endpoint:** `GET /api/v1/admin/stats/global`

### Example: Fetching Global Statistics

**cURL**

```bash
curl -X GET "http://localhost:8080/api/v1/admin/stats/global" \
  -H "X-User-TenantId: enterprise-corp-a" \
  -H "X-User-Id: admin-user" \
  -H "X-User-Roles: admin"
```
