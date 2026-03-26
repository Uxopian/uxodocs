---
title: Requirements
sidebar_label: Requirements
sidebar_position: 1
last_update:
  date: '2026-03-26T16:37:56.929Z'
  author: CI/CD Bot
content_hash: ccefa8dced17f9bdfa24ac1bed5cd8f2bae038558300f774cc600797f57dfe85
---

Uxopian AI consists of two services: **uxopian-ai** (the AI backend) and **uxopian-gateway** (the routing and authentication layer). Both must be deployed and reachable from each other.

```mermaid
flowchart TD
    A[Check infrastructure capacity] --> B[Obtain registry credentials]
    B --> C[Prepare OpenSearch 3.3.2]
    C --> D[Obtain LLM provider API key]
    D --> E{Choose deployment model}
    E -->|Container runtime available| F[Kubernetes or Docker Compose]
    E -->|No container runtime| G[Bare JAR on Java 21]
```

*Figure: Prerequisite checklist before choosing a deployment model.*

## Infrastructure

| Component | Minimum | Notes |
|---|---|---|
| uxopian-ai | 512 Mi RAM, 0.5 CPU | JVM heap: `-Xmx768m -Xms512m` |
| uxopian-gateway | 256 Mi RAM | JVM heap: `-Xmx256m -Xms256m` |
| OpenSearch | 1 Gi RAM (single node) | Version `3.3.2` required |
| Java | 21 | Required for bare JAR deployment only |

For multi-replica deployments, both services use Hazelcast for session state distribution. See [Kubernetes deployment](./kubernetes.mdx) for cluster configuration.

## OpenSearch

OpenSearch `3.3.2` is the supported version. uxopian-ai connects to OpenSearch on port `9200` by default. The index is created automatically on first startup.

For production, allocate at least 1 Gi heap to OpenSearch and configure persistent volumes for the data directory.

## Image registry access

Container images are distributed through two registries:

| Registry | Access | Images |
|---|---|---|
| `artifactory.arondor.cloud:5001` | Credentials required | `uxopian-ai`, `uxopian-gateway`, ARender images |
| `docker.uxopian.com` | Public (preview channel) | `uxopian-ai`, `uxopian-gateway` |

For Kubernetes deployments, create an image pull secret named `regcred` pointing to the registry you use. See [Kubernetes deployment](./kubernetes.mdx).

## LLM provider

At least one LLM provider API key is required. Supported providers: OpenAI, Anthropic, Azure OpenAI, Google Gemini, NuExtract. The provider and model are configured at runtime — no rebuild is needed to switch.

## Network

- uxopian-gateway must be reachable from user browsers on its configured port (default `8085`).
- uxopian-ai must be reachable from uxopian-gateway (internal network, not exposed externally).
- uxopian-ai must be able to reach OpenSearch and any external service used by plugins (ARender DSB, FlowerDocs core).
