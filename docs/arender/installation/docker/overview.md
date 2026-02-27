---
title: "Installation"
last_update:
  date: '2026-02-17T10:47:49.798Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: e9327f53e9414eb2447c79e2313af41f8e4b5acbe5f747b02c6239d0bbd63052
---

ARender can be deployed in **Docker Mode**, where each component of the platform is packaged into lightweight OCI-compliant containers.  
This mode is ideal for **quick setup**, **demo environments**, **POCs**, or **small single-host deployments**.

It provides faster installation and easier upgrades compared to the standalone mode, while remaining simpler than Kubernetes.

---

## 1. When to Use Docker Mode

Docker Mode is recommended when:

- You need a **simple single-host deployment**
- You want to test ARender without full infrastructure
- You want to avoid installing Java or native dependencies manually
- You work in a development, demo or sandbox environment

Docker Mode is **not suitable** for:

- High availability
- Multi-node deployments
- Production workloads requiring orchestration
- Auto-restart policies or rolling updates

If you need HA or scalability, see:  
👉 [Kubernetes Deployment](../kubernetes/overview)

---

## 2. Supported Container Platforms

ARender Docker images are OCI-compliant and compatible with the following environments:

| Platform                             | Status         |
|--------------------------------------|----------------|
| **Docker Engine**                    | ✔️ Supported  |
| **Docker Desktop (Windows / macOS)** | ✔️ Supported  |
| **containerd**                       | ✔️ Supported  |

> Docker is the **primary QA validation platform** for container deployments.

---

## 3. Requirements

### Host Requirements

Requirements for a deployment with one container per ARender service on a single host.

| Component  | Requirement                                                                               |
|------------|-------------------------------------------------------------------------------------------|
| **CPU**    | 4+ vCPUs                                                                                  |
| **RAM**    | 8-16 GB                                                                                   |
| **Disk**   | The maximum between 20Go and a storage where a full day of temporary files can be stored  |
| **OS**     | Any OS supporting Docker Engine                                                           |

### Networking

The below ports **must be available** on the host:

| Port      | Service      | 
|-----------|--------------|
| **8761**  | Broker       |
| **8899**  | Text Handler |
| **9091**  | Renderer     |
| **19999** | Converter    |

---

## 4. ARender Docker Registry

ARender images are hosted on the private **ARender Docker Registry**.

Login:

```bash
docker login artifactory.arondor.cloud:5001
```

Credentials are provided by [Uxopian Software](https://www.uxopian.com/en/contact-us).

---

## 5. Available Images

Below is the list of all ARender images available on the registry.

### Rendition Images

**All Rendition images are mandatory**.

| Component        | Repository                        | Version Tag Pattern | Description                                                                                                    |
|------------------|-----------------------------------|---------------------|----------------------------------------------------------------------------------------------------------------|
| **Broker**       | `arender-document-service-broker` | `{{version}}`          | Entry-point service that receives requests from the HMI or batch jobs and dispatches them to internal services |
| **Renderer**     | `arender-document-renderer`       | `{{version}}`          | Generates page images                                                                                          |
| **Text Handler** | `arender-document-text-handler`   | `{{version}}`          | Extracts text and its coordinates                                                                              |
| **Converter**    | `arender-document-converter`      | `{{version}}`          | Converts non-PDF/non-MP4 documents into PDF or MP4                                                             |

### Web UI Images

| Variant             | Repository              | Version Tag Pattern       | Description                                |
|---------------------|-------------------------|---------------------------|--------------------------------------------|
| **Default Web UI**  | `arender-ui-springboot` | `{{version}}`                | Standard GWT UI                            |
| **Alfresco Web UI** | `arender-ui-springboot` | `{{version}}-alfresco`       | Standard GWT UI with Alfresco connector    |
| **FileNet Web UI**  | `arender-ui-springboot` | `{{version}}-filenet`        | Standard GWT UI with IBM FileNet connector |

> All Web-UI variants rely on the same base runtime.

---

## 6. Pulling Images

Use the following command to pull ARender images.

```bash
docker pull artifactory.arondor.cloud:5001/<Repository>:<Version Tag Pattern>
```
---

## 7. Docker Compose (Recommended)

ARender provides a ready-to-use `docker-compose.yml` that includes:

- Web UI
- Broker
- Renderer
- Text Handler
- Converter

Download:

👉 [Download docker-compose.yml](/docs/docker/docker-compose.yml)

Run:

```bash
docker compose up -d
```

The full stack is started automatically, each component in its own container.

---

## 8. Troubleshooting

### Image not found
- Ensure registry login
- Check repository name and version

### Container stops immediately
Check logs:

```bash
docker logs <container>
```

### Ports already in use
Ensure ports 8761 / 8899 / 9091 / 19999 are free.

---

If you need assistance, please contact **ARender Support**.