---
title: Requirements
sidebar_position: 1
last_update:
  date: '2026-02-17T10:47:49.798Z'
  author: CI/CD Bot
content_hash: d83146bcf5e0a3d7ff66daa7c76c1d19b86b09948645b39a03dff0e19a606d95
---

ARender Rendition runs on a wide range of enterprise environments.  
The platforms listed below are **officially supported**, and the Docker (Ubuntu-based) image is **QA-validated**.  
Other platforms may work but are not part of the default QA matrix.

---

## 1. Java Requirements (Mandatory)

ARender Rendition requires **Java 11**.

| Component                    | Requirement                                            |
|------------------------------|--------------------------------------------------------|
| **Java Version**             | **JDK 11 (LTS)**                                       |
| **Recommended Distribution** | Eclipse Temurin 11                                     |
| **Architecture**             | x86_64                                                 |
| **Notes**                    | Java 17+ are not supported in the 2023.x release line. |

Download:  
https://adoptium.net/temurin/releases?version=11

---

## 2. Supported Operating Systems

The following systems are supported for standalone Rendition deployment:

| Operating System               | Type    | Vendor Support End   | Status       |
|--------------------------------|---------|----------------------|--------------|
| **Windows Server 2022**        | Windows | Oct 14, 2031         | âœ”ï¸ Supported |
| **Red Hat Enterprise Linux 9** | Linux   | ~2032                | âœ”ï¸ Supported |
| **Ubuntu 22.04 LTS**           | Linux   | Apr 2027 (ESM 2032)  | âœ”ï¸ Supported |
| **Amazon Linux 2023**          | Linux   | Mar 2026             | âœ”ï¸ Supported |

> Primary QA validation is performed on the **Docker Ubuntu jammy 22.04 base image**.

---

## 3. Hardware Requirements

### Recommended hardware sizing

| Sizing Tier     | CPU      | RAM    | Disk                                                                                     |
|-----------------|----------|--------|------------------------------------------------------------------------------------------|
| **Minimum**     | 4 cores  | 8 GB   | 20 GB                                                                                    |
| **Recommended** | 8 cores  | 16 GB  | The maximum between 20Go and a storage where a full day of temporary files can be stored |

---

## 4. Network & Ports

Rendition exposes several internal services.  
These ports must be **available on the host**.

| Service            | Protocol   | Default Port |
|--------------------|------------|--------------|
| **Service Broker** | HTTP/HTTPS | **8761**     |
| **Text Handler**   | HTTP       | **8899**     |
| **Renderer**       | HTTP       | **9091**     |
| **Converter**      | HTTP       | **19999**    |

> **Ports can be customized** via configuration.

---

## 5. File System & Permissions

### Installation User

The user performing the installation must have:

- Permission to create folders
- Permission to create Windows/Linux services

### Runtime User

The user running the Rendition service must have:

- Read & execute rights on all Rendition files
- Read & execute rights on external software

---

## 6. Cloud-Specific Notes

### Amazon Web Services (AWS)

Ensure the role attached to the EC2 instance has permissions to describe the instance if it needs to be identified by a 
tag.

## 7. Notes & Best Practices

- Ensure antivirus or endpoint protection does not block temporary file creation.
- Logs and temporary files should be placed on fast storage (SSD recommended).

---

If you need assistance with sizing or infrastructure validation, please contact **ARender Support**.