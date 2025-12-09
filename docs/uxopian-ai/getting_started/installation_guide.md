---
title: Installation Guide
last_update:
  date: '2025-12-09T08:47:49.723Z'
  author: CI/CD Bot
content_hash: 412bc2daa8581d8871b0fb3ce52cc5af11bebc2662bfd9461364dd6c3c467f1f
---

# 📦 Installation Guide

This guide provides instructions for deploying the **uxopian-ai** service. We cover two methods:

1.  **Docker Compose (Recommended):** Deploys the full stack (AI Service, Gateway, OpenSearch) using a provided starter kit.
2.  **Java Application:** Manual deployment for specific custom environments.

---

## 🐳 Docker Deployment (Recommended)

The easiest way to get started is using the provided Docker Compose starter kit. This sets up the AI service, a secured Gateway, and a dedicated OpenSearch node for vector storage.

### 🔹 Step 1: Download the Starter Kit

Download the [uxopian-ai_docker_example.zip](./uxopian-ai_docker_example.zip) archive from the release repository.

**Archive Structure:**
Once extracted, you will see the following structure. This folder contains the stack definition and all necessary configuration files.

```text
uxopian-ai_docker_example
├── config
│   ├── application.yml             # Core application settings
│   ├── goals.yml                   # Predefined AI goals
│   ├── llm-clients-config.yml      # LLM Provider settings (OpenAI, Azure, etc.)
│   ├── mcp-server.yml              # Model Context Protocol settings
│   ├── metrics.yml                 # Observability configuration
│   ├── opensearch.yml              # Vector database connection config
│   └── prompts.yml                 # System prompts definitions
├── gateway-application.yaml        # Configuration for the API Gateway
└── uxopian-ai-stack.yml            # Docker Compose definition
```

### 🔹 Step 2: Pull the Docker Images

Ensure you have access to the Artifactory and pull the required images.

```bash
docker pull artifactory.arondor.cloud:5001/uxopian-ai/ai-standalone:latest
docker pull artifactory.arondor.cloud:5001/uxopian-ai/gateway:latest
# OpenSearch is pulled from the public registry automatically by the compose file
```

:::note Image Tags
You may need to update the `image:` fields in `uxopian-ai-stack.yml` to match the full path of the images you just pulled (e.g., replace `image: 'ai-standalone'` with `artifactory.arondor.cloud:5001/uxopian-ai/ai-standalone:latest`).
:::


### 🔹 Step 3: Configuration

Before starting the stack, you must configure your LLM providers and environment.

#### 1\. LLM API Keys

Edit `config/llm-clients-config.yml` to add your API keys (e.g., OpenAI, Anthropic), or pass them as environment variables in the `uxopian-ai-stack.yml` file.

#### 2\. Service Configuration

The `uxopian-ai-stack.yml` file orchestrates three services:

- **OpenSearch:** Stores vector embeddings.
- **Gateway:** Handles routing and exposure (Port `8085`).
- **AI Standalone:** The core intelligence engine.

**Key Environment Variables in `uxopian-ai-stack.yml`:**

| Variable                 | Description                        | Default / Example                                   |
| :----------------------- | :--------------------------------- | :-------------------------------------------------- |
| `OPENSEARCH_HOST`        | Hostname of the vector DB          | `uxopian-ai-opensearch-node1` (Internal Docker DNS) |
| `UXOPIAN_AI_PORT`        | Internal port for the AI service   | `8080`                                              |
| `APP_BASE_URL`           | URL where the gateway is reachable | `http://localhost:8085`                             |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile              | `dev` (Disables authentication for testing)         |

:::warning Production Warning
The example stack uses `SPRING_PROFILES_ACTIVE=dev`, which **disables authentication**. For production deployments, remove this variable and configure proper security in the gateway.
:::


For a detailed reference of every file inside the `config/` directory, please refer to the [Configuration Files documentation](https://www.google.com/search?q=../configuration/config_files).

### 🔹 Step 4: Start the Stack

Navigate to the extracted folder and start the services.

```bash
docker-compose -f uxopian-ai-stack.yml up -d
```

**Verification:**

- **Gateway:** Accessible at `http://localhost:8085`
- **Health Check:** `http://localhost:8085/uxopian-ai/actuator/health`

---

## ☕ Java Application Deployment

If you cannot use Docker, you can run the service directly as a Java application.

:::note Prerequisites
:::


### 🔹 Step 1: Download the Package

Download the installation ZIP file from the Arondor Artifactory:
🔗 `ai-standalone-[version].zip`

### 🔹 Step 2: Configure

1.  Unzip the package.
2.  Navigate to the `config` directory.
3.  Edit `opensearch.yml` to point to your existing OpenSearch instance.
4.  Edit `llm-clients-config.yml` to provide your API keys.

Detailed configuration options are available here: [Configuration Files](../configuration/config_files).

### 🔹 Step 3: Run

From the root of the unzipped directory, execute:

```bash
java -jar ai-standalone.jar
```
