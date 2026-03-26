import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FlowerDocsCompanionDownload(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const version = siteConfig.customFields?.flowerDocsCompanionVersion as string;
    return (
        <Link
            href={`https://artifactory.arondor.cloud/artifactory/arondor-release/com/flower/docs/companion/flowerdocs-companion-${version}.msi`}>
            FlowerDocs Companion
        </Link>
    );
}
