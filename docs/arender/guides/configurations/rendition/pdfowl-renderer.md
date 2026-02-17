---
title: "PDFOwl Renderer"
last_update:
  date: '2026-02-17T10:47:49.798Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: f3bfb94f3bd597540e66aa16c8d71dd380ee35aa7425a7ce53f4ffc26cec2a9a
---

## PDFOwl PDF Rendering

Properties are available to configure the rendering of PDF documents to images.

The PDFOwl microservice uses a pool of dedicated PDFOwl rendering processes.
Each PDFOwl process is started for a single document, and can processing a single query at the same time.
For a given document, multiple PDFOwl processes can coexist simultaneously.
The PDFOwl microservice recycles PDFOwl processes for a given document, until the `pdfowl.client.ttl` limit is reached.

:::note[application.properties located in ARender-Rendition-2023.17.0/modules/PDFOwl]

| Description                                                                                                             | Parameter Key                     | Default value | Type    |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------- | ------- |
| Maximum duration of a rendition task to PDFOwl after which the watchdog will kill the PDFOwl process                    | pdfowl.client.watchdog            | 10000         | Integer |
| Maximum duration of an idle PDFOwl process                                                                              | pdfowl.client.ttl                 | 30000         | Integer |
| Memory limit for each PDFOwl process (in Megabytes)                                                                     | pdfowl.memlimit.mb                | 1024          | Integer |
| Enable recycling of PDFOwl processes                                                                                    | pdfowl.recycling.enable           | true          | Boolean |

:::