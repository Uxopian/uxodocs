import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PlumeDownload(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const version = siteConfig.customFields?.flowerDocsPlumeVersion as string;
    return (
        <Link
            href={`https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/plume/plume-jar/${version}/plume-jar-${version}.jar`}>
            Plume
        </Link>
    );
}
