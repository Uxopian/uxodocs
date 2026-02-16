---
title: "Deploy with Docker"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: f2a6ae1d46017e20f5eb47c1369afd0665a4715072d2c8cb190dd9a0ffe0d4f1
---

# 📚 Guide: Uxopian AI Service Deployment

This guide covers the installation process for the **Uxopian AI** backend service and its vector database.

---

# 📦 Backend Deployment (AI Service)

This section covers the installation of the AI engine and its vector database. Two scenarios are possible: **Docker** (Recommended via Starter Kit) or **Standalone** (Native Java).

## 🚀 Scenario A: Docker Deployment (Starter Kit)

The Starter Kit provides a ready-to-use stack containing the AI service and an OpenSearch node.

### 🔹 Step 1: Download and Structure

:::tip[Download]
**[uxopian-ai_docker_example.zip](./uxopian-ai_docker_example.zip)**
:::

Once extracted, you should have the following directory structure:

```text
.
├── config
│   ├── application.yml             # Main Spring configuration
│   ├── goals.yml                   # AI Goals definition
│   ├── llm-clients-config.yml      # API Keys and Model selection (OpenAI, Mistral, etc.)
│   ├── llm-clients-config.yml.example  # Example with all providers
│   ├── mcp-server.yml              # Model Context Protocol config
│   ├── metrics.yml                 # Micrometer & Actuator config
│   ├── opensearch.yml              # Vector database connection
│   └── prompts.yml                 # Pre-defined prompts
├── gateway-application.yaml        # Gateway config (if used)
└── uxopian-ai-stack.yml            # The docker-compose file

```

### 🔹 Step 2: Pull Images

Pull the required images from the registry configured in your `uxopian-ai-stack.yml`:

```bash
docker pull artifactory.arondor.cloud:5001/uxopian-ai:2026.0.0-ft1-rc3
# Note: The OpenSearch image is public and will be pulled automatically by the compose file.
```

:::note[Registry]
The compose file uses `artifactory.arondor.cloud:5001/` by default. If your organization hosts images on a different registry (e.g., `docker.uxopian.com/preview/`), update the `image:` fields in `uxopian-ai-stack.yml` accordingly.
:::

### 🔹 Step 3: Environment Variable Configuration

The `uxopian-ai-stack.yml` file orchestrates the containers. **Do not modify the YAML structure**, but you must adapt the environment variables of the `uxopian-ai-standalone` service to ensure network communication.

There are two distinct communication flows to configure:

#### 1. Integration Communication (AI to Document Service)

The AI must contact the Document Service (e.g., ARender Service Broker) to read document text via the internal Docker network.

| Variable          | Description                    | Example (Internal Docker)     |
| ----------------- | ------------------------------ | ----------------------------- |
| `OPENSEARCH_HOST` | OpenSearch container hostname. | `uxopian-ai-opensearch-node1` |
| `OPENSEARCH_PORT` | OpenSearch port.               | `9200`                        |

#### 2. Client Access Configuration (Browser to AI)

The user interface (running in the user's browser) must contact the AI service.

| Variable                 | Description                                             | Example (Public)        |
| ------------------------ | ------------------------------------------------------- | ----------------------- |
| `UXOPIAN_AI_PORT`        | Internal listening port of the service.                 | `8080`                  |
| `APP_BASE_URL`           | Public URL of the AI application (for callbacks).       | `http://localhost:8085` |
| `SPRING_PROFILES_ACTIVE` | Configuration profile (`dev` disables strict security). | `dev`                   |

:::info[About the `dev` Profile and the BFF Gateway]
The starter kit ships with `SPRING_PROFILES_ACTIVE=dev` and **no Gateway service**. This means you can call the AI service directly — missing `X-User-*` headers are filled in with defaults (`User-development` / `Tenant-development`).

In a **production** deployment, you should remove the `dev` profile and deploy the [Uxopian Gateway (BFF)](../understanding/security.md) in front of the AI service. The Gateway authenticates users, extracts their identity from JWT/OAuth2/LDAP tokens, and injects the `X-User-TenantId`, `X-User-Id`, `X-User-Roles`, and `X-User-Token` headers. The Gateway service is also included in this compose file (commented out) — uncomment the `uxopian-ai-gateway` block, configure its `provider`, and remove the `dev` profile to switch to a secured setup.
:::

### 🔹 Step 4: Start

```bash
docker-compose -f uxopian-ai-stack.yml up -d

```

---

## ☕ Scenario B: Manual Installation (ZIP / Java)

Use this method for deployment on a standard server (VM Linux/Windows) without Docker.

**Prerequisites:**

- **Java 21** Runtime Environment (JRE).
- **OpenSearch 2.x** installed and running on the network.

### 🔹 Step 1: Installation

:::tip[Download]
**ai-standalone-2026.0.0-ft1-rc3-complete-package.zip**

_Contact your Uxopian representative for access to this package._
:::

Unzip the archive:

```bash
unzip ai-standalone-2026.0.0-ft1-rc3-complete-package.zip
cd ai-standalone

```

### 🔹 Step 2: Configuration

All files are located in the `config/` folder. You **must** edit them:

- **`opensearch.yml`**: Enter the IP and credentials of your external OpenSearch cluster.
- **`llm-clients-config.yml`**: Configure your LLM providers (Azure OpenAI, Mistral, etc.) and API keys.
- **`application.yml`**: General settings (ports, logs).

Documentation is available at: [Configuration](../reference/config_files.md)

### 🔹 Step 3: Execution

Run the Java service:

```bash
java -jar ai-standalone.jar

```

:::note[Production Recommendations]
:::

- Use `JAVA_OPTS` to allocate enough memory (e.g., `-Xmx4g`).
- Place the service behind a Reverse Proxy (NGINX/Apache) to handle SSL.
  :::

---

## 🔹 Step 4: Create Your First Prompt

Once the backend is running, you need to define what the AI should do by creating prompts via the API.

See the [Managing Prompts and Goals](../how_to/managing_prompts_goals.md) guide for detailed instructions and examples.
