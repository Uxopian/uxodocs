---
title: Overview
last_update:
  date: '2026-03-13T11:59:21.642Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 8fab02927ba578153e80e4fbfc6f0ac948daf58f6665f2011e39ecb892ee14d3
---
ARender can be deployed using **three distinct architectures**. Each has its own trade-offs and prerequisites.  
Choose the mode that best fits your infrastructure, operational constraints, and scale requirements.

---

## 🚀 Deployment Modes

### 1. Classic Mode (Legacy / Server-based)

In Classic mode, ARender components are installed directly on virtual or bare-metal servers.

- **HMI (GWT-based Web UI)**
- **Rendition (document rendering engine)**

Each component is installed and managed independently — which means :

- Separate OS / JVM / configuration / ports
- Separate lifecycle (start/stop, upgrade)
- More flexibility for customization

**Use this mode when**:

- You deploy on VMs / bare-metal
- You need direct control over OS / JVM
- You do not use containerization or orchestration

👉 _Recommended for on-premise legacy setups._

<a href="../standalone/rendition/requirements" class="btn-link">Classic installation guide</a>

---

### 2. Docker Mode (Containerized — Single-host)

In Docker mode, ARender is packaged into lightweight containers:

- Rendition container
- Web-UI (GWT) container
- Optional connector containers (Alfresco, FileNet...)

**Advantages**:

- No need to manage OS / JVM on host
- Easy to install / upgrade / replicate
- Ideal for quick setup, testing, small to medium workloads

**Limitations**:

- No orchestration → single-host only
- Limited scalability / HA
- Persistence / volume management must be handled manually

👉 _Good for local testing, small deployments, or environments without cluster infrastructure._

<a href="../docker/overview" class="btn-link">Docker deployment guide</a>

---

### 3. Kubernetes Mode (Clustered / Cloud-Native)

Kubernetes mode deploys ARender within a container orchestrator — ideal for production and scalable setups.

- Deployments + Services for Rendition & Web-UI
- Support for scaling, high availability, load balancing and automated restarts
- Compatible with OpenShift, Amazon EKS, Azure AKS, etc.

**When to use**:

- Production environments needing HA
- Multiple instances, load distribution, multi-tenant or high volume
- Cloud or on-prem clusters

👉 _Recommended for scalable, resilient deployments in production or cloud environments._

<a href="../kubernetes/overview" class="btn-link">Kubernetes deployment guide</a>

---

## 📋 Summary Table

| Mode             | Deployment type                 | Orchestration / HA                       | Host requirements             | Use case                                      |
|------------------|---------------------------------|------------------------------------------|-------------------------------|-----------------------------------------------|
| Classic Mode     | Server-based (VM / bare-metal)  | Yes (HMI load balancing via external LB) | OS + JVM + ports config       | Enterprise on-prem deployments                |
| Docker Mode      | Containers — Single host        | No (single-host containers)              | Docker Engine, host resources | POCs, testing, small deployments              |
| Kubernetes Mode  | Containers — Clustered          | ✅ Yes                                   | Cluster infra + K8s objects   | Cloud-native scalable production environments |

---

## What’s next?

Once you’ve identified your deployment mode, refer to the detailed requirements in the corresponding guide (ports, JVM/OS/containers settings, connectors…).  
The documentation sections below list all available components per mode.

Select the one matching your architecture to get full prerequisites and installation instructions.

---

If you are unsure which mode matches your environment, please check:
- Your internal integration documentation
- Your infrastructure setup
- Contact **ARender Support**