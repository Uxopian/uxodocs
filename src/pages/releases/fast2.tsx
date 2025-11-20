import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './fast2.module.css';
import ReleaseSwitcher from '@site/src/components/ReleaseSwitcher';
import releasesData from '@site/src/generated/fast2Releases.json';

interface ReleaseNote {
    version: string;
    majorVersion: string;
    date: string;
    description: string;
    latest?: boolean | string;
    slug: string;
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
            {isV2 && (
                <div className={styles.deprecationBadge}>
                    ⚠️ v2.x-LTS deprecated as of Dec., 2025
                </div>
            )}
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                        to={`/release-note/fast2/${note.slug}`}
                        className={styles.readMoreLink}
                        style={{
                            '--card-color': '#5CB8C7'
                        } as React.CSSProperties}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Fast2Releases() {
    const allNotes: ReleaseNote[] = releasesData as ReleaseNote[];
    const [selectedMajor, setSelectedMajor] = useState<string>('all');

    // Extract unique major versions
    const majorVersions: string[] = Array.from(
        new Set(allNotes.map((note) => note.majorVersion))
    ).sort((a, b) => Number(b) - Number(a));

    // Find the latest version for each major version
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
            title="Fast2 - Release Notes"
            description="Discover all the updates, improvements, and fixes for Fast2"
        >
            <div className={styles.releasesPage}>
                <header className={styles.pageHeader}>
                    <div className="container">
                        <div className={styles.breadcrumb}>
                            <Link to="/releases" className={styles.breadcrumbLink}>
                                Release Notes
                            </Link>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>Fast2</span>
                        </div>
                        <Heading as="h1" className={styles.pageTitle}>
                            <img
                                src="/uxodocs/img/fast2/Fast2_favicon_white.png"
                                alt="Fast2 Logo"
                                className={styles.productIcon}
                                height={40}
                            />
                            Fast2 - Release Notes
                        </Heading>
                        <p className={styles.pageSubtitle}>
                            Discover all the updates, improvements, and fixes for Fast2
                        </p>
                    </div>
                </header>

                <main className={styles.mainContent}>
                    <div className="container">
                        <ReleaseSwitcher current="fast2" />
                        {/* Version filter */}
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
                                    style={{ animationDelay: `${index * 0.02}s` }}
                                >
                                    <ReleaseNoteCard note={note} latestV2Version={latestByMajor['2'] || ''} />
                                </div>
                            ))}
                        </div>

                        {filteredNotes.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>Aucune note de version trouvée pour cette sélection.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
