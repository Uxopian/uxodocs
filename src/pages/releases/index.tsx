import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ProductCarousel3D from '@site/src/components/ProductCarousel3D';
import overrideStyles from '@site/src/components/ReleasePage.module.css';
import fast2ReleasesData from '@site/src/generated/fast2Releases.json';
import arenderReleasesData from '@site/src/generated/arenderReleases.json';
import flowerDocsReleasesData from '@site/src/generated/flowerDocsReleases.json';
import fast2Styles from './fast2.module.css';
import arenderStyles from './arender.module.css';
import flowerDocsStyles from './flowerdocs.module.css';

type Product = 'fast2' | 'arender' | 'flowerdocs' | 'uxopian-ai';

type RawNote = any;

interface ProductConfig {
    key: Product;
    title: string;
    subtitle: string;
    logoSrc: string;
    releasesData: RawNote[];
    styles: any;
    filterBy: 'year' | 'major' | 'none';
    mapNote: (note: RawNote) => any;
    readMoreLink: (note: any) => string;
    upgradeLink?: (note: any) => string;
    cardColor: string;
}

const PRODUCTS_CONFIG: Record<Product, ProductConfig> = {
    fast2: {
        key: 'fast2',
        title: 'Fast2',
        subtitle: 'Discover all the updates, improvements, and fixes for Fast2',
        logoSrc: '/uxodocs/img/fast2/Fast2_favicon_white.png',
        releasesData: fast2ReleasesData,
        styles: fast2Styles,
        filterBy: 'major',
        mapNote: (note: any) => ({
            version: `v${note.version}`,
            date: note.date,
            description: note.description,
            slug: note.slug,
            majorVersion: note.majorVersion,
            latest: note.latest,
            deprecation: note.majorVersion === '2' ? '⚠️ v2.x-LTS deprecated as of Dec., 2025' : undefined,
        }),
        readMoreLink: (note: any) => `/release-note/fast2/${note.slug}`,
        cardColor: '#5CB8C7',
    },
    arender: {
        key: 'arender',
        title: 'ARender',
        subtitle: 'Explore all ARender updates: new features, improvements, and critical fixes.',
        logoSrc: '/uxodocs/img/arender/arender_logo_white.png',
        releasesData: arenderReleasesData,
        styles: arenderStyles,
        filterBy: 'year',
        mapNote: (note: any) => ({
            version: note.version,
            date: note.date,
            description: note.description,
            slug: note.slug,
            hasUpgradeNotes: note.hasUpgradeNotes,
        }),
        readMoreLink: (note: any) => note.slug,
        upgradeLink: (note: any) => `/release-note/arender/${note.version}/upgrade-notes`,
        cardColor: '#4A8FEF',
    },
    flowerdocs: {
        key: 'flowerdocs',
        title: 'FlowerDocs',
        subtitle: 'Explore the complete version history of FlowerDocs, from the latest features to improvements and fixes.',
        logoSrc: '/uxodocs/img/flowerdocs/logo_flower_white.png',
        releasesData: flowerDocsReleasesData,
        styles: flowerDocsStyles,
        filterBy: 'major',
        mapNote: (note: any) => ({
            version: `v${note.version}`,
            date: note.date,
            description: note.description,
            slug: note.slug,
            majorVersion: note.majorVersion,
            hasUpgradeNotes: note.hasUpgradeNotes,
            latest: note.latest,
        }),
        readMoreLink: (note: any) => `/uxodocs/release-note/flowerdocs/${note.slug}/release-notes`,
        upgradeLink: (note: any) => `/uxodocs/release-note/flowerdocs/${note.slug}/upgrade-notes`,
        cardColor: '#D745FF',
    },
    'uxopian-ai': {
        key: 'uxopian-ai',
        title: 'Uxopian AI',
        subtitle: 'Coming soon - AI-powered documentation and automation.',
        logoSrc: '/uxodocs/img/uxo_white.png',
        releasesData: [],
        styles: fast2Styles, // fallback style
        filterBy: 'none',
        mapNote: (note: any) => note,
        readMoreLink: (note: any) => '#',
        cardColor: '#F59E0B',
    },
};

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

export default function UnifiedReleasesPage() {
    // Get initial product from URL parameter
    const getInitialProduct = (): Product => {
        if (typeof window === 'undefined') return 'fast2';
        const params = new URLSearchParams(window.location.search);
        const productParam = params.get('product') as Product;
        return PRODUCTS_CONFIG[productParam] ? productParam : 'fast2';
    };

    const [activeProduct, setActiveProduct] = useState<Product>(getInitialProduct());
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    // Update URL when product changes
    const handleProductChange = (productId: string) => {
        setActiveProduct(productId as Product);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('product', productId);
            window.history.pushState({}, '', url.toString());
        }
    };

    const config = PRODUCTS_CONFIG[activeProduct];
    const allNotes = config.releasesData.map(config.mapNote);

    const filterKeys: string[] =
        config.filterBy === 'year'
            ? Array.from(new Set(allNotes.map((n) => n.version.split('.')[0].replace('v', '')))).sort((a, b) => Number(b) - Number(a))
            : config.filterBy === 'major'
                ? Array.from(new Set(allNotes.map((n) => n.majorVersion))).sort((a, b) => Number(b) - Number(a))
                : [];

    const filteredNotes =
        selectedFilter === 'all' || config.filterBy === 'none'
            ? [...allNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            : config.filterBy === 'year'
                ? allNotes.filter((note) => note.version.startsWith(`v${selectedFilter}`))
                : allNotes.filter((note) => note.majorVersion === selectedFilter);

    // Determine latest v2 if any
    const latestByMajor: Record<string, string> = {};
    allNotes.forEach((note) => {
        if (note.majorVersion && !latestByMajor[note.majorVersion]) {
            latestByMajor[note.majorVersion] = note.version;
        }
    });

    const enhancedNotes = filteredNotes.map((n) => ({ 
        ...n, 
        isLatestV2: n.majorVersion === '2' && n.version === (latestByMajor['2'] || '') 
    }));

    // Reset filter when product changes
    useEffect(() => {
        setSelectedFilter('all');
    }, [activeProduct]);

    return (
        <Layout title="Release Notes" description="Explore all product release notes">
            <div className={config.styles.releasesPage}>
                <ProductCarousel3D 
                    current={activeProduct} 
                    onProductChange={handleProductChange}
                />

                <main className={config.styles.mainContent}>
                    <div className="container">
                        <div className={`${config.styles.filterBar} ${overrideStyles.centered}`}>
                            {config.filterBy !== 'none' && allNotes.length > 0 && (
                                <>
                                    <button
                                        className={`${config.styles.filterButton} ${selectedFilter === 'all' ? config.styles.filterButtonActive : ''}`}
                                        onClick={() => setSelectedFilter('all')}
                                    >
                                        All ({allNotes.length})
                                    </button>
                                    {filterKeys.map((k) => {
                                        const count = allNotes.filter((note) =>
                                            config.filterBy === 'year' ? note.version.startsWith(`v${k}`) : note.majorVersion === k
                                        ).length;
                                        return (
                                            <button
                                                key={k}
                                                className={`${config.styles.filterButton} ${selectedFilter === k ? config.styles.filterButtonActive : ''}`}
                                                onClick={() => setSelectedFilter(k)}
                                            >
                                                {config.filterBy === 'year' ? `${k} (${count})` : `${k}.x version`}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        <div className={config.styles.releaseGrid} key={`${activeProduct}-${selectedFilter}`}>
                            {enhancedNotes.map((note: any, index: number) => (
                                <div key={note.version} style={{ animationDelay: `${index * 0.02}s` }}>
                                    <ReleaseNoteCard 
                                        note={note} 
                                        styles={config.styles} 
                                        cardColor={config.cardColor} 
                                        readMoreLink={config.readMoreLink} 
                                        upgradeLink={config.upgradeLink} 
                                    />
                                </div>
                            ))}
                        </div>

                        {enhancedNotes.length === 0 && (
                            <div className={config.styles.emptyState}>
                                <p>
                                    {allNotes.length === 0 
                                        ? 'No releases available yet for this product.' 
                                        : 'No releases found for this filter.'}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
