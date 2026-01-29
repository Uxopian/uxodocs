---
title: ARender v2023.16.0 – Upgrade Notes
date: "2025-12-02"
---

> **Release note:** See [v2023.16.0](./release-notes).

## ⚙️ Customization and Configuration

This section details the changes to properties used for application configuration and customization.

### New Properties

The following new property is introduced to prevent excessive memory consumption and conversion timeout when email body contains large embedded image:

- **`emltopdf.resize.embedded.image.enabled`** (Boolean): Enables or disables the resizing of embedded images in the email body during email-to-PDF conversion. Disabled by default.

## 📦 Product

### Performance and Technical Improvements

- To prevent excessive memory consumption and crashes during **PDF generation** from emails, particularly those containing large inline images, a new mechanism has been implemented. Heavy inline images are now **downscaled and compressed** before being passed to `wkhtmltopdf`.
- A fix addresses an issue where **HMI to Rendition connections** could remain blocked. This occurred when streaming methods to retrieve page image, printable PDF, the document accessor and annotation conversion were canceled before the stream was fully consumed or closed. The update ensures connections and streams are properly closed, especially in error scenarios.
- The **DirectOffice** component has been patched to fix an issue that could occur when a converted PDF was entirely **collapsed**.
- The failure to save a **PDF/A** document after using the **merge/cut** function has been fixed.

### Security and Dependencies

This version includes important maintenance and dependency updates aimed at strengthening application security.

## 💻 API

No new API endpoints have been introduced in this release.