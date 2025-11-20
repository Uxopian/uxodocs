import React from 'react';
import ReleasePage from '@site/src/components/ReleasePage';
import styles from './fast2.module.css';
import releasesData from '@site/src/generated/fast2Releases.json';

export default function Fast2Releases() {
    return (
        <ReleasePage
            productKey="fast2"
            title="Fast2"
            subtitle="Discover all the updates, improvements, and fixes for Fast2"
            logoSrc="/uxodocs/img/fast2/Fast2_favicon_white.png"
            releasesData={releasesData}
            styles={styles}
            filterBy="major"
            mapNote={(note: any) => ({
                // keep compatibility with previous UI which prefixed v when showing
                version: `v${note.version}`,
                date: note.date,
                description: note.description,
                slug: note.slug,
                majorVersion: note.majorVersion,
                latest: note.latest,
                // add deprecation banner for v2 major versions (keeps previous behavior)
                deprecation: note.majorVersion === '2' ? '⚠️ v2.x-LTS deprecated as of Dec., 2025' : undefined,
            })}
            readMoreLink={(note: any) => `/release-note/fast2/${note.slug}`}
            cardColor="#5CB8C7"
        />
    );
}
