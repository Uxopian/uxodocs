---
title: ARender v2023.15.0 – Upgrade Notes
date: "2025-10-31"
---

> **Release note:** See [v2023.15.0](../release-notes).

## ⚙️ Customization and Configuration

This section details the changes to properties used for application configuration and customization.

### New Properties

The following new properties are introduced to offer more granular control over the UI menus and a new hyperlink creation mode:

- **`topPanel.downloadMenu.enabled`** (Boolean): Activates or deactivates the entire **Download** sub-menu. Setting this to `false` will hide the main button, addressing a previous limitation.
- **`topPanel.importMenu.enabled`** (Boolean): Activates or deactivates the entire **Import** sub-menu. Setting this to `false` will hide the main button.
- **`topPanel.docLink.enableZoneSelection`** (Boolean): Allows users to define a hyperlink source using a rectangular zone selection instead of relying only on text selection for the DocLink mode.

## 📦 Product

### Performance and Technical Improvements

- **Optimized Metrics Calculation**: The server logic has been updated to **avoid unnecessary calls** for retrieving document content, MIME type, and title when Micrometer metrics are disabled. This prevents superfluous processing and improves efficiency, particularly when opening documents.
- **Load Distribution Strategy**: A **"Round robin" distribution strategy** has been added the rendition server distribution. This new option allows the system to select an available rendition server in a sequential manner, providing an alternative to the existing weighted distribution strategy.
- **New Internal Metrics**: New internal metrics have been implemented to measure performance accurately, including:
    - **Time to First View (ms)**: Measures the time delta between the document opening and the first rendered page image.
    - **Viewing Duration (active) (ms)**: Tracks the active time the user spends viewing a document.

### Security and Dependencies

This version includes important maintenance and dependency updates aimed at strengthening application security.
