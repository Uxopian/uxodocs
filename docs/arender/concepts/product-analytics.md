---
viewer: classic
title: Product analytics
slug: /concepts/product-analytics
sidebar_position: 7
---

# Product analytics

ARender includes a Product Analytics feature powered by Mixpanel, which helps the Uxopian team understand how ARender is used in real-world deployments. It has been part of ARender since version 2023.5.0. The feature is enabled by default and can be disabled with a single configuration property.

## Why product analytics

The goal of product analytics is to help the Uxopian team:

- Gain insight into how features are actually used.
- Identify the most and least used functionalities.
- Prioritize enhancements and new developments on the product roadmap.

This keeps ARender aligned with real user needs and improves the experience for everyone.

## Privacy and compliance

Product analytics is **compliant with local data protection laws** and respects user privacy:

- All data is stored in Europe, ensuring compliance with data protection regulations.
- No document contents, annotations, or metadata are transmitted.
- The collected data is limited to feature usage metrics only.

Sensitive information never leaves your environment.

## What data is collected

The metrics tracked by the feature are grouped as follows.

### Document usage

- **Opening documents** — tracks document opening, including MIME type, the number of documents opened, the total page count, and the time taken to open the document.
- **Closing documents** — tracks document closing, including the total page count, the time spent viewing the document, and the number of pages viewed.

### Annotations

- **Annotation CRUD** — the number of annotations created, updated, and deleted, along with their types.
- **Repeat annotation mode** — usage of the repeat annotation feature.

### Navigation and interaction

- **Lasso** — usage of the lasso feature.
- **Text search** — usage of the text search feature.
- **Page rotation** — usage of the rotation feature.
- **Document zoom** — usage of the zoom feature.
- **Fullscreen mode** — usage of the fullscreen feature.

### Document manipulation

- **Document builder** — usage of the Document Builder feature.
- **Document comparison** — usage of the Comparison feature.

### Export and output

- **PDF printing** — usage of the Print feature.
- **Document download** — usage of the download feature.
- **Image filtering** — usage of the image filter feature.

## How the data is used

The analytics are reviewed by the Uxopian team solely to improve the user experience:

- Understand how features are being used.
- Identify pain points or underused functionalities.
- Prioritize future updates and improvements.

No sensitive document data is ever exposed.

## Configuration

For product analytics to function, ensure that the URL `https://api-eu.mixpanel.com` is reachable from the user's machine.

To disable product analytics, set `arender.data.analytics.enabled` to `false`. See [Viewer configuration](../reference/viewer-configuration.md#global-display) for the full list of properties.
