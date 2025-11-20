import React from 'react';
import ReleasePage from '@site/src/components/ReleasePage';
import styles from './arender.module.css';
import releasesData from '@site/src/generated/arenderReleases.json';

export default function ARenderReleases() {
    return (
        <ReleasePage
            productKey="arender"
            title="ARender"
            subtitle="Explore all ARender updates: new features, improvements, and critical fixes."
            logoSrc="/uxodocs/img/arender/arender_logo_white.png"
            releasesData={releasesData}
            styles={styles}
            filterBy="year"
            mapNote={(note: any) => ({
                version: note.version,
                date: note.date,
                description: note.description,
                slug: note.slug,
                hasUpgradeNotes: note.hasUpgradeNotes,
            })}
            readMoreLink={(note: any) => note.slug}
            upgradeLink={(note: any) => `/release-note/arender/${note.version}/upgrade-notes`}
            cardColor="#4A8FEF"
        />
    );
}
