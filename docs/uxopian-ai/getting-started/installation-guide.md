---
title: Installation Guide
description: Instructions for deploying the uxopian-ai service using Docker or Java
sidebar_position: 1
---

# 📦 Installation Guide

This guide provides instructions for deploying the **uxopian-ai** service. We will cover the recommended **Docker-based deployment** and the manual **Java application setup**.

---

## 🐳 Docker Deployment _(Recommended)_

Deploying with Docker is the recommended method as it provides a consistent and isolated environment.

### 🔹 Step 1: Pull the Docker Image

Pull the official uxopian-ai image from the Arondor Artifactory:

```bash
docker pull artifactory.arondor.cloud:5001/uxopian-ai/ai-standalone
```

### 🔹 Step 2: Understand Configuration

The service is configured through a set of `.yml` files (`application.yml`, `opensearch.yml`, `llm-clients-config.yml`, etc.). You can override any configuration parameter by setting an environment variable when running the container.

> 📌 For example, the OpenSearch host is defined in `opensearch.yml` as:
>
> ```yml
```text
> host: $\{OPENSEARCH_HOST:localhost\}
```
> ```
>
> You can set the `OPENSEARCH_HOST` environment variable to specify your server's address.

#### 🔧 Key Environment Variables to Configure

**OpenSearch Connection:**

- `OPENSEARCH_HOST`: The hostname of your OpenSearch server.
- `OPENSEARCH_PORT`: The port for your OpenSearch instance (default: `9200`).

**LLM Provider API Keys:**

- `OPENAI_API_KEY`: Your API key for OpenAI.
- `ANTHROPIC_API_KEY`: Your API key for Anthropic.
  _(See `llm-clients-config.yml` for all provider variables)_

**Default LLM:**

- `LLM_DEFAULT_PROVIDER`: The default provider to use (e.g., `openai`).
- `LLM_DEFAULT_MODEL`: The default model to use (e.g., `gpt-4o`).

**Server Port:**

- `UXOPIAN_AI_PORT`: The port on which the service will run inside the container (default: `8080`).

### 🔹 Step 3: Run the Container

Run the Docker container, mapping the port and passing the necessary environment variables.

#### 🧪 Example Command:

This example runs the service on port 8080 and connects it to an OpenSearch instance.

```bash
docker run --rm \
  -p 8080:8080 \
  -e OPENSEARCH_HOST="your_opensearch_host" \
  -e OPENSEARCH_PORT="9200" \
  -e OPENAI_API_KEY="your_openai_api_key" \
  --name uxopian-ai \
  artifactory.arondor.cloud:5001/uxopian-ai/ai-standalone
```

---

## ☕ Java Application Deployment

You can also run the service directly as a Java application.

### 🔹 Step 1: Download the Application Package

Download the installation ZIP file from the Arondor Artifactory:

🔗 [ai-standalone-2025.0.0.zip](https://artifactory.arondor.cloud/artifactory/arondor-snapshot/com/uxopian/ai-standalone/2025.0.0-SNAPSHOT/ai-standalone-2025.0.0.zip)

### 🔹 Step 2: Configure the Service

- Unzip the package.
- Navigate to the `config` directory.
- Edit the `.yml` files (`opensearch.yml`, `llm-clients-config.yml`, etc.) to match your environment.

> ⚠️ You must at least configure your OpenSearch connection and provide the necessary API keys for the LLM providers you intend to use.

### 🔹 Step 3: Run the Application

From the root of the unzipped directory, start the service using the Java 21 runtime:

```bash
java -jar ai-standalone-2025.0.0.jar
```

---

## 💻 Client-Side Integration

Once the **uxopian-ai** service is running, you must configure your client application to communicate with it.

### 🧩 ARender Integration

**Download the Integration Package:**
📦 `arender-iris-2025.0.0-SNAPSHOT.zip` from Arondor Artifactory.

**Deploy Files:**
Place the files next to `arondor-arender-hmi-spring-boot-[current_version].jar`. Front-end configs load automatically.

**Configure the Endpoint:**
Open `arender-custom-client.properties` and locate:

```properties
uxopian.ai.host=http://localhost:8080/ai
```

Update the URL to match your running **uxopian-ai** service.

### 🧩 FlowerDocs Integration

**Download the Integration Package:**
📦 `flowerdocs-iris-2025.0.0-SNAPSHOT.zip` from Arondor Artifactory.

**Deploy Files:**
Unzip the package and integrate configuration files into your FlowerDocs instance.

**Configure the Endpoint:**
Open the following file:

```js
./conf/Script/consts/consts
```

Find and update this line:

```js
const UXO_AI_ENDPOINT = "https://iris.demos.uxopian.com/ai";
```

Replace the URL with your own service endpoint.

---

## 🌐 Integration in Other Applications

To integrate the **uxopian-ai** front-end components into any other web application:

### 🔹 Step 1: Download the Web Components Package

📦 `web-components-[current-version].zip` from the Artifactory.

### 🔹 Step 2: Import the Assets

Include the CSS and JavaScript in your HTML:

```html
<!-- Add the stylesheet to your <head> -->
<link rel="stylesheet" href="/path/to/uxopian-ai-styles.css" />

<!-- Add the script at the end of your <body> -->
<script src="/path/to/uxopian-ai-components.js"></script>
```

Once imported, you'll have access to all **uxopian-ai** web components.
