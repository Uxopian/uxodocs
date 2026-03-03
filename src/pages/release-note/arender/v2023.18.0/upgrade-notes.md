---
title: "ARender v2023.18.0 – Upgrade Notes"
draft: false
date: "2026-02-27"
weight: -202318
aliases:
  - /release/2023.18/
_build:
  list: never
---

> **Release note:** See [v2023.18.0](../release-notes).

## ⚙️ Customization and Configuration

### New Properties

* **Spring Boot Profiles for External Connectors**: To prevent configuration conflicts when using external connector JARs, a dedicated profile has been introduced (application-integrator.properties / application-integrator.yml). This ensures that custom configuration properties correctly take precedence over default `application.yml` or `application.properties` settings.

* **Download/Print document with rotation**: Additional properties have been added to allow downloading or printing the PDF document with page rotation.
* `topPanel.documentMenu.downloadRotation=false`: Enable or disable the download PDF with rotation button
* `print.includeRotations=false`: Enable or disable the print PDF with rotation option.

* **Default annotation filter**: Additional properties have been added to allow setting the default annotation filter applied.
* `annotation.comment.explorer.filter.types.enabled=false`: Enable or disable the use of default annotation filter.
* `annotation.comment.explorer.filter.types=`: Set the default annotation filter by types.

### Deprecated and Deleted Properties

* No properties were deleted or deprecated in this release.



## 📦 Product

### Technical Changes and Security

* **PDFOwl Upgrade**: The internal PDF processing engine, PDFOwl, has been upgraded to version **1.24-22**. This upgrade addresses several stability issues, including better handling of documents that previously failed to open or displayed missing pages.
* **Improved PDF Metadata Sanitization**: We now properly handles PDF documents containing control characters (e.g., ASCII 26) or special characters (like quotes) within layer names. These are now sanitized before JSON serialization to prevent parser failures.

### Performance Improvements

* **Large Document Support**: Optimized the generation of layouts for very large PDF files (100,000+ pages). By transitioning from linked lists to direct array management for page handling, processing time and memory overhead are significantly reduced.
* **Large Image Processing**: Enhanced the stability and performance of the rendition engine when uploading and rendering PDF documents containing high-resolution or very large images, reducing the risk of timeouts.

### User Experience Enhancements

* **Video Player Updates**: The video viewing interface now displays both the **time spent** and the **total time** for video documents.
* **PDF Checkbox Rendering**: Checkbox display in ARender has been improved to more closely align with the visual standards of Acrobat Reader.



## 🔧 Integrator Section

### FileNet Connector

The FileNet connector has been enhanced to natively support more complex document retrieval scenarios.

* **VSID Multi-Opening**: Integrators can now open multiple documents simultaneously using their Version Series IDs (VSIDs).
* **Multi-ObjectStore Support**: The connector can now resolve and open multiple documents even when they are stored across different ObjectStores.

### Configuration Priority

Integrators should be aware of the following change in configuration behavior:

* When an external JAR and the main application JAR both contain the same configuration files, the external JAR configuration is prioritized.
* It is highly recommended to use the new dedicated Spring profiles to manage environment-specific overrides.



## 💻 API

### New Functionality

* **Manual Save Trigger in DocumentBuilder**: A new manual trigger is available for the DocumentBuilder mode. This allows external scripts to programmatically initiate a save event.
* **External Event**: A script can now post an event to ARender to trigger the "Custom document saved" callback without requiring a user to click the UI "Save" button.
