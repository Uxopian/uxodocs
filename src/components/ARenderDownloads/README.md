# ARenderDownloads Component Usage Example

## In your ARender release notes

To add the download table at the end of your release notes, simply add the following:

```mdx
---
title: ARender 2023.17.0 Release notes
description: ARender 2023.17.0 Release notes
---

import ARenderDownloads from '@site/src/components/ARenderDownloads';

<!-- Below the release note content -->

# Overview

...

# Bug fixes

...

<!-- End of the release note content, add the component below -->

<ARenderDownloads version="2023.17.0" />
```

## Component Parameters

### `version` (required)
The ARender version for which to generate the download links.
Example : `"2023.15.0"`, `"2023.16.0"`, `"2023.17.0"`, etc.

## Examples

### Basic usage
```jsx
<ARenderDownloads version="2023.17.0" />
```


## Downloadable Components

The component automatically generates links for:

1. **ARender Rendition** - ARender backend application installer (JAR)
2. **ARender Web-UI** - ARender frontend application (Spring Boot) (JAR)
3. **ARender HMI FileNet 5.x** - J2EE EAR application for FileNet (EAR)
4. **ARender HMI Content Manager 8.1** - J2EE WAR application for FileNet (WAR)
5. **ARender Plugin for FileNet** - IBM Content Navigator plugin (JAR)
6. **ARender Plugin for Alfresco** - Alfresco Share plugin (JAR)
7. **ARender Plugin for Alfresco ADF** - Alfresco ADF plugin base for integration in ADF (ZIP)
8. **ARender API** - ARender Client API (JAR)
9. **ARender API** - ARender Rendition API (JAR)

Each item includes:

- A link to the SHA256 file
- A link to the JAR or ZIP file
- A description of the component


## Migration

### Before (markdown)
```mdx
| Description                                                       | Binary                                                                                                                                                                                                | SHA-256                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ARender Rendition Server installer                                | [Download](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.17.0/rendition-engine-installer-2023.17.0-rendition.jar)  | [SHA-256](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/micro/services/rendition-engine-installer/2023.17.0/rendition-engine-installer-2023.17.0-rendition.jar.sha256)  |
```

### After (React)
```jsx
<ARenderDownloads version="2023.17.0" />
```


## Benefits
✅ **Reusable** - A single component for all release notes
✅ **Maintainable** - Centralized modification of design and URLs
✅ **Type-safe** - TypeScript to prevent errors
✅ **Responsive** - Automatically adapts to mobile devices
✅ **Dark mode** - Automatic support for dark mode
✅ **Accessible** - Links with appropriate attributes