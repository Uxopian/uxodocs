import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './arender.module.css';
import releasesData from '@site/src/generated/arenderReleases.json';
import ReleaseSwitcher from '@site/src/components/ReleaseSwitcher';

interface ReleaseNote {
    version: string;
    title: string;
    date: string;
    description: string;
    slug: string;
    hasUpgradeNotes: boolean;
}

function ReleaseNoteCard({ note }: { note: ReleaseNote }) {
    const formattedDate = new Date(note.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Extraire l'année de la version (v2023.15.0 -> 2023)
    const year = note.version.split('.')[0].replace('v', '');

    return (
        <div className={styles.releaseCard}>
            <div className={styles.cardHeader}>
                <div className={styles.versionBadge}>
                    <span className={styles.versionNumber}>{note.version}</span>
                    {note.version === releasesData[0].version && <span className={styles.latestBadge}>Latest</span>}
                </div>
                <div className={styles.releaseDate}>{formattedDate}</div>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.description}>{note.description}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: note.hasUpgradeNotes ? 'space-between' : 'flex-end', alignItems: 'center' }}>
                    {note.hasUpgradeNotes && (
                        <Link
                            to={`/release-note/arender/${note.version}/upgrade-notes`}
                            className={styles.upgradeLink}
                            style={{
                                '--card-color': '#4A8FEF'
                            } as React.CSSProperties}
                        >
                            Upgrade Guide
                        </Link>
                    )}
                    <Link
                        to={note.slug}
                        className={styles.readMoreLink}
                        style={{
                            '--card-color': '#4A8FEF'
                        } as React.CSSProperties}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ARenderReleases() {
    const allNotes: ReleaseNote[] = releasesData as ReleaseNote[];
    const [selectedYear, setSelectedYear] = useState<string>('all');

    // Extraire les années uniques
    const years: string[] = Array.from(
        new Set(allNotes.map((note) => note.version.split('.')[0].replace('v', '')))
    ).sort((a, b) => Number(b) - Number(a));

    const filteredNotes =
        selectedYear === 'all'
            ? [...allNotes].sort((a, b) => {
                // Trier par date décroissante (plus récente en premier)
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            : allNotes.filter((note) => note.version.startsWith(`v${selectedYear}`));

    return (
        <Layout
            title="ARender - Release Notes"
            description="Discover all the updates, improvements, and fixes for ARender"
        >
            <div className={styles.releasesPage}>
                <header className={styles.pageHeader}>
                    <div className="container">
                        <div className={styles.breadcrumb}>
                            <Link to="/releases" className={styles.breadcrumbLink}>
                                Release Notes
                            </Link>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>ARender</span>
                        </div>
                        <Heading as="h1" className={styles.pageTitle}>
                            <img
                                src="/uxodocs/img/arender/arender_logo_white.png"
                                alt="ARender"
                                style={{ height: '2.5rem', width: 'auto' }}
                            />
                            ARender - Release Notes
                        </Heading>
                        <p className={styles.pageSubtitle}>
                            Explore all ARender updates: new features, improvements, and critical fixes.
                        </p>
                    </div>
                </header>

                <main className={styles.mainContent}>
                    <div className="container">
                        <ReleaseSwitcher current="arender" />
                        <div className={styles.filterBar}>
                            <button
                                className={`${styles.filterButton} ${selectedYear === 'all' ? styles.filterButtonActive : ''
                                    }`}
                                onClick={() => setSelectedYear('all')}
                            >
                                All Releases ({allNotes.length})
                            </button>
                            {years.map((year) => {
                                const count = allNotes.filter((note) =>
                                    note.version.startsWith(`v${year}`)
                                ).length;
                                return (
                                    <button
                                        key={year}
                                        className={`${styles.filterButton} ${selectedYear === year ? styles.filterButtonActive : ''
                                            }`}
                                        onClick={() => setSelectedYear(year)}
                                    >
                                        {year} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.releaseGrid}>
                            {filteredNotes.map((note, index) => (
                                <div key={note.version} style={{ animationDelay: `${index * 0.02}s` }}>
                                    <ReleaseNoteCard note={note} />
                                </div>
                            ))}
                        </div>

                        {filteredNotes.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No releases found for this filter.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
