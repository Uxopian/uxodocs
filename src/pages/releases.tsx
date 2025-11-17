import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './releases.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const products = [
    {
        name: 'Fast2',
        version: 'v2025.x.x',
        icon: '/img/fast2/Fast2_favicon_white.png',
        color: '#5CB8C7',
        gradient: 'linear-gradient(135deg, #5CB8C7, #4AA5B4, #3A8F9D, #2F7D8B)',
        releaseNotesLink: '/releases/fast2',
    },
    {
        name: 'ARender',
        version: 'v2023.14.0',
        icon: '/img/arender/arender_logo_white.png',
        color: '#4A8FEF',
        gradient: 'linear-gradient(135deg, #4A8FEF, #3A7EE5, #2A6DD8, #1865D8)',
        releaseNotesLink: '/docs/arender/releases',
    },
    {
        name: 'FlowerDocs',
        version: 'v2025.3.0',
        icon: '/img/flowerdocs/logo_flower_white.png',
        color: '#D745FF',
        gradient: 'linear-gradient(135deg, #D745FF, #C55BFF, #B56BFF, #A47BFF)',
        releaseNotesLink: '/releases/flowerdocs',
    },
    {
        name: 'Uxopian AI',
        version: 'current',
        icon: '/img/uxo_white.png',
        color: '#E88AA0',
        gradient: 'linear-gradient(135deg, #F5A882, #EC9059, #E07869, #D36D78)',
        releaseNotesLink: '/docs/uxopian-ai',
    },
];

function ReleaseCard({ name, version, icon, color, gradient, releaseNotesLink }) {
    const resolveBase = useBaseUrl;

    const renderIcon = () => {
        if (typeof icon === 'string' && (icon.match(/\.(png|jpe?g|svg|gif)$/i) || icon.startsWith('/') || icon.startsWith('data:'))) {
            const src = resolveBase(icon);
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={`${name} logo`} className={styles.iconImg} />;
        }
        return <span className={styles.icon}>{icon}</span>;
    };

    return (
        <div className={styles.releaseCard}>
            <div className={styles.cardHeader} style={{ background: gradient }}>
                <div className={styles.iconWrapper}>{renderIcon()}</div>
                <Heading as="h2" className={styles.productName}>
                    {name}
                </Heading>
                <div className={styles.version}>{version}</div>
            </div>
            <div className={styles.cardBody}>
                <Link
                    to={releaseNotesLink}
                    className={styles.releaseLink}
                    style={{
                        '--card-color': color,
                        borderColor: color,
                        color: color,
                    } as React.CSSProperties}
                >
                    View Release Notes →
                </Link>
            </div>
        </div>
    );
}

export default function Releases() {
    return (
        <Layout
            title="Release Notes"
            description="Consultez les dernières versions et notes de mise à jour de tous nos produits"
        >
            <div className={styles.releasesPage}>
                <header className={styles.pageHeader}>
                    <div className="container">
                        <Heading as="h1" className={styles.pageTitle}>
                            Release Notes
                        </Heading>
                        <p className={styles.pageSubtitle}>
                            Browse the latest versions and updates of our products
                        </p>
                    </div>
                </header>
                <main className={styles.mainContent}>
                    <div className="container">
                        <div className={styles.cardsGrid}>
                            {products.map((product) => (
                                <ReleaseCard key={product.name} {...product} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
