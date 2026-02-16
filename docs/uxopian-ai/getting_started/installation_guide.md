---
title: Installation Guide
sidebar_position: 1
last_update:
  date: '2026-01-23T15:35:56.881Z'
  author: CI/CD Bot
content_hash: 13c1a679d9f6a428ce76cd2330b93869acf2b6c4d91d5f89bc59f01a8c73426e
---

# 📚 Guide: Uxopian AI Service Deployment

This guide covers the installation process for the **Uxopian AI** backend service and its vector database.

---

# 📦 Backend Deployment (AI Service)

This section covers the installation of the AI engine and its vector database. Two scenarios are possible: **Docker** (Recommended via Starter Kit) or **Standalone** (Native Java).

## 🚀 Scenario A: Docker Deployment (Starter Kit)

The Starter Kit provides a ready-to-use stack containing the AI service and an OpenSearch node.

### 🔹 Step 1: Download and Structure

Download the [uxopian-ai_docker_example.zip](./uxopian-ai_docker_example.zip) archive. Once extracted, you should have the following directory structure:

```text
.
├── config
│   ├── application.yml             # Main Spring configuration
│   ├── goals.yml                   # AI Goals definition
│   ├── llm-clients-config.yml      # API Keys and Model selection (OpenAI, Mistral, etc.)
│   ├── mcp-server.yml              # Model Context Protocol config
│   ├── opensearch.yml              # Vector database connection
│   └── prompts.yml                 # Pre-defined prompts
├── gateway-application.yaml        # Gateway config (if used)
└── uxopian-ai-stack.yml            # The docker-compose file

```

### 🔹 Step 2: Pull Images

Pull the required images (example via Cloudsmith or Artifactory):

```bash
docker pull docker.uxopian.com/preview/uxopian-ai:2026.0.0-ft1-rc3
docker pull docker.uxopian.com/preview/gateway:2026.0.0-ft1-rc3
# Note: The OpenSearch image is public and will be pulled automatically by the compose file.

```

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

1. Download the complete package: `ai-standalone-2026.0.0-ft1-rc3-complete-package.zip`.
2. Unzip the archive:

```bash
unzip ai-standalone-2026.0.0-ft1-rc3-complete-package.zip
cd ai-standalone

```

### 🔹 Step 2: Configuration

All files are located in the `config/` folder. You **must** edit them:

- **`opensearch.yml`**: Enter the IP and credentials of your external OpenSearch cluster.
- **`llm-clients-config.yml`**: Configure your LLM providers (Azure OpenAI, Mistral, etc.) and API keys.
- **`application.yml`**: General settings (ports, logs).

Documentation is available at: [Configuration](../../configuration/config_files/)

### 🔹 Step 3: Execution

Run the Java service:

```bash
java -jar ai-standalone.jar

```

:::note "Production Recommendations"

- Use `JAVA_OPTS` to allocate enough memory (e.g., `-Xmx4g`).
- Place the service behind a Reverse Proxy (NGINX/Apache) to handle SSL.
:::
---

## 🔹 Step 4: Prompt Creation (Backend)

Once the backend is running, you must define what the AI should do by creating a prompt via the API.

- **URL:** `POST /api/v1/admin/prompts`
- **Body:**

```json
{
  "id": "summarizeDocMd",
  "role": "user",
  "content": "Summarize the following document: \n [[${documentService.extractTextualContent(documentId)}]]",
  "defaultLlmProvider": "openai",
  "defaultLlmModel": "gpt-4o",
  "temperature": "0.7"
}
```

_Note: `[[...]]` is a server-side instruction to inject the document text._