import React from 'react';
import ReleasePage from '@site/src/components/ReleasePage';
import styles from './flowerdocs.module.css';
import releasesData from '../../generated/flowerDocsReleases.json';

export default function FlowerDocsReleases() {
    return (
        <ReleasePage
            productKey="flowerdocs"
            title="FlowerDocs"
            subtitle="Explore the complete version history of FlowerDocs, from the latest features to improvements and fixes."
            logoSrc="/uxodocs/img/flowerdocs/logo_flower_white.png"
            releasesData={releasesData}
            styles={styles}
            filterBy="major"
            mapNote={(note: any) => ({
                version: `v${note.version}`,
                date: note.date,
                description: note.description,
                slug: note.slug,
                majorVersion: note.majorVersion,
                hasUpgradeNotes: note.hasUpgradeNotes,
                latest: note.latest,
            })}
            readMoreLink={(note: any) => `/uxodocs/release-note/flowerdocs/${note.slug}/release-notes`}
            upgradeLink={(note: any) => `/uxodocs/release-note/flowerdocs/${note.slug}/upgrade-notes`}
            cardColor="#D745FF"
        />
    );
}
