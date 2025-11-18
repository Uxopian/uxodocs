import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './flowerdocs.module.css';
import releasesData from '../../generated/flowerDocsReleases.json';

interface ReleaseNote {
    version: string;
    majorVersion: string;
    date: string;
    description: string;
    hasUpgradeNotes: boolean;
    slug: string;
    latest: boolean;
}

function ReleaseNoteCard({ note, latestV2Version }: { note: ReleaseNote; latestV2Version: string }) {
    const formattedDate = new Date(note.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const isV2 = note.majorVersion === '2';
    const isLatestV2 = isV2 && note.version === latestV2Version;

    return (
        <div className={styles.releaseCard}>
            <div className={styles.cardHeader}>
                <div className={styles.versionBadge}>
                    <span className={styles.versionNumber}>v{note.version}</span>
                    {note.latest && <span className={styles.latestBadge}>Latest</span>}
                    {isLatestV2 && <span className={styles.latestV2Badge}>Latest v2.x</span>}
                </div>
                <div className={styles.releaseDate}>{formattedDate}</div>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.description}>{note.description}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: note.hasUpgradeNotes ? 'space-between' : 'flex-end', alignItems: 'center' }}>
                    {note.hasUpgradeNotes && (
                        <Link
                            to={`/uxodocs/release-note/flowerdocs/${note.slug}/upgrade-notes`}
                            className={styles.upgradeLink}
                            style={{
                                '--card-color': '#D745FF'
                            } as React.CSSProperties}
                        >
                            Upgrade Guide
                        </Link>
                    )}
                    <Link
                        to={`/uxodocs/release-note/flowerdocs/${note.slug}/release-notes`}
                        className={styles.readMoreLink}
                        style={{
                            '--card-color': '#D745FF'
                        } as React.CSSProperties}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FlowerDocsReleases() {
    const allNotes: ReleaseNote[] = releasesData as ReleaseNote[];
    const [selectedMajor, setSelectedMajor] = useState<string>('all');

    const majorVersions: string[] = Array.from(
        new Set(allNotes.map((note) => note.majorVersion))
    ).sort((a, b) => Number(b) - Number(a));

    const latestByMajor: Record<string, string> = {};
    allNotes.forEach((note) => {
        if (!latestByMajor[note.majorVersion]) {
            latestByMajor[note.majorVersion] = note.version;
        }
    });

    const filteredNotes =
        selectedMajor === 'all'
            ? [...allNotes].sort((a, b) => {
                // Trier par date décroissante (plus récente en premier)
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            : allNotes.filter((note) => note.majorVersion === selectedMajor);

    return (
        <Layout
            title="FlowerDocs - Release Notes"
            description="Browse all FlowerDocs release notes"
        >
            <div className={styles.releasesPage}>
                <header className={styles.pageHeader}>
                    <div className="container">
                        <div className={styles.breadcrumb}>
                            <Link to="/releases" className={styles.breadcrumbLink}>
                                Release Notes
                            </Link>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>FlowerDocs</span>
                        </div>
                        <h1 className={styles.pageTitle}>
                            <img
                                src="/uxodocs/img/flowerdocs/logo_flower_white.png"
                                alt="FlowerDocs"
                                className={styles.productIcon}
                            />
                            FlowerDocs Release Notes
                        </h1>
                        <p className={styles.pageSubtitle}>
                            Explore the complete version history of FlowerDocs, from the latest features to improvements and fixes.
                        </p>
                    </div>
                </header>

                <main className="container">
                    <div className={styles.mainContent}>
                        {/* Filter buttons */}
                        <div className={styles.filterBar}>
                            <button
                                className={`${styles.filterButton} ${selectedMajor === 'all' ? styles.filterButtonActive : ''
                                    }`}
                                onClick={() => setSelectedMajor('all')}
                            >
                                All
                            </button>
                            {majorVersions.map((major) => (
                                <button
                                    key={major}
                                    className={`${styles.filterButton} ${selectedMajor === major ? styles.filterButtonActive : ''
                                        }`}
                                    onClick={() => setSelectedMajor(major)}
                                >
                                    {major}.x version
                                </button>
                            ))}
                        </div>

                        {/* Release notes grid */}
                        <div className={styles.releaseGrid} key={selectedMajor}>
                            {filteredNotes.map((note, index) => (
                                <div
                                    key={`${selectedMajor}-${note.version}`}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <ReleaseNoteCard note={note} latestV2Version={latestByMajor['2'] || ''} />
                                </div>
                            ))}
                        </div>

                        {filteredNotes.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No release notes found for this selection.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
