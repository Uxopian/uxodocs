import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import ProductCarousel3D from '@site/src/components/ProductCarousel3D';

type RawNote = any;

interface ReleasePageProps {
    productKey: string;
    title: string;
    subtitle?: string;
    logoSrc?: string;
    logoAlt?: string;
    releasesData: RawNote[];
    styles: any;
    filterBy: 'year' | 'major' | 'none';
    mapNote: (note: RawNote) => {
        version: string;
        date: string;
        description: string;
        slug: string;
        majorVersion?: string;
        hasUpgradeNotes?: boolean;
        latest?: boolean | string;
    };
    readMoreLink: (note: any) => string;
    upgradeLink?: (note: any) => string;
    cardColor?: string;
}

function ReleaseNoteCard({ note, styles, cardColor, readMoreLink, upgradeLink }: any) {
    const formattedDate = new Date(note.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.releaseCard}>
            {note.deprecation && <div className={styles.deprecationBadge}>{note.deprecation}</div>}
            <div className={styles.cardHeader}>
                <div className={styles.versionBadge}>
                    <span className={styles.versionNumber}>{note.version}</span>
                    {note.latest && !note.isLatestV2 && <span className={styles.latestBadge}>Latest</span>}
                    {note.isLatestV2 && <span className={styles.latestV2Badge}>Latest v2.x</span>}
                </div>
                <div className={styles.releaseDate}>{formattedDate}</div>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.description}>{note.description}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: note.hasUpgradeNotes ? 'space-between' : 'flex-end', alignItems: 'center' }}>
                    {note.hasUpgradeNotes && upgradeLink && (
                        <Link
                            to={upgradeLink(note)}
                            className={styles.upgradeLink}
                            style={{
                                '--card-color': cardColor || '#4A8FEF'
                            } as React.CSSProperties}
                        >
                            Upgrade Guide
                        </Link>
                    )}
                    <Link
                        to={readMoreLink(note)}
                        className={styles.readMoreLink}
                        style={{
                            '--card-color': cardColor || '#4A8FEF'
                        } as React.CSSProperties}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ReleasePage({
    productKey,
    title,
    subtitle,
    logoSrc,
    logoAlt,
    releasesData,
    styles,
    filterBy,
    mapNote,
    readMoreLink,
    upgradeLink,
    cardColor,
}: ReleasePageProps) {
    const allNotes = releasesData.map(mapNote);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const filterKeys: string[] =
        filterBy === 'year'
            ? Array.from(new Set(allNotes.map((n) => n.version.split('.')[0].replace('v', '')))).sort((a, b) => Number(b) - Number(a))
            : filterBy === 'major'
                ? Array.from(new Set(allNotes.map((n) => n.majorVersion))).sort((a, b) => Number(b) - Number(a))
                : [];

    const filteredNotes =
        selectedFilter === 'all' || filterBy === 'none'
            ? [...allNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            : filterBy === 'year'
                ? allNotes.filter((note) => note.version.startsWith(`v${selectedFilter}`))
                : allNotes.filter((note) => note.majorVersion === selectedFilter);

    // Determine latest v2 if any
    const latestByMajor: Record<string, string> = {};
    allNotes.forEach((note) => {
        if (note.majorVersion && !latestByMajor[note.majorVersion]) {
            latestByMajor[note.majorVersion] = note.version;
        }
    });

    // add helper flags
    const enhancedNotes = filteredNotes.map((n) => ({ ...n, isLatestV2: n.majorVersion === '2' && n.version === (latestByMajor['2'] || '') }));

    return (
        <Layout title={`${title} - Release Notes`} description={subtitle || ''}>
            <div className={styles.releasesPage}>
                <ProductCarousel3D current={productKey} />

                <main className={styles.mainContent}>
                    <div className="container">
                        <div className={styles.filterBar}>
                            {filterBy !== 'none' && (
                                <>
                                    <button
                                        className={`${styles.filterButton} ${selectedFilter === 'all' ? styles.filterButtonActive : ''}`}
                                        onClick={() => setSelectedFilter('all')}
                                    >
                                        All ({allNotes.length})
                                    </button>
                                    {filterKeys.map((k) => {
                                        const count = allNotes.filter((note) =>
                                            filterBy === 'year' ? note.version.startsWith(`v${k}`) : note.majorVersion === k
                                        ).length;
                                        return (
                                            <button
                                                key={k}
                                                className={`${styles.filterButton} ${selectedFilter === k ? styles.filterButtonActive : ''}`}
                                                onClick={() => setSelectedFilter(k)}
                                            >
                                                {filterBy === 'year' ? `${k} (${count})` : `${k}.x version`}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* key on grid forces React to remount the grid when filter changes
                            so animations restart for all cards on each filter click */}
                        <div className={styles.releaseGrid} key={selectedFilter}>
                            {enhancedNotes.map((note: any, index: number) => (
                                <div key={note.version} style={{ animationDelay: `${index * 0.02}s` }}>
                                    <ReleaseNoteCard note={note} styles={styles} cardColor={cardColor} readMoreLink={readMoreLink} upgradeLink={upgradeLink} />
                                </div>
                            ))}
                        </div>

                        {enhancedNotes.length === 0 && (
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
