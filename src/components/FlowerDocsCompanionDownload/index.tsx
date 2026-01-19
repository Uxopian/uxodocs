import React from 'react';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';

export default function FlowerDocsCompanionDownload(): React.ReactElement {
    const version = useDocsVersion();

    // Extract version number from label (e.g., "v2025.3.0" -> "2025.3.0")
    const versionNumber = version.label.replace(/^v/, '');

    const downloadUrl = `https://artifactory.arondor.cloud/artifactory/arondor-release/com/flower/docs/companion/flowerdocs-companion-${versionNumber}.msi`;

    return (
        <a href={downloadUrl}>FlowerDocs Companion</a>
    );
}
