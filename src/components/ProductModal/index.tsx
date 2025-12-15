import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

const ProductList = [
    {
        title: 'ARender',
        pluginId: 'arender',
        logo: '/img/arender/arender_logo_white.png',
        description: 'High-performance document viewer to display and annotate all types of documents',
        link: '/docs/arender',
        color: '#4A8FEF',
        gradient: 'linear-gradient(135deg, #4A8FEF, #3A7EE5)'
    },
    {
        title: 'Fast2',
        pluginId: 'fast2',
        logo: '/img/fast2/Fast2_favicon_white.png',
        description: 'Document migration platform to transform and migrate your documents to different systems',
        link: '/docs/fast2',
        color: '#5CB8C7',
        gradient: 'linear-gradient(135deg, #5CB8C7, #4AA5B4)'
    },
    {
        title: 'FlowerDocs',
        pluginId: 'flowerdocs',
        logo: '/img/flowerdocs/logo_flower_white.png',
        description: 'Electronic document management (EDM) solution to organize, manage and exploit your document',
        link: '/docs/flowerdocs',
        color: '#D745FF',
        gradient: 'linear-gradient(135deg, #D745FF, #C55BFF)'
    },
    {
        title: 'Uxopian AI',
        pluginId: 'uxopian-ai',
        logo: '/img/uxo_white.png',
        description: 'Complete framework to easily integrate powerful AI features into your enterprise applications',
        link: '/docs/uxopian-ai',
        color: '#F59E0B',
        gradient: 'linear-gradient(135deg, #F59E0B, #E07D09)'
    }
];

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    ✕
                </button>
                <div className={styles.cardsGrid}>
                    {ProductList.map((product, idx) => (
                        <ProductCardWithVersions key={idx} {...product} onClose={onClose} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface ProductCardWithVersionsProps {
    title: string;
    pluginId: string;
    logo: string;
    description: string;
    link: string;
    color: string;
    gradient: string;
    onClose: () => void;
}

function ProductCardWithVersions({ title, pluginId, logo, description, link, color, gradient, onClose }: ProductCardWithVersionsProps) {
    const logoUrl = useBaseUrl(logo);

    let versions: string[] = [];
    try {
        const pluginData = usePluginData(`docusaurus-plugin-content-docs`, pluginId) as any;
        if (pluginData?.versions) {
            versions = pluginData.versions.map((v: any) => v.label || v.name);
        }
    } catch (error) {
        console.log(`No versions found for ${title}`);
    }

    return (
        <div className={styles.card}>
            <Link to={link} className={styles.cardLink} onClick={onClose}>
                <div className={styles.cardHeader} style={{ background: gradient }}>
                    <div className={styles.logoWrapper}>
                        <img src={logoUrl} alt={`${title} logo`} className={styles.logo} />
                    </div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                </div>
            </Link>
            {versions.length > 0 && (
                <div className={styles.cardBody}>
                    <div className={styles.versions}>
                        {versions.map((version, idx) => (
                            <Link
                                key={idx}
                                to={link}
                                className={styles.versionLink}
                                onClick={onClose}
                            >
                                {version}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
