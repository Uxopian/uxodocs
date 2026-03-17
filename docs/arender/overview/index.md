---
title: What is ARender
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /
sidebar_position: 1
content_hash: e84ebf42d18c65c5f7942a029da28b9a698623d4af90c57e4a1aca6b5d528c9e
---

# What is ARender

ARender is a document viewing, annotation, and rendition platform built by Uxopian Software. It lets users view, annotate, compare, redact, and assemble documents in a web browser, and provides a REST API for headless document rendering and conversion.

## Who is it for

- **Solution architects** designing document management workflows
- **Developers** embedding a document viewer into web applications
- **System administrators** deploying and operating the platform
- **Business users** collaborating through annotations, comparisons, and document assembly

## What ARender does

ARender handles two primary workloads:

**Viewing and collaboration.** Users open documents from connected repositories (Alfresco, IBM FileNet, CMIS, and others), view them in a browser, and collaborate using XFDF-standard annotations. The viewer supports multi-format rendering, full-text search, bookmarks, hyperlinks, digital signature validation, document comparison, redaction, and a document builder for page-level assembly.

**Backend rendition services.** A set of microservices converts documents to viewable formats, renders pages as images, extracts text, and exposes these operations through a REST API. These services can run independently of the viewer for headless processing.

## Supported document formats

ARender renders over 100 document formats natively or via conversion:

- PDF (including PDF/A, portfolios, and encrypted)
- Microsoft Office (Word, Excel, PowerPoint, Visio, Publisher, Project)
- LibreOffice / OpenDocument formats
- Images (PNG, JPEG, TIFF, GIF, WebP, HEIF, BMP, DICOM, EPS)
- HTML and SVG
- Email (EML)
- Video (MP4)
- AFP (Advanced Function Presentation)
- Plain text, RTF, vCard
- XPS

See [Supported formats](/docs/arender/overview/supported-formats) for the complete matrix.

## Architecture at a glance

ARender runs as a set of Docker containers:

```mermaid
graph LR
    Browser --> Viewer["Viewer (Spring Boot + GWT)"]
    Viewer --> Broker["Service Broker"]
    Broker --> Converter["Document Converter"]
    Broker --> Renderer["Document Renderer"]
    Broker --> TextHandler["Text Handler"]
    Viewer --> Connector["Connector (FileNet, Alfresco, CMIS...)"]
    Connector --> ECM["Document Repository"]
```

The **viewer** handles the user interface, security, and connector integration. The **service broker** orchestrates backend microservices for conversion, rendering, and text extraction. All services share a temporary file volume.

See [System architecture](/docs/arender/overview/architecture) for details.

## Next steps

- [Docker Compose quickstart](/docs/arender/quickstart/docker-compose): get ARender running locally in minutes
- [Core concepts](/docs/arender/concepts/connectors): understand connectors, annotations, and the rendition pipeline
- [Deployment](/docs/arender/deployment/docker-compose): deploy ARender for production
- [REST API reference](/docs/arender/reference/rest-api/broker-api): integrate programmatically
