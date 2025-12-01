# Release Notes: uxopian-ai v2025.0.0

**Release Date:** December 2025
**Version:** 2025.0.0

We are thrilled to announce the general availability of **uxopian-ai 2025.0.0**!

**uxopian-ai** is a complete, standalone framework designed to accelerate the integration of GenAI features into enterprise applications. Built on **Java 21 LTS** and **Spring 3.5**, it moves beyond simple libraries to provide a deployable service with full conversation management, advanced orchestration, and enterprise-grade security.

---

## 🌟 Highlights

### 🚀 Standalone Service

Stop building the plumbing. uxopian-ai is a pre-packaged backend service that manages the complexities of LLM interactions. It is deployable immediately via **Docker** or as a **Java 21 application**, saving months of infrastructure setup.

### 🧠 The Goal System (Context-Aware Orchestration)

This is the heart of the framework. Instead of hardcoding prompts in your application code, you send a generic **Goal** (e.g., "compare"). The engine dynamically selects the correct Prompt based on context filters (Tenant, Document Type, User Role) using SpEL (Spring Expression Language).

### 🛡️ Native Multi-Tenancy

Built for the enterprise, every conversation, prompt, and statistic is strictly scoped to a **Tenant ID**. The architecture supports a **BFF (Backend for Frontend)** pattern, relying on security headers (`X-User-TenantId`) to ensure logical data separation.

---

## ✨ Key Features

### 🤖 LLM Interaction & Connectors

- **Provider Abstraction:** Out-of-the-box support for major providers (OpenAI, Azure, Anthropic).
- **Parameter Precedence:** A granular hierarchy for configuration. Parameters passed in the API call override Prompt defaults, which in turn override Global defaults.
- **Advanced Capabilities:** Native support for **Function Calling**, **Multi-modal inputs** (Text + Base64 Images), and streaming responses.
- **MCP Client:** Acts as a client for Multi-Content Platform (MCP) servers.

### 💬 Conversation Management

- **Persistent History:** All conversations are stored in **OpenSearch**, managing the context window automatically.
- **Rich Requests:** Requests track inputs, answers, and token usage.
- **User Feedback Loop:** Built-in endpoints to tag responses as _Good_, _Bad_, or _Neutral_, enabling continuous improvement of prompt quality.

### 🎨 Frontend Components

- **Web Components:** A set of lightweight, embeddable JS/CSS components to add a Chat UI to any web application instantly.
- **Thymeleaf Templating:** Prompts and Image inputs support dynamic variable injection via Thymeleaf.

### 📊 Admin & Analytics Dashboard

A comprehensive administration panel to monitor the health and ROI of your AI stack:

- **ROI Tracking:** Define "Time Saved" per prompt to calculate the estimated human hours saved.
- **Token Monitoring:** Visualize input/output token consumption globally or per user.
- **Adoption Trends:** Track daily requests, active users, and advanced feature adoption (e.g., Multi-modal usage).

---

## 🏗️ Architecture & Integrations

### Technical Stack

- **Core:** Java 21 LTS, Spring 3.5.
- **LLM Engine:** Powered by Langchain4j.
- **Storage:** OpenSearch (Vectors & Metadata).
- **API:** Fully documented REST API with Swagger UI.

### Ecosystem Integrations

v1.0.0 demonstrates the framework's flexibility through complex integrations with **ARender** and **FlowerDocs**.

These integrations were achieved seamlessly using standard **JavaScript scripts** and **ScriptOperationHandlers**, proving that **uxopian-ai** can be easily embedded into existing High Content Interfaces (HCI) and Content Services Platforms (CSP) without requiring heavy backend modifications.

---

> 👉 **Ready to start?** Check out the [Installation Guide](../getting_started/installation_guide.md) to deploy your first instance.
