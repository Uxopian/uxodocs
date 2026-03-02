---
title: "Text handler"
last_update:
  date: '2026-02-17T10:47:49.798Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: b06861a0f1dfe9594120d53bd4b21d82dbeff9217eb66ff770eb78946da66594
---

## Digital signature management

ARender supports the display and verification of digital signatures in PDF files.
This feature is disabled by default, but can be enabled in the settings.
Once enabled, signature information becomes visible, and trusted certificates can be configured to verify the authenticity of signatures in documents.

**application.properties situé dans ARender-Rendition-{{version}}\modules\PDFBoxEngine**

| Description                                                                                                  | Parameter Key                  | Default value            | Type    |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------ | ------- |
| Enable verification and extraction of digital signatures                                                     | pdf.signatures.enable          | false                    | Boolean |
| Path to the folder containing certificates, at least one of which must match a certificate found in the PDF  | PUBLIC_CERT                    | ../defaultPathPublicCert | String  |
| Path to the folder containing Adobe-trusted certificates (AATL) (Since version 2023.14.0)                    | trusted.root.certificates.path | ../defaultPathRootCert   | String  |