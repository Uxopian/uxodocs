---
title: ARender v2023.11.0 – Release Notes
description: Minor release improving signed-PDF rendering, long Base64 URL handling, PDF/A printing and hyperlink accuracy.
date: "2025-06-27"
---

> **Upgrade note:** See [v2023.11.0](../upgrade-notes) for detailed instructions.

## Overview

ARender 2023.11.0 is a minor release that strengthens support for document rendering accuracy, especially for signed and long URL-encoded documents. It also improves PDF/A printing, hyperlink visual consistency, and fixes navigation regressions in named destinations.

## Prerequisites

| Component | Supported versions |
| --------- | ------------------ |
| OpenJDK   | 8 or 11            |

## User Perspective

📄 **Fix for Layout Extraction in Signed PDFs**  
Improve signed document layout rendering when PDFOwl is used. _(AR-17644)_

🌐 **Support for Special Characters in Base64 URLs**  
Long document URLs containing special characters (like `+`, `~`) are now correctly encoded and handled. _(AR-17394)_

🔗 **Hyperlink Highlight Rendering Fix**  
Inverted-style hyperlinks now visually align text properly—the blue overlay precisely follows the black base text. _(AR-17491)_

🖨️ **PDF/A Documents No Longer Blocked in Print**  
PDF/A files are now printable without restriction via ARender. _(AR-17494)_

📍 **Fix for Named Destination Hyperlinks**  
Clicking a link to a named destination now works reliably, even on subsequent clicks. _(AR-17623)_

## Developer / Integrator Perspective

_No developer/integrator-specific changes in this version._

## Exploitation Perspective

_No operational-specific changes in this version._

## Changelog

| Summary                                       | Issue Type | Key      | Linked Issues |
| --------------------------------------------- | ---------- | -------- | ------------- |
| Layout extraction fails for signed documents  | Issue      | AR-17644 | TMAPR-6313    |
| Encoding issue in long Base64 document URLs   | Issue      | AR-17394 | TMAPR-6088    |
| Misaligned inverted-style hyperlink text      | Issue      | AR-17491 | TMAPR-6248    |
| PDF/A documents blocked from printing         | Issue      | AR-17494 | TMAPR-6222    |
| Navigation issue with named destination links | Regression | AR-17623 | TMAPR-6309    |
