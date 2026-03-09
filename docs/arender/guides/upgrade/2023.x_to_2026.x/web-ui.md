---
title: Web-UI changes
last_update:
  date: '2026-03-09T13:58:30.248Z'
  author: CI/CD Bot
content_hash: 761f878ce4c7beef4a749109004b09d5d367b685153a90ce0b5dac6e94e2e05b
---

## Properties 

### Client properties changes (arender-default.properties)

#### Deleted properties 

| Version 2023                                   | Description                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| `topPanel.documentMenu.downloadCSVAnnotations` | `Activate the top panel button : download the current document annotations as CSV` |

#### Modified properties

| Property | Version 2023 value | Version 2023 value |
| -------- | ------------------ | ------------------ |
| `topPanel.download.buttons.beanNames` | `downloadButton,downloadRootButton,downloadAllSourcesButton,downloadPdfButton,downloadAllButton,downloadWithRedactButton,downloadAnnotationsButton,downloadAnnotationsCSVButton,downloadXFDFAnnotationsButton,downloadFDFAnnotationsButton,downloadWithFDFAnnotationsButton,downloadWithCompareButton` | `downloadButton,downloadRootButton,downloadAllSourcesButton,downloadPdfButton,downloadAllButton,downloadWithRedactButton,downloadAnnotationsButton,downloadXFDFAnnotationsButton,downloadFDFAnnotationsButton,downloadWithFDFAnnotationsButton,downloadWithCompareButton` |

## Beans

### Toppanel configurations (toppanel-configuration.xml)

#### Deleted beans 

| Versions 2023 bean id          |
| ------------------------------ |
| `downloadAnnotationsCSVButton` |